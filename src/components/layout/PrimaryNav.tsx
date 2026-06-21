"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing",      href: "#pricing" },
  { label: "Location",     href: "#location" },
  { label: "Trust & Safety", href: "#trust-safety" },
];

export default function PrimaryNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (!el) return;
    const offset = 72; // nav height
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white border-b border-[#EAEAE6] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center gap-10">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center">
          <Image
            src="/logo-final.png"
            alt="Stow — Luggage Storage Da Nang"
            width={180}
            height={68}
            className="h-[64px] w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2 flex-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className={`text-[11.5px] font-bold uppercase tracking-[0.07em] transition-colors whitespace-nowrap px-6 py-1 ${
                scrolled
                  ? "text-[#6B7280] hover:text-[#16243F]"
                  : "text-white/80 hover:text-white"
              }`}
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-5">
          <a
            href="https://wa.me/84905955161"
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden lg:flex items-center gap-2 text-[14px] font-medium transition-colors whitespace-nowrap ${
              scrolled
                ? "text-[#6B7280] hover:text-[#16243F]"
                : "text-white/80 hover:text-white"
            }`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <svg className="w-4 h-4 text-[#25D366] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.843L.057 23.547a.75.75 0 00.914.914l5.703-1.453A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.487-5.254-1.341l-.375-.212-3.888.99.99-3.89-.213-.374A9.952 9.952 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            Chat with us
          </a>

          <Link
            href="/book"
            className="inline-flex items-center justify-center bg-[#E8742C] text-white text-[12px] font-bold px-6 py-2.5 rounded-[4px] hover:bg-[#C85E1E] transition-colors whitespace-nowrap tracking-[0.07em] uppercase"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Book Now
          </Link>

          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled
                ? "text-[#16243F] hover:bg-[#F4F4F0]"
                : "text-white hover:bg-white/10"
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#EAEAE6] px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className="text-[16px] font-medium text-[#16243F] hover:text-[#E8742C] transition-colors"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-[#EAEAE6] flex flex-col gap-3">
            <a
              href="https://wa.me/84905955161"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[15px] text-[#6B7280]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.549 4.107 1.51 5.843L.057 23.547a.75.75 0 00.914.914l5.703-1.453A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.487-5.254-1.341l-.375-.212-3.888.99.99-3.89-.213-.374A9.952 9.952 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Chat with us
            </a>
            <Link
              href="/book"
              className="inline-flex items-center justify-center bg-[#E8742C] text-white text-[15px] font-semibold px-5 py-3 rounded-lg hover:bg-[#C85E1E] transition-colors"
              style={{ fontFamily: "var(--font-poppins)" }}
              onClick={() => setMenuOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
