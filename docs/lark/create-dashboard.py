#!/usr/bin/env python3
"""Rebuild the owner's "Revenue" dashboard: the numbers an owner and staff check
day to day, worked out from the Bookings and Extensions tables.

  python3 docs/lark/create-dashboard.py                     # dry run (default): only reads, prints the plan
  python3 docs/lark/create-dashboard.py --apply              # add the formula columns, rename the dashboard, replace its blocks

Read docs/lark/2026-09-21-dashboard.md for what each block shows, why, and its
caveats (the two ledger/no-name rows from the old table, the 4 rows a
migration left with an odd pick-up time, no known storage capacity, and the
one field that may not be supported — see below).

The owner already had a dashboard named "Revenue" (3 blocks, reading
"Bookings (old, archived)" — frozen since the 2026-09-20 cutover). Told to
replace it, this script:
  * renames it to DASHBOARD_NAME (kept if it is already that name),
  * deletes its old blocks (they are named "$ Booking", "Biểu đồ", "$ Thực tế";
    a block with a different name is left alone, in case the owner added one),
  * adds the new formula columns to "Bookings" (additive; no row or existing
    column touched),
  * creates the new blocks below, one at a time.
Nothing on any other table or dashboard is touched.

Safe by design:
  * A dry run only reads.
  * Repeatable: run it again any time (a later block, a fixed formula, more
    metrics) and it only adds what is missing by name; it will not delete the
    OLD blocks a second time (they will already be gone) or duplicate a block
    whose name it created before.
  * Dashboard blocks must be created one at a time, in order; this script does that.

Needs lark-cli (Node >= 20.12) on PATH: export PATH="$HOME/.nvm/versions/node/v22.23.1/bin:$PATH"
"""
import argparse, json, os, subprocess, sys, time

BASE = os.environ.get("LARK_BASE_APP_TOKEN", "GrotbcqWoafD0NsZDVglv405gQg")
BOOKINGS = "Bookings"
EXTENSIONS = "Extensions"
DASHBOARD_NAME = "Stow — Business Dashboard"
OLD_DASHBOARD_NAME = "Revenue"  # the owner's existing dashboard this one replaces
OLD_BLOCK_NAMES = ["$ Booking", "Biểu đồ", "$ Thực tế"]  # its 3 blocks, all reading the frozen "Bookings (old, archived)" table

