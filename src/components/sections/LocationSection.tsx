"use client";

import { MapPin, Clock, Mail, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

const WA_ICON = (
  <svg className="w-[15px] h-[15px] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.843L.057 23.547a.75.75 0 00.914.914l5.703-1.453A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.487-5.254-1.341l-.375-.212-3.888.99.99-3.89-.213-.374A9.952 9.952 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
  </svg>
);

const IG_ICON = (
  <svg className="w-[15px] h-[15px] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

export default function LocationSection() {
  return (
    <section id="location" className="w-full bg-[#0D1829] py-16 lg:py-80">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-16 items-start">

          {/* ── Left — map ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="rounded-2xl overflow-hidden h-[340px] lg:h-[520px] w-full"
          >
            <iframe
              src="https://maps.google.com/maps?q=55+Ba+Bang+Nhan,+Ngu+Hanh+Son,+Da+Nang,+Vietnam&output=embed&z=17"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Stow Da Nang location"
            />
          </motion.div>

          {/* ── Right — info ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
            className="flex flex-col"
          >
            <p
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8742C] mb-4"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Find Us
            </p>
            <h2
              className="text-white font-bold leading-[1.06] mb-10"
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: "32px",
                letterSpacing: "-0.03em",
              }}
            >
              Near Marble Mountains,<br />Da Nang.
            </h2>

            {/* Contact rows */}
            <div className="flex flex-col">

              {/* Address */}
              <div className="flex items-start gap-4 border-t border-white/[0.1] py-5">
                <MapPin size={15} className="text-[#E8742C] flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                <div>
                  <p
                    className="text-[13px] text-white font-medium mb-0.5"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    55 Ba Bang Nhan, Ngu Hanh Son, Da Nang
                  </p>
                  <p
                    className="text-[12px] text-white/45 mb-2"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Near Marble Mountains · 10 min from Da Nang Airport
                  </p>
                  <a
                    href="https://maps.app.goo.gl/wVmkxJ1DgLUJeBAWA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[12px] text-[#E8742C] hover:text-white transition-colors"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Get directions <ExternalLink size={11} />
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 border-t border-white/[0.1] py-5">
                <Clock size={15} className="text-[#E8742C] flex-shrink-0 mt-0.5" strokeWidth={1.75} />
                <div>
                  <p
                    className="text-[13px] text-white font-semibold mb-0.5"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    7:00 AM – 10:00 PM
                  </p>
                  <p
                    className="text-[12px] text-white/45"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Every day · Public holidays included
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center gap-4 border-t border-white/[0.1] py-5">
                <span className="text-[#25D366]">{WA_ICON}</span>
                <a
                  href="https://wa.me/84905955161"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-white/80 hover:text-white transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  +84 905 955 161 <span className="text-white/35">(WhatsApp / Zalo)</span>
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4 border-t border-white/[0.1] py-5">
                <Mail size={15} className="text-white/35 flex-shrink-0" strokeWidth={1.75} />
                <a
                  href="mailto:stowdanang@gmail.com"
                  className="text-[13px] text-white/80 hover:text-white transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  stowdanang@gmail.com
                </a>
              </div>

              {/* Instagram */}
              <div className="flex items-center gap-4 border-t border-white/[0.1] py-5">
                <span className="text-white/35">{IG_ICON}</span>
                <a
                  href="https://www.instagram.com/stowdanang/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-white/80 hover:text-white transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  @stowdanang
                </a>
              </div>

              {/* Book CTA */}
              <div className="border-t border-white/[0.1] pt-7 mt-2">
                <a
                  href="https://wa.me/84905955161"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#E8742C] text-white text-[13px] font-bold px-6 py-3 rounded-[4px] hover:bg-[#C85E1E] transition-colors tracking-[0.06em] uppercase"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {WA_ICON}
                  Chat to book
                </a>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
