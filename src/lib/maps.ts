/**
 * Stow's Google Maps place — one constant, used by every map link, the
 * embedded map, and the JSON-LD `sameAs`.
 *
 * Why this file exists: the site used to point at the *address string*
 * ("55 Ba Bang Nhan, Ngu Hanh Son, Da Nang") in the Location section's
 * iframe, which renders an anonymous dropped pin — no business name, no
 * star rating, no link into the listing. Verified in a browser before
 * this change: address-query embed → unnamed pin; CID embed → a card
 * reading "Stow - Luggage Storage Da Nang · 5.0 ★ (7)". The whole point
 * of the map is entity recognition, so it must resolve to the listing.
 *
 * The CID below is the one inside the owner-supplied share link
 * (SHARE_URL) — resolve that link and it lands on
 * .../place/Stow+-+Luggage+Storage+Da+Nang/...!1s0x314211cd1dc82969:0xc8e5cdce92b859
 * whose second hex half (0xc8e5cdce92b859) is this decimal CID.
 *
 * Do NOT reintroduce https://share.google/4fTTPlY1pwqbLAvmB (the link
 * this replaced): it 302s to https://www.google.com/share.google?q=...,
 * which is not a real Maps URL.
 */

const PLACE_CID = "56547667438909529";

/** The owner-supplied short link — kept verbatim so the client can click it and confirm it's their listing. */
export const GOOGLE_MAPS_SHARE_URL = "https://maps.app.goo.gl/BQTpXidfZsWrFQFX7";

/** Same place, canonical long form. Used for JSON-LD `sameAs`, where a URL shortener weakens entity resolution. */
export const GOOGLE_MAPS_PLACE_URL = `https://www.google.com/maps?cid=${PLACE_CID}`;

/** Embeddable map of the listing itself. `output=embed` needs no API key, but only renders inside an <iframe>. */
export const GOOGLE_MAPS_EMBED_URL = `https://maps.google.com/maps?cid=${PLACE_CID}&output=embed`;
