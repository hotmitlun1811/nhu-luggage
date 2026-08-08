# Lark integration — auto-push bookings to Base + announce in group chat

Status: approved (app posts the group message directly — see amendment below)
Date: 2026-08-08

## Goal

When a booking comes in through Stow's forms, it should land in a Lark Base
table automatically, and the team should get an announcement in a Lark group
chat — no manual re-entry.

## Scope confirmed with user

- **Both forms** feed this: `IntakeForm.tsx` (front-desk walk-in tool — already
  builds a full `Confirmed` booking object and calls one API route) and
  `BookingForm.tsx` (customer-facing, currently only opens a WhatsApp deep
  link with zero server round-trip).
- Lark custom app + Base do **not exist yet** — user has Lark admin access but
  hasn't created them. This design includes the exact setup steps.
- The official `larksuite/cli` + its Lark skills are installed **project-scoped**
  (`.agents/skills/`, gitignored) as a dev-time aid for Claude to inspect the
  Base schema and test delivery — it is not a runtime dependency of the app.
- Messaging uses **one custom app** or its Base's account for both the Base
  write and the group announcement — no separate incoming webhook.

## Research findings (Lark Open Platform)

- Auth: `POST /open-apis/auth/v3/tenant_access_token/internal` with
  `app_id`/`app_secret` → `tenant_access_token`, ~2 hr expiry. Must be cached
  and refreshed server-side; never exposed to the browser.
- Bitable (Base) write: `POST /open-apis/bitable/v1/apps/:app_token/tables/:table_id/records`
  (single) or `.../records/batch_create` (up to 1000/batch, not needed here).
- Group messaging: `POST /open-apis/im/v1/messages?receive_id_type=chat_id`
  (`msg_type=text` or `interactive` card). The bot must already be a member of
  the target group chat.
- Official Node SDK: `@larksuiteoapi/node-sdk` (npm) — thin wrapper over the
  same REST calls, handles token refresh for us.
- **Base has a native "Automation" feature**: a no-code rule inside the Base
  UI that triggers "when record created" → "send message to group chat,"
  using the record's own fields as placeholders in the message template.

## Recommended approach (as amended — user chose direct messaging)

**The app writes the Base record, then posts the group announcement itself**
via `im/v1/messages` — both calls live in the same API route, using the same
app credentials. This trades the "no-code, ops-editable" Automation approach
for full control over the message's formatting and timing.

```
IntakeForm / BookingForm submit
        │
        ▼
POST /api/lark/booking  (new Next.js route, server-side only)
        │
        ├─ 1. get/cache tenant_access_token (refresh ~2 hr)
        ├─ 2. POST .../bitable/v1/apps/:app_token/tables/:table_id/records
        └─ 3. POST /open-apis/im/v1/messages?receive_id_type=chat_id
                        (msg_type=text, built from the same booking data)
```

Consequences of this choice vs. the Base-Automation alternative:
- Needs the `im:message` scope in addition to Base scopes, and the app's bot
  must be added to the target group chat as a member before it can post.
- Message wording lives in our code (`src/app/api/lark/booking/route.ts`), so
  changing the announcement text requires a code change + deploy, not a
  no-code edit in the Lark UI.
- Two external calls per submission instead of one — the record write and the
  message post are sequenced (record first, then message), and a failure in
  step 3 should not roll back or block step 2 (log and continue; the record
  is the source of truth, the message is a notification).
