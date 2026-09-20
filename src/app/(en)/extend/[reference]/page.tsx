import type { Metadata } from "next";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import ExtendForm from "@/components/extend/ExtendForm";
import { extendHelpUrl } from "@/components/extend/whatsapp";
import { bagLimit, extensionWindow, contactForCustomer, normalizeReference, resolveBooking, stampLabel, vietnamToday } from "@/lib/extension";
import { extensionConfig, findBookingRows } from "@/lib/lark-server";

// A private link Stow sends one customer. The Booking ID in the address is
// what identifies the booking, so keep it out of search engines and out of the
// Referer header of any link followed from here.
export const metadata: Metadata = {
  title: "Extend your storage",
  description: "Ask Stow to keep your bags longer.",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

type Message = { title: string; body: string };

// What the customer reads when the form cannot be shown. Every one of them ends with the WhatsApp button.
const MESSAGES = {
  invalid: { title: "This link does not look right", body: "Please ask Stow for a new link, or message us on WhatsApp." },
  unavailable: { title: "This page is not available right now", body: "Please message us on WhatsApp and we will extend your booking for you." },
  "try-again": { title: "We could not load your booking", body: "Please try again in a minute. If it keeps happening, message us on WhatsApp." },
  "not-found": { title: "We cannot find this booking", body: "Please check the link, or message us on WhatsApp with your Booking ID." },
  closed: { title: "This booking is already finished", body: "The bags were collected or the booking was cancelled. If you still need storage, message us on WhatsApp." },
  "no-contact": { title: "Please message us to extend this booking", body: "We do not have a way to reach you from this booking. Message us on WhatsApp and we will extend it." },
} satisfies Record<string, Message>;

type PageState =
  | { kind: "form"; reference: string; contact: { name: string; whatsapp: string; email: string }; bags: number | null; maxBags: number; pickUpLabel: string | null; minDate: string; maxDate: string; today: string }
  | { kind: keyof typeof MESSAGES; reference: string | null };

function decode(raw: string): string {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
}

async function loadState(reference: string | null): Promise<PageState> {
  if (!reference) return { kind: "invalid", reference };
  const cfg = extensionConfig();
  if (!cfg) return { kind: "unavailable", reference };

  let lookup;
  try {
    lookup = resolveBooking(await findBookingRows(cfg, reference), reference);
  } catch (err) {
    console.error(`[extend] could not read ${reference}: ${err instanceof Error ? err.message : err}`);
    return { kind: "try-again", reference };
  }
  if (lookup.kind !== "found") return { kind: lookup.kind, reference };

  const { booking } = lookup;
  const today = vietnamToday();
  const { min, max } = extensionWindow(booking, today);
  return {
    kind: "form",
    reference,
    // Worked out here, on the server: the full phone and email never reach the customer's browser.
    contact: contactForCustomer(booking),
    bags: booking.bags,
    maxBags: bagLimit(booking),
    pickUpLabel: booking.pickUp ? stampLabel(booking.pickUp) : null,
    minDate: min,
    maxDate: max,
    today,
  };
}

export default async function ExtendPage({ params }: { params: Promise<{ reference: string }> }) {
  const { reference: raw } = await params;
  const state = await loadState(normalizeReference(decode(raw)));

  return (
    <main className="min-h-screen bg-[#16243F]">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
        <Link href="/" className="flex items-center gap-3" aria-label="Stow home">
          <span className="flex h-[24px] w-[28px] items-center justify-center rounded-md bg-[#E8742C]">
            <span className="text-[12px] font-bold leading-none text-white" style={{ fontFamily: "var(--font-poppins)" }}>
              S
            </span>
          </span>
          <span className="text-[14px] font-bold leading-none text-white" style={{ fontFamily: "var(--font-poppins)" }}>
            Stow
          </span>
        </Link>
      </div>

      <div className="mx-auto w-full max-w-[460px] px-[16px] py-[32px] sm:py-[56px]">
        {state.kind === "form" ? (
          <ExtendForm
            reference={state.reference}
            contact={state.contact}
            bags={state.bags}
            maxBags={state.maxBags}
            pickUpLabel={state.pickUpLabel}
            minDate={state.minDate}
            maxDate={state.maxDate}
            today={state.today}
          />
        ) : (
          <div>
            <h1 className="text-[22px] font-bold leading-tight text-white" style={{ fontFamily: "var(--font-poppins)" }}>
              {MESSAGES[state.kind].title}
            </h1>
            <p className="mt-[12px] text-[14px] leading-relaxed text-white/70" style={{ fontFamily: "var(--font-inter)" }}>
              {MESSAGES[state.kind].body}
            </p>
            <a
              href={extendHelpUrl(state.reference)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[24px] inline-flex items-center gap-2 rounded-xl bg-[#E8742C] px-[20px] py-3 text-[14px] font-bold text-white transition-colors hover:bg-[#C85E1E]"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              <MessageCircle size={14} aria-hidden />
              Message Stow on WhatsApp
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
