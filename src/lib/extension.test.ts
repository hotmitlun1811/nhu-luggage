import { describe, expect, it } from "vitest";
import {
  bagLimit,
  buildExtensionFields,
  checkExtension,
  daysPastPlanEnd,
  extensionAnnouncement,
  extensionWindow,
  isAlreadyRequested,
  isRealDate,
  longDate,
  contactForCustomer,
  maskEmail,
  maskPhone,
  normalizeReference,
  parseBookingRows,
  parseExistingRequests,
  resolveBooking,
  stampLabel,
  vietnamMoment,
  vietnamStamp,
  vietnamToday,
  type BookingRow,
} from "./extension";

const booking: BookingRow = {
  recordId: "recAAA",
  reference: "STW-260921-PXSD27",
  status: "Paid",
  plan: "Mini",
  bags: 3,
  oversizedBags: 1,
  dropOff: { date: "2026-09-21", time: "09:00" },
  pickUp: { date: "2026-09-27", time: "09:00" },
  planEnd: { date: "2026-09-28", time: "09:00" },
  total: 500000,
  name: "Sample Customer",
  whatsapp: "+84905955161",
  email: "sample@example.com",
};

describe("normalizeReference", () => {
  it("accepts the reference the booking form makes and the four-digit one the old table wrote", () => {
    expect(normalizeReference("STW-260921-PXSD27")).toBe("STW-260921-PXSD27");
    expect(normalizeReference("STW-260821-7499")).toBe("STW-260821-7499");
  });
  it("puts a pasted reference into its one written form", () => {
    expect(normalizeReference("  stw-260921-pxsd27 ")).toBe("STW-260921-PXSD27");
    expect(normalizeReference("STW-260921-PXSD27\n")).toBe("STW-260921-PXSD27");
  });
  it("rejects anything else, so nothing odd is ever sent to Lark", () => {
    // too short, too long, a vowel or an O in the code, the odd rows the old table holds, and something that tries to break a filter
    for (const bad of ["", "STW-260921", "STW-260921-PXSD2", "STW-260921-PXSD277", "STW-260921-PXSDA7", "STW-260921-PXSD2O", "Noname", "Doanh thu cũ", '"] or ["']) {
      expect(normalizeReference(bad)).toBeNull();
    }
    expect(normalizeReference(undefined)).toBeNull();
    expect(normalizeReference(260921)).toBeNull();
  });
});

describe("Vietnam time", () => {
  it("reads a Lark moment as the wall clock in Vietnam", () => {
    expect(vietnamStamp("2026-08-12T15:30:00.000+07:00")).toEqual({ date: "2026-08-12", time: "15:30" });
    // The same moment written in UTC lands on the same Vietnam clock.
    expect(vietnamStamp("2026-08-12T08:30:00.000Z")).toEqual({ date: "2026-08-12", time: "15:30" });
  });
  it("moves to the next day when it is already tomorrow in Vietnam", () => {
    expect(vietnamStamp(Date.parse("2026-09-20T18:00:00Z"))).toEqual({ date: "2026-09-21", time: "01:00" });
    expect(vietnamToday(Date.parse("2026-09-20T18:00:00Z"))).toBe("2026-09-21");
    expect(vietnamToday(Date.parse("2026-09-20T16:59:00Z"))).toBe("2026-09-20");
  });
  it("gives null for an empty or unreadable value", () => {
    expect(vietnamStamp(null)).toBeNull();
    expect(vietnamStamp("")).toBeNull();
    expect(vietnamStamp("not a date")).toBeNull();
  });
  it("round-trips a Vietnam moment", () => {
    expect(vietnamStamp(vietnamMoment("2026-09-27", "09:30"))).toEqual({ date: "2026-09-27", time: "09:30" });
  });
});

