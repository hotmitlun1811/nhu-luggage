/**
 * Build-time feature switches. Plain consts, not env vars, so flipping one
 * is a reviewable commit rather than a dashboard setting nobody can see
 * from the code.
 */

/**
 * The automatic post-booking email.
 *
 * OFF since 2026-08-15, at the client's request. It used to fire the
 * "Policy & agreement" email from /api/send-agreement the moment a booking
 * form was submitted. The plan is to replace it with a *review-request*
 * email — but that email doesn't exist yet, so nothing should go out in
 * the meantime.
 *
 * Everything stays wired up (the route, the Gmail transport, both forms'
 * send + retry paths) — this flag is the only thing standing between the
 * current state and sending again. To turn the review email on later:
 *   1. rewrite the template in src/app/api/send-agreement/route.ts
 *      (and rename the route — "agreement" won't describe it any more),
 *   2. flip this to `true`,
 *   3. re-check the success-screen copy in booking.ts's
 *      `policyEmailLabel` / `email*Prefix` keys, which is hidden while
 *      this is off and still says "Policy & agreement email".
 *
 * Enforced in two places on purpose: the forms skip the request, and the
 * route itself refuses (503) so a stale cached bundle can't still send.
 */
// Annotated `boolean` rather than letting TS infer the literal `false`,
// so the still-live send/retry code doesn't get narrowed to unreachable.
export const POST_BOOKING_EMAIL_ENABLED: boolean = false;
