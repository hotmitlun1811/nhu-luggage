/** Small shared building blocks for /guides/* article bodies — kept separate
 *  from GuideLayout so each guide page composes its own structure instead of
 *  the layout dictating section order. */

import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

/** Editorial photo with mandatory license attribution — every /guides/*
 *  image comes from Wikimedia Commons under a verified reusable license
 *  (CC0/CC-BY/CC-BY-SA), never hotlinked from an arbitrary Google Images
 *  result. `credit`/`license` are always shown, even for CC0 images where
 *  attribution isn't legally required, as good practice and so a future
 *  editor can see at a glance where every image came from and under what
 *  terms — don't drop this caption to "clean up" the layout. */
export function GuideImage({
  src,
  alt,
  width,
  height,
  credit,
  creditUrl,
  license,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  credit: string;
  creditUrl?: string;
  license: string;
}) {
  return (
    <figure className="rounded-2xl overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto object-cover"
        sizes="(min-width: 820px) 820px, 100vw"
      />
      <figcaption className="text-[11.5px] text-[#9CA3AF] mt-2 px-0.5">
        Photo:{" "}
        {creditUrl ? (
          <a href={creditUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#6B7280]">
            {credit}
          </a>
        ) : (
          credit
        )}
        , {license}, via Wikimedia Commons
      </figcaption>
    </figure>
  );
}

export function GuideH2({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="text-[#0D1829] font-bold leading-[1.15] scroll-mt-24"
      style={{ fontFamily: "var(--font-poppins)", fontSize: "24px", letterSpacing: "-0.02em" }}
    >
      {children}
    </h2>
  );
}

export function GuideLead({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[17px] text-[#0D1829] font-medium leading-relaxed"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      {children}
    </p>
  );
}

/** Quick-facts callout — distance/time/price blocks that a reader scans
 *  instead of reading in prose. Matches the "specific facts, not moods"
 *  humanizer rule (Pattern 2). */
export function GuideFacts({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="bg-[#F4F4F0] rounded-2xl px-6 py-6 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-5">
      {items.map((item) => (
        <div key={item.label}>
          <p
            className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF] mb-1"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {item.label}
          </p>
          <p
            className="text-[15px] font-semibold text-[#0D1829]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export function GuideH3({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="text-[#16243F] font-bold leading-[1.2]"
      style={{ fontFamily: "var(--font-poppins)", fontSize: "17px", letterSpacing: "-0.01em" }}
    >
      {children}
    </h3>
  );
}

export function GuideList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8742C] flex-shrink-0 mt-2" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Comparison table — two or more options scored on the same criteria
 *  (bus vs. flight, elevator vs. stairs). Renders as a real <table> for
 *  semantic/AEO value (Google's own docs flag structured, scannable
 *  formatting as one of the five AI-citation pillars), scrolls on mobile
 *  instead of squeezing columns. */
export function GuideTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: { label: string; values: string[] }[];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#E8E8E4]">
      <table className="w-full border-collapse text-[14px]" style={{ fontFamily: "var(--font-inter)" }}>
        <thead>
          <tr className="bg-[#F4F4F0]">
            <th className="text-left px-5 py-3.5 font-bold text-[#0D1829] text-[12px] uppercase tracking-[0.08em]" style={{ fontFamily: "var(--font-poppins)" }}>
              {" "}
            </th>
            {columns.map((col) => (
              <th
                key={col}
                className="text-left px-5 py-3.5 font-bold text-[#0D1829] text-[12px] uppercase tracking-[0.08em]"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={row.label} className={ri < rows.length - 1 ? "border-b border-[#E8E8E4]" : ""}>
              <td className="px-5 py-3.5 font-semibold text-[#374151] whitespace-nowrap">{row.label}</td>
              {row.values.map((v, vi) => (
                <td key={vi} className="px-5 py-3.5 text-[#4B5563]">
                  {v}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Highlighted callout for a single important tip or warning — visually
 *  distinct from body copy so it doesn't get lost in a longer page. */
export function GuideCallout({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#FFF8F4] border border-[#F0D5C0] rounded-2xl px-6 py-5">
      <p
        className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#E8742C] mb-2"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {label}
      </p>
      <p className="text-[14px] text-[#4B5563] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
        {children}
      </p>
    </div>
  );
}

/** Per-guide FAQ block — question-shaped H3s with direct-answer paragraphs
 *  immediately after (same AEO pattern as the homepage FAQ). Pass the same
 *  `items` array to `guideFaqJsonLd` in structured-data.ts so the schema
 *  can never drift from what's visibly on the page. */
export function GuideFAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="flex flex-col">
      {items.map((item, i) => (
        <div key={item.q} className={`py-5 ${i < items.length - 1 ? "border-b border-[#E8E8E4]" : ""}`}>
          <h3
            className="text-[15px] font-bold text-[#0D1829] mb-2"
            style={{ fontFamily: "var(--font-poppins)", letterSpacing: "-0.01em" }}
          >
            {item.q}
          </h3>
          <p className="text-[14.5px] text-[#4B5563] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            {item.a}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Jump-nav table of contents — worth it once a guide has 5+ real
 *  sections; skip it on the shorter guides. `sections` are {id, label}
 *  pairs matching the `id` set on each GuideH2's wrapping element. */
export function GuideTOC({ sections }: { sections: { id: string; label: string }[] }) {
  return (
    <nav className="bg-[#F4F4F0] rounded-2xl px-6 py-5">
      <p
        className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF] mb-3"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        On this page
      </p>
      <ul className="flex flex-col gap-2">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="text-[13.5px] text-[#16243F] font-medium hover:text-[#E8742C] transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Direct-answer "short answer" block for the very top of a guide — the
 *  2-4 sentences an AI answer engine or a featured-snippet box is most
 *  likely to lift verbatim, so it must answer the guide's headline question
 *  outright before the reader scrolls. This is the single biggest AEO lever
 *  the first draft of these guides was missing. Accepts rich children so the
 *  load-bearing facts can be <strong>-ed for scannability. Keep it factual
 *  and self-contained — no "read on below," no CTA. */
export function GuideTLDR({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-[#F4F4F0] border-l-[3px] border-[#E8742C] px-6 py-5">
      <p
        className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#E8742C] mb-2"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        The short answer
      </p>
      <div
        className="text-[15.5px] text-[#0D1829] leading-relaxed [&_strong]:font-semibold"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {children}
      </div>
    </div>
  );
}

/** Visible, numbered sources list — the E-E-A-T / AI-citation signal the
 *  first draft of these guides lacked entirely. Cite primary or
 *  authoritative pages only (government portals, official operators,
 *  reputable publications), and keep the same facts on the page as the
 *  source supports. `note` says what each source backs up so a future
 *  editor (and a reader) can weigh it at a glance. */
export function GuideSources({ items }: { items: { label: string; url: string; note?: string }[] }) {
  return (
    <div className="rounded-2xl border border-[#E8E8E4] px-6 py-6">
      <p
        className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9CA3AF] mb-4"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        Sources
      </p>
      <ol className="flex flex-col gap-3">
        {items.map((item, i) => (
          <li key={item.url} className="flex gap-3 text-[13px] leading-relaxed">
            <span
              className="text-[#E8742C] font-bold flex-shrink-0"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {i + 1}.
            </span>
            <span className="text-[#6B7280]">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#16243F] font-semibold underline decoration-[#D1D5DB] underline-offset-2 hover:text-[#E8742C] hover:decoration-[#E8742C] transition-colors"
              >
                {item.label}
              </a>
              {item.note ? ` — ${item.note}` : null}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** The one on-page luggage-storage moment per guide. Brief calls it "tinh
 *  tế": the COPY stays tactful and contextual (it answers the reader's real
 *  logistics problem — "where does my bag go while I do this?" — instead of
 *  pitching), while the BLOCK is visually loud (dark navy card, orange
 *  accent, real buttons) so it can't be missed. Place it once, at the
 *  natural point in the article where the bag actually becomes a problem —
 *  not stacked at the top, not repeated. `facts` shows the few numbers that
 *  matter for THIS guide (distance, price, hours), pulled from the live
 *  plan facts in src/lib/plans.ts — never invent a price here. */
export function GuideStowCallout({
  eyebrow = "Where your bag goes",
  heading,
  children,
  facts,
}: {
  eyebrow?: string;
  heading: string;
  children: React.ReactNode;
  facts?: { label: string; value: string }[];
}) {
  return (
    <div className="rounded-2xl bg-[#16243F] px-7 py-7 md:px-9 md:py-8">
      <p
        className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#E8742C] mb-2.5"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {eyebrow}
      </p>
      <p
        className="text-white font-bold text-[19px] leading-snug mb-3"
        style={{ fontFamily: "var(--font-poppins)", letterSpacing: "-0.02em" }}
      >
        {heading}
      </p>
      <div
        className="text-white/70 text-[14.5px] leading-relaxed [&_strong]:text-white [&_strong]:font-semibold"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {children}
      </div>

      {facts && facts.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 mt-6 pt-6 border-t border-white/[0.14]">
          {facts.map((f) => (
            <div key={f.label}>
              <p
                className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-white/40 mb-1"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {f.label}
              </p>
              <p className="text-[14px] font-semibold text-white" style={{ fontFamily: "var(--font-inter)" }}>
                {f.value}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-3 mt-6">
        <Link
          href="/#booking"
          className="inline-flex items-center justify-center bg-[#E8742C] text-white text-[13.5px] font-semibold px-5 py-2.5 rounded-xl hover:bg-[#C85E1E] transition-colors"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Book a bag drop
        </Link>
        <a
          href="https://wa.me/84905955161"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border border-white/25 text-white text-[13.5px] font-semibold px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          <MessageCircle size={15} strokeWidth={1.75} />
          WhatsApp us
        </a>
      </div>
    </div>
  );
}
