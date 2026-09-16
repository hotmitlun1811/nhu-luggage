"use client";

import { useState, useMemo, useEffect, useRef, useSyncExternalStore } from "react";
import { Send, CheckCircle2, ChevronDown, ChevronRight, MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { EFFECTIVE as LEGAL_EFFECTIVE } from "@/components/legal/LegalShared";
import {
  PLAN_FACTS,
  FLEX_PLANS,
  FLAT_PLANS,
  HOURLY_BILLS_AS_DAY_AFTER_HOURS,
  vnd,
  generateTimeSlots,
  type PlanKey,
  type Lane,
} from "@/lib/plans";
import { formatDateTime, formatShortDate, formatLongDate, pluralizeWord } from "@/lib/format";
import { POST_BOOKING_EMAIL_ENABLED } from "@/lib/features";
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

// A sane upper bound on bag count — enough for a tour group, low enough that a
// fat-finger "22" for "2" can't ring up a runaway total or a 100-option
// oversized selector. Over this, customers are told to message us.
const MAX_BAGS = 20;

// localStorage key for the auto-saved draft (see the restore/save effects).
const DRAFT_KEY = "stow-booking-draft-v1";

// The visitor's LOCAL calendar date, "YYYY-MM-DD". Deliberately not
// toISOString() (that's UTC and lands a day early for UTC+7 between midnight
// and 07:00). Used for the earliest bookable day and the same-day slot filter.
function localDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// "HH:MM" → minutes since midnight, for comparing a slot against "now".
function slotToMinutes(s: string): number {
  const [h, m] = s.split(":").map(Number);
  return h * 60 + m;
}

// True only in the browser, and only after hydration — no setState, no
// hydration mismatch (React uses the server snapshot while hydrating, then
// swaps to the client one). Gates all "now"-dependent rendering so the
// server HTML and first client render stay identical.
function useIsClient(): boolean {
  return useSyncExternalStore(() => () => {}, () => true, () => false);
}

const LABEL = "block text-[10px] font-bold uppercase tracking-[0.12em] text-white/30 mb-1.5";
const INPUT  = "w-full appearance-none bg-white/[0.07] border border-white/[0.12] rounded-lg px-3 py-2 text-[13px] text-white placeholder-white/25 focus:outline-none focus:border-[#E8742C]/70 transition-colors";
// iOS Safari draws its own light native chrome over <select> unless appearance is
// reset, which also removes the native arrow — SELECT adds room + a custom one back.
const SELECT = `${INPUT} pr-[32px]`;
const ERR    = "border-red-400/70";
const EMAIL_RE = /^\S+@\S+\.\S+$/;

type EmailStatus = "idle" | "sending" | "sent" | "error";

export default function HeroBookingForm({ dict, locale }: { dict: Dictionary["booking"]; locale: AppLocale }) {
  const isClient = useIsClient();
  const nowClock = new Date();
  // SSR + the first client render use the UTC date (deterministic → hydration
  // matches); after mount we switch to the visitor's LOCAL date so "earliest
  // bookable day" and the past-slot filter are correct in their timezone.
  const today = isClient ? localDateStr(nowClock) : nowClock.toISOString().split("T")[0];
  const nowMinutes = nowClock.getHours() * 60 + nowClock.getMinutes();

  // Evidence trail for the scrollwrap consent + the daily/hourly period
  // summaries — locale-aware via src/lib/format.ts, defaulting to English
  // formatting until a real locale is passed in from a translated page.
  const fmtDateTime = (d: Date) => formatDateTime(d, locale);
  const fmtShort = (dateStr: string) => formatShortDate(dateStr, locale);
  const fmtLong = (dateStr: string) => formatLongDate(dateStr, locale);

  // Flexible is both the first tab and the pre-selected one (client
  // request, 2026-08-15 — it used to open on flatrate/strand).
  const [lane, setLane]             = useState<Lane>("flexible");
  const [plan, setPlan]             = useState<PlanKey>("daily");
  const [oversized, setOversized]   = useState(false);
  // How many of the bags are oversized. Only relevant (and only shown) when
  // `oversized` is on and there's more than one bag — the surcharge is now
  // per oversized bag, not a single flat add-on (client fix, 2026-09-15).
  const [oversizedBags, setOversizedBags] = useState(1);
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
  // Kept so the success screen can offer a manual "Open WhatsApp" link when
  // window.open was blocked or the device has no WhatsApp session.
  const [waUrl, setWaUrl]             = useState("");
  // Synchronous double-submit guard — a ref, not `loading`, because two taps
  // in the same tick both read the pre-update `loading` and would each fire
  // a WhatsApp open. A ref flips immediately.
  const submittingRef = useRef(false);

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

  // Restore a saved draft on mount so a reload / accidental navigation
  // doesn't wipe a long, half-filled form. Consent is deliberately NOT
  // restored — it must be re-given each session for a fresh timestamp.
  // `raw` is read synchronously (so the save effect below can't overwrite it
  // first); the state is applied in a microtask so these setState calls run
  // outside React's synchronous commit — no cascading-render lint, and no
  // hydration mismatch (this runs after hydration regardless).
  useEffect(() => {
    let raw: string | null = null;
    try { raw = localStorage.getItem(DRAFT_KEY); } catch { return; }
    if (!raw) return;
    Promise.resolve().then(() => {
      let d: Record<string, unknown>;
      try { d = JSON.parse(raw as string); } catch { return; }
      if (!d || typeof d !== "object") return;
      // Ignore stale drafts (>12h) so we never restore a now-past date.
      if (typeof d.savedAt === "number" && Date.now() - d.savedAt > 12 * 3600 * 1000) return;
      const t = localDateStr(new Date());
      if (d.lane === "flexible" || d.lane === "flatrate") setLane(d.lane);
      const pool = d.lane === "flatrate" ? FLAT_PLANS : FLEX_PLANS;
      if (typeof d.plan === "string" && pool.includes(d.plan as PlanKey)) setPlan(d.plan as PlanKey);
      if (typeof d.oversized === "boolean") setOversized(d.oversized);
      if (typeof d.oversizedBags === "number" && d.oversizedBags >= 1) setOversizedBags(d.oversizedBags);
      // Only restore a still-future drop-off; carry its times only with it.
      if (typeof d.date === "string" && d.date >= t) {
        setDate(d.date);
        if (typeof d.time === "string") setTime(d.time);
        if (typeof d.pickupDate === "string" && d.pickupDate >= d.date) setPickupDate(d.pickupDate);
        if (typeof d.pickupTime === "string") setPickupTime(d.pickupTime);
      }
      if (typeof d.pax === "number" && d.pax >= 1) {
        const p = Math.min(MAX_BAGS, d.pax);
        setPax(p); setPaxInput(String(p));
      }
      if (typeof d.name === "string") setName(d.name);
      if (typeof d.phone === "string") setPhone(d.phone);
      if (typeof d.email === "string") setEmail(d.email);
    });
  }, []);

  // Persist the draft on every change. Writes only (no setState), so this is
  // a plain external-system sync; best-effort (private mode / quota throws).
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({
        savedAt: Date.now(), lane, plan, oversized, oversizedBags,
        date, time, pax, pickupDate, pickupTime, name, phone, email,
      }));
    } catch { /* best-effort */ }
  }, [lane, plan, oversized, oversizedBags, date, time, pax, pickupDate, pickupTime, name, phone, email]);

  // Facts (price/lane/surcharge — locale-invariant) vs. display text
  // (translated, from the dictionary). buildMessage()/sendLarkBooking()
  // below deliberately use `curFacts.canonicalName`/`canonicalDuration`,
  // never `curText` — see plans.ts's note on why those two network
  // boundaries must always stay English regardless of site locale.
  const curFacts = PLAN_FACTS[plan];
  // Flat-rate is billed PER PERIOD now (owner decision, 2026-09-16): the plan
  // price covers one `maxDays` block (Mini = 1 week, Strand = 1 month, Long
  // Stay = 4 months) and the pick-up date multiplies it. So every flat plan
  // is uncapped — a longer pick-up simply costs more — and the old tier caps
  // are gone. `flatPeriods` is the block count between drop-off and pick-up,
  // rounded up, min 1 (same ceil rule as "By the Day"'s day count).
  const flatPeriods = lane === "flatrate" && date && pickupDate && curFacts.maxDays
    ? Math.max(1, Math.ceil(diffDays(date, pickupDate) / curFacts.maxDays))
    : 1;
  // English label for the two network boundaries (WhatsApp + Lark), which
  // stay English regardless of site locale. Long Stay bills in 4-month
  // blocks, so it reads "2 × 4 months", not a plain month count.
  const flatDurationEn = plan === "mini"
    ? `${flatPeriods} week${flatPeriods > 1 ? "s" : ""}`
    : plan === "strand"
    ? `${flatPeriods} month${flatPeriods > 1 ? "s" : ""}`
    : `${flatPeriods} × 4 months`;
  // The singular period unit, for the English WhatsApp plan line (so it reads
  // "300.000 ₫ / month / bag", never a stale "flat fee").
  const flatUnitEn = plan === "mini" ? "week" : plan === "strand" ? "month" : "4 months";
  // Localized version of the period count, for the on-page total label + summary.
  const flatPeriodLabel = plan === "mini"
    ? `${flatPeriods} ${pluralizeWord(flatPeriods, dict.weekUnit)}`
    : plan === "strand"
    ? `${flatPeriods} ${pluralizeWord(flatPeriods, dict.monthUnit)}`
    : `${flatPeriods} × 4 ${pluralizeWord(4, dict.monthUnit)}`;

  // The number of oversized bags actually billed: 0 when the toggle is off,
  // otherwise clamped to the total bag count (you can't have more oversized
  // bags than bags). Because the count selector binds its value to this
  // derived number, a shrinking bag count clamps the display for free — no
  // effect syncing raw `oversizedBags` back down. Drives the surcharge, the
  // help-line math, and the WhatsApp/Lark payloads.
  const oversizedCount = oversized ? Math.min(Math.max(1, oversizedBags), pax) : 0;

  // "By the Day" bills per calendar day between drop-off and pick-up, and
  // "By the Hour" bills per hour between drop-off and pick-up time — the
  // customer picks both ends directly instead of choosing a count.
  const dailyQuantity  = plan === "daily"  && date && pickupDate ? Math.max(1, diffDays(date, pickupDate)) : 1;
  const hourlyQuantity = plan === "hourly" && time && pickupTime ? Math.max(1, Math.ceil(diffMinutes(time, pickupTime) / 60)) : 1;
  const effectiveQuantity = plan === "daily" ? dailyQuantity : plan === "hourly" ? hourlyQuantity : 1;

  /* Over the threshold, an hourly booking is charged the daily rate — the
     rule the form now states in `dict.hourlyCapNotice`. Without this the
     printed total would contradict that sentence: 5 hours would ring up
     75,000₫ when the note promises 60,000₫. */
  const hourlyBillsAsDay = plan === "hourly" && hourlyQuantity > HOURLY_BILLS_AS_DAY_AFTER_HOURS;

  const total = useMemo(() => {
    const base = hourlyBillsAsDay
      ? PLAN_FACTS.daily.price
      : (plan === "hourly" || plan === "daily") ? curFacts.price * effectiveQuantity : curFacts.price * flatPeriods;
    // Surcharge is per oversized bag, not a single flat add-on — 2 oversized
    // bags cost 2× (client fix, 2026-09-15). It's a one-time handling fee,
    // deliberately NOT multiplied by flat periods.
    return base * pax + oversizedCount * curFacts.oversizeSurcharge;
  }, [curFacts, oversizedCount, plan, effectiveQuantity, flatPeriods, pax, hourlyBillsAsDay]);

  function validate() {
    const e: Record<string, string> = {};
    if (!date)          e.date    = dict.required;
    // Drop-off time is now required on every plan. It was optional for
    // "By the Day" alone, which stopped making sense once that plan
    // started asking for a pick-up time too — a booking can't have an end
    // time and no start time.
    if (!time)          e.time    = dict.required;
    if (plan === "daily" && !pickupDate) e.pickupDate = dict.required;
    // Flat-rate pick-up date was previously optional, so the form let you
    // submit with an empty Pickup (client bug report, 2026-09-15). It's now
    // required on every flat-rate plan.
    if (lane === "flatrate" && !pickupDate) e.pickupDate = dict.required;
    if ((plan === "hourly" || plan === "daily") && !pickupTime) e.pickupTime = dict.required;
    if (!name.trim())   e.name    = dict.required;
    // Phone is the only callback path (WhatsApp handoff uses the business's
    // own number, not this one), so reject obvious junk — need ≥8 digits.
    if (!phone.trim())  e.phone   = dict.required;
    else if (phone.replace(/\D/g, "").length < 8) e.phone = dict.invalidPhone;
    // Email required on Flat Rate (expats/nomads — higher-value leads worth
    // reaching), optional on Flexible (a tourist's quick drop shouldn't be
    // blocked on it). When given, it must still be a valid address.
    if (lane === "flatrate" && !email.trim()) e.email = dict.required;
    else if (email.trim() && !EMAIL_RE.test(email.trim())) e.email = dict.invalidEmail;
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
      // The "billed as 1 day" suffix matters to staff: it explains why the
      // total below is the daily rate and not hours × the hourly rate.
      periodLine = `⏱ Duration: ${effectiveQuantity} hour${effectiveQuantity > 1 ? "s" : ""} (${time} → ${pickupTime})${hourlyBillsAsDay ? " — billed as 1 day" : ""}`;
    } else if (plan === "daily" && date && pickupDate) {
      // Times included since By the Day started collecting a pick-up time —
      // without them staff can't tell when the customer is coming back.
      periodLine = `📅 Period: ${formatShortDate(date, "en")}${time ? ` ${time}` : ""} → ${formatShortDate(pickupDate, "en")}${pickupTime ? ` ${pickupTime}` : ""} (${effectiveQuantity} day${effectiveQuantity > 1 ? "s" : ""})`;
    } else if (lane === "flatrate" && date && pickupDate) {
      // Period count included so staff can see the price scales with the
      // pick-up date (owner decision 2026-09-16) — not a single flat fee.
      periodLine = `📅 Period: ${formatShortDate(date, "en")} → ${formatShortDate(pickupDate, "en")} (${flatDurationEn})`;
    }

    return [
      `Hello Stow! 👋 I'd like to book luggage storage.`,
      ``,
      `📋 Ref: ${ref}`,
      `📦 Plan: ${curFacts.canonicalName} — ${vnd(curFacts.price)}${curFacts.unit === "flat" ? ` / ${flatUnitEn}` : curFacts.unit} / bag`,
      `🧳 Bags: ${pax}`,
      oversized ? `📏 Item: Oversized ×${oversizedCount} (+${vnd(oversizedCount * curFacts.oversizeSurcharge)})` : `📏 Item: Standard size`,
      `📅 Drop-off: ${date ? formatLongDate(date, "en") : "TBD"}${time ? ` at ${time}` : ""}`,
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
      ? `${hourlyQuantity} hour${hourlyQuantity > 1 ? "s" : ""}${hourlyBillsAsDay ? " (billed as 1 day)" : ""}`
      : plan === "daily"
      ? `${dailyQuantity} day${dailyQuantity > 1 ? "s" : ""}`
      : flatDurationEn;
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
        oversizedCount,
        dropOffDate: date,
        dropOffTime: time,
        duration,
        // Hourly has no separate pickup-date input (same-day, per the app's
        // own quantity math) — daily/flatrate use their explicit date field.
        pickupDate: isHourly ? date : pickupDate,
        // Hourly and daily both collect one; flatrate doesn't, so it stays undefined.
        pickupTime: pickupTime || undefined,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        pax,
        total,
      }),
    }).catch(() => {});
  }

  // Gated by POST_BOOKING_EMAIL_ENABLED — currently off, pending the
  // review-request email that replaces this one. Left fully wired so
  // turning it back on is a one-line flag flip, not a rebuild.
  async function sendAgreementEmail(ref: string) {
    if (!POST_BOOKING_EMAIL_ENABLED) return;
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
    // Guard a double-tap in the 600ms before the button disables + the
    // success screen mounts — otherwise it fires two WhatsApp opens.
    if (submittingRef.current) return;
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    submittingRef.current = true;
    setLoading(true);
    const ref = generateRef();
    setBookingRef(ref);
    sendLarkBooking(ref);
    // Kept in state so the success screen can offer a manual re-open — the
    // success screen shows regardless of whether this window.open succeeded.
    const url = `https://wa.me/84905955161?text=${encodeURIComponent(buildMessage(ref))}`;
    setWaUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
    sendAgreementEmail(ref);
    // Booking captured — drop the saved draft so a later reload starts clean.
    try { localStorage.removeItem(DRAFT_KEY); } catch { /* best-effort */ }
    setTimeout(() => { submittingRef.current = false; setLoading(false); setSubmitted(true); }, 600);
  }

  const plans = lane === "flexible" ? FLEX_PLANS : FLAT_PLANS;

  /* Pick-up slots. Hourly is always same-day, so only later slots are
     valid. Daily normally spans days — but the date input permits
     same-day pick-up, and on that one day the same "must be later than
     drop-off" rule applies. */
  const pickupSameDay = plan === "hourly" || (!!date && pickupDate === date);
  const pickupSlots = pickupSameDay && time
    ? TIME_SLOTS.filter((t) => t > time)
    : TIME_SLOTS;

  /* Same-day drop-off must not offer times that have already passed today
     (no more booking "today at 09:00" at 3pm). Gated on isClient so SSR and
     the first client render still emit the full list and hydration matches. */
  const dropoffIsToday = isClient && !!date && date === today;
  const dropoffSlots = dropoffIsToday ? TIME_SLOTS.filter((t) => slotToMinutes(t) >= nowMinutes) : TIME_SLOTS;
  const noSlotsToday = dropoffIsToday && dropoffSlots.length === 0;
  // A late drop-off can leave no valid same-day pick-up slot — surface it
  // instead of showing an empty dropdown the customer can't get past.
  const noLaterPickupSlots = pickupSameDay && !!time && pickupSlots.length === 0;

  /* Rendered in two different places depending on plan (see Row 2 below),
     so it's defined once here rather than duplicated. */
  const bagsField = (
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
          // Clamp the visible value too, not just `pax`, so the box never
          // shows a number different from what's being charged (and "0"
          // snaps to "1" immediately instead of on blur).
          const n = digits ? Math.min(MAX_BAGS, Math.max(1, parseInt(digits, 10))) : 0;
          setPaxInput(digits ? String(n) : "");
          if (digits) setPax(n);
          clearErr("pax");
        }}
        onBlur={() => {
          const n = paxInput ? Math.min(MAX_BAGS, Math.max(1, parseInt(paxInput, 10))) : 1;
          setPaxInput(String(n));
          setPax(n);
        }}
        onFocus={(e) => { const el = e.currentTarget; setTimeout(() => el.select(), 0); }}
        className={`${INPUT} ${errors.pax ? ERR : ""}`}
        style={{ fontFamily: "var(--font-inter)" }}
      />
    </div>
  );

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
        <p className="text-white/25 text-[11px] mb-4 tracking-wide" style={{ fontFamily: "var(--font-poppins)" }}>
          {dict.successRefPrefix}{bookingRef}
        </p>

        {/* WhatsApp may not have auto-opened (popup blocked, desktop with no
            WhatsApp session, app not installed) — the success screen shows
            regardless, so always give a manual path rather than leaving the
            customer believing they're done when nothing was sent. */}
        {waUrl && (
          <>
            <p className="text-white/30 text-[11px] mb-2 max-w-xs" style={{ fontFamily: "var(--font-inter)" }}>
              {dict.successWhatsAppHint}
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full max-w-xs mb-5 bg-[#25D366] hover:bg-[#1EA955] text-white font-bold text-[13px] py-2.5 rounded-lg transition-colors"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              <MessageCircle size={15} />
              {dict.successOpenWhatsApp}
            </a>
          </>
        )}

        {/* Hidden while POST_BOOKING_EMAIL_ENABLED is off — promising an
            email we no longer send is worse than saying nothing. */}
        {POST_BOOKING_EMAIL_ENABLED && (
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
        )}

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
    /* pt-5, not pt-3: the panel's header strip above this was removed, so
       the first field would otherwise crowd the rounded top edge. */
    <form onSubmit={handleSubmit} noValidate className="px-5 pb-5 pt-5 flex flex-col gap-3.5">

      {/* Lane */}
      <div>
        <p className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>{dict.laneLabel}</p>
        <div className="flex p-[3px] bg-white/[0.06] rounded-lg border border-white/[0.08] gap-[3px]">
          {(["flexible", "flatrate"] as Lane[]).map((l) => (
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

      {/* Notices for flexible plans */}
      {lane === "flexible" && (
        <div className="-mt-1 flex flex-col gap-1">
          <p className="text-[11px] text-white/35" style={{ fontFamily: "var(--font-inter)" }}>
            {dict.laptopNotice}
          </p>
          {/* Shown on both flexible plans, not just hourly — it's the fact
              that decides which of the two to pick, so hiding it until
              hourly is selected would be too late to be useful. */}
          <p
            className={`text-[11px] ${hourlyBillsAsDay ? "text-[#E8742C]" : "text-white/35"}`}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {dict.hourlyCapNotice}
          </p>
        </div>
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
                  {dict.timeLabel}{errors.time && <span className="text-red-400/80 normal-case tracking-normal ml-1">({errors.time})</span>}
                </label>
                <div className="relative">
                  <select
                    value={time}
                    onChange={(e) => {
                      const v = e.target.value;
                      setTime(v);
                      // Only invalidates the pick-up time when both fall on
                      // the same day; a later-date pick-up is unaffected.
                      const sameDay = plan === "hourly" || (!!date && pickupDate === date);
                      if (sameDay && pickupTime && pickupTime <= v) setPickupTime("");
                      clearErr("time");
                    }}
                    className={`${SELECT} ${errors.time ? ERR : ""}`}
                    style={{ fontFamily: "var(--font-inter)", colorScheme: "dark" }}
                  >
                    <option value="">{dict.selectPlaceholder}</option>
                    {dropoffSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
                </div>
              </div>
            </div>

            {noSlotsToday && (
              <p className="text-[11px] text-[#E8742C]" style={{ fontFamily: "var(--font-inter)" }}>
                {dict.noSlotsTodayNotice}
              </p>
            )}

            {/* Row 2 — the pick-up pair.
                Hourly is same-day, so it needs only a time and Bags fits
                alongside. Daily needs both a pick-up date and a pick-up
                time (client request 2026-08-15: staff had no idea what
                time a By-the-Day customer was coming back), so those take
                the row and Bags drops to its own row below. */}
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
                      {pickupSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
                  </div>
                ) : (
                  <input
                    type="date"
                    value={pickupDate}
                    min={date || today}
                    max={date ? addDays(date, 30) : undefined}
                    onChange={(e) => {
                      const v = e.target.value;
                      setPickupDate(v);
                      // Same-day pick-up must still be after drop-off.
                      if (v === date && time && pickupTime && pickupTime <= time) setPickupTime("");
                      clearErr("pickupDate");
                    }}
                    className={`${INPUT} ${errors.pickupDate ? ERR : ""}`}
                    style={{ fontFamily: "var(--font-inter)", colorScheme: "dark" }}
                  />
                )}
              </div>

              {plan === "daily" ? (
                <div className="min-w-0">
                  <label className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>
                    {dict.pickupTimeLabel}{errors.pickupTime && <span className="text-red-400/80 normal-case tracking-normal ml-1">({errors.pickupTime})</span>}
                  </label>
                  <div className="relative">
                    <select
                      value={pickupTime}
                      onChange={(e) => { setPickupTime(e.target.value); clearErr("pickupTime"); }}
                      className={`${SELECT} ${errors.pickupTime ? ERR : ""}`}
                      style={{ fontFamily: "var(--font-inter)", colorScheme: "dark" }}
                    >
                      <option value="">{dict.selectPlaceholder}</option>
                      {pickupSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
                  </div>
                </div>
              ) : (
                bagsField
              )}
            </div>

            {noLaterPickupSlots && (
              <p className="text-[11px] text-[#E8742C]" style={{ fontFamily: "var(--font-inter)" }}>
                {dict.noLaterSlotsNotice}
              </p>
            )}

            {/* Bags, when the pick-up pair above took the whole row. */}
            {plan === "daily" && (
              <div className="grid grid-cols-2 gap-2">{bagsField}</div>
            )}
            <p className="text-[10.5px] text-white/25 -mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
              {dict.bagsHelp}
            </p>

            {plan === "daily" && date && pickupDate && (
              <p className="text-[11px] text-white/35" style={{ fontFamily: "var(--font-inter)" }}>
                <span className="text-white font-semibold">{dailyQuantity} {pluralizeWord(dailyQuantity, dict.dayUnit)}</span> · {fmtShort(date)}{time && ` ${time}`} → {fmtShort(pickupDate)}{pickupTime && ` ${pickupTime}`}
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
                  {dropoffSlots.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
              </div>
            </div>
            <div className="col-span-2 lg:col-span-1 min-w-0">
              <label className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>
                {dict.pickupLabel}{errors.pickupDate && <span className="text-red-400/80 normal-case tracking-normal ml-1">({errors.pickupDate})</span>}
              </label>
              <input
                type="date"
                value={pickupDate}
                min={date || today}
                onChange={(e) => { setPickupDate(e.target.value); clearErr("pickupDate"); }}
                className={`${INPUT} ${errors.pickupDate ? ERR : ""}`}
                style={{ fontFamily: "var(--font-inter)", colorScheme: "dark" }}
              />
            </div>
            {/* Period summary — shows the billed block count and the date
                range so the customer sees the price scaling with the pick-up
                date (owner decision 2026-09-16). Replaces the old "up to X"
                cap notices; flat-rate is now uncapped and priced per period. */}
            {date && pickupDate && (
              <p className="col-span-2 lg:col-span-3 text-[11px] text-white/35" style={{ fontFamily: "var(--font-inter)" }}>
                <span className="text-white font-semibold">{flatPeriodLabel}</span> · {fmtShort(date)} → {fmtShort(pickupDate)}
              </p>
            )}
            {noSlotsToday && (
              <p className="col-span-2 lg:col-span-3 text-[11px] text-[#E8742C]" style={{ fontFamily: "var(--font-inter)" }}>
                {dict.noSlotsTodayNotice}
              </p>
            )}
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
            {dict.emailLabel}
            {lane === "flexible" && !errors.email && <span className="text-white/25 normal-case tracking-normal ml-1 font-medium">· {dict.optionalTag}</span>}
            {errors.email && <span className="text-red-400/80 normal-case tracking-normal ml-1">({errors.email})</span>}
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
                if (digits) setPax(Math.min(MAX_BAGS, Math.max(1, parseInt(digits, 10))));
                clearErr("pax");
              }}
              onBlur={() => {
                const n = paxInput ? Math.min(MAX_BAGS, Math.max(1, parseInt(paxInput, 10))) : 1;
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
            {/* Off: the descriptor + per-bag rate. On: the actual line-item
                math (N bags × rate), so the surcharge is visibly counted —
                the client's report was that it "wasn't calculating". */}
            <p className="text-[11px] text-white/28 mt-1 leading-snug" style={{ fontFamily: "var(--font-inter)" }}>
              {oversized
                ? `${oversizedCount} ${pluralizeWord(oversizedCount, dict.bagUnit)} × ${vnd(curFacts.oversizeSurcharge)}`
                : `${dict.oversizedHelpPrefix}${vnd(curFacts.oversizeSurcharge)}`}
            </p>
          </div>
          <div className="flex items-center gap-2.5 flex-shrink-0">
            {/* How many bags are oversized — only meaningful with more than
                one bag; with a single bag the count can only be 1. */}
            {oversized && pax > 1 && (
              <div className="relative">
                <select
                  aria-label={dict.oversizedCountLabel}
                  value={oversizedCount}
                  onChange={(e) => setOversizedBags(parseInt(e.target.value, 10))}
                  className="appearance-none bg-white/[0.07] border border-white/[0.14] rounded-md pl-2.5 pr-6 py-1 text-[14px] font-bold text-white focus:outline-none focus:border-[#E8742C]/70"
                  style={{ fontFamily: "var(--font-poppins)", colorScheme: "dark" }}
                >
                  {Array.from({ length: pax }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 text-white/40" />
              </div>
            )}
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
      </div>

      {/* Total */}
      <div className="flex items-center justify-between pt-0.5">
        <span className="text-[11.5px] text-white/30" style={{ fontFamily: "var(--font-inter)" }}>
          {curFacts.unit === "flat"
            /* Flat rate now bills per period — once it's more than one block
               the label shows the count ("Total (2 months)") so "flat fee"
               never contradicts a multiplied number. */
            ? (flatPeriods > 1 ? `${dict.totalPrefix}${flatPeriodLabel}${dict.totalSuffix}` : dict.totalFlatFee)
            : hourlyBillsAsDay
              /* Says "1 day", not "5 hours" — the label has to match the
                 number beside it, which is now the daily rate. */
              ? `${dict.totalPrefix}1 ${dict.dayUnit.singular}${dict.totalSuffix}`
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
