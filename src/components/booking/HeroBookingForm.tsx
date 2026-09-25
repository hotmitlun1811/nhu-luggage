"use client";

import { useState, useMemo, useEffect, useRef, useId, useSyncExternalStore } from "react";
import { Send, CheckCircle2, ChevronRight, LogIn, LogOut, MessageCircle } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { EFFECTIVE as LEGAL_EFFECTIVE } from "@/components/legal/LegalShared";
import { PLAN_FACTS, generateTimeSlots, surchargeUnits, vnd, type PlanKey } from "@/lib/plans";
import {
  MAX_CUSTOM_DAYS,
  addDays,
  compareStamps,
  describePiecesEn,
  isPickupValid,
  latestPickup,
  pickupSlots,
  quote,
  type PlanChoice,
  type Stamp,
} from "@/lib/pricing";
import { COUNTRY_BY_ISO, DEFAULT_COUNTRY_ISO } from "@/lib/countries";
import { formatDateTime, formatWeekdayDate, formatLongDate, pluralizeWord } from "@/lib/format";
import { generateReference } from "@/lib/reference";
import { buildBookingMessage, planLabel } from "@/lib/whatsapp-message";
import { POST_BOOKING_EMAIL_ENABLED } from "@/lib/features";
import type { Dictionary } from "@/content/types";
import type { AppLocale } from "@/content/locales";
import CountField from "./CountField";
import DateTimeField from "./DateTimeField";
import InfoTip from "./InfoTip";
import PhoneField from "./PhoneField";
import PlanSelect from "./PlanSelect";
import PriceBreakdown from "./PriceBreakdown";

// Client-only: renders via a document.body portal, which has no server
// equivalent — skipping SSR avoids a hydration mismatch entirely instead of
// papering over it with a mounted-after-effect gate.
const ConsentModal = dynamic(() => import("./ConsentModal"), { ssr: false });

const TIME_SLOTS = generateTimeSlots();
const ALL_PLANS: PlanChoice[] = [...(Object.keys(PLAN_FACTS) as PlanKey[]), "custom"];

// A sane upper bound on bag count — enough for a tour group, low enough that a
// fat-finger "22" for "2" can't ring up a runaway total. Over this, customers
// are told to message us.
const MAX_BAGS = 20;

// localStorage key for the auto-saved draft (see the restore/save effects).
// Bump it whenever the saved shape changes meaning, so an old draft is never
// restored into a form that reads it differently.
const DRAFT_KEY = "stow-booking-draft-v3";
const LEGACY_DRAFT_KEYS = ["stow-booking-draft-v1", "stow-booking-draft-v2"];

// English labels for the two network boundaries (WhatsApp + Lark), which stay
// English regardless of site locale (i18n plan, decision #4).
const PERIOD_LABEL_EN = { daily: "1 day", mini: "1 week", strand: "1 month", longstay: "4 months" } as const;

// Best guess at the visitor's country for the phone box: the region in their
// browser language ("en-US" → US), else the page language, else Vietnam.
function guessCountryIso(locale: AppLocale): string {
  const region = typeof navigator !== "undefined" ? navigator.language?.split("-")[1]?.toUpperCase() : undefined;
  if (region && COUNTRY_BY_ISO[region]) return region;
  return locale === "ko" ? "KR" : locale === "ja" ? "JP" : DEFAULT_COUNTRY_ISO;
}

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

const LABEL_TEXT = "text-[10px] font-bold uppercase tracking-[0.12em] text-white/30";
const LABEL = `block ${LABEL_TEXT} mb-1.5`;
// scroll-mt: when a failed submit focuses the first bad field, keep it clear of
// the fixed 72px nav instead of hiding it underneath.
const INPUT  = "w-full appearance-none bg-white/[0.07] border border-white/[0.12] rounded-lg px-3 py-2 text-[13px] text-white placeholder-white/25 focus:outline-none focus:border-[#E8742C]/70 focus-visible:border-[#E8742C]/70 data-[popup-open]:border-[#E8742C]/70 transition-colors scroll-mt-[96px]";
const ERR    = "border-red-400/70";
const EMAIL_RE = /^\S+@\S+\.\S+$/;
const SECTION_TITLE = "text-[11px] font-bold uppercase tracking-[0.12em] text-white/55 mb-2.5";
const NOTE = "text-[11px] text-white/35";
const NOTE_ERR = "text-[11px] text-red-400/80";

// Every field in the order it appears — a failed submit focuses the first one.
const FIELD_ORDER = ["date", "time", "pickupDate", "pickupTime", "pax", "name", "email", "phone", "consent"] as const;
// Drop-off and pick-up are one control each, so a date error and a time error
// on the same one both focus it.
const FOCUS_ID: Record<string, string> = { date: "dropoff", time: "dropoff", pickupDate: "pickup", pickupTime: "pickup" };

