#!/usr/bin/env python3
"""Create the "Extensions" table: one row for every "extend my storage" request a customer sends.

  python3 docs/lark/create-extensions.py                         # dry run (default): only reads, prints the plan
  python3 docs/lark/create-extensions.py --apply                 # create the table (or add what is missing)
  python3 docs/lark/create-extensions.py --add-extend-link       # dry run: the "Extend Link" column for Bookings
  python3 docs/lark/create-extensions.py --add-extend-link --apply

Safe by design:
  * A dry run only reads. --apply only writes to the table it creates (found by name).
  * Creating the table never touches "Bookings", "Bookings (old, archived)", "Test" or any row of any table.
  * The one change to an existing table is --add-extend-link, which adds ONE formula column to
    "Bookings" (it changes no row and no other column) and is a separate, explicit step.
  * Repeatable: if the table or the column already exists it only adds what is missing.
Read docs/lark/2026-09-20-extension-form.md for how the form works and why each column exists.
Needs lark-cli (Node >= 20.12) on PATH: export PATH="$HOME/.nvm/versions/node/v22.23.1/bin:$PATH"
"""
import argparse, json, os, subprocess, sys

BASE = os.environ.get("LARK_BASE_APP_TOKEN", "GrotbcqWoafD0NsZDVglv405gQg")
TABLE_NAME = "Extensions"
BOOKINGS = "Bookings"  # the live table the requests link to
PROTECTED = {"Bookings", "Bookings (old, archived)", "Test", "Chi"}  # existing tables: creating a table must never write to them
SITE = "https://www.stowdanang.com"


def opts(*pairs):
    return [{"name": n, "hue": h, "lightness": "Lighter"} for n, h in pairs]


WHEN = {"format": "yyyy-MM-dd HH:mm"}
DAY = {"format": "yyyy-MM-dd"}

FIELDS = [
    # ── the request (what the customer said) ──
    {"type": "text", "name": "Booking ID", "description": "The Booking ID from the customer's link (STW-YYMMDD-XXXXXX). The form only saves a request when a booking with this ID exists and is still open. Also the first column of the table."},
    {"type": "select", "name": "Status", "multiple": False, "default_value": ["Requested"],
     "options": opts(("Requested", "Blue"), ("Confirm", "Orange"), ("Paid", "Wathet"), ("Complete", "Yellow"), ("Cancel", "Turquoise")),
     "description": "A new request starts as Requested. Staff move it on: Confirm (price and date agreed), Paid, Complete (the booking row is updated), Cancel."},
    {"type": "datetime", "name": "Submitted at", "style": WHEN, "default_value": {"$slot": "record_created_time"}, "description": "When the customer sent the request."},
    {"type": "number", "name": "Bags to Extend", "style": {"type": "plain", "precision": 0}, "description": "How many bags the customer wants to keep longer. Never more than the booking has."},
    {"type": "datetime", "name": "New Pick-up Date", "style": DAY, "description": "The day the customer wants to collect. Only the day is asked; the time is agreed on WhatsApp."},
    # ── who (copied from the booking row that was matched, exactly as it is there) ──
    {"type": "text", "name": "Name", "description": "Copied from the booking. The customer does not type it again."},
    {"type": "text", "name": "WhatsApp", "description": "Copied from the booking, exactly as it is written there."},
    {"type": "text", "name": "Email", "description": "Copied from the booking."},
    # ── what the booking said when the request came in ──
    {"type": "number", "name": "Bags Booked", "style": {"type": "plain", "precision": 0}, "description": "How many bags the booking has. Blank if the booking never recorded it."},
    {"type": "datetime", "name": "Pick-up Now", "style": WHEN, "description": "The booking's pick-up when the request came in."},
    {"type": "datetime", "name": "Plan End", "style": WHEN, "description": "When the plan the customer paid for ends, from the booking. Blank if the booking never recorded it."},
    {"type": "number", "name": "Days Past Plan End", "style": {"type": "plain", "precision": 0}, "description": "How many days after Plan End the new date falls. 0 = inside the plan already paid for. Blank when the booking has no Plan End."},
    # ── staff ──
    {"type": "text", "name": "Note", "description": "Filled by staff. Put the Extension Fee on the booking row, as before, so the money stays in one place."},
    {"type": "auto_number", "name": "Row No.", "style": {"rules": [{"type": "incremental_number", "length": 5}]},
     "description": "A number Lark gives every row and never repeats."},
]


def link_field(bookings_id):
    # One-way: the link is only on this table, so the Bookings table gets no new column from it.
    return {"type": "link", "name": "Booking", "link_table": bookings_id, "bidirectional": False}


TODO_VIEW = {"name": "To do", "type": "grid"}
TODO_FILTER = {"logic": "and", "conditions": [["Status", "intersects", ["Requested"]]]}

EXTEND_LINK = {"type": "formula", "name": "Extend Link", "expression": f'"{SITE}/extend/"&[Reference]',
               "description": "The link to send a customer who wants more time. It carries the Booking ID, so the form knows the booking and asks for nothing about the customer."}


