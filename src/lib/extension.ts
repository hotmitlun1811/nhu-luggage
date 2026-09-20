/**
 * "Extend my storage": the rules behind the short form a customer opens from a
 * link Stow sends them (/extend/STW-260921-K7M2QX). Pure functions, so every
 * rule is tested (extension.test.ts); the Lark calls live in lark-server.ts.
 *
 * The customer is asked two things only: how many bags, and the new pick-up
 * date. Everything else comes from the booking itself, found by the Booking ID
 * in the link, so a request can never be attached to the wrong customer and
 * nobody types their contact details twice:
 *
 *  - The Booking ID in the link is the key. If no booking has it, nothing is
 *    stored and the customer is told at once (a request with no way to reach
 *    the customer would sit unanswered).
 *  - Name, WhatsApp and Email are copied from the booking row that was matched.
 *  - Bags and the new date are checked against that booking: no more bags than
 *    booked, and a date after the current pick-up.
 *  - Before the customer fills anything in, the page shows who the booking is
 *    for: the name in full (so they can see it was written down right), the
 *    last four digits of the phone and the start of the email. They can see it
 *    is theirs and tell Stow if it is not. Staff, in the group chat, get
 *    everything in full.
 *
 * The Bookings table can hold two rows with one Booking ID (the old table
 * recorded an extension as a second row, and a cancelled duplicate is kept).
 * The row that is still open, with the latest pick-up, is the booking as it stands.
 */
import { vnd } from "./plans";
import { addDays, diffDays, MAX_CUSTOM_DAYS, type Stamp } from "./pricing";

/** Every request starts here; staff move it on (Confirm, Paid, Complete, Cancel), like a booking. */
export const EXTENSION_STATUS_NEW = "Requested";

/** The booking form's own limit. Used only for a booking that never recorded how many bags it has. */
export const MAX_EXTEND_BAGS = 20;

/** Booking IDs as the booking form makes them, and as the old table wrote them (STW-260821-7499). */
const REFERENCE_ANY = /^STW-\d{6}-(?:[23456789BCDFGHJKMNPQRSTVWXZ]{6}|\d{4})$/;

/** The Booking ID from a link or a request, in its one written form; null when it is not a Booking ID. */
export function normalizeReference(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const t = raw.trim().toUpperCase();
  return REFERENCE_ANY.test(t) ? t : null;
}

// ── Vietnam time. It has no daylight saving, so a fixed +07:00 is exact, and the server runs in UTC. ──

const pad = (n: number) => String(n).padStart(2, "0");
const VIETNAM_OFFSET_MS = 7 * 3_600_000;

/** A moment (epoch ms, or an ISO string) as the wall clock in Vietnam. null when it is not a moment. */
export function vietnamStamp(when: string | number | null | undefined): Stamp | null {
  if (when == null || when === "") return null;
  const ms = typeof when === "number" ? when : new Date(when).getTime();
  if (!Number.isFinite(ms)) return null;
  const t = new Date(ms + VIETNAM_OFFSET_MS);
  return {
    date: `${t.getUTCFullYear()}-${pad(t.getUTCMonth() + 1)}-${pad(t.getUTCDate())}`,
    time: `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}`,
  };
}

export const vietnamToday = (now: number = Date.now()): string => (vietnamStamp(now) as Stamp).date;

/** Epoch ms of a Vietnam wall-clock moment. */
export const vietnamMoment = (date: string, time: string): number => new Date(`${date}T${time}:00+07:00`).getTime();

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "2026-09-27" -> "Sun, 27 September 2026", the wording of the WhatsApp booking message. Built by hand so it never depends on the server's locale data. */
export function longDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return `${WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()]}, ${d} ${MONTHS[m - 1]} ${y}`;
}

/**
 * "Sun, 27 September 2026 at 09:00". A time of 00:00 is left out: the shop opens
 * at 07:00, so it can only mean the old table never recorded a time (rows moved
 * from it hold 00:00), and "at 00:00" would send someone to the shop at midnight.
 */
export const stampLabel = (s: Stamp) => (s.time === "00:00" ? longDate(s.date) : `${longDate(s.date)} at ${s.time}`);

/** A real calendar day written YYYY-MM-DD ("2026-02-31" is not one). */
export function isRealDate(date: unknown): date is string {
  return typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date) && addDays(date, 0) === date;
}

