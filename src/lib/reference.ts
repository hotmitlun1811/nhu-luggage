/**
 * Booking references, e.g. "STW-260921-K7M2QX". One function for every place
 * that makes one (the customer form, the staff Intake form and the API route),
 * because the code can end up written on a luggage tag handed to the customer.
 *
 *  - STW is the shop. 260921 is the day the customer drops off (YYMMDD), so a
 *    reference sorts by date and staff can read the day off a tag.
 *  - K7M2QX is 6 random characters. The alphabet leaves out what is easy to
 *    misread when written or read aloud (0/O, 1/I/L) and every vowel, so a code
 *    can never spell a word on a tag. 27 characters make 27^6 = 387 million
 *    codes per day. Two bookings dropped off the same day would have to draw the
 *    same one: with 10 bookings that day the chance is about 1 in 9 million.
 *  - It is drawn with crypto.getRandomValues (not Math.random), and bytes that
 *    would favour some characters are skipped, so every character is equally likely.
 *
 * A code made in the browser can never be *guaranteed* unique (there is no
 * shared counter), and Lark does not enforce it on the first column. The
 * "Bookings v2" table therefore also has a Row No. that Lark itself never repeats.
 */

export const REFERENCE_ALPHABET = "23456789BCDFGHJKMNPQRSTVWXZ"; // 27 characters
export const REFERENCE_SUFFIX_LENGTH = 6;
export const REFERENCE_PATTERN = /^STW-\d{6}-[23456789BCDFGHJKMNPQRSTVWXZ]{6}$/;

// 256 is not a multiple of 27, so bytes at or above 243 are skipped: keeping
// them would make the first 13 characters slightly more likely than the rest.
const USABLE_BELOW = 256 - (256 % REFERENCE_ALPHABET.length);

/** Random bytes to characters. Bytes that would bias the result are skipped. */
export function suffixFromBytes(bytes: ArrayLike<number>, length = REFERENCE_SUFFIX_LENGTH): string {
  let out = "";
  for (let i = 0; i < bytes.length && out.length < length; i++) {
    if (bytes[i] < USABLE_BELOW) out += REFERENCE_ALPHABET[bytes[i] % REFERENCE_ALPHABET.length];
  }
  return out;
}

function randomSuffix(): string {
  let out = "";
  while (out.length < REFERENCE_SUFFIX_LENGTH) {
    out += suffixFromBytes(crypto.getRandomValues(new Uint8Array(16)), REFERENCE_SUFFIX_LENGTH - out.length);
  }
  return out;
}

/** "2026-09-21" -> "STW-260921-K7M2QX". Without a drop-off day it uses today's date. */
export function generateReference(dropOffDate?: string): string {
  const day = (dropOffDate || new Date().toISOString().slice(0, 10)).replace(/-/g, "").slice(2); // YYMMDD
  return `STW-${day}-${randomSuffix()}`;
}
