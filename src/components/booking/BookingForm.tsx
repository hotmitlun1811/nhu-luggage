"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Send, ArrowRight, Zap, Tag, Clock, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Lane = "flexible" | "flatrate";
type PlanKey = "hourly" | "daily" | "mini" | "standard" | "longstay";

const PLANS: Record<PlanKey, {
  name: string;
  price: number;
  unit: string;
  duration: string;
  lane: Lane;
  oversizeSurcharge: number;
  popular?: boolean;
}> = {
  hourly:   { name: "By the Hour", price: 15000,  unit: "/ hr",  duration: "Minimum 1 hour, billed per hour", lane: "flexible", oversizeSurcharge: 30000 },
  daily:    { name: "By the Day",  price: 60000,  unit: "/ day", duration: "Up to 24 hours from drop-off",    lane: "flexible", oversizeSurcharge: 30000, popular: true },
  mini:     { name: "Mini",        price: 150000, unit: "flat",  duration: "Up to 1 week",                    lane: "flatrate", oversizeSurcharge: 50000 },
  standard: { name: "Standard",    price: 300000, unit: "flat",  duration: "Up to 1 month",                   lane: "flatrate", oversizeSurcharge: 50000, popular: true },
  longstay: { name: "Long Stay",   price: 500000, unit: "flat",  duration: "Up to 3 months",                  lane: "flatrate", oversizeSurcharge: 50000 },
};

const FLEX_PLANS: PlanKey[] = ["hourly", "daily"];
const FLAT_PLANS: PlanKey[] = ["mini", "standard", "longstay"];

function vnd(n: number) {
  return n.toLocaleString("vi-VN") + " ₫";
}

function generateSlots() {
  const s: string[] = [];
  for (let h = 7; h <= 21; h++) {
    s.push(`${String(h).padStart(2, "0")}:00`);
    s.push(`${String(h).padStart(2, "0")}:30`);
  }
  s.push("22:00");
  return s;
}
const TIME_SLOTS = generateSlots();

