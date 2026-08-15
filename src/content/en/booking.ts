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

  nameLabel: "Name",
  namePlaceholder: "Your name",
  whatsappLabel: "WhatsApp",
  whatsappPlaceholder: "+84 or local",
  emailLabel: "Email",
  emailPlaceholder: "you@example.com",

  bagsInlineHelp: "Items stored, not people",
  oversizedLabel: "Oversized?",
  oversizedHelpPrefix: '28″+, bike, surfboard · +',

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
