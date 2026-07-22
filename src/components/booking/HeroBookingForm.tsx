"use client";

import { useState, useMemo } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

type Lane = "flexible" | "flatrate";
type PlanKey = "hourly" | "daily" | "mini" | "strand" | "longstay";

const PLANS: Record<PlanKey, {
  name: string;
  price: number;
  unit: string;
  lane: Lane;
  oversizeSurcharge: number;
  maxDays?: number;
  popular?: boolean;
}> = {
  hourly:   { name: "By the Hour", price: 15000,  unit: "/ hr",  lane: "flexible", oversizeSurcharge: 30000 },
  daily:    { name: "By the Day",  price: 60000,  unit: "/ day", lane: "flexible", oversizeSurcharge: 30000, popular: true },
  mini:     { name: "Mini",        price: 150000, unit: "flat",  lane: "flatrate", oversizeSurcharge: 50000, maxDays: 7 },
  strand:   { name: "Strand",      price: 300000, unit: "flat",  lane: "flatrate", oversizeSurcharge: 50000, maxDays: 30, popular: true },
  longstay: { name: "Long Stay",   price: 1000000, unit: "flat",  lane: "flatrate", oversizeSurcharge: 50000, maxDays: 120 },
};

const FLEX_PLANS: PlanKey[] = ["hourly", "daily"];
const FLAT_PLANS: PlanKey[] = ["mini", "strand", "longstay"];

