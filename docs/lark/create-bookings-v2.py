#!/usr/bin/env python3
"""Create the "Bookings v2" table: one column for everything the booking form collects or works out.

  python3 docs/lark/create-bookings-v2.py                     # dry run (default): only reads, prints the plan
  python3 docs/lark/create-bookings-v2.py --apply             # create the table (or add what is missing)

Safe by design:
  * A dry run only reads. --apply only ever writes to the table it creates (found by name).
  * It never touches "Bookings" or "Test", or any row of any table.
  * Repeatable: if the table already exists it only adds the columns that are missing.
Read docs/lark/2026-09-20-bookings-v2.md for why each column exists.
Needs lark-cli (Node >= 20.12) on PATH: export PATH="$HOME/.nvm/versions/node/v22.23.1/bin:$PATH"
"""
import argparse, json, os, subprocess, sys

BASE = os.environ.get("LARK_BASE_APP_TOKEN", "GrotbcqWoafD0NsZDVglv405gQg")
PROTECTED = {"Bookings", "Test"}  # the existing tables: this script must never write to them
DEFAULT_NAME = "Bookings v2 (test)"

# Same colours as the existing Status / Lane / Plan columns, so staff see what they are used to.
def opts(*pairs):
    return [{"name": n, "hue": h, "lightness": "Lighter"} for n, h in pairs]

MONEY = {"type": "plain", "precision": 0, "thousands_separator": True}
WHEN = {"format": "yyyy-MM-dd HH:mm"}

