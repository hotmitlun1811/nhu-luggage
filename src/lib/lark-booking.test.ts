import { describe, expect, it } from "vitest";
import { announcementText, buildBookingFields, buildBookingFieldsV2, elapsedLabel, laneLabel, normalizeDuration, normalizePhone, type BookingBody } from "./lark-booking";

const vnd = (n: number) => `${n.toLocaleString("vi-VN")} ₫`;
const noon = (day: string) => new Date(`${day}T12:00:00`).getTime();

const dayBooking: BookingBody = {
  source: "Booking Form",
  lane: "flexible",
  planName: "By the Day",
  oversized: false,
  oversizedCount: 0,
  dropOffDate: "2026-09-20",
  dropOffTime: "09:00",
  duration: "1 day",
  pickupDate: "2026-09-21",
  pickupTime: "09:00",
  name: "Test Person",
  phone: "+84905955161",
  email: " test@example.com ",
  pax: 2,
  total: 120000,
};

const customBooking: BookingBody = {
  ...dayBooking,
  lane: "custom",
  planName: "Custom",
  fallback: { lane: "flatrate", planName: "Strand" },
  oversized: true,
  oversizedCount: 2,
  duration: "Custom: 2× Strand (46 days)",
  pickupDate: "2026-11-05",
  total: 1400000,
  priceDetail: "Stay: 46 days\nPer bag: 2× Strand (300.000 ₫) = 600.000 ₫\nBags: 2 × 600.000 ₫ = 1.200.000 ₫\nTotal: 1.400.000 ₫",
};

describe("normalizePhone", () => {
  it("removes spaces and other formatting but keeps every digit", () => {
    expect(normalizePhone("+84 905955161")).toBe("+84905955161");
    expect(normalizePhone("  +1 905 955 1611 ")).toBe("+19059551611");
    expect(normalizePhone("(+39) 345-912.3456")).toBe("+393459123456");
  });
  it("turns the international 00 prefix into +", () => {
    expect(normalizePhone("0049 170 1234567")).toBe("+491701234567");
    expect(normalizePhone("0039 3459123456")).toBe("+393459123456");
  });
  it("never guesses a country code for a local number", () => {
    expect(normalizePhone("0905955161")).toBe("0905955161");
    expect(normalizePhone("3459123456")).toBe("3459123456");
    expect(normalizePhone("84")).toBe("84");
  });
});

describe("normalizeDuration", () => {
  it("maps the old labels onto the plain lengths", () => {
    expect(normalizeDuration("Up to 24 hrs")).toBe("1 day");
    expect(normalizeDuration("Up to 1 week")).toBe("1 week");
    expect(normalizeDuration("Up to 1 month")).toBe("1 month");
    expect(normalizeDuration("Up to 4 months")).toBe("4 months");
    expect(normalizeDuration("1 × 4 months")).toBe("4 months");
    expect(normalizeDuration("1 hours")).toBe("1 hour");
  });
  it("leaves current labels and anything without a plain equivalent alone", () => {
    for (const label of ["2 hours", "1 day", "1 month", "Custom: 2× Strand (46 days)", "2 × 4 months", "Min 1 hr, billed per hr"]) {
      expect(normalizeDuration(label)).toBe(label);
    }
    expect(normalizeDuration(undefined)).toBe("");
  });
});

describe("laneLabel", () => {
  it("names all three lanes as the booking form's dropdown groups do", () => {
    expect([laneLabel("flexible"), laneLabel("flatrate"), laneLabel("custom")]).toEqual(["Flexible", "Flat Rate", "Custom"]);
  });
});

