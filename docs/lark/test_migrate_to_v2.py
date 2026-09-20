"""Tests for the pure mapping rules in migrate-to-v2.py. Run: python3 -m unittest docs/lark/test_migrate_to_v2.py"""
import importlib.util
import os
import unittest
from datetime import datetime

_spec = importlib.util.spec_from_file_location("migrate", os.path.join(os.path.dirname(__file__), "migrate-to-v2.py"))
m = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(m)

D19 = "T19:00:00.000+07:00"  # how the old route stored a date: noon UTC, which is 19:00 in Vietnam
D00 = "T00:00:00.000+07:00"  # how a date typed into Lark by hand is stored


def row(**kw):
    base = {"record_id": "recAAA", "Submitted at": "2026-08-10T06:31:15.000+07:00"}
    base.update(kw)
    return base


HOURLY = row(**{
    "Reference": "STW-260810-4043", "Source": ["Booking Form"], "Lane": ["Flexible"], "Plan": ["By the Hour"],
    "Oversized": False, "Oversized Count": 0, "Drop-off Date": "2026-08-10" + D19, "Drop-off Time": "09:30",
    "Duration": "2 hours", "Pickup Date": "2026-08-10" + D19, "Pickup Time": "11:30", "Name": "Test One",
    "Phone": "+84905955161", "Email": "one@example.com", "Pax": 1, "Total (VND)": 30000, "Status": ["Complete"], "Discount": 0,
})


class Moments(unittest.TestCase):
    def test_a_date_written_as_19_00_keeps_its_own_day(self):
        dt, placeholder = m.moment("2026-09-16" + D19, "20:00")
        self.assertEqual(dt.strftime("%Y-%m-%d %H:%M"), "2026-09-16 20:00")
        self.assertFalse(placeholder)

    def test_the_day_is_read_in_vietnam_time_whatever_offset_the_value_carries(self):
        dt, _ = m.moment("2026-09-16T12:00:00.000+00:00", "08:00")  # noon UTC is 19:00 on the 16th in Vietnam
        self.assertEqual(dt.strftime("%Y-%m-%d"), "2026-09-16")

    def test_no_time_means_00_00_and_says_so(self):
        dt, placeholder = m.moment("2026-09-13" + D00, None)
        self.assertEqual(dt.strftime("%H:%M"), "00:00")
        self.assertTrue(placeholder)

    def test_a_single_digit_hour_is_read(self):
        dt, _ = m.moment("2026-09-13" + D19, "9:30")
        self.assertEqual(dt.strftime("%H:%M"), "09:30")

    def test_an_unreadable_time_stops_the_move(self):
        with self.assertRaises(ValueError):
            m.moment("2026-09-13" + D19, "half past nine")

    def test_no_date_means_no_moment(self):
        self.assertEqual(m.moment(None, "10:00"), (None, False))


class Elapsed(unittest.TestCase):
    def label(self, a, b):
        p = lambda s: datetime.strptime(s, "%Y-%m-%d %H:%M").replace(tzinfo=m.VN)
        return m.elapsed_label(p(a), p(b))

    def test_words(self):
        self.assertEqual(self.label("2026-09-21 09:00", "2026-11-06 09:00"), "46 days")
        self.assertEqual(self.label("2026-09-21 10:00", "2026-09-22 09:00"), "23 hours")
        self.assertEqual(self.label("2026-09-20 09:00", "2026-09-21 16:00"), "1 day 7 hours")
        self.assertEqual(self.label("2026-09-20 09:30", "2026-09-20 11:00"), "1 hour 30 minutes")
        self.assertEqual(self.label("2026-09-20 09:00", "2026-09-20 09:30"), "30 minutes")

    def test_nothing_when_the_pick_up_is_not_after_the_drop_off(self):
        self.assertEqual(self.label("2026-09-20 09:00", "2026-09-20 09:00"), "")
        self.assertEqual(self.label("2026-09-21 09:00", "2026-09-20 09:00"), "")


