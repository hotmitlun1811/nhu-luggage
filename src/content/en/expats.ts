export const expats = {
  eyebrow: "For expats & digital nomads",
  /* 3-part split for the orange-highlighted mid-sentence word — see hero.ts's note on this pattern. */
  headlinePre: "Da Nang is home. ",
  headlineHighlight: "Visa runs",
  headlinePost: " are part of the rhythm.",
  paragraph1:
    "Thousands of foreigners live and work in Da Nang long-term. Every few months, the visa expires. The question is always the same: where do I leave my things?",
  paragraph2:
    "No one wants to pay rent on an empty room just to hold a spot. Not everyone has a friend they trust with a laptop and a bike for weeks. Stow exists to solve exactly that.",
  cta: "See Flat Rate Plans",
  cycleLabel: "The visa run cycle",
  /* n/highlight stay local to ForExpats.tsx — structural, not translatable. */
  cycle: [
    { label: "Visa expires", sub: "Every 1–3 months" },
    { label: "Leave for a visa run", sub: "Bangkok · Kuala Lumpur · Singapore" },
    { label: "Stow holds everything", sub: "Locked zone · CCTV · Unique ID tag" },
    { label: "You come back", sub: "Everything exactly as you left it" },
  ],
  /* "150,000 ₫ for 1 week" is the Mini plan's real price+duration
     (src/lib/plans.ts) — kept as static text matching how prices are
     already written elsewhere (the FAQ brief), not computed dynamically;
     verify against plans.ts if the Mini plan ever changes. */
  pricingCalloutPre: "Flat Rate plans start at ",
  pricingCalloutHighlight: "150,000 ₫ for 1 week",
  pricingCalloutPost: " — one fixed fee, no daily rate, no early-pickup penalty.",
} as const;
