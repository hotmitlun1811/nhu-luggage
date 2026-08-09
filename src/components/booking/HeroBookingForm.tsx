"use client";

import { useState, useMemo } from "react";
import { Send, CheckCircle2, ChevronDown, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { EFFECTIVE as LEGAL_EFFECTIVE } from "@/components/legal/LegalShared";
import {
  PLAN_FACTS,
  FLEX_PLANS,
  FLAT_PLANS,
  vnd,
  generateTimeSlots,
  type PlanKey,
  type Lane,
} from "@/lib/plans";
import { formatDateTime, formatShortDate, formatLongDate, pluralizeWord } from "@/lib/format";
import type { Dictionary } from "@/content/types";
import type { AppLocale } from "@/content/locales";

// Client-only: renders via a document.body portal, which has no server
// equivalent — skipping SSR avoids a hydration mismatch entirely instead of
// papering over it with a mounted-after-effect gate.
const ConsentModal = dynamic(() => import("./ConsentModal"), { ssr: false });

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T12:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function diffDays(fromStr: string, toStr: string): number {
  const from = new Date(fromStr + "T12:00:00");
  const to   = new Date(toStr + "T12:00:00");
  return Math.round((to.getTime() - from.getTime()) / 86400000);
}

function diffMinutes(fromStr: string, toStr: string): number {
  const [fh, fm] = fromStr.split(":").map(Number);
  const [th, tm] = toStr.split(":").map(Number);
  return (th * 60 + tm) - (fh * 60 + fm);
}

const TIME_SLOTS = generateTimeSlots();

const LABEL = "block text-[10px] font-bold uppercase tracking-[0.12em] text-white/30 mb-1.5";
const INPUT  = "w-full appearance-none bg-white/[0.07] border border-white/[0.12] rounded-lg px-3 py-2 text-[13px] text-white placeholder-white/25 focus:outline-none focus:border-[#E8742C]/70 transition-colors";
// iOS Safari draws its own light native chrome over <select> unless appearance is
// reset, which also removes the native arrow — SELECT adds room + a custom one back.
const SELECT = `${INPUT} pr-[32px]`;
const ERR    = "border-red-400/70";
const EMAIL_RE = /^\S+@\S+\.\S+$/;

type EmailStatus = "idle" | "sending" | "sent" | "error";

export default function HeroBookingForm({ dict, locale }: { dict: Dictionary["booking"]; locale: AppLocale }) {
  const today = new Date().toISOString().split("T")[0];

  // Evidence trail for the scrollwrap consent + the daily/hourly period
  // summaries — locale-aware via src/lib/format.ts, defaulting to English
  // formatting until a real locale is passed in from a translated page.
  const fmtDateTime = (d: Date) => formatDateTime(d, locale);
  const fmtShort = (dateStr: string) => formatShortDate(dateStr, locale);
  const fmtLong = (dateStr: string) => formatLongDate(dateStr, locale);

  const [lane, setLane]             = useState<Lane>("flatrate");
  const [plan, setPlan]             = useState<PlanKey>("strand");
  const [oversized, setOversized]   = useState(false);
  const [date, setDate]             = useState("");
  const [time, setTime]             = useState("");
  const [pax, setPax]               = useState(1);
  const [paxInput, setPaxInput]     = useState("1");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [name, setName]             = useState("");
  const [phone, setPhone]           = useState("");
  const [email, setEmail]           = useState("");
  const [consent, setConsent]       = useState(false);
  const [consentAt, setConsentAt]   = useState<Date | null>(null);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [loading, setLoading]       = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [errors, setErrors]         = useState<Record<string, string>>({});
  const [emailStatus, setEmailStatus] = useState<EmailStatus>("idle");
  const [emailError, setEmailError]   = useState("");
  const [bookingRef, setBookingRef]   = useState("");

  function switchLane(l: Lane) {
    setLane(l);
    setPlan(l === "flexible" ? "daily" : "strand");
    setPickupDate("");
    setPickupTime("");
  }

  function switchPlan(pk: PlanKey) {
    setPlan(pk);
    setPickupDate("");
    setPickupTime("");
  }

  function clearErr(k: string) {
    setErrors(p => { const n = { ...p }; delete n[k]; return n; });
  }

  // Facts (price/lane/surcharge — locale-invariant) vs. display text
  // (translated, from the dictionary). buildMessage()/sendLarkBooking()
  // below deliberately use `curFacts.canonicalName`/`canonicalDuration`,
  // never `curText` — see plans.ts's note on why those two network
  // boundaries must always stay English regardless of site locale.
  const curFacts = PLAN_FACTS[plan];
  const maxPickup = date && curFacts.maxDays ? addDays(date, curFacts.maxDays) : "";

  // "By the Day" bills per calendar day between drop-off and pick-up, and
  // "By the Hour" bills per hour between drop-off and pick-up time — the
  // customer picks both ends directly instead of choosing a count.
  const dailyQuantity  = plan === "daily"  && date && pickupDate ? Math.max(1, diffDays(date, pickupDate)) : 1;
  const hourlyQuantity = plan === "hourly" && time && pickupTime ? Math.max(1, Math.ceil(diffMinutes(time, pickupTime) / 60)) : 1;
  const effectiveQuantity = plan === "daily" ? dailyQuantity : plan === "hourly" ? hourlyQuantity : 1;

  const total = useMemo(() => {
    const base = (plan === "hourly" || plan === "daily") ? curFacts.price * effectiveQuantity : curFacts.price;
    return base * pax + (oversized ? curFacts.oversizeSurcharge : 0);
  }, [curFacts, oversized, plan, effectiveQuantity, pax]);

  function validate() {
    const e: Record<string, string> = {};
    if (!date)          e.date    = dict.required;
    if ((plan === "hourly" || lane === "flatrate") && !time) e.time = dict.required;
    if (plan === "daily" && !pickupDate) e.pickupDate = dict.required;
    if (plan === "hourly" && !pickupTime) e.pickupTime = dict.required;
    if (!name.trim())   e.name    = dict.required;
    if (!phone.trim())  e.phone   = dict.required;
    if (!email.trim())  e.email   = dict.required;
    else if (!EMAIL_RE.test(email.trim())) e.email = dict.invalidEmail;
    if (!pax || pax < 1) e.pax    = dict.required;
    if (!consent)       e.consent = dict.required;
    return e;
  }

  function generateRef() {
    const d = (date || today).replace(/-/g, "").slice(2); // YYMMDD
    const n = Math.floor(Math.random() * 9000 + 1000);
    return `STW-${d}-${n}`;
  }

  // Business-facing WhatsApp message — deliberately hardcoded English
  // regardless of site locale (i18n plan decision #4). Staff read this on
  // the business's own WhatsApp number; a translated message they can't
  // action defeats the point. Uses curFacts.canonicalName/plain English
  // pluralization, never the (possibly Korean/Chinese) dict/curText.
  function buildMessage(ref: string) {
    let periodLine = "";
    if (plan === "hourly" && date && time && pickupTime) {
      periodLine = `⏱ Duration: ${effectiveQuantity} hour${effectiveQuantity > 1 ? "s" : ""} (${time} → ${pickupTime})`;
    } else if (plan === "daily" && date && pickupDate) {
      periodLine = `📅 Period: ${formatShortDate(date, "en")} → ${formatShortDate(pickupDate, "en")} (${effectiveQuantity} day${effectiveQuantity > 1 ? "s" : ""})`;
    } else if (lane === "flatrate" && date && pickupDate) {
      periodLine = `📅 Period: ${formatShortDate(date, "en")} → ${formatShortDate(pickupDate, "en")}`;
    }

    return [
      `Hello Stow! 👋 I'd like to book luggage storage.`,
      ``,
      `📋 Ref: ${ref}`,
      `📦 Plan: ${curFacts.canonicalName} — ${vnd(curFacts.price)}${curFacts.unit === "flat" ? " flat fee" : curFacts.unit} / bag`,
      `🧳 Bags: ${pax}`,
      oversized ? `📏 Item: Oversized (+${vnd(curFacts.oversizeSurcharge)})` : `📏 Item: Standard size`,
      `📅 Drop-off: ${date ? formatLongDate(date, "en") : "TBD"}${(plan === "hourly" || lane === "flatrate") && time ? ` at ${time}` : ""}`,
      periodLine,
      `💰 Total: ${vnd(total)}`,
      ``,
      `👤 Name: ${name}`,
      `📱 WhatsApp: ${phone}`,
      `✉️ Email: ${email}`,
      ``,
      consentAt ? `✅ Agreed to Terms of Service & Privacy Policy (Effective ${LEGAL_EFFECTIVE}) — read in full at ${formatDateTime(consentAt, "en")}` : "",
      `Please confirm my booking. Thank you! 🙏`,
    ].filter(Boolean).join("\n");
  }

  function sendLarkBooking(ref: string) {
    const isHourly = plan === "hourly";
    // English regardless of locale — same reasoning as buildMessage() above,
    // this crosses into the ops team's Lark Base table.
    const duration = isHourly
      ? `${hourlyQuantity} hour${hourlyQuantity > 1 ? "s" : ""}`
      : plan === "daily"
      ? `${dailyQuantity} day${dailyQuantity > 1 ? "s" : ""}`
      : curFacts.canonicalDuration;
    // Fire-and-forget — the WhatsApp handoff below is the customer's actual
    // confirmation path, so a Lark hiccup must never block or delay it.
    fetch("/api/lark/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "Booking Form",
        reference: ref,
        lane,
        planName: curFacts.canonicalName,
        oversized,
        dropOffDate: date,
        dropOffTime: time,
        duration,
        // Hourly has no separate pickup-date input (same-day, per the app's
        // own quantity math) — daily/flatrate use their explicit date field.
        pickupDate: isHourly ? date : pickupDate,
        pickupTime: isHourly ? pickupTime : undefined,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        pax,
        total,
      }),
    }).catch(() => {});
  }

  async function sendAgreementEmail(ref: string) {
    setEmailStatus("sending");
    setEmailError("");
    try {
      const res = await fetch("/api/send-agreement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email.trim(),
          name: name.trim(),
          ref,
          planName: curFacts.canonicalName,
          planDuration: curFacts.canonicalDuration,
          lane,
          consentAt: consentAt ? consentAt.toISOString() : null,
          legalVersion: LEGAL_EFFECTIVE,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || dict.emailFailedFallback);
      }
      setEmailStatus("sent");
    } catch (err) {
      setEmailStatus("error");
      setEmailError(err instanceof Error ? err.message : dict.emailFailedFallback);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    const ref = generateRef();
    setBookingRef(ref);
    sendLarkBooking(ref);
    window.open(`https://wa.me/84905955161?text=${encodeURIComponent(buildMessage(ref))}`, "_blank", "noopener,noreferrer");
    sendAgreementEmail(ref);
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
          {dict.successTitle}
        </p>
        <p className="text-white/45 text-[13px] leading-snug mb-1" style={{ fontFamily: "var(--font-inter)" }}>
          {dict.successSubtitle}
        </p>
        <p className="text-white/30 text-[12px] mb-1" style={{ fontFamily: "var(--font-inter)" }}>
          {dict.successReplyTime}
        </p>
        <p className="text-white/25 text-[11px] mb-5 tracking-wide" style={{ fontFamily: "var(--font-poppins)" }}>
          {dict.successRefPrefix}{bookingRef}
        </p>

        <div className="flex items-center justify-between w-full max-w-xs px-3 py-2.5 mb-6 bg-white/[0.05] rounded-lg border border-white/[0.09]">
          <div className="text-left min-w-0 mr-3">
            <p className="text-[11.5px] font-semibold text-white/70" style={{ fontFamily: "var(--font-poppins)" }}>
              {dict.policyEmailLabel}
            </p>
            <p className="text-[11px] text-white/35 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
              {emailStatus === "sending" && `${dict.emailSendingPrefix}${email}…`}
              {emailStatus === "sent" && `${dict.emailSentPrefix}${email}`}
              {emailStatus === "error" && (emailError || dict.emailFailedFallback)}
              {emailStatus === "idle" && `${dict.emailWillSendPrefix}${email}`}
            </p>
          </div>
          {emailStatus === "error" ? (
            <button
              type="button"
              onClick={() => sendAgreementEmail(bookingRef)}
              className="flex-shrink-0 text-[11px] font-semibold text-[#E8742C] px-2.5 py-1.5 rounded-md border border-[#E8742C]/40"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {dict.retryLabel}
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
            {dict.backToHome}
          </Link>
          <button
            onClick={() => setSubmitted(false)}
            className="text-[13px] border border-white/12 text-white/45 px-5 py-2.5 rounded-lg hover:text-white/80 transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {dict.bookAgain}
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
        <p className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>{dict.laneLabel}</p>
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
              {l === "flexible" ? dict.laneFlexible : dict.laneFlatRate}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-white/30 mt-1.5" style={{ fontFamily: "var(--font-inter)" }}>
          {lane === "flexible" ? dict.laneFlexibleSub : dict.laneFlatRateSub}
        </p>
      </div>

      {/* Plan */}
      <div>
        <p className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>{dict.planLabel}</p>
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
              const facts = PLAN_FACTS[pk];
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
                  {facts.popular && (
                    <span
                      className="absolute -top-1.5 right-2 bg-white text-[#E8742C] text-[8px] font-bold px-1.5 rounded-full leading-[1.6]"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      {dict.planTopBadge}
                    </span>
                  )}
                  <p className="text-[12px] font-semibold text-white leading-snug" style={{ fontFamily: "var(--font-poppins)" }}>
                    {dict.planNames[pk]}
                  </p>
                  <p
                    className={`text-[11px] font-bold mt-0.5 ${sel ? "text-white/70" : "text-[#E8742C]"}`}
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {vnd(facts.price)}<span className="font-medium opacity-70"> / {dict.bagUnit.singular}</span>
                  </p>
                  <p
                    className={`text-[10px] mt-0.5 ${sel ? "text-white/60" : "text-white/35"}`}
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {dict.planDurations[pk]}
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
          {dict.laptopNotice}
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
              <div className="min-w-0">
                <label className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>
                  {dict.dropOffDateLabel}{errors.date && <span className="text-red-400/80 normal-case tracking-normal ml-1">({errors.date})</span>}
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
              <div className="min-w-0">
                <label className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>
                  {dict.timeLabel}{plan === "hourly" && errors.time && <span className="text-red-400/80 normal-case tracking-normal ml-1">({errors.time})</span>}
                </label>
                <div className="relative">
                  <select
                    value={time}
                    onChange={(e) => {
                      const v = e.target.value;
                      setTime(v);
                      if (pickupTime && pickupTime <= v) setPickupTime("");
                      clearErr("time");
                    }}
                    className={`${SELECT} ${plan === "hourly" && errors.time ? ERR : ""}`}
                    style={{ fontFamily: "var(--font-inter)", colorScheme: "dark" }}
                  >
                    <option value="">{dict.selectPlaceholder}</option>
                    {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
                </div>
              </div>
            </div>

            {/* Row 2: Pick-up time (hourly) / Pick-up date (daily) + Pax */}
            <div className="grid grid-cols-2 gap-2">
              <div className="min-w-0">
                <label className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>
                  {plan === "hourly"
                    ? <>{dict.pickupTimeLabel}{errors.pickupTime && <span className="text-red-400/80 normal-case tracking-normal ml-1">({errors.pickupTime})</span>}</>
                    : <>{dict.pickupDateLabel}{errors.pickupDate && <span className="text-red-400/80 normal-case tracking-normal ml-1">({errors.pickupDate})</span>}</>}
                </label>
                {plan === "hourly" ? (
                  <div className="relative">
                    <select
                      value={pickupTime}
                      onChange={(e) => { setPickupTime(e.target.value); clearErr("pickupTime"); }}
                      className={`${SELECT} ${errors.pickupTime ? ERR : ""}`}
                      style={{ fontFamily: "var(--font-inter)", colorScheme: "dark" }}
                    >
                      <option value="">{dict.selectPlaceholder}</option>
                      {TIME_SLOTS.filter((t) => !time || t > time).map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
                  </div>
                ) : (
                  <input
                    type="date"
                    value={pickupDate}
                    min={date || today}
                    max={date ? addDays(date, 30) : undefined}
                    onChange={(e) => { setPickupDate(e.target.value); clearErr("pickupDate"); }}
                    className={`${INPUT} ${errors.pickupDate ? ERR : ""}`}
                    style={{ fontFamily: "var(--font-inter)", colorScheme: "dark" }}
                  />
                )}
              </div>
              <div className="min-w-0">
                <label className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>
                  {dict.bagsLabel}{errors.pax && <span className="text-red-400/80 normal-case tracking-normal ml-1">({errors.pax})</span>}
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={paxInput}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/\D/g, "");
                    setPaxInput(digits);
                    if (digits) setPax(Math.max(1, parseInt(digits, 10)));
                    clearErr("pax");
                  }}
                  onBlur={() => {
                    const n = paxInput ? Math.max(1, parseInt(paxInput, 10)) : 1;
                    setPaxInput(String(n));
                    setPax(n);
                  }}
                  onFocus={(e) => { const el = e.currentTarget; setTimeout(() => el.select(), 0); }}
                  className={`${INPUT} ${errors.pax ? ERR : ""}`}
                  style={{ fontFamily: "var(--font-inter)" }}
                />
              </div>
            </div>
            <p className="text-[10.5px] text-white/25 -mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
              {dict.bagsHelp}
            </p>

            {plan === "daily" && date && pickupDate && (
              <p className="text-[11px] text-white/35" style={{ fontFamily: "var(--font-inter)" }}>
                <span className="text-white font-semibold">{dailyQuantity} {pluralizeWord(dailyQuantity, dict.dayUnit)}</span> · {fmtShort(date)} → {fmtShort(pickupDate)}
              </p>
            )}
            {plan === "hourly" && time && pickupTime && (
              <p className="text-[11px] text-white/35" style={{ fontFamily: "var(--font-inter)" }}>
                <span className="text-white font-semibold">{hourlyQuantity} {pluralizeWord(hourlyQuantity, dict.hourUnit)}</span> · {time} → {pickupTime}
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="flatrate-dates"
            className="grid grid-cols-2 lg:grid-cols-3 gap-2"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
          >
            <div className="min-w-0">
              <label className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>
                {dict.dropOffLabel}{errors.date && <span className="text-red-400/80 normal-case tracking-normal ml-1">({errors.date})</span>}
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
            <div className="min-w-0">
              <label className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>
                {dict.bringAtLabel}{errors.time && <span className="text-red-400/80 normal-case tracking-normal ml-1">({errors.time})</span>}
              </label>
              <div className="relative">
                <select
                  value={time}
                  onChange={(e) => { setTime(e.target.value); clearErr("time"); }}
                  className={`${SELECT} ${errors.time ? ERR : ""}`}
                  style={{ fontFamily: "var(--font-inter)", colorScheme: "dark" }}
                >
                  <option value="">{dict.selectPlaceholder}</option>
                  {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
              </div>
            </div>
            <div className="col-span-2 lg:col-span-1 min-w-0">
              <label className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>
                {dict.pickupLabel}
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
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
        <div>
          <label className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>
            {dict.nameLabel}{errors.name && <span className="text-red-400/80 normal-case tracking-normal ml-1">({errors.name})</span>}
          </label>
          <input
            type="text"
            placeholder={dict.namePlaceholder}
            value={name}
            autoComplete="name"
            onChange={(e) => { setName(e.target.value); clearErr("name"); }}
            className={`${INPUT} ${errors.name ? ERR : ""}`}
            style={{ fontFamily: "var(--font-inter)" }}
          />
        </div>
        <div>
          <label className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>
            {dict.whatsappLabel}{errors.phone && <span className="text-red-400/80 normal-case tracking-normal ml-1">({errors.phone})</span>}
          </label>
          <input
            type="tel"
            placeholder={dict.whatsappPlaceholder}
            value={phone}
            autoComplete="tel"
            onChange={(e) => { setPhone(e.target.value); clearErr("phone"); }}
            className={`${INPUT} ${errors.phone ? ERR : ""}`}
            style={{ fontFamily: "var(--font-inter)" }}
          />
        </div>
        <div className="col-span-2 lg:col-span-1">
          <label className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>
            {dict.emailLabel}{errors.email && <span className="text-red-400/80 normal-case tracking-normal ml-1">({errors.email})</span>}
          </label>
          <input
            type="email"
            placeholder={dict.emailPlaceholder}
            value={email}
            autoComplete="email"
            onChange={(e) => { setEmail(e.target.value); clearErr("email"); }}
            className={`${INPUT} ${errors.email ? ERR : ""}`}
            style={{ fontFamily: "var(--font-inter)" }}
          />
        </div>
      </div>

      {/* Pax (flat rate only — flexible has it next to "how many days") + Oversized */}
      <div className={`grid gap-2 items-stretch ${lane === "flatrate" ? "grid-cols-2" : "grid-cols-1"}`}>
        {lane === "flatrate" && (
          <div className={`flex items-center justify-between px-3 py-2.5 bg-white/[0.05] rounded-lg border ${errors.pax ? ERR : "border-white/[0.09]"}`}>
            <div className="min-w-0 mr-3">
              <label className="text-[12.5px] font-semibold text-white/80 leading-none block" style={{ fontFamily: "var(--font-poppins)" }}>
                {dict.bagsLabel}{errors.pax && <span className="text-red-400/80 normal-case tracking-normal ml-1">({errors.pax})</span>}
              </label>
              <p className="text-[11px] text-white/28 mt-1 leading-snug" style={{ fontFamily: "var(--font-inter)" }}>
                {dict.bagsInlineHelp}
              </p>
            </div>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={paxInput}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, "");
                setPaxInput(digits);
                if (digits) setPax(Math.max(1, parseInt(digits, 10)));
                clearErr("pax");
              }}
              onBlur={() => {
                const n = paxInput ? Math.max(1, parseInt(paxInput, 10)) : 1;
                setPaxInput(String(n));
                setPax(n);
              }}
              onFocus={(e) => { const el = e.currentTarget; setTimeout(() => el.select(), 0); }}
              className="w-[44px] flex-shrink-0 bg-transparent border-0 text-white text-[18px] font-bold text-right focus:outline-none"
              style={{ fontFamily: "var(--font-poppins)" }}
            />
          </div>
        )}

        <div className="flex items-center justify-between px-3 py-2.5 bg-white/[0.05] rounded-lg border border-white/[0.09]">
          <div className="min-w-0 mr-3">
            <p className="text-[12.5px] font-semibold text-white/80 leading-none" style={{ fontFamily: "var(--font-poppins)" }}>
              {dict.oversizedLabel}
            </p>
            <p className="text-[11px] text-white/28 mt-1 leading-snug" style={{ fontFamily: "var(--font-inter)" }}>
              {dict.oversizedHelpPrefix}{vnd(curFacts.oversizeSurcharge)}
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
          {curFacts.unit === "flat"
            ? dict.totalFlatFee
            : `${dict.totalPrefix}${effectiveQuantity} ${plan === "hourly" ? pluralizeWord(effectiveQuantity, dict.hourUnit) : pluralizeWord(effectiveQuantity, dict.dayUnit)}${dict.totalSuffix}`}
          {pax > 1 ? ` · ${pax} ${dict.bagUnit.plural}` : ""}
        </span>
        <span className="text-[21px] font-bold text-[#E8742C]" style={{ fontFamily: "var(--font-poppins)" }}>
          {vnd(total)}
        </span>
      </div>

      {/* Consent — must scroll through both documents in the popup before it can be accepted */}
      {consent ? (
        <div className="flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border border-emerald-500/25 bg-emerald-500/[0.06]">
          <div className="flex items-center gap-2 min-w-0">
            <CheckCircle2 size={15} className="text-emerald-400 flex-shrink-0" />
            <span className="text-[11.5px] text-white/70 leading-snug truncate" style={{ fontFamily: "var(--font-inter)" }}>
              {dict.consentAgreedText}
            </span>
          </div>
          <button
            type="button"
            onClick={() => { setConsent(false); setConsentAt(null); }}
            className="flex-shrink-0 text-[11px] text-white/35 hover:text-white/70 underline underline-offset-2 transition-colors"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {dict.changeLabel}
          </button>
        </div>
      ) : (
        <div>
          <button
            type="button"
            onClick={() => setShowConsentModal(true)}
            className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border text-left transition-colors ${
              errors.consent ? "border-red-400/70 bg-red-400/5" : "border-white/[0.12] bg-white/[0.05] hover:border-white/25"
            }`}
          >
            <span className="text-[11.5px] text-white/60 leading-snug" style={{ fontFamily: "var(--font-inter)" }}>
              {dict.consentPromptPre}
              <span className="text-white font-semibold">{dict.consentPromptTos}</span>
              {dict.consentPromptAnd}
              <span className="text-white font-semibold">{dict.consentPromptPrivacy}</span>
              {dict.consentPromptPost}
            </span>
            <ChevronRight size={15} className="flex-shrink-0 text-white/30" />
          </button>
          {errors.consent && (
            <p className="text-[11px] text-red-400/80 mt-1.5" style={{ fontFamily: "var(--font-inter)" }}>
              {dict.consentErrorText}
            </p>
          )}
        </div>
      )}

      <ConsentModal
        open={showConsentModal}
        onClose={() => setShowConsentModal(false)}
        onAgree={() => {
          setConsent(true);
          setConsentAt(new Date());
          setShowConsentModal(false);
          clearErr("consent");
        }}
      />

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
            {dict.submitLoading}
          </>
        ) : (
          <>
            <Send size={14} />
            {dict.submitIdle}
          </>
        )}
      </button>

    </form>
  );
}
