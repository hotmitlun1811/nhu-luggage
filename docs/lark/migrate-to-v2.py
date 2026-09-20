#!/usr/bin/env python3
"""Copy the rows of the old table ("Bookings (old, archived)") into the live "Bookings" table, column by column.

  python3 docs/lark/migrate-to-v2.py                              # dry run (default): prints the plan, writes nothing
  python3 docs/lark/migrate-to-v2.py --apply --only recA,recB     # copy just those rows first (a pilot)
  python3 docs/lark/migrate-to-v2.py --apply                      # copy every row not copied yet
  python3 docs/lark/migrate-to-v2.py --verify                     # read-only: check every copied row against its source
  python3 docs/lark/migrate-to-v2.py --add-plan-end [--apply]     # fill the Plan End column on rows already copied

What it guarantees (read docs/lark/2026-09-20-bookings-v2.md, section 8):
  * The old tables are only READ. The only table written is the target, and only with new rows.
  * Nothing is invented. A value the old table never had (a pick-up time, a price per bag, the Terms
    agreement) is left empty, or, for a date with no time, stored as 00:00 and flagged in Migration Note.
  * Nothing is dropped silently. Every old value goes to a new column or is written in Migration Note.
  * Repeatable: each copied row records the id of its source row (Old Record ID), so running it again
    skips what is already there instead of duplicating it.
  * A row with no data at all (only the automatic timestamp) is skipped and listed.
Needs lark-cli (Node >= 20.12) on PATH: export PATH="$HOME/.nvm/versions/node/v22.23.1/bin:$PATH"
"""
import argparse, calendar, json, os, re, subprocess, sys, time
from datetime import datetime, timedelta, timezone

BASE = os.environ.get("LARK_BASE_APP_TOKEN", "GrotbcqWoafD0NsZDVglv405gQg")
SOURCE_NAME = "Bookings (old, archived)"  # renamed on 2026-09-20 when production switched to the new table
TARGET_NAME = "Bookings"
VN = timezone(timedelta(hours=7))  # Vietnam has no daylight saving; the Base's zone is UTC+7 too
PLAN_END_NOTE = "Plan End worked out from the plan's length (the old table did not record it)"
EXTENSION_NOTE = "Plan End covers the original plan only; the customer also paid an extension (Extension Fee), so the real end may be later"
PLACEHOLDER_TIME = "00:00"         # the shop opens at 07:00, so 00:00 can only mean "no time was recorded"

# What counts as data in an old row. The automatic timestamp and the two formula columns do not.
DATA_FIELDS = ["Reference", "Source", "Lane", "Plan", "Oversized", "Drop-off Date", "Drop-off Time", "Duration",
               "Pickup Date", "Pickup Time", "Name", "Phone", "Email", "Pax", "Total (VND)", "Status", "Note",
               "Discount", "Extand", "Extand1", "Extand 2", "Price Detail"]


def one(v):
    """A single-select cell reads back as ["Flexible"]."""
    return v[0] if isinstance(v, list) and len(v) == 1 else v


def meaningful(v):
    return v is not None and v != "" and v != [] and v is not False


def has_data(src):
    return any(meaningful(src.get(k)) for k in DATA_FIELDS)


def when(iso):
    """An old date-time value (always written with an offset) as Vietnam time."""
    return datetime.fromisoformat(iso).astimezone(VN)


def stamp(dt):
    return dt.strftime("%Y-%m-%d %H:%M:%S")  # the format Lark's CLI takes, read in the Base's zone (UTC+7)


def moment(date_iso, time_text):
    """(datetime, is_placeholder) from the old date column plus the old time text. The old date columns held a
    date, so only its calendar date is used; the time comes from the text column, or is 00:00 if there is none."""
    if not date_iso:
        return None, False
    day = when(date_iso).date()
    if time_text:
        m = re.fullmatch(r"(\d{1,2}):(\d{2})", str(time_text).strip())
        if not m:
            raise ValueError(f"unreadable time {time_text!r}")
        return datetime(day.year, day.month, day.day, int(m.group(1)), int(m.group(2)), tzinfo=VN), False
    return datetime(day.year, day.month, day.day, 0, 0, tzinfo=VN), True


