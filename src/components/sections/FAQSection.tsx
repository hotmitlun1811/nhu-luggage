"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Dictionary } from "@/content/types";

/* Anchor ids for cross-page/cross-section deep links (PricingSection,
   LocationSection, trust-safety/page.tsx). Matched by group index, not
   the localized `cluster` label — the group order (airport, expat,
   pricing, trust & safety, location) is the same across every locale's
   faq.ts, so index is the stable key. Keep this array's order in sync
   with faq.ts's `groups` if that ever changes. */
const GROUP_IDS = ["faq-airport", "faq-expat", "faq-pricing", "faq-trust-safety", "faq-location"];

/* Reciprocal links from a FAQ cluster to the matching /guides/* page
   (content-engine playbook, docs/aeo-seo/2026-08-15-content-engine-playbook.md
   step 3 — every new guide gets linked from an existing high-traffic
   surface). Keyed by group id, dict field read per-group below. */
const GROUP_GUIDE_LINKS: Record<string, { href: string; dictKey: "layoverGuideLink" | "visaRunGuideLink" | "trustSafetyLink" | "marbleMountainsGuideLink" }> = {
  "faq-airport": { href: "/guides/da-nang-layover-guide", dictKey: "layoverGuideLink" },
  "faq-expat": { href: "/guides/da-nang-visa-run-guide", dictKey: "visaRunGuideLink" },
  "faq-trust-safety": { href: "/trust-safety", dictKey: "trustSafetyLink" },
  "faq-location": { href: "/guides/marble-mountains-guide", dictKey: "marbleMountainsGuideLink" },
};

export default function FAQSection({ dict }: { dict: Dictionary["faq"] }) {
  return (
    <section id="faq" className="w-full bg-[#F4F4F0] py-16 lg:py-80">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-12 lg:gap-20 items-start">

          {/* ── Left — label + headline ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:pt-1 lg:sticky lg:top-24"
          >
            <p
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8742C] mb-4"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {dict.eyebrow}
            </p>
            <h2
              className="text-[#0D1829] font-bold leading-[1.06] mb-5"
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: "32px",
                letterSpacing: "-0.03em",
              }}
            >
              {dict.headlineLines.map((line, i) => (
                <span key={line}>
                  {line}
                  {i < dict.headlineLines.length - 1 && <br />}
                </span>
              ))}
            </h2>
            <p
              className="text-[14px] text-[#6B7280] leading-relaxed max-w-[260px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {dict.subhead}
            </p>
          </motion.div>

          {/* ── Right — grouped Q&A, fully visible (no accordion) ── */}
          <div className="flex flex-col gap-10">
            {dict.groups.map((group, gi) => (
              <motion.div
                key={group.cluster}
                id={GROUP_IDS[gi]}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: gi * 0.05, ease: "easeOut" }}
                className="scroll-mt-24"
              >
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9CA3AF] mb-4"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {group.cluster}
                </p>
                <div className="flex flex-col">
                  {group.items.map((item, i) => (
                    <div
                      key={item.q}
                      className={`py-5 ${i < group.items.length - 1 ? "border-b border-[#E2E2DE]" : ""}`}
                    >
                      <h3
                        className="text-[15px] font-bold text-[#0D1829] mb-2"
                        style={{ fontFamily: "var(--font-poppins)", letterSpacing: "-0.01em" }}
                      >
                        {item.q}
                      </h3>
                      <p
                        className="text-[14px] text-[#4B5563] leading-relaxed"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
                {GROUP_GUIDE_LINKS[GROUP_IDS[gi]] && (
                  <Link
                    href={GROUP_GUIDE_LINKS[GROUP_IDS[gi]].href}
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#E8742C] hover:text-[#0D1829] transition-colors mt-4"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {dict[GROUP_GUIDE_LINKS[GROUP_IDS[gi]].dictKey]} →
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
