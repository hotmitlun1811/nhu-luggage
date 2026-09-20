import { describe, expect, it } from "vitest";
import { PLAN_FACTS, generateTimeSlots } from "./plans";
import {
  addDays,
  addMonths,
  cheapestCover,
  compareStamps,
  describePiecesEn,
  diffDays,
  isPickupValid,
  latestPickup,
  pickupSlots,
  quote,
  type PlanChoice,
  type Stamp,
} from "./pricing";

const at = (date: string, time: string): Stamp => ({ date, time });
const SLOTS = generateTimeSlots(); // 07:00 .. 22:00, every 30 minutes (31 slots)

function priced(plan: PlanChoice, dropOff: Stamp, pickUp: Stamp, bags = 1, oversizedBags = 0) {
  const q = quote({ plan, dropOff, pickUp, bags, oversizedBags });
  if (!q.ok) throw new Error(`expected a quote, got ${q.reason}`);
  return q;
}
const cost = (startDate: string, days: number) =>
  cheapestCover(startDate, days).reduce((s, p) => s + p.count * p.unitPrice, 0);

describe("date helpers", () => {
  it("adds calendar months and clamps to the last day of a shorter month", () => {
    expect(addMonths("2026-09-20", 1)).toBe("2026-10-20");
    expect(addMonths("2026-01-31", 1)).toBe("2026-02-28");
    expect(addMonths("2028-01-31", 1)).toBe("2028-02-29"); // leap year
    expect(addMonths("2026-11-30", 3)).toBe("2027-02-28");
    expect(addMonths("2026-09-20", 4)).toBe("2027-01-20");
    expect(addMonths("2026-12-15", 1)).toBe("2027-01-15");
  });
  it("adds and subtracts days across month and year ends", () => {
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
    expect(diffDays("2026-09-20", "2026-11-05")).toBe(46);
    expect(diffDays("2026-11-05", "2026-09-20")).toBe(-46);
  });
});

describe("where a plan lets the customer collect", () => {
  const drop = at("2026-09-20", "09:00");

  it("By the Day: 24 hours from drop-off, plus 60 minutes of grace", () => {
    expect(latestPickup("daily", drop)).toEqual(at("2026-09-21", "10:00"));
    expect(isPickupValid("daily", drop, at("2026-09-21", "09:00"))).toBe(true);
    expect(isPickupValid("daily", drop, at("2026-09-21", "10:00"))).toBe(true);
    expect(isPickupValid("daily", drop, at("2026-09-21", "10:30"))).toBe(false);
  });

  it("nothing can be collected at or before the drop-off moment", () => {
    expect(isPickupValid("daily", drop, at("2026-09-20", "09:00"))).toBe(false);
    expect(isPickupValid("daily", drop, at("2026-09-20", "08:00"))).toBe(false);
    expect(isPickupValid("custom", drop, at("2026-09-20", "09:00"))).toBe(false);
  });

  it("Mini is 7 days, Strand is the same time next month, Long Stay is 4 months", () => {
    expect(latestPickup("mini", drop)).toEqual(at("2026-09-27", "10:00"));
    expect(latestPickup("strand", drop)).toEqual(at("2026-10-20", "10:00"));
    expect(latestPickup("longstay", drop)).toEqual(at("2027-01-20", "10:00"));
  });

  it("a calendar month is 31 days when the month is", () => {
    expect(latestPickup("strand", at("2026-10-20", "09:00"))).toEqual(at("2026-11-20", "10:00"));
  });

  it("a month that starts on the 31st ends on the last day of the next month", () => {
    expect(latestPickup("strand", at("2026-01-31", "21:00"))).toEqual(at("2026-02-28", "22:00"));
  });

  it("By the Hour is same-day, up to closing time", () => {
    expect(latestPickup("hourly", drop)).toEqual(at("2026-09-20", "22:00"));
    expect(isPickupValid("hourly", drop, at("2026-09-21", "07:00"))).toBe(false);
  });

  it("Custom has no limit", () => {
    expect(latestPickup("custom", drop)).toBeNull();
    expect(isPickupValid("custom", drop, at("2027-05-01", "18:00"))).toBe(true);
  });
});

