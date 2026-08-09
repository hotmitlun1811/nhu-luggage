# AUTHOR-tier content brief — FAQ, stats, direct-answer copy

**Status: PROPOSAL — not shipped.** Per the AEO audit kit's golden rule #4, AUTHOR-tier content (anything that rewrites or adds body copy) goes through an editorial brief for approval, never ships unilaterally. This is that brief. Nothing below is live on the site yet.

**Grounded in:** [`2026-08-09-entity-topical-keyword-map.md`](2026-08-09-entity-topical-keyword-map.md) — every FAQ question below maps to a real keyword cluster from that doc, not a generic guess. Every fact below is pulled from project memory or the existing live site — nothing invented.

---

## What this fixes

Per the kit's own ranked signals, this is the highest-leverage work left:
- **Word simplicity (ρ = −0.60, the single strongest signal)** — the site's current copy is fine but not optimized for short words / direct answers.
- **Statistic density (ρ = +0.47)** and **direct-answer-first-sentence** — the site states facts (pricing, hours) but doesn't lead paragraphs with a direct answer to the implied question.
- **List density (ρ = +0.31)** — a new FAQ block adds real list/Q&A structure.

## What this deliberately does NOT include

No fabricated statistics. Stow launched June 2026 — two months old, zero reviews. There is no "98% satisfaction," no "X,000 bags stored," no invented customer count anywhere below. Where the kit calls for "≥3 concrete statistics with inline source," the stats used are Stow's own real, verifiable operating facts (hours, response-time targets, pricing, distance) — not fabricated third-party numbers. Once real review/volume data exists, add it then, sourced.

---

## Proposed FAQ section (new)

Placement: a new section between `WhyStow` and `TrustSafety` on the homepage, or as an expansion of `TrustSafety` — your call. Each question is phrased as a real user prompt (kit's AUTHOR rule: H2s as prompts, not labels), each answer leads with a direct answer in ≤3 sentences / ≤60 words before any elaboration.

### Airport / short-stay (tourist intent)

**Can I store luggage near Da Nang Airport?**
Yes. Stow's storefront at 55 Bà Bang Nhãn, Ngũ Hành Sơn is about 10 minutes from Da Nang International Airport by taxi or Grab. It's open 7am–10pm every day, so it covers most flight times. Hourly plans start at 15,000₫/hour for a quick layover.

**How long can I store luggage between flights?**
As long as you need. Pay hourly — 15,000₫/hour, 1-hour minimum — for a short layover, or by the day (60,000₫, up to 24 hours) if it spans overnight. Neither plan has a maximum.

### Visa run / expat / digital nomad intent

**Where can I store luggage during a visa run in Da Nang?**
Stow's flat-rate plans are built for this. Mini (150,000₫) covers up to 1 week, Strand (300,000₫) up to 1 month, Long Stay (1,000,000₫) up to 4 months — one flat price no matter when you actually pick up.

**Is there monthly luggage storage in Da Nang for digital nomads?**
Yes — the Strand plan is 300,000₫ flat for up to 1 month, with no daily charges added on. It's built for remote workers and visa runners who want to travel light for a few weeks without carrying everything.

### Pricing (both intents)

**Should I choose hourly, daily, or flat-rate storage?**
Hourly (15,000₫/hr) or daily (60,000₫/day) suits a single day out — sightseeing, a layover, a day trip. Flat-rate (from 150,000₫ for up to a week) suits anything longer than 2–3 days, since the price is fixed no matter when you return.

**Is there a size limit on luggage storage in Da Nang?**
No hard limit — an oversized surcharge applies instead. Add 30,000₫ on hourly/daily plans, or 50,000₫ on flat-rate plans, for anything 28"+: a large suitcase, a bicycle, a surfboard, a big box.

### Trust & safety

**Is it safe to store luggage in Da Nang with Stow?**
Every item gets a unique ID tag and a photo receipt at drop-off. Storage areas run on constant CCTV, and flat-rate items go into a separate locked zone. Only authorized staff release items, and they verify ID at pickup.

**What can't I store at Stow?**
Cash, jewelry, and valuable documents; laptops, cameras, and drones on flat-rate plans (accepted on hourly/daily); anything flammable, hazardous, or illegal; fresh food or live animals. Full list on the [Trust & Safety page](/trust-safety).

**How long does drop-off and pickup take?**
Drop-off is designed to take under 3 minutes — tag the item, take the photo, done. Pickup is designed to take under 2 minutes with your booking confirmation or ID tag.

### Location (Marble Mountains cluster)

**Is Stow near the Marble Mountains?**
Yes — Stow sits in Ngũ Hành Sơn district, the same district the Marble Mountains (Ngũ Hành Sơn) are named for and located in. Drop your bags and walk to the caves and pagodas without carrying them.

---

## Direct-answer intro rewrites (existing sections)

Kit rule: "Lead paragraph answers the page's main question in ≤80 words before any hero narrative." These are proposed first sentences to add at the top of three existing sections — not full rewrites, just the direct-answer opener the kit calls for.

- **`HowItWorks`** — open with: *"Drop off in under 3 minutes: tag your bag, get a photo receipt, go. Pick up in under 2 minutes with your confirmation."*
- **`PricingSection`** — open with: *"Two lanes: pay-per-time (15,000₫/hour or 60,000₫/day) for a day out, or flat-rate (from 150,000₫) for a week or longer — one price, no daily math."*
- **`TrustSafety` (homepage section, not the dedicated page)** — open with: *"Every bag gets a photo receipt and a unique ID tag at check-in. CCTV runs on every storage area, all day."*

---

## Schema note

Once this copy ships (with your sign-off), add `FAQPage` JSON-LD wrapping the new FAQ block. The kit's MUST checklist explicitly allows this — bare/schema-only FAQ is the anti-pattern (ranked #14, the one negative signal in the whole study); FAQ schema paired with real visible Q&A content is the sanctioned case. Google's rich result is gone either way (see the structured-data doc), so this schema now serves AI answer-engine parsing only — still worth the ~10 lines of JSON-LD once the content exists, not worth holding up the content for.

---

## What I need from you

1. **Edit/approve/reject** any of the FAQ answers above — these are drafts, not final copy.
2. **Placement call** — new standalone FAQ section, or folded into existing sections?
3. Once approved, I'll wire it into the actual components + add the `FAQPage` schema in the same pass.