# ── New formula columns on Bookings ──────────────────────────────────────────
#
# Every dashboard block reads a field's CURRENT value; a metric like "this
# month" or "in storage right now" can't be a fixed filter (it would need
# editing every day). So the moving part is done once, here, in formulas that
# re-evaluate every time Lark reads the row (NOW()/TODAY()), and the dashboard
# blocks below just filter on the plain TRUE/FALSE result. Rows the price
# engine already guards against (a pick-up before its drop-off — 4 rows the
# 2026-09-20 migration left with no recorded pick-up time) are excluded the
# same way here: a small checkbox saying "this row's dates make sense", used
# to gate anything that would be thrown off by them.
# Every entry is "type": "formula" — Lark infers the result (text/number/
# boolean) from the expression itself; declaring "text"/"number"/"checkbox"
# alongside an "expression" is invalid and is refused with a confusing
# "Unrecognized key(s) in object: 'expression'" error (found the hard way:
# this file had that bug on several fields before this comment was written).
# No "style" override either — the one formula already on this table
# ("Thực nhận") was created without one, so none is used here.
FIELDS = [
    {"type": "formula", "name": "Week", "expression": '''TEXT([Submitted at]-DURATION(WEEKDAY([Submitted at],2)-1),"YYYY-MM-DD")''',
     "description": "The Monday of the week this booking was made (from Submitted at), e.g. 2026-09-15. Used to group the weekly trend charts."},
    {"type": "formula", "name": "Month", "expression": '''TEXT([Submitted at],"YYYY-MM")''',
     "description": "The month this booking was made (from Submitted at), e.g. 2026-09. Used to group monthly totals."},
    {"type": "formula", "name": "Stay Valid", "expression": "IF(ISBLANK([Drop-off]),FALSE,IF(ISBLANK([Pick-up]),FALSE,[Pick-up]>[Drop-off]))",
     "description": "Both Drop-off and Pick-up are recorded, and Pick-up is really after Drop-off. False for a handful of rows the 2026-09-20 migration copied without a pick-up time. Used to keep those rows out of averages they would skew."},
    {"type": "formula", "name": "Stay Days", "expression": "IF([Stay Valid],DAYS([Pick-up],[Drop-off]),0)",
     "description": "How many days the bags were actually stored (Pick-up minus Drop-off). 0 when Stay Valid is false, so it never overstates a total; averages should filter on Stay Valid instead of trusting 0."},
    {"type": "formula", "name": "Bag-Days", "expression": "IF(AND([Stay Valid],[Bags]>0),[Bags]*DAYS([Pick-up],[Drop-off]),0)",
     "description": "Bags x days stored: the plainest measure of how much storage was used. 0 when Stay Valid is false or Bags is not recorded."},
    {"type": "formula", "name": "Is Active Now", "expression": '''AND(OR([Status]="Booking",[Status]="Confirm",[Status]="Paid"),OR(ISBLANK([Pick-up]),[Pick-up]>NOW()))''',
     "description": "True right now if the booking is still open (not Complete or Cancel) and either has no pick-up yet or its pick-up has not passed. Re-evaluates every time the base is read, so \"bags in storage now\" never needs manual updating."},
    {"type": "formula", "name": "Picking Up Today", "expression": '''TEXT([Pick-up],"YYYY-MM-DD")=TEXT(TODAY(),"YYYY-MM-DD")''',
     "description": "True on the day this booking's Pick-up falls. For staff's \"who is collecting today\" view."},
    {"type": "formula", "name": "Dropping Off Today", "expression": '''TEXT([Drop-off],"YYYY-MM-DD")=TEXT(TODAY(),"YYYY-MM-DD")''',
     "description": "True on the day this booking's Drop-off falls."},
    {"type": "formula", "name": "Submitted This Month", "expression": "AND(YEAR([Submitted at])=YEAR(TODAY()),MONTH([Submitted at])=MONTH(TODAY()))",
     "description": "True while Submitted at falls in the current calendar month. Lets \"this month\" stat cards stay correct without editing a filter every month."},
    # Repeat-customer pair: EXPERIMENTAL. It has a table reference its own
    # table (Bookings), which is a documented pattern for a DIFFERENT table
    # but is not shown for a table referencing itself. Lark either accepts
    # this at creation or refuses it outright (nothing half-written either
    # way) — see docs/lark/2026-09-21-dashboard.md §6 for the result.
    {"type": "formula", "name": "Bookings by this Customer", "expression": '''IF(ISBLANK([WhatsApp]),0,[Bookings].COUNTIF(CurrentValue.[WhatsApp]=[WhatsApp]))''',
     "description": "How many bookings (including this one) share this booking's WhatsApp number. 0 when WhatsApp is blank. EXPERIMENTAL: counts the table against itself; if Lark refuses this kind of formula the column will not exist and the repeat-customer block is skipped."},
    {"type": "formula", "name": "Is Repeat Customer", "expression": "[Bookings by this Customer]>1",
     "description": "True when this booking's WhatsApp number appears on more than one booking. Depends on \"Bookings by this Customer\"."},
]

MONEY_METRIC = "Thực nhận"  # Total - Discount + Extension Fee: the "actually received" figure the base already uses everywhere else.
REAL_BOOKING = {"field_name": "Drop-off", "operator": "isNotEmpty"}  # excludes "Doanh thu cũ": a revenue-only ledger row with no dates or bags.

def stat(name, table, series=None, count_all=None, filters=None):
    dc = {"table_name": table}
    if count_all:
        dc["count_all"] = True
    else:
        dc["series"] = [{"field_name": series, "rollup": "SUM"}] if isinstance(series, str) else series
    if filters:
        dc["filter"] = {"conjunction": "and", "conditions": filters} if isinstance(filters, list) else filters
    return {"name": name, "type": "statistics", "data_config": dc}

def chart(name, ctype, table, group_by, series=None, count_all=None, filters=None, sort=None):
    dc = {"table_name": table, "group_by": [{"field_name": group_by, "mode": "integrated", **({"sort": sort} if sort else {})}]}
    if count_all:
        dc["count_all"] = True
    else:
        dc["series"] = [{"field_name": series, "rollup": "SUM"}]
    if filters:
        dc["filter"] = {"conjunction": "and", "conditions": filters} if isinstance(filters, list) else filters
    return {"name": name, "type": ctype, "data_config": dc}

