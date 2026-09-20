/**
 * What an extension costs, worked out with the SAME price engine as the booking
 * form (src/lib/pricing.ts), so the number can never disagree with it.
 *
 * The customer already paid for a plan that ends at the booking's Plan End.
 * An extension is charged like a Custom stay for the extra days: the cheapest
 * mix of the plans that covers them, per bag, counted from the day the paid plan
 * ends (the same "never pay more than the best mix" rule the booking form uses):
 *
 *  - A new pick-up date on or before the plan end is already paid for: 0.
 *  - Otherwise the extra days run from the plan end to the new date, at the
 *    plan end's time of day. A day is 24 hours from then, plus 60 minutes of
 *    grace, so the price is for pick-up by that time on the new date. The form
 *    only asks for a date, so it says so next to the price.
 *
 * Only some bags may be extended, and the oversized surcharge is per oversized
 * bag. If the booking has both oversized and normal bags, which of the extended
 * bags are oversized is not known: `oversizedRange` says what is possible, and
 * the form asks only when more than one answer is possible.
 *
 * Nothing is guessed. When the booking never recorded its plan end or its bag
 * counts the price is "unknown" and staff quote it, as before.
 */
import { diffDays, quote, type Quote, type Stamp } from "./pricing";

export type ExtensionPriced = Extract<Quote, { ok: true }>;

/** The parts of a booking the price needs. A BookingRow fits. */
export type ExtensionFacts = {
  planEnd: Stamp | null;
  bags: number | null;
  oversizedBags: number | null;
};

/** How many of `extend` bags can be oversized, given the booking's bags. null when that cannot be told. */
export function oversizedRange(f: Pick<ExtensionFacts, "bags" | "oversizedBags">, extend: number): { min: number; max: number } | null {
  const { bags, oversizedBags } = f;
  if (!Number.isInteger(extend) || extend < 0) return null;
  if (oversizedBags == null || oversizedBags < 0) return null;
  // No oversized bags on the booking: none among these, whatever the total.
  if (oversizedBags === 0) return { min: 0, max: 0 };
  if (bags == null || oversizedBags > bags || extend > bags) return null;
  // The normal bags are used up first; only the rest must be oversized.
  const normal = bags - oversizedBags;
  return { min: Math.max(0, extend - normal), max: Math.min(extend, oversizedBags) };
}

/** More than one answer is possible, so the customer has to say. */
export const oversizedNeedsAnswer = (r: { min: number; max: number } | null): boolean => !!r && r.min < r.max;

/**
 * The number of oversized bags to price: the only possible one, or the
 * customer's answer when it is a possible one. null when it is unknown, or when
 * an answer is needed and missing or impossible.
 */
export function resolveOversized(f: Pick<ExtensionFacts, "bags" | "oversizedBags">, extend: number, chosen?: number): number | null {
  const r = oversizedRange(f, extend);
  if (!r) return null;
  if (r.min === r.max) return r.min;
  return chosen !== undefined && Number.isInteger(chosen) && chosen >= r.min && chosen <= r.max ? chosen : null;
}

export type ExtensionPrice =
  /** Cannot be worked out (no plan end or bag counts on the booking, or too long). Staff quote it. */
  | { kind: "unknown" }
  /** The new date is inside the plan already paid for. */
  | { kind: "included"; planEnd: Stamp }
  | {
      kind: "priced";
      /** The extra time: from the plan end to the new date, at the plan end's time of day. */
      from: Stamp;
      to: Stamp;
      extraDays: number;
      bags: number;
      oversizedBags: number;
      quote: ExtensionPriced;
      total: number;
    };

export function extensionPrice(f: ExtensionFacts, req: { bags: number; newPickupDate: string; oversizedBags?: number }): ExtensionPrice {
  const oversized = resolveOversized(f, req.bags, req.oversizedBags);
  if (!f.planEnd || oversized === null) return { kind: "unknown" };
  if (req.newPickupDate <= f.planEnd.date) return { kind: "included", planEnd: f.planEnd };

  const from = f.planEnd;
  const to: Stamp = { date: req.newPickupDate, time: from.time };
  // Custom, the same as the booking form: the cheapest mix of plans that covers the extra days.
  const q = quote({ plan: "custom", dropOff: from, pickUp: to, bags: req.bags, oversizedBags: oversized });
  if (!q.ok) return { kind: "unknown" };
  return { kind: "priced", from, to, extraDays: diffDays(from.date, to.date), bags: req.bags, oversizedBags: oversized, quote: q, total: q.total };
}