// ── Reading a booking out of Lark ──

/** The columns of the Bookings table the extension form reads, by name. */
export const BOOKING_COLUMNS = ["Reference", "Status", "Plan", "Bags", "Oversized Bags", "Drop-off", "Pick-up", "Plan End", "Total (VND)", "Name", "WhatsApp", "Email"] as const;

/** What one Bookings row says, in the shapes the rules below use. */
export type BookingRow = {
  /** Lark's id of the row, so the request can link to exactly this row. */
  recordId: string;
  reference: string;
  status: string;
  /** "Mini", "By the Day", "Custom" ... as the table says it. */
  plan: string;
  bags: number | null;
  oversizedBags: number | null;
  dropOff: Stamp | null;
  pickUp: Stamp | null;
  planEnd: Stamp | null;
  /** What the booking was quoted, in VND. */
  total: number | null;
  name: string;
  whatsapp: string;
  email: string;
};

/** The part of a Lark "list records" answer (base/v3) this file reads. */
export type LarkRecordsPage = { fields?: string[]; data?: unknown[][]; record_id_list?: string[] };

function cellText(v: unknown): string {
  if (v == null) return "";
  if (typeof v === "string") return v.trim();
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (Array.isArray(v)) {
    // A select comes back as ["Paid"], and a text made of parts as [{text}, ...].
    return v
      .map((x) => (x && typeof x === "object" && "text" in x ? String((x as { text: unknown }).text) : cellText(x)))
      .filter(Boolean)
      .join(", ");
  }
  return "";
}

function cellNumber(v: unknown): number | null {
  const n = typeof v === "number" ? v : typeof v === "string" && v.trim() !== "" ? Number(v) : NaN;
  return Number.isFinite(n) ? n : null;
}

/** Bookings rows out of a Lark answer. Columns are found by name, so their order does not matter. */
export function parseBookingRows(page: LarkRecordsPage): BookingRow[] {
  const names = page.fields ?? [];
  return (page.data ?? []).map((row, i) => {
    const cell = (name: string) => row[names.indexOf(name)];
    return {
      recordId: page.record_id_list?.[i] ?? "",
      reference: cellText(cell("Reference")),
      status: cellText(cell("Status")),
      plan: cellText(cell("Plan")),
      bags: cellNumber(cell("Bags")),
      oversizedBags: cellNumber(cell("Oversized Bags")),
      dropOff: vietnamStamp(cell("Drop-off") as string | number | null),
      pickUp: vietnamStamp(cell("Pick-up") as string | number | null),
      planEnd: vietnamStamp(cell("Plan End") as string | number | null),
      total: cellNumber(cell("Total (VND)")),
      name: cellText(cell("Name")),
      whatsapp: cellText(cell("WhatsApp")),
      email: cellText(cell("Email")),
    };
  });
}

export type BookingLookup =
  | { kind: "found"; booking: BookingRow }
  | { kind: "not-found" }
  /** The booking exists but is Complete or Cancel: the bags are gone, or it was called off. */
  | { kind: "closed" }
  /** Open, but Stow has no WhatsApp or email for it, so nobody could answer the request. */
  | { kind: "no-contact" };

const FINISHED = new Set(["Complete", "Cancel"]);

const momentKey = (s: Stamp | null) => (s ? vietnamMoment(s.date, s.time) : Number.NEGATIVE_INFINITY);

/** Which booking a Booking ID means, given every row that carries it. */
export function resolveBooking(rows: BookingRow[], reference: string): BookingLookup {
  const mine = rows.filter((r) => r.reference === reference);
  if (mine.length === 0) return { kind: "not-found" };
  const open = mine.filter((r) => !FINISHED.has(r.status));
  if (open.length === 0) return { kind: "closed" };
  // Latest pick-up first: an old-style extension row supersedes the row it extended.
  const [current] = [...open].sort((a, b) => (momentKey(b.pickUp) > momentKey(a.pickUp) ? 1 : momentKey(b.pickUp) < momentKey(a.pickUp) ? -1 : 0));
  if (!current.whatsapp && !current.email) return { kind: "no-contact" };
  return { kind: "found", booking: current };
}

// ── What the customer may ask for ──

export type ExtensionRequest = { bags: number; newPickupDate: string };