def text(md):
    return {"name": md.splitlines()[0].lstrip("#").strip(), "type": "text", "data_config": {"text": md}}

BY_WEEK = {"type": "group", "order": "asc"}
BY_VALUE_DESC = {"type": "value", "order": "desc"}

# The block that needs "Bookings by this Customer" / "Is Repeat Customer" is
# built only if those two columns exist (see FIELDS' note above).
REPEAT_CUSTOMER_BLOCK = stat("Bookings From Repeat Customers", BOOKINGS, count_all=True,
                              filters=[{"field_name": "Is Repeat Customer", "operator": "is", "value": "true"}])

BLOCKS = [
    text("# 📊 Stow — Business Dashboard\nThe numbers behind the booking form and the counter, in one place. Sections: **Right Now** · **Revenue** · **Bookings & Mix** · **Operations** · **Extensions & Upsell** · **Data Quality**. Read docs/lark/2026-09-21-dashboard.md for how each one is worked out."),

    text("## 🔴 Right Now\nWhat is true this second — re-checks itself every time this page is opened."),
    stat("Bags in Storage Now", BOOKINGS, series="Bags", filters=[{"field_name": "Is Active Now", "operator": "is", "value": "true"}]),
    stat("Active Bookings Now", BOOKINGS, count_all=True, filters=[{"field_name": "Is Active Now", "operator": "is", "value": "true"}]),
    stat("Picking Up Today", BOOKINGS, count_all=True, filters=[{"field_name": "Picking Up Today", "operator": "is", "value": "true"}]),
    stat("Dropping Off Today", BOOKINGS, count_all=True, filters=[{"field_name": "Dropping Off Today", "operator": "is", "value": "true"}]),
    stat("Extension Requests Awaiting Reply", EXTENSIONS, count_all=True, filters=[{"field_name": "Status", "operator": "is", "value": "Requested"}]),

    text("## 💰 Revenue\nAll money figures are \"Thực nhận\" (Total − Discount + Extension Fee) — the same number the rest of the base uses. Includes the one-off \"Doanh thu cũ\" ledger row from before this table existed."),
    stat("Total Revenue, All Time", BOOKINGS, series=MONEY_METRIC),
    stat("Revenue This Month", BOOKINGS, series=MONEY_METRIC, filters=[{"field_name": "Submitted This Month", "operator": "is", "value": "true"}]),
    stat("Average Order Value", BOOKINGS, series=[{"field_name": MONEY_METRIC, "rollup": "AVERAGE"}], filters=[REAL_BOOKING]),
    chart("Revenue by Week", "area", BOOKINGS, "Week", series=MONEY_METRIC, sort=BY_WEEK),
    chart("Revenue by Plan", "column", BOOKINGS, "Plan", series=MONEY_METRIC, sort=BY_VALUE_DESC),

    text("## 📦 Bookings & Mix\nWho is booking, and how — everything here is a real booking (a row with a Drop-off), so the ledger row above is left out."),
    stat("Total Bookings, All Time", BOOKINGS, count_all=True, filters=[REAL_BOOKING]),
    chart("Bookings by Week", "column", BOOKINGS, "Week", count_all=True, filters=[REAL_BOOKING], sort=BY_WEEK),
    chart("Bookings by Plan", "ring", BOOKINGS, "Plan", count_all=True, filters=[REAL_BOOKING]),
    chart("Bookings by Lane", "ring", BOOKINGS, "Lane", count_all=True, filters=[REAL_BOOKING]),
    chart("Bookings by Source", "pie", BOOKINGS, "Source", count_all=True, filters=[REAL_BOOKING]),
    chart("Bookings by Status", "column", BOOKINGS, "Status", count_all=True, filters=[REAL_BOOKING]),

    text("## 🧳 Operations\nHow much storage the shop is actually using."),
    stat("Total Bag-Nights Stored, All Time", BOOKINGS, series="Bag-Days"),
    stat("Average Length of Stay (days)", BOOKINGS, series=[{"field_name": "Stay Days", "rollup": "AVERAGE"}], filters=[{"field_name": "Stay Valid", "operator": "is", "value": "true"}]),

    text("## 🔁 Extensions & Upsell\nFrom the \"extend my storage\" link (2026-09-20). The Extensions table starts empty, so these fill in as customers use it."),
    stat("Extension Requests, All Time", EXTENSIONS, count_all=True),
    chart("Extension Requests by Status", "column", EXTENSIONS, "Status", count_all=True),
    stat("Extension Revenue Confirmed", EXTENSIONS, series="Extension Total (VND)",
         filters={"conjunction": "or", "conditions": [{"field_name": "Status", "operator": "is", "value": "Paid"}, {"field_name": "Status", "operator": "is", "value": "Complete"}]}),

    text("## 🧹 Data Quality\nSmall, staff-actionable counts, not for the owner's headline numbers."),
    stat("Bookings Missing WhatsApp", BOOKINGS, count_all=True, filters=[{"field_name": "WhatsApp", "operator": "isEmpty"}, REAL_BOOKING]),
]


