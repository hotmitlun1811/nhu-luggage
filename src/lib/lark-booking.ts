/**
 * What a booking looks like in the Stow Bookings Lark table. Pure functions, so
 * the rules are testable and both forms (the customer form and the staff
 * Intake form) are held to the same standard by the one API route.
 *
 * The standard (docs/lark/2026-09-20-bookings-standard.md):
 *  - Lane: Flexible / Flat Rate / Custom. Plan: the five plans, or Custom.
 *  - Status starts as "Booking". The staff's working view filters on Status,
 *    so a booking with no Status would be invisible there.
 *  - Duration is a plain length: "2 hours", "1 day", "1 week", "1 month",
 *    "4 months", or "Custom: 2× Strand (46 days)". Older labels like
 *    "Up to 1 month" are mapped to those.
 *  - Phone is international format with no spaces: "+84905955161".
 *  - Oversized Count and Price Detail carry what the form worked out, so
 *    staff can check the Total instead of trusting it.
 *
 * A Lark select column only accepts options it already has. So if the table
 * has no "Custom" option, or lacks the newer columns, the write is refused. To
 * keep bookings flowing during a rollout, `buildBookingFields` also returns a
 * `legacy` version (the older columns only, Custom recorded as the plan that
 * makes up most of its price) that the route retries with.
 */

export type LarkLane = "flexible" | "flatrate" | "custom";

export type BookingBody = {
  source?: "Intake" | "Booking Form";
  reference?: string;
  lane?: LarkLane;
  planName?: string;
  /** What to record instead if the table has no "Custom" option yet. */
  fallback?: { lane: "flexible" | "flatrate"; planName: string };
  oversized?: boolean;
  /** How many bags are oversized. Absent from the staff form, which only has a yes/no. */
  oversizedCount?: number;
  dropOffDate?: string; // "YYYY-MM-DD"
  dropOffTime?: string; // "HH:mm"
  duration?: string;
  pickupDate?: string; // "YYYY-MM-DD"
  pickupTime?: string; // "HH:mm"
  name?: string;
  phone?: string;
  email?: string;
  pax?: number;
  total?: number; // VND
  /** The price worked out, one line per step. Written by the customer form. */
  priceDetail?: string;
  /** Written only by the customer form, for the "Bookings v2" table. */
  pricePerBag?: number;
  oversizedSurcharge?: number; // all oversized bags together
  phoneCountry?: string; // 2-letter code picked next to the WhatsApp number
  consentAt?: string; // ISO time the Terms and Privacy Policy were accepted
  termsVersion?: string; // effective date of those Terms
};

/** Every new booking starts here; staff move it on (Confirm, Paid, Complete, Cancel). */
export const NEW_BOOKING_STATUS = "Booking";

export function laneLabel(lane: LarkLane): "Flexible" | "Flat Rate" | "Custom" {
  return lane === "flexible" ? "Flexible" : lane === "custom" ? "Custom" : "Flat Rate";
}

/**
 * "+84 905955161" -> "+84905955161". Only formatting is removed (spaces, dots,
 * dashes, brackets) and the international "00" prefix becomes "+". Digits are
 * never dropped or guessed: a number typed without its country code stays as it is.
 */
export function normalizePhone(raw: string): string {
  const s = raw.trim().replace(/[\s().-]/g, "");
  return s.startsWith("00") ? `+${s.slice(2)}` : s;
}

// The labels the staff form and the older customer form used, in the words the
// current form uses. "2 × 4 months" has no plain equivalent, so it is left alone.
const DURATION_LABELS: Record<string, string> = {
  "Up to 24 hrs": "1 day",
  "Up to 1 week": "1 week",
  "Up to 1 month": "1 month",
  "Up to 4 months": "4 months",
  "1 × 4 months": "4 months",
  "1 hours": "1 hour",
};

export function normalizeDuration(raw?: string): string {
  const t = (raw ?? "").trim();
  return DURATION_LABELS[t] ?? t;
}