def elapsed_label(a, b):
    """Same words as elapsedLabel() in src/lib/lark-booking.ts: "46 days", "1 day 7 hours", "1 hour 30 minutes"."""
    minutes = round((b - a).total_seconds() / 60)
    if minutes <= 0:
        return ""
    days, rest = divmod(minutes, 1440)
    hours, mins = divmod(rest, 60)
    part = lambda n, unit: f"{n} {unit}{'' if n == 1 else 's'}" if n else ""
    return " ".join(p for p in (part(days, "day"), part(hours, "hour"), part(mins, "minute")) if p)


def add_months(dt, months):
    """The same wall-clock time `months` later; a day that is not in that month (31 Jan + 1 month) becomes its last day."""
    year, month = divmod(dt.year * 12 + (dt.month - 1) + months, 12)
    month += 1
    return dt.replace(year=year, month=month, day=min(dt.day, calendar.monthrange(year, month)[1]))


def plan_end(src, drop, drop_placeholder):
    """When the plan an old row paid for ends, from the plan's length. None unless the plan and a real drop-off time are
    known. Rows with no pick-up time were priced under the old rules (Strand 30 days, Long Stay 120), the same as the
    old Date column; rows made by the newer form use calendar months."""
    if not drop or drop_placeholder:
        return None
    plan, label = one(src.get("Plan")), str(src.get("Duration") or "").strip()
    newer_form = bool(src.get("Pickup Time"))
    end = None
    if plan == "By the Day":
        end = drop + timedelta(days=1)
    elif plan == "By the Hour":
        hours = re.fullmatch(r"(\d+) hours?", label)
        end = drop + timedelta(hours=int(hours.group(1))) if hours else None
    elif plan == "Mini":
        end = drop + timedelta(days=7)
    elif plan == "Strand":
        end = add_months(drop, 1) if newer_form else drop + timedelta(days=30)
    elif plan == "Long Stay":
        if label == "2 × 4 months":
            end = drop + timedelta(days=240)
        else:
            end = add_months(drop, 4) if newer_form else drop + timedelta(days=120)
    # A plan cannot end before the customer collected. If it seems to, the row does not describe one whole plan
    # (for example a row that only adds the extra hours of an extension), so nothing is filled in.
    pick, pick_placeholder = moment(src.get("Pickup Date"), src.get("Pickup Time"))
    if end and pick and not pick_placeholder and end + timedelta(minutes=60) < pick:
        return None
    return end


def plan_end_notes(src):
    """What to say next to a Plan End that was worked out from the plan's length."""
    notes = [PLAN_END_NOTE]
    if src.get("Extand"):
        notes.append(EXTENSION_NOTE)
    return notes


