/**
 * Single source of truth for the homepage FAQ — both `FAQSection.tsx`
 * (visible content) and `structured-data.ts` (FAQPage JSON-LD) import
 * from here, so the schema can never drift from what's actually on the
 * page. That drift is exactly what happened with pricing on 2026-08-09 —
 * see feedback-verify-pricing-against-live-code.md — one file, not two.
 *
 * Content approved in principle by the owner 2026-08-09, sourced from
 * docs/aeo-seo/2026-08-09-author-content-brief.md. Prices verified
 * against PricingSection.tsx directly, not copied from memory.
 */
export const faqGroups = [
  {
    cluster: "Airport & short stays",
    items: [
      {
        q: "Can I store luggage near Da Nang Airport?",
        a: "Yes. Stow's storefront at 55 Bà Bang Nhãn, Ngũ Hành Sơn is about 10 minutes from Da Nang International Airport by taxi or Grab. It's open 7am–10pm every day, so it covers most flight times. Hourly plans start at 15,000₫/hour for a quick layover.",
      },
      {
        q: "How long can I store luggage between flights?",
        a: "As long as you need. Pay hourly — 15,000₫/hour, 1-hour minimum — for a short layover, or by the day (60,000₫, up to 24 hours) if it spans overnight. Neither plan has a maximum.",
      },
    ],
  },
  {
    cluster: "Visa runs, expats & digital nomads",
    items: [
      {
        q: "Where can I store luggage during a visa run in Da Nang?",
        a: "Stow's flat-rate plans are built for this. Mini (150,000₫) covers up to 1 week, Strand (300,000₫) up to 1 month, Long Stay (1,000,000₫) up to 4 months — one flat price no matter when you actually pick up.",
      },
      {
        q: "Is there monthly luggage storage in Da Nang for digital nomads?",
        a: "Yes — the Strand plan is 300,000₫ flat for up to 1 month, with no daily charges added on. It's built for remote workers and visa runners who want to travel light for a few weeks without carrying everything.",
      },
    ],
  },
  {
    cluster: "Pricing",
    items: [
      {
        q: "Should I choose hourly, daily, or flat-rate storage?",
        a: "Hourly (15,000₫/hr) or daily (60,000₫/day) suits a single day out — sightseeing, a layover, a day trip. Flat-rate (from 150,000₫ for up to a week) suits anything longer than 2–3 days, since the price is fixed no matter when you return.",
      },
      {
        q: 'Is there a size limit on luggage storage in Da Nang?',
        a: 'No hard limit — an oversized surcharge applies instead. Add 30,000₫ on hourly/daily plans, or 50,000₫ on flat-rate plans, for anything 28"+: a large suitcase, a bicycle, a surfboard, a big box.',
      },
    ],
  },
  {
    cluster: "Trust & safety",
    items: [
      {
        q: "Is it safe to store luggage in Da Nang with Stow?",
        a: "Every item gets a unique ID tag and a photo receipt at drop-off. Storage areas run on constant CCTV, and flat-rate items go into a separate locked zone. Only authorized staff release items, and they verify ID at pickup.",
      },
      {
        q: "What can't I store at Stow?",
        a: "Cash, jewelry, and valuable documents; laptops, cameras, and drones on flat-rate plans (accepted on hourly/daily); anything flammable, hazardous, or illegal; fresh food or live animals. Full list on the Trust & Safety page.",
      },
      {
        q: "How long does drop-off and pickup take?",
        a: "Drop-off is designed to take under 3 minutes — tag the item, take the photo, done. Pickup is designed to take under 2 minutes with your booking confirmation or ID tag.",
      },
    ],
  },
  {
    cluster: "Location",
    items: [
      {
        q: "Is Stow near the Marble Mountains?",
        a: "Yes — Stow sits in Ngũ Hành Sơn district, the same district the Marble Mountains (Ngũ Hành Sơn) are named for and located in. Drop your bags and walk to the caves and pagodas without carrying them.",
      },
    ],
  },
] as const;
