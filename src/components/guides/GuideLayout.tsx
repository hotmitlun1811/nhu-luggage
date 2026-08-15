import Link from "next/link";
import { MessageCircle } from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import PrimaryNav from "@/components/layout/PrimaryNav";
import Footer from "@/components/layout/Footer";
import type { Dictionary } from "@/content/types";

/**
 * Shared shell for the /guides/* pages (content-engine playbook,
 * docs/aeo-seo/2026-08-15-content-engine-playbook.md). Mirrors
 * trust-safety/page.tsx's visual pattern (dark header, white body, CTA
 * footer) rather than introducing a new look. English-only for now, same
 * scope as trust-safety/privacy-policy/terms-of-service — no ko/ja
 * translation yet.
 */
export default function GuideLayout({
  dict,
  currentPath,
  eyebrow,
  title,
  subhead,
  children,
  related,
}: {
  dict: Dictionary;
  currentPath: string;
  eyebrow: string;
  title: string;
  subhead: string;
  children: React.ReactNode;
  related?: { title: string; href: string; blurb: string }[];
}) {
  return (
    <main>
      <AnnouncementBar dict={dict.announcement} />
      <PrimaryNav dict={dict.nav} locale="en" currentPath={currentPath} />

      {/* Page header */}
      <div className="bg-[#16243F] py-40 lg:py-64">
        <div className="max-w-[900px] mx-auto px-6">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E8742C] mb-3"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {eyebrow}
          </p>
          <h1
            className="text-white font-bold leading-[1.08] mb-5"
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "clamp(28px, 4vw, 46px)",
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </h1>
          <p
            className="text-white/50 text-[15px] max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {subhead}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="bg-white">
        <div className="max-w-[820px] mx-auto px-6 py-20 lg:py-28">
          <article
            className="flex flex-col gap-10 text-[15.5px] text-[#374151] leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {children}
          </article>

          {related && related.length > 0 && (
            <div className="mt-16 pt-12 border-t border-[#E8E8E4]">
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
                    className="block rounded-xl border border-[#E8E8E4] p-5 hover:border-[#E8742C] transition-colors"
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

          {/* ── CTA ── */}
          <div className="mt-16 pt-12 border-t border-[#E8E8E4] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p
                className="text-[18px] font-bold text-[#0D1829] mb-2"
                style={{ fontFamily: "var(--font-poppins)", letterSpacing: "-0.02em" }}
              >
                Need to drop off a bag?
              </p>
              <p
                className="text-[14px] text-[#6B7280]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                55 Bà Bang Nhãn, Ngũ Hành Sơn. Open 7am–10pm, every day.
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <a
                href="https://wa.me/84905955161"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#E2E2DE] text-[#16243F] text-[14px] font-semibold px-5 py-2.5 rounded-xl hover:bg-[#F4F4F0] transition-colors"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                <MessageCircle size={15} strokeWidth={1.75} />
                WhatsApp us
              </a>
              <Link
                href="/#booking"
                className="inline-flex items-center justify-center bg-[#E8742C] text-white text-[14px] font-semibold px-5 py-2.5 rounded-xl hover:bg-[#C85E1E] transition-colors"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Book Storage
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer dict={dict.footer} locale="en" currentPath={currentPath} />
    </main>
  );
}