describe("collection time slots", () => {
  it("By the Day: after drop-off today, up to the limit tomorrow", () => {
    expect(pickupSlots("daily", at("2026-09-20", "21:00"), "2026-09-20", SLOTS)).toEqual(["21:30", "22:00"]);
    expect(pickupSlots("daily", at("2026-09-20", "21:00"), "2026-09-21", SLOTS)).toHaveLength(31); // limit 22:00
    expect(pickupSlots("daily", at("2026-09-20", "09:00"), "2026-09-21", SLOTS)).toEqual([
      "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00",
    ]);
    expect(pickupSlots("daily", at("2026-09-20", "09:00"), "2026-09-22", SLOTS)).toEqual([]);
  });
  it("a late drop-off leaves no slot the same day", () => {
    expect(pickupSlots("daily", at("2026-09-20", "22:00"), "2026-09-20", SLOTS)).toEqual([]);
    expect(pickupSlots("daily", at("2026-09-20", "22:00"), "2026-09-21", SLOTS)).toHaveLength(31);
  });
  it("By the Hour: later times the same day only", () => {
    const slots = pickupSlots("hourly", at("2026-09-20", "09:00"), "2026-09-20", SLOTS);
    expect(slots[0]).toBe("09:30");
    expect(slots.at(-1)).toBe("22:00");
    expect(pickupSlots("hourly", at("2026-09-20", "09:00"), "2026-09-21", SLOTS)).toEqual([]);
  });
  it("never offers a date before the drop-off", () => {
    expect(pickupSlots("custom", at("2026-09-20", "09:00"), "2026-09-19", SLOTS)).toEqual([]);
  });
  it("Custom: everything after drop-off on day one, everything later", () => {
    expect(pickupSlots("custom", at("2026-09-20", "09:00"), "2026-09-20", SLOTS)[0]).toBe("09:30");
    expect(pickupSlots("custom", at("2026-09-20", "09:00"), "2027-03-01", SLOTS)).toHaveLength(31);
  });
});

describe("fixed plans", () => {
  const drop = at("2026-09-20", "09:00");
  it("charge their list price anywhere inside the window", () => {
    expect(priced("daily", drop, at("2026-09-21", "09:00")).total).toBe(60_000);
    expect(priced("mini", drop, at("2026-09-22", "12:00")).total).toBe(150_000);
    expect(priced("mini", drop, at("2026-09-27", "10:00")).total).toBe(150_000); // grace end
    expect(priced("strand", drop, at("2026-09-25", "12:00")).total).toBe(300_000); // collected early, same price
    expect(priced("strand", drop, at("2026-10-20", "10:00")).total).toBe(300_000);
    expect(priced("longstay", drop, at("2027-01-20", "09:00")).total).toBe(1_000_000);
  });
  it("refuse a pick-up outside the window", () => {
    expect(quote({ plan: "daily", dropOff: drop, pickUp: at("2026-09-21", "10:30"), bags: 1, oversizedBags: 0 })).toEqual({ ok: false, reason: "outside-plan" });
    expect(quote({ plan: "strand", dropOff: drop, pickUp: at("2026-10-20", "10:30"), bags: 1, oversizedBags: 0 })).toEqual({ ok: false, reason: "outside-plan" });
  });
  it("refuse a pick-up that is not after the drop-off", () => {
    expect(quote({ plan: "mini", dropOff: drop, pickUp: drop, bags: 1, oversizedBags: 0 })).toEqual({ ok: false, reason: "not-after-dropoff" });
  });
  it("show the list price before any date is chosen; Hourly and Custom cannot", () => {
    const q = quote({ plan: "strand", dropOff: null, pickUp: null, bags: 2, oversizedBags: 0 });
    expect(q).toMatchObject({ ok: true, complete: false, total: 600_000 });
    expect(quote({ plan: "hourly", dropOff: null, pickUp: null, bags: 1, oversizedBags: 0 })).toEqual({ ok: false, reason: "incomplete" });
    expect(quote({ plan: "custom", dropOff: drop, pickUp: null, bags: 1, oversizedBags: 0 })).toEqual({ ok: false, reason: "incomplete" });
  });
  it("multiply by the number of bags", () => {
    expect(priced("mini", drop, at("2026-09-22", "12:00"), 3).total).toBe(450_000);
  });
});