describe("buildBookingFields", () => {
  it("writes a regular booking with a starting Status and the standard formats", () => {
    const { primary } = buildBookingFields(dayBooking, "STW-260920-1111");
    expect(primary).toMatchObject({
      Reference: "STW-260920-1111",
      Source: "Booking Form",
      Lane: "Flexible",
      Plan: "By the Day",
      Status: "Booking",
      Oversized: false,
      "Oversized Count": 0,
      "Drop-off Time": "09:00",
      Duration: "1 day",
      Phone: "+84905955161",
      "Total (VND)": 120000,
      Email: "test@example.com",
      Pax: 2,
      "Pickup Time": "09:00",
    });
    expect(primary["Drop-off Date"]).toBe(noon("2026-09-20"));
    expect(primary["Pickup Date"]).toBe(noon("2026-09-21"));
    expect(primary).not.toHaveProperty("Price Detail");
  });

  it("records a Custom booking as Custom, with its count and price detail", () => {
    const { primary } = buildBookingFields(customBooking, "STW-1");
    expect(primary).toMatchObject({
      Lane: "Custom",
      Plan: "Custom",
      Oversized: true,
      "Oversized Count": 2,
      Duration: "Custom: 2× Strand (46 days)",
      "Total (VND)": 1400000,
    });
    expect(primary["Price Detail"]).toContain("Per bag: 2× Strand");
  });

  it("offers older columns for a table with no Custom option or newer columns yet", () => {
    const { legacy } = buildBookingFields(customBooking, "STW-1");
    expect(legacy).not.toBeNull();
    expect(legacy).toMatchObject({ Lane: "Flat Rate", Plan: "Strand", Status: "Booking", Oversized: true, "Total (VND)": 1400000 });
    expect(legacy).not.toHaveProperty("Oversized Count");
    expect(legacy).not.toHaveProperty("Price Detail");
    // Nothing else is lost in the fallback: every older column carries over.
    const { primary } = buildBookingFields(customBooking, "STW-1");
    for (const key of Object.keys(legacy as object)) {
      if (key !== "Lane" && key !== "Plan") expect((legacy as Record<string, unknown>)[key]).toEqual(primary[key]);
    }
  });

  it("holds the staff form to the same standard without inventing an oversized count", () => {
    const intake: BookingBody = {
      source: "Intake", lane: "flatrate", planName: "Strand", oversized: true,
      dropOffDate: "2026-09-20", dropOffTime: "10:00", duration: "Up to 1 month",
      name: "Walk In", phone: "0049 170 1234567", pax: 1, total: 350000,
    };
    const { primary, legacy } = buildBookingFields(intake, "STW-2");
    expect(primary).toMatchObject({ Lane: "Flat Rate", Plan: "Strand", Duration: "1 month", Phone: "+491701234567", Status: "Booking", Oversized: true });
    expect(primary).not.toHaveProperty("Oversized Count"); // unknown, so left blank
    expect(primary).not.toHaveProperty("Pickup Date"); // never guessed
    expect(legacy).toBeNull(); // nothing to fall back to: the record is already in the older shape
  });

  it("writes an Oversized Count of 0 for a staff booking with no oversized bag", () => {
    const { primary } = buildBookingFields({ ...dayBooking, source: "Intake", oversizedCount: undefined, oversized: false }, "STW-3");
    expect(primary["Oversized Count"]).toBe(0);
  });
});

describe("announcementText", () => {
  it("says Plan: Custom, not Custom (Custom), and shows how the total was worked out", () => {
    const text = announcementText("STW-1", customBooking, vnd);
    expect(text).toContain("📦 New Booking: STW-1");
    expect(text).toContain("• Plan: Custom, Oversized ×2");
    expect(text).not.toContain("Custom (Custom)");
    expect(text).toContain("• Duration: Custom: 2× Strand (46 days)");
    expect(text).toContain("How the total was worked out:");
    expect(text).toContain("   Per bag: 2× Strand (300.000 ₫) = 600.000 ₫");
  });
  it("names the lane for a regular plan and omits the detail block when there is none", () => {
    const text = announcementText("STW-2", { ...dayBooking, lane: "flatrate", planName: "Strand" }, vnd);
    expect(text).toContain("• Plan: Strand (Flat Rate)");
    expect(text).not.toContain("How the total was worked out");
  });
});

