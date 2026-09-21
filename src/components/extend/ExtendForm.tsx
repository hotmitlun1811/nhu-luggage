"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, MessageCircle, Send } from "lucide-react";
import CountField from "@/components/booking/CountField";
import DateTimeField from "@/components/booking/DateTimeField";
import PriceBreakdown from "@/components/booking/PriceBreakdown";
import type { Dictionary } from "@/content/types";
import { longDate, stampLabel } from "@/lib/extension";
import { extensionPrice, oversizedNeedsAnswer, oversizedRange } from "@/lib/extension-price";
import { vnd } from "@/lib/plans";
import type { Stamp } from "@/lib/pricing";
import { extendHelpUrl, extendRequestUrl } from "./whatsapp";

/*
 * The "extend my storage" form: two questions, and the price. Who the customer
 * is comes from the Booking ID in their link, checked on the server, so no
 * name, phone or email is asked for (see src/lib/extension.ts).
 *
 * The price is worked out here with the booking form's own engine and shown
 * with the booking form's own receipt (src/lib/extension-price.ts), and again
 * on the server, which is the number that is saved and sent to staff. One extra
 * question appears only when the price cannot be worked out without it: some of
 * the bags are extended, and the booking has both oversized and normal bags.
 *
 * On success it opens WhatsApp with the request already written, the same
 * hand-off the booking form does: the saved row and the group-chat message are
 * the record, but WhatsApp is the channel Stow actually replies on, and it
 * reaches staff even if a Lark notification is ever missed or muted.
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
  oversized: "Please check how many of these bags are oversized.",
  "not-found": ASK_STOW,
  closed: ASK_STOW,
  "no-contact": ASK_STOW,
  unavailable: ASK_STOW,
  "try-again": "Something went wrong on our side. Please try again in a minute, or message us on WhatsApp.",
};
const FALLBACK_ERROR = "We could not send your request. Please check your connection and try again, or message us on WhatsApp.";

type SentPrice = { kind: "priced" | "included" | "unknown"; total?: number };

export default function ExtendForm({
  reference,
  contact,
  bags,
  oversizedBags,
  planEnd,
  maxBags,
  pickUpLabel,
  minDate,
  maxDate,
  today,
  dict,
}: {
  reference: string;
  /** Who the booking is for, as the server decided the customer may see it (see contactForCustomer). Empty for what the booking does not have. */
  contact: { name: string; whatsapp: string; email: string };
  /** Bags on the booking; null when it never recorded them. */
  bags: number | null;
  /** How many of them are oversized; null when it never recorded that. */
  oversizedBags: number | null;
  /** When the plan already paid for ends; null when the booking never recorded it (then there is no price to show). */
  planEnd: Stamp | null;
  /** The most that can be asked for. */
  maxBags: number;
  /** "Sun, 27 September 2026 at 09:00", or null when the booking has no pick-up. */
  pickUpLabel: string | null;
  minDate: string;
  maxDate: string;
  today: string;
  /** The English booking-form dictionary: the price receipt is the booking form's own. */
  dict: Dictionary["booking"];
}) {
  // Most people extend everything, so that is where the count starts.
  const [count, setCount] = useState(bags ?? 1);
  const [date, setDate] = useState("");
  const [oversizedPick, setOversizedPick] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [dateError, setDateError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sentPrice, setSentPrice] = useState<SentPrice | null>(null);
  // Kept so the success screen can offer a manual "Open WhatsApp" link when
  // window.open was blocked or the device has no WhatsApp session — same
  // reasoning as the booking form's own waUrl.
  const [waUrl, setWaUrl] = useState("");

  // How many of the extended bags are oversized: known from the booking, or asked when it could be either.
  // Until they answer it is the highest possible, so the price is never lower than it will turn out.
  const range = oversizedRange({ bags, oversizedBags }, count);
  const askOversized = oversizedNeedsAnswer(range);
  const oversized = range ? (askOversized ? Math.min(range.max, Math.max(range.min, oversizedPick ?? range.max)) : range.min) : null;

  const price = useMemo(
    () => (date ? extensionPrice({ planEnd, bags, oversizedBags }, { bags: count, newPickupDate: date, oversizedBags: oversized ?? undefined }) : null),
    [planEnd, bags, oversizedBags, count, date, oversized]
  );
  const priced = price?.kind === "priced" ? price : null;

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
        body: JSON.stringify({ reference, bags: count, newPickupDate: date, oversizedBags: askOversized ? oversized : undefined }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; price?: SentPrice };
      if (res.ok && data.ok) {
        // The server worked the price out again; that is the number staff have, so it is the one shown.
        setSentPrice(data.price ?? null);
        // Same hand-off as the booking form: open WhatsApp with the request
        // already written, so it reaches Stow even if a Lark notification is
        // ever missed. The success screen shows regardless of whether this opened.
        const priceLine =
          data.price?.kind === "priced"
            ? `Total: ${vnd(data.price.total ?? 0)}`
            : data.price?.kind === "included"
            ? "Nothing extra to pay (inside the plan I already paid for)"
            : "Please let me know the price";
        const url = extendRequestUrl(reference, count, longDate(date), priceLine);
        setWaUrl(url);
        window.open(url, "_blank", "noopener,noreferrer");
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
          Stow will message you on WhatsApp to confirm and to agree the pick-up time.
        </p>
        <dl className="mx-auto mt-[24px] max-w-[340px] divide-y divide-white/10 rounded-xl border border-white/[0.12] bg-white/[0.05] text-left text-[13px]" style={{ fontFamily: "var(--font-inter)" }}>
          <Row term="Booking ID" value={reference} mono />
          <Row term="Bags to extend" value={String(count)} />
          <Row term="New pick-up date" value={longDate(date)} />
          {sentPrice?.kind === "priced" && <Row term="Total" value={vnd(sentPrice.total ?? 0)} />}
          {sentPrice?.kind === "included" && <Row term="Extra to pay" value="Nothing" />}
        </dl>

        {/* WhatsApp may not have auto-opened (popup blocked, desktop with no
            WhatsApp session, app not installed) — always give a manual path
            rather than leaving the customer believing nothing more is needed. */}
        {waUrl && (
          <>
            <p className="mx-auto mt-[16px] max-w-xs text-[11px] text-white/30" style={{ fontFamily: "var(--font-inter)" }}>
              Didn&apos;t WhatsApp open? Tap to send your request.
            </p>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto mt-[8px] flex w-full max-w-xs items-center justify-center gap-2 rounded-lg bg-[#25D366] py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-[#1EA955]"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              <MessageCircle size={15} />
              Open WhatsApp
            </a>
          </>
        )}
      </div>
    );
  }

  const sending = status === "sending";

  // The label beside the total says what the number is for, like the booking form's "Total (46 days)".
  const totalLabel = priced
    ? `Total (${priced.extraDays} extra ${priced.extraDays === 1 ? "day" : "days"})${count > 1 ? ` · ${count} bags` : ""}`
    : "Total";

  return (
    <form onSubmit={submit} noValidate>
      <h1 className="text-[24px] font-bold leading-tight text-white" style={{ fontFamily: "var(--font-poppins)" }}>
        Extend your storage
      </h1>

      <dl className="mt-[20px] divide-y divide-white/10 rounded-xl border border-white/[0.12] bg-white/[0.05] text-[13px]" style={{ fontFamily: "var(--font-inter)" }}>
        <Row term="Booking ID" value={reference} mono />
        {contact.name && <Row term="Name" value={contact.name} />}
        {contact.whatsapp && <Row term="WhatsApp" value={contact.whatsapp} mono />}
        {contact.email && <Row term="Email" value={contact.email} />}
        {bags != null && <Row term="Bags" value={oversizedBags ? `${bags} (${oversizedBags} oversized)` : String(bags)} />}
        {pickUpLabel && <Row term="Pick-up now" value={pickUpLabel} />}
        {planEnd && <Row term="Paid until" value={stampLabel(planEnd)} />}
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

        {/* Only when the price depends on it: some of the bags, and the booking has both kinds. */}
        {askOversized && range && oversized !== null && (
          <div>
            <label htmlFor="extend-oversized" className={LABEL}>
              How many of these {count} bags are oversized?
            </label>
            <CountField id="extend-oversized" value={oversized} min={range.min} max={range.max} onChange={setOversizedPick} decLabel="One fewer" incLabel="One more" />
            <p className="mt-1.5 text-[11px] leading-snug text-white/35" style={{ fontFamily: "var(--font-inter)" }}>
              {dict.oversizedTipBody}
            </p>
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

      {/* The price, with the working under it: the booking form's own receipt. */}
      <div className="mt-[24px] flex flex-col gap-2.5">
        <div className="flex items-center justify-between pt-0.5">
          <span className="text-[11.5px] text-white/30" style={{ fontFamily: "var(--font-inter)" }}>
            {totalLabel}
          </span>
          <span className="text-[21px] font-bold text-[#E8742C]" style={{ fontFamily: "var(--font-poppins)" }}>
            {priced ? vnd(priced.total) : price?.kind === "included" ? vnd(0) : "—"}
          </span>
        </div>
        {priced && priced.to.time !== "00:00" && (
          <p className="text-[11.5px] leading-snug text-white/45" style={{ fontFamily: "var(--font-inter)" }}>
            The price is for pick-up by {priced.to.time} on {longDate(priced.to.date)}.
          </p>
        )}
        {price?.kind === "included" && (
          <p className="text-[11.5px] leading-snug text-white/45" style={{ fontFamily: "var(--font-inter)" }}>
            {longDate(date)} is inside the plan you already paid for, which runs until {stampLabel(price.planEnd)}. Nothing extra to pay.
          </p>
        )}
        {price?.kind === "unknown" && (
          <p className="text-[11.5px] leading-snug text-white/45" style={{ fontFamily: "var(--font-inter)" }}>
            Stow will work out the price and confirm it on WhatsApp.
          </p>
        )}
        {price?.kind !== "included" && price?.kind !== "unknown" && (
          <PriceBreakdown dict={dict} locale="en" quote={priced ? priced.quote : null} bags={priced ? priced.bags : count} oversizedBags={priced ? priced.oversizedBags : 0} pickUp={priced ? priced.to : null} />
        )}
      </div>

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
        Stow will confirm this with you on WhatsApp, including the pick-up time.
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