describe("By the Hour", () => {
  const drop = at("2026-09-20", "09:00");
  it("charges every started hour", () => {
    expect(priced("hourly", drop, at("2026-09-20", "09:30")).total).toBe(15_000);
    expect(priced("hourly", drop, at("2026-09-20", "10:15")).total).toBe(30_000); // 1h15 = 2 started hours
    expect(priced("hourly", drop, at("2026-09-20", "11:00")).total).toBe(30_000);
  });
  it("4 hours is still hourly (60,000), and past 4 hours it is billed as one day", () => {
    const four = priced("hourly", drop, at("2026-09-20", "13:00"));
    expect(four.total).toBe(60_000);
    expect(four.hourlyBilledAsDay).toBe(false);
    const five = priced("hourly", drop, at("2026-09-20", "13:30"));
    expect(five.total).toBe(60_000);
    expect(five.hourlyBilledAsDay).toBe(true);
    expect(five.stayHours).toBe(5);
    expect(priced("hourly", drop, at("2026-09-20", "22:00")).total).toBe(60_000); // 13 hours never costs more than a day
  });
  it("cannot leave the day", () => {
    expect(quote({ plan: "hourly", dropOff: drop, pickUp: at("2026-09-21", "08:00"), bags: 1, oversizedBags: 0 })).toEqual({ ok: false, reason: "outside-plan" });
  });
});

describe("oversized surcharge differs by lane", () => {
  const drop = at("2026-09-20", "09:00");

  it("Flexible plans add 30,000 per oversized bag", () => {
    expect(priced("daily", drop, at("2026-09-21", "09:00"), 2, 2).total).toBe(60_000 * 2 + 30_000 * 2);
    expect(priced("daily", drop, at("2026-09-21", "09:00"), 2, 1).total).toBe(60_000 * 2 + 30_000);
  });
  it("Flat Rate plans add 50,000 per oversized bag", () => {
    expect(priced("mini", drop, at("2026-09-22", "09:00"), 2, 2).total).toBe(150_000 * 2 + 50_000 * 2);
    expect(priced("strand", drop, at("2026-10-01", "09:00"), 2, 2).total).toBe(700_000);
  });
  it("By the Hour adds 30,000 once, however many hours", () => {
    expect(priced("hourly", drop, at("2026-09-20", "12:00"), 1, 1).total).toBe(45_000 + 30_000);
  });
  it("Custom uses each plan's own lane rate: 8 days = Mini (50,000) + 1 Day (30,000)", () => {
    const q = priced("custom", drop, at("2026-09-28", "09:00"), 2, 2);
    expect(describePiecesEn(q.pieces)).toBe("1× Mini + 1× By the Day");
    expect(q.perBag).toBe(210_000);
    expect(q.surchargePerOversizedBag).toBe(80_000);
    expect(q.total).toBe(210_000 * 2 + 80_000 * 2);
  });
  it("Custom repeats the rate for every period: 2 months = 2 × 50,000 per oversized bag", () => {
    const q = priced("custom", drop, at("2026-11-05", "09:00"), 2, 2);
    expect(q.surchargePerOversizedBag).toBe(100_000);
    expect(q.total).toBe(1_400_000);
  });
  it("cannot exceed the number of bags", () => {
    expect(priced("daily", drop, at("2026-09-21", "09:00"), 1, 5).total).toBe(60_000 + 30_000);
  });
});