/**
 * The days the new pick-up may fall on. It must come after the current
 * pick-up (this form extends, it does not shorten) and never in the past. The
 * top end is the longest stay the price engine will quote, counted from drop-off.
 * A booking with no pick-up recorded starts from tomorrow.
 */
export function extensionWindow(b: Pick<BookingRow, "dropOff" | "pickUp">, today: string): { min: string; max: string } {
  const afterPickUp = addDays(b.pickUp?.date ?? today, 1);
  return { min: afterPickUp > today ? afterPickUp : today, max: addDays(b.dropOff?.date ?? today, MAX_CUSTOM_DAYS) };
}

/** How many bags may be extended: as many as the booking has, or the form's limit when it never recorded them. */
export const bagLimit = (b: Pick<BookingRow, "bags">): number => b.bags ?? MAX_EXTEND_BAGS;

export type ExtensionCheck = { ok: true } | { ok: false; field: "bags" | "date" };

export function checkExtension(b: BookingRow, req: ExtensionRequest, today: string): ExtensionCheck {
  if (!Number.isInteger(req.bags) || req.bags < 1 || req.bags > bagLimit(b)) return { ok: false, field: "bags" };
  if (!isRealDate(req.newPickupDate)) return { ok: false, field: "date" };
  const { min, max } = extensionWindow(b, today);
  if (req.newPickupDate < min || req.newPickupDate > max) return { ok: false, field: "date" };
  return { ok: true };
}

/**
 * How many days after the end of the plan the customer paid for the new
 * pick-up falls. 0 means it is inside the paid plan. null when the booking never
 * recorded when its plan ends (a booking made at the counter).
 */
export function daysPastPlanEnd(planEnd: Stamp | null, newPickupDate: string): number | null {
  return planEnd ? Math.max(0, diffDays(planEnd.date, newPickupDate)) : null;
}

// ── What the customer is shown about the booking ──

/** Only the last four digits show: "+84905955161" -> "+XXXXXXX5161". A number too short to hide anything shows no digit at all. */
export function maskPhone(phone: string): string {
  const text = phone.trim();
  const digits = (text.match(/\d/g) ?? []).length;
  if (digits === 0) return "";
  if (digits <= 4) return "X".repeat(4);
  let seen = 0;
  return text.replace(/\d/g, (d) => (seen++ < digits - 4 ? "X" : d));
}

/**
 * The start of the address shows, then stars, then the whole domain:
 * "dinhhuy18123456@gmail.com" -> "dinhhuy18******@gmail.com". About 60% of the
 * name part is kept, but at least 3 characters are always hidden, so a short
 * address is not given away.
 */
export function maskEmail(email: string): string {
  const text = email.trim();
  const at = text.lastIndexOf("@");
  if (at < 1) return text ? "***" : "";
  const local = Array.from(text.slice(0, at));
  const visible = Math.max(0, Math.min(Math.round(local.length * 0.6), local.length - 3));
  return local.slice(0, visible).join("") + "*".repeat(local.length - visible) + text.slice(at);
}

/**
 * The booking's contact details as the customer sees them before they fill in
 * the form. The name is shown in full, so they can check it was written down
 * right; the phone and the email are masked. Empty for what the booking does not have.
 */
export function contactForCustomer(b: Pick<BookingRow, "name" | "whatsapp" | "email">): { name: string; whatsapp: string; email: string } {
  return { name: b.name.trim(), whatsapp: maskPhone(b.whatsapp), email: maskEmail(b.email) };
}

// ── A request that is already there ──

/** The columns of the Extensions table read to spot a request that was already sent. */
export const EXISTING_REQUEST_COLUMNS = ["Booking ID", "Status", "Bags to Extend", "New Pick-up Date"] as const;

export type ExistingRequest = { status: string; bags: number | null; newPickupDate: string | null };

export function parseExistingRequests(page: LarkRecordsPage): ExistingRequest[] {
  const names = page.fields ?? [];
  return (page.data ?? []).map((row) => {
    const cell = (name: string) => row[names.indexOf(name)];
    return {
      status: cellText(cell("Status")),
      bags: cellNumber(cell("Bags to Extend")),
      newPickupDate: vietnamStamp(cell("New Pick-up Date") as string | number | null)?.date ?? null,
    };
  });
}

