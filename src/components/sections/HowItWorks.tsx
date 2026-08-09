"use client";

import { motion } from "framer-motion";
import { UserCheck } from "lucide-react";
import type { Dictionary } from "@/content/types";

export default function HowItWorks({ dict }: { dict: Dictionary["howItWorks"] }) {
  return (
    <section id="how-it-works" className="w-full bg-[#F4F4F0] py-16 lg:py-80">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-12 lg:gap-20 items-start">

          {/* ── Left — label + headline ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:pt-1"
          >
            <p
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8742C] mb-4"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {dict.label}
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
              className="text-[14px] text-[#6B7280] leading-relaxed max-w-[240px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {dict.subhead}
            </p>
          </motion.div>

          {/* ── Right — steps 2×2 + walk-in note ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
              {dict.steps.map((step, i) => (
                <div
                  key={step.title}
                  className="border-t border-[#E2E2DE] pt-6 pb-7 sm:pb-10"
                >
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8742C] mb-3"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className="text-[15px] font-bold text-[#0D1829] mb-2"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-[13.5px] text-[#6B7280] leading-relaxed"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Walk-in note */}
            <div className="flex items-start gap-3 border-t border-[#E2E2DE] pt-5 mt-2">
              <UserCheck size={15} className="text-[#E8742C] flex-shrink-0 mt-0.5" strokeWidth={1.75} />
              <p
                className="text-[13.5px] text-[#6B7280] leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <span className="font-semibold text-[#16243F]">{dict.walkInTitle}</span>{" "}
                {dict.walkInBody}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
