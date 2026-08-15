"use client";

import { MapPin, Clock, MessageCircle, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import HeroBookingForm from "@/components/booking/HeroBookingForm";
import { GOOGLE_MAPS_SHARE_URL } from "@/lib/maps";
import type { Dictionary } from "@/content/types";
import type { AppLocale } from "@/content/locales";

export default function HeroSplit({
  dict,
  bookingDict,
  locale,
}: {
  dict: Dictionary["hero"];
  bookingDict: Dictionary["booking"];
  locale: AppLocale;
}) {
  return (
    /* `lg:min-h-screen`, never `lg:h-screen`. With a fixed height the
       booking panel (~750px) couldn't fit a short laptop viewport, and
       `items-center` split the overflow evenly — pushing the panel's
       header up underneath the 72px fixed nav. min-h lets the section
       grow instead of overlapping. */
    <section
      id="booking"
      className="relative w-full overflow-hidden bg-[#0D1829]"
      style={{ minHeight: "600px" }}
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
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:flex lg:min-h-screen lg:items-center">
        {/* Vertical padding in explicit px, not `lg:py-32`: globals.css
            redefines --spacing-32 to 32px, so that class was rendering a
            quarter of the intended 128px and left no room under the nav.
            pt must always exceed the 72px nav height. See
            feedback-tailwind-v4-spacing. */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_460px] xl:grid-cols-[1fr_500px] gap-8 items-start pt-28 pb-14 lg:items-center lg:pt-[112px] lg:pb-[80px]">

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
              {dict.tagline}
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
              {dict.headlinePre}
              {dict.headlineHighlight && <span className="text-[#E8742C]">{dict.headlineHighlight}</span>}
              {dict.headlinePost}
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
              {dict.subcopy}
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
                <span className="text-white/30 text-[12px]">{dict.whatsappZalo}</span>
              </a>
              <div className="flex items-center gap-2 text-[13px] text-white/65">
                <Clock size={13} className="text-[#E8742C] flex-shrink-0" />
                <span>{dict.hoursLine}</span>
              </div>
              {/* Address links straight into Stow's Google Maps listing —
                  it used to be inert text, so a visitor at the top of the
                  page had no way to reach the map without scrolling to the
                  Location section. */}
              <a
                href={GOOGLE_MAPS_SHARE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-[13px] text-white/65 hover:text-white transition-colors"
              >
                <MapPin size={13} className="text-[#E8742C] flex-shrink-0 mt-0.5" />
                <span>{dict.address}</span>
              </a>

              {/* Directions CTA — secondary to "Book Now", so it's an
                  outlined button, not another orange one. */}
              <a
                href={GOOGLE_MAPS_SHARE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-fit items-center gap-2 rounded-[4px] border border-white/25 bg-white/[0.08] px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.07em] text-white backdrop-blur-sm transition-colors hover:border-white/45 hover:bg-white/[0.16]"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                <MapPin size={13} className="flex-shrink-0 text-[#E8742C]" />
                {dict.getDirections}
                <ExternalLink size={11} className="flex-shrink-0 opacity-60" />
              </a>
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
            {/* The "OPEN · 7AM–10PM DAILY / BOOK NOW" strip that used to sit
                here was removed at the client's request (2026-08-15). Both
                facts are already on the page: opening hours in the contact
                block to the left, "Book Now" in the nav and as the form's
                own submit button. */}
            {/* Booking form */}
            <HeroBookingForm dict={bookingDict} locale={locale} />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
