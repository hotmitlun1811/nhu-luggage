"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Left my camera bag for 6 hours. Got a photo of it at check-in, unique ID tag, CCTV on the whole time. Picked up in 90 seconds. That's exactly what you want from a storage service.",
    name: "Daniel S.",
    origin: "Australia · Traveler",
  },
  {
    quote:
      "I do visa runs every few months. Stow holds everything while I'm in Bangkok. Flat-rate plan means I pay once and stop thinking about it. My laptop and bike have been there twice now.",
    name: "Mia K.",
    origin: "Germany · Digital Nomad",
  },
  {
    quote:
      "Dropped my bags before a day trip to Hoi An. Done in under 3 minutes. Staff wrote the tag, took the photo, and handed me a receipt. Picked up same evening. Will use every time I'm in Da Nang.",
    name: "James T.",
    origin: "UK · Backpacker",
  },
];

export default function SocialProof() {
  return (
    <section className="w-full bg-white py-16 lg:py-80 border-t border-[#F0F0EC]">
      <div className="max-w-[1280px] mx-auto px-6">

        {/* Stats bar */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Star rating */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-[#E8742C] fill-[#E8742C]" />
              ))}
            </div>
            <a
              href="https://www.google.com/maps/search/Stow+Da+Nang+luggage+storage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-[#9CA3AF] hover:text-[#E8742C] transition-colors underline underline-offset-2 decoration-dotted"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              5.0 on Google ↗
            </a>
          </div>

          <div className="w-px h-8 bg-[#E8E8E4] hidden sm:block" />

          <div className="flex flex-col items-center gap-0.5">
            <span
              className="text-[28px] font-bold text-[#16243F]"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              200+
            </span>
            <p className="text-[13px] text-[#9CA3AF]" style={{ fontFamily: "var(--font-inter)" }}>
              Travelers & expats served
            </p>
          </div>

          <div className="w-px h-8 bg-[#E8E8E4] hidden sm:block" />

          <div className="flex flex-col items-center gap-0.5">
            <span
              className="text-[28px] font-bold text-[#16243F]"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              20+
            </span>
            <p className="text-[13px] text-[#9CA3AF]" style={{ fontFamily: "var(--font-inter)" }}>
              Nationalities welcomed
            </p>
          </div>

          <div className="w-px h-8 bg-[#E8E8E4] hidden sm:block" />

          <div className="flex flex-col items-center gap-0.5">
            <span
              className="text-[28px] font-bold text-[#16243F]"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              &lt;3 min
            </span>
            <p className="text-[13px] text-[#9CA3AF]" style={{ fontFamily: "var(--font-inter)" }}>
              Check-in time
            </p>
          </div>

          <div className="w-px h-8 bg-[#E8E8E4] hidden sm:block" />

          <div className="flex flex-col items-center gap-0.5">
            <span
              className="text-[28px] font-bold text-[#16243F]"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              &lt;2 min
            </span>
            <p className="text-[13px] text-[#9CA3AF]" style={{ fontFamily: "var(--font-inter)" }}>
              Pick-up time
            </p>
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="flex flex-col gap-5 bg-[#F9F9F7] rounded-2xl p-6 border border-[#EFEFED]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={13} className="text-[#E8742C] fill-[#E8742C]" />
                ))}
              </div>

              {/* Quote */}
              <p
                className="text-[14px] leading-relaxed text-[#374151] flex-1"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div className="flex items-center gap-3 pt-2 border-t border-[#EAEAEA]">
                <div
                  className="w-8 h-8 rounded-full bg-[#16243F] flex items-center justify-center text-white text-[13px] font-bold flex-shrink-0"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p
                    className="text-[13px] font-semibold text-[#16243F]"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-[11.5px] text-[#9CA3AF]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {t.origin}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