describe("Custom: the cheapest mix of plans", () => {
  const drop = at("2026-09-20", "09:00");
  const pieces = (pick: Stamp) => describePiecesEn(priced("custom", drop, pick).pieces);

  it("46 days is two months (600,000), not 1 month + 2 weeks + 2 days (720,000)", () => {
    const q = priced("custom", drop, at("2026-11-05", "09:00"));
    expect(q.stayDays).toBe(46);
    expect(pieces(at("2026-11-05", "09:00"))).toBe("2× Strand");
    expect(q.total).toBe(600_000);
  });
  it("short stays", () => {
    expect(priced("custom", drop, at("2026-09-21", "09:00")).total).toBe(60_000); // 1 day
    expect(priced("custom", drop, at("2026-09-22", "09:00")).total).toBe(120_000); // 2 days
    expect(pieces(at("2026-09-23", "09:00"))).toBe("1× Mini"); // 3 days: a week is cheaper
    expect(priced("custom", drop, at("2026-09-23", "09:00")).total).toBe(150_000);
    expect(priced("custom", drop, at("2026-09-28", "09:00")).total).toBe(210_000); // 8 days
  });
  it("10 to a month is one Strand, on a tie it uses fewer pieces (not 2 Mini)", () => {
    expect(pieces(at("2026-09-30", "09:00"))).toBe("1× Strand"); // 10 days
    expect(priced("custom", drop, at("2026-10-20", "09:00")).total).toBe(300_000); // 30 days
  });
  it("31 days from 20 Sept is a month plus a day; from 20 Oct a calendar month covers it", () => {
    expect(priced("custom", drop, at("2026-10-21", "09:00")).total).toBe(360_000);
    expect(priced("custom", at("2026-10-20", "09:00"), at("2026-11-20", "09:00")).total).toBe(300_000);
  });
  it("uses Long Stay once it is the cheapest", () => {
    expect(describePiecesEn(priced("custom", drop, at("2026-12-21", "09:00")).pieces)).toBe("3× Strand + 1× By the Day"); // 92 days = 960,000
    expect(priced("custom", drop, at("2026-12-21", "09:00")).total).toBe(960_000);
    expect(pieces(at("2026-12-22", "09:00"))).toBe("1× Long Stay"); // 93 days: 3 Strand + 2 Day would be 1,020,000
    expect(priced("custom", drop, at("2026-12-29", "09:00")).total).toBe(1_000_000); // 100 days
  });
  it("counts 24-hour blocks with a 60-minute grace", () => {
    expect(priced("custom", drop, at("2026-09-22", "10:00")).stayDays).toBe(2); // 49 hours
    expect(priced("custom", drop, at("2026-09-22", "10:30")).stayDays).toBe(3); // 49.5 hours
    expect(priced("custom", drop, at("2026-09-21", "08:00")).stayDays).toBe(1);
  });
  it("a same-day stay is priced like By the Hour", () => {
    expect(priced("custom", drop, at("2026-09-20", "12:00")).total).toBe(45_000);
    const long = priced("custom", drop, at("2026-09-20", "16:00"));
    expect(long.total).toBe(60_000);
    expect(long.hourlyBilledAsDay).toBe(true);
  });
  it("collected the next morning is one day", () => {
    expect(priced("custom", at("2026-09-20", "18:00"), at("2026-09-21", "09:00")).total).toBe(60_000);
  });
  it("stays past the limit need a conversation", () => {
    expect(quote({ plan: "custom", dropOff: drop, pickUp: at("2030-01-01", "09:00"), bags: 1, oversizedBags: 0 })).toEqual({ ok: false, reason: "too-long" });
  });
});

describe("cheapest mix: properties that must always hold", () => {
  const starts = ["2026-01-31", "2026-02-28", "2026-09-20", "2026-12-31", "2028-02-29"];

  it("a longer stay never costs less than a shorter one", () => {
    for (const start of starts) {
      let previous = 0;
      for (let n = 1; n <= 400; n++) {
        const c = cost(start, n);
        expect(c, `${start} day ${n}`).toBeGreaterThanOrEqual(previous);
        previous = c;
      }
    }
  });

  it("is never dearer than any simple way of covering the same days", () => {
    for (const start of starts) {
      for (let n = 1; n <= 400; n++) {
        const c = cost(start, n);
        expect(c).toBeLessThanOrEqual(n * PLAN_FACTS.daily.price);
        expect(c).toBeLessThanOrEqual(Math.ceil(n / 7) * PLAN_FACTS.mini.price);
        expect(c).toBeLessThanOrEqual(Math.ceil(n / 28) * PLAN_FACTS.strand.price); // a month is at least 28 days
        expect(c).toBeLessThanOrEqual(Math.ceil(n / 120) * PLAN_FACTS.longstay.price); // 4 months is at least 120 days
      }
    }
  });

  it("matches an independent top-down search of every combination", () => {
    const plans = ["longstay", "strand", "mini", "daily"] as const;
    const end = (p: (typeof plans)[number], d: string) =>
      p === "daily" ? addDays(d, 1) : p === "mini" ? addDays(d, 7) : p === "strand" ? addMonths(d, 1) : addMonths(d, 4);
    for (const start of starts) {
      for (const n of [1, 2, 3, 7, 8, 9, 10, 14, 15, 29, 30, 31, 32, 33, 37, 38, 40, 45, 46, 60, 61, 62, 70, 90, 91, 92, 93, 100, 121, 130, 200]) {
        const memo = new Map<number, number>();
        const best = (offset: number): number => {
          if (offset >= n) return 0;
          const known = memo.get(offset);
          if (known !== undefined) return known;
          let m = Infinity;
          for (const p of plans) m = Math.min(m, PLAN_FACTS[p].price + best(diffDays(start, end(p, addDays(start, offset)))));
          memo.set(offset, m);
          return m;
        };
        expect(cost(start, n), `${start} +${n}`).toBe(best(0));
      }
    }
  });

  it("a stay inside a fixed plan's window never costs more on Custom", () => {
    const drop = at("2026-09-20", "09:00");
    for (const plan of ["daily", "mini", "strand", "longstay"] as const) {
      const latest = latestPickup(plan, drop)!;
      for (const pick of [addMinutes1(drop, 60), latest, at(latest.date, "09:00")]) {
        if (!isPickupValid(plan, drop, pick)) continue;
        expect(priced("custom", drop, pick).total).toBeLessThanOrEqual(priced(plan, drop, pick).total);
      }
    }
  });
});

