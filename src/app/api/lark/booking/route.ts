import { NextResponse } from "next/server";

// Server-only: pushes a booking into the Stow Bookings Lark Base table, then
// announces it in the Stow Bookings group chat. Never exposed to the client —
// both forms just POST their booking data here and move on.
const LARK_API = "https://open.larksuite.com/open-apis";

const LARK_APP_ID = process.env.LARK_APP_ID;
const LARK_APP_SECRET = process.env.LARK_APP_SECRET;
const LARK_BASE_APP_TOKEN = process.env.LARK_BASE_APP_TOKEN;
const LARK_BASE_TABLE_ID = process.env.LARK_BASE_TABLE_ID;
const LARK_CHAT_ID = process.env.LARK_CHAT_ID;

type Body = {
  source?: "Intake" | "Booking Form";
  reference?: string;
  lane?: "flexible" | "flatrate";
  planName?: string;
  oversized?: boolean;
  dropOffDate?: string; // "YYYY-MM-DD"
  dropOffTime?: string; // "HH:mm"
  duration?: string; // pure duration label, e.g. "3 days" or "Up to 1 month" — no date/time embedded
  pickupDate?: string; // "YYYY-MM-DD", only when actually known (see per-form comments)
  pickupTime?: string; // "HH:mm"
  name?: string;
  phone?: string;
  email?: string;
  pax?: number;
  total?: number; // VND
};

function generateRef(dropOffDate?: string) {
  const d = (dropOffDate || new Date().toISOString().slice(0, 10)).replace(/-/g, "").slice(2);
  const n = Math.floor(Math.random() * 9000 + 1000);
  return `STW-${d}-${n}`;
}

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

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Body;
  const { source, lane, planName, oversized, dropOffDate, dropOffTime, duration, pickupDate, pickupTime, name, phone, email, pax, total } = body;

  if (!LARK_APP_ID || !LARK_APP_SECRET || !LARK_BASE_APP_TOKEN || !LARK_BASE_TABLE_ID) {
    return NextResponse.json(
      { error: "Lark integration not configured — set LARK_APP_ID, LARK_APP_SECRET, LARK_BASE_APP_TOKEN and LARK_BASE_TABLE_ID to enable this." },
      { status: 503 }
    );
  }
  if (!lane || !planName || !dropOffDate || !name?.trim() || !phone?.trim() || total == null) {
    return NextResponse.json({ error: "Missing required booking fields" }, { status: 400 });
  }

  const ref = body.reference || generateRef(dropOffDate);

  let token: string;
  try {
    token = await getTenantAccessToken();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Lark auth error: ${message}` }, { status: 502 });
  }

  const laneLabel = lane === "flexible" ? "Flexible" : "Flat Rate";

  const fields: Record<string, unknown> = {
    Reference: ref,
    Source: source || "Booking Form",
    Lane: laneLabel,
    Plan: planName,
    Oversized: !!oversized,
    // Bitable's datetime fields want a millisecond epoch timestamp, not a
    // string — noon avoids any date-boundary shift from timezone rounding.
    "Drop-off Date": new Date(`${dropOffDate}T12:00:00`).getTime(),
    "Drop-off Time": dropOffTime || "",
    Duration: duration || "",
    Name: name,
    Phone: phone,
    "Total (VND)": total,
  };
  if (email?.trim()) fields.Email = email.trim();
  if (pax != null) fields.Pax = pax;
  // Only known for BookingForm's hourly/daily plans (computed) and flatrate
  // (user-entered estimate) — Intake has no duration/pickup selection at all,
  // so these stay unset rather than faked from a fixed plan-duration label.
  if (pickupDate) fields["Pickup Date"] = new Date(`${pickupDate}T12:00:00`).getTime();
  if (pickupTime) fields["Pickup Time"] = pickupTime;

  try {
    const recordRes = await fetch(
      `${LARK_API}/bitable/v1/apps/${LARK_BASE_APP_TOKEN}/tables/${LARK_BASE_TABLE_ID}/records`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ fields }),
      }
    );
    const recordData = await recordRes.json();
    if (!recordRes.ok || recordData.code !== 0) {
      throw new Error(recordData.msg || recordRes.statusText);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Lark Base write failed: ${message}` }, { status: 502 });
  }

  // The record is the source of truth and already succeeded — the group
  // announcement is a best-effort notification on top of it. A Lark hiccup
  // here should not turn a successful booking into an error response.
  if (LARK_CHAT_ID) {
    const bullets = [
      `Customer: ${name} (${phone})`,
      email?.trim() ? `Email: ${email.trim()}` : "",
      pax != null ? `Pax: ${pax}` : "",
      `Plan: ${planName} (${laneLabel})${oversized ? ", Oversized" : ""}`,
      `Drop-off: ${dropOffDate}${dropOffTime ? ` at ${dropOffTime}` : ""}`,
      `Duration: ${duration || "N/A"}`,
      pickupDate ? `Pickup (est.): ${pickupDate}${pickupTime ? ` at ${pickupTime}` : ""}` : "",
      `Total: ${vnd(total)}`,
      `Source: ${source || "Booking Form"}`,
    ].filter(Boolean).map((line) => `• ${line}`);
    const text = [`📦 New Booking: ${ref}`, "", ...bullets].join("\n");

    try {
      await fetch(`${LARK_API}/im/v1/messages?receive_id_type=chat_id`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          receive_id: LARK_CHAT_ID,
          msg_type: "text",
          content: JSON.stringify({ text }),
        }),
      });
    } catch {
      // swallow — announcement is best-effort, see comment above
    }
  }

  return NextResponse.json({ ok: true, ref });
}