describe("stampLabel", () => {
  it("writes the date and the time", () => {
    expect(stampLabel({ date: "2026-09-27", time: "09:30" })).toBe("Sun, 27 September 2026 at 09:30");
  });
  it("leaves out a time of 00:00, which only means the old table never recorded one", () => {
    expect(stampLabel({ date: "2026-09-20", time: "00:00" })).toBe("Sun, 20 September 2026");
  });
});

describe("longDate and isRealDate", () => {
  it("writes the date the way the WhatsApp booking message does", () => {
    expect(longDate("2026-09-21")).toBe("Mon, 21 September 2026");
    expect(longDate("2026-11-06")).toBe("Fri, 6 November 2026");
  });
  it("knows a real day from one that only looks like a date", () => {
    expect(isRealDate("2026-02-28")).toBe(true);
    expect(isRealDate("2026-02-31")).toBe(false);
    expect(isRealDate("2026-9-1")).toBe(false);
    expect(isRealDate("tomorrow")).toBe(false);
    expect(isRealDate(20260927)).toBe(false);
  });
});

describe("parseBookingRows", () => {
  // The shape Lark's base/v3 "list records" gives back: column names, then one array of cells per row.
  const page = {
    fields: ["Reference", "Status", "Plan", "Bags", "Oversized Bags", "Drop-off", "Pick-up", "Plan End", "Total (VND)", "Name", "WhatsApp", "Email"],
    record_id_list: ["recAAA", "recBBB"],
    data: [
      ["STW-260812-2784", ["Complete"], ["Mini"], 22, 2, "2026-08-12T12:30:00.000+07:00", "2026-08-12T15:30:00.000+07:00", "2026-08-12T15:30:00.000+07:00", 500000, "Sample Customer", "+84905955161", "sample@example.com"],
      ["STW-260812-2784", ["Paid"], null, null, null, "2026-08-12T12:30:00.000+07:00", null, null, null, "Sample Customer", "", null],
    ],
  };

  it("reads each cell into the shape the rules use", () => {
    expect(parseBookingRows(page)[0]).toEqual({
      recordId: "recAAA",
      reference: "STW-260812-2784",
      status: "Complete",
      plan: "Mini",
      bags: 22,
      oversizedBags: 2,
      dropOff: { date: "2026-08-12", time: "12:30" },
      pickUp: { date: "2026-08-12", time: "15:30" },
      planEnd: { date: "2026-08-12", time: "15:30" },
      total: 500000,
      name: "Sample Customer",
      whatsapp: "+84905955161",
      email: "sample@example.com",
    });
  });
  it("leaves a missing value empty instead of guessing one", () => {
    expect(parseBookingRows(page)[1]).toMatchObject({ recordId: "recBBB", status: "Paid", plan: "", bags: null, oversizedBags: null, pickUp: null, planEnd: null, total: null, whatsapp: "", email: "" });
  });
  it("finds columns by name, so their order does not matter", () => {
    const shuffled = { fields: ["Status", "Reference", "Bags"], record_id_list: ["recCCC"], data: [[["Booking"], "STW-260921-PXSD27", 2]] };
    expect(parseBookingRows(shuffled)[0]).toMatchObject({ reference: "STW-260921-PXSD27", status: "Booking", bags: 2 });
  });
  it("copes with an empty answer", () => {
    expect(parseBookingRows({})).toEqual([]);
  });
});