type EmailStatus = "idle" | "sending" | "sent" | "error";

export default function HeroBookingForm({ dict, locale }: { dict: Dictionary["booking"]; locale: AppLocale }) {
  const isClient = useIsClient();
  const uid = useId();
  const fid = (k: string) => `${uid}-${k}`;
  const nowClock = new Date();
  // SSR + the first client render use the UTC date (deterministic → hydration
  // matches); after mount we switch to the visitor's LOCAL date so "earliest
  // bookable day" and the past-slot filter are correct in their timezone.
  const today = isClient ? localDateStr(nowClock) : nowClock.toISOString().split("T")[0];
  const nowMinutes = nowClock.getHours() * 60 + nowClock.getMinutes();

  // The lane is not a separate choice: it follows from the plan picked in the
  // dropdown (Flexible: By the Hour / By the Day; Flat Rate: Mini / Strand /
  // Long Stay; Custom: any dates, priced as the cheapest mix of those).
  // There is NO default plan (owner request, 2026-09-19): it starts empty, and
  // everything below the dropdown is locked until one is chosen.
  const [chosenPlan, setChosenPlan] = useState<PlanChoice | null>(null);
  const [planOpen, setPlanOpen]     = useState(false);
  const locked = chosenPlan === null;
  // While locked `plan` reads as Custom (no limit on dates, no price), so the
  // checks below have something to work with and never decide anything for a
  // plan nobody chose.
  const plan: PlanChoice = chosenPlan ?? "custom";
  // How many bags are oversized (0 = none). Kept ≤ bags by changePax().
  const [oversizedInput, setOversizedInput] = useState(0);
  const [date, setDate]             = useState("");
  const [time, setTime]             = useState("");
  const [pax, setPax]               = useState(1);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [name, setName]             = useState("");
  // WhatsApp number = a country picker + the local number, kept apart so the
  // picker can default to the visitor's country and a pasted "+84 …" splits.
  const [phoneIso, setPhoneIso]       = useState(DEFAULT_COUNTRY_ISO);
  const [phoneNumber, setPhoneNumber] = useState("");
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

  function clearErr(...keys: string[]) {
    setErrors(p => { const n = { ...p }; keys.forEach(k => delete n[k]); return n; });
  }

  // ── Dates: drop-off first, then a pick-up the plan allows ──
  //
  // The drop-off decides everything about the pick-up (a plan's window starts
  // at the drop-off moment), so the pick-up field waits for it. By the Hour is
  // always same-day, so its pick-up date isn't chosen: it follows the drop-off
  // date and the field shows the date locked.
  const dropOff: Stamp | null = date && time ? { date, time } : null;
  const pickupDay = plan === "hourly" ? date : pickupDate;
  const pickUp: Stamp | null = pickupDay && pickupTime ? { date: pickupDay, time: pickupTime } : null;

  /* Same-day drop-off must not offer times that have already passed today (no
     more booking "today at 09:00" at 3pm). Gated on isClient so SSR and the
     first client render still emit the full list and hydration matches. */
  const dropoffSlotsFor = (iso: string) =>
    isClient && iso === today ? TIME_SLOTS.filter((t) => slotToMinutes(t) >= nowMinutes) : TIME_SLOTS;
  // What the plan allows on a given pick-up date (pricing.ts owns the rule).
  const pickupSlotsFor = (iso: string) => (dropOff ? pickupSlots(plan, dropOff, iso, TIME_SLOTS) : []);
  const pickupLimit = dropOff ? latestPickup(plan, dropOff) : null;
  const pickupMaxDate = dropOff ? (pickupLimit ? pickupLimit.date : addDays(dropOff.date, MAX_CUSTOM_DAYS)) : undefined;
  const fmtStamp = (s: Stamp) => `${formatWeekdayDate(s.date, locale)} · ${s.time}`;

  // After the plan or the drop-off changes, drop whatever part of the pick-up
  // is no longer allowed, so a field can never show a stale value. The date
  // is kept when it is still usable, so only the time has to be picked again.
  function reconcilePickup(nextPlan: PlanChoice, nextDate: string, nextTime: string) {
    if (!nextDate || !nextTime) { setPickupDate(""); setPickupTime(""); return; }
    const drop: Stamp = { date: nextDate, time: nextTime };
    if (nextPlan === "hourly") {
      if (pickupTime && !pickupSlots(nextPlan, drop, nextDate, TIME_SLOTS).includes(pickupTime)) setPickupTime("");
      return;
    }
    if (!pickupDate) return;
    const slots = pickupSlots(nextPlan, drop, pickupDate, TIME_SLOTS);
    if (slots.length === 0) { setPickupDate(""); setPickupTime(""); }
    else if (pickupTime && !slots.includes(pickupTime)) setPickupTime("");
  }

  // Switching plan keeps whatever the customer already entered. Only what the
  // new plan can't accept is dropped (see reconcilePickup).
  function choosePlan(pk: PlanChoice) {
    setChosenPlan(pk);
    // By the Hour has no pick-up date of its own (it is always the drop-off
    // date), so a pick-up can't carry across it in either direction: leaving
    // it would show a time with no date, and entering it would silently move
    // the pick-up to another day. Only a same-day pick-up survives the move
    // into it; otherwise the customer picks the pick-up again.
    if ((plan === "hourly") !== (pk === "hourly")) {
      const keepTime = pk === "hourly" && pickupDate === date && !!dropOff && pickupSlots("hourly", dropOff, date, TIME_SLOTS).includes(pickupTime);
      setPickupDate("");
      if (!keepTime) setPickupTime("");
      return;
    }
    reconcilePickup(pk, date, time);
  }

  // Restore a saved draft on mount so a reload / accidental navigation
  // doesn't wipe a long, half-filled form. Consent is deliberately NOT
  // restored — it must be re-given each session for a fresh timestamp.
  // `raw` is read synchronously (so the save effect below can't overwrite it
  // first); the state is applied in a microtask so these setState calls run
  // outside React's synchronous commit — no cascading-render lint, and no
  // hydration mismatch (this runs after hydration regardless).
  useEffect(() => {
    // Default the phone's country from the visitor's browser; a saved draft
    // (applied right after, in order) overrides it.
    Promise.resolve().then(() => setPhoneIso(guessCountryIso(locale)));
    let raw: string | null = null;
    try {
      // Old drafts hold name/phone/email — drop them rather than leave them behind.
      LEGACY_DRAFT_KEYS.forEach((k) => localStorage.removeItem(k));
      raw = localStorage.getItem(DRAFT_KEY);
    } catch { return; }
    if (!raw) return;
    Promise.resolve().then(() => {
      let d: Record<string, unknown>;
      try { d = JSON.parse(raw as string); } catch { return; }
      if (!d || typeof d !== "object") return;
      // Ignore stale drafts (>12h) so we never restore a now-past date.
      if (typeof d.savedAt === "number" && Date.now() - d.savedAt > 12 * 3600 * 1000) return;
      const t = localDateStr(new Date());
      const savedPlan = typeof d.plan === "string" && ALL_PLANS.includes(d.plan as PlanChoice) ? (d.plan as PlanChoice) : null;
      if (savedPlan) setChosenPlan(savedPlan);
      // Only restore a still-future drop-off; carry its times only with it.
      if (typeof d.date === "string" && d.date >= t) {
        setDate(d.date);
        if (typeof d.time === "string") setTime(d.time);
        // The pick-up comes back only if the saved plan still allows it (the
        // rules for it changed since older drafts were written).
        if (savedPlan && typeof d.time === "string" && typeof d.pickupTime === "string") {
          const pickDay = savedPlan === "hourly" ? d.date : typeof d.pickupDate === "string" ? d.pickupDate : "";
          if (pickDay && isPickupValid(savedPlan, { date: d.date, time: d.time }, { date: pickDay, time: d.pickupTime })) {
            if (savedPlan !== "hourly") setPickupDate(pickDay);
            setPickupTime(d.pickupTime);
          }
        }
      }
      if (typeof d.pax === "number" && d.pax >= 1) {
        const p = Math.min(MAX_BAGS, Math.floor(d.pax));
        setPax(p);
        if (typeof d.oversizedCount === "number" && d.oversizedCount >= 0) setOversizedInput(Math.min(p, Math.floor(d.oversizedCount)));
      }
      if (typeof d.name === "string") setName(d.name);
      if (typeof d.phoneIso === "string" && COUNTRY_BY_ISO[d.phoneIso]) setPhoneIso(d.phoneIso);
      if (typeof d.phoneNumber === "string") setPhoneNumber(d.phoneNumber);
      if (typeof d.email === "string") setEmail(d.email);
    });
  }, [locale]);

  // Persist the draft on every change. Writes only (no setState), so this is
  // a plain external-system sync; best-effort (private mode / quota throws).
  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({
        savedAt: Date.now(), plan: chosenPlan, oversizedCount: oversizedInput,
        date, time, pax, pickupDate, pickupTime, name, phoneIso, phoneNumber, email,
      }));
    } catch { /* best-effort */ }
  }, [chosenPlan, oversizedInput, date, time, pax, pickupDate, pickupTime, name, phoneIso, phoneNumber, email]);

  // "+84 905955161": the dial code plus the local digits, with any leading 0
  // dropped (people type 0905… but WhatsApp wants 905…). Empty until a number
  // is typed. This string is what the WhatsApp message and Lark record carry.
  const phoneDigits = phoneNumber.replace(/\D/g, "").replace(/^0+/, "");
  const phone = phoneDigits ? `${(COUNTRY_BY_ISO[phoneIso] ?? COUNTRY_BY_ISO[DEFAULT_COUNTRY_ISO]).dial} ${phoneDigits}` : "";

  // Oversized bags actually billed — never more than the bags themselves
  // (the count field's max already stops that; this guards restored drafts).
  const oversizedCount = Math.min(oversizedInput, pax);

  // What the stay costs. Every price rule lives in src/lib/pricing.ts (tested
  // with exact figures): fixed plans, By the Hour's 4-hour cap, Custom's
  // cheapest mix, and the oversized surcharge per lane and per plan period.
  // It returns a price only when the dates are complete (a fixed plan also
  // shows its list price before that).
  const q = useMemo(
    () => quote({
      plan,
      dropOff: date && time ? { date, time } : null,
      pickUp: pickupDay && pickupTime ? { date: pickupDay, time: pickupTime } : null,
      bags: pax,
      oversizedBags: oversizedCount,
    }),
    [plan, date, time, pickupDay, pickupTime, pax, oversizedCount]
  );
  const quoted = q.ok ? q : null;
  const total = quoted?.total ?? 0;

  // Changing the drop-off date keeps everything already chosen unless the new
  // date makes it impossible: a drop-off time that has passed (when today is
  // picked) or a pick-up the plan no longer allows.
  function changeDate(v: string) {
    setDate(v);
    clearErr("date", "time", "pickupDate", "pickupTime");
    const timeOk = !(v === today && time && slotToMinutes(time) < nowMinutes);
    if (!timeOk) setTime("");
    reconcilePickup(plan, v, timeOk ? time : "");
  }

  function changeTime(v: string) {
    setTime(v);
    clearErr("time", "pickupTime");
    reconcilePickup(plan, date, v);
  }

  function changePickupDate(v: string) {
    setPickupDate(v);
    clearErr("pickupDate", "pickupTime");
    // A time picked for another date may not exist on this one.
    if (dropOff && pickupTime && !pickupSlots(plan, dropOff, v, TIME_SLOTS).includes(pickupTime)) setPickupTime("");
  }

  function changePickupTime(v: string) {
    setPickupTime(v);
    clearErr("pickupTime");
  }

  function changePax(n: number) {
    setPax(n);
    setOversizedInput((o) => Math.min(o, n));
    clearErr("pax");
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!date) e.date = dict.required;
    else if (date < today) e.date = dict.dateInPast;
    // A time that has since passed (left selected while today's slots aged
    // out) is no longer in the list, so it reads as "not chosen".
    if (!time || !dropoffSlotsFor(date).includes(time)) e.time = dict.required;
    // By the Hour has no pick-up date to fill in — it follows drop-off.
    if (plan !== "hourly" && !pickupDate) e.pickupDate = dict.required;
    if (!pickupTime) e.pickupTime = dict.required;
    else if (dropOff && pickUp && !isPickupValid(plan, dropOff, pickUp)) {
      e.pickupTime = compareStamps(pickUp, dropOff) <= 0 ? dict.pickupBeforeDropOff : dict.pickupOutsidePlan;
    }
    if (!pax || pax < 1) e.pax = dict.required;
    if (!name.trim()) e.name = dict.required;
    // Every field is required (owner decision, 2026-09-19) — email included,
    // which used to be optional on the Flexible lane.
    if (!email.trim()) e.email = dict.required;
    else if (!EMAIL_RE.test(email.trim())) e.email = dict.invalidEmail;
    // Phone is the only callback path (WhatsApp handoff uses the business's
    // own number, not this one), so reject obvious junk. The country code is
    // picked separately, so this counts the local digits only: 6 to 12 covers
    // every real number (a Vietnamese mobile is 9).
    if (!phoneNumber.trim()) e.phone = dict.required;
    else if (phoneDigits.length < 6 || phoneDigits.length > 12) e.phone = dict.invalidPhone;
    if (!consent) e.consent = dict.required;
    return e;
  }

  function focusFirstError(errs: Record<string, string>) {
    const first = FIELD_ORDER.find((k) => errs[k]);
    if (!first) return;
    setTimeout(() => document.getElementById(fid(FOCUS_ID[first] ?? first))?.focus(), 0);
  }

  // ── What goes out over the network (always English, see the note at the top) ──

  // Custom has its own Lane and Plan option in the Lark table. `fallback` is
  // what to record instead if the table has not got that option yet: the plan
  // that makes up most of the price. The Duration text spells out the mix either way.
  function recordPlan(): {
    lane: "flexible" | "flatrate" | "custom";
    planName: string;
    fallback?: { lane: "flexible" | "flatrate"; planName: string };
  } {
    if (plan !== "custom") return { lane: PLAN_FACTS[plan].lane, planName: PLAN_FACTS[plan].canonicalName };
    const pieces = quoted?.pieces ?? [];
    const main = pieces.reduce((a, b) => (b.count * b.unitPrice > a.count * a.unitPrice ? b : a), pieces[0]);
    return {
      lane: "custom",
      planName: "Custom",
      fallback: { lane: PLAN_FACTS[main.plan].lane, planName: PLAN_FACTS[main.plan].canonicalName },
    };
  }

  function durationEn(): string {
    if (!quoted) return "";
    if (quoted.stayHours !== null) {
      const hours = `${quoted.stayHours} hour${quoted.stayHours > 1 ? "s" : ""}${quoted.hourlyBilledAsDay ? " (billed as 1 day)" : ""}`;
      return plan === "custom" ? `Custom: ${describePiecesEn(quoted.pieces)} (${hours})` : hours;
    }
    if (plan === "custom") return `Custom: ${describePiecesEn(quoted.pieces)} (${quoted.stayDays} day${quoted.stayDays > 1 ? "s" : ""})`;
    return PERIOD_LABEL_EN[plan as Exclude<PlanKey, "hourly">];
  }

  // "2× Strand 50.000 ₫": the oversized surcharge, one term per plan in the
  // price. The multiplier is surchargeUnits, not the piece count: one Long
  // Stay piece is charged as 4 (one per month it bundles).
  function surchargeTermsEn(q: NonNullable<typeof quoted>) {
    return q.pieces
      .map((p) => `${surchargeUnits(p.plan, p.count)}× ${PLAN_FACTS[p.plan].canonicalName} ${vnd(PLAN_FACTS[p.plan].oversizeSurcharge)}`)
      .join(" + ");
  }

  // The price worked out, one step per line, for the Lark "Price Detail" column
  // and the group chat: the same steps the customer sees under the total.
  function priceDetailEn(): string {
    if (!quoted) return "";
    const stay = quoted.stayHours !== null
      ? `Stay: ${quoted.stayHours} hour${quoted.stayHours > 1 ? "s" : ""}${quoted.hourlyBilledAsDay ? " (billed as 1 day)" : ""}`
      : `Stay: ${quoted.stayDays} day${quoted.stayDays > 1 ? "s" : ""}`;
    const lines = [
      stay,
      `Per bag: ${quoted.pieces.map((p) => `${p.count}× ${PLAN_FACTS[p.plan].canonicalName} (${vnd(p.unitPrice)})`).join(" + ")} = ${vnd(quoted.perBag)}`,
      `Bags: ${pax} × ${vnd(quoted.perBag)} = ${vnd(quoted.perBag * pax)}`,
    ];
    if (oversizedCount > 0) {
      lines.push(`Oversized: ${oversizedCount} × ${vnd(quoted.surchargePerOversizedBag)} (${surchargeTermsEn(quoted)}) = ${vnd(oversizedCount * quoted.surchargePerOversizedBag)}`);
    }
    lines.push(`Total: ${vnd(total)}`);
    return lines.join("\n");
  }

  // The message the customer sends to Stow on WhatsApp. Always English (staff
  // read it on the shop's own number); the wording and layout live in
  // lib/whatsapp-message.ts, where they are tested.
  function buildMessage(ref: string) {
    if (!quoted) return "";
    return buildBookingMessage({
      bookingId: ref,
      plan: planLabel(plan),
      dropOff: `${formatLongDate(date, "en")} at ${time}`,
      pickUp: `${formatLongDate(pickupDay, "en")} at ${pickupTime}`,
      planEnd: quoted.planEnd ? `${formatLongDate(quoted.planEnd.date, "en")} at ${quoted.planEnd.time}` : undefined,
      bags: pax,
      oversizedBags: oversizedCount,
      total: vnd(total),
      name,
      whatsapp: phone,
      email,
      consent: consentAt ? { version: LEGAL_EFFECTIVE, at: formatDateTime(consentAt, "en") } : undefined,
    });
  }

  function sendLarkBooking(ref: string) {
    const { lane, planName, fallback } = recordPlan();
    // Fire-and-forget — the WhatsApp handoff below is the customer's actual
    // confirmation path, so a Lark hiccup must never block or delay it.
    fetch("/api/lark/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "Booking Form",
        reference: ref,
        lane,
        planName,
        fallback,
        oversized: oversizedCount > 0,
        oversizedCount,
        dropOffDate: date,
        dropOffTime: time,
        duration: durationEn(),
        // Hourly follows the drop-off date; every other plan uses its own.
        pickupDate: pickupDay,
        pickupTime,
        name: name.trim(),
        // International format with no spaces ("+84905955161"), as the Lark table keeps it.
        phone: phone.replace(/\s+/g, ""),
        email: email.trim(),
        pax,
        total,
        priceDetail: priceDetailEn(),
        // Stored by the "Bookings v2" table; the original table ignores them.
        pricePerBag: quoted?.perBag,
        oversizedSurcharge: quoted ? oversizedCount * quoted.surchargePerOversizedBag : undefined,
        phoneCountry: phoneIso,
        consentAt: consentAt ? consentAt.toISOString() : undefined,
        termsVersion: LEGAL_EFFECTIVE,
        planEndDate: quoted?.planEnd?.date,
        planEndTime: quoted?.planEnd?.time,
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
      const { lane } = recordPlan();
      const res = await fetch("/api/send-agreement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email.trim(),
          name: name.trim(),
          ref,
          planName: plan === "custom" ? "Custom" : PLAN_FACTS[plan].canonicalName,
          planDuration: plan === "custom" ? durationEn() : PLAN_FACTS[plan].canonicalDuration,
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
    if (submittingRef.current || locked) return;
    const errs = validate();
    if (Object.keys(errs).length || !quoted?.complete) { setErrors(errs); focusFirstError(errs); return; }
    setErrors({});
    submittingRef.current = true;
    setLoading(true);
    const ref = generateReference(date || today);
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

  // "Book again" starts a fresh booking. Contact details are kept (same
  // person, likely the same phone), but the plan, dates, bags and the consent
  // are cleared — consent must be re-given so the next booking carries its
  // own read-in-full timestamp.
  function bookAgain() {
    setSubmitted(false);
    setChosenPlan(null);
    setDate(""); setTime(""); setPickupDate(""); setPickupTime("");
    setPax(1); setOversizedInput(0);
    setConsent(false); setConsentAt(null);
    setErrors({});
  }

  // A short message (Required) sits beside its label; anything longer (a
  // date-order or past-date problem) goes on its own line under the field, so
  // it can't wrap a narrow column's label into misaligned inputs.
  const inlineErr = (k: string, always = false) =>
    errors[k] && (always || errors[k] === dict.required) ? errors[k] : null;
  const rowErr = (...keys: string[]) =>
    keys.map((k) => errors[k]).find((m) => m && m !== dict.required);
  const fieldLabel = (k: string, text: string, always = false) => (
    <label htmlFor={fid(k)} className={LABEL} style={{ fontFamily: "var(--font-poppins)" }}>
      {text}
      {inlineErr(k, always) && <span className="text-red-400/80 normal-case tracking-normal ml-1">({inlineErr(k, always)})</span>}
    </label>
  );
  // The label of a drop-off / pick-up field. It is a real <label> for the
  // field's button, so the button is announced as "Drop-off date, <value>".
  // No "(Required)" here: the two labels sit side by side in narrow columns and
  // must each stay on one line, so problems are listed under the row instead.
  const groupLabel = (k: "dropoff" | "pickup", text: string, Icon: typeof LogIn) => (
    <label
      id={fid(`${k}-label`)}
      htmlFor={fid(k)}
      className={`mb-1.5 flex items-center gap-1.5 ${LABEL_TEXT}`}
      style={{ fontFamily: "var(--font-poppins)" }}
    >
      <Icon size={12} className="flex-shrink-0 text-[#E8742C]" aria-hidden />
      <span className="truncate">{text}</span>
    </label>
  );

  // Problems with the drop-off / pick-up row, named after the field they are
  // about, e.g. "Pick-up date (Required)".
  const dateRowMessages = [
    (errors.date === dict.required || errors.time === dict.required) && `${dict.dropOffDateLabel} (${dict.required})`,
    rowErr("date", "time"),
    (errors.pickupDate === dict.required || errors.pickupTime === dict.required) && `${dict.pickupDateLabel} (${dict.required})`,
    rowErr("pickupDate", "pickupTime"),
  ].filter((m): m is string => typeof m === "string" && m.length > 0);

  // The label beside the total has to match the number: "Total (46 days)", not a stale plan name.
  const dayLabel = (n: number) => `${dict.totalPrefix}${n} ${pluralizeWord(n, dict.dayUnit)}${dict.totalSuffix}`;
  const totalLabel = !quoted
    ? dict.totalLabel
    : quoted.stayHours !== null
    ? quoted.hourlyBilledAsDay
      ? dayLabel(1)
      : `${dict.totalPrefix}${quoted.stayHours} ${pluralizeWord(quoted.stayHours, dict.hourUnit)}${dict.totalSuffix}`
    : plan === "custom"
    ? dayLabel(quoted.stayDays)
    : plan === "daily"
    ? dayLabel(1)
    : dict.totalFlatFee;

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
            onClick={bookAgain}
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
       the first row would otherwise crowd the rounded top edge. */
    <form onSubmit={handleSubmit} noValidate className="px-5 pb-5 pt-5 flex flex-col gap-3.5">

      {/* Plan — one dropdown, grouped by lane, no default */}
      <div>
        <PlanSelect
          value={chosenPlan}
          onChange={choosePlan}
          open={planOpen}
          onOpenChange={setPlanOpen}
          dict={dict}
          className={INPUT}
        />
        {locked && <p className="mt-2 text-[11.5px] font-medium text-white/70" style={{ fontFamily: "var(--font-inter)" }}>{dict.planFirstHint}</p>}
      </div>

      {/* Everything below waits for a plan. A disabled <fieldset> locks every
          field, button and picker inside it in one go (and announces them as
          disabled), and the cover on top turns a tap anywhere on the dimmed
          form into "open the plan dropdown", so a visitor is never stuck
          wondering why nothing responds. */}
      <div className="relative">
      <fieldset
        disabled={locked}
        className={`m-0 flex min-w-0 flex-col gap-3.5 border-0 p-0 transition-opacity duration-200 ${locked ? "opacity-40" : ""}`}
      >

      {/* Drop-off first, then pick-up: one date-and-time field each, side by
          side. The pick-up waits for the drop-off because the plan decides how
          late it can be (a day, a week, a month, ...; Custom has no limit).
          By the Hour locks the pick-up date to the drop-off date. */}
      <div className="flex flex-col gap-1.5">
        <div className="grid grid-cols-2 gap-2">
          <div className="min-w-0">
            {groupLabel("dropoff", dict.dropOffDateLabel, LogIn)}
            <DateTimeField
              id={fid("dropoff")}
              labelId={fid("dropoff-label")}
              className={`${INPUT} ${errors.date || errors.time ? ERR : ""}`}
              locale={locale}
              date={date}
              time={time}
              onDateChange={changeDate}
              onTimeChange={changeTime}
              minDate={today}
              today={today}
              slotsFor={dropoffSlotsFor}
              emptySlotsNote={dict.noSlotsTodayNotice}
              dateWord={dict.dateWord}
              timeWord={dict.timeWord}
              prevMonthLabel={dict.prevMonthLabel}
              nextMonthLabel={dict.nextMonthLabel}
            />
          </div>
          <div className="min-w-0">
            {groupLabel("pickup", dict.pickupDateLabel, LogOut)}
            <DateTimeField
              id={fid("pickup")}
              labelId={fid("pickup-label")}
              className={`${INPUT} ${errors.pickupDate || errors.pickupTime ? ERR : ""}`}
              locale={locale}
              date={pickupDay}
              time={pickupTime}
              onDateChange={changePickupDate}
              onTimeChange={changePickupTime}
              minDate={dropOff ? dropOff.date : today}
              maxDate={pickupMaxDate}
              today={today}
              dateLocked={plan === "hourly"}
              disabled={!dropOff}
              slotsFor={pickupSlotsFor}
              emptySlotsNote={dict.noLaterSlotsNotice}
              popupAlign="end"
              dateWord={dict.dateWord}
              timeWord={dict.timeWord}
              prevMonthLabel={dict.prevMonthLabel}
              nextMonthLabel={dict.nextMonthLabel}
            />
          </div>
        </div>
        {dateRowMessages.map((m) => (
          <p key={m} role="alert" className={NOTE_ERR} style={{ fontFamily: "var(--font-inter)" }}>{m}</p>
        ))}
        {!locked && !dropOff && <p className={NOTE} style={{ fontFamily: "var(--font-inter)" }}>{dict.pickupFirstNote}</p>}
        {plan === "hourly" && !locked && <p className={NOTE} style={{ fontFamily: "var(--font-inter)" }}>{dict.sameDayNote}</p>}
        {/* Where this plan stops: the customer sees the limit before hitting it. */}
        {dropOff && pickupLimit && plan !== "hourly" && (
          <p className={NOTE} style={{ fontFamily: "var(--font-inter)" }}>
            {dict.latestPickupPrefix}<span className="text-white/70 font-semibold">{fmtStamp(pickupLimit)}</span>
          </p>
        )}
        {plan === "custom" && !locked && <p className={NOTE} style={{ fontFamily: "var(--font-inter)" }}>{dict.customHint}</p>}
      </div>

      {/* How many bags, and how many of them are oversized. */}
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="min-w-0">
            {fieldLabel("pax", dict.bagsLabel)}
            <CountField
              id={fid("pax")}
              value={pax}
              min={1}
              max={MAX_BAGS}
              onChange={changePax}
              decLabel={dict.decreaseLabel}
              incLabel={dict.increaseLabel}
              invalid={!!errors.pax}
            />
          </div>
          <div className="min-w-0">
            <div className="mb-1.5 flex items-center gap-1">
              <label htmlFor={fid("oversized")} className={LABEL_TEXT} style={{ fontFamily: "var(--font-poppins)" }}>
                {dict.oversizedCountLabel}
              </label>
              <InfoTip label={dict.oversizedTipLabel}>{dict.oversizedTipBody}</InfoTip>
            </div>
            <CountField
              id={fid("oversized")}
              value={oversizedCount}
              min={0}
              max={pax}
              onChange={setOversizedInput}
              decLabel={dict.decreaseLabel}
              incLabel={dict.increaseLabel}
            />
          </div>
        </div>
        <div className="flex flex-col gap-0.5 text-[10.5px] text-white/25" style={{ fontFamily: "var(--font-inter)" }}>
          <p>{dict.bagsHelp}</p>
          {/* The surcharge differs by lane: Flexible plans 30,000, Flat Rate
              plans 50,000. Custom mixes both, so it shows both. */}
          <p className={locked ? "invisible" : undefined}>
            {dict.oversizedHelpPrefix}
            {plan === "custom"
              ? `${vnd(PLAN_FACTS.daily.oversizeSurcharge)} ${dict.perDayLabel}, +${vnd(PLAN_FACTS.mini.oversizeSurcharge)} ${dict.perPeriodLabel}`
              : vnd(PLAN_FACTS[plan].oversizeSurcharge)}
          </p>
        </div>
      </div>

      {/* Contact information */}
      <div className="border-t border-white/[0.08] pt-3.5">
        <p className={SECTION_TITLE} style={{ fontFamily: "var(--font-poppins)" }}>{dict.contactTitle}</p>
        <div className="grid grid-cols-2 gap-2">
          <div className="min-w-0">
            {fieldLabel("name", dict.nameLabel, true)}
            <input
              id={fid("name")}
              type="text"
              placeholder={dict.namePlaceholder}
              value={name}
              autoComplete="name"
              aria-invalid={errors.name ? true : undefined}
              onChange={(e) => { setName(e.target.value); clearErr("name"); }}
              className={`${INPUT} ${errors.name ? ERR : ""}`}
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>
          <div className="min-w-0">
            {fieldLabel("email", dict.emailLabel, true)}
            <input
              id={fid("email")}
              type="email"
              placeholder={dict.emailPlaceholder}
              value={email}
              autoComplete="email"
              aria-invalid={errors.email ? true : undefined}
              onChange={(e) => { setEmail(e.target.value); clearErr("email"); }}
              className={`${INPUT} ${errors.email ? ERR : ""}`}
              style={{ fontFamily: "var(--font-inter)" }}
            />
          </div>
          <div className="col-span-2 min-w-0">
            {fieldLabel("phone", dict.whatsappLabel, true)}
            <PhoneField
              id={fid("phone")}
              locale={locale}
              iso={phoneIso}
              number={phoneNumber}
              onIsoChange={(iso) => { setPhoneIso(iso); clearErr("phone"); }}
              onNumberChange={(v) => { setPhoneNumber(v); clearErr("phone"); }}
              countryLabel={dict.phoneCountryLabel}
              labels={{ search: dict.phoneCountrySearch, empty: dict.phoneCountryEmpty }}
              placeholder={dict.whatsappPlaceholder}
              invalid={!!errors.phone}
              inputClassName={`${INPUT} ${errors.phone ? ERR : ""}`}
            />
          </div>
        </div>
      </div>

      {/* Total, with the working under it. Hidden while locked: no price for a
          plan nobody chose. The receipt reads the same quote as the total, so
          its lines always add up to it. */}
      <div className={`flex flex-col gap-2.5 ${locked ? "invisible" : ""}`}>
        <div className="flex items-center justify-between pt-0.5">
          <span className="text-[11.5px] text-white/30" style={{ fontFamily: "var(--font-inter)" }}>
            {totalLabel}
            {pax > 1 ? ` · ${pax} ${dict.bagUnit.plural}` : ""}
          </span>
          <span className="text-[21px] font-bold text-[#E8742C]" style={{ fontFamily: "var(--font-poppins)" }}>
            {quoted ? vnd(total) : "—"}
          </span>
        </div>
        <PriceBreakdown
          dict={dict}
          locale={locale}
          quote={quoted}
          bags={pax}
          oversizedBags={oversizedCount}
          pickUp={pickUp}
        />
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
            id={fid("consent")}
            type="button"
            onClick={() => setShowConsentModal(true)}
            className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border text-left transition-colors scroll-mt-[96px] ${
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

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-[#E8742C] hover:bg-[#C85E1E] disabled:opacity-70 text-white font-bold text-[14px] py-3.5 rounded-xl transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8742C]"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {loading ? (
          <>
            {/* Explicit px: this project's spacing scale makes w-4/h-4 4px. */}
            <span className="w-[16px] h-[16px] rounded-full border-2 border-white/30 border-t-white animate-spin" />
            {dict.submitLoading}
          </>
        ) : (
          <>
            <Send size={14} />
            {dict.submitIdle}
          </>
        )}
      </button>
      </fieldset>
      {locked && (
        <div aria-hidden className="absolute inset-0 z-10 cursor-pointer" onClick={() => setPlanOpen(true)} />
      )}
      </div>

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

    </form>
  );
}
