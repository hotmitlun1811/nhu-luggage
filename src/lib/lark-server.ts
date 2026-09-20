/**
 * The Lark calls behind the "extend my storage" form: read the booking a link
 * points at, check whether a request was already sent, write the request, and
 * tell the Stow Bookings group chat. Server-only (it holds the app secret);
 * the rules it applies are in extension.ts.
 *
 * Reads use Lark's base/v3 API (the one the app has permission for) and the
 * write uses the v1 record API, the same call the booking form's route already
 * makes in production.
 *
 * It needs the Bookings table in its "v2" layout (LARK_BOOKINGS_SCHEMA=2) and
 * an Extensions table (LARK_EXTENSIONS_TABLE_ID). Without them `extensionConfig`
 * says so and the page and route show "not available", so a half-set-up
 * deployment can never write to the wrong table.
 */
import {
  BOOKING_COLUMNS,
  EXISTING_REQUEST_COLUMNS,
  isAlreadyRequested,
  parseBookingRows,
  parseExistingRequests,
  type BookingRow,
  type ExtensionRequest,
  type LarkRecordsPage,
} from "./extension";

const LARK_API = "https://open.larksuite.com/open-apis";
/** A slow Lark must not hang the customer's page: give up and show the "try again" message. */
const READ_TIMEOUT_MS = 8000;

export type ExtensionConfig = {
  appId: string;
  appSecret: string;
  baseToken: string;
  bookingsTable: string;
  extensionsTable: string;
  /** The Stow Bookings group. Optional: without it requests are still saved, just not announced. */
  chatId: string | null;
};

/** null when the feature is not set up on this deployment. */
export function extensionConfig(env: NodeJS.ProcessEnv = process.env): ExtensionConfig | null {
  const { LARK_APP_ID, LARK_APP_SECRET, LARK_BASE_APP_TOKEN, LARK_BASE_TABLE_ID, LARK_EXTENSIONS_TABLE_ID, LARK_BOOKINGS_SCHEMA, LARK_CHAT_ID } = env;
  // The rules read the v2 Bookings columns by name; the original table has other names.
  if (LARK_BOOKINGS_SCHEMA !== "2") return null;
  if (!LARK_APP_ID || !LARK_APP_SECRET || !LARK_BASE_APP_TOKEN || !LARK_BASE_TABLE_ID || !LARK_EXTENSIONS_TABLE_ID) return null;
  return {
    appId: LARK_APP_ID,
    appSecret: LARK_APP_SECRET,
    baseToken: LARK_BASE_APP_TOKEN,
    bookingsTable: LARK_BASE_TABLE_ID,
    extensionsTable: LARK_EXTENSIONS_TABLE_ID,
    chatId: LARK_CHAT_ID || null,
  };
}

// The token lasts about 2 hours; keep it between calls of a warm function and refresh a few minutes early.
let cachedToken: { value: string; expiresAt: number } | null = null;

async function tenantToken(cfg: ExtensionConfig): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) return cachedToken.value;
  const res = await fetch(`${LARK_API}/auth/v3/tenant_access_token/internal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ app_id: cfg.appId, app_secret: cfg.appSecret }),
    cache: "no-store",
    signal: AbortSignal.timeout(READ_TIMEOUT_MS),
  });
  const data = await res.json();
  if (!res.ok || data.code !== 0) throw new Error(`Lark auth error: ${data.msg || res.statusText}`);
  cachedToken = { value: data.tenant_access_token, expiresAt: Date.now() + (data.expire - 300) * 1000 };
  return cachedToken.value;
}

/** Rows of a table whose text column equals a value, with only the columns asked for. Throws when Lark refuses. */
async function rowsWhere(cfg: ExtensionConfig, table: string, column: string, value: string, columns: readonly string[]): Promise<LarkRecordsPage> {
  const token = await tenantToken(cfg);
  const q = new URLSearchParams();
  for (const c of columns) q.append("field_id", c);
  q.set("filter", JSON.stringify({ logic: "and", conditions: [[column, "==", value]] }));
  q.set("limit", "50");
  q.set("offset", "0");
  const res = await fetch(`${LARK_API}/base/v3/bases/${cfg.baseToken}/tables/${table}/records?${q}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
    signal: AbortSignal.timeout(READ_TIMEOUT_MS),
  });
  const body = await res.json();
  // Lark answers 200 with a non-zero code for a refused request, so the code is what counts.
  if (!res.ok || body.code !== 0) throw new Error(`Lark read failed: ${body.msg || body.data?.error?.message || res.statusText}`);
  return body.data as LarkRecordsPage;
}

/** Every Bookings row that carries this Booking ID (usually one). */
export async function findBookingRows(cfg: ExtensionConfig, reference: string): Promise<BookingRow[]> {
  return parseBookingRows(await rowsWhere(cfg, cfg.bookingsTable, "Reference", reference, BOOKING_COLUMNS));
}

/** Was this same request already sent and not yet dealt with? */
export async function alreadyRequested(cfg: ExtensionConfig, reference: string, req: ExtensionRequest): Promise<boolean> {
  const page = await rowsWhere(cfg, cfg.extensionsTable, "Booking ID", reference, EXISTING_REQUEST_COLUMNS);
  return isAlreadyRequested(parseExistingRequests(page), req);
}

/** Writes the request row. Returns an error message, or null on success. */
export async function createExtensionRecord(cfg: ExtensionConfig, fields: Record<string, unknown>): Promise<string | null> {
  try {
    const token = await tenantToken(cfg);
    const res = await fetch(`${LARK_API}/bitable/v1/apps/${cfg.baseToken}/tables/${cfg.extensionsTable}/records`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ fields }),
      cache: "no-store",
      signal: AbortSignal.timeout(READ_TIMEOUT_MS),
    });
    const data = await res.json();
    return !res.ok || data.code !== 0 ? data.msg || res.statusText : null;
  } catch (err) {
    return err instanceof Error ? err.message : "Unknown error";
  }
}

/**
 * Best effort: the saved row is the record, so a chat hiccup must never turn a
 * saved request into an error for the customer. It is logged instead, so a
 * message that did not arrive can be found in the server logs.
 */
export async function announceInGroup(cfg: ExtensionConfig, text: string): Promise<void> {
  if (!cfg.chatId) return;
  try {
    const token = await tenantToken(cfg);
    const res = await fetch(`${LARK_API}/im/v1/messages?receive_id_type=chat_id`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ receive_id: cfg.chatId, msg_type: "text", content: JSON.stringify({ text }) }),
      cache: "no-store",
      signal: AbortSignal.timeout(READ_TIMEOUT_MS),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.code !== 0) console.error(`[extend] the group message was not delivered: ${data.msg || res.statusText}`);
  } catch (err) {
    console.error(`[extend] the group message was not delivered: ${err instanceof Error ? err.message : err}`);
  }
}
