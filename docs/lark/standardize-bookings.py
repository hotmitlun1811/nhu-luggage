#!/usr/bin/env python3
"""Bring a Stow Bookings Lark table up to the booking-form standard.

The same steps that were run on the "Test" table on 2026-09-20, in a form that
can be repeated on the main "Bookings" table. Read docs/lark/2026-09-20-bookings-standard.md first.

  python3 docs/lark/standardize-bookings.py --table tbl2l32dChIyb8Kd          # dry run (default): only reads
  python3 docs/lark/standardize-bookings.py --table <id> --apply --backup-dir <dir>
  python3 docs/lark/standardize-bookings.py --table <id> --verify <dir>   # read-only: compare the table with the backup

Safe by design:
  * DRY RUN unless --apply is given. A dry run only reads.
  * Additive: adds an option, adds two columns, fixes a formula. Nothing is deleted.
  * Existing cell values change only where the current value is exactly one of
    the known old spellings below; anything else is listed and left alone.
  * With --apply, every record is saved to --backup-dir first, and each change
    is written to undo-log.jsonl there together with the value it replaced.
  * Repeatable: run it again and it reports "nothing to do".
  * The main table needs an extra flag, --i-know-this-is-the-main-table.

Needs lark-cli (Node >= 20.12) logged in as the app, on PATH.
"""
import argparse, json, os, re, subprocess, sys, time

BASE = os.environ.get("LARK_BASE_APP_TOKEN", "GrotbcqWoafD0NsZDVglv405gQg")
MAIN_TABLE = "tblTGHAMqIRiCOgd"  # "Bookings"

# Date = the expected end date. Older rows (no Pickup Time) keep the +30 / +120 day rules,
# so no existing value changes; bookings from the new form use calendar months.
DATE_FORMULA = (
    'IFS([Plan]="By the Hour",[Pickup Date],'
    '[Plan]="By the Day",[Pickup Date],'
    '[Plan]="Custom",[Pickup Date],'
    '[Duration]="2 × 4 months",[Drop-off Date]+240,'
    '[Plan]="Mini",[Drop-off Date]+7,'
    '[Plan]="Strand",IF(ISBLANK([Pickup Time]),[Drop-off Date]+30,EDATE([Drop-off Date],1)),'
    '[Plan]="Long Stay",IF(ISBLANK([Pickup Time]),[Drop-off Date]+120,EDATE([Drop-off Date],4)))'
)
DATE_DESCRIPTION = (
    "Expected end date. By the Hour / By the Day / Custom = pick-up date. Mini = +7 days. "
    "Strand / Long Stay = same date 1 / 4 months later for bookings from the new form "
    "(they have a Pickup Time); older rows keep +30 / +120 days. Long Stay 2 x 4 months = +240."
)
NEW_FIELDS = [
    {"type": "number", "name": "Oversized Count",
     "description": "How many of the bags are oversized (28in+, bike, surfboard). The Oversized checkbox is ticked when this is above 0."},
    {"type": "text", "name": "Price Detail",
     "description": "How the Total was calculated: each plan period, price per bag, oversized surcharge. Written by the booking form."},
]
DURATION = {"1 hours": "1 hour", "Up to 1 month": "1 month", "Up to 1 week": "1 week",
            "Up to 24 hrs": "1 day", "Up to 4 months": "4 months", "1 × 4 months": "4 months"}
LEAVE_ALONE_DURATION = {"2 × 4 months", "Min 1 hr, billed per hr"}


def cli(args, table=None):
    cmd = ["lark-cli", "base", *args, "--base-token", BASE, "--as", "bot"] + (["--table-id", table] if table else [])
    try:
        out = subprocess.run(cmd, capture_output=True, text=True)
    except FileNotFoundError:
        sys.exit("lark-cli was not found. It is installed under Node 22, so run this first:\n"
                 '  export PATH="$HOME/.nvm/versions/node/v22.23.1/bin:$PATH"\n'
                 "then run the same command again. Nothing was written.")
    try:
        data = json.loads(out.stdout)
    except ValueError:
        sys.exit(f"lark-cli failed: {' '.join(args)}\n{out.stdout[:500]}\n{out.stderr[:500]}")
    if data.get("ok") is False:
        sys.exit(f"Lark error: {json.dumps(data.get('error'), ensure_ascii=False)[:600]}")
    return data


def records(table):
    out, offset = [], 0
    while True:
        d = cli(["+record-list", "--limit", "200", "--offset", str(offset), "--format", "json"], table)["data"]
        out += [dict(zip(d["fields"], row), record_id=rid) for row, rid in zip(d["data"], d["record_id_list"])]
        if not d.get("has_more"):
            return out
        offset += 200