def map_row(src):
    """One old row -> (the new row's fields, the notes for Migration Note)."""
    f, notes = {}, []

    def put(key, value):
        if value is not None and value != "":
            f[key] = value

    put("Reference", src.get("Reference"))
    put("Status", one(src.get("Status")))
    put("Source", one(src.get("Source")))
    put("Lane", one(src.get("Lane")))
    put("Plan", one(src.get("Plan")))
    if src.get("Submitted at"):
        put("Submitted at", stamp(when(src["Submitted at"])))  # when the customer really booked, not when this copy ran

    drop, drop_ph = moment(src.get("Drop-off Date"), src.get("Drop-off Time"))
    pick, pick_ph = moment(src.get("Pickup Date"), src.get("Pickup Time"))
    if drop:
        f["Drop-off"] = stamp(drop)
    if pick:
        f["Pick-up"] = stamp(pick)
    end = plan_end(src, drop, drop_ph)
    if end:
        f["Plan End"] = stamp(end)
        notes.extend(plan_end_notes(src))
    if drop_ph:
        notes.append("Drop-off time was not recorded; 00:00 is a placeholder")
    if pick_ph:
        notes.append("Pick-up time was not recorded; 00:00 is a placeholder")

    # Duration is the real time between the two moments, so only when both times are known.
    new_duration = ""
    if drop and pick and not drop_ph and not pick_ph:
        new_duration = elapsed_label(drop, pick)
        if not new_duration:
            notes.append("Pick-up is not after drop-off")
    put("Duration", new_duration)
    old_duration = src.get("Duration")
    if old_duration and old_duration != new_duration:
        notes.append(f"Old Duration: {old_duration}")

    put("Bags", src.get("Pax"))
    count = src.get("Oversized Count")
    if count is not None:
        f["Oversized Bags"] = count
    elif src.get("Oversized") is False:
        f["Oversized Bags"] = 0
    if src.get("Oversized") is True and count is None:
        notes.append("Oversized was ticked but how many bags was never recorded")
    if re.search(r"oversize", str(src.get("Note") or ""), re.I) and not f.get("Oversized Bags"):
        notes.append("The Note mentions oversize but no oversized bag was recorded; please check")

    put("Total (VND)", src.get("Total (VND)"))
    put("Discount", src.get("Discount"))
    put("Extension Fee", src.get("Extand"))
    put("Name", src.get("Name"))
    put("WhatsApp", src.get("Phone"))
    put("Email", src.get("Email"))
    put("Note", src.get("Note"))
    put("Price Detail", src.get("Price Detail"))  # only rows made by the newer form have it
    if src.get("Phone") and not str(src["Phone"]).startswith("+"):
        notes.append("WhatsApp number has no country code")

    # Old columns that have no place in the new table: keep what they said.
    if src.get("Extand1") is True:
        notes.append("Extand1 was ticked in the old table")
    e2 = one(src.get("Extand 2"))
    if e2 and e2 != one(src.get("Lane")):
        notes.append(f"Extand 2 was {e2}")

    f["Old Record ID"] = src["record_id"]
    if notes:
        f["Migration Note"] = " | ".join(notes)
    return f, notes


# ── talking to Lark ──

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


def records(table):
    out, offset = [], 0
    while True:
        d = cli(["+record-list", "--limit", "200", "--offset", str(offset), "--format", "json"], table)["data"]
        out += [dict(zip(d["fields"], row), record_id=rid) for row, rid in zip(d["data"], d["record_id_list"])]
        if not d.get("has_more"):
            return out
        offset += 200


def find_tables(target_name):
    tables = {t["name"]: t["id"] for t in cli(["+table-list"])["data"]["tables"]}
    if target_name in {SOURCE_NAME, "Test"}:
        sys.exit(f'"{target_name}" is an existing table; the target must be the new one.')
    for name in (SOURCE_NAME, target_name):
        if name not in tables:
            sys.exit(f'No table called "{name}" in the Base.')
    return tables[SOURCE_NAME], tables[target_name]


def check_options(target, rows):
    """A select column only takes options it already has, so find out before writing anything."""
    fields = {f["name"]: f for f in cli(["+field-list", "--limit", "100"], target)["data"]["fields"]}
    for need in ("Old Record ID", "Migration Note", "Submitted at", "Drop-off", "Pick-up", "Extension Fee", "Oversized Bags"):
        if need not in fields:
            sys.exit(f"The target has no '{need}' column. Nothing was written.")
    if fields["Submitted at"]["type"] != "datetime":
        sys.exit("'Submitted at' is still the automatic timestamp, so it would show today's date for every old row. Nothing was written.")
    for col in ("Status", "Source", "Lane", "Plan"):
        have = {o["name"] for o in fields[col]["options"]}
        wanted = {f[col] for f, _ in rows if col in f}
        if wanted - have:
            sys.exit(f"The target's {col} column has no option {sorted(wanted - have)}. Nothing was written.")


# ── verifying ──

