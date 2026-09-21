const STOW_WHATSAPP = "https://wa.me/84905955161";

/** A WhatsApp chat with Stow that already says what the customer wants, and which booking. */
export function extendHelpUrl(reference: string | null): string {
  const text = `Hi Stow, I want to extend my storage.${reference ? ` Booking ID: ${reference}` : ""}`;
  return `${STOW_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

/**
 * The WhatsApp chat opened after a request is sent — the same hand-off the
 * booking form does, and for the same reason: the saved Extensions row and the
 * group-chat message are the record of the request, but WhatsApp is the
 * channel Stow actually replies on, and it puts the request directly in front
 * of staff even if a Lark notification is ever missed or muted.
 */
export function extendRequestUrl(reference: string, bags: number, newPickupDate: string, priceLine: string): string {
  const text = [
    "Hi Stow, I'd like to extend my storage.",
    "",
    `Booking ID: ${reference}`,
    `Bags to extend: ${bags}`,
    `New pick-up date: ${newPickupDate}`,
    priceLine,
    "",
    "Please confirm and let me know the pick-up time. Thank you! 🙏",
  ].join("\n");
  return `${STOW_WHATSAPP}?text=${encodeURIComponent(text)}`;
}
