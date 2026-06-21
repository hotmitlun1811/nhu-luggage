"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const cycle = [
  { n: "1", label: "Visa expires",          sub: "Every 1–3 months",                         highlight: false },
  { n: "2", label: "Leave for a visa run",  sub: "Bangkok · Kuala Lumpur · Singapore",        highlight: false },
  { n: "3", label: "Stow holds everything", sub: "Locked zone · CCTV · Unique ID tag",        highlight: true  },
  { n: "4", label: "You come back",         sub: "Everything exactly as you left it",          highlight: false },
];

export default function ForExpats() {
  return (
    <section className="w-full bg-[#F4F4F0] py-48 lg:py-80">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left — story ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8742C] mb-6"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              For expats &amp; digital nomads
            </p>

            <h2
              className="text-[#0D1829] font-bold leading-[1.06] mb-8"
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: "32px",
                letterSpacing: "-0.03em",
              }}
            >
              Da Nang is home.{" "}
              <span className="text-[#E8742C]">Visa runs</span>{" "}
              are part of the rhythm.
            </h2>

            <p
              className="text-[15px] leading-relaxed text-[#4B5563] mb-5 max-w-md"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Thousands of foreigners live and work in Da Nang long-term. Every
              few months, the visa expires. The question is always the same:{" "}
              <span className="text-[#16243F] font-medium">where do I leave my things?</span>
            </p>

            <p
              className="text-[15px] leading-relaxed text-[#4B5563] mb-10 max-w-md"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              No one wants to pay rent on an empty room just to hold a spot. Not
              everyone has a friend they trust with a laptop and a bike for weeks.
              Stow exists to solve exactly that.
            </p>

            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-[#16243F] text-white text-[14px] font-semibold px-6 py-3 rounded-xl hover:bg-[#0D1829] transition-colors"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              See Flat Rate Plans
              <ArrowRight size={15} strokeWidth={2} />
            </Link>
          </motion.div>

          {/* ── Right — visa run cycle ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="lg:pt-[84px]"
          >
            <p
              className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF] mb-8"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              The visa run cycle
            </p>

            {/* Steps */}
            <div className="flex flex-col">
              {cycle.map((step, i) => (
                <div key={step.label} className="flex items-start gap-5">
                  {/* Number + line */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-colors ${
                        step.highlight
                          ? "bg-[#E8742C] text-white"
                          : "bg-white border border-[#E2E2DE] text-[#9CA3AF]"
                      }`}
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {step.n}
                    </div>
                    {i < cycle.length - 1 && (
                      <div className="w-px flex-1 min-h-[28px] bg-[#E2E2DE] my-1.5" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-7">
                    <p
                      className={`text-[15px] font-semibold leading-snug mb-1 ${
                        step.highlight ? "text-[#E8742C]" : "text-[#16243F]"
                      }`}
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {step.label}
                    </p>
                    <p
                      className="text-[13px] text-[#9CA3AF]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {step.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing callout */}
            <div className="mt-2 border-t border-[#E2E2DE] pt-6">
              <p
                className="text-[13.5px] text-[#6B7280] leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Flat Rate plans start at{" "}
                <span className="font-semibold text-[#16243F]">150,000 ₫ for 1 week</span>{" "}
                — one fixed fee, no daily rate, no early-pickup penalty.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
