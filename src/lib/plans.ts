/**
 * Canonical storage-plan facts — the single source of truth for price,
 * lane, surcharge, and duration limits. Previously duplicated (with
 * drifting values) across `HeroBookingForm.tsx` and `IntakeForm.tsx` —
 * the same class of bug that shipped wrong prices in the site's JSON-LD
 * for a day (see feedback-verify-pricing-against-live-code.md). Both
 * forms now import from here instead of defining their own copy.
 *
 * Facts only — no display copy. `name`/`duration` strings shown to
 * customers are locale-dependent (Phase 1+ of the i18n build) and live
 * in the content dictionaries, not here. `canonicalName` is the one
 * exception: a stable English identifier for anything crossing a
 * network boundary — the Lark booking payload and the staff-read
 * WhatsApp business message must never carry a translated plan name,
 * or the ops table fills with mixed-language values depending on which
 * locale a customer happened to book from.
 */

export type Lane = "flexible" | "flatrate";
export type PlanKey = "hourly" | "daily" | "mini" | "strand" | "longstay";

export type PlanFacts = {
  /** Stable English name/duration — Lark payloads and WhatsApp messages
   *  only. Never shown to customers directly; UI uses the locale
   *  dictionary's display name/duration instead. */
  canonicalName: string;
  canonicalDuration: string;
  price: number;
  unit: "/ hr" | "/ day" | "flat";
  lane: Lane;
  oversizeSurcharge: number;
  /**
   * How many times the surcharge rate is charged for one booking of this
   * plan (owner rule: one oversized bag costs one surcharge per month it is
   * stored). 1 for every plan whose own period is a single month or shorter
   * (Strand's month, Mini's week, a day, an hour). Long Stay bundles 4
   * months into one flat, discounted price, but the surcharge is not
   * discounted with it: it is still charged as 4 separate months. Omitted
   * (meaning 1) for plans where the period and the surcharge always match.
   */
  surchargePeriods?: number;
  maxDays?: number;
  popular?: boolean;
};

export const PLAN_FACTS: Record<PlanKey, PlanFacts> = {
  hourly:   { canonicalName: "By the Hour", canonicalDuration: "Min 1 hr",       price: 15000,   unit: "/ hr",  lane: "flexible", oversizeSurcharge: 30000 },
  daily:    { canonicalName: "By the Day",  canonicalDuration: "Up to 24 hrs",   price: 60000,   unit: "/ day", lane: "flexible", oversizeSurcharge: 30000, popular: true },
  mini:     { canonicalName: "Mini",        canonicalDuration: "Up to 1 week",   price: 150000,  unit: "flat",  lane: "flatrate", oversizeSurcharge: 50000, maxDays: 7 },
  strand:   { canonicalName: "Strand",      canonicalDuration: "Up to 1 month",  price: 300000,  unit: "flat",  lane: "flatrate", oversizeSurcharge: 50000, maxDays: 30, popular: true },
  longstay: { canonicalName: "Long Stay",   canonicalDuration: "Up to 4 months", price: 1000000, unit: "flat",  lane: "flatrate", oversizeSurcharge: 50000, maxDays: 120, surchargePeriods: 4 },
};

/**
 * How many times `plan`'s surcharge rate is charged for `count` pieces of it:
 * By the Hour is charged once however many hours (owner rule, 2026-09-19);
 * every other plan is charged once per month it covers, so N pieces of Long
 * Stay (4 months each) count as 4N, not N. The one place this is computed, so
 * the price, the receipt and the Lark/WhatsApp price breakdown never disagree.
 */
export function surchargeUnits(plan: PlanKey, count: number): number {
  return plan === "hourly" ? 1 : count * (PLAN_FACTS[plan].surchargePeriods ?? 1);
}

export const FLEX_PLANS: PlanKey[] = ["hourly", "daily"];
export const FLAT_PLANS: PlanKey[] = ["mini", "strand", "longstay"];

/**
 * Past this many hours, an hourly booking is billed at the daily rate
 * instead of hours × the hourly rate (owner's rule, 2026-08-15).
 *
 * The number isn't arbitrary: 4 × 15,000₫ is exactly the 60,000₫ daily
 * price, so this is the break-even point rather than a discount — beyond
 * it, charging per hour would cost the customer more than the cheaper
 * plan sitting right next to it in the form.
 */
export const HOURLY_BILLS_AS_DAY_AFTER_HOURS = 4;

/** Vietnamese-dong formatting — locale-invariant regardless of page language, since the currency itself doesn't change. */
export function vnd(n: number): string {
  return n.toLocaleString("vi-VN") + " ₫";
}

/** 7:00–22:00 in 30-minute slots — identical in both forms, previously two copies of the same loop. */
export function generateTimeSlots(): string[] {
  const s: string[] = [];
  for (let h = 7; h <= 21; h++) {
    s.push(`${String(h).padStart(2, "0")}:00`);
    s.push(`${String(h).padStart(2, "0")}:30`);
  }
  s.push("22:00");
  return s;
}
