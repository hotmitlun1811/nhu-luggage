import { HOURLY_BILLS_AS_DAY_AFTER_HOURS, PLAN_FACTS, surchargeUnits, vnd, type PlanKey } from "@/lib/plans";
import { GRACE_MINUTES, compareStamps, type Quote, type Stamp } from "@/lib/pricing";
import {
  fillTemplate,
  formatDateWithYear,
  formatLongDate,
  formatShortDate,
  pluralizeWord,
  type AppLocale,
} from "@/lib/format";
import type { Dictionary } from "@/content/types";

type Priced = Extract<Quote, { ok: true }>;

/**
 * The small print under the total: every step of the price, so a customer can
 * check the number instead of taking it on trust. It reads the same quote the
 * total does (src/lib/pricing.ts), so the lines always add up to the amount
 * shown. Three parts: the storage price per bag, the oversized surcharge per
 * oversized bag (each plan's own lane rate), then the rules behind them.
 */
export default function PriceBreakdown({
  dict,
  locale,
  quote,
  bags,
  oversizedBags,
  pickUp,
}: {
  dict: Dictionary["booking"];
  locale: AppLocale;
  /** null until the dates make a price possible. */
  quote: Priced | null;
  bags: number;
  oversizedBags: number;
  pickUp: Stamp | null;
}) {
  const shell = "flex flex-col gap-[10px] rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-[11px] leading-snug";
  const title = (
    <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/40" style={{ fontFamily: "var(--font-poppins)" }}>
      {dict.receiptTitle}
    </p>
  );

  if (!quote || !quote.complete) {
    return (
      <div className={shell} style={{ fontFamily: "var(--font-inter)" }}>
        {title}
        <p className="text-white/40">{dict.receiptEmpty}</p>
      </div>
    );
  }

  const name = (pk: PlanKey) => dict.planNames[pk];
  // "1 month", "4 months": how long one period of the plan runs.
  const period = (pk: PlanKey) =>
    pk === "daily" ? `1 ${dict.dayUnit.singular}`
    : pk === "mini" ? `1 ${dict.weekUnit.singular}`
    : pk === "strand" ? `1 ${dict.monthUnit.singular}`
    : `4 ${dict.monthUnit.plural}`;

  // A span that crosses into another year names the year; otherwise it is noise.
  const span = (from: Stamp, to: Stamp) => {
    const year = from.date.slice(0, 4) !== to.date.slice(0, 4);
    const day = (iso: string) => (year ? formatDateWithYear(iso, locale) : formatShortDate(iso, locale));
    return `${day(from.date)}, ${from.time} → ${day(to.date)}, ${to.time}`;
  };

  const hourly = quote.stayHours !== null;

  // ── Storage: one line per billed period, per bag ──
  type Item = { label: string; sub?: string; value: number };
  const storage: Item[] = hourly
    ? quote.hourlyBilledAsDay
      ? [{
          label: `${name("daily")} · 1 ${dict.dayUnit.singular}`,
          sub: fillTemplate(dict.receiptCapped, { hours: HOURLY_BILLS_AS_DAY_AFTER_HOURS }),
          value: PLAN_FACTS.daily.price,
        }]
      : [{
          label: `${name("hourly")} · ${quote.stayHours} ${pluralizeWord(quote.stayHours as number, dict.hourUnit)}`,
          sub: `${quote.stayHours} × ${vnd(PLAN_FACTS.hourly.price)}`,
          value: (quote.stayHours as number) * PLAN_FACTS.hourly.price,
        }]
    : quote.segments.map((seg) => ({
        label: `${name(seg.plan)} · ${period(seg.plan)}`,
        sub: span(seg.from, seg.to),
        value: PLAN_FACTS[seg.plan].price,
      }));

  // ── Oversized: one line per plan in the price, at that plan's own lane rate ──
  // The label's multiplier is surchargeUnits, not the piece count: a single
  // Long Stay piece is charged as 4 (one per month it bundles), so the label
  // must say "4 ×", not "1 ×", or it would not add up to `value`.
  const surcharge: Item[] = quote.pieces.map((p) => {
    const rate = PLAN_FACTS[p.plan].oversizeSurcharge;
    return p.plan === "hourly"
      ? { label: `${name(p.plan)}: ${vnd(rate)}`, sub: dict.receiptOnce, value: p.surcharge }
      : { label: `${name(p.plan)}: ${surchargeUnits(p.plan, p.count)} × ${vnd(rate)}`, value: p.surcharge };
  });

  const hasOversized = oversizedBags > 0;
  const storageTotal = quote.perBag * bags;
  const surchargeTotal = hasOversized ? quote.surchargePerOversizedBag * oversizedBags : 0;

  // ── The rules behind the numbers ──
  const notes: string[] = [];
  if (quote.plan === "custom") {
    notes.push(dict.receiptNoteCustom);
    // The cheapest mix beats simply paying by the day; say by how much.
    const dailyOnly = PLAN_FACTS.daily.price * quote.stayDays;
    if (!hourly && quote.perBag < dailyOnly) {
      notes.push(fillTemplate(dict.receiptNoteCompare, { days: quote.stayDays, price: vnd(dailyOnly) }));
    }
    // The last period may run past the pick-up, and it is paid in full.
    const last = quote.segments[quote.segments.length - 1];
    if (last && last.plan !== "daily" && pickUp && compareStamps(last.to, pickUp) > 0) {
      notes.push(fillTemplate(dict.receiptNoteLastPeriod, { date: formatLongDate(last.to.date, locale) }));
    }
  }
  if (quote.plan === "mini" || quote.plan === "strand" || quote.plan === "longstay") notes.push(dict.receiptNoteFlat);
  notes.push(
    hourly
      ? fillTemplate(dict.receiptNoteHourly, { price: vnd(PLAN_FACTS.hourly.price), hours: HOURLY_BILLS_AS_DAY_AFTER_HOURS })
      : fillTemplate(dict.receiptNoteDays, { minutes: GRACE_MINUTES })
  );

  const row = (item: Item, key: string) => (
    <div key={key} className="flex items-baseline justify-between gap-3">
      <dt className="min-w-0 text-white/60">
        {item.label}
        {item.sub && <span className="block text-[10.5px] text-white/35">{item.sub}</span>}
      </dt>
      <dd className="flex-shrink-0 tabular-nums text-white/70">{vnd(item.value)}</dd>
    </div>
  );
  // A sum line: set off by a hairline, a touch brighter than the lines above it.
  const sum = (label: string, value: number, key: string) => (
    <div key={key} className="mt-[2px] flex items-baseline justify-between gap-3 border-t border-white/[0.08] pt-[3px]">
      <dt className="min-w-0 font-semibold text-white/75">{label}</dt>
      <dd className="flex-shrink-0 tabular-nums font-semibold text-white/85">{vnd(value)}</dd>
    </div>
  );
  const heading = (text: string) => (
    <p className="mb-[3px] text-[10.5px] font-semibold text-white/45">{text}</p>
  );

  const bagsWord = (n: number) => `${n} ${pluralizeWord(n, dict.bagUnit)}`;
  const overWord = (n: number) => `${n} ${pluralizeWord(n, dict.receiptOversizedBagUnit)}`;

  return (
    <div className={shell} style={{ fontFamily: "var(--font-inter)" }}>
      {title}

      <section>
        {heading(dict.receiptStorage)}
        <dl className="flex flex-col gap-[3px]">
          {storage.map((item, i) => row(item, `s${i}`))}
          {storage.length > 1 && sum(dict.receiptPerBag, quote.perBag, "s-bag")}
          {bags > 1 && sum(`${bagsWord(bags)} × ${vnd(quote.perBag)}`, storageTotal, "s-bags")}
        </dl>
      </section>

      {hasOversized && (
        <section>
          {heading(dict.receiptOversized)}
          <dl className="flex flex-col gap-[3px]">
            {surcharge.map((item, i) => row(item, `o${i}`))}
            {surcharge.length > 1 && sum(dict.receiptPerOversizedBag, quote.surchargePerOversizedBag, "o-bag")}
            {oversizedBags > 1 &&
              sum(`${overWord(oversizedBags)} × ${vnd(quote.surchargePerOversizedBag)}`, surchargeTotal, "o-bags")}
          </dl>
        </section>
      )}

      {/* Both parts are on screen, so show them adding up to the total. */}
      {hasOversized && (
        <dl>
          <div className="flex items-baseline justify-between gap-3 border-t border-white/[0.12] pt-[6px]">
            <dt className="min-w-0 font-semibold text-white/80">
              {dict.receiptTotal}
              <span className="block text-[10.5px] font-normal text-white/35">
                {vnd(storageTotal)} + {vnd(surchargeTotal)}
              </span>
            </dt>
            <dd className="flex-shrink-0 tabular-nums font-semibold text-[#E8742C]">{vnd(quote.total)}</dd>
          </div>
        </dl>
      )}

      <ul className="flex flex-col gap-[4px] border-t border-white/[0.08] pt-[8px] text-[10.5px] text-white/40">
        {notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </div>
  );
}
