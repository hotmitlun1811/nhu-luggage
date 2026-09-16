/**
 * HeroBookingForm.tsx — the largest dictionary domain (~75 strings).
 *
 * Deliberately NOT included: the WhatsApp business-message template
 * (`buildMessage()` in the component) and the Lark API payload fields.
 * Both stay hardcoded English regardless of page locale — per the i18n
 * plan's decision #4, that message is staff-read on the business's own
 * WhatsApp number, and a translated version staff can't read defeats the
 * point. Only the visible on-page UI localizes.
 *
 * planNames/planDurations replace HeroBookingForm.tsx's Phase-0-era local
 * `PLAN_DISPLAY` const — same values, now per-locale.
 */
export const booking = {
  planNames: {
    hourly: "By the Hour",
    daily: "By the Day",
    mini: "Mini",
    strand: "Strand",
    longstay: "Long Stay",
  },
  planDurations: {
    hourly: "Min 1 hr",
    daily: "Up to 24 hrs",
    mini: "Up to 1 week",
    strand: "Up to 1 month",
    longstay: "Up to 4 months",
  },
  planTopBadge: "TOP",

  laneLabel: "Lane",
  laneFlexible: "Flexible",
  laneFlatRate: "Flat Rate",
  laneFlexibleSub: "For tourists & walk-ins",
  laneFlatRateSub: "For expats & digital nomads",

  planLabel: "Plan",
  laptopNotice: "Laptops and electronics accepted on flexible plans.",
  /* The 4 in this sentence is HOURLY_BILLS_AS_DAY_AFTER_HOURS in
     src/lib/plans.ts, which is what the total actually bills on — change
     both together or the copy and the price stop agreeing. */
  hourlyCapNotice: "Over 4 hours is charged as 1 day.",

  dropOffDateLabel: "Drop-off date",
  dropOffLabel: "Drop-off",
  timeLabel: "Time",
  selectPlaceholder: "Select…",
  pickupTimeLabel: "Pick-up time",
  pickupDateLabel: "Pick-up date",
  bagsLabel: "Bags",
  bagsHelp: "Bags = items stored, not number of people",
  bringAtLabel: "Bring at",
  pickupLabel: "Pickup",

  /* Pluralized via pluralizeWord() from src/lib/format.ts — en has real
     singular/plural forms; ko/zh set both to the same word (neither
     pluralizes nouns the way English does). */
  hourUnit: { singular: "hour", plural: "hours" },
  dayUnit: { singular: "day", plural: "days" },
  bagUnit: { singular: "bag", plural: "bags" },
  /* Flat-rate is billed per period (Mini per week, Strand per month) — these
     label the period count in the total + summary. Long Stay reads "N × 4
     months", built from monthUnit. */
  weekUnit: { singular: "week", plural: "weeks" },
  monthUnit: { singular: "month", plural: "months" },

  nameLabel: "Name",
  namePlaceholder: "Your name",
  whatsappLabel: "WhatsApp",
  whatsappPlaceholder: "+84 or local",
  emailLabel: "Email",
  emailPlaceholder: "you@example.com",

  bagsInlineHelp: "Items stored, not people",
  oversizedLabel: "Oversized?",
  oversizedHelpPrefix: '28″+, bike, surfboard · +',
  /* aria-label for the "how many oversized bags" counter revealed when the
     Oversized toggle is on and there's more than one bag. */
  oversizedCountLabel: "Oversized bags",
  /* Same-day drop-off hints when the fixed 07:00–22:00 slot list has run out
     of valid options for the chosen day. */
  noSlotsTodayNotice: "No more time slots today — pick a later drop-off date.",
  noLaterSlotsNotice: "No later slots — choose an earlier drop-off time.",
  /* Email is optional on the Flexible lane; this tags the field so tourists
     doing a quick drop know they can skip it. */
  optionalTag: "optional",
  invalidPhone: "Enter a valid phone number",
  /* Success-screen fallback: WhatsApp may not auto-open (popup blocked,
     desktop with no session, app not installed). */
  successOpenWhatsApp: "Open WhatsApp",
  successWhatsAppHint: "Didn't WhatsApp open? Tap to send your booking.",

  totalFlatFee: "Total (flat fee)",
  totalPrefix: "Total (",
  totalSuffix: ")",

  consentAgreedText: "Agreed to Terms of Service & Privacy Policy",
  changeLabel: "Change",
  consentPromptPre: "Review & accept Stow's ",
  consentPromptTos: "Terms of Service",
  consentPromptAnd: " & ",
  consentPromptPrivacy: "Privacy Policy",
  consentPromptPost: " to continue",
  consentErrorText: "Please review and accept to continue",

  submitLoading: "Opening WhatsApp…",
  submitIdle: "Confirm via WhatsApp",

  successTitle: "Request sent!",
  successSubtitle: "Your details are now in WhatsApp.",
  successReplyTime: "We reply within 15 minutes.",
  successRefPrefix: "Ref: ",
  policyEmailLabel: "Policy & agreement email",
  emailSendingPrefix: "Sending to ",
  emailSentPrefix: "Sent to ",
  emailFailedFallback: "Failed to send",
  emailWillSendPrefix: "Will send to ",
  retryLabel: "Retry",
  backToHome: "Back to home",
  bookAgain: "Book again",

  required: "Required",
  invalidEmail: "Invalid email",
} as const;
