/**
 * Pricing engine: the ONE place that decides what a stay costs and when a plan
 * lets the customer collect. The booking form, the WhatsApp message and the
 * Lark record all read from here, so the number on screen can't drift from the
 * number staff see.
 *
 * Pure functions only (no React, no `Date.now()`), so every rule is testable
 * with exact numbers (see pricing.test.ts). Prices, surcharges and the hourly
 * cap come from plans.ts; nothing is priced by hand here.
 *
 * The rules (design: docs/pricing/2026-09-19-custom-plan-proposal.md):
 *  - Time is counted from the drop-off moment. A "day" is 24 hours from drop-off
 *    (the Terms of Service wording), a week is 7 days, a month is "the same
 *    time on the same date next month" and Long Stay is 4 of those.
 *  - There is a 60-minute grace at the end of every period, so being a few
 *    minutes late doesn't cost another day.
 *  - A fixed plan (Day, Mini, Strand, Long Stay) has one price and a limit on
 *    when the customer may collect. Longer than that is what Custom is for.
 *  - By the Hour is same-day: 15,000 per started hour, and past 4 hours it is
 *    billed as one day (plans.ts: HOURLY_BILLS_AS_DAY_AFTER_HOURS).
 *  - Custom prices any stay as the CHEAPEST combination of the plans that
 *    covers it (like a fare cap: you never pay more than the best mix).
 *  - The oversized surcharge follows the plan a piece of the price came from:
 *    Flexible plans 30,000, Flat Rate plans 50,000. It is charged per oversized
 *    bag and per plan period (so 2 months = 2 periods), but only once for
 *    hourly, however many hours.
 */

import { HOURLY_BILLS_AS_DAY_AFTER_HOURS, PLAN_FACTS, type PlanKey } from "./plans";

/** A wall-clock moment in the shop's time zone (Vietnam has no daylight saving). */
export type Stamp = { date: string; time: string }; // "YYYY-MM-DD", "HH:MM"

/** What the customer picks in the plan dropdown: a fixed plan, or Custom. */
export type PlanChoice = PlanKey | "custom";

/** Minutes of grace after each period ends, before the next one starts counting. */
export const GRACE_MINUTES = 60;
/** By the Hour never crosses midnight; the shop closes at this time. */
export const SHOP_CLOSE = "22:00";
/** Custom stays longer than this need a conversation, not a form. */
export const MAX_CUSTOM_DAYS = 1095;

// ── Date and time helpers (string based, UTC math, so no time-zone surprises) ──

const pad = (n: number) => String(n).padStart(2, "0");

function toUtcMs(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}
function fromUtcMs(ms: number): string {
  const t = new Date(ms);
  return `${t.getUTCFullYear()}-${pad(t.getUTCMonth() + 1)}-${pad(t.getUTCDate())}`;
}

export function addDays(date: string, days: number): string {
  return fromUtcMs(toUtcMs(date) + days * 86_400_000);
}

export function diffDays(from: string, to: string): number {
  return Math.round((toUtcMs(to) - toUtcMs(from)) / 86_400_000);
}

/** Same date `months` later; a date that doesn't exist there (31 Jan + 1 month) lands on the month's last day. */
export function addMonths(date: string, months: number): string {
  const [y, m, d] = date.split("-").map(Number);
  const index = y * 12 + (m - 1) + months;
  const year = Math.floor(index / 12);
  const month = index % 12;
  const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  return `${year}-${pad(month + 1)}-${pad(Math.min(d, lastDay))}`;
}

