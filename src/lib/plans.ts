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
  /** Stable English name — Lark payloads and WhatsApp messages only. Never shown to customers directly; UI uses the locale dictionary's display name instead. */
  canonicalName: string;
  price: number;
  unit: "/ hr" | "/ day" | "flat";
  lane: Lane;
  oversizeSurcharge: number;
  maxDays?: number;
  popular?: boolean;
};

export const PLAN_FACTS: Record<PlanKey, PlanFacts> = {
  hourly:   { canonicalName: "By the Hour", price: 15000,   unit: "/ hr",  lane: "flexible", oversizeSurcharge: 30000 },
  daily:    { canonicalName: "By the Day",  price: 60000,   unit: "/ day", lane: "flexible", oversizeSurcharge: 30000, popular: true },
  mini:     { canonicalName: "Mini",        price: 150000,  unit: "flat",  lane: "flatrate", oversizeSurcharge: 50000, maxDays: 7 },
  strand:   { canonicalName: "Strand",      price: 300000,  unit: "flat",  lane: "flatrate", oversizeSurcharge: 50000, maxDays: 30, popular: true },
  longstay: { canonicalName: "Long Stay",   price: 1000000, unit: "flat",  lane: "flatrate", oversizeSurcharge: 50000, maxDays: 120 },
};

export const FLEX_PLANS: PlanKey[] = ["hourly", "daily"];
export const FLAT_PLANS: PlanKey[] = ["mini", "strand", "longstay"];

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