function vnd(n: number) {
  return n.toLocaleString("vi-VN") + " ₫";
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T12:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function fmtShort(dateStr: string): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function fmtLong(dateStr: string): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" });
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

const LABEL = "block text-[10px] font-bold uppercase tracking-[0.12em] text-white/30 mb-1.5";
const INPUT  = "w-full bg-white/[0.07] border border-white/[0.12] rounded-lg px-3 py-2 text-[13px] text-white placeholder-white/25 focus:outline-none focus:border-[#E8742C]/70 transition-colors";
const ERR    = "border-red-400/70";
const EMAIL_RE = /^\S+@\S+\.\S+$/;

type EmailStatus = "idle" | "sending" | "sent" | "error";

export default function HeroBookingForm() {
  const today = new Date().toISOString().split("T")[0];

  const [lane, setLane]             = useState<Lane>("flatrate");
  const [plan, setPlan]             = useState<PlanKey>("strand");
  const [oversized, setOversized]   = useState(false);
  const [date, setDate]             = useState("");
  const [time, setTime]             = useState("");
  const [quantity, setQuantity]     = useState(1);
  const [pax, setPax]               = useState(1);
  const [pickupDate, setPickupDate] = useState("");
  const [name, setName]             = useState("");
  const [phone, setPhone]           = useState("");
  const [email, setEmail]           = useState("");
  const [consent, setConsent]       = useState(false);
  const [loading, setLoading]       = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [errors, setErrors]         = useState<Record<string, string>>({});
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle");
  const [emailError, setEmailError]   = useState("");

  function switchLane(l: Lane) {
    setLane(l);
    setPlan(l === "flexible" ? "daily" : "strand");
    setQuantity(1);
    setPickupDate("");
  }

  function switchPlan(pk: PlanKey) {
    setPlan(pk);
    setQuantity(1);
    setPickupDate("");
  }

  function clearErr(k: string) {
    setErrors(p => { const n = { ...p }; delete n[k]; return n; });
  }

  const cur = PLANS[plan];
  const maxPickup = date && cur.maxDays ? addDays(date, cur.maxDays) : "";

  const total = useMemo(() => {
    const base = (plan === "hourly" || plan === "daily") ? cur.price * quantity : cur.price;
    return base * pax + (oversized ? cur.oversizeSurcharge : 0);
  }, [cur, oversized, plan, quantity, pax]);

  function validate() {
    const e: Record<string, string> = {};
    if (!date)          e.date    = "Required";
    if ((plan === "hourly" || lane === "flatrate") && !time) e.time = "Required";
    if (!name.trim())   e.name    = "Required";
    if (!phone.trim())  e.phone   = "Required";
    if (!email.trim())  e.email   = "Required";
    else if (!EMAIL_RE.test(email.trim())) e.email = "Invalid email";
    if (!pax || pax < 1) e.pax    = "Required";
    if (!consent)       e.consent = "Required";
    return e;
  }

  function buildMessage() {
    let periodLine = "";
    if (plan === "hourly" && date) {
      periodLine = `⏱ Duration: ${quantity} hour${quantity > 1 ? "s" : ""}${time ? ` starting at ${time}` : ""}`;
    } else if (plan === "daily" && date) {
      const pickup = addDays(date, quantity);
      periodLine = `📅 Period: ${fmtShort(date)} → ${fmtShort(pickup)} (${quantity} day${quantity > 1 ? "s" : ""})`;
    } else if (lane === "flatrate" && date && pickupDate) {
      periodLine = `📅 Period: ${fmtShort(date)} → ${fmtShort(pickupDate)}`;
    }

    return [
      `Hello Stow! 👋 I'd like to book luggage storage.`,
      ``,
      `📦 Plan: ${cur.name} — ${vnd(cur.price)}${cur.unit === "flat" ? " flat fee" : cur.unit} / pax`,
      `👥 Pax: ${pax}`,
      oversized ? `📏 Item: Oversized (+${vnd(cur.oversizeSurcharge)})` : `📏 Item: Standard size`,
      `📅 Drop-off: ${date ? fmtLong(date) : "TBD"}${(plan === "hourly" || lane === "flatrate") && time ? ` at ${time}` : ""}`,
      periodLine,
      `💰 Total: ${vnd(total)}`,
      ``,
      `👤 Name: ${name}`,
      `📱 WhatsApp: ${phone}`,
      `✉️ Email: ${email}`,
      ``,
      `Please confirm my booking. Thank you! 🙏`,
    ].filter(Boolean).join("\n");
  }

  async function sendAgreementEmail() {
    setEmailStatus("sending");
    setEmailError("");
    try {
      const res = await fetch("/api/send-agreement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email.trim(),
          name: name.trim(),
          planName: cur.name,
          planDuration: cur.unit === "flat" ? undefined : cur.unit,
          lane,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to send email");
      }
      setEmailStatus("sent");
    } catch (err) {
      setEmailStatus("error");
      setEmailError(err instanceof Error ? err.message : "Failed to send email");
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    window.open(`https://wa.me/84905955161?text=${encodeURIComponent(buildMessage())}`, "_blank", "noopener,noreferrer");
    sendAgreementEmail();
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 600);
  }

  const plans = lane === "flexible" ? FLEX_PLANS : FLAT_PLANS;

  /* ── Success ── */
  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 px-6">
        <div className="w-11 h-11 rounded-full bg-emerald-500/15 flex items-center justify-center mb-4 border border-emerald-500/20">
          <CheckCircle2 size={22} className="text-emerald-400" strokeWidth={1.75} />
        </div>
        <p className="text-white font-bold text-[17px] mb-1.5" style={{ fontFamily: "var(--font-poppins)" }}>
          Request sent!
        </p>
        <p className="text-white/45 text-[13px] leading-snug mb-1" style={{ fontFamily: "var(--font-inter)" }}>
          Your details are now in WhatsApp.
        </p>
        <p className="text-white/30 text-[12px] mb-5" style={{ fontFamily: "var(--font-inter)" }}>
          We reply within 15 minutes.
        </p>

        <div className="flex items-center justify-between w-full max-w-xs px-3 py-2.5 mb-6 bg-white/[0.05] rounded-lg border border-white/[0.09]">
          <div className="text-left min-w-0 mr-3">
            <p className="text-[11.5px] font-semibold text-white/70" style={{ fontFamily: "var(--font-poppins)" }}>
              Policy &amp; agreement email
            </p>
            <p className="text-[11px] text-white/35 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
              {emailStatus === "sending" && `Sending to ${email}…`}
              {emailStatus === "sent" && `Sent to ${email}`}
              {emailStatus === "error" && (emailError || "Failed to send")}
              {emailStatus === "idle" && `Will send to ${email}`}
            </p>
          </div>
          {emailStatus === "error" ? (
            <button
              type="button"
              onClick={sendAgreementEmail}
              className="flex-shrink-0 text-[11px] font-semibold text-[#E8742C] px-2.5 py-1.5 rounded-md border border-[#E8742C]/40"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Retry
            </button>
          ) : (
            <CheckCircle2
              size={16}
              strokeWidth={2}
              className={`flex-shrink-0 ${emailStatus === "sent" ? "text-emerald-400" : "text-white/20"}`}
            />
          )}
        </div>

        <div className="flex gap-2 flex-wrap justify-center">
          <Link
            href="/"
            className="text-[13px] bg-[#E8742C] text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-[#C85E1E] transition-colors"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Back to home
          </Link>
          <button
            onClick={() => setSubmitted(false)}
            className="text-[13px] border border-white/12 text-white/45 px-5 py-2.5 rounded-lg hover:text-white/80 transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Book again
          </button>
        </div>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <form onSubmit={handleSubmit} noValidate className="px-5 pb-5 pt-3 flex flex-col gap-3.5">

      {/* Lane */}
      <div>
        <p className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>Lane</p>
        <div className="flex p-[3px] bg-white/[0.06] rounded-lg border border-white/[0.08] gap-[3px]">
          {(["flatrate", "flexible"] as Lane[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => switchLane(l)}
              className={`flex-1 py-1.5 rounded-md text-[12px] font-semibold transition-all leading-none ${
                lane === l ? "bg-white text-[#0D1829] shadow-sm" : "text-white/35 hover:text-white/60"
              }`}
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {l === "flexible" ? "Flexible" : "Flat Rate"}
            </button>
          ))}
        </div>
      </div>

      {/* Plan */}
      <div>
        <p className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>Plan</p>
        <AnimatePresence mode="wait">
          <motion.div
            key={lane}
            className={`grid gap-1.5 ${plans.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            {plans.map((pk) => {
              const p   = PLANS[pk];
              const sel = plan === pk;
              return (
                <button
                  key={pk}
                  type="button"
                  onClick={() => switchPlan(pk)}
                  className={`relative flex flex-col items-start px-3 py-2 rounded-lg border transition-all text-left ${
                    sel ? "bg-[#E8742C] border-[#E8742C]" : "bg-white/[0.05] border-white/[0.10] hover:border-white/20"
                  }`}
                >
                  {p.popular && (
                    <span
                      className="absolute -top-1.5 right-2 bg-white text-[#E8742C] text-[8px] font-bold px-1.5 rounded-full leading-[1.6]"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      TOP
                    </span>
                  )}
                  <p className="text-[12px] font-semibold text-white leading-snug" style={{ fontFamily: "var(--font-poppins)" }}>
                    {p.name}
                  </p>
                  <p
                    className={`text-[11px] font-bold mt-0.5 ${sel ? "text-white/70" : "text-[#E8742C]"}`}
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {vnd(p.price)}<span className="font-medium opacity-70"> / pax</span>
                  </p>
                </button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Laptop notice for flexible plans */}
      {lane === "flexible" && (
        <p className="text-[11px] text-white/35 -mt-1" style={{ fontFamily: "var(--font-inter)" }}>
          Laptops and electronics accepted on flexible plans.
        </p>
      )}

      {/* Date / period fields — adapt per plan */}
      <AnimatePresence mode="wait">
        {lane === "flexible" ? (
          <motion.div
            key="flexible-dates"
            className="flex flex-col gap-2"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            {/* Row 1: Date + Time */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>
                  Drop-off date{errors.date && <span className="text-red-400/80 normal-case tracking-normal ml-1">({errors.date})</span>}
                </label>
                <input
                  type="date"
                  value={date}
                  min={today}
                  onChange={(e) => { setDate(e.target.value); clearErr("date"); }}
                  className={`${INPUT} ${errors.date ? ERR : ""}`}
                  style={{ fontFamily: "var(--font-inter)", colorScheme: "dark" }}
                />
              </div>
              <div>
                <label className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>
                  Time{plan === "hourly" && errors.time && <span className="text-red-400/80 normal-case tracking-normal ml-1">({errors.time})</span>}
                </label>
                <select
                  value={time}
                  onChange={(e) => { setTime(e.target.value); clearErr("time"); }}
                  className={`${INPUT} ${plan === "hourly" && errors.time ? ERR : ""}`}
                  style={{ fontFamily: "var(--font-inter)", colorScheme: "dark" }}
                >
                  <option value="">Select…</option>
                  {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {/* Row 2: Quantity + pickup summary */}
            <div className="grid grid-cols-2 gap-2 items-end">
              <div>
                <label className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>
                  {plan === "hourly" ? "How many hours?" : "How many days?"}
                </label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className={INPUT}
                  style={{ fontFamily: "var(--font-inter)", colorScheme: "dark" }}
                >
                  {plan === "hourly"
                    ? Array.from({ length: 15 }, (_, i) => i + 1).map((h) => (
                        <option key={h} value={h}>{h} hr{h > 1 ? "s" : ""}</option>
                      ))
                    : Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={d}>{d} day{d > 1 ? "s" : ""}</option>
                      ))
                  }
                </select>
              </div>
              {plan === "daily" && date && (
                <div className="pb-[9px]">
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.1em] mb-1" style={{ fontFamily: "var(--font-poppins)" }}>
                    Pickup by
                  </p>
                  <p className="text-[14px] text-white font-bold" style={{ fontFamily: "var(--font-poppins)" }}>
                    {fmtShort(addDays(date, quantity))}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="flatrate-dates"
            className="grid grid-cols-3 gap-2"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            <div>
              <label className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>
                Drop-off{errors.date && <span className="text-red-400/80 normal-case tracking-normal ml-1">({errors.date})</span>}
              </label>
              <input
                type="date"
                value={date}
                min={today}
                onChange={(e) => { setDate(e.target.value); setPickupDate(""); clearErr("date"); }}
                className={`${INPUT} ${errors.date ? ERR : ""}`}
                style={{ fontFamily: "var(--font-inter)", colorScheme: "dark" }}
              />
            </div>
            <div>
              <label className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>
                Bring at{errors.time && <span className="text-red-400/80 normal-case tracking-normal ml-1">({errors.time})</span>}
              </label>
              <select
                value={time}
                onChange={(e) => { setTime(e.target.value); clearErr("time"); }}
                className={`${INPUT} ${errors.time ? ERR : ""}`}
                style={{ fontFamily: "var(--font-inter)", colorScheme: "dark" }}
              >
                <option value="">Select…</option>
                {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>
                Pickup
              </label>
              <input
                type="date"
                value={pickupDate}
                min={date || today}
                max={maxPickup || undefined}
                onChange={(e) => setPickupDate(e.target.value)}
                className={INPUT}
                style={{ fontFamily: "var(--font-inter)", colorScheme: "dark" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name + WhatsApp + Email */}
      <div className="grid grid-cols-3 gap-2">
        <div>
          <label className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>
            Name{errors.name && <span className="text-red-400/80 normal-case tracking-normal ml-1">({errors.name})</span>}
          </label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            autoComplete="name"
            onChange={(e) => { setName(e.target.value); clearErr("name"); }}
            className={`${INPUT} ${errors.name ? ERR : ""}`}
            style={{ fontFamily: "var(--font-inter)" }}
          />
        </div>
        <div>
          <label className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>
            WhatsApp{errors.phone && <span className="text-red-400/80 normal-case tracking-normal ml-1">({errors.phone})</span>}
          </label>
          <input
            type="tel"
            placeholder="+84 or local"
            value={phone}
            autoComplete="tel"
            onChange={(e) => { setPhone(e.target.value); clearErr("phone"); }}
            className={`${INPUT} ${errors.phone ? ERR : ""}`}
            style={{ fontFamily: "var(--font-inter)" }}
          />
        </div>
        <div>
          <label className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>
            Email{errors.email && <span className="text-red-400/80 normal-case tracking-normal ml-1">({errors.email})</span>}
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            autoComplete="email"
            onChange={(e) => { setEmail(e.target.value); clearErr("email"); }}
            className={`${INPUT} ${errors.email ? ERR : ""}`}
            style={{ fontFamily: "var(--font-inter)" }}
          />
        </div>
      </div>

      {/* Pax + Oversized */}
      <div className="grid grid-cols-[110px_1fr] gap-2">
        <div>
          <label className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>
            Pax{errors.pax && <span className="text-red-400/80 normal-case tracking-normal ml-1">({errors.pax})</span>}
          </label>
          <input
            type="number"
            min={1}
            step={1}
            value={pax}
            onChange={(e) => { setPax(Math.max(1, Math.floor(Number(e.target.value)) || 1)); clearErr("pax"); }}
            className={`${INPUT} ${errors.pax ? ERR : ""}`}
            style={{ fontFamily: "var(--font-inter)" }}
          />
        </div>

        <div className="flex items-center justify-between px-3 py-2.5 bg-white/[0.05] rounded-lg border border-white/[0.09]">
          <div className="min-w-0 mr-3">
            <p className="text-[12.5px] font-semibold text-white/80 leading-none" style={{ fontFamily: "var(--font-poppins)" }}>
              Oversized?
            </p>
            <p className="text-[11px] text-white/28 mt-1 leading-snug" style={{ fontFamily: "var(--font-inter)" }}>
              28″+, bike, surfboard · +{vnd(cur.oversizeSurcharge)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOversized(!oversized)}
            aria-pressed={oversized}
            className={`relative w-9 h-[19px] rounded-full transition-colors flex-shrink-0 ${oversized ? "bg-[#E8742C]" : "bg-white/15"}`}
          >
            <span
              className={`absolute top-[2px] w-[15px] h-[15px] rounded-full bg-white shadow-sm transition-all ${
                oversized ? "left-[calc(100%_-_17px)]" : "left-[2px]"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="flex items-center justify-between pt-0.5">
        <span className="text-[11.5px] text-white/30" style={{ fontFamily: "var(--font-inter)" }}>
          {cur.unit === "flat"
            ? "Total (flat fee)"
            : `Total (${quantity} ${plan === "hourly" ? `hr${quantity > 1 ? "s" : ""}` : `day${quantity > 1 ? "s" : ""}`})`}
          {pax > 1 ? ` · ${pax} pax` : ""}
        </span>
        <span className="text-[21px] font-bold text-[#E8742C]" style={{ fontFamily: "var(--font-poppins)" }}>
          {vnd(total)}
        </span>
      </div>

      {/* Consent */}
      <label className="flex items-start gap-2.5 cursor-pointer select-none">
        <div className="flex-shrink-0 mt-0.5">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => { setConsent(e.target.checked); clearErr("consent"); }}
            className="sr-only"
          />
          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
            consent
              ? "bg-[#E8742C] border-[#E8742C]"
              : errors.consent
              ? "border-red-400/70 bg-white/5"
              : "border-white/20 bg-white/5"
          }`}>
            {consent && (
              <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        </div>
        <span className={`text-[11px] leading-relaxed ${errors.consent ? "text-red-400/80" : "text-white/35"}`} style={{ fontFamily: "var(--font-inter)" }}>
          By submitting I agree to Stow&apos;s{" "}
          <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-white/55 hover:text-white transition-colors">
            Terms of Service
          </a>{" "}
          &amp;{" "}
          <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 text-white/55 hover:text-white transition-colors">
            Privacy Policy
          </a>
          {errors.consent && " — please tick to continue"}
        </span>
      </label>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-[#E8742C] hover:bg-[#C85E1E] disabled:opacity-70 text-white font-bold text-[14px] py-3.5 rounded-xl transition-colors"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            Opening WhatsApp…
          </>
        ) : (
          <>
            <Send size={14} />
            Confirm via WhatsApp
          </>
        )}
      </button>

    </form>
  );
}
