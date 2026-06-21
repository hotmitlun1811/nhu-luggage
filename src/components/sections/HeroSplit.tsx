"use client";

import { MapPin, Clock, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import HeroBookingForm from "@/components/booking/HeroBookingForm";


export default function HeroSplit() {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#0D1829]"
      style={{ height: "100vh", minHeight: "600px" }}
    >
      {/* ── Video background ── */}
      {/* Drop your travel/luggage video at: public/videos/hero-bg.mp4
          Free sources: pexels.com, mixkit.co, coverr.co (search "travel", "airport", "luggage")
          Recommended: 1920×1080, h264, under 8MB for fast load */}
      {/* Add your video at public/videos/hero-bg.mp4 — free sources: mixkit.co, coverr.co (search "travel luggage airport") */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        style={{ objectPosition: "center center" }}
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
        <source src="/videos/hero-bg.webm" type="video/webm" />
      </video>

      {/* ── Gradient overlay — left-heavy for text legibility ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(13,24,41,0.82) 0%, rgba(22,36,63,0.60) 38%, rgba(22,36,63,0.20) 62%, rgba(22,36,63,0.05) 100%)",
        }}
      />

      {/* ── Vignette edges ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.20) 100%)",
        }}
      />

      {/* ── Content layer ── */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 h-full flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-center py-24 lg:py-32">

          {/* ── Left — editorial text ── */}
          <div>
            {/* Tagline */}
            <motion.p
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8742C] mb-6"
              style={{ fontFamily: "var(--font-poppins)" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
            >
              Safe&nbsp;·&nbsp;Easy&nbsp;·&nbsp;Fast
            </motion.p>

            {/* Headline */}
            <motion.h1
              className="text-white font-bold leading-[1.06] mb-6"
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: "clamp(38px, 5.5vw, 70px)",
                maxWidth: "600px",
                textShadow: "0 2px 24px rgba(0,0,0,0.4)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
            >
              Drop your bags.{" "}
              <span className="text-[#E8742C]">Explore Da&nbsp;Nang</span>{" "}
              freely.
            </motion.h1>

            {/* Sub-copy */}
            <motion.p
              className="text-white/70 text-[16px] leading-relaxed mb-10 max-w-[440px]"
              style={{
                fontFamily: "var(--font-inter)",
                textShadow: "0 1px 8px rgba(0,0,0,0.5)",
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
            >
              Your last day in Da Nang shouldn't be spent hauling bags around. Drop off in under 3 minutes. Pick up whenever you're ready. By the hour for day-trippers, by the month for expats on visa runs.
            </motion.p>

            {/* Contact info */}
            <motion.div
              className="flex flex-col gap-2"
              style={{ fontFamily: "var(--font-inter)" }}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28, ease: "easeOut" }}
            >
              <a
                href="https://wa.me/84905955161"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[13px] text-white/65 hover:text-white transition-colors"
              >
                <MessageCircle size={13} className="text-[#25D366] flex-shrink-0" />
                <span>+84 905 955 161</span>
                <span className="text-white/30 text-[12px]">WhatsApp · Zalo</span>
              </a>
              <div className="flex items-center gap-2 text-[13px] text-white/65">
                <Clock size={13} className="text-[#E8742C] flex-shrink-0" />
                <span>7am to 10pm, every day</span>
              </div>
              <div className="flex items-start gap-2 text-[13px] text-white/65">
                <MapPin size={13} className="text-[#E8742C] flex-shrink-0 mt-0.5" />
                <span>55 Ba Bang Nhan, Ngu Hanh Son, Da Nang</span>
              </div>
            </motion.div>
          </div>

          {/* ── Right — embedded booking form ── */}
          <motion.div
            className="rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: "rgba(13,24,41,0.96)", border: "1px solid rgba(255,255,255,0.10)" }}
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/8">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 shadow-[0_0_8px_2px_rgba(52,211,153,0.6)]" />
                <span
                  className="text-[11px] text-white/50 uppercase tracking-[0.1em] font-semibold"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  Open · 7am–10pm daily
                </span>
              </div>
              <span
                className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#E8742C]"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Book now
              </span>
            </div>

            {/* Booking form */}
            <HeroBookingForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