def verify(source, target, only=None, ignore=()):
    src_rows = [r for r in records(source) if has_data(r) and (not only or r["record_id"] in only)]
    tgt_all = records(target)
    tgt = {}
    problems = []
    for r in tgt_all:
        oid = r.get("Old Record ID")
        if oid:
            if oid in tgt:
                problems.append(f"copied twice: {oid}")
            tgt[oid] = r
    num = lambda v: None if v in (None, "") else float(v)
    checked = 0
    for s in src_rows:
        ref = str(s.get("Reference"))[:20]
        t = tgt.get(s["record_id"])
        if not t:
            problems.append(f"NOT COPIED: {ref} ({s['record_id']})")
            continue

        def same(label, want, got):
            nonlocal checked
            if label in ignore:
                return
            checked += 1
            if want != got:
                problems.append(f"{ref} {label}: source {want!r}, copy {got!r}")

        for src_col, tgt_col in (("Reference", "Reference"), ("Name", "Name"), ("Phone", "WhatsApp"), ("Email", "Email"), ("Note", "Note"), ("Price Detail", "Price Detail")):
            same(tgt_col, s.get(src_col), t.get(tgt_col))
        for col in ("Status", "Source", "Lane", "Plan"):
            same(col, one(s.get(col)), one(t.get(col)))
        same("Bags", num(s.get("Pax")), num(t.get("Bags")))
        for src_col, tgt_col in (("Total (VND)", "Total (VND)"), ("Discount", "Discount"), ("Extand", "Extension Fee")):
            same(tgt_col, num(s.get(src_col)), num(t.get(tgt_col)))
        want_over = s.get("Oversized Count") if s.get("Oversized Count") is not None else (0 if s.get("Oversized") is False else None)
        same("Oversized Bags", num(want_over), num(t.get("Oversized Bags")))
        same("Received (Thực nhận)", num(s.get("Thực nhận")), num(t.get("Thực nhận")))
        same("Submitted at", when(s["Submitted at"]).timestamp() if s.get("Submitted at") else None,
             when(t["Submitted at"]).timestamp() if t.get("Submitted at") else None)
        for label, d_col, t_col, out_col in (("Drop-off", "Drop-off Date", "Drop-off Time", "Drop-off"), ("Pick-up", "Pickup Date", "Pickup Time", "Pick-up")):
            want = None
            if s.get(d_col):
                want = when(s[d_col]).strftime("%Y-%m-%d ") + (str(s[t_col]).zfill(5) if s.get(t_col) else PLACEHOLDER_TIME)
            got = when(t[out_col]).strftime("%Y-%m-%d %H:%M") if t.get(out_col) else None
            same(label, want, got)
        # Duration is worked out again from what was stored, not from the source.
        if t.get("Drop-off") and t.get("Pick-up") and s.get("Drop-off Time") and s.get("Pickup Time"):
            same("Duration", elapsed_label(when(t["Drop-off"]), when(t["Pick-up"])), t.get("Duration") or "")
        else:
            same("Duration (no exact times)", "", t.get("Duration") or "")
        # Nothing may be lost: what the old Duration said is either the new Duration or in the note.
        if s.get("Duration") and s["Duration"] != t.get("Duration") and f"Old Duration: {s['Duration']}" not in str(t.get("Migration Note")):
            problems.append(f"{ref}: old Duration {s['Duration']!r} is neither the new Duration nor in Migration Note")
        if s.get("Extand1") is True and "Extand1" not in str(t.get("Migration Note")):
            problems.append(f"{ref}: Extand1 was ticked but is not in Migration Note")

    total = lambda rows, col: sum(num(r.get(col)) or 0 for r in rows)
    copied = [tgt[s["record_id"]] for s in src_rows if s["record_id"] in tgt]
    print(f"source rows with data: {len(src_rows)} | found in the copy: {len(copied)} | rows in the target with an Old Record ID: {len(tgt)}")
    print(f"values compared: {checked}")
    for col_s, col_t in (("Total (VND)", "Total (VND)"), ("Discount", "Discount"), ("Extand", "Extension Fee")):
        if col_t in ignore:
            continue
        a, b = total(src_rows, col_s), total(copied, col_t)
        print(f"   sum of {col_t:14} source {a:>12,.0f}   copy {b:>12,.0f}   {'same' if a == b else 'DIFFERENT'}")
        if a != b:
            problems.append(f"sum of {col_t} differs")
    for col in ("Status", "Plan"):
        if col in ignore:
            continue
        cs = {}; ct = {}
        for r in src_rows: cs[str(one(r.get(col)))] = cs.get(str(one(r.get(col))), 0) + 1
        for r in copied: ct[str(one(r.get(col)))] = ct.get(str(one(r.get(col))), 0) + 1
        print(f"   {col:6} counts: {'same' if cs == ct else 'DIFFERENT'}  {dict(sorted(cs.items()))}")
        if cs != ct:
            problems.append(f"{col} counts differ: source {cs} copy {ct}")
    if problems:
        print(f"\nPROBLEMS ({len(problems)}):")
        for p in problems:
            print("   -", p)
        sys.exit(1)
    print("\nOK: every copied value matches its source, and nothing is missing.")


