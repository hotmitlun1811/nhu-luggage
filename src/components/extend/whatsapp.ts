const STOW_WHATSAPP = "https://wa.me/84905955161";

/** A WhatsApp chat with Stow that already says what the customer wants, and which booking. */
export function extendHelpUrl(reference: string | null): string {
  const text = `Hi Stow, I want to extend my storage.${reference ? ` Booking ID: ${reference}` : ""}`;
  return `${STOW_WHATSAPP}?text=${encodeURIComponent(text)}`;
}