describe("buildBookingFieldsV2 (the Bookings v2 table)", () => {
  const consentAt = "2026-09-20T04:30:00.000Z";
  const form: BookingBody = {
    ...customBooking,
    oversizedCount: 1,
    total: 1300000,
    pricePerBag: 600000,
    oversizedSurcharge: 100000,
    phoneCountry: "IT",
    consentAt,
    termsVersion: "1 June 2026",
  };

  it("has one column per form field", () => {
    const f = buildBookingFieldsV2(form, "STW-9");
    expect(f).toMatchObject({
      Reference: "STW-9",
      Status: "Booking",
      Source: "Booking Form",
      Lane: "Custom",
      Plan: "Custom",
      Duration: "46 days",
      Bags: 2,
      "Oversized Bags": 1,
      "Price per Bag": 600000,
      "Oversized Surcharge": 100000,
      "Total (VND)": 1300000,
      Name: "Test Person",
      WhatsApp: "+84905955161",
      Email: "test@example.com",
      "Phone Country": "IT",
      "Terms Agreed": true,
      "Terms Version": "1 June 2026",
    });
    expect(f["Price Detail"]).toContain("Per bag: 2× Strand");
    expect(f["Terms Agreed At"]).toBe(Date.parse(consentAt));
  });

  it("writes when the booking was made, since Submitted at is a plain column", () => {
    expect(buildBookingFieldsV2(form, "STW-9", 1_790_000_000_000)["Submitted at"]).toBe(1_790_000_000_000);
    const before = Date.now();
    const f = buildBookingFieldsV2(form, "STW-9");
    expect(f["Submitted at"] as number).toBeGreaterThanOrEqual(before);
    expect(f["Submitted at"] as number).toBeLessThanOrEqual(Date.now());
  });

  it("writes when the plan ends as Vietnam time, and leaves it blank when the form did not send it", () => {
    const f = buildBookingFieldsV2({ ...form, planEndDate: "2026-11-21", planEndTime: "09:00" }, "STW-9");
    expect(f["Plan End"]).toBe(Date.UTC(2026, 10, 21, 2, 0)); // 09:00 in Vietnam is 02:00 UTC
    expect(buildBookingFieldsV2(form, "STW-9")).not.toHaveProperty("Plan End");
    expect(buildBookingFieldsV2({ ...form, planEndDate: "2026-11-21" }, "STW-9")).not.toHaveProperty("Plan End");
  });

  it("stores drop-off and pick-up as Vietnam time, whatever zone the server runs in", () => {
    const f = buildBookingFieldsV2(form, "STW-9");
    expect(f["Drop-off"]).toBe(Date.UTC(2026, 8, 20, 2, 0)); // 09:00 in Vietnam (UTC+7) is 02:00 UTC
    expect(f["Pick-up"]).toBe(Date.UTC(2026, 10, 5, 2, 0));
    const late = buildBookingFieldsV2({ ...form, dropOffTime: "23:30" }, "STW-9");
    expect(late["Drop-off"]).toBe(Date.UTC(2026, 8, 20, 16, 30)); // still 20 Sept in Vietnam
  });

  it("leaves out what the staff form does not have, and guesses nothing", () => {
    const intake: BookingBody = {
      source: "Intake", lane: "flexible", planName: "By the Day", oversized: true,
      dropOffDate: "2026-09-20", dropOffTime: "10:00", duration: "Up to 24 hrs",
      name: "Walk In", phone: "0049 170 1234567", pax: 1, total: 60000,
    };
    const f = buildBookingFieldsV2(intake, "STW-8");
    expect(f).toMatchObject({ Source: "Intake", WhatsApp: "+491701234567", Bags: 1, Status: "Booking" });
    for (const missing of ["Pick-up", "Duration", "Oversized Bags", "Price per Bag", "Oversized Surcharge", "Email", "Phone Country", "Terms Agreed", "Terms Agreed At", "Price Detail"]) {
      expect(f).not.toHaveProperty(missing);
    }
    expect(Object.values(f).every((v) => v !== undefined)).toBe(true);
    expect(buildBookingFieldsV2({ ...intake, oversized: false }, "STW-8")["Oversized Bags"]).toBe(0);
  });

  it("ignores a consent time it cannot read instead of failing the booking", () => {
    const f = buildBookingFieldsV2({ ...form, consentAt: "not a date" }, "STW-9");
    expect(f).not.toHaveProperty("Terms Agreed");
    expect(f).not.toHaveProperty("Terms Agreed At");
  });
});

describe("elapsedLabel (the Duration column of Bookings v2)", () => {
  it("is the real time from drop-off to pick-up, in days, hours and minutes", () => {
    expect(elapsedLabel("2026-09-21", "09:00", "2026-11-06", "09:00")).toBe("46 days");
    expect(elapsedLabel("2026-09-21", "10:00", "2026-09-22", "09:00")).toBe("23 hours");
    expect(elapsedLabel("2026-09-20", "09:00", "2026-09-21", "16:00")).toBe("1 day 7 hours");
    expect(elapsedLabel("2026-09-20", "09:00", "2026-09-20", "11:00")).toBe("2 hours");
    expect(elapsedLabel("2026-09-20", "09:30", "2026-09-20", "11:00")).toBe("1 hour 30 minutes");
    expect(elapsedLabel("2026-09-20", "09:00", "2026-09-20", "09:30")).toBe("30 minutes");
    expect(elapsedLabel("2026-09-20", "09:00", "2026-09-22", "10:30")).toBe("2 days 1 hour 30 minutes");
  });
  it("counts across month and year ends", () => {
    expect(elapsedLabel("2026-12-31", "22:00", "2027-01-01", "07:00")).toBe("9 hours");
    expect(elapsedLabel("2026-01-31", "09:00", "2026-03-01", "09:00")).toBe("29 days");
    expect(elapsedLabel("2026-09-20", "09:00", "2027-01-20", "09:00")).toBe("122 days");
  });
  it("is empty when a moment is missing or the pick-up is not after the drop-off", () => {
    expect(elapsedLabel("2026-09-20", "09:00", undefined, undefined)).toBe("");
    expect(elapsedLabel("2026-09-20", undefined, "2026-09-21", "09:00")).toBe("");
    expect(elapsedLabel("2026-09-20", "09:00", "2026-09-20", "09:00")).toBe("");
    expect(elapsedLabel("2026-09-21", "09:00", "2026-09-20", "09:00")).toBe("");
  });
  it("is what the v2 record stores, whatever plan label the form sends", () => {
    const f = buildBookingFieldsV2({ ...dayBooking, duration: "Custom: 2× Strand (46 days)", dropOffTime: "09:00", pickupDate: "2026-09-20", pickupTime: "16:30" }, "STW-7");
    expect(f.Duration).toBe("7 hours 30 minutes");
  });
});