def cli(args, table=None):
    cmd = ["lark-cli", "base", *args, "--base-token", BASE, "--as", "bot"] + (["--table-id", table] if table else [])
    try:
        out = subprocess.run(cmd, capture_output=True, text=True)
    except FileNotFoundError:
        sys.exit('lark-cli was not found. Run this first:\n  export PATH="$HOME/.nvm/versions/node/v22.23.1/bin:$PATH"\nthen run the same command again. Nothing was written.')
    try:
        data = json.loads(out.stdout)
    except ValueError:
        sys.exit(f"lark-cli failed: {' '.join(args)}\n{out.stdout[:500]}\n{out.stderr[:500]}")
    if data.get("ok") is False:
        sys.exit(f"Lark error: {json.dumps(data.get('error'), ensure_ascii=False)[:700]}")
    return data


def add_extend_link(apply, tables):
    if BOOKINGS not in tables:
        sys.exit(f'There is no table called "{BOOKINGS}".')
    tid = tables[BOOKINGS]["id"]
    have = {f["name"] for f in cli(["+field-list", "--limit", "100"], tid)["data"]["fields"]}
    if "Reference" not in have:
        sys.exit('The Bookings table has no "Reference" column, so the link cannot be built.')
    if EXTEND_LINK["name"] in have:
        print(f'"{BOOKINGS}" already has an "{EXTEND_LINK["name"]}" column. Nothing to do.')
        return
    print(f'"{BOOKINGS}" ({tid}) has no "{EXTEND_LINK["name"]}" column. It would add one formula column:')
    print(f'   {EXTEND_LINK["name"]} = {EXTEND_LINK["expression"]}')
    print("   No row and no other column changes.")
    if not apply:
        print("\nDry run finished. Run again with --apply to add it.")
        return
    cli(["+field-create", "--json", json.dumps(EXTEND_LINK, ensure_ascii=False), "--i-have-read-guide"], tid)
    print(f'\nAdded the "{EXTEND_LINK["name"]}" column to "{BOOKINGS}".')


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--apply", action="store_true", help="write (default: dry run)")
    ap.add_argument("--add-extend-link", action="store_true", help='add the "Extend Link" column to Bookings instead of creating the table')
    a = ap.parse_args()

    print(("APPLY" if a.apply else "DRY RUN (nothing is written)") + "\n")
    tables = {t["name"]: t for t in cli(["+table-list"])["data"]["tables"]}
    print("existing tables:", ", ".join(f"{n} ({t['records_count']} rows)" for n, t in tables.items()))

    if a.add_extend_link:
        print()
        add_extend_link(a.apply, tables)
        return
    if TABLE_NAME in PROTECTED:
        sys.exit(f'"{TABLE_NAME}" is an existing table. This script only creates a new one.')
    if BOOKINGS not in tables:
        sys.exit(f'There is no table called "{BOOKINGS}" to link to.')

    link = link_field(tables[BOOKINGS]["id"])
    if TABLE_NAME not in tables:
        print(f'\nThe table "{TABLE_NAME}" does not exist. It will be created with {len(FIELDS) + 1} columns and a "{TODO_VIEW["name"]}" view:')
        for f in FIELDS + [link]:
            print(f"   - {f['name']:20} {f['type']}")
        if not a.apply:
            print("\nDry run finished. Run again with --apply to create it.")
            return
        r = cli(["+table-create", "--name", TABLE_NAME, "--fields", json.dumps(FIELDS, ensure_ascii=False)])
        table_id = (r.get("data", {}).get("table", {}) or r.get("data", {})).get("id") or r["data"].get("table_id")
        print(f"\ncreated table {table_id}")
        cli(["+field-create", "--json", json.dumps(link, ensure_ascii=False)], table_id)
        print(f'created link column {link["name"]} (to {BOOKINGS}, one-way)')
        make_view(table_id)
        print(f"\nDone. Table id: {table_id}")
        print(f"Set LARK_EXTENSIONS_TABLE_ID={table_id} where the website runs (see the doc, section 5).")
        return

    table_id = tables[TABLE_NAME]["id"]
    have = {f["name"] for f in cli(["+field-list", "--limit", "100"], table_id)["data"]["fields"]}
    missing = [f for f in FIELDS + [link] if f["name"] not in have]
    print(f'\nThe table "{TABLE_NAME}" exists ({table_id}). Columns missing: {[f["name"] for f in missing] or "none"}')
    if not missing:
        print("Nothing to do.")
        return
    if not a.apply:
        print("Dry run finished. Run again with --apply to add them.")
        return
    for f in missing:
        cli(["+field-create", "--json", json.dumps(f, ensure_ascii=False)], table_id)
        print("added column", f["name"])
    print("Done.")


def make_view(table_id):
    """A "To do" view: only the requests nobody has dealt with yet."""
    cli(["+view-create", "--json", json.dumps(TODO_VIEW)], table_id)
    views = cli(["+view-list"], table_id)["data"]
    rows = views.get("views") or views.get("items") or []
    view_id = next((v.get("id") or v.get("view_id") for v in rows if v.get("name") == TODO_VIEW["name"] or v.get("view_name") == TODO_VIEW["name"]), None)
    if not view_id:
        print(f'created the "{TODO_VIEW["name"]}" view but could not find its id to set the filter; set it by hand: Status is Requested')
        return
    cli(["+view-set-filter", "--json", json.dumps(TODO_FILTER), "--view-id", view_id], table_id)
    print(f'created view "{TODO_VIEW["name"]}" (Status is Requested)')


if __name__ == "__main__":
    main()