def cli(args, table=None, retries=3):
    cmd = ["lark-cli", "base", *args, "--base-token", BASE, "--as", "bot"] + (["--table-id", table] if table else [])
    last_raw = None
    for attempt in range(retries):
        try:
            out = subprocess.run(cmd, capture_output=True, text=True)
        except FileNotFoundError:
            sys.exit('lark-cli was not found. Run this first:\n  export PATH="$HOME/.nvm/versions/node/v22.23.1/bin:$PATH"\nthen run the same command again. Nothing was written.')
        last_raw = out
        try:
            data = json.loads(out.stdout)
        except ValueError:
            data = None  # a genuinely truncated/malformed response is rare but worth one retry
        transient = data is None
        if transient and attempt < retries - 1:
            wait = 3 * (attempt + 1)
            print(f"   (that one came back malformed, retrying in {wait}s...)")
            time.sleep(wait)
            continue
        if data is None:
            sys.exit(f"lark-cli's output could not be read after {retries} tries: {' '.join(args)}\n{last_raw.stdout[:800]}\n{last_raw.stderr[:800]}")
        return data  # caller decides what a failure means (some are expected, e.g. the experimental formula)


def die_on_error(data, context):
    if data.get("ok") is False:
        sys.exit(f"{context}: {json.dumps(data.get('error'), ensure_ascii=False)[:900]}")
    return data


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--apply", action="store_true", help="write (default: dry run)")
    a = ap.parse_args()
    print(("APPLY" if a.apply else "DRY RUN (nothing is written)") + "\n")

    tables = {t["name"]: t for t in die_on_error(cli(["+table-list"]), "table list")["data"]["tables"]}
    for needed in (BOOKINGS, EXTENSIONS):
        if needed not in tables:
            sys.exit(f'There is no table called "{needed}".')
    bookings_id = tables[BOOKINGS]["id"]

    # ── 1. formula columns on Bookings ──
    REPEAT_FIELD_NAMES = {"Bookings by this Customer", "Is Repeat Customer"}
    have = {f["name"] for f in die_on_error(cli(["+field-list", "--limit", "100"], bookings_id), "field list")["data"]["fields"]}
    missing = [f for f in FIELDS if f["name"] not in have]
    print(f'Bookings ({bookings_id}): {len(FIELDS) - len(missing)}/{len(FIELDS)} formula columns already there.')
    for f in missing:
        print(f"   would add: {f['name']}")

    if a.apply:
        for f in missing:
            r = cli(["+field-create", "--json", json.dumps(f, ensure_ascii=False), "--i-have-read-guide"], bookings_id)
            if r.get("ok") is False:
                msg = json.dumps(r.get("error"), ensure_ascii=False)[:500]
                if f["name"] in REPEAT_FIELD_NAMES:
                    print(f'   SKIPPED "{f["name"]}": Lark refused it ({msg}). This was flagged EXPERIMENTAL; the repeat-customer block will be skipped.')
                    continue
                sys.exit(f'could not add column "{f["name"]}": {msg}')
            print(f"   added: {f['name']}")
            time.sleep(0.5)  # be gentle with the API
        have = {f["name"] for f in die_on_error(cli(["+field-list", "--limit", "100"], bookings_id), "field list (re-check)")["data"]["fields"]}
        print("\nDone adding columns." if missing else "")
    else:
        print("\nDry run finished for the columns. Run again with --apply to add them.")

    repeat_customer_ready = REPEAT_FIELD_NAMES <= have

    blocks = list(BLOCKS)
    if repeat_customer_ready:
        blocks.append(REPEAT_CUSTOMER_BLOCK)
    else:
        print('   (the "Bookings From Repeat Customers" block will be skipped until the repeat-customer columns exist)')

    # ── 2. find the dashboard to rebuild ──
    #
    # The owner already had one, named "Revenue", built by hand before this
    # script existed. Told to replace it (not make a second one), this reuses
    # that dashboard's id: same URL and place in the sidebar for the owner,
    # just renamed and with its old blocks swapped for the ones below.
    dashboards = die_on_error(cli(["+dashboard-list"]), "dashboard list")["data"]
    existing = {d["name"]: d for d in (dashboards.get("dashboards") or dashboards.get("items") or [])}
    print(f'\nexisting dashboards: {", ".join(existing) or "none"}')

    target_name = DASHBOARD_NAME if DASHBOARD_NAME in existing else (OLD_DASHBOARD_NAME if OLD_DASHBOARD_NAME in existing else None)
    if not target_name:
        sys.exit(f'Found neither "{DASHBOARD_NAME}" nor "{OLD_DASHBOARD_NAME}" to rebuild, and this script is for replacing that existing dashboard, not creating a fresh one. Rename the one to rebuild to "{OLD_DASHBOARD_NAME}", or ask for a plain "create a new dashboard" script instead.')
    dashboard_id = existing[target_name].get("dashboard_id") or existing[target_name].get("id")
    print(f'rebuilding "{target_name}" ({dashboard_id}).')

    page_token, have_blocks = None, {}
    while True:
        args = ["+dashboard-block-list", "--dashboard-id", dashboard_id, "--page-size", "100"]
        if page_token:
            args += ["--page-token", page_token]
        page = die_on_error(cli(args), "dashboard block list")["data"]
        for b in page.get("blocks") or page.get("items") or []:
            have_blocks[b.get("name")] = b.get("block_id") or b.get("id")
        if not page.get("has_more"):
            break
        page_token = page.get("page_token")

    to_delete = [have_blocks[n] for n in OLD_BLOCK_NAMES if n in have_blocks]
    to_add = [b for b in blocks if b["name"] not in have_blocks]
    print(f'old blocks to remove: {[n for n in OLD_BLOCK_NAMES if n in have_blocks] or "none (already gone)"}')
    print(f"{len(have_blocks) - len(to_delete)}/{len(blocks)} new-style blocks already there. Missing: {[b['name'] for b in to_add] or 'none'}")

    if target_name != DASHBOARD_NAME:
        print(f'\nwould rename "{target_name}" to "{DASHBOARD_NAME}"')
    if not to_delete and not to_add and target_name == DASHBOARD_NAME:
        print("Nothing to do.")
        return
    if not a.apply:
        print("\nDry run finished. Run again with --apply to rename it, remove the old blocks and add the new ones.")
        return

    if target_name != DASHBOARD_NAME:
        die_on_error(cli(["+dashboard-update", "--dashboard-id", dashboard_id, "--name", DASHBOARD_NAME]), "dashboard rename")
        print(f'renamed to "{DASHBOARD_NAME}"')

    for block_id in to_delete:
        die_on_error(cli(["+dashboard-block-delete", "--dashboard-id", dashboard_id, "--block-id", block_id, "--yes"]), f"deleting old block {block_id}")
        print(f"   removed old block {block_id}")
        time.sleep(0.3)

    print(f"\ncreating {len(to_add)} block(s), one at a time (must be serial)...")
    for b in to_add:
        r = cli(["+dashboard-block-create", "--dashboard-id", dashboard_id, "--name", b["name"], "--type", b["type"], "--data-config", json.dumps(b["data_config"], ensure_ascii=False)])
        if r.get("ok") is False:
            sys.exit(f'block "{b["name"]}" failed: {json.dumps(r.get("error"), ensure_ascii=False)[:900]}')
        print(f"   created: {b['name']} ({b['type']})")
        time.sleep(0.3)  # be gentle with the API; blocks must be sequential anyway

    print("\narranging the dashboard's layout (it now has a very different block set)...")
    die_on_error(cli(["+dashboard-arrange", "--dashboard-id", dashboard_id]), "dashboard arrange")
    print("arranged.")

    print(f"\nDone. Dashboard id: {dashboard_id}")


if __name__ == "__main__":
    main()
