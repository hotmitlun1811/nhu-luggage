"use client";

import { useState } from "react";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import CountField from "@/components/booking/CountField";
import DateTimeField from "@/components/booking/DateTimeField";
import { longDate } from "@/lib/extension";
import { extendHelpUrl } from "./whatsapp";

/*
 * The "extend my storage" form: two questions, nothing else. Who the customer
 * is comes from the Booking ID in their link, checked on the server, so no
 * name, phone or email is asked for (see src/lib/extension.ts).
 *
 * English only, like the staff Intake form: the link is sent by Stow on
 * WhatsApp and the words are kept short and plain.
 */

const LABEL = "block text-[10px] font-bold uppercase tracking-[0.12em] text-white/40 mb-1.5";
const INPUT =
  "w-full appearance-none bg-white/[0.07] border border-white/[0.12] rounded-lg px-3 py-2.5 text-[14px] text-white placeholder-white/25 focus:outline-none focus:border-[#E8742C]/70 focus-visible:border-[#E8742C]/70 data-[popup-open]:border-[#E8742C]/70 transition-colors";
const ERR = "border-red-400/70";

// What the server's short error codes say to the customer (see src/app/api/extend/route.ts).
const ASK_STOW = "We cannot take this request online. Please message us on WhatsApp and we will sort it out.";
const ERROR_TEXT: Record<string, string> = {
  bags: "That is more bags than this booking has. Please check the number.",
  date: "That date does not work for this booking. Please choose another day.",
  "not-found": ASK_STOW,
  closed: ASK_STOW,
  "no-contact": ASK_STOW,
  unavailable: ASK_STOW,
  "try-again": "Something went wrong on our side. Please try again in a minute, or message us on WhatsApp.",
};
const FALLBACK_ERROR = "We could not send your request. Please check your connection and try again, or message us on WhatsApp.";

