"use client";

import { motion } from "framer-motion";

const lane1 = [
  {
    id: "hourly",
    name: "By the Hour",
    price: "15,000",
    unit: "₫ / hour",
    duration: "Minimum 1 hour, billed per hour",
    tag: null,
    featured: false,
  },
  {
    id: "daily",
    name: "By the Day",
    price: "60,000",
    unit: "₫ / day",
    duration: "Up to 24 hours from drop-off",
    tag: "Best value",
    featured: false,
  },
];

const lane2 = [
  {
    id: "mini",
    name: "Mini",
    price: "150,000",
    unit: "₫ flat",
    duration: "Up to 1 week",
    tag: null,
    featured: false,
  },
  {
    id: "standard",
    name: "Standard",
    price: "300,000",
    unit: "₫ flat",
    duration: "Up to 1 month",
    tag: "Most popular",
    featured: true,
  },
  {
    id: "longstay",
    name: "Long Stay",
    price: "500,000",
    unit: "₫ flat",
    duration: "Up to 3 months",
    tag: null,
    featured: false,
  },
];

export default function PricingSection() {
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
              Transparent Pricing
            </p>
            <h2
              className="text-[#0D1829] font-bold leading-[1.06]"
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: "32px",
                letterSpacing: "-0.03em",
              }}
            >
              Two lanes.<br />Pick yours.
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
              Choose based on how long you need storage. One flat surcharge for
              oversized items — that&apos;s the only extra.
            </p>
            <p
              className="text-[13px] text-[#9CA3AF]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Prices are per bag. Storing 2 or more? WhatsApp us and we&apos;ll sort it together.
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
                  Lane 1 — Flexible
                </p>
                <p
                  className="text-[13px] text-[#9CA3AF]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  For tourists &amp; walk-ins
                </p>
              </div>
            </div>

            {/* Plan rows */}
            <div className="flex flex-col flex-1">
              {lane1.map((plan, i) => (
                <div
                  key={plan.id}
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
                      {plan.price}
                    </span>
                    <span
                      className="text-[13px] text-[#9CA3AF] ml-1.5 whitespace-nowrap"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {plan.unit}
                    </span>
                  </div>

                  {/* Name + tag + duration */}
                  <div className="text-left md:text-right md:ml-4">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p
                        className="text-[13px] font-semibold text-[#16243F]"
                        style={{ fontFamily: "var(--font-poppins)" }}
                      >
                        {plan.name}
                      </p>
                      {plan.tag && (
                        <span
                          className="text-[9px] font-bold uppercase tracking-[0.1em] bg-[#16243F] text-white px-2 py-0.5 rounded-full whitespace-nowrap"
                          style={{ fontFamily: "var(--font-poppins)" }}
                        >
                          {plan.tag}
                        </span>
                      )}
                    </div>
                    <p
                      className="text-[12px] text-[#9CA3AF]"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {plan.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p
              className="text-[11px] text-[#9CA3AF] mt-5 pt-5 border-t border-[#E2E2DE]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              +30,000 ₫ surcharge for oversized items (28&quot;+ suitcase, bicycle, surfboard, large box)
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
                  Lane 2 — Flat Rate
                </p>
                <p
                  className="text-[13px] text-white/60"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  For expats &amp; digital nomads
                </p>
              </div>
            </div>

            {/* Plan rows */}
            <div className="flex flex-col flex-1">
              {lane2.map((plan, i) => (
                <div
                  key={plan.id}
                  className={`relative flex flex-col gap-1 md:flex-row md:items-end md:justify-between py-5 ${
                    i < lane2.length - 1 ? "border-b border-white/[0.14]" : ""
                  }`}
                >
                  {/* Featured highlight bar */}
                  {plan.featured && (
                    <div className="absolute inset-x-[-8px] inset-y-[4px] bg-white/[0.05] rounded-xl pointer-events-none" />
                  )}

                  {/* Price */}
                  <div className="relative z-10">
                    <span
                      className={`font-bold leading-none ${plan.featured ? "text-white" : "text-white/90"}`}
                      style={{
                        fontFamily: "var(--font-poppins)",
                        fontSize: "clamp(32px, 3.4vw, 46px)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {plan.price}
                    </span>
                    <span
                      className={`text-[13px] ml-1.5 whitespace-nowrap ${plan.featured ? "text-white/65" : "text-white/55"}`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {plan.unit}
                    </span>
                  </div>

                  {/* Name + tag + duration */}
                  <div className="text-left md:text-right md:ml-4 relative z-10">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p
                        className={`text-[13px] font-semibold ${plan.featured ? "text-white" : "text-white/85"}`}
                        style={{ fontFamily: "var(--font-poppins)" }}
                      >
                        {plan.name}
                      </p>
                      {plan.tag && (
                        <span
                          className="text-[9px] font-bold uppercase tracking-[0.1em] bg-[#E8742C] text-white px-2 py-0.5 rounded-full whitespace-nowrap"
                          style={{ fontFamily: "var(--font-poppins)" }}
                        >
                          {plan.tag}
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-[12px] ${plan.featured ? "text-white/65" : "text-white/50"}`}
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {plan.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p
              className="text-[11px] text-white/45 mt-5 pt-5 border-t border-white/[0.14]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              +50,000 ₫ surcharge for oversized items · Price fixed regardless of early pickup
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
            Book Your Storage
          </a>
          <div className="hidden sm:block w-px h-5 bg-[#E2E2DE] mx-10" />
          <p
            className="text-[13px] text-[#9CA3AF] mt-4 sm:mt-0"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            No account needed · WhatsApp 0905 955 161 for walk-in questions
          </p>
        </div>

      </div>
    </section>
  );
}
