import { NextResponse } from "next/server";
import {
  buildExtensionFields,
  checkExtension,
  extensionAnnouncement,
  isRealDate,
  normalizeReference,
  resolveBooking,
  vietnamToday,
} from "@/lib/extension";
import { alreadyRequested, announceInGroup, createExtensionRecord, extensionConfig, findBookingRows } from "@/lib/lark-server";

// The "extend my storage" form posts here: { reference, bags, newPickupDate }.
// The customer is identified by the Booking ID in their link and nothing else.
// Everything about the booking (contact details, bags booked, pick-up, plan
// end) is read from the Bookings table here, never taken from the request, so
// a request can only ever be filed against a real, open booking.
//
// Answers carry a short code the form turns into a plain sentence:
//   ok            { ok: true }               saved (also when the same request was already there)
//   invalid       400                        not a Booking ID, a whole number of bags, or a date
//   bags | date   400                        does not fit this booking
//   not-found     404                        no booking has that ID
//   closed        409                        the booking is Complete or Cancel
//   no-contact    409                        Stow has no WhatsApp or email for it
//   unavailable   503                        not set up on this deployment
//   try-again     502                        Lark did not answer
export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { reference?: unknown; bags?: unknown; newPickupDate?: unknown };

  const reference = normalizeReference(body.reference);
  const bags = typeof body.bags === "number" ? body.bags : Number.NaN;
  const newPickupDate = body.newPickupDate;
  if (!reference || !Number.isInteger(bags) || !isRealDate(newPickupDate)) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const req = { bags, newPickupDate };

  const cfg = extensionConfig();
  if (!cfg) return NextResponse.json({ error: "unavailable" }, { status: 503 });

  try {
    const lookup = resolveBooking(await findBookingRows(cfg, reference), reference);
    if (lookup.kind === "not-found") return NextResponse.json({ error: "not-found" }, { status: 404 });
    if (lookup.kind !== "found") return NextResponse.json({ error: lookup.kind }, { status: 409 });
    const { booking } = lookup;

    const check = checkExtension(booking, req, vietnamToday());
    if (!check.ok) return NextResponse.json({ error: check.field }, { status: 400 });

    // The same request sent twice (a double tap, a phone retrying) is saved once.
    if (await alreadyRequested(cfg, reference, req)) return NextResponse.json({ ok: true, already: true });

    const failure = await createExtensionRecord(cfg, buildExtensionFields(booking, req));
    if (failure) {
      console.error(`[extend] could not save the request for ${reference}: ${failure}`);
      return NextResponse.json({ error: "try-again" }, { status: 502 });
    }

    await announceInGroup(cfg, extensionAnnouncement(booking, req));
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(`[extend] ${reference}: ${err instanceof Error ? err.message : err}`);
    return NextResponse.json({ error: "try-again" }, { status: 502 });
  }
}