describe("resolveBooking", () => {
  const row = (over: Partial<BookingRow>): BookingRow => ({ ...booking, ...over });

  it("finds the booking", () => {
    expect(resolveBooking([booking], booking.reference)).toEqual({ kind: "found", booking });
  });
  it("says so when no row has the Booking ID", () => {
    expect(resolveBooking([], booking.reference)).toEqual({ kind: "not-found" });
    expect(resolveBooking([row({ reference: "STW-260921-BBBBBB" })], booking.reference)).toEqual({ kind: "not-found" });
  });
  it("does not extend a booking that is Complete or Cancel", () => {
    expect(resolveBooking([row({ status: "Complete" })], booking.reference)).toEqual({ kind: "closed" });
    expect(resolveBooking([row({ status: "Cancel" })], booking.reference)).toEqual({ kind: "closed" });
  });
  it("extends a booking that is not paid yet or is only confirmed", () => {
    for (const status of ["Booking", "Confirm", "Paid"]) expect(resolveBooking([row({ status })], booking.reference).kind).toBe("found");
  });
  it("uses the open row when a cancelled duplicate carries the same ID", () => {
    const found = resolveBooking([row({ recordId: "recOLD", status: "Cancel" }), row({ recordId: "recLIVE", status: "Paid" })], booking.reference);
    expect(found).toMatchObject({ kind: "found", booking: { recordId: "recLIVE" } });
  });
  it("uses the row with the latest pick-up when an old-style extension row carries the same ID", () => {
    const first = row({ recordId: "recFIRST", pickUp: { date: "2026-09-27", time: "09:00" } });
    const extended = row({ recordId: "recEXT", pickUp: { date: "2026-10-04", time: "09:00" } });
    expect(resolveBooking([extended, first], booking.reference)).toMatchObject({ booking: { recordId: "recEXT" } });
    expect(resolveBooking([first, extended], booking.reference)).toMatchObject({ booking: { recordId: "recEXT" } });
  });
  it("prefers a row with a pick-up over one that has none", () => {
    const none = row({ recordId: "recNONE", pickUp: null });
    expect(resolveBooking([none, booking], booking.reference)).toMatchObject({ booking: { recordId: "recAAA" } });
    expect(resolveBooking([booking, none], booking.reference)).toMatchObject({ booking: { recordId: "recAAA" } });
  });
  it("does not accept a request nobody could answer: no WhatsApp and no email", () => {
    expect(resolveBooking([row({ whatsapp: "", email: "" })], booking.reference)).toEqual({ kind: "no-contact" });
    expect(resolveBooking([row({ whatsapp: "", email: "a@b.co" })], booking.reference).kind).toBe("found");
    expect(resolveBooking([row({ whatsapp: "+84905955161", email: "" })], booking.reference).kind).toBe("found");
  });
});

describe("extensionWindow", () => {
  it("starts the day after the current pick-up", () => {
    expect(extensionWindow(booking, "2026-09-22").min).toBe("2026-09-28");
  });
  it("never offers a day in the past when the pick-up date has already gone by", () => {
    expect(extensionWindow(booking, "2026-10-10").min).toBe("2026-10-10");
  });
  it("starts tomorrow when the booking never recorded a pick-up", () => {
    expect(extensionWindow({ ...booking, pickUp: null }, "2026-09-22").min).toBe("2026-09-23");
  });
  it("ends at the longest stay the price engine quotes, counted from drop-off", () => {
    // 1095 days after 2026-09-21 is 2029-09-20 (the span holds the 2028 leap day)
    expect(extensionWindow(booking, "2026-09-22").max).toBe("2029-09-20");
    expect(extensionWindow({ ...booking, dropOff: null }, "2026-09-22").max).toBe("2029-09-21");
  });
});

