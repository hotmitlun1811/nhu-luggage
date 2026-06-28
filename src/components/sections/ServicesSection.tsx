"use client";

import { useState } from "react";
import { Truck, PlaneTakeoff, Hotel, BatteryCharging, Wifi, Coffee, Printer, ArrowRight } from "lucide-react";

const NAV_H = 72; // fixed nav height in px

const services = [
  {
    Icon: Truck,
    title: "Pickup & Delivery",
    subtitle: "We come to you",
    description: "WhatsApp us your hotel or address — we collect your bags and bring them back when you need them.",
    image: "/images/service-pickup.jpg",
    overlay: "rgba(22,36,63,0.62)",
  },
  {
    Icon: PlaneTakeoff,
    title: "Airport Transfer",
    subtitle: "Straight to the gate",
    description: "Flying out? We deliver your bags directly to Da Nang Airport so you can head straight to check-in.",
    image: "/images/service-airport.jpg",
    overlay: "rgba(100,40,10,0.58)",
  },
  {
    Icon: Hotel,
    title: "Hotel Delivery",
    subtitle: "Door to door",
    description: "Checked into a new place? We'll deliver your bags to your hotel lobby at a time that works for you.",
    image: "/images/service-hotel.jpg",
    overlay: "rgba(20,45,25,0.60)",
  },
];

const addons = [
  { Icon: BatteryCharging, label: "Phone charging" },
  { Icon: Wifi, label: "Free Wi-Fi" },
  { Icon: Coffee, label: "Drinking water" },
  { Icon: Printer, label: "Boarding pass print" },
];

