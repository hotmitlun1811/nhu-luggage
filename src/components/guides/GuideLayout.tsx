import Link from "next/link";
import { ChevronDown } from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import PrimaryNav from "@/components/layout/PrimaryNav";
import Footer from "@/components/layout/Footer";
import ReadingProgress from "@/components/guides/ReadingProgress";
import HeroBookingForm from "@/components/booking/HeroBookingForm";
import type { Dictionary } from "@/content/types";

type TocItem = { id: string; label: string };

/**
 * Shared shell for the /guides/* pages. Dark header, white body, CTA footer —
 * the same visual family as trust-safety/page.tsx.
 *
 * Reading layout (2026-09-15 redesign): on desktop the table of contents is a
 * sticky sidebar (matching the legal pages' approved pattern — inline
 * `top: 88px`, since `sticky top-24` resolves to 24px under this project's
 * custom spacing scale and would hide behind the 72px nav). On mobile it
 * collapses into a `<details>` at the top of the article. Sections carry
 * `scroll-mt-[88px]` so anchor jumps clear the fixed nav. Pass the section list
 * once via the `toc` prop; do not also render <GuideTOC> in the children.
 *
 * English-only for now, same scope as the legal pages.
 */
export default function GuideLayout({
  dict,
  currentPath,
  eyebrow,
  title,
  subhead,
  readingTime,
  toc,
  children,
  related,
}: {
  dict: Dictionary;
  currentPath: string;
  eyebrow: string;
  title: string;
  subhead: string;
  readingTime?: string;
  toc?: TocItem[];
  children: React.ReactNode;
  related?: { title: string; href: string; blurb: string }[];
}) {
  const hasToc = toc && toc.length > 0;

  return (
    <main>
      <PrimaryNav dict={dict.nav} locale="en" currentPath={currentPath} />
      <ReadingProgress />

      {/* Nav clearance + announcement + header as one navy block, so the
          transparent fixed nav stays legible over navy and nothing hides
          beneath it (the fixed nav overlays the top 72px). */}
      <div className="bg-[#16243F] pt-[72px]">
        <AnnouncementBar dict={dict.announcement} />
        <div className="max-w-[1120px] mx-auto px-6 pt-[28px] pb-[56px] lg:pt-[44px] lg:pb-[72px]">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E8742C] mb-3"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {eyebrow}
          </p>
          <h1
            className="text-white font-bold leading-[1.08] mb-5 max-w-[820px]"
            style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(28px, 4vw, 46px)", letterSpacing: "-0.03em" }}
          >
            {title}
          </h1>
          <p className="text-white/55 text-[15px] max-w-[600px] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
            {subhead}
          </p>
          <div
            className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-6 text-[12.5px] text-white/40"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span>By the Stow team</span>
            {readingTime ? (
              <>
                <span aria-hidden="true">·</span>
                <span>{readingTime}</span>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="bg-white">
        <div className="max-w-[1120px] mx-auto px-6 py-[40px] lg:py-[72px]">
          <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-[56px]">
            {/* Desktop sticky TOC */}
            {hasToc && (
              <aside className="hidden lg:block">
                <nav style={{ position: "sticky", top: "88px" }}>
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9CA3AF] mb-4"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    On this page
                  </p>
                  <ul className="flex flex-col gap-[11px] border-l border-[#E8E8E4] pl-[18px]">
                    {toc!.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="text-[13px] leading-snug text-[#4B5563] hover:text-[#E8742C] transition-colors block"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
            )}

            {/* Article column */}
            <div className="lg:max-w-[760px] min-w-0">
              {/* Mobile collapsible TOC */}
              {hasToc && (
                <details className="lg:hidden group bg-[#F4F4F0] rounded-2xl mb-[32px]">
                  <summary
                    className="flex items-center justify-between cursor-pointer list-none [&::-webkit-details-marker]:hidden px-6 py-[14px] text-[13px] font-bold text-[#16243F]"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    On this page
                    <ChevronDown size={16} strokeWidth={2} className="text-[#9CA3AF] transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="flex flex-col gap-3 px-6 pb-5 pt-1">
                    {toc!.map((s) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="text-[14px] text-[#4B5563] hover:text-[#E8742C] transition-colors"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              )}

              <article
                className="flex flex-col gap-10 text-[15.5px] text-[#374151] leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {children}
              </article>

              {related && related.length > 0 && (
                <div className="mt-[56px] pt-[40px] border-t border-[#E8E8E4]">
                  <p
                    className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#9CA3AF] mb-6"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    Also useful
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {related.map((r) => (
                      <Link
                        key={r.href}
                        href={r.href}
                        className="block rounded-xl border border-[#E8E8E4] p-5 hover:border-[#E8742C] hover:shadow-sm transition-all"
                      >
                        <p
                          className="text-[14.5px] font-bold text-[#0D1829] mb-1.5"
                          style={{ fontFamily: "var(--font-poppins)" }}
                        >
                          {r.title}
                        </p>
                        <p
                          className="text-[13px] text-[#6B7280] leading-relaxed"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {r.blurb}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Reserve / booking form ── */}
              <div id="reserve" className="mt-[56px] pt-[40px] border-t border-[#E8E8E4] scroll-mt-[88px]">
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E8742C] mb-3"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  Reserve your storage
                </p>
                <h2
                  className="text-[#0D1829] font-bold leading-[1.15] mb-2.5"
                  style={{ fontFamily: "var(--font-poppins)", fontSize: "24px", letterSpacing: "-0.02em" }}
                >
                  Book a bag drop in under two minutes
                </h2>
                <p
                  className="text-[14.5px] text-[#6B7280] leading-relaxed mb-6 max-w-[560px]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Pick a plan and a time, and we confirm on WhatsApp. There is no payment now. We are at 55 Ba Bang
                  Nhan, Ngu Hanh Son, about ten minutes from the airport, open 7am to 10pm every day. Prefer to
                  message us?{" "}
                  <a
                    href="https://wa.me/84905955161"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E8742C] font-semibold underline underline-offset-2"
                  >
                    WhatsApp us
                  </a>
                  .
                </p>
                <div className="rounded-2xl bg-[#16243F] overflow-hidden">
                  <HeroBookingForm dict={dict.booking} locale="en" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer dict={dict.footer} locale="en" currentPath={currentPath} />
    </main>
  );
}
