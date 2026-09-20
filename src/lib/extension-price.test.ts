import { describe, expect, it } from "vitest";
import { addDays, quote } from "./pricing";
import { extensionPrice, oversizedNeedsAnswer, oversizedRange, resolveOversized, type ExtensionFacts } from "./extension-price";

const planEnd = { date: "2026-10-16", time: "15:30" };
const plain: ExtensionFacts = { planEnd, bags: 2, oversizedBags: 0 };

const priced = (facts: ExtensionFacts, req: Parameters<typeof extensionPrice>[1]) => {
  const p = extensionPrice(facts, req);
  if (p.kind !== "priced") throw new Error(`expected a price, got ${p.kind}`);
  return p;
};

describe("oversizedRange", () => {
  it("is 0 when the booking has no oversized bags, however many are extended", () => {
    expect(oversizedRange({ bags: 3, oversizedBags: 0 }, 2)).toEqual({ min: 0, max: 0 });
    expect(oversizedRange({ bags: null, oversizedBags: 0 }, 5)).toEqual({ min: 0, max: 0 });
  });
  it("is exact when every bag is extended", () => {
    expect(oversizedRange({ bags: 3, oversizedBags: 1 }, 3)).toEqual({ min: 1, max: 1 });
  });
  it("is exact when every bag is oversized", () => {
    expect(oversizedRange({ bags: 3, oversizedBags: 3 }, 2)).toEqual({ min: 2, max: 2 });
  });
  it("leaves a choice when only some bags are extended and the booking mixes both kinds", () => {
    expect(oversizedRange({ bags: 3, oversizedBags: 1 }, 2)).toEqual({ min: 0, max: 1 });
    expect(oversizedRange({ bags: 2, oversizedBags: 1 }, 1)).toEqual({ min: 0, max: 1 });
    expect(oversizedRange({ bags: 4, oversizedBags: 3 }, 2)).toEqual({ min: 1, max: 2 });
  });
  it("forces the oversized bags in once the normal ones run out", () => {
    // 4 bags, 3 oversized: extending 4 means all 3 oversized; extending 3 means at least 2.
    expect(oversizedRange({ bags: 4, oversizedBags: 3 }, 3)).toEqual({ min: 2, max: 3 });
    expect(oversizedRange({ bags: 4, oversizedBags: 3 }, 4)).toEqual({ min: 3, max: 3 });
  });
  it("is unknown when the booking never recorded its oversized bags, or the numbers cannot be true", () => {
    expect(oversizedRange({ bags: 3, oversizedBags: null }, 2)).toBeNull();
    expect(oversizedRange({ bags: null, oversizedBags: 2 }, 1)).toBeNull();
    expect(oversizedRange({ bags: 2, oversizedBags: 3 }, 1)).toBeNull(); // more oversized than bags
    expect(oversizedRange({ bags: 2, oversizedBags: 1 }, 3)).toBeNull(); // more extended than the booking has
    expect(oversizedRange({ bags: 2, oversizedBags: 1 }, 1.5)).toBeNull();
  });
  it("says when the customer has to answer", () => {
    expect(oversizedNeedsAnswer({ min: 0, max: 1 })).toBe(true);
    expect(oversizedNeedsAnswer({ min: 1, max: 1 })).toBe(false);
    expect(oversizedNeedsAnswer(null)).toBe(false);
  });
});

describe("resolveOversized", () => {
  const mixed = { bags: 3, oversizedBags: 1 };
  it("takes the only possible number without being told", () => {
    expect(resolveOversized(mixed, 3)).toBe(1);
    expect(resolveOversized({ bags: 3, oversizedBags: 0 }, 2)).toBe(0);
  });
  it("takes the customer's answer when it is a possible one", () => {
    expect(resolveOversized(mixed, 2, 0)).toBe(0);
    expect(resolveOversized(mixed, 2, 1)).toBe(1);
  });
  it("gives nothing when an answer is needed and is missing or impossible", () => {
    expect(resolveOversized(mixed, 2)).toBeNull();
    expect(resolveOversized(mixed, 2, 2)).toBeNull();
    expect(resolveOversized(mixed, 2, -1)).toBeNull();
    expect(resolveOversized(mixed, 2, 0.5)).toBeNull();
  });
  it("ignores an answer that is not needed", () => {
    expect(resolveOversized(mixed, 3, 0)).toBe(1);
  });
});

