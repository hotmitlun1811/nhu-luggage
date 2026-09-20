/**
 * The WhatsApp message a customer sends to Stow when they finish the booking
 * form (it opens wa.me/84905955161 with this text ready to send). Pure
 * functions, so the exact wording is tested.
 *
 * It is deliberately English whatever the page language: staff read it on the
 * shop's own WhatsApp number, and a translation they cannot act on defeats the
 * point. It carries what staff need to serve the booking and nothing internal:
 * no price breakdown and no notes about how the price was worked out (that is
 * in the Lark table's Price Detail and in the staff group-chat message).
 */
import { PLAN_FACTS, vnd } from "./plans";
import type { PlanChoice } from "./pricing";

const PLAN_UNIT = { hourly: "hour", daily: "day", mini: "week", strand: "month", longstay: "4 months" } as const;

/** "Mini (150.000 ₫/week)", or just "Custom": the plan as the customer picked it. */
export function planLabel(plan: PlanChoice): string {
  if (plan === "custom") return "Custom";
  return `${PLAN_FACTS[plan].canonicalName} (${vnd(PLAN_FACTS[plan].price)}/${PLAN_UNIT[plan]})`;
}

export type BookingMessage = {
  bookingId: string;
  /** From planLabel(). */
  plan: string;
  /** "Mon, 21 September 2026 at 09:00" */
  dropOff: string;
  pickUp: string;
  /** When the plan the customer paid for ends, in the same words as drop-off and pick-up. */
  planEnd?: string;
  bags: number;
  oversizedBags: number;
  /** "1.300.000 ₫" */
  total: string;
  name: string;
  /** "+1 905955161" */
  whatsapp: string;
  email: string;
  /** Only when the customer read and accepted the Terms in the form. */
  consent?: { version: string; at: string };
};

export function buildBookingMessage(m: BookingMessage): string {
  const bags = m.oversizedBags > 0 ? `${m.bags} (${m.oversizedBags} oversized)` : `${m.bags}`;
  // The blank lines are part of the layout, so only the optional line is dropped (null), never an empty string.
  const lines: (string | null)[] = [
    "Booking Information:",
    `📋 Booking ID: ${m.bookingId}`,
    `📦 Plan: ${m.plan}`,
    `📅 Drop-off: ${m.dropOff}`,
    `📅 Pick-up: ${m.pickUp}`,
    m.planEnd ? `📅 Plan End Date: ${m.planEnd}` : null,
    `🧳 Bags: ${bags}`,
    `💰 Total: ${m.total}`,
    "",
    "Contact Information:",
    `👤 Name: ${m.name.trim()}`,
    `📱 WhatsApp: ${m.whatsapp}`,
    `✉️ Email: ${m.email.trim()}`,
    m.consent ? `✅ Agreed to Terms of Service & Privacy Policy (Effective ${m.consent.version}) - read in full at ${m.consent.at}` : null,
    "",
    "Please confirm my booking. Thank you! 🙏",
  ];
  return lines.filter((l): l is string => l !== null).join("\n");
}