def verify(table, backup_dir):
    """Read-only. Every cell must equal the backup, except the cells --apply logged as changed (which must
    equal the logged new value) and the Date formula, whose changes are listed."""
    before = json.load(open(os.path.join(backup_dir, f"records-{table}-before.json")))
    expected = {}
    for line in open(os.path.join(backup_dir, "undo-log.jsonl")):
        e = json.loads(line)
        if e.get("kind") == "cell":
            expected[(e["record_id"], e["field"])] = e["after"]
    fields = {f["name"]: f for f in cli(["+field-list", "--limit", "100"], table)["data"]["fields"]}
    now = {r["record_id"]: r for r in records(table)}
    problems, date_changed, cells_ok = [], [], 0
    for b in before:
        rid, ref = b["record_id"], str(b.get("Reference") or "")[:22]
        if rid not in now:
            problems.append(f"row is missing now: {ref}")
            continue
        for col, old in b.items():
            if col == "record_id":
                continue
            cur = now[rid].get(col)
            if col == "Date":
                if cur != old:
                    date_changed.append((ref, old, cur))
                continue
            want = expected.get((rid, col), old)
            if cur == want:
                cells_ok += 1
            else:
                problems.append(f"{ref} {col}: expected {want!r}, found {cur!r}")
    for name in ("Oversized Count", "Price Detail"):
        if name not in fields:
            problems.append(f"column {name} is missing")
    for name in ("Plan", "Lane"):
        opts = [o["name"] for o in cli(["+field-get", "--field-id", name], table)["data"]["field"]["options"]]
        if "Custom" not in opts:
            problems.append(f"{name} has no Custom option")
    if cli(["+field-get", "--field-id", "Date"], table)["data"]["field"].get("expression") != DATE_FORMULA:
        problems.append("Date formula is not the new one")
    new_rows = [r for rid, r in now.items() if rid not in {b["record_id"] for b in before}]
    print(f"rows in backup: {len(before)} | rows now: {len(now)} | rows added since the backup: {len(new_rows)}")
    print(f"cells checked and correct: {cells_ok} | of those, cells that --apply changed on purpose: {len(expected)}")
    print(f"Date formula values that changed: {len(date_changed)}")
    for ref, old, cur in date_changed:
        print(f"   {ref}: {old!r} -> {cur!r}")
    if problems:
        print(f"\nPROBLEMS ({len(problems)}):")
        for x in problems:
            print("   -", x)
        sys.exit(1)
    print("\nOK: nothing was lost or changed beyond the plan.")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--table", required=True, help="table id, e.g. tbl2l32dChIyb8Kd (Test)")
    ap.add_argument("--apply", action="store_true", help="write the changes (default: dry run)")
    ap.add_argument("--backup-dir", help="required with --apply: where the backup and undo log are saved")
    ap.add_argument("--i-know-this-is-the-main-table", action="store_true")
    ap.add_argument("--verify", metavar="BACKUP_DIR", help="read-only: compare the table with the backup made by --apply")
    a = ap.parse_args()
    if a.verify:
        return verify(a.table, a.verify)
    if a.apply and not a.backup_dir:
        sys.exit("--apply needs --backup-dir")
    if a.apply and a.table == MAIN_TABLE and not a.i_know_this_is_the_main_table:
        sys.exit(f"{MAIN_TABLE} is the main Bookings table. Re-run with --i-know-this-is-the-main-table if that is intended.")
    if a.apply:
        os.makedirs(a.backup_dir, exist_ok=True)
    undo = os.path.join(a.backup_dir or ".", "undo-log.jsonl")

    def log(entry):
        if a.apply:
            with open(undo, "a") as f:
                f.write(json.dumps({**entry, "ts": time.strftime("%Y-%m-%dT%H:%M:%S")}, ensure_ascii=False) + "\n")

    mode = "APPLY" if a.apply else "DRY RUN (nothing is written)"
    print(f"{mode} on table {a.table}{'  <-- MAIN TABLE' if a.table == MAIN_TABLE else ''}\n")
    todo = 0

    fields = {f["name"]: f for f in cli(["+field-list", "--limit", "100"], a.table)["data"]["fields"]}
    for need in ("Plan", "Lane", "Duration", "Phone", "Oversized", "Date"):
        if need not in fields:
            sys.exit(f"This table has no '{need}' column, so it is not a Bookings table. Stopping.")

    if a.apply:  # back everything up before the first write
        json.dump(records(a.table), open(os.path.join(a.backup_dir, f"records-{a.table}-before.json"), "w"), ensure_ascii=False)
        json.dump(list(fields.values()), open(os.path.join(a.backup_dir, f"fields-{a.table}-before.json"), "w"), ensure_ascii=False)
        print(f"backup saved in {a.backup_dir}\n")

    # 1. Date formula
    cur = cli(["+field-get", "--field-id", "Date"], a.table)["data"]["field"]
    if cur.get("expression") != DATE_FORMULA:
        todo += 1
        print("1. Date formula: will be replaced (understands Custom, keeps every existing result)")
        if a.apply:
            log({"kind": "formula", "field": "Date", "before": cur.get("expression")})
            body = {"name": "Date", "type": "formula", "expression": DATE_FORMULA, "description": DATE_DESCRIPTION}
            cli(["+field-update", "--field-id", cur["id"], "--json", json.dumps(body, ensure_ascii=False), "--yes", "--i-have-read-guide"], a.table)
    else:
        print("1. Date formula: already up to date")

    # 2. "Custom" option in Plan and Lane (existing options and colours are kept)
    for name in ("Plan", "Lane"):
        f = cli(["+field-get", "--field-id", name], a.table)["data"]["field"]
        opts = f["options"]
        if any(o["name"] == "Custom" for o in opts):
            print(f"2. {name}: already has Custom")
            continue
        todo += 1
        print(f"2. {name}: will add the option Custom (existing: {[o['name'] for o in opts]})")
        if a.apply:
            new = opts + [{"name": "Custom", "hue": "Carmine", "lightness": "Lighter"}]
            log({"kind": "select-options", "field": name, "before": opts})
            body = {"name": name, "type": "select", "multiple": False, "options": new}
            cli(["+field-update", "--field-id", f["id"], "--json", json.dumps(body, ensure_ascii=False), "--yes"], a.table)

    # 3. new columns
    for nf in NEW_FIELDS:
        if nf["name"] in fields:
            print(f"3. column {nf['name']}: already exists")
            continue
        todo += 1
        print(f"3. column {nf['name']}: will be created")
        if a.apply:
            log({"kind": "field-create", "field": nf["name"]})
            cli(["+field-create", "--json", json.dumps(nf, ensure_ascii=False)], a.table)

    # 4. existing cell values
    recs = records(a.table)
    changes = {}  # record_id -> {column: (before, after)}
    left = []
    for r in recs:
        ref = str(r.get("Reference") or "")[:22]
        ch = {}
        dur = r.get("Duration")
        if dur in DURATION:
            ch["Duration"] = (dur, DURATION[dur])
        elif dur in LEAVE_ALONE_DURATION:
            left.append(f"Duration {dur!r}  ({ref})")
        phone = r.get("Phone")
        if phone and re.fullmatch(r"00\d{6,}", str(phone)):
            ch["Phone"] = (phone, "+" + str(phone)[2:])
        elif phone and not str(phone).startswith("+"):
            left.append(f"Phone without a country code: {str(phone)[:4]}... ({len(str(phone))} digits)  ({ref})")
        if r.get("Oversized") is False and r.get("Oversized Count") in (None, ""):
            ch["Oversized Count"] = (None, 0)
        if ch:
            changes[r["record_id"]] = {"ref": ref, "changes": ch}
    n_cells = sum(len(v["changes"]) for v in changes.values())
    by_col = {}
    for v in changes.values():
        for c in v["changes"]:
            by_col[c] = by_col.get(c, 0) + 1
    if n_cells:
        todo += 1
        print(f"4. cell values: {n_cells} cells in {len(changes)} rows will be normalised {by_col}")
    else:
        print("4. cell values: nothing to normalise")
    if a.apply and n_cells:
        current = {r["record_id"]: r for r in records(a.table)}
        update = {}
        for rid, v in changes.items():
            for col, (before, after) in v["changes"].items():
                if col in current[rid] and current[rid][col] != before:
                    sys.exit(f"{v['ref']} {col}: expected {before!r} but found {current[rid][col]!r}. Nothing more was written.")
                update.setdefault(rid, {})[col] = after
                log({"kind": "cell", "record_id": rid, "ref": v["ref"], "field": col, "before": before, "after": after})
        ids = list(update)
        for i in range(0, len(ids), 200):  # the API takes up to 200 records per call
            cli(["+record-batch-update", "--json", json.dumps({"update_records": {k: update[k] for k in ids[i:i + 200]}}, ensure_ascii=False)], a.table)

    if left:
        print("\nLeft as they are, for the owner to decide:")
        for line in left:
            print("   -", line)
    print(f"\n{'Done.' if a.apply else 'Dry run finished.'} Steps that " + ("were applied" if a.apply else "would change something") + f": {todo}")
    if not a.apply and todo:
        print("Run again with --apply --backup-dir <folder> to make these changes.")


if __name__ == "__main__":
    main()
