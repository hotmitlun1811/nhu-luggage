"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PLAN_FACTS, FLEX_PLANS, FLAT_PLANS, vnd } from "@/lib/plans";
import type { Dictionary } from "@/content/types";

export default function PricingSection({ dict }: { dict: Dictionary["pricing"] }) {
  const lane1 = FLEX_PLANS.map((key) => ({ key, facts: PLAN_FACTS[key], text: dict.plans[key] }));
  const lane2 = FLAT_PLANS.map((key) => ({ key, facts: PLAN_FACTS[key], text: dict.plans[key] }));

  return (
    <section className="w-full bg-white py-16 lg:py-80 border-t border-[#F0F0EC]" id="pricing">
      <div className="max-w-[1280px] mx-auto px-6">

        {/* ── Heading ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-10 lg:gap-20 items-end mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8742C] mb-4"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {dict.eyebrow}
            </p>
            <h2
              className="text-[#0D1829] font-bold leading-[1.06]"
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: "32px",
                letterSpacing: "-0.03em",
              }}
            >
              {dict.headlineLines[0]}<br />{dict.headlineLines[1]}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.06, ease: "easeOut" }}
            className="lg:pb-1"
          >
            <p
              className="text-[15px] text-[#4B5563] leading-relaxed mb-3 max-w-lg"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {dict.intro}
            </p>
            <p
              className="text-[13px] text-[#9CA3AF]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {dict.perBagNote}
            </p>
          </motion.div>
        </div>

        {/* ── Two-column lane panels ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">

          {/* Lane 1 — Flexible */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
            className="bg-[#F4F4F0] rounded-2xl px-6 py-7 md:px-10 md:py-9 flex flex-col"
          >
            {/* Panel header */}
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8742C] mb-1"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {dict.lane1.label}
                </p>
                <p
                  className="text-[13px] text-[#9CA3AF]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {dict.lane1.sublabel}
                </p>
              </div>
            </div>

            {/* Plan rows */}
            <div className="flex flex-col flex-1">
              {lane1.map(({ key, facts, text }, i) => (
                <div
                  key={key}
                  className={`flex flex-col gap-1 md:flex-row md:items-end md:justify-between py-5 ${
                    i < lane1.length - 1 ? "border-b border-[#E2E2DE]" : ""
                  }`}
                >
                  {/* Price */}
                  <div>
                    <span
                      className="font-bold leading-none text-[#0D1829]"
                      style={{
                        fontFamily: "var(--font-poppins)",
                        fontSize: "clamp(32px, 3.4vw, 46px)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {vnd(facts.price)}
                    </span>
                    <span
                      className="text-[13px] text-[#9CA3AF] ml-1.5 whitespace-nowrap"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {text.unit}
                    </span>
                  </div>

                  {/* Name + tag + duration */}
                  <div className="text-left md:text-right md:ml-4">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p
                        className="text-[13px] font-semibold text-[#16243F]"
                        style={{ fontFamily: "var(--font-poppins)" }}
                      >
                        {text.name}
                      </p>
                      {text.tag && (
                        <span
                          className="text-[9px] font-bold uppercase tracking-[0.1em] bg-[#16243F] text-white px-2 py-0.5 rounded-full whitespace-nowrap"
                          style={{ fontFamily: "var(--font-poppins)" }}
                        >
                          {text.tag}
                        </span>
                      )}
                    </div>
                    <p
                      className="text-[12px] text-[#9CA3AF]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {text.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p
              className="text-[11px] text-[#9CA3AF] mt-5 pt-5 border-t border-[#E2E2DE]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {dict.lane1.surchargeNote}
            </p>
          </motion.div>

          {/* Lane 2 — Flat Rate */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="bg-[#16243F] rounded-2xl px-6 py-7 md:px-10 md:py-9 flex flex-col"
          >
            {/* Panel header */}
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#E8742C] mb-1"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {dict.lane2.label}
                </p>
                <p
                  className="text-[13px] text-white/60"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {dict.lane2.sublabel}
                </p>
              </div>
            </div>

            {/* Plan rows */}
            <div className="flex flex-col flex-1">
              {lane2.map(({ key, facts, text }, i) => {
                const featured = key === "strand"; // structural highlight — only Strand gets the emphasized row
                return (
                  <div
                    key={key}
                    className={`relative flex flex-col gap-1 md:flex-row md:items-end md:justify-between py-5 ${
                      i < lane2.length - 1 ? "border-b border-white/[0.14]" : ""
                    }`}
                  >
                    {/* Featured highlight bar */}
                    {featured && (
                      <div className="absolute inset-x-[-8px] inset-y-[4px] bg-white/[0.05] rounded-xl pointer-events-none" />
                    )}

                    {/* Price */}
                    <div className="relative z-10">
                      <span
                        className={`font-bold leading-none ${featured ? "text-white" : "text-white/90"}`}
                        style={{
                          fontFamily: "var(--font-poppins)",
                          fontSize: "clamp(32px, 3.4vw, 46px)",
                          letterSpacing: "-0.04em",
                        }}
                      >
                        {vnd(facts.price)}
                      </span>
                      <span
                        className={`text-[13px] ml-1.5 whitespace-nowrap ${featured ? "text-white/65" : "text-white/55"}`}
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {text.unit}
                      </span>
                    </div>

                    {/* Name + tag + duration */}
                    <div className="text-left md:text-right md:ml-4 relative z-10">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p
                          className={`text-[13px] font-semibold ${featured ? "text-white" : "text-white/85"}`}
                          style={{ fontFamily: "var(--font-poppins)" }}
                        >
                          {text.name}
                        </p>
                        {text.tag && (
                          <span
                            className="text-[9px] font-bold uppercase tracking-[0.1em] bg-[#E8742C] text-white px-2 py-0.5 rounded-full whitespace-nowrap"
                            style={{ fontFamily: "var(--font-poppins)" }}
                          >
                            {text.tag}
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-[12px] ${featured ? "text-white/65" : "text-white/50"}`}
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {text.duration}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p
              className="text-[11px] text-white/45 mt-5 pt-5 border-t border-white/[0.14]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {dict.lane2.surchargeNote}
            </p>
          </motion.div>

        </div>

        {/* ── CTA ── */}
        <div className="flex flex-col sm:flex-row items-center justify-center pt-6 border-t border-[#F0F0EC]">
          <a
            href="#booking"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="inline-flex items-center justify-center bg-[#E8742C] text-white text-[13.5px] font-bold px-7 py-3 rounded-[4px] hover:bg-[#C85E1E] transition-colors tracking-[0.06em] uppercase"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {dict.cta.button}
          </a>
          <div className="hidden sm:block w-px h-5 bg-[#E2E2DE] mx-10" />
          <p
            className="text-[13px] text-[#9CA3AF] mt-4 sm:mt-0"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {dict.cta.note}
          </p>
        </div>

        <div className="flex justify-center pt-5">
          <Link
            href="/#faq-pricing"
            className="text-[12.5px] font-semibold text-[#9CA3AF] hover:text-[#E8742C] transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {dict.faqLink} →
          </Link>
        </div>

      </div>
    </section>
  );
}
