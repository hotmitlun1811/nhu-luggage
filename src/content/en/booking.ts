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
    custom: "Custom",
  },
  planDurations: {
    hourly: "Min 1 hr",
    daily: "Up to 24 hrs",
    mini: "Up to 1 week",
    strand: "Up to 1 month",
    longstay: "Up to 4 months",
    custom: "Any dates",
  },
  planTopBadge: "TOP",

  laneFlexible: "Flexible",
  laneFlatRate: "Flat Rate",
  laneFlexibleSub: "For tourists & walk-ins",
  laneFlatRateSub: "For expats & digital nomads",
  /* Custom is for any stay that fits no plan (23 days, 45 days, 3 months). Its
     price is worked out from the dates as the cheapest mix of the other plans,
     so the dropdown row says "Best price" where a plan shows a figure. */
  laneCustom: "Custom",
  laneCustomSub: "Any length of stay",
  customPrice: "Best price",

  planLabel: "Plan",
  /* There is no default plan: the dropdown starts empty and the rest of the
     form stays locked until one is chosen. The hint sits under the dropdown
     while it is locked. */
  planPlaceholder: "Choose your plan",
  planFirstHint: "Choose a plan first, then fill in the rest.",

  /* Heads the contact block (name, email, WhatsApp). */
  contactTitle: "Contact information",

  /* Drop-off and pick-up are each ONE field that takes a date, then a time
     (DateTimeField), two to a row. The two labels name them; dateWord and
     timeWord are the hints shown in the empty field and on the popup's tabs;
     the rest are inside the popup. */
  dropOffDateLabel: "Drop-off date",
  pickupDateLabel: "Pick-up date",
  dateWord: "Date",
  timeWord: "Time",
  prevMonthLabel: "Previous month",
  nextMonthLabel: "Next month",
  /* By the Hour is always same-day, so its pick-up date is filled in from the
     drop-off date and locked. This says why the field can't be changed. */
  sameDayNote: "By the Hour is same-day only.",
  /* The pick-up field waits for the drop-off, because the plan decides how
     late the pick-up can be. Once both are known, this says where the limit is. */
  pickupFirstNote: "Choose the drop-off first.",
  latestPickupPrefix: "Latest pick-up on this plan: ",
  customHint: "We charge the cheapest mix of our plans for your dates.",
  bagsLabel: "Bags",
  bagsHelp: "Bags = items stored, not number of people",
  /* aria-labels for the − / + buttons on the bag counters. */
  decreaseLabel: "Decrease",
  increaseLabel: "Increase",

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
  whatsappPlaceholder: "Phone number",
  /* The country-code picker beside the WhatsApp number: aria-label of its
     button, the search box inside it, and its empty state. */
  phoneCountryLabel: "Country code",
  phoneCountrySearch: "Search country or code",
  phoneCountryEmpty: "No country found",
  emailLabel: "Email",
  emailPlaceholder: "you@example.com",

  oversizedHelpPrefix: '28″+, bike, surfboard · +',
  /* Custom mixes both lanes, and the oversized surcharge differs by lane
     (30,000 on the day plan, 50,000 on the week, month and 4-month plans), so
     its help line shows both rates. */
  perDayLabel: "per day",
  perPeriodLabel: "per week, month or 4 months",
  /* Label of the "how many oversized bags" counter (0 when none). */
  oversizedCountLabel: "Oversized bags",
  /* The "i" button beside that label. The body defines "oversized" with the
     same list as the pricing section, the FAQ and the Terms of Service, so
     change them together. 28 in = 71 cm. */
  oversizedTipLabel: "What counts as oversized?",
  oversizedTipBody:
    "Oversized means a suitcase of 28 inches (71 cm) or more, a bicycle, a surfboard, or a large box. Each oversized bag costs extra.",
  /* Same-day drop-off hints when the fixed 07:00–22:00 slot list has run out
     of valid options for the chosen day. */
  noSlotsTodayNotice: "No more time slots today — pick a later drop-off date.",
  noLaterSlotsNotice: "No later slots — choose an earlier drop-off time.",
  invalidPhone: "Enter a valid phone number",
  /* Success-screen fallback: WhatsApp may not auto-open (popup blocked,
     desktop with no session, app not installed). */
  successOpenWhatsApp: "Open WhatsApp",
  successWhatsAppHint: "Didn't WhatsApp open? Tap to send your booking.",

  totalLabel: "Total",
  totalFlatFee: "Total (flat fee)",
  totalPrefix: "Total (",
  totalSuffix: ")",
  /* The receipt under the total: every step of the price, so a customer can
     check it instead of trusting a number. {placeholders} are filled in by
     PriceBreakdown, so each language can put the words in its own order.
     Prices are per bag; the receipt multiplies by the bag count. */
  receiptTitle: "How we calculated this price",
  receiptEmpty: "Choose your dates and every step of the price appears here.",
  receiptStorage: "Storage, per bag",
  receiptOversized: "Oversized surcharge, per oversized bag",
  receiptPerBag: "Price per bag",
  receiptPerOversizedBag: "Surcharge per oversized bag",
  receiptOversizedBagUnit: { singular: "oversized bag", plural: "oversized bags" },
  receiptOnce: "Charged once, however many hours",
  receiptCapped: "Capped at the day price after {hours} hours",
  receiptTotal: "Total",
  receiptNoteCustom: "Custom charges the cheapest mix of our plans that covers your dates.",
  receiptNoteCompare: "For comparison, {days} single days would cost {price} per bag.",
  receiptNoteLastPeriod: "Your last period runs until {date}. You pay for all of it, even if you collect earlier.",
  receiptNoteFlat: "One flat price covers the whole period. Collecting earlier does not lower it.",
  receiptNoteDays: "A day is 24 hours from your drop-off time. We add {minutes} minutes of grace at the end of each period.",
  receiptNoteHourly: "Each started hour costs {price}. After {hours} hours the day price is cheaper, so we charge that instead.",


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
  successRefPrefix: "Booking ID: ",
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
  dateInPast: "Choose today or a later date",
  pickupBeforeDropOff: "Pick-up must be after drop-off",
  pickupOutsidePlan: "Pick-up is outside this plan",
} as const;