/**
 * The same customer tapping "Send" twice (or a phone retrying a slow send) must
 * not make two rows and two group-chat messages. A request that staff have
 * already moved on (Confirm, Paid, ...) does not count: asking again is a new request.
 */
export function isAlreadyRequested(existing: ExistingRequest[], req: ExtensionRequest): boolean {
  return existing.some((e) => e.status === EXTENSION_STATUS_NEW && e.bags === req.bags && e.newPickupDate === req.newPickupDate);
}

// ── What is written to Lark ──

/**
 * The row for the Extensions table. "Booking" links to the exact Bookings row.
 * Name, WhatsApp and Email are copied as they stand in that row (never
 * reformatted), and what the booking said at this moment is kept beside the
 * request (bags booked, pick-up now, plan end), so the request still makes
 * sense after staff update the booking. Anything the booking does not have is
 * left out rather than guessed.
 */
export function buildExtensionFields(b: BookingRow, req: ExtensionRequest, now: number = Date.now()): Record<string, unknown> {
  const f: Record<string, unknown> = {
    "Booking ID": b.reference,
    Status: EXTENSION_STATUS_NEW,
    "Submitted at": now,
    "Bags to Extend": req.bags,
    // Noon, so a date can never slip to the day before in another time zone.
    "New Pick-up Date": vietnamMoment(req.newPickupDate, "12:00"),
  };
  if (b.recordId) f.Booking = [b.recordId];
  if (b.name) f.Name = b.name;
  if (b.whatsapp) f.WhatsApp = b.whatsapp;
  if (b.email) f.Email = b.email;
  if (b.bags != null) f["Bags Booked"] = b.bags;
  if (b.pickUp) f["Pick-up Now"] = vietnamMoment(b.pickUp.date, b.pickUp.time);
  if (b.planEnd) f["Plan End"] = vietnamMoment(b.planEnd.date, b.planEnd.time);
  const past = daysPastPlanEnd(b.planEnd, req.newPickupDate);
  if (past != null) f["Days Past Plan End"] = past;
  return f;
}

/**
 * The message for the Stow Bookings group chat. Everything staff need to answer
 * without opening Lark, contact details in full, laid out in the same sections
 * as the booking message so nothing is missed or mixed up.
 */
export function extensionAnnouncement(b: BookingRow, req: ExtensionRequest): string {
  const past = daysPastPlanEnd(b.planEnd, req.newPickupDate);
  const day = (n: number) => `${n} day${n === 1 ? "" : "s"}`;
  const bullets = (lines: string[]) => lines.filter(Boolean).map((line) => `• ${line}`);
  const bagsOnBooking =
    b.bags == null ? "" : `${b.bags}${b.oversizedBags ? ` (${b.oversizedBags} oversized)` : ""}`;

  const request = bullets([
    `Bags to extend: ${b.bags != null ? `${req.bags} of ${b.bags}` : req.bags}`,
    `New pick-up date: ${longDate(req.newPickupDate)}`,
    past == null ? "" : past === 0 ? "The new date is inside the plan already paid for" : `The new date is ${day(past)} after the plan end`,
  ]);
  const current = bullets([
    b.plan ? `Plan: ${b.plan}` : "",
    b.dropOff ? `Drop-off: ${stampLabel(b.dropOff)}` : "",
    b.pickUp ? `Pick-up now: ${stampLabel(b.pickUp)}` : "",
    b.planEnd ? `Plan end: ${stampLabel(b.planEnd)}` : "",
    bagsOnBooking ? `Bags: ${bagsOnBooking}` : "",
    b.total != null ? `Total: ${vnd(b.total)}` : "",
    `Status: ${b.status || "not set"}`,
  ]);
  const contact = bullets([
    `Name: ${b.name || "(none on file)"}`,
    `WhatsApp: ${b.whatsapp || "(none on file)"}`,
    `Email: ${b.email || "(none on file)"}`,
  ]);

  return [
    `🔁 Extension request: ${b.reference}`,
    "",
    "Request:",
    ...request,
    "",
    "Current booking:",
    ...current,
    "",
    "Contact:",
    ...contact,
    "",
    "It is in the Extensions table. Please confirm the price and the pick-up time with the customer on WhatsApp.",
  ].join("\n");
}
