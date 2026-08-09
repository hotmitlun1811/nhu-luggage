"use client";

import { CheckCircle2, XCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import type { Dictionary } from "@/content/types";

export default function TrustSafety({ dict }: { dict: Dictionary["trust"] }) {
  return (
    <section id="trust-safety" className="w-full bg-white py-16 lg:py-80 border-t border-[#F0F0EC]">
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

          {/* ── Right — lists + warning ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.08, ease: "easeOut" }}
          >
            {/* Accept / Not accept — 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 mb-10">
              {/* Can store */}
              <div>
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#16A34A] mb-4"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {dict.weAccept}
                </p>
                <div className="flex flex-col">
                  {dict.accepted.map((item) => (
                    <div key={item} className="flex items-start gap-3 border-t border-[#F0F0EC] py-3">
                      <CheckCircle2 size={14} className="text-[#16A34A] flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <span
                        className="text-[13.5px] text-[#374151] leading-snug"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cannot store */}
              <div>
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#DC2626] mb-4"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {dict.weDontAccept}
                </p>
                <div className="flex flex-col">
                  {dict.notAccepted.map((item) => (
                    <div key={item} className="flex items-start gap-3 border-t border-[#F0F0EC] py-3">
                      <XCircle size={14} className="text-[#DC2626] flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <span
                        className="text-[13.5px] text-[#374151] leading-snug"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Valuables warning */}
            <div className="flex items-start gap-4 bg-[#FFF8F4] border border-[#F0D5C0] rounded-xl px-5 py-4">
              <ShieldCheck size={16} className="text-[#E8742C] flex-shrink-0 mt-0.5" strokeWidth={1.75} />
              <p
                className="text-[13.5px] text-[#6B7280] leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <span className="font-semibold text-[#16243F]">{dict.valuablesWarningLead}</span>{" "}
                {dict.valuablesWarningBody}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