/** Bitable wants a millisecond epoch for a date; noon avoids a date shift from timezone rounding. */
const dayToEpoch = (day: string) => new Date(`${day}T12:00:00`).getTime();

/**
 * The record to write, plus a fallback for a table that lacks the newer
 * options/columns (null when there is nothing to fall back to).
 */
export function buildBookingFields(
  body: BookingBody,
  ref: string
): { primary: Record<string, unknown>; legacy: Record<string, unknown> | null } {
  const { source, lane, planName, fallback, oversized, oversizedCount, dropOffDate, dropOffTime, duration, pickupDate, pickupTime, name, phone, email, pax, total, priceDetail } = body;

  const isOversized = oversizedCount != null ? oversizedCount > 0 : !!oversized;
  const legacy: Record<string, unknown> = {
    Reference: ref,
    Source: source || "Booking Form",
    Lane: laneLabel(lane as LarkLane),
    Plan: planName,
    Status: NEW_BOOKING_STATUS,
    Oversized: isOversized,
    "Drop-off Date": dayToEpoch(dropOffDate as string),
    "Drop-off Time": dropOffTime || "",
    Duration: normalizeDuration(duration),
    Name: name,
    Phone: normalizePhone(phone as string),
    "Total (VND)": total,
  };
  if (email?.trim()) legacy.Email = email.trim();
  if (pax != null) legacy.Pax = pax;
  // Only set when known: the staff form has no pick-up, and is left blank rather than guessed.
  if (pickupDate) legacy["Pickup Date"] = dayToEpoch(pickupDate);
  if (pickupTime) legacy["Pickup Time"] = pickupTime;

  const primary: Record<string, unknown> = { ...legacy };
  // The staff form only says yes/no; an unknown count stays blank instead of a wrong 1.
  if (oversizedCount != null) primary["Oversized Count"] = oversizedCount;
  else if (!oversized) primary["Oversized Count"] = 0;
  if (priceDetail?.trim()) primary["Price Detail"] = priceDetail.trim();

  // What an older table can still take: no newer columns, Custom as its main plan.
  const older: Record<string, unknown> = { ...legacy };
  if (fallback) {
    older.Lane = laneLabel(fallback.lane);
    older.Plan = fallback.planName;
  }
  const differs = JSON.stringify(older) !== JSON.stringify(primary);
  return { primary, legacy: differs ? older : null };
}

/** Vietnam has no daylight saving, so a fixed offset is exact. The server runs in UTC, so never use its own zone. */
const vietnamMoment = (day: string, time: string) => new Date(`${day}T${time}:00+07:00`).getTime();

/**
 * The real time between drop-off and pick-up, in plain words: "46 days",
 * "23 hours", "1 day 7 hours", "1 hour 30 minutes". A part that is zero is left
 * out. It is the time the luggage is actually stored, not the plan it is billed
 * as. Empty when either moment is missing or the pick-up is not after the drop-off.
 */
export function elapsedLabel(dropOffDate?: string, dropOffTime?: string, pickupDate?: string, pickupTime?: string): string {
  if (!dropOffDate || !dropOffTime || !pickupDate || !pickupTime) return "";
  const minutes = Math.round((vietnamMoment(pickupDate, pickupTime) - vietnamMoment(dropOffDate, dropOffTime)) / 60000);
  if (!(minutes > 0)) return "";
  const part = (n: number, unit: string) => (n > 0 ? `${n} ${unit}${n === 1 ? "" : "s"}` : "");
  return [part(Math.floor(minutes / 1440), "day"), part(Math.floor((minutes % 1440) / 60), "hour"), part(minutes % 60, "minute")]
    .filter(Boolean)
    .join(" ");
}