describe("checkExtension", () => {
  const today = "2026-09-22";
  const ok = { bags: 2, newPickupDate: "2026-10-04" };

  it("accepts a fair request", () => {
    expect(checkExtension(booking, ok, today)).toEqual({ ok: true });
  });
  it("accepts all the bags, and just one", () => {
    expect(checkExtension(booking, { ...ok, bags: 3 }, today).ok).toBe(true);
    expect(checkExtension(booking, { ...ok, bags: 1 }, today).ok).toBe(true);
  });
  it("refuses more bags than the booking has, none, or a part of a bag", () => {
    for (const bags of [4, 0, -1, 1.5, Number.NaN]) expect(checkExtension(booking, { ...ok, bags }, today)).toEqual({ ok: false, field: "bags" });
  });
  it("uses the booking form's limit when the booking never recorded its bags", () => {
    const unknown = { ...booking, bags: null };
    expect(bagLimit(unknown)).toBe(20);
    expect(checkExtension(unknown, { ...ok, bags: 20 }, today).ok).toBe(true);
    expect(checkExtension(unknown, { ...ok, bags: 21 }, today)).toEqual({ ok: false, field: "bags" });
  });
  it("takes the day after the pick-up, and refuses the pick-up day itself or earlier", () => {
    expect(checkExtension(booking, { ...ok, newPickupDate: "2026-09-28" }, today).ok).toBe(true);
    expect(checkExtension(booking, { ...ok, newPickupDate: "2026-09-27" }, today)).toEqual({ ok: false, field: "date" });
    expect(checkExtension(booking, { ...ok, newPickupDate: "2026-09-01" }, today)).toEqual({ ok: false, field: "date" });
  });
  it("refuses a date that is not a real day, or too far away", () => {
    expect(checkExtension(booking, { ...ok, newPickupDate: "2026-02-31" }, today)).toEqual({ ok: false, field: "date" });
    expect(checkExtension(booking, { ...ok, newPickupDate: "soon" }, today)).toEqual({ ok: false, field: "date" });
    expect(checkExtension(booking, { ...ok, newPickupDate: "2029-09-20" }, today).ok).toBe(true);
    expect(checkExtension(booking, { ...ok, newPickupDate: "2029-09-21" }, today)).toEqual({ ok: false, field: "date" });
  });
});

describe("daysPastPlanEnd", () => {
  const end = { date: "2026-09-28", time: "09:00" };
  it("is 0 up to and on the last day of the paid plan", () => {
    expect(daysPastPlanEnd(end, "2026-09-28")).toBe(0);
    expect(daysPastPlanEnd(end, "2026-09-27")).toBe(0);
  });
  it("counts the days after it", () => {
    expect(daysPastPlanEnd(end, "2026-09-29")).toBe(1);
    expect(daysPastPlanEnd(end, "2026-10-05")).toBe(7);
  });
  it("is unknown when the booking never recorded when its plan ends", () => {
    expect(daysPastPlanEnd(null, "2026-10-05")).toBeNull();
  });
});

describe("what the customer is shown of the booking", () => {
  it("shows only the last four digits of the phone, whatever its shape", () => {
    expect(maskPhone("+84905955161")).toBe("+XXXXXXX5161");
    expect(maskPhone("+39 345 912 3456")).toBe("+XX XXX XXX 3456");
    expect(maskPhone("0905955161")).toBe("XXXXXX5161");
  });
  it("shows no digit of a number too short to hide anything", () => {
    expect(maskPhone("5161")).toBe("XXXX");
    expect(maskPhone("+84")).toBe("XXXX");
    expect(maskPhone("")).toBe("");
    expect(maskPhone("no number")).toBe("");
  });

  it("shows the start of the email, then stars, then the whole domain", () => {
    expect(maskEmail("dinhhuy18123456@gmail.com")).toBe("dinhhuy18******@gmail.com");
    expect(maskEmail("sample@example.com")).toBe("sam***@example.com");
  });
  it("always hides at least three characters, so a short address is not given away", () => {
    expect(maskEmail("abcd@x.co")).toBe("a***@x.co");
    expect(maskEmail("abc@x.co")).toBe("***@x.co");
    expect(maskEmail("ab@x.co")).toBe("**@x.co");
    expect(maskEmail("a@x.co")).toBe("*@x.co");
  });
  it("never lets the masked address contain more of the name part than was there", () => {
    for (const local of ["a", "ab", "abc", "abcd", "abcde", "abcdefghij", "abcdefghijklmno"]) {
      const masked = maskEmail(`${local}@x.co`).split("@")[0];
      expect(masked).toHaveLength(local.length);
      expect(masked.replace(/\*/g, "").length).toBeLessThanOrEqual(local.length - Math.min(3, local.length));
    }
  });
  it("gives nothing away for something that is not an address", () => {
    expect(maskEmail("")).toBe("");
    expect(maskEmail("not an email")).toBe("***");
  });

  it("shows the name in full and masks the phone and the email", () => {
    expect(contactForCustomer(booking)).toEqual({ name: "Sample Customer", whatsapp: "+XXXXXXX5161", email: "sam***@example.com" });
  });
  it("shows a Vietnamese name exactly as it is written", () => {
    expect(contactForCustomer({ ...booking, name: " Nguyễn Văn An " }).name).toBe("Nguyễn Văn An");
  });
  it("never contains the full phone or the full email", () => {
    const all = JSON.stringify(contactForCustomer(booking));
    for (const secret of ["+84905955161", "84905", "sample@", "sample@example.com"]) expect(all).not.toContain(secret);
  });
  it("is empty for what the booking does not have", () => {
    expect(contactForCustomer({ name: "", whatsapp: "", email: "" })).toEqual({ name: "", whatsapp: "", email: "" });
  });
});

