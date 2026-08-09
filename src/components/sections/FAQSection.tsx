"use client";

import { motion } from "framer-motion";
import { faqGroups } from "@/lib/faq-data";

export default function FAQSection() {
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
              Common Questions
            </p>
            <h2
              className="text-[#0D1829] font-bold leading-[1.06] mb-5"
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: "32px",
                letterSpacing: "-0.03em",
              }}
            >
              Airports, visa runs,<br />and everything else.
            </h2>
            <p
              className="text-[14px] text-[#6B7280] leading-relaxed max-w-[260px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              The questions tourists and expats actually ask, answered straight.
            </p>
          </motion.div>

          {/* ── Right — grouped Q&A, fully visible (no accordion) ── */}
          <div className="flex flex-col gap-10">
            {faqGroups.map((group, gi) => (
              <motion.div
                key={group.cluster}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: gi * 0.05, ease: "easeOut" }}
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
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