export default function ServicesSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="services" className="w-full">

      {/* ── Desktop: full-height horizontal panels ── */}
      <div className="hidden lg:flex" style={{ height: "100vh", minHeight: "640px" }}>

        {/* Left info panel */}
        <div
          className="flex-shrink-0 bg-[#0D1829] flex flex-col justify-between"
          style={{
            width: "28%",
            paddingTop: `${NAV_H + 40}px`,
            paddingBottom: "clamp(40px, 4vw, 64px)",
            paddingLeft: "clamp(40px, 4vw, 64px)",
            paddingRight: "clamp(40px, 4vw, 64px)",
          }}
        >
          <div>
            <p
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8742C] mb-6"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              More than storage
            </p>
            <h2
              className="text-white font-bold leading-[1.06] mb-6"
              style={{
                fontFamily: "var(--font-poppins)",
                fontSize: "32px",
                letterSpacing: "-0.03em",
              }}
            >
              We go where<br />you need us.
            </h2>
            <p
              className="text-[14px] text-white/50 leading-relaxed"
              style={{ fontFamily: "var(--font-inter)", maxWidth: "240px" }}
            >
              Storage is the core. But when your itinerary demands it, we handle pickup, delivery, and the little things that make travel smoother.
            </p>
          </div>

          <div>
            {/* Service index */}
            <div className="flex flex-col gap-3 mb-8">
              {services.map((s, i) => (
                <button
                  key={s.title}
                  className={`flex items-center gap-3 text-left transition-colors ${
                    hovered === i ? "text-white" : "text-white/35 hover:text-white/60"
                  }`}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span
                    className="text-[11px] font-bold tabular-nums"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[14px]" style={{ fontFamily: "var(--font-inter)" }}>
                    {s.title}
                  </span>
                </button>
              ))}
            </div>

            {/* Add-ons */}
            <div className="border-t border-white/8 pt-6 mb-6">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#E8742C] mb-3"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Free while you wait
              </p>
              <div className="flex flex-col gap-2">
                {addons.map(({ Icon, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon size={12} className="text-white/30" strokeWidth={1.75} />
                    <span className="text-[12px] text-white/40" style={{ fontFamily: "var(--font-inter)" }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#booking"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 border border-white/20 text-white text-[13px] font-semibold px-6 py-3 rounded-lg hover:bg-white/8 transition-colors"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Book storage now <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Service panels */}
        <div className="flex flex-1 overflow-hidden">
          {services.map((svc, i) => (
            <div
              key={svc.title}
              className="relative flex flex-col justify-between overflow-hidden"
              style={{
                backgroundImage: `linear-gradient(to top, ${svc.overlay} 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.15) 100%), url('${svc.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                flex: hovered === i ? "1.7 1 0" : "1 1 0",
                transition: "flex 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                paddingTop: `${NAV_H + 28}px`,
                paddingBottom: "clamp(28px, 3.5vw, 52px)",
                paddingLeft: "clamp(24px, 3vw, 44px)",
                paddingRight: "clamp(24px, 3vw, 44px)",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Top row */}
              <div className="relative z-10 flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <svc.Icon size={22} className="text-white" strokeWidth={1.5} />
                </div>
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/70 bg-black/25 backdrop-blur-sm px-3 py-1 rounded-full"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  On Request
                </span>
              </div>

              {/* Bottom row */}
              <div className="relative z-10">
                <p
                  className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/50 mb-2"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {svc.subtitle}
                </p>
                <h3
                  className="text-white font-bold leading-[1.06]"
                  style={{
                    fontFamily: "var(--font-poppins)",
                    fontSize: "clamp(22px, 2.4vw, 40px)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {svc.title}
                </h3>

                {/* Description — slides in on hover */}
                <div
                  style={{
                    maxHeight: hovered === i ? "160px" : "0px",
                    opacity: hovered === i ? 1 : 0,
                    transition:
                      hovered === i
                        ? "max-height 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease 0.1s"
                        : "max-height 0.3s ease, opacity 0.15s ease",
                    overflow: "hidden",
                  }}
                >
                  <p
                    className="text-[13.5px] text-white/80 leading-relaxed mt-4 mb-4"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {svc.description}
                  </p>
                  <a
                    href="https://wa.me/84905955161"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white hover:text-white/80 transition-colors"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    WhatsApp to arrange <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Mobile: stacked cards ── */}
      <div className="lg:hidden bg-[#0D1829] py-16">
        <div className="max-w-[1280px] mx-auto px-6">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8742C] mb-3"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            More than storage
          </p>
          <h2
            className="text-white font-bold leading-[1.06] mb-5"
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "clamp(28px, 7vw, 44px)",
              letterSpacing: "-0.03em",
            }}
          >
            We go where you need us.
          </h2>
          <p
            className="text-[14px] text-white/50 leading-relaxed mb-10"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Storage is the core. But when your itinerary demands it, we handle pickup, delivery, and the little things that make travel smoother.
          </p>

          <div className="flex flex-col gap-4 mb-6">
            {services.map((svc) => (
              <div
                key={svc.title}
                className="rounded-2xl overflow-hidden"
                style={{ minHeight: "220px", position: "relative" }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `linear-gradient(to top, ${svc.overlay} 0%, rgba(0,0,0,0.2) 100%), url('${svc.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="relative z-10 p-7 flex flex-col gap-4 h-full">
                  <div className="flex items-start justify-between">
                    <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                      <svc.Icon size={20} className="text-white" strokeWidth={1.5} />
                    </div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/60 bg-black/25 px-2.5 py-1 rounded-full"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      On Request
                    </span>
                  </div>
                  <div className="mt-auto">
                    <p
                      className="text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50 mb-1"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {svc.subtitle}
                    </p>
                    <h3
                      className="text-white font-bold mb-3"
                      style={{
                        fontFamily: "var(--font-poppins)",
                        fontSize: "22px",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {svc.title}
                    </h3>
                    <p
                      className="text-[13.5px] text-white/70 leading-relaxed mb-3"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {svc.description}
                    </p>
                    <a
                      href="https://wa.me/84905955161"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-white"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      WhatsApp to arrange <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add-ons strip */}
          <div className="rounded-2xl bg-white/5 border border-white/8 px-6 py-5 mb-6">
            <p
              className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#E8742C] mb-3"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Free while you wait
            </p>
            <div className="flex flex-wrap gap-4">
              {addons.map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon size={13} className="text-[#E8742C]" strokeWidth={1.75} />
                  <span className="text-[13px] text-white/60" style={{ fontFamily: "var(--font-inter)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <a
            href="#booking"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 bg-[#E8742C] text-white text-[14px] font-semibold px-6 py-3.5 rounded-lg hover:bg-[#C85E1E] transition-colors"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Book storage now <ArrowRight size={14} />
          </a>
        </div>
      </div>

    </section>
  );
}