describe("a request that is already there", () => {
  const page = {
    fields: ["Booking ID", "Status", "Bags to Extend", "New Pick-up Date"],
    data: [
      ["STW-260921-PXSD27", ["Requested"], 2, "2026-10-05T12:00:00.000+07:00"],
      ["STW-260921-PXSD27", ["Paid"], 1, "2026-10-12T12:00:00.000+07:00"],
    ],
  };
  const existing = parseExistingRequests(page);

  it("reads the earlier requests", () => {
    expect(existing).toEqual([
      { status: "Requested", bags: 2, newPickupDate: "2026-10-05" },
      { status: "Paid", bags: 1, newPickupDate: "2026-10-12" },
    ]);
  });
  it("spots the same request sent twice", () => {
    expect(isAlreadyRequested(existing, { bags: 2, newPickupDate: "2026-10-05" })).toBe(true);
  });
  it("treats a different number of bags or a different date as a new request", () => {
    expect(isAlreadyRequested(existing, { bags: 3, newPickupDate: "2026-10-05" })).toBe(false);
    expect(isAlreadyRequested(existing, { bags: 2, newPickupDate: "2026-10-06" })).toBe(false);
  });
  it("does not count a request staff have already dealt with", () => {
    expect(isAlreadyRequested(existing, { bags: 1, newPickupDate: "2026-10-12" })).toBe(false);
  });
  it("is fine with nothing there yet", () => {
    expect(isAlreadyRequested(parseExistingRequests({}), { bags: 1, newPickupDate: "2026-10-05" })).toBe(false);
  });
});

describe("buildExtensionFields", () => {
  const now = Date.parse("2026-09-22T03:00:00Z");

  it("is exactly the row staff read", () => {
    expect(buildExtensionFields(booking, { bags: 2, newPickupDate: "2026-10-05" }, now)).toEqual({
      "Booking ID": "STW-260921-PXSD27",
      Status: "Requested",
      "Submitted at": now,
      "Bags to Extend": 2,
      "New Pick-up Date": Date.parse("2026-10-05T12:00:00+07:00"),
      Booking: ["recAAA"],
      Name: "Sample Customer",
      WhatsApp: "+84905955161",
      Email: "sample@example.com",
      "Bags Booked": 3,
      "Pick-up Now": Date.parse("2026-09-27T09:00:00+07:00"),
      "Plan End": Date.parse("2026-09-28T09:00:00+07:00"),
      "Days Past Plan End": 7,
    });
  });
  it("copies the contact details exactly as the booking has them", () => {
    const odd = { ...booking, name: "Nguyễn Văn A", whatsapp: "+39 345 912 3456", email: "Mixed.Case@Example.com" };
    const f = buildExtensionFields(odd, { bags: 1, newPickupDate: "2026-10-05" }, now);
    expect(f).toMatchObject({ Name: "Nguyễn Văn A", WhatsApp: "+39 345 912 3456", Email: "Mixed.Case@Example.com" });
  });
  it("leaves out what the booking does not have, instead of guessing", () => {
    const f = buildExtensionFields({ ...booking, email: "", bags: null, pickUp: null, planEnd: null }, { bags: 1, newPickupDate: "2026-10-05" }, now);
    for (const missing of ["Email", "Bags Booked", "Pick-up Now", "Plan End", "Days Past Plan End"]) expect(f).not.toHaveProperty(missing);
  });
  it("records a request inside the paid plan as 0 days past it", () => {
    expect(buildExtensionFields(booking, { bags: 1, newPickupDate: "2026-09-28" }, now)["Days Past Plan End"]).toBe(0);
  });
  it("puts the new date at noon in Vietnam, which is the same calendar day everywhere", () => {
    const stored = buildExtensionFields(booking, { bags: 1, newPickupDate: "2026-10-05" }, now)["New Pick-up Date"] as number;
    expect(vietnamStamp(stored)?.date).toBe("2026-10-05");
    expect(new Date(stored).toISOString().slice(0, 10)).toBe("2026-10-05");
  });
});