function addMinutes1(s: Stamp, minutes: number): Stamp {
  const [h, m] = s.time.split(":").map(Number);
  const t = h * 60 + m + minutes;
  return { date: s.date, time: `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}` };
}

describe("billed periods laid out by date (for the receipt)", () => {
  it("Custom, 46 days: two months end to end, both at the drop-off time", () => {
    const q = priced("custom", at("2026-09-20", "09:00"), at("2026-11-05", "09:00"));
    expect(q.segments).toEqual([
      { plan: "strand", from: at("2026-09-20", "09:00"), to: at("2026-10-20", "09:00") },
      { plan: "strand", from: at("2026-10-20", "09:00"), to: at("2026-11-20", "09:00") },
    ]);
  });
  it("Custom, 8 days: the week first, then the extra day", () => {
    const q = priced("custom", at("2026-09-20", "09:00"), at("2026-09-28", "09:00"));
    expect(q.segments.map((x) => [x.plan, x.from.date, x.to.date])).toEqual([
      ["mini", "2026-09-20", "2026-09-27"],
      ["daily", "2026-09-27", "2026-09-28"],
    ]);
  });
  it("a fixed plan is one period from the drop-off to the end of the plan", () => {
    const q = priced("strand", at("2026-09-20", "09:00"), at("2026-10-05", "12:00"));
    expect(q.segments).toEqual([{ plan: "strand", from: at("2026-09-20", "09:00"), to: at("2026-10-20", "09:00") }]);
  });
  it("has no periods for an hourly stay or before the dates are known", () => {
    expect(priced("hourly", at("2026-09-20", "09:00"), at("2026-09-20", "11:00")).segments).toEqual([]);
    const early = quote({ plan: "strand", dropOff: null, pickUp: null, bags: 1, oversizedBags: 0 });
    expect(early.ok && early.segments).toEqual([]);
  });
  it("the periods always add up to the same price and count as the pieces", () => {
    for (const days of [2, 9, 31, 46, 92, 93, 200, 400]) {
      const q = priced("custom", at("2026-09-20", "09:00"), at(addDays("2026-09-20", days), "09:00"));
      const bySegments = q.segments.reduce((sum, seg) => sum + PLAN_FACTS[seg.plan].price, 0);
      expect(bySegments).toBe(q.perBag);
      expect(q.segments.length).toBe(q.pieces.reduce((n, pc) => n + pc.count, 0));
      // Laid end to end: each period starts where the last one stopped.
      q.segments.slice(1).forEach((seg, i) => expect(seg.from).toEqual(q.segments[i].to));
    }
  });
});

describe("compareStamps", () => {
  it("orders by date, then time", () => {
    expect(compareStamps(at("2026-09-20", "09:00"), at("2026-09-20", "09:30"))).toBeLessThan(0);
    expect(compareStamps(at("2026-09-21", "07:00"), at("2026-09-20", "22:00"))).toBeGreaterThan(0);
    expect(compareStamps(at("2026-09-20", "09:00"), at("2026-09-20", "09:00"))).toBe(0);
  });
});
