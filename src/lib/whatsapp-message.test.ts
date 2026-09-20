import { describe, expect, it } from "vitest";
import { PLAN_FACTS, vnd } from "./plans";
import { buildBookingMessage, planLabel, type BookingMessage } from "./whatsapp-message";

const sample: BookingMessage = {
  bookingId: "STW-260921-PXSD27",
  plan: "Custom",
  dropOff: "Mon, 21 September 2026 at 09:00",
  pickUp: "Fri, 6 November 2026 at 09:00",
  planEnd: "Sat, 21 November 2026 at 09:00",
  bags: 2,
  oversizedBags: 1,
  total: "1.300.000 ₫",
  name: "Sample Customer",
  whatsapp: "+1 905955161",
  email: "sample@example.com",
  consent: { version: "1 June 2026", at: "20 Sept 2026, 14:09" },
};

describe("buildBookingMessage", () => {
  it("is exactly the layout the owner asked for", () => {
    expect(buildBookingMessage(sample)).toBe(
      [
        "Booking Information:",
        "📋 Booking ID: STW-260921-PXSD27",
        "📦 Plan: Custom",
        "📅 Drop-off: Mon, 21 September 2026 at 09:00",
        "📅 Pick-up: Fri, 6 November 2026 at 09:00",
        "📅 Plan End Date: Sat, 21 November 2026 at 09:00",
        "🧳 Bags: 2 (1 oversized)",
        "💰 Total: 1.300.000 ₫",
        "",
        "Contact Information:",
        "👤 Name: Sample Customer",
        "📱 WhatsApp: +1 905955161",
        "✉️ Email: sample@example.com",
        "✅ Agreed to Terms of Service & Privacy Policy (Effective 1 June 2026) - read in full at 20 Sept 2026, 14:09",
        "",
        "Please confirm my booking. Thank you! 🙏",
      ].join("\n")
    );
  });

  it("puts the plan end right below the pick-up, and leaves the line out when it is not known", () => {
    const lines = buildBookingMessage(sample).split("\n");
    expect(lines.indexOf("📅 Plan End Date: Sat, 21 November 2026 at 09:00")).toBe(lines.findIndex((l) => l.startsWith("📅 Pick-up:")) + 1);
    const without = buildBookingMessage({ ...sample, planEnd: undefined });
    expect(without).not.toContain("Plan End");
    expect(without).toContain("📅 Pick-up: Fri, 6 November 2026 at 09:00\n🧳 Bags: 2");
  });

  it("keeps the blank lines between the sections", () => {
    const text = buildBookingMessage(sample);
    expect(text).toContain("💰 Total: 1.300.000 ₫\n\nContact Information:");
    expect(text).toContain("read in full at 20 Sept 2026, 14:09\n\nPlease confirm my booking.");
  });

  it("says nothing about oversized bags when there are none", () => {
    const text = buildBookingMessage({ ...sample, oversizedBags: 0 });
    expect(text).toContain("🧳 Bags: 2\n");
    expect(text).not.toContain("oversized");
  });

  it("counts the oversized bags", () => {
    expect(buildBookingMessage({ ...sample, bags: 3, oversizedBags: 2 })).toContain("🧳 Bags: 3 (2 oversized)");
  });

  it("leaves out the Terms line, and only that line, when the Terms were not accepted here", () => {
    const text = buildBookingMessage({ ...sample, consent: undefined });
    expect(text).not.toContain("Agreed to Terms");
    expect(text).toContain("✉️ Email: sample@example.com\n\nPlease confirm my booking.");
  });

  it("carries no internal notes or price breakdown", () => {
    const text = buildBookingMessage(sample);
    for (const internal of ["cheapest", "billed", "Price per bag", "Stay:", "Duration", "mix of our plans", "Item:", "Ref:"]) {
      expect(text).not.toContain(internal);
    }
    expect(text).not.toContain("—"); // no em dashes in customer-facing text
  });

  it("trims stray spaces around the name and email", () => {
    const text = buildBookingMessage({ ...sample, name: "  Sample Customer ", email: " sample@example.com " });
    expect(text).toContain("👤 Name: Sample Customer\n");
    expect(text).toContain("✉️ Email: sample@example.com\n");
  });

  it("ends every line without trailing spaces", () => {
    for (const line of buildBookingMessage(sample).split("\n")) expect(line).toBe(line.trimEnd());
  });
});

describe("planLabel", () => {
  it("is the plan name with its price and period, and nothing else", () => {
    expect(planLabel("hourly")).toBe(`By the Hour (${vnd(PLAN_FACTS.hourly.price)}/hour)`);
    expect(planLabel("daily")).toBe(`By the Day (${vnd(PLAN_FACTS.daily.price)}/day)`);
    expect(planLabel("mini")).toBe(`Mini (${vnd(PLAN_FACTS.mini.price)}/week)`);
    expect(planLabel("strand")).toBe(`Strand (${vnd(PLAN_FACTS.strand.price)}/month)`);
    expect(planLabel("longstay")).toBe(`Long Stay (${vnd(PLAN_FACTS.longstay.price)}/4 months)`);
  });

  it("is just Custom for a custom stay", () => {
    expect(planLabel("custom")).toBe("Custom");
  });
});