describe("extensionPrice", () => {
  it("costs nothing on or before the day the plan ends: it is already paid for", () => {
    expect(extensionPrice(plain, { bags: 2, newPickupDate: "2026-10-16" })).toEqual({ kind: "included", planEnd });
    expect(extensionPrice(plain, { bags: 2, newPickupDate: "2026-10-15" })).toEqual({ kind: "included", planEnd });
  });

  it("charges the cheapest mix of plans for the extra days, per bag, from the plan end", () => {
    // per bag: 1 day 60k, 2 days 120k, 3 days: a Mini (150k) beats three days (180k), 4 to 7 days: Mini 150k,
    // 8 days: Mini + 1 day 210k (the Strand is 300k)
    const perBag: Record<string, number> = { "2026-10-17": 60000, "2026-10-18": 120000, "2026-10-19": 150000, "2026-10-20": 150000, "2026-10-23": 150000, "2026-10-24": 210000 };
    for (const [date, price] of Object.entries(perBag)) {
      expect(priced(plain, { bags: 2, newPickupDate: date }).total).toBe(price * 2);
    }
  });

  it("counts the extra days from the plan end, and describes the stretch it prices", () => {
    const p = priced(plain, { bags: 2, newPickupDate: "2026-10-20" });
    expect(p.extraDays).toBe(4);
    expect(p.from).toEqual({ date: "2026-10-16", time: "15:30" });
    expect(p.to).toEqual({ date: "2026-10-20", time: "15:30" }); // by the plan end's time of day
    expect(p.quote.stayDays).toBe(4); // exactly the days asked, not one more
    expect(p.quote.pieces.map((x) => `${x.count}x${x.plan}`)).toEqual(["1xmini"]);
  });

  it("charges only the bags that are extended", () => {
    expect(priced(plain, { bags: 1, newPickupDate: "2026-10-20" }).total).toBe(150000);
    expect(priced({ ...plain, bags: 5 }, { bags: 5, newPickupDate: "2026-10-20" }).total).toBe(750000);
  });

  it("adds the oversized surcharge of the plan the price came from, per oversized bag", () => {
    const facts = { planEnd, bags: 2, oversizedBags: 1 };
    // 4 days = a Mini per bag (150k, surcharge 50k): 2 x 150k + 1 x 50k
    expect(priced(facts, { bags: 2, newPickupDate: "2026-10-20" }).total).toBe(350000);
    // 1 day = By the Day (60k, surcharge 30k): 2 x 60k + 1 x 30k
    expect(priced(facts, { bags: 2, newPickupDate: "2026-10-17" }).total).toBe(150000);
  });

  it("asks which of some extended bags are oversized, and prices the answer", () => {
    const facts = { planEnd, bags: 2, oversizedBags: 1 };
    expect(extensionPrice(facts, { bags: 1, newPickupDate: "2026-10-20" })).toEqual({ kind: "unknown" }); // not answered yet
    expect(priced(facts, { bags: 1, newPickupDate: "2026-10-20", oversizedBags: 0 }).total).toBe(150000);
    expect(priced(facts, { bags: 1, newPickupDate: "2026-10-20", oversizedBags: 1 }).total).toBe(200000);
    expect(extensionPrice(facts, { bags: 1, newPickupDate: "2026-10-20", oversizedBags: 2 })).toEqual({ kind: "unknown" });
  });

  it("is unknown, never a guess, when the booking has no plan end or no oversized count", () => {
    expect(extensionPrice({ ...plain, planEnd: null }, { bags: 1, newPickupDate: "2026-10-20" })).toEqual({ kind: "unknown" });
    expect(extensionPrice({ ...plain, oversizedBags: null }, { bags: 1, newPickupDate: "2026-10-20" })).toEqual({ kind: "unknown" });
    expect(extensionPrice({ ...plain, bags: null, oversizedBags: 2 }, { bags: 1, newPickupDate: "2026-10-20" })).toEqual({ kind: "unknown" });
  });

  it("prices a booking that never recorded its bag count when it has no oversized bags", () => {
    expect(priced({ planEnd, bags: null, oversizedBags: 0 }, { bags: 3, newPickupDate: "2026-10-20" }).total).toBe(450000);
  });

  it("is the booking form's own price: the same engine, the same Custom rules", () => {
    const facts = { planEnd, bags: 4, oversizedBags: 2 };
    for (let days = 1; days <= 130; days++) {
      const date = addDays(planEnd.date, days);
      for (const bags of [1, 2, 4]) {
        const oversizedBags = bags === 4 ? 2 : 0;
        const ours = priced({ ...facts, oversizedBags: bags === 4 ? 2 : 0 }, { bags, newPickupDate: date, oversizedBags });
        const form = quote({ plan: "custom", dropOff: planEnd, pickUp: { date, time: planEnd.time }, bags, oversizedBags });
        expect(form.ok && ours.total === form.total, `${days} days, ${bags} bags`).toBe(true);
      }
    }
  });

  it("never costs less for a longer extension", () => {
    let last = 0;
    for (let days = 1; days <= 200; days++) {
      const total = priced(plain, { bags: 2, newPickupDate: addDays(planEnd.date, days) }).total;
      expect(total).toBeGreaterThanOrEqual(last);
      last = total;
    }
  });

  it("is unknown for an extension longer than the engine will quote", () => {
    expect(extensionPrice(plain, { bags: 2, newPickupDate: addDays(planEnd.date, 1096) })).toEqual({ kind: "unknown" });
  });

  it("works when the plan end has no recorded time", () => {
    const p = priced({ planEnd: { date: "2026-10-16", time: "00:00" }, bags: 1, oversizedBags: 0 }, { bags: 1, newPickupDate: "2026-10-18" });
    expect(p.extraDays).toBe(2);
    expect(p.total).toBe(120000);
  });
});
