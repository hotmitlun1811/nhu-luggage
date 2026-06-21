"use client";

import { useState, useMemo, useEffect } from "react";
import { CheckCircle2, Send, RotateCcw } from "lucide-react";

type Lane = "flexible" | "flatrate";
type PlanKey = "hourly" | "daily" | "mini" | "standard" | "longstay";

const PLANS: Record<PlanKey, {
  name: string;
  price: number;
  unit: string;
  duration: string;
  lane: Lane;
  oversizeSurcharge: number;
}> = {
  hourly:   { name: "By the Hour", price: 15000,  unit: "/ hr",  duration: "Min 1 hr, billed per hr",  lane: "flexible", oversizeSurcharge: 30000 },
  daily:    { name: "By the Day",  price: 60000,  unit: "/ day", duration: "Up to 24 hrs from drop-off", lane: "flexible", oversizeSurcharge: 30000 },
  mini:     { name: "Mini",        price: 150000, unit: "flat",  duration: "Up to 1 week",              lane: "flatrate", oversizeSurcharge: 50000 },
  standard: { name: "Standard",    price: 300000, unit: "flat",  duration: "Up to 1 month",             lane: "flatrate", oversizeSurcharge: 50000 },
  longstay: { name: "Long Stay",   price: 500000, unit: "flat",  duration: "Up to 3 months",            lane: "flatrate", oversizeSurcharge: 50000 },
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

type Confirmed = {
  ref: string;
  lane: Lane;
  planName: string;
  planDuration: string;
  oversized: boolean;
  date: string;
  time: string;
  name: string;
  phone: string;
  total: number;
};

export default function IntakeForm() {
  const [lane, setLane]           = useState<Lane>("flexible");
  const [plan, setPlan]           = useState<PlanKey>("daily");
  const [oversized, setOversized] = useState(false);
  const [date, setDate]           = useState("");
  const [time, setTime]           = useState("");
  const [name, setName]           = useState("");
  const [phone, setPhone]         = useState("");
  const [errors, setErrors]       = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState<Confirmed | null>(null);

  // Auto-fill date and time to now on mount
  useEffect(() => {
    const now = new Date();
    setDate(now.toISOString().split("T")[0]);
    const h = now.getHours();
    const m = now.getMinutes() >= 30 ? 30 : 0;
    setTime(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  }, []);

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
    if (!date)         e.date  = "Required";
    if (!time)         e.time  = "Required";
    if (!name.trim())  e.name  = "Required";
    if (!phone.trim()) e.phone = "Required";
    return e;
  }

  function generateRef() {
    const d = date.replace(/-/g, "").slice(2); // YYMMDD
    const n = Math.floor(Math.random() * 9000 + 1000);
    return `STW-${d}-${n}`;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setConfirmed({
      ref: generateRef(),
      lane,
      planName: cur.name,
      planDuration: cur.duration,
      oversized,
      date,
      time,
      name: name.trim(),
      phone: phone.trim(),
      total,
    });
  }

  function handleReset() {
    const now = new Date();
    setLane("flexible");
    setPlan("daily");
    setOversized(false);
    setDate(now.toISOString().split("T")[0]);
    const h = now.getHours();
    const m = now.getMinutes() >= 30 ? 30 : 0;
    setTime(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    setName("");
    setPhone("");
    setErrors({});
    setConfirmed(null);
  }

  // ── Confirmation screen ──
  if (confirmed) {
    const dateLabel = new Date(confirmed.date + "T12:00:00").toLocaleDateString("en-GB", {
      weekday: "short", day: "numeric", month: "short", year: "numeric",
    });

    const waText = [
      `Hi ${confirmed.name}! Your Stow booking is confirmed. ✅`,
      ``,
      `📋 Ref: ${confirmed.ref}`,
      `📦 Plan: ${confirmed.planName}`,
      confirmed.oversized ? `📏 Item: Oversized` : `📏 Item: Standard`,
      `📅 Drop-off: ${dateLabel} at ${confirmed.time}`,
      `💰 Total: ${vnd(confirmed.total)}`,
      ``,
      `Keep this message — show it at pick-up.`,
      `Open 7am–10pm · WhatsApp: 0905 955 161`,
      `— Stow Da Nang`,
    ].join("\n");

    const waURL = `https://wa.me/${confirmed.phone.replace(/\D/g, "")}?text=${encodeURIComponent(waText)}`;

    return (
      <div className="max-w-lg mx-auto px-6 py-10">
        {/* Booking reference — large, for ID tag */}
        <div className="bg-[#E8742C] rounded-2xl p-6 text-center mb-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/70 mb-2" style={{ fontFamily: "var(--font-poppins)" }}>
            Booking reference
          </p>
          <p className="text-[36px] font-bold text-white tracking-wide" style={{ fontFamily: "var(--font-poppins)" }}>
            {confirmed.ref}
          </p>
          <p className="text-[12px] text-white/60 mt-1" style={{ fontFamily: "var(--font-inter)" }}>
            Write this on the ID tag
          </p>
        </div>

        {/* Booking details */}
        <div className="bg-[#1E3356] rounded-2xl p-6 mb-4">
          <div className="flex items-center gap-2 mb-5">
            <CheckCircle2 size={18} className="text-emerald-400" strokeWidth={2} />
            <span className="text-[14px] font-semibold text-white" style={{ fontFamily: "var(--font-poppins)" }}>
              Booking recorded
            </span>
          </div>

          <div className="flex flex-col gap-3.5">
            {[
              { label: "Plan",      value: `${confirmed.planName} — ${confirmed.planDuration}` },
              { label: "Lane",      value: confirmed.lane === "flexible" ? "Lane 1 — Flexible" : "Lane 2 — Flat Rate" },
              { label: "Item size", value: confirmed.oversized ? "Oversized" : "Standard" },
              { label: "Drop-off",  value: `${dateLabel} · ${confirmed.time}` },
              { label: "Customer",  value: `${confirmed.name}` },
              { label: "Phone",     value: confirmed.phone },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-start justify-between gap-4">
                <span className="text-[13px] text-white/40 flex-shrink-0 w-20" style={{ fontFamily: "var(--font-inter)" }}>{label}</span>
                <span className="text-[13px] text-white text-right" style={{ fontFamily: "var(--font-inter)" }}>{value}</span>
              </div>
            ))}

            <div className="border-t border-white/10 pt-3.5 flex items-center justify-between">
              <span className="text-[14px] font-semibold text-white" style={{ fontFamily: "var(--font-poppins)" }}>Total due</span>
              <span className="text-[22px] font-bold text-[#E8742C]" style={{ fontFamily: "var(--font-poppins)" }}>{vnd(confirmed.total)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <a
            href={waURL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 bg-[#25D366] text-white font-semibold text-[15px] py-4 rounded-xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            <Send size={16} />
            Send confirmation to customer
          </a>
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-2.5 bg-[#1E3356] text-white/80 font-semibold text-[15px] py-4 rounded-xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            <RotateCcw size={15} />
            New booking
          </button>
        </div>
      </div>
    );
  }

  // ── Intake form ──
  const inputCls = (err?: string) =>
    `w-full px-5 py-3 rounded-xl border text-[15px] text-white bg-[#1E3356] placeholder-white/25 focus:outline-none focus:border-[#E8742C] transition-colors ${
      err ? "border-red-400" : "border-white/10"
    }`;

  const labelCls = "block text-[12px] font-bold uppercase tracking-[0.1em] text-white/50 mb-2";

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-lg mx-auto px-6 py-10 flex flex-col gap-5">

      {/* Lane — two clearly separate options */}
      <div>
        <p className={labelCls} style={{ fontFamily: "var(--font-poppins)" }}>Lane</p>
        <div className="grid grid-cols-2 gap-3">
          {(["flexible", "flatrate"] as Lane[]).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => switchLane(l)}
              className={`py-4 rounded-xl border text-[14px] font-semibold transition-all ${
                lane === l
                  ? "bg-[#E8742C] border-[#E8742C] text-white"
                  : "bg-[#1E3356] border-white/10 text-white/50"
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
        <p className={labelCls} style={{ fontFamily: "var(--font-poppins)" }}>Plan</p>
        <div className="flex flex-col gap-2">
          {(lane === "flexible" ? FLEX_PLANS : FLAT_PLANS).map((pk) => {
            const p = PLANS[pk];
            const selected = plan === pk;
            return (
              <button
                key={pk}
                type="button"
                onClick={() => setPlan(pk)}
                className={`flex items-center justify-between px-5 py-3.5 rounded-xl border transition-all ${
                  selected ? "bg-[#E8742C]/15 border-[#E8742C] text-white" : "bg-[#1E3356] border-white/10 text-white/60"
                }`}
              >
                <div className="flex items-center gap-3 text-left">
                  <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${selected ? "border-[#E8742C]" : "border-white/20"}`}>
                    {selected && <div className="w-2 h-2 rounded-full bg-[#E8742C]" />}
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold" style={{ fontFamily: "var(--font-poppins)" }}>{p.name}</p>
                    <p className="text-[11px] text-white/35 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>{p.duration}</p>
                  </div>
                </div>
                <span className="text-[16px] font-bold flex-shrink-0 ml-4" style={{ fontFamily: "var(--font-poppins)" }}>
                  {vnd(p.price)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Oversized toggle */}
      <div className="flex items-center justify-between bg-[#1E3356] rounded-xl px-5 py-3.5 border border-white/10">
        <div>
          <p className="text-[14px] font-semibold text-white" style={{ fontFamily: "var(--font-poppins)" }}>Oversized item?</p>
          <p className="text-[12px] text-white/35 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
            28″+, bike, surfboard, large box — +{vnd(cur.oversizeSurcharge)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOversized(!oversized)}
          aria-pressed={oversized}
          className={`relative w-14 h-7 rounded-full transition-colors flex-shrink-0 ml-4 ${oversized ? "bg-[#E8742C]" : "bg-white/15"}`}
        >
          <span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${oversized ? "left-[calc(100%_-_24px)]" : "left-1"}`} />
        </button>
      </div>

      {/* Date + Time */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="i-date" className={labelCls} style={{ fontFamily: "var(--font-poppins)" }}>
            Date {errors.date && <span className="text-red-400 normal-case tracking-normal ml-1">{errors.date}</span>}
          </label>
          <input
            id="i-date"
            type="date"
            value={date}
            onChange={(e) => { setDate(e.target.value); clearError("date"); }}
            className={inputCls(errors.date)}
            style={{ fontFamily: "var(--font-inter)", colorScheme: "dark" }}
          />
        </div>
        <div>
          <label htmlFor="i-time" className={labelCls} style={{ fontFamily: "var(--font-poppins)" }}>
            Time {errors.time && <span className="text-red-400 normal-case tracking-normal ml-1">{errors.time}</span>}
          </label>
          <select
            id="i-time"
            value={time}
            onChange={(e) => { setTime(e.target.value); clearError("time"); }}
            className={inputCls(errors.time)}
            style={{ fontFamily: "var(--font-inter)", colorScheme: "dark" }}
          >
            <option value="">—</option>
            {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Contact info */}
      <div>
        <label htmlFor="i-name" className={labelCls} style={{ fontFamily: "var(--font-poppins)" }}>
          Customer name {errors.name && <span className="text-red-400 normal-case tracking-normal ml-1">{errors.name}</span>}
        </label>
        <input
          id="i-name"
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => { setName(e.target.value); clearError("name"); }}
          className={inputCls(errors.name)}
          style={{ fontFamily: "var(--font-inter)" }}
        />
      </div>

      <div>
        <label htmlFor="i-phone" className={labelCls} style={{ fontFamily: "var(--font-poppins)" }}>
          WhatsApp / Phone {errors.phone && <span className="text-red-400 normal-case tracking-normal ml-1">{errors.phone}</span>}
        </label>
        <input
          id="i-phone"
          type="tel"
          placeholder="+84 or local number"
          value={phone}
          onChange={(e) => { setPhone(e.target.value); clearError("phone"); }}
          className={inputCls(errors.phone)}
          style={{ fontFamily: "var(--font-inter)" }}
        />
      </div>

      {/* Live total */}
      <div className="flex items-center justify-between bg-[#1E3356] rounded-xl px-5 py-3.5 border border-white/10">
        <span className="text-[14px] font-semibold text-white/60" style={{ fontFamily: "var(--font-poppins)" }}>
          {cur.unit === "flat" ? "Total" : "Starting from"}
        </span>
        <span className="text-[28px] font-bold text-[#E8742C]" style={{ fontFamily: "var(--font-poppins)" }}>
          {vnd(total)}
        </span>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2.5 bg-[#E8742C] hover:bg-[#C85E1E] text-white font-bold text-[16px] py-5 rounded-xl transition-colors"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        <CheckCircle2 size={18} strokeWidth={2} />
        Record booking
      </button>
    </form>
  );
}
