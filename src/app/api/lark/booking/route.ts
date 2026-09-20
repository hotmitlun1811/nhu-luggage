import { NextResponse } from "next/server";
import { announcementText, buildBookingFields, buildBookingFieldsV2, type BookingBody } from "@/lib/lark-booking";
import { generateReference } from "@/lib/reference";

// Server-only: pushes a booking into the Stow Bookings Lark Base table, then
// announces it in the Stow Bookings group chat. Never exposed to the client —
// both forms just POST their booking data here and move on.
const LARK_API = "https://open.larksuite.com/open-apis";

const LARK_APP_ID = process.env.LARK_APP_ID;
const LARK_APP_SECRET = process.env.LARK_APP_SECRET;
const LARK_BASE_APP_TOKEN = process.env.LARK_BASE_APP_TOKEN;
const LARK_BASE_TABLE_ID = process.env.LARK_BASE_TABLE_ID;
const LARK_CHAT_ID = process.env.LARK_CHAT_ID;
// "2" = the LARK_BASE_TABLE_ID table is the "Bookings v2" table (one column per
// form field, see docs/lark/2026-09-20-bookings-v2.md). Anything else = the
// original Bookings table. Change both variables together.
const USE_V2 = process.env.LARK_BOOKINGS_SCHEMA === "2";

function vnd(n: number) {
  return n.toLocaleString("vi-VN") + " ₫";
}

// Module-scope cache — survives across warm invocations of the same function
// instance. tenant_access_token is valid ~2 hours; refresh a few minutes early.
let cachedToken: { value: string; expiresAt: number } | null = null;

async function getTenantAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.value;
  }

  const res = await fetch(`${LARK_API}/auth/v3/tenant_access_token/internal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ app_id: LARK_APP_ID, app_secret: LARK_APP_SECRET }),
  });
  const data = await res.json();
  if (!res.ok || data.code !== 0) {
    throw new Error(`Lark auth error: ${data.msg || res.statusText}`);
  }

  cachedToken = {
    value: data.tenant_access_token,
    // expire field is seconds-until-expiry; refresh 5 minutes early
    expiresAt: Date.now() + (data.expire - 300) * 1000,
  };
  return cachedToken.value;
}

/** Creates the Base record. Returns an error message, or null on success. */
async function createRecord(token: string, fields: Record<string, unknown>): Promise<string | null> {
  try {
    const res = await fetch(
      `${LARK_API}/bitable/v1/apps/${LARK_BASE_APP_TOKEN}/tables/${LARK_BASE_TABLE_ID}/records`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ fields }),
      }
    );
    const data = await res.json();
    return !res.ok || data.code !== 0 ? data.msg || res.statusText : null;
  } catch (err) {
    return err instanceof Error ? err.message : "Unknown error";
  }
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as BookingBody;
  const { lane, planName, dropOffDate, name, phone, total } = body;

  if (!LARK_APP_ID || !LARK_APP_SECRET || !LARK_BASE_APP_TOKEN || !LARK_BASE_TABLE_ID) {
    return NextResponse.json(
      { error: "Lark integration not configured — set LARK_APP_ID, LARK_APP_SECRET, LARK_BASE_APP_TOKEN and LARK_BASE_TABLE_ID to enable this." },
      { status: 503 }
    );
  }
  if (!lane || !planName || !dropOffDate || !name?.trim() || !phone?.trim() || total == null) {
    return NextResponse.json({ error: "Missing required booking fields" }, { status: 400 });
  }

  const ref = body.reference || generateReference(dropOffDate);

  let token: string;
  try {
    token = await getTenantAccessToken();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Lark auth error: ${message}` }, { status: 502 });
  }

  let failure: string | null;
  if (USE_V2) {
    failure = await createRecord(token, buildBookingFieldsV2(body, ref));
  } else {
    // The record is written with the current columns. A table that is not up to
    // date yet (no "Custom" option, no newer columns) refuses that, so retry once
    // with the older columns rather than lose the booking. See lib/lark-booking.ts.
    const { primary, legacy } = buildBookingFields(body, ref);
    failure = await createRecord(token, primary);
    if (failure && legacy) {
      console.warn(`[lark] booking ${ref} was refused (${failure}); retrying with the older columns. Is the table up to date?`);
      failure = await createRecord(token, legacy);
    }
  }
  if (failure) {
    return NextResponse.json({ error: `Lark Base write failed: ${failure}` }, { status: 502 });
  }

  // The record is the source of truth and already succeeded — the group
  // announcement is a best-effort notification on top of it. A Lark hiccup
  // here should not turn a successful booking into an error response.
  if (LARK_CHAT_ID) {
    try {
      await fetch(`${LARK_API}/im/v1/messages?receive_id_type=chat_id`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          receive_id: LARK_CHAT_ID,
          msg_type: "text",
          content: JSON.stringify({ text: announcementText(ref, body, vnd) }),
        }),
      });
    } catch {
      // swallow — announcement is best-effort, see comment above
    }
  }

  return NextResponse.json({ ok: true, ref });
}