FIELDS = [
    # ── the booking ──
    {"type": "text", "name": "Reference", "description": "STW-YYMMDD-XXXXXX, made by the booking form. YYMMDD is the drop-off day. XXXXXX is 6 random characters with no vowels and no 0/O/1/I/L, so it is safe to write on a luggage tag. Also the first column of the table. Row No. is the column Lark guarantees unique."},
    {"type": "select", "name": "Status", "multiple": False, "default_value": ["Booking"],
     "options": opts(("Booking", "Blue"), ("Confirm", "Orange"), ("Paid", "Wathet"), ("Complete", "Yellow"), ("Cancel", "Turquoise")),
     "description": "A new booking starts as Booking. Staff move it on."},
    {"type": "select", "name": "Source", "multiple": False, "options": opts(("Booking Form", "Blue"), ("Intake", "Purple"))},
    {"type": "created_at", "name": "Submitted at", "style": WHEN},
    # ── the plan ──
    {"type": "select", "name": "Lane", "multiple": False, "options": opts(("Flexible", "Wathet"), ("Flat Rate", "Purple"), ("Custom", "Carmine"))},
    {"type": "select", "name": "Plan", "multiple": False,
     "options": opts(("By the Hour", "Blue"), ("By the Day", "Turquoise"), ("Mini", "Green"), ("Strand", "Orange"), ("Long Stay", "Purple"), ("Custom", "Carmine"))},
    {"type": "datetime", "name": "Drop-off", "style": WHEN, "description": "Date and time together, Vietnam time."},
    {"type": "datetime", "name": "Pick-up", "style": WHEN, "description": "The pick-up the customer chose, always inside what the plan allows."},
    {"type": "text", "name": "Duration", "description": "How long the luggage is stored: the time from Drop-off to Pick-up, in days, hours and minutes (e.g. 46 days, 1 day 7 hours). Worked out and written by the booking form."},
    {"type": "number", "name": "Bags", "style": {"type": "plain", "precision": 0}},
    {"type": "number", "name": "Oversized Bags", "style": {"type": "plain", "precision": 0}, "description": "How many of the bags are oversized (28in+, bike, surfboard). 0 = none."},
    # ── the money ──
    {"type": "number", "name": "Price per Bag", "style": MONEY, "description": "The stay for one bag, before any oversized surcharge."},
    {"type": "number", "name": "Oversized Surcharge", "style": MONEY, "description": "Total surcharge for all oversized bags."},
    {"type": "number", "name": "Total (VND)", "style": MONEY, "description": "What the form quoted: Price per Bag x Bags + Oversized Surcharge."},
    {"type": "number", "name": "Discount", "style": MONEY, "description": "Filled by staff."},
    {"type": "number", "name": "Extension Fee", "style": MONEY, "description": "Extra money collected later, e.g. when the customer extends. Filled by staff. Was 'Extand' in the old table."},
    # ── the customer ──
    {"type": "text", "name": "Name"},
    {"type": "text", "name": "WhatsApp", "description": "International format with no spaces, e.g. +84905955161."},
    {"type": "text", "name": "Email"},
    {"type": "text", "name": "Phone Country", "description": "The country picked next to the WhatsApp number, as a 2-letter code (VN, IT, JP...)."},
    # ── the terms the customer agreed to ──
    {"type": "checkbox", "name": "Terms Agreed", "description": "Ticked when the customer read and accepted the Terms of Service and Privacy Policy in the form."},
    {"type": "datetime", "name": "Terms Agreed At", "style": WHEN},
    {"type": "text", "name": "Terms Version", "description": "The Terms effective date the customer agreed to."},
    # ── notes ──
    {"type": "text", "name": "Price Detail", "description": "How the total was worked out, step by step. Written by the booking form."},
    {"type": "text", "name": "Note", "description": "Filled by staff."},
    {"type": "auto_number", "name": "Row No.", "style": {"rules": [{"type": "incremental_number", "length": 5}]},
     "description": "A number Lark gives every row and never repeats, even when two rows share a Reference (for example an extension). Use it when a row must be told apart for certain."},
]
# Made last: a formula can only refer to columns that already exist.
FORMULA = {"type": "formula", "name": "Thực nhận", "expression": "[Total (VND)]-[Discount]+[Extension Fee]",
           "description": "What was actually received: Total - Discount + Extension Fee. Same rule as the old table."}


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


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--name", default=DEFAULT_NAME, help=f'table name (default "{DEFAULT_NAME}")')
    ap.add_argument("--apply", action="store_true", help="create the table / add missing columns (default: dry run)")
    a = ap.parse_args()
    if a.name in PROTECTED:
        sys.exit(f'"{a.name}" is an existing table. This script only creates a new one.')

    print(("APPLY" if a.apply else "DRY RUN (nothing is written)") + f' - table "{a.name}"\n')
    tables = {t["name"]: t for t in cli(["+table-list"])["data"]["tables"]}
    print("existing tables:", ", ".join(f"{n} ({t['records_count']} rows)" for n, t in tables.items()))

    plain = FIELDS  # the first one becomes the primary column
    if a.name not in tables:
        print(f'\nThe table "{a.name}" does not exist. It will be created with {len(plain) + 1} columns:')
        for f in plain + [FORMULA]:
            print(f"   - {f['name']:20} {f['type']}")
        if not a.apply:
            print("\nDry run finished. Run again with --apply to create it.")
            return
        r = cli(["+table-create", "--name", a.name, "--fields", json.dumps(plain, ensure_ascii=False)])
        table_id = (r.get("data", {}).get("table", {}) or r.get("data", {})).get("id") or r["data"].get("table_id")
        print(f"\ncreated table {table_id}")
        cli(["+field-create", "--json", json.dumps(FORMULA, ensure_ascii=False), "--i-have-read-guide"], table_id)
        print(f"created formula column {FORMULA['name']}")
        print(f"\nDone. Table id: {table_id}")
        return

    table_id = tables[a.name]["id"]
    have = {f["name"] for f in cli(["+field-list", "--limit", "100"], table_id)["data"]["fields"]}
    missing = [f for f in plain + [FORMULA] if f["name"] not in have]
    print(f'\nThe table "{a.name}" exists ({table_id}). Columns missing: {[f["name"] for f in missing] or "none"}')
    if not missing:
        print("Nothing to do.")
        return
    if not a.apply:
        print("Dry run finished. Run again with --apply to add them.")
        return
    for f in missing:
        extra = ["--i-have-read-guide"] if f["type"] == "formula" else []
        cli(["+field-create", "--json", json.dumps(f, ensure_ascii=False), *extra], table_id)
        print("added column", f["name"])
    print("Done.")


if __name__ == "__main__":
    main()