export default function ExtendForm({
  reference,
  contact,
  bags,
  maxBags,
  pickUpLabel,
  minDate,
  maxDate,
  today,
}: {
  reference: string;
  /** Who the booking is for, as the server decided the customer may see it (see contactForCustomer). Empty for what the booking does not have. */
  contact: { name: string; whatsapp: string; email: string };
  /** Bags on the booking; null when it never recorded them. */
  bags: number | null;
  /** The most that can be asked for. */
  maxBags: number;
  /** "Sun, 27 September 2026 at 09:00", or null when the booking has no pick-up. */
  pickUpLabel: string | null;
  minDate: string;
  maxDate: string;
  today: string;
}) {
  // Most people extend everything, so that is where the count starts.
  const [count, setCount] = useState(bags ?? 1);
  const [date, setDate] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [dateError, setDateError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status !== "idle") return;
    setError(null);
    if (!date) {
      setDateError("Please choose the new pick-up date.");
      return;
    }
    setDateError(null);
    setStatus("sending");
    try {
      const res = await fetch("/api/extend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference, bags: count, newPickupDate: date }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setStatus("sent");
        return;
      }
      // A date the server refused belongs under the date, the rest above the button.
      if (data.error === "date") setDateError(ERROR_TEXT.date);
      else setError(ERROR_TEXT[data.error ?? ""] ?? FALLBACK_ERROR);
    } catch {
      setError(FALLBACK_ERROR);
    }
    setStatus("idle");
  }

  if (status === "sent") {
    return (
      <div role="status" className="text-center">
        <CheckCircle2 size={40} className="mx-auto text-[#5FD3A0]" aria-hidden />
        <h1 className="mt-[16px] text-[22px] font-bold text-white" style={{ fontFamily: "var(--font-poppins)" }}>
          Request sent
        </h1>
        <p className="mx-auto mt-[8px] max-w-[340px] text-[14px] leading-relaxed text-white/70" style={{ fontFamily: "var(--font-inter)" }}>
          Stow will message you on WhatsApp to confirm the price and the pick-up time.
        </p>
        <dl className="mx-auto mt-[24px] max-w-[340px] divide-y divide-white/10 rounded-xl border border-white/[0.12] bg-white/[0.05] text-left text-[13px]" style={{ fontFamily: "var(--font-inter)" }}>
          <Row term="Booking ID" value={reference} mono />
          <Row term="Bags to extend" value={String(count)} />
          <Row term="New pick-up date" value={longDate(date)} />
        </dl>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={submit} noValidate>
      <h1 className="text-[24px] font-bold leading-tight text-white" style={{ fontFamily: "var(--font-poppins)" }}>
        Extend your storage
      </h1>
      <p className="mt-[8px] text-[14px] leading-relaxed text-white/60" style={{ fontFamily: "var(--font-inter)" }}>
        Two questions. We already have your contact details, so you do not need to type them again.
      </p>

      <dl className="mt-[20px] divide-y divide-white/10 rounded-xl border border-white/[0.12] bg-white/[0.05] text-[13px]" style={{ fontFamily: "var(--font-inter)" }}>
        <Row term="Booking ID" value={reference} mono />
        {contact.name && <Row term="Name" value={contact.name} />}
        {contact.whatsapp && <Row term="WhatsApp" value={contact.whatsapp} mono />}
        {contact.email && <Row term="Email" value={contact.email} />}
        {bags != null && <Row term="Bags" value={String(bags)} />}
        {pickUpLabel && <Row term="Pick-up now" value={pickUpLabel} />}
      </dl>
      <p className="mt-[10px] text-[12px] leading-relaxed text-white/45" style={{ fontFamily: "var(--font-inter)" }}>
        Is this your booking? If not,{" "}
        <a href={extendHelpUrl(reference)} target="_blank" rel="noopener noreferrer" className="font-semibold text-white/70 underline underline-offset-2">
          message us on WhatsApp
        </a>
        .
      </p>

      <fieldset disabled={sending} className="mt-[24px] space-y-[20px]">
        {maxBags > 1 && (
          <div>
            <label htmlFor="extend-bags" className={LABEL}>
              How many bags do you want to extend?
            </label>
            <CountField id="extend-bags" value={count} min={1} max={maxBags} onChange={setCount} decLabel="One bag fewer" incLabel="One bag more" />
          </div>
        )}

        <div>
          <label id="extend-date-label" htmlFor="extend-date" className={LABEL}>
            New pick-up date
          </label>
          <DateTimeField
            id="extend-date"
            labelId="extend-date-label"
            className={`${INPUT} ${dateError ? ERR : ""}`}
            locale="en"
            date={date}
            onDateChange={(iso) => {
              setDate(iso);
              setDateError(null);
            }}
            minDate={minDate}
            maxDate={maxDate}
            today={today}
            dateOnly
            dateWord="Choose a date"
            prevMonthLabel="Previous month"
            nextMonthLabel="Next month"
          />
          {dateError && (
            <p role="alert" className="mt-1.5 text-[12px] text-red-300" style={{ fontFamily: "var(--font-inter)" }}>
              {dateError}
            </p>
          )}
        </div>
      </fieldset>

      {error && (
        <div role="alert" className="mt-[20px] rounded-lg border border-red-400/40 bg-red-400/10 px-3 py-2.5 text-[13px] leading-snug text-red-100" style={{ fontFamily: "var(--font-inter)" }}>
          <p>{error}</p>
          <a href={extendHelpUrl(reference)} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 font-semibold underline underline-offset-2">
            <MessageCircle size={13} aria-hidden /> Message Stow on WhatsApp
          </a>
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-[24px] flex w-full items-center justify-center gap-2 rounded-xl bg-[#E8742C] py-3.5 text-[14px] font-bold text-white transition-colors hover:bg-[#C85E1E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8742C] disabled:opacity-70"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {sending ? (
          <>
            {/* Explicit px: this project's spacing scale makes w-4/h-4 4px. */}
            <span className="h-[16px] w-[16px] animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Sending
          </>
        ) : (
          <>
            <Send size={14} aria-hidden />
            Send request
          </>
        )}
      </button>

      <p className="mt-[12px] text-center text-[12px] leading-relaxed text-white/45" style={{ fontFamily: "var(--font-inter)" }}>
        Stow will confirm the price and the pick-up time with you on WhatsApp.
      </p>
    </form>
  );
}

function Row({ term, value, mono = false }: { term: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-[16px] px-[14px] py-[10px]">
      <dt className="text-white/45">{term}</dt>
      <dd className={`text-right text-white ${mono ? "font-mono tracking-wide" : ""}`}>{value}</dd>
    </div>
  );
}
