"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Safe by Design",
    description:
      "Everything is photographed, tagged, and CCTV monitored. If something goes wrong due to our negligence, WhatsApp us and we'll resolve it the same day.",
  },
  {
    title: "Under 3 Minutes",
    description:
      "Check in, get your tag, and you're out. No contracts, no waiting around. Pick-up is even faster.",
  },
  {
    title: "You Know the Price First",
    description:
      "Two lanes, fixed rates. We tell you the full amount before you hand over your bag — not after.",
  },
  {
    title: "Here When You Need Us",
    description:
      "7am to 10pm, every day. WhatsApp us any time and we reply within 15 minutes.",
  },
];

export default function WhyStow() {
  return (
    <section className="w-full bg-white py-16 lg:py-80">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-12 lg:gap-20 items-start">

          {/* ── Left — label ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:pt-4"
          >
            <p
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8742C]"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Why Stow
            </p>
          </motion.div>

          {/* ── Right — headline + 2×2 grid ── */}
          <div>
            <motion.h2
              className="text-[#0D1829] font-bold leading-[1.04] mb-10 lg:mb-20"
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: "32px",
                letterSpacing: "-0.03em",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Safe storage, fast check-in, and a team that actually cares about your things.
            </motion.h2>

            {/* 2×2 feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-0">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  className="border-t border-[#E2E2DE] pt-6 pb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
                >
                  <h3
                    className="text-[17px] font-bold text-[#0D1829] mb-3"
                    style={{ fontFamily: "var(--font-poppins)", letterSpacing: "-0.01em" }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="text-[14.5px] leading-relaxed text-[#6B7280]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {f.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
