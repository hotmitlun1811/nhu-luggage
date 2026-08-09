"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Dictionary } from "@/content/types";

export default function ForExpats({ dict }: { dict: Dictionary["expats"] }) {
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
              {dict.eyebrow}
            </p>

            <h2
              className="text-[#0D1829] font-bold leading-[1.06] mb-8"
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: "32px",
                letterSpacing: "-0.03em",
              }}
            >
              {dict.headlinePre}
              {dict.headlineHighlight && <span className="text-[#E8742C]">{dict.headlineHighlight}</span>}
              {dict.headlinePost}
            </h2>

            <p
              className="text-[15px] leading-relaxed text-[#4B5563] mb-5 max-w-md"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {dict.paragraph1}
            </p>

            <p
              className="text-[15px] leading-relaxed text-[#4B5563] mb-10 max-w-md"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {dict.paragraph2}
            </p>

            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 bg-[#16243F] text-white text-[14px] font-semibold px-6 py-3 rounded-xl hover:bg-[#0D1829] transition-colors"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {dict.cta}
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
              {dict.cycleLabel}
            </p>

            {/* Steps */}
            <div className="flex flex-col">
              {dict.cycle.map((step, i) => {
                const highlight = i === 2; // "Stow holds everything" — structural, not translatable
                return (
                  <div key={step.label} className="flex items-start gap-5">
                    {/* Number + line */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-colors ${
                          highlight ? "bg-[#E8742C] text-white" : "bg-white border border-[#E2E2DE] text-[#9CA3AF]"
                        }`}
                        style={{ fontFamily: "var(--font-poppins)" }}
                      >
                        {i + 1}
                      </div>
                      {i < dict.cycle.length - 1 && (
                        <div className="w-px flex-1 min-h-[28px] bg-[#E2E2DE] my-1.5" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="pb-7">
                      <p
                        className={`text-[15px] font-semibold leading-snug mb-1 ${
                          highlight ? "text-[#E8742C]" : "text-[#16243F]"
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
                );
              })}
            </div>

            {/* Pricing callout */}
            <div className="mt-2 border-t border-[#E2E2DE] pt-6">
              <p
                className="text-[13.5px] text-[#6B7280] leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {dict.pricingCalloutPre}
                <span className="font-semibold text-[#16243F]">{dict.pricingCalloutHighlight}</span>
                {dict.pricingCalloutPost}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
