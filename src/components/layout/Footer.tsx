import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

const links = {
  Navigate: [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Services", href: "#services" },
    { label: "Location", href: "#location" },
    { label: "Book Now", href: "/#booking" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full bg-[#0D1829] text-white pt-14 pb-10">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            {/* Logo */}
            <Link href="/" className="flex items-center mb-5 w-fit">
              <Image
                src="/logo-final.png"
                alt="Stow — Luggage Storage Da Nang"
                width={80}
                height={80}
                className="h-[64px] w-auto object-contain"
              />
            </Link>

            <p
              className="text-[14px] text-white/50 leading-relaxed mb-6 max-w-[200px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Safe, simple luggage storage in Da Nang. By the hour, day, or month. We&apos;re open 7am–10pm, every day.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/84905955161"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-white/40 hover:text-[#25D366] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.843L.057 23.547a.75.75 0 00.914.914l5.703-1.453A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.487-5.254-1.341l-.375-.212-3.888.99.99-3.89-.213-.374A9.952 9.952 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/stowdanang/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/40 hover:text-[#E8742C] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="mailto:stowdanang@gmail.com"
                aria-label="Email"
                className="text-white/40 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4
                className="text-[12px] font-semibold uppercase tracking-widest text-white/30 mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {section}
              </h4>
              <ul className="flex flex-col gap-3">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[14px] text-white/60 hover:text-white transition-colors"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact bar */}
        <div className="border-t border-white/10 py-6 flex flex-wrap gap-5 items-center justify-between">
          <div className="flex flex-wrap gap-5 text-[13px] text-white/40" style={{ fontFamily: "var(--font-inter)" }}>
            <span className="flex items-center gap-1.5"><MapPin size={12} className="text-[#E8742C]" /> Da Nang, Vietnam</span>
            <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#E8742C]" /> Open 7am–10pm daily</span>
            <a href="https://wa.me/84905955161" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={12} className="text-[#E8742C]" /> +84 905 955 161
            </a>
            <a href="mailto:stowdanang@gmail.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={12} className="text-[#E8742C]" /> stowdanang@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p
            className="text-[13px] text-white/25"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            © 2026 Stow — Luggage Storage Da Nang. All rights reserved.
          </p>
          <p
            className="text-[12px] text-white/20 italic"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Drop off. Tag on. Go free.
          </p>
        </div>
      </div>
    </footer>
  );
}