export function minutesOf(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function addMinutes(s: Stamp, minutes: number): Stamp {
  const total = minutesOf(s.time) + minutes;
  const dayShift = Math.floor(total / 1440);
  const t = ((total % 1440) + 1440) % 1440;
  return { date: addDays(s.date, dayShift), time: `${pad(Math.floor(t / 60))}:${pad(t % 60)}` };
}

/** Negative, zero or positive, like a comparator. */
export function compareStamps(a: Stamp, b: Stamp): number {
  if (a.date !== b.date) return a.date < b.date ? -1 : 1;
  if (a.time !== b.time) return a.time < b.time ? -1 : 1;
  return 0;
}

// ── Plan periods and where a customer may collect ──

type CoverPlan = Exclude<PlanKey, "hourly">;
/** Biggest first: on a price tie the cover uses fewer, larger plans. */
const COVER_PLANS: readonly CoverPlan[] = ["longstay", "strand", "mini", "daily"];

/** The date one period of `plan` ends, starting on `date`. */
function periodEndDate(plan: CoverPlan, date: string): string {
  switch (plan) {
    case "daily": return addDays(date, 1);
    case "mini": return addDays(date, 7);
    case "strand": return addMonths(date, 1);
    case "longstay": return addMonths(date, 4);
  }
}

/** The moment one period of `plan` ends, counted from `from`. */
export function periodEnd(plan: CoverPlan, from: Stamp): Stamp {
  return { date: periodEndDate(plan, from.date), time: from.time };
}

/**
 * The latest moment a customer may collect and still be inside their plan
 * (period end plus the grace). null for Custom, which has no limit.
 */
export function latestPickup(plan: PlanChoice, dropOff: Stamp): Stamp | null {
  if (plan === "custom") return null;
  if (plan === "hourly") return { date: dropOff.date, time: SHOP_CLOSE };
  return addMinutes(periodEnd(plan, dropOff), GRACE_MINUTES);
}

/** The half-hour slots a customer may collect at on `date`, given their drop-off. */
export function pickupSlots(plan: PlanChoice, dropOff: Stamp, date: string, allSlots: readonly string[]): string[] {
  if (date < dropOff.date) return [];
  const latest = latestPickup(plan, dropOff);
  if (latest && date > latest.date) return [];
  return allSlots.filter(
    (t) => (date > dropOff.date || t > dropOff.time) && (!latest || date < latest.date || t <= latest.time)
  );
}

/** Is `pickUp` after the drop-off and inside what `plan` allows? */
export function isPickupValid(plan: PlanChoice, dropOff: Stamp, pickUp: Stamp): boolean {
  if (compareStamps(pickUp, dropOff) <= 0) return false;
  const latest = latestPickup(plan, dropOff);
  return !latest || compareStamps(pickUp, latest) <= 0;
}

// ── Quotes ──

/** One line of the price: `count` × a plan, and the oversized surcharge that line carries per oversized bag. */
export type QuotePiece = {
  plan: PlanKey;
  count: number;
  /** Price of one, per bag. */
  unitPrice: number;
  /** Oversized surcharge for this whole line, per oversized bag. */
  surcharge: number;
};

/**
 * One billed period, in date order: the plan and the span it covers. Every
 * period starts at the drop-off clock time, so a span reads "20 Sept 09:00 to
 * 20 Oct 09:00". The last one may end after the pick-up (a shorter last month
 * costs the same); the receipt in the form spells that out.
 */
export type QuoteSegment = { plan: PlanKey; from: Stamp; to: Stamp };

export type QuoteFailure = "incomplete" | "not-after-dropoff" | "outside-plan" | "too-long";

export type Quote =
  | { ok: false; reason: QuoteFailure }
  | {
      ok: true;
      plan: PlanChoice;
      /** false while dates are missing: only a fixed plan's list price is known then. */
      complete: boolean;
      pieces: QuotePiece[];
      /**
       * The same pieces laid out by date, for the receipt. Empty when there are
       * no dates yet, and for an hourly stay (its line is "2 hours × 15.000 ₫").
       */
      segments: QuoteSegment[];
      /** Whole days the stay is charged for (0 for an hourly stay under 4 hours). */
      stayDays: number;
      /** Hours stayed, for an hourly stay (rounded up); null otherwise. */
      stayHours: number | null;
      /** An hourly stay long enough that the daily price applies instead. */
      hourlyBilledAsDay: boolean;
      /** Price of the stay for one bag, before any surcharge. */
      perBag: number;
      /** Extra for ONE oversized bag over the whole stay. */
      surchargePerOversizedBag: number;
      total: number;
    };

function piece(plan: PlanKey, count: number): QuotePiece {
  const f = PLAN_FACTS[plan];
  return {
    plan,
    count,
    unitPrice: f.price,
    // Hourly is charged once however many hours; every other plan repeats it
    // for each period (owner rule, 2026-09-19).
    surcharge: plan === "hourly" ? f.oversizeSurcharge : f.oversizeSurcharge * count,
  };
}

/** One plan period in a cover: the dates it runs from and to. */
type CoverStep = { plan: CoverPlan; from: string; to: string };

/**
 * The cheapest plans whose periods, laid end to end from `startDate`, cover
 * `days` days, in date order. Exact (dynamic programming), so it is never
 * dearer than any other combination, and a longer stay never costs less than a
 * shorter one. On a tie it prefers fewer pieces, then bigger plans.
 */
function coverSteps(startDate: string, days: number): CoverStep[] {
  const cost = new Array<number>(days + 1).fill(0);
  const pieces = new Array<number>(days + 1).fill(0);
  const choice = new Array<CoverPlan | null>(days + 1).fill(null);
  const nextFrom = (offset: number, plan: CoverPlan) =>
    diffDays(startDate, periodEndDate(plan, addDays(startDate, offset)));

  for (let offset = days - 1; offset >= 0; offset--) {
    let bestCost = Infinity;
    let bestPieces = Infinity;
    let bestPlan: CoverPlan | null = null;
    for (const plan of COVER_PLANS) {
      const next = nextFrom(offset, plan);
      const covered = next >= days;
      const c = PLAN_FACTS[plan].price + (covered ? 0 : cost[next]);
      const n = 1 + (covered ? 0 : pieces[next]);
      if (c < bestCost || (c === bestCost && n < bestPieces)) {
        bestCost = c;
        bestPieces = n;
        bestPlan = plan;
      }
    }
    cost[offset] = bestCost;
    pieces[offset] = bestPieces;
    choice[offset] = bestPlan;
  }

  const steps: CoverStep[] = [];
  for (let offset = 0; offset < days; ) {
    const plan = choice[offset] as CoverPlan;
    const next = nextFrom(offset, plan);
    steps.push({ plan, from: addDays(startDate, offset), to: addDays(startDate, next) });
    offset = next;
  }
  return steps;
}

/** The steps of a cover, counted per plan (biggest plan first). */
function piecesOf(steps: CoverStep[]): QuotePiece[] {
  const counts = new Map<CoverPlan, number>();
  for (const st of steps) counts.set(st.plan, (counts.get(st.plan) ?? 0) + 1);
  return COVER_PLANS.filter((p) => counts.has(p)).map((p) => piece(p, counts.get(p) as number));
}

export function cheapestCover(startDate: string, days: number): QuotePiece[] {
  return piecesOf(coverSteps(startDate, days));
}

const complete = (s: Stamp | null | undefined): s is Stamp => !!s && !!s.date && !!s.time;

function finish(
  plan: PlanChoice,
  isComplete: boolean,
  pieces: QuotePiece[],
  bags: number,
  oversizedBags: number,
  extra: { stayDays: number; stayHours: number | null; hourlyBilledAsDay: boolean; segments: QuoteSegment[] }
): Quote {
  const perBag = pieces.reduce((sum, p) => sum + p.count * p.unitPrice, 0);
  const surchargePerOversizedBag = pieces.reduce((sum, p) => sum + p.surcharge, 0);
  const oversized = Math.min(Math.max(0, oversizedBags), bags);
  return {
    ok: true,
    plan,
    complete: isComplete,
    pieces,
    ...extra,
    perBag,
    surchargePerOversizedBag,
    total: perBag * bags + surchargePerOversizedBag * oversized,
  };
}

/** An hourly-style stay (same date): started hours, or one day past the cap. */
function hourlyPieces(minutes: number): { pieces: QuotePiece[]; hours: number; billedAsDay: boolean } {
  const hours = Math.max(1, Math.ceil(minutes / 60));
  return hours > HOURLY_BILLS_AS_DAY_AFTER_HOURS
    ? { pieces: [piece("daily", 1)], hours, billedAsDay: true }
    : { pieces: [piece("hourly", hours)], hours, billedAsDay: false };
}

export function quote(input: {
  plan: PlanChoice;
  dropOff: Stamp | null;
  pickUp: Stamp | null;
  bags: number;
  oversizedBags: number;
}): Quote {
  const { plan, dropOff, pickUp, bags, oversizedBags } = input;

  // Without both moments only a fixed plan has a price (its list price).
  if (!complete(dropOff) || !complete(pickUp)) {
    if (plan === "custom" || plan === "hourly") return { ok: false, reason: "incomplete" };
    return finish(plan, false, [piece(plan, 1)], bags, oversizedBags, {
      stayDays: plan === "daily" ? 1 : 0,
      stayHours: null,
      hourlyBilledAsDay: false,
      segments: [],
    });
  }

  if (compareStamps(pickUp, dropOff) <= 0) return { ok: false, reason: "not-after-dropoff" };
  if (!isPickupValid(plan, dropOff, pickUp)) return { ok: false, reason: "outside-plan" };

  const minutes = (diffDays(dropOff.date, pickUp.date) * 1440) + (minutesOf(pickUp.time) - minutesOf(dropOff.time));
  // Whole days, counted from drop-off: 24 hours is one day, plus the grace.
  const dayGap = diffDays(dropOff.date, pickUp.date);
  const stayDays = Math.max(1, dayGap + (minutesOf(pickUp.time) <= minutesOf(dropOff.time) + GRACE_MINUTES ? 0 : 1));

  if (plan === "hourly" || (plan === "custom" && dayGap === 0)) {
    const h = hourlyPieces(minutes);
    return finish(plan, true, h.pieces, bags, oversizedBags, {
      stayDays: h.billedAsDay ? 1 : 0,
      stayHours: h.hours,
      hourlyBilledAsDay: h.billedAsDay,
      segments: [],
    });
  }

  if (plan === "custom") {
    if (stayDays > MAX_CUSTOM_DAYS) return { ok: false, reason: "too-long" };
    const steps = coverSteps(dropOff.date, stayDays);
    return finish(plan, true, piecesOf(steps), bags, oversizedBags, {
      stayDays,
      stayHours: null,
      hourlyBilledAsDay: false,
      segments: steps.map((st) => ({
        plan: st.plan,
        from: { date: st.from, time: dropOff.time },
        to: { date: st.to, time: dropOff.time },
      })),
    });
  }

  return finish(plan, true, [piece(plan, 1)], bags, oversizedBags, {
    stayDays,
    stayHours: null,
    hourlyBilledAsDay: false,
    segments: [{ plan, from: dropOff, to: periodEnd(plan, dropOff) }],
  });
}

/** "1× Strand + 1× Mini + 2× By the Day", for the English WhatsApp message and Lark record. */
export function describePiecesEn(pieces: QuotePiece[]): string {
  return pieces.map((p) => `${p.count}× ${PLAN_FACTS[p.plan].canonicalName}`).join(" + ");
}