/**
 * The record for the "Bookings v2" table (docs/lark/2026-09-20-bookings-v2.md):
 * one column for everything the form collects or works out. Drop-off and
 * pick-up are one date-and-time value each, in Vietnam time. Anything the
 * caller did not send is left out rather than guessed (the staff form has no
 * pick-up, price breakdown or consent).
 */
export function buildBookingFieldsV2(body: BookingBody, ref: string): Record<string, unknown> {
  const { source, lane, planName, oversized, oversizedCount, dropOffDate, dropOffTime, pickupDate, pickupTime, name, phone, email, pax, total, priceDetail, pricePerBag, oversizedSurcharge, phoneCountry, consentAt, termsVersion } = body;
  const f: Record<string, unknown> = {
    Reference: ref,
    Status: NEW_BOOKING_STATUS,
    Source: source || "Booking Form",
    Lane: laneLabel(lane as LarkLane),
    Plan: planName,
    "Drop-off": vietnamMoment(dropOffDate as string, dropOffTime || "12:00"),
    "Total (VND)": total,
    Name: name,
    WhatsApp: normalizePhone(phone as string),
  };
  if (pickupDate && pickupTime) f["Pick-up"] = vietnamMoment(pickupDate, pickupTime);
  // Worked out here from the two moments; the plan label the form sends is not used.
  const stay = elapsedLabel(dropOffDate, dropOffTime, pickupDate, pickupTime);
  if (stay) f.Duration = stay;
  if (pax != null) f.Bags = pax;
  // Unknown (the staff form only says yes/no) stays blank instead of a wrong number.
  if (oversizedCount != null) f["Oversized Bags"] = oversizedCount;
  else if (!oversized) f["Oversized Bags"] = 0;
  if (pricePerBag != null) f["Price per Bag"] = pricePerBag;
  if (oversizedSurcharge != null) f["Oversized Surcharge"] = oversizedSurcharge;
  if (email?.trim()) f.Email = email.trim();
  if (phoneCountry) f["Phone Country"] = phoneCountry;
  const agreedAt = consentAt ? Date.parse(consentAt) : NaN;
  if (!Number.isNaN(agreedAt)) {
    f["Terms Agreed"] = true;
    f["Terms Agreed At"] = agreedAt;
    if (termsVersion) f["Terms Version"] = termsVersion;
  }
  if (priceDetail?.trim()) f["Price Detail"] = priceDetail.trim();
  return f;
}

/** The group-chat announcement for a new booking. */
export function announcementText(ref: string, body: BookingBody, vnd: (n: number) => string): string {
  const { source, lane, planName, oversized, oversizedCount, dropOffDate, dropOffTime, duration, pickupDate, pickupTime, name, phone, email, pax, total, priceDetail } = body;
  const laneText = laneLabel(lane as LarkLane);
  const planText = planName === laneText ? laneText : `${planName} (${laneText})`;
  const detail = (priceDetail ?? "").split("\n").map((l) => l.trim()).filter(Boolean);
  const bullets = [
    `Customer: ${name} (${normalizePhone(phone as string)})`,
    email?.trim() ? `Email: ${email.trim()}` : "",
    pax != null ? `Pax: ${pax}` : "",
    `Plan: ${planText}${oversized || (oversizedCount ?? 0) > 0 ? `, Oversized ×${oversizedCount ?? 1}` : ""}`,
    `Drop-off: ${dropOffDate}${dropOffTime ? ` at ${dropOffTime}` : ""}`,
    `Duration: ${normalizeDuration(duration) || "N/A"}`,
    pickupDate ? `Pickup (est.): ${pickupDate}${pickupTime ? ` at ${pickupTime}` : ""}` : "",
    `Total: ${vnd(total as number)}`,
    `Source: ${source || "Booking Form"}`,
  ]
    .filter(Boolean)
    .map((line) => `• ${line}`);
  return [`📦 New Booking: ${ref}`, "", ...bullets, ...(detail.length ? ["", "How the total was worked out:", ...detail.map((l) => `   ${l}`)] : [])].join("\n");
}
