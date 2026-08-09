export const pricing = {
  eyebrow: "Transparent Pricing",
  headlineLines: ["Two lanes.", "Pick yours."],
  intro: "Choose based on how long you need storage. One flat surcharge for oversized items — that's the only extra.",
  perBagNote:
    "Prices are per bag, not per person — each bag or item stored counts as one. Storing several bags? WhatsApp us and we'll sort it together.",
  lane1: {
    label: "Lane 1 — Flexible",
    sublabel: "For tourists & walk-ins",
    surchargeNote: "+30,000 ₫ surcharge for oversized items (28\"+ suitcase, bicycle, surfboard, large box)",
  },
  lane2: {
    label: "Lane 2 — Flat Rate",
    sublabel: "For expats & digital nomads",
    surchargeNote: "+50,000 ₫ surcharge for oversized items · Price fixed regardless of early pickup",
  },
  /* name/unit/duration/tag per PlanKey (src/lib/plans.ts) — price/currency
     come from PLAN_FACTS + vnd() at render time, locale-invariant; `unit`
     is just the suffix text printed after the formatted price. */
  plans: {
    hourly: { name: "By the Hour", unit: "/ hour / bag", duration: "Minimum 1 hour, billed per hour", tag: null as string | null },
    daily: { name: "By the Day", unit: "/ day / bag", duration: "Up to 24 hours from drop-off", tag: "Best value" as string | null },
    mini: { name: "Mini", unit: "flat / bag", duration: "Up to 1 week", tag: null as string | null },
    strand: { name: "Strand", unit: "flat / bag", duration: "Up to 1 month", tag: "Most popular" as string | null },
    longstay: { name: "Long Stay", unit: "flat / bag", duration: "Up to 4 months", tag: null as string | null },
  },
  cta: {
    button: "Book Your Storage",
    note: "No account needed · WhatsApp 0905 955 161 for walk-in questions",
  },
} as const;