export default function BookingForm() {
  const today = new Date().toISOString().split("T")[0];

  const [lane, setLane]           = useState<Lane>("flexible");
  const [plan, setPlan]           = useState<PlanKey>("daily");
  const [oversized, setOversized] = useState(false);
  const [date, setDate]           = useState("");
  const [time, setTime]           = useState("");
  const [name, setName]           = useState("");
  const [phone, setPhone]         = useState("");
  const [consent, setConsent]     = useState(false);
  const [loading, setLoading]     = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors]       = useState<Record<string, string>>({});

  function switchLane(l: Lane) {
    setLane(l);
    setPlan(l === "flexible" ? "daily" : "standard");
  }

  const cur = PLANS[plan];

  const total = useMemo(() => {
    return cur.price + (oversized ? cur.oversizeSurcharge : 0);
  }, [cur, oversized]);

  function clearError(key: string) {
    setErrors(prev => { const n = { ...prev }; delete n[key]; return n; });
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!date)         e.date    = "Select a drop-off date";
    if (!time)         e.time    = "Select a drop-off time";
    if (!name.trim())  e.name    = "Enter your name";
    if (!phone.trim()) e.phone   = "Enter your WhatsApp number";
    if (!consent)      e.consent = "Please agree to the terms to continue";
    return e;
  }

  function buildMessage() {
    const dateLabel = date
      ? new Date(date + "T12:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" })
      : "TBD";
    return [
      `Hello Stow! 👋 I'd like to book luggage storage.`,
      ``,
      `📦 Plan: ${cur.name} — ${vnd(cur.price)}${cur.unit === "flat" ? " flat fee" : cur.unit}`,
      oversized ? `📏 Item: Oversized (+${vnd(cur.oversizeSurcharge)})` : `📏 Item: Standard size`,
      `📅 Drop-off: ${dateLabel} at ${time}`,
      `💰 Total: ${vnd(total)}`,
      ``,
      `👤 Name: ${name}`,
      `📱 WhatsApp: ${phone}`,
      ``,
      `Please confirm my booking. Thank you! 🙏`,
    ].join("\n");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      document.getElementById(`field-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setErrors({});
    setLoading(true);
    window.open(`https://wa.me/84905955161?text=${encodeURIComponent(buildMessage())}`, "_blank", "noopener,noreferrer");
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 600);
  }

  if (submitted) {
    return (
      <motion.div
        className="min-h-[50vh] flex flex-col items-center justify-center text-center px-8 py-24"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-6 border border-emerald-100">
          <CheckCircle2 size={30} className="text-emerald-500" strokeWidth={1.75} />
        </div>
        <h2 className="text-[28px] lg:text-[36px] font-bold text-[#16243F] mb-3" style={{ fontFamily: "var(--font-poppins)" }}>
          Request sent to Stow!
        </h2>
        <p className="text-[15px] text-[#4B5563] max-w-sm leading-relaxed mb-8" style={{ fontFamily: "var(--font-inter)" }}>
          Your details are now in WhatsApp. Here&apos;s what happens next:
        </p>

        {/* What happens next */}
        <div className="flex flex-col gap-3 w-full max-w-sm mb-10 text-left">
          {[
            { step: "1", text: "We reply within 15 minutes to confirm your spot." },
            { step: "2", text: "Walk in at your drop-off time and show your WhatsApp confirmation." },
            { step: "3", text: "We tag your bag and you’re out in under 3 minutes." },
          ].map(({ step, text }) => (
            <div key={step} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#16243F] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[11px] font-bold text-white" style={{ fontFamily: "var(--font-poppins)" }}>{step}</span>
              </div>
              <p className="text-[14px] text-[#4B5563] leading-snug" style={{ fontFamily: "var(--font-inter)" }}>{text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#E8742C] text-white font-semibold text-[14px] px-7 py-3 rounded-xl hover:bg-[#C85E1E] transition-colors"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Back to home <ArrowRight size={14} />
          </Link>
          <button
            onClick={() => setSubmitted(false)}
            className="text-[14px] border border-[#E8E8E4] text-[#16243F] font-medium px-7 py-3 rounded-xl hover:bg-[#F4F4F0] transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Edit booking
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">

        {/* ── Left: form sections ── */}
        <div className="flex flex-col gap-5">

          {/* 01 · Choose plan */}
          <div className="bg-white rounded-2xl p-7 border border-[#F0F0EC]">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#E8742C] mb-5" style={{ fontFamily: "var(--font-poppins)" }}>
              01 · Choose a plan
            </p>

            {/* Lane — two clearly separate options */}
            <div className="flex gap-1.5 mb-5 p-1 bg-[#F4F4F0] rounded-xl w-fit">
              {(["flexible", "flatrate"] as Lane[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => switchLane(l)}
                  className={`px-5 py-2 rounded-lg text-[13px] font-semibold transition-all ${
                    lane === l ? "bg-white text-[#16243F] shadow-sm" : "text-[#9CA3AF] hover:text-[#6B7280]"
                  }`}
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {l === "flexible" ? "Flexible" : "Flat Rate"}
                </button>
              ))}
            </div>

            {/* Plan cards */}
            <AnimatePresence mode="wait">
              <motion.div
                key={lane}
                className="flex flex-col gap-2.5"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {(lane === "flexible" ? FLEX_PLANS : FLAT_PLANS).map((pk) => {
                  const p = PLANS[pk];
                  const selected = plan === pk;
                  return (
                    <button
                      key={pk}
                      type="button"
                      onClick={() => setPlan(pk)}
                      className={`relative flex items-center justify-between px-5 py-3.5 rounded-xl border text-left transition-all ${
                        selected ? "border-[#E8742C] bg-[#FFF8F4]" : "border-[#EFEFED] bg-[#F9F9F7] hover:border-[#E8742C]/40"
                      }`}
                    >
                      {p.popular && (
                        <span className="absolute -top-2.5 right-4 bg-[#E8742C] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wide" style={{ fontFamily: "var(--font-poppins)" }}>
                          Best value
                        </span>
                      )}
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${selected ? "border-[#E8742C]" : "border-[#D1D5DB]"}`}>
                          {selected && <div className="w-2 h-2 rounded-full bg-[#E8742C]" />}
                        </div>
                        <div>
                          <p className="text-[14.5px] font-semibold text-[#16243F]" style={{ fontFamily: "var(--font-poppins)" }}>{p.name}</p>
                          <p className="text-[12px] text-[#9CA3AF]" style={{ fontFamily: "var(--font-inter)" }}>{p.duration}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <p className="text-[17px] font-bold text-[#16243F]" style={{ fontFamily: "var(--font-poppins)" }}>{vnd(p.price)}</p>
                        <p className="text-[11px] text-[#9CA3AF]" style={{ fontFamily: "var(--font-inter)" }}>{p.unit}</p>
                      </div>
                    </button>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Oversized toggle */}
            <div className="flex items-center justify-between mt-5 pt-5 border-t border-[#F0F0EC]">
              <div>
                <p className="text-[14px] font-semibold text-[#16243F]" style={{ fontFamily: "var(--font-poppins)" }}>
                  Oversized item?
                </p>
                <p className="text-[12px] text-[#9CA3AF] mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
                  28″+ suitcase, bicycle, surfboard, large box — +{vnd(cur.oversizeSurcharge)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOversized(!oversized)}
                aria-pressed={oversized}
                className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ml-4 ${oversized ? "bg-[#E8742C]" : "bg-[#D1D5DB]"}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all ${oversized ? "left-[calc(100%_-_22px)]" : "left-0.5"}`} />
              </button>
            </div>
          </div>

          {/* 02 · Drop-off time */}
          <div className="bg-white rounded-2xl p-7 border border-[#F0F0EC]">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#E8742C] mb-5" style={{ fontFamily: "var(--font-poppins)" }}>
              02 · Drop-off time
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="field-date" className="block text-[12.5px] font-semibold text-[#16243F] mb-2" style={{ fontFamily: "var(--font-poppins)" }}>
                  Date <span className="text-red-400">*</span>
                </label>
                <input
                  id="field-date"
                  type="date"
                  value={date}
                  min={today}
                  onChange={(e) => { setDate(e.target.value); clearError("date"); }}
                  className={`w-full px-5 py-3 rounded-xl border text-[14px] text-[#16243F] bg-[#F9F9F7] focus:outline-none focus:border-[#E8742C] transition-colors ${errors.date ? "border-red-400" : "border-[#EFEFED]"}`}
                  style={{ fontFamily: "var(--font-inter)" }}
                />
                {errors.date && <p className="text-[12px] text-red-500 mt-1.5">{errors.date}</p>}
              </div>
              <div>
                <label htmlFor="field-time" className="block text-[12.5px] font-semibold text-[#16243F] mb-2" style={{ fontFamily: "var(--font-poppins)" }}>
                  Time <span className="text-red-400">*</span>
                </label>
                <select
                  id="field-time"
                  value={time}
                  onChange={(e) => { setTime(e.target.value); clearError("time"); }}
                  className={`w-full px-5 py-3 rounded-xl border text-[14px] text-[#16243F] bg-[#F9F9F7] focus:outline-none focus:border-[#E8742C] transition-colors ${errors.time ? "border-red-400" : "border-[#EFEFED]"}`}
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  <option value="">Select time…</option>
                  {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                {errors.time && <p className="text-[12px] text-red-500 mt-1.5">{errors.time}</p>}
              </div>
            </div>
          </div>

          {/* 03 · Contact info */}
          <div className="bg-white rounded-2xl p-7 border border-[#F0F0EC]">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#E8742C] mb-5" style={{ fontFamily: "var(--font-poppins)" }}>
              03 · Contact info
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="field-name" className="block text-[12.5px] font-semibold text-[#16243F] mb-2" style={{ fontFamily: "var(--font-poppins)" }}>
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="field-name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  autoComplete="name"
                  onChange={(e) => { setName(e.target.value); clearError("name"); }}
                  className={`w-full px-4 py-3 rounded-xl border text-[14px] text-[#16243F] bg-[#F9F9F7] placeholder-[#C4C4BC] focus:outline-none focus:border-[#E8742C] transition-colors ${errors.name ? "border-red-400" : "border-[#EFEFED]"}`}
                  style={{ fontFamily: "var(--font-inter)" }}
                />
                {errors.name && <p className="text-[12px] text-red-500 mt-1.5">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="field-phone" className="block text-[12.5px] font-semibold text-[#16243F] mb-2" style={{ fontFamily: "var(--font-poppins)" }}>
                  WhatsApp / Phone <span className="text-red-400">*</span>
                </label>
                <input
                  id="field-phone"
                  type="tel"
                  placeholder="+84 or your number"
                  value={phone}
                  autoComplete="tel"
                  onChange={(e) => { setPhone(e.target.value); clearError("phone"); }}
                  className={`w-full px-4 py-3 rounded-xl border text-[14px] text-[#16243F] bg-[#F9F9F7] placeholder-[#C4C4BC] focus:outline-none focus:border-[#E8742C] transition-colors ${errors.phone ? "border-red-400" : "border-[#EFEFED]"}`}
                  style={{ fontFamily: "var(--font-inter)" }}
                />
                {errors.phone && <p className="text-[12px] text-red-500 mt-1.5">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Consent — mobile */}
          <label className="lg:hidden flex items-start gap-3 cursor-pointer select-none">
            <div className="relative flex-shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => { setConsent(e.target.checked); clearError("consent"); }}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                consent ? "bg-[#E8742C] border-[#E8742C]" : errors.consent ? "border-red-400 bg-white" : "border-[#D1D5DB] bg-white"
              }`}>
                {consent && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-[13px] text-[#6B7280] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              By submitting this form I confirm that I have read and agree to Stow&apos;s{" "}
              <a href="#trust-safety" className="text-[#E8742C] underline underline-offset-2 hover:text-[#C85E1E]">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#trust-safety" className="text-[#E8742C] underline underline-offset-2 hover:text-[#C85E1E]">
                Privacy Policy
              </a>
              , including the item acceptance policy and liability terms.
            </span>
          </label>
          {errors.consent && (
            <p className="lg:hidden text-[12px] text-red-500 -mt-2" style={{ fontFamily: "var(--font-inter)" }}>{errors.consent}</p>
          )}

          {/* Mobile submit */}
          <button
            type="submit"
            disabled={loading}
            className="lg:hidden w-full flex items-center justify-center gap-2.5 bg-[#E8742C] hover:bg-[#C85E1E] disabled:opacity-70 text-white font-semibold text-[15px] py-4 rounded-xl transition-colors"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Opening WhatsApp…
              </span>
            ) : (
              <><Send size={16} /> Confirm via WhatsApp</>
            )}
          </button>
        </div>

        {/* ── Right: sticky summary ── */}
        <div className="hidden lg:flex flex-col gap-4 sticky top-24">
          <div className="bg-[#16243F] rounded-2xl p-7 text-white">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/35 mb-5" style={{ fontFamily: "var(--font-poppins)" }}>
              Booking summary
            </p>

            <div className="flex items-start justify-between pb-5 border-b border-white/10 mb-5">
              <div>
                <p className="text-[15px] font-semibold text-white" style={{ fontFamily: "var(--font-poppins)" }}>{cur.name}</p>
                <p className="text-[12px] text-white/40 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>{cur.duration}</p>
              </div>
              <div className="text-right ml-4 flex-shrink-0">
                <p className="text-[16px] font-bold text-white" style={{ fontFamily: "var(--font-poppins)" }}>{vnd(cur.price)}</p>
                <p className="text-[11px] text-white/35">{cur.unit}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 pb-5 border-b border-white/10 mb-5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-white/45" style={{ fontFamily: "var(--font-inter)" }}>Drop-off</span>
                <span className="text-[13px] text-white" style={{ fontFamily: "var(--font-inter)" }}>
                  {date ? new Date(date + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "—"}{time ? ` · ${time}` : ""}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-white/45" style={{ fontFamily: "var(--font-inter)" }}>Item size</span>
                <span className="text-[13px] text-white" style={{ fontFamily: "var(--font-inter)" }}>{oversized ? "Oversized" : "Standard"}</span>
              </div>
              {oversized && (
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-white/45" style={{ fontFamily: "var(--font-inter)" }}>Surcharge</span>
                  <span className="text-[13px] text-[#E8742C]" style={{ fontFamily: "var(--font-inter)" }}>+{vnd(cur.oversizeSurcharge)}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mb-6">
              <span className="text-[14px] font-semibold text-white" style={{ fontFamily: "var(--font-poppins)" }}>
                {cur.unit === "flat" ? "Total" : "Starting from"}
              </span>
              <span className="text-[24px] font-bold text-[#E8742C]" style={{ fontFamily: "var(--font-poppins)" }}>{vnd(total)}</span>
            </div>

            {/* Consent — desktop */}
            <label className="flex items-start gap-3 cursor-pointer select-none mb-4">
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => { setConsent(e.target.checked); clearError("consent"); }}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                  consent ? "bg-[#E8742C] border-[#E8742C]" : errors.consent ? "border-red-400 bg-white/10" : "border-white/25 bg-white/8"
                }`}>
                  {consent && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-[12px] text-white/45 leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                I agree to Stow&apos;s{" "}
                <a href="#trust-safety" className="text-white/70 underline underline-offset-2 hover:text-white">
                  Terms of Service
                </a>{" "}
                &amp;{" "}
                <a href="#trust-safety" className="text-white/70 underline underline-offset-2 hover:text-white">
                  Privacy Policy
                </a>
                , including the item acceptance and liability terms.
              </span>
            </label>
            {errors.consent && (
              <p className="text-[12px] text-red-400 -mt-3 mb-3" style={{ fontFamily: "var(--font-inter)" }}>{errors.consent}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 bg-[#E8742C] hover:bg-[#C85E1E] disabled:opacity-70 text-white font-semibold text-[15px] py-4 rounded-xl transition-colors"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  Opening WhatsApp…
                </span>
              ) : (
                <><Send size={16} /> Confirm via WhatsApp</>
              )}
            </button>
            <p className="text-[11.5px] text-white/25 text-center mt-3" style={{ fontFamily: "var(--font-inter)" }}>
              Opens WhatsApp · We reply within 15 minutes
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#F0F0EC] flex flex-col gap-3">
            {([
              { Icon: Zap,   text: "Drop-off in under 3 minutes" },
              { Icon: Tag,   text: "Unique ID tag on every bag" },
              { Icon: Clock, text: "Open 7am – 10pm daily" },
            ] as const).map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#FFF0E6] flex items-center justify-center flex-shrink-0">
                  <Icon size={13} className="text-[#E8742C]" strokeWidth={1.75} />
                </div>
                <span className="text-[13px] text-[#4B5563]" style={{ fontFamily: "var(--font-inter)" }}>{text}</span>
              </div>
            ))}
          </div>

          <div className="bg-[#F4F4F0] rounded-xl px-5 py-4 border border-[#EAEAEA]">
            <p className="text-[12.5px] text-[#6B7280] leading-snug" style={{ fontFamily: "var(--font-inter)" }}>
              Storing multiple bags, or have a question?{" "}
              <a
                href="https://wa.me/84905955161"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E8742C] font-medium hover:underline"
              >
                WhatsApp us first
              </a>{" "}
              and we&apos;ll sort everything out together.
            </p>
          </div>
        </div>

      </div>
    </form>
  );
}