describe("extensionAnnouncement", () => {
  it("gives staff the request, the booking and the contact in full, in sections", () => {
    expect(extensionAnnouncement(booking, { bags: 2, newPickupDate: "2026-10-05" })).toBe(
      [
        "🔁 Extension request: STW-260921-PXSD27",
        "",
        "Request:",
        "• Bags to extend: 2 of 3",
        "• New pick-up date: Mon, 5 October 2026",
        "• The new date is 7 days after the plan end",
        "",
        "Current booking:",
        "• Plan: Mini",
        "• Drop-off: Mon, 21 September 2026 at 09:00",
        "• Pick-up now: Sun, 27 September 2026 at 09:00",
        "• Plan end: Mon, 28 September 2026 at 09:00",
        "• Bags: 3 (1 oversized)",
        "• Total: 500.000 ₫",
        "• Status: Paid",
        "",
        "Contact:",
        "• Name: Sample Customer",
        "• WhatsApp: +84905955161",
        "• Email: sample@example.com",
        "",
        "It is in the Extensions table. Please confirm the price and the pick-up time with the customer on WhatsApp.",
      ].join("\n")
    );
  });
  it("carries the contact details in full, never masked", () => {
    const text = extensionAnnouncement(booking, { bags: 1, newPickupDate: "2026-10-05" });
    expect(text).toContain("Sample Customer");
    expect(text).toContain("+84905955161");
    expect(text).toContain("sample@example.com");
    expect(text).not.toContain("***");
  });
  it("says when the new date is inside the paid plan", () => {
    expect(extensionAnnouncement(booking, { bags: 1, newPickupDate: "2026-09-28" })).toContain("• The new date is inside the plan already paid for");
  });
  it("says a day is a day", () => {
    expect(extensionAnnouncement(booking, { bags: 1, newPickupDate: "2026-09-29" })).toContain("• The new date is 1 day after the plan end");
  });
  it("leaves out what the booking never recorded, and says plainly when there is no contact detail", () => {
    const text = extensionAnnouncement(
      { ...booking, name: "", whatsapp: "", email: "a@b.co", bags: null, oversizedBags: null, plan: "", total: null, planEnd: null, pickUp: null, dropOff: null },
      { bags: 1, newPickupDate: "2026-10-05" }
    );
    expect(text).toContain("• Bags to extend: 1\n");
    expect(text).toContain("• Name: (none on file)");
    expect(text).toContain("• WhatsApp: (none on file)");
    for (const gone of ["Plan:", "Drop-off", "Pick-up now", "Plan end", "Bags:", "Total", "after the plan end", "inside the plan"]) expect(text).not.toContain(gone);
  });
  it("names no oversized bags when there are none", () => {
    expect(extensionAnnouncement({ ...booking, oversizedBags: 0 }, { bags: 1, newPickupDate: "2026-10-05" })).toContain("• Bags: 3\n");
  });
});