class MapRow(unittest.TestCase):
    def test_a_complete_row_is_copied_field_for_field(self):
        f, notes = m.map_row(HOURLY)
        self.assertEqual(f["Reference"], "STW-260810-4043")
        self.assertEqual((f["Status"], f["Source"], f["Lane"], f["Plan"]), ("Complete", "Booking Form", "Flexible", "By the Hour"))
        self.assertEqual((f["Drop-off"], f["Pick-up"]), ("2026-08-10 09:30:00", "2026-08-10 11:30:00"))
        self.assertEqual(f["Duration"], "2 hours")
        self.assertEqual(f["Submitted at"], "2026-08-10 06:31:15")  # the real booking time, not the time of the copy
        self.assertEqual((f["Bags"], f["Oversized Bags"], f["Total (VND)"], f["Discount"]), (1, 0, 30000, 0))
        self.assertEqual((f["Name"], f["WhatsApp"], f["Email"]), ("Test One", "+84905955161", "one@example.com"))
        self.assertEqual(f["Old Record ID"], "recAAA")
        self.assertEqual(notes, [])
        self.assertNotIn("Migration Note", f)

    def test_what_the_old_table_never_had_is_left_empty(self):
        f, _ = m.map_row(HOURLY)
        for missing in ("Price per Bag", "Oversized Surcharge", "Price Detail", "Phone Country", "Terms Agreed", "Terms Agreed At", "Terms Version"):
            self.assertNotIn(missing, f)

    def test_a_date_with_no_time_is_flagged_and_the_old_duration_is_kept(self):
        strand = row(**{"Reference": "STW-260821-7499", "Plan": ["Strand"], "Lane": ["Flat Rate"], "Drop-off Date": "2026-08-21" + D19,
                        "Drop-off Time": "12:00", "Pickup Date": "2026-09-20" + D19, "Duration": "Up to 1 month", "Pax": 2,
                        "Total (VND)": 600000, "Extand": 600000, "Extand1": True, "Note": "Đang muốn extand: 01 vali"})
        f, notes = m.map_row(strand)
        self.assertEqual(f["Pick-up"], "2026-09-20 00:00:00")
        self.assertNotIn("Duration", f)  # not exact: no pick-up time
        self.assertIn("Pick-up time was not recorded; 00:00 is a placeholder", notes)
        self.assertIn("Old Duration: Up to 1 month", notes)
        self.assertIn("Extand1 was ticked in the old table", notes)
        self.assertEqual(f["Extension Fee"], 600000)
        self.assertEqual(f["Note"], "Đang muốn extand: 01 vali")  # the staff's own note is copied word for word
        self.assertEqual(f["Migration Note"], " | ".join(notes))

    def test_a_staff_row_with_only_a_total_keeps_everything_it_has(self):
        f, notes = m.map_row(row(**{"Reference": "Doanh thu cũ", "Total (VND)": 1820000, "Status": ["Complete"], "Source": ["Intake"], "Note": "Doanh thu cũ", "Discount": 0}))
        self.assertEqual((f["Reference"], f["Total (VND)"], f["Status"], f["Source"], f["Note"], f["Discount"]), ("Doanh thu cũ", 1820000, "Complete", "Intake", "Doanh thu cũ", 0))
        for missing in ("Drop-off", "Pick-up", "Duration", "Bags", "Oversized Bags", "WhatsApp"):
            self.assertNotIn(missing, f)
        self.assertEqual(notes, [])

    def test_a_typed_in_date_with_no_time_is_flagged_at_both_ends(self):
        f, notes = m.map_row(row(**{"Reference": "Noname2", "Drop-off Date": "2026-09-08" + D00, "Pickup Date": "2026-09-13" + D00, "Total (VND)": 60000}))
        self.assertEqual((f["Drop-off"], f["Pick-up"]), ("2026-09-08 00:00:00", "2026-09-13 00:00:00"))
        self.assertEqual(len([n for n in notes if "placeholder" in n]), 2)

    def test_an_oversize_note_that_disagrees_with_the_data_is_flagged_not_changed(self):
        f, notes = m.map_row(row(**{"Reference": "STW-260917-1331", "Note": "02 oversize", "Oversized": False, "Oversized Count": 0, "Total (VND)": 6000000}))
        self.assertEqual(f["Oversized Bags"], 0)  # the data is not overruled by a free-text note
        self.assertIn("The Note mentions oversize but no oversized bag was recorded; please check", notes)

    def test_a_phone_without_a_country_code_is_copied_unchanged_and_flagged(self):
        f, notes = m.map_row(row(**{"Phone": "3459123456"}))
        self.assertEqual(f["WhatsApp"], "3459123456")
        self.assertIn("WhatsApp number has no country code", notes)
        _, ok = m.map_row(row(**{"Phone": "+393459123456"}))
        self.assertEqual(ok, [])

    def test_extand_2_is_dropped_only_when_it_repeats_the_lane(self):
        _, same = m.map_row(row(**{"Lane": ["Flexible"], "Extand 2": ["Flexible"]}))
        self.assertEqual(same, [])
        _, differs = m.map_row(row(**{"Lane": ["Flexible"], "Extand 2": ["Flat Rate"]}))
        self.assertIn("Extand 2 was Flat Rate", differs)

    def test_an_old_duration_that_is_the_new_duration_is_not_repeated(self):
        _, notes = m.map_row(HOURLY)
        self.assertFalse(any("Old Duration" in n for n in notes))
        longer = dict(HOURLY, **{"Duration": "1 hours", "Pickup Time": "13:30"})  # an extension row: billed 1 hour, on the table for 4
        f, notes = m.map_row(longer)
        self.assertEqual(f["Duration"], "4 hours")
        self.assertIn("Old Duration: 1 hours", notes)

    def test_price_detail_from_a_row_made_by_the_newer_form_is_kept(self):
        f, _ = m.map_row(row(**{"Price Detail": "Stay: 1 day\nTotal: 60.000 ₫", "Total (VND)": 60000}))
        self.assertEqual(f["Price Detail"], "Stay: 1 day\nTotal: 60.000 ₫")
        self.assertNotIn("Price Detail", m.map_row(HOURLY)[0])

    def test_a_ticked_oversize_box_with_no_count_is_flagged(self):
        f, notes = m.map_row(row(**{"Oversized": True}))
        self.assertNotIn("Oversized Bags", f)
        self.assertIn("Oversized was ticked but how many bags was never recorded", notes)

    def test_the_time_stored_as_utc_is_moved_to_vietnam_time(self):
        f, _ = m.map_row(row(**{"Submitted at": "2026-08-10T00:00:00.000+00:00"}))
        self.assertEqual(f["Submitted at"], "2026-08-10 07:00:00")


class HasData(unittest.TestCase):
    def test_a_row_with_only_the_automatic_timestamp_has_no_data(self):
        self.assertFalse(m.has_data(row(**{"Thực nhận": "0", "Date": None})))

    def test_any_real_value_counts_even_a_zero(self):
        self.assertTrue(m.has_data(row(**{"Discount": 0})))
        self.assertTrue(m.has_data(row(**{"Note": "Trùng"})))
        self.assertFalse(m.has_data(row(**{"Oversized": False, "Extand1": False})))


if __name__ == "__main__":
    unittest.main()