- Upside: precise control over formatting today, and a straightforward path
  to upgrade the text message to an interactive card (e.g. with a "confirm
  booking" button) later, entirely in code.

Not pursued: the Base-Automation approach (record-created trigger → Lark
sends the message itself, zero IM scope needed) — considered and available
as a fallback if the direct-messaging path proves harder to get bot-in-group
permissions for.

## What the user needs to do (admin-console actions Claude cannot do for them)

1. **Create the Lark custom app** — via `lark-cli config init --new --brand lark`
   (Claude runs this in the background; it blocks on a verification URL the
   user opens in their browser to finish creation) *or* manually at
   open.larksuite.com → Developer Console → Create Custom App.
2. **Grant Base scopes** (`bitable:app`) and publish/enable the app for the
   workspace.
3. **Create the Base + table**, or point us at an existing one. Proposed field
   schema (names only — types noted):

   | Field            | Type          | Source |
   |-------------------|---------------|--------|
   | Reference         | Text          | `ref` (Intake) / generated for Booking |
   | Source            | Single select | `"Intake"` / `"Booking Form"` |
   | Lane              | Single select | `flexible` / `flatrate` |
   | Plan              | Text          | plan name |
   | Oversized          | Checkbox      | |
   | Drop-off date      | Date          | |
   | Drop-off time      | Text          | |
   | Duration / pickup  | Text          | days/hours or pickup date, human text |
   | Name               | Text          | |
   | Phone              | Text          | |
   | Email              | Text          | Intake only, blank for Booking |
   | Pax                | Number        | Intake only |
   | Total (VND)        | Number        | |
   | Submitted at        | Date/time     | server timestamp, not client |

4. **Add a Base Automation**: trigger "record created" → action "send message"
   to the target group chat, template built from the fields above.
5. **Copy the `app_token` and `table_id`** from the Base's URL
   (`.../base/<app_token>?table=<table_id>`) once the table exists.
6. **Add the bot to the target group chat** if the Automation's "send as app"
   option requires membership (Base Automations typically post as the Base's
   own integration, not the bot — confirmed during setup, see below).

## New code (after user completes the above)

- `src/app/api/lark/booking/route.ts` — new Next.js route handler, modeled on
  the existing `src/app/api/send-agreement/route.ts` pattern (env-var
  secrets, `NextResponse.json` errors, no client-exposed credentials).
  - In-memory token cache (module scope) with expiry check before each call;
    refetches `tenant_access_token` when stale.
  - Accepts a shared booking payload shape from both forms; missing/optional
    fields (email, pax) are just omitted from the Base record.
  - Non-fatal: `IntakeForm` and `BookingForm` fire this alongside their
    existing behavior (agreement email / WhatsApp deep link) and should not
    block or fail the user-facing flow if Lark is briefly unavailable — fire
    with a short timeout, log/ignore errors, no UI-blocking retry.
- `.env.example` additions: `LARK_APP_ID`, `LARK_APP_SECRET`,
  `LARK_BASE_APP_TOKEN`, `LARK_BASE_TABLE_ID`, with the same descriptive
  comment style already used for the Gmail vars.
- `BookingForm.tsx`: add the `fetch("/api/lark/booking", …)` call before/along
  the existing `window.open(wa.me/...)` — does not change the WhatsApp UX.
- `IntakeForm.tsx`: add the same call alongside the existing
  `sendAgreementEmail` call.

## Status: implemented and verified (2026-08-08)

All setup steps above are done. Live values (not secrets):

- App ID: `cli_aafdee4df5b8deef` (scopes granted: `base:app:create`,
  `contact:user.id:readonly`; `im:message` send-as-bot worked without an
  explicit scope prompt — already covered by this app's default set)
- Base: "Stow Bookings" — `https://xjhgtesifxf.sg.larksuite.com/base/GrotbcqWoafD0NsZDVglv405gQg`
  (`app_token=GrotbcqWoafD0NsZDVglv405gQg`, table `Bookings` = `tblTGHAMqIRiCOgd`,
  time zone `Asia/Bangkok` — Lark doesn't have a distinct Vietnam zone, same
  UTC+7 offset)
- Group chat: "Stow Bookings" — `chat_id=oc_70863952971cc6e2dc4e502d147625cf`
- Code: `src/app/api/lark/booking/route.ts`, wired into both
  `IntakeForm.tsx` (`sendLarkBooking`, alongside `sendAgreementEmail`) and
  `BookingForm.tsx` (`sendLarkBooking`, fire-and-forget before the WhatsApp
  deep link opens)
- `.env.example` documents all five `LARK_*` vars; `.env.local` has all of
  them filled in (the App Secret was pasted in directly by the user — not
  something Claude can read or generate)

One implementation detail worth recording: Bitable's raw REST API expects
`datetime` field values as a **millisecond epoch timestamp** (number), not
the human string shown in the CLI's own field-value guide — the CLI does
that conversion internally. `route.ts` sends
`new Date(\`${dropOffDate}T12:00:00\`).getTime()`, noon to dodge any
timezone-boundary date shift.

End-to-end verified via the local dev server against the real Base + group:
one request shaped like `BookingForm`'s payload (no email/pax) and one shaped
like `IntakeForm`'s (with email/pax and a caller-supplied reference) — all 13
fields plus the auto `Submitted at` round-tripped correctly for both, and the
group announcement arrived. Both test records were deleted afterward.

## Schema revisions after first review (2026-08-08, same day)

The user reviewed the live Base in the Lark UI and caught three issues with
the first-pass schema — all fixed:

1. **"Duration / Pickup" mixed a duration label and a computed pickup date
   into one free-text field** (e.g. `"2 days, pickup by 11 Aug"`) — pickup
   date is real date data and should be sortable/filterable on its own, not
   buried in a string. Split into: `Duration` (pure label, "3 hours" / "Up to
   1 month"), `Pickup Date` (datetime), `Pickup Time` (text). Pickup Date/Time
   are only ever set by `BookingForm` (computed exactly for hourly/daily,
   user-estimated for flatrate) — `IntakeForm` has no duration/pickup
   selection at all, so they stay unset for Intake bookings, not faked.
2. **`Plan` was plain text** while `Lane`/`Source` were Single Option —
   inconsistent, and ops couldn't filter/group by plan. Converted to Single
   Option with the union of plan names both forms actually send: By the Hour,
   By the Day, Mini, Standard, Strand, Long Stay. (Note: "Standard" vs
   "Strand" is an existing naming inconsistency between the two forms'
   `PLANS` constants, unrelated to Lark — flagged to the user, not touched,
   since it's a copy/content call outside this task's scope. Their `Long
   Stay` pricing also differs between forms — same flag.)
3. **`Lane`'s options were the raw code values `flexible`/`flatrate`**
   (leaked straight from the TypeScript union type) instead of the
   human-readable labels the site itself already uses. Renamed options to
   `Flexible` / `Flat Rate`; `route.ts` now writes the label, not the code
   value, and reuses the same label in the group-message text.

Re-verified end-to-end after the schema changes with two more live test
submissions (hourly with a cross-midnight pickup-date rollover, and an Intake
submission with no pickup fields) — all fields, including the rollover math,
came back correct. Both test records deleted afterward.

## Correction: wrong component wired up first (2026-08-08, same day)

`BookingForm.tsx` — the file first wired up above — turned out to be **dead
code, not rendered by any route**. The real customer-facing form is
`HeroBookingForm.tsx` (rendered via `HeroSplit.tsx` on the homepage), which
has a materially different, richer field set: explicit `pickupDate`/
`pickupTime` inputs (no need to derive pickup via quantity math), and — unlike
`BookingForm.tsx` — collects Email and Pax for **both** lanes, not just via
Intake. This is what the user was actually pointing at when a test submission
seemed to be "missing Pax for the other lane": that test had gone through the
dead file, which never collects Pax at all, on either lane.

Fix: `sendLarkBooking` moved to `HeroBookingForm.tsx` (same shape, wired into
its own `handleSubmit`). `BookingForm.tsx` still has its own now-inert
`sendLarkBooking` — it does nothing in production since nothing renders that
component, but it wasn't deleted; ask the user before removing dead code they
didn't ask you to touch.

Re-verified with real browser automation (Playwright) driving the actual
rendered form end-to-end — not hand-crafted curl payloads — through the full
consent-modal flow, for all three plan/lane combinations:
- Flatrate/Strand: pickup date entered directly, no pickup time (correct, no
  such input exists for flatrate)
- Flexible/By the Day: pickup date entered directly, duration computed from
  the date range (`diffDays`)
- Flexible/By the Hour: pickup time entered directly, `Oversized` toggled on,
  duration computed from the time range (`diffMinutes`)

All 16 Base fields plus the group message came back correct for every
scenario, captured via the real `/api/lark/booking` network request and
cross-checked against the live Base records. One stale test record left over
from before the Plan-options cleanup (`Plan` had gone `null` after its
"Standard" option was removed) was also caught and deleted.

## Still open (deploy-time, not code)

1. Production needs the same five `LARK_*` env vars added to the Vercel
   project (Environment Variables) — they only exist in `.env.local` today.
2. Wording/format of the announcement message can be tuned in
   `route.ts` (the `text` template) whenever the team wants it to read
   differently — no Lark-side config needed since messaging is done in code,
   not a Base Automation.