def add_plan_end(source, target, apply, backup_dir):
    """Fill Plan End (and say so in Migration Note) on rows already copied. Nothing else on any row changes."""
    src = {r["record_id"]: r for r in records(source)}
    before = records(target)
    updates, shown = {}, []
    for t in before:
        s = src.get(t.get("Old Record ID"))
        if not s or t.get("Plan End"):
            continue
        drop, drop_ph = moment(s.get("Drop-off Date"), s.get("Drop-off Time"))
        end = plan_end(s, drop, drop_ph)
        if not end:
            continue
        note = t.get("Migration Note") or ""
        add = [n for n in plan_end_notes(s) if n not in note]
        updates[t["record_id"]] = {"Plan End": stamp(end), "Migration Note": " | ".join(x for x in [note, *add] if x)}
        shown.append((str(t.get("Reference"))[:18], str(one(t.get("Plan"))), stamp(drop)[:16], stamp(end)[:16], str(one(t.get("Status")))))
    left = [str(t.get("Reference"))[:18] for t in before if t.get("Old Record ID") and not t.get("Plan End") and t["record_id"] not in updates]
    print(f"rows to fill: {len(updates)} | copied rows left without a Plan End (not enough to work it out): {len(left)} {left}\n")
    for ref, plan, d, e, status in shown:
        print(f"   {ref:18} {plan:11} {status:9} drop-off {d}  ->  plan ends {e}")
    if not apply or not updates:
        print("\nDry run finished. Run again with --add-plan-end --apply to fill them." if not apply else "\nNothing to fill.")
        return
    os.makedirs(backup_dir, exist_ok=True)
    snap = os.path.join(backup_dir, f"live-table-before-plan-end-{time.strftime('%Y%m%d-%H%M%S')}.json")
    json.dump(before, open(snap, "w"), ensure_ascii=False)
    print(f"\nbackup of the live table before this change: {snap}")
    ids = list(updates)
    for i in range(0, len(ids), 200):
        cli(["+record-batch-update", "--json", json.dumps({"update_records": {k: updates[k] for k in ids[i:i + 200]}}, ensure_ascii=False)], target)
    after = {r["record_id"]: r for r in records(target)}
    problems = []
    for b in before:
        a = after.get(b["record_id"])
        if a is None:
            problems.append(f"row is missing now: {b.get('Reference')}")
            continue
        for col, was in b.items():
            if col in ("record_id", "Plan End", "Migration Note"):
                continue
            if a.get(col) != was:
                problems.append(f"{str(b.get('Reference'))[:18]} {col} changed: {was!r} -> {a.get(col)!r}")
        want = updates.get(b["record_id"])
        if want:
            if a.get("Plan End") is None or when(a["Plan End"]).strftime("%Y-%m-%d %H:%M:%S") != want["Plan End"]:
                problems.append(f"{str(b.get('Reference'))[:18]} Plan End is {a.get('Plan End')!r}, expected {want['Plan End']}")
            if a.get("Migration Note") != want["Migration Note"]:
                problems.append(f"{str(b.get('Reference'))[:18]} Migration Note is not what was written")
        elif a.get("Plan End") != b.get("Plan End") or a.get("Migration Note") != b.get("Migration Note"):
            problems.append(f"{str(b.get('Reference'))[:18]} changed although it was not meant to")
    print(f"checked {len(before)} rows: every column other than Plan End and Migration Note is unchanged on every row")
    if problems:
        print(f"\nPROBLEMS ({len(problems)}):")
        for p in problems:
            print("   -", p)
        sys.exit(1)
    print(f"OK: Plan End filled on {len(updates)} rows; nothing else changed.")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--target", default=TARGET_NAME, help=f'name of the live table (default "{TARGET_NAME}")')
    ap.add_argument("--apply", action="store_true", help="write the rows (default: dry run)")
    ap.add_argument("--only", help="comma-separated old record ids: copy/verify just those rows")
    ap.add_argument("--verify", action="store_true", help="read-only: compare the copy with the source")
    ap.add_argument("--add-plan-end", action="store_true", help="fill the Plan End column on rows already copied (dry run unless --apply)")
    ap.add_argument("--ignore", default="", help='with --verify: columns staff have edited since the copy, e.g. "Status,Note,Discount,Extension Fee,Received (Thực nhận)"')
    ap.add_argument("--backup-dir", default=os.path.expanduser("~/stow-lark-backup/migration-2026-09-20"))
    a = ap.parse_args()
    only = set(a.only.split(",")) if a.only else None
    source, target = find_tables(a.target)
    if a.add_plan_end:
        return add_plan_end(source, target, a.apply, a.backup_dir)
    if a.verify:
        return verify(source, target, only, tuple(c.strip() for c in a.ignore.split(",") if c.strip()))

    src_all = records(source)
    os.makedirs(a.backup_dir, exist_ok=True)
    snap = os.path.join(a.backup_dir, f"source-bookings-{time.strftime('%Y%m%d-%H%M%S')}.json")
    json.dump({"table": source, "records": src_all}, open(snap, "w"), ensure_ascii=False)
    print(("APPLY" if a.apply else "DRY RUN (nothing is written)") + f' - "{SOURCE_NAME}" ({source}) -> "{a.target}" ({target})')
    print(f"source snapshot saved: {snap} ({len(src_all)} rows)\n")

    skipped = [r for r in src_all if not has_data(r)]
    todo_src = [r for r in src_all if has_data(r) and (not only or r["record_id"] in only)]
    rows = [(*map_row(r), r) for r in sorted(todo_src, key=lambda r: r.get("Submitted at") or "")]
    check_options(target, [(f, n) for f, n, _ in rows])
    done = {r.get("Old Record ID") for r in records(target)}
    fresh = [(f, n, r) for f, n, r in rows if r["record_id"] not in done]

    print(f"rows with data: {len(todo_src)} | already copied: {len(rows) - len(fresh)} | to copy now: {len(fresh)}")
    for r in skipped:
        print(f"skipped (no data at all, only the automatic timestamp {str(r.get('Submitted at'))[:19]}): {r['record_id']}")
    print()
    for f, n, r in fresh:
        print(f"{str(f.get('Reference', '(no reference)'))[:18]:18} {str(f.get('Plan', '-')):11} {f.get('Drop-off', '-')[:16]:16} -> {f.get('Pick-up', '-')[:16]:16} "
              f"duration={f.get('Duration', '-')!s:18} total={f.get('Total (VND)', '-')!s:8}" + (f"  [{'; '.join(n)}]" if n else ""))
    json.dump([{"old_record_id": r["record_id"], "fields": f} for f, n, r in fresh], open(os.path.join(a.backup_dir, "migration-plan.json"), "w"), ensure_ascii=False, indent=1)

    if not a.apply:
        print("\nDry run finished. Run again with --apply (add --only <ids> for a pilot) to copy them.")
        return
    if not fresh:
        print("\nNothing to copy.")
        return
    log = open(os.path.join(a.backup_dir, "migration-log.jsonl"), "a")
    for i in range(0, len(fresh), 200):  # the API takes up to 200 rows per call
        chunk = fresh[i:i + 200]
        res = cli(["+record-batch-create", "--json", json.dumps({"create_records": [f for f, _, _ in chunk]}, ensure_ascii=False)], target)
        ids = res["data"].get("record_id_list") or []
        if len(ids) != len(chunk):
            sys.exit(f"Lark returned {len(ids)} ids for {len(chunk)} rows. Stop and check the target table before running again.")
        for (f, _, r), new_id in zip(chunk, ids):
            log.write(json.dumps({"ts": time.strftime("%Y-%m-%dT%H:%M:%S"), "old_record_id": r["record_id"], "new_record_id": new_id, "reference": f.get("Reference")}, ensure_ascii=False) + "\n")
        print(f"copied {len(chunk)} rows")
    log.close()
    print("\nChecking what was just written:\n")
    verify(source, target, {r["record_id"] for _, _, r in fresh})


if __name__ == "__main__":
    main()
