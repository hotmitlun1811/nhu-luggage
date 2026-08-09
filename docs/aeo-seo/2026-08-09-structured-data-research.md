# Structured Data for Stow — researched, not guessed

**Scope:** stowdanang.com
**Method:** primary docs (Google Search Central, schema.org) + curl'd competitor markup — not SEO-blog summaries
**Date:** August 9, 2026

Full rationale for the JSON-LD architecture shipped in [`src/lib/structured-data.ts`](../../src/lib/structured-data.ts), commit `a9e02dd`.

---

## The verdict

| Schema piece | Status | Why |
|---|---|---|
| `LocalBusiness` | **Ship** | Google's own required/recommended fields. Live — the entity anchor. |
| `SelfStorage` | **Drop** | Was stacked onto LocalBusiness in an earlier pass. No luggage-storage site checked uses it — the term means long-term storage lockers, not hourly bag-check. Precision beats a plausible-looking type. |
| `Service` + `OfferCatalog` | **Ship** | The pattern the market leader actually runs in production — five priced plans as machine-readable facts, not prose. |
| `BreadcrumbList` | **Ship** | Cheap, correct, zero content risk. Added to the three sub-pages. |
| `FAQPage` | **Hold** | Google killed the rich result in May 2026. The AEO kit's own audit data ranks bare FAQ schema as the single lowest — even negative — signal. Needs real visible Q&A copy first, not a wrapper. |
| `AggregateRating` | **Hold** | Real review counts only. Faking this is what Google's spam policy names by example. |
| Product-as-service | **Drop** | One competitor wraps a service in Product schema to win star-rating snippets. A real, observed tactic — and a policy violation without real reviews. Not worth the risk for a first-year local business. |

---

## Three findings from checking primary sources

### 1 · FAQPage rich results are dead — as of this year

Google restricted FAQ rich results to government/health sites in 2023, then finished the job in 2026: the feature stopped appearing in Search on May 7, and Google pulled the documentation entirely.

> "The FAQ rich result feature is no longer shown in Google Search results, as announced in the changelog entry in May 2026."
> — [Google Search Central, June 15 2026 changelog](https://developers.google.com/search/docs/appearance/structured-data/faqpage)

FAQPage is still valid schema.org markup and Google will still parse it structurally — it just buys nothing visible anymore. Combined with the AEO audit kit's own finding that bare FAQ schema (no visible Q&A body) is the single *lowest — negative — ranked signal* in its correlation study (`03-ranked-signals.md`, rank #14, partial ρ = −0.04), this drops from "quick win" to "not worth doing without real content behind it."

### 2 · `SelfStorage` was the wrong type

Last pass used `["LocalBusiness", "SelfStorage"]` because it was the closest-sounding formal schema.org type. Checking the type definition directly:

> "A self-storage facility." — no properties beyond LocalBusiness; a label, not a description of the service.
> — [schema.org/SelfStorage](https://schema.org/SelfStorage)

The term "self-storage" means rentable long-term units — not an attended, hourly bag-check counter. Four real luggage-storage competitors' live markup were checked directly (`curl` + parse the `ld+json` blocks) — Bounce, Radical Storage, Nannybag, LuggageHero — and none use it. None of schema.org's 800+ types name "attended short-term luggage storage" precisely, and Google's own guidance is to use the *most specific accurate* type — not the closest-sounding one. Plain `LocalBusiness`, paired with an explicit `Service` entity that spells out what's actually offered, says more than a mismatched label.

### 3 · The real pattern, pulled from a market leader's live HTML

Radical Storage (13,000+ locations, ranks well for "luggage storage [city]" worldwide) ships a `Service` entity with a nested `OfferCatalog` for its per-day pricing tiers on every location page. Trimmed from a live curl of a real location page:

```json
{
  "@type": "Service",
  "name": "Luggage storage",
  "serviceType": "Luggage storage",
  "provider": { "@type": "Organization", "name": "Radical Storage" },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Prices by item size",
    "itemListElement": [
      { "@type": "Offer", "alternateName": "Small from $3.90/day",
        "priceSpecification": { "@type": "UnitPriceSpecification",
          "priceCurrency": "USD", "price": 3.9, "unitText": "per 24 hours" } }
    ]
  }
}
```

This is the schema.org-canonical way to encode tiered service pricing — and it maps almost exactly onto Stow's two-lane, five-plan structure. It's also a direct hit on the AEO kit's #3 and #4 ranked signals (statistic density, table density): five real prices become extractable facts instead of body copy an LLM has to parse and hope it got right.

---

## The entity graph shipped

One `@graph`, two linked entities, sharing the same JSON-LD block on every page (root layout):

```
LocalBusiness (#business)              Service (#service)
  NAP, geo, hours          ◄──provider──  serviceType: "Luggage storage"
                                              │
                                              ▼ hasOfferCatalog
                                          OfferCatalog "Storage Plans"
                                              │ itemListElement (5)
                    ┌───────────┬────────────┼────────────┬───────────┐
                Hourly       Daily       Flat—Mini   Flat—Standard  Flat—Long Stay
               15,000₫     60,000₫       150,000₫      300,000₫       500,000₫
               /hour        /day       flat/1wk      flat/1mo       flat/3mo
```

`LocalBusiness` and `Service` are linked by `@id` reference (`provider: { "@id": "https://stowdanang.com/#business" }`) rather than duplicated inline — one source of truth for the NAP data.

Full JSON-LD: [`src/lib/structured-data.ts`](../../src/lib/structured-data.ts).

---

## Not shipped — and why

Nothing here is code blocked on more engineering. It's data or copy only a human can provide.

| Item | Needs |
|---|---|
| `FAQPage` | Real, visible Q&A copy on the page — the AUTHOR-tier content brief (direct-answer copy, FAQ questions, stat callouts) flagged separately. |
| `AggregateRating` | Real review counts from Google, Instagram, or on-site — never estimated ones. |
| `sameAs` | Currently Instagram only. Add Google Business Profile, TripAdvisor, and Facebook URLs once those profiles exist. |
| Search Console verification | Needs the GSC/Bing Webmaster account owner's verification code — can't be generated, only issued. |

---

## Sources checked directly

- [Google Search Central — LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business) — required/recommended fields, subtype guidance
- [Google Search Central — FAQPage](https://developers.google.com/search/docs/appearance/structured-data/faqpage) — June 2026 changelog confirming removal
- [Google Search Central — structured data general guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) — relevance/spam policy
- [schema.org/SelfStorage](https://schema.org/SelfStorage) — type hierarchy and definition
- [schema.org/Service](https://schema.org/Service) — serviceType, provider, hasOfferCatalog
- Live JSON-LD pulled via `curl` from Bounce, Radical Storage, and Nannybag production pages, August 9 2026
