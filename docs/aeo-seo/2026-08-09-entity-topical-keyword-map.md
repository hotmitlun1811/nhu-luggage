# Entity Map, Topical Map & Keyword Strategy — Stow

**Scope:** stowdanang.com — the strategic layer underneath the on-site schema ([`2026-08-09-structured-data-research.md`](2026-08-09-structured-data-research.md)) and off-site presence ([`2026-08-09-local-seo-audit.md`](2026-08-09-local-seo-audit.md)) work.
**Date:** August 9, 2026
**Grounding:** entity-SEO and topical-authority research checked against current sources (below); the keyword list itself is qualitative intent-clustering, not volume data — Stow has no GSC/Ahrefs access yet, so no search-volume numbers are claimed here that we can't back up. Once Search Console is live (still a follow-up item), replace the qualitative ranking below with real query data.

---

## Why this layer matters (the short version)

Both Google and the AI answer engines have moved from "rank documents for strings" to "recognize entities and route between them." Two 2026 changes made this concrete: over 82% of local queries now resolve through Google's Knowledge Graph before a web result renders at all, and AI answer engines identify entities by type and category *before* they parse keywords. A site can have perfect on-page schema (which Stow now does) and still be invisible if it isn't **connected** to the right entities, or if its content is scattered across topics instead of clustered around what it actually is.

Two moves fix that:
1. **Entity map** — who/what Stow is connected to, so Google and AI engines resolve "Stow" unambiguously.
2. **Topical map** — how content clusters around Stow's actual expertise, so authority compounds instead of scattering.

---

## Entity map

Stow, as an entity, is one hop away from a small, specific set of other entities. The job is making every one of these connections explicit and consistent — not inventing new ones.

```
                         ┌─────────────────────┐
                         │   Category entity    │
                         │  "Luggage storage     │
                         │   service"            │
                         └──────────┬───────────┘
                                    │ is-a
┌──────────────┐   near      ┌─────▼──────┐   serves    ┌──────────────────┐
│ Marble        │◄───────────┤    STOW     ├────────────►│ Persona: Tourist  │
│ Mountains /   │            │  (the       │             │ Persona: Expat /  │
│ Ngũ Hành Sơn  │            │   entity)   │             │  visa runner       │
└──────────────┘            └──────┬──────┘             └──────────────────┘
                                    │ located-in
                         ┌──────────▼───────────┐
                         │  Da Nang, Vietnam      │
                         │  (10 min from airport) │
                         └───────────────────────┘

sameAs / verifies-identity:          compared-against (competitive set):
  Google Business Profile (P1 gap)     Easy Storage Da Nang (direct, same district)
  Facebook Page (P1 gap)               Stasher / Nannybag / Radical Storage (marketplaces)
  Instagram @stowdanang (live, broken  WhaleLO (Klook-listed)
    bio link)
  Zalo OA (P1 gap)
  TripAdvisor (P2 gap)
```

**What's already correctly encoded** (from the schema work): `LocalBusiness` entity with NAP + geo, `Service` entity with `serviceType: "Luggage storage"`, `areaServed: Da Nang`. That's the entity's *home* — solid.

**What's missing is the connective tissue** — the `sameAs` edges that let Google merge every mention of "Stow" into one node instead of treating the website, the Instagram account, and a future Google Business Profile as three unverified, disconnected signals. This is exactly what the local-SEO audit found empty. Every profile created there should immediately round-trip into `sameAs` in `structured-data.ts`.

**The Marble Mountains connection is underused.** Ngũ Hành Sơn — the district Stow is literally in — *is* the Marble Mountains (Ngũ Hành Sơn = "Five Element Mountains," the formal Vietnamese name for the Marble Mountains). That's a real, strong, already-true entity relationship (proximity, shared name) that isn't stated as a distinct fact anywhere on-site — the location section links a map but doesn't put "Marble Mountains" in a heading or sentence a crawler can extract as a standalone fact.

---

## Topical map

Pillar-cluster architecture: one comprehensive pillar, clusters link up to it and it links down to them. For a single-location business, the discipline is **not** to spin up ten thin pages chasing this — the kit's own data is explicit that page-count inflation has near-zero correlation with citations (ρ = 0.194) and Google's Scaled Content Abuse policy penalizes it directly. The right move here is fewer, denser content blocks — most of these clusters should live as sections/FAQ entries on the existing pages, not new URLs.

```
                         ┌────────────────────────────┐
                         │   PILLAR                     │
                         │   Luggage Storage in Da Nang  │
                         │   (homepage — exists)         │
                         └───────────┬────────────────┘
              ┌───────────┬──────────┼──────────┬───────────┐
              ▼           ▼          ▼          ▼           ▼
        ┌──────────┐┌───────────┐┌────────┐┌──────────┐┌───────────┐
        │ Airport   ││ Visa-run / ││ Pricing││ Trust &   ││ Marble     │
        │ layover   ││ expat long- ││ compar-││ Safety    ││ Mountains /│
        │ storage   ││ term storage││ ison   ││ (exists)  ││ Ngũ Hành   │
        │ (cluster) ││ (cluster)   ││(cluster)│           ││ Sơn (cluster)│
        └──────────┘└───────────┘└────────┘└──────────┘└───────────┘
```

| Cluster | Maps to persona | Where it should live | Why it's real, not filler |
|---|---|---|---|
| Airport layover / short-stop storage | Tourist | New FAQ entries + a direct-answer sentence in `HeroSplit`/`HowItWorks` | Stow is 10 min from Da Nang Airport — already true, currently unstated as a distinct fact |
| Visa-run / expat long-term storage | Expat, digital nomad — the stated primary revenue driver | Expand `ForExpats` section + FAQ | Directly matches the flat-rate Lane 2 pricing that already exists |
| Pricing comparison (hourly vs. daily vs. flat) | Both | FAQ block on `PricingSection` | Answers the #1 question any two-lane pricing model generates — currently the site shows the table but doesn't answer "which one is for me" in prose |
| Trust & Safety | Both | Already a dedicated page — just needs the AUTHOR-tier direct-answer treatment (see content brief) | Existing content, needs restructuring not creation |
| Marble Mountains / Ngũ Hành Sơn proximity | Tourist (sightseeing intent) | One new FAQ entry + a location-section sentence | Same-name entity relationship already true, currently unstated |

Five clusters, all mapped to content Stow either already has or can extend — not five new pages. This is the "topical density over page count" version of a topical map, matched to a single-location business's real scale.

---

## Keyword map (intent-clustered, not volume-ranked)

No search-volume tool access yet (Ahrefs/GSC) — treat this as an intent map to write toward, not a ranked target list. Once GSC has 28 days of data (a follow-up item from the original audit), replace this with real query data from Search Console.

### Head terms (already the metadata target)
`luggage storage Da Nang` · `bag storage Da Nang` · `left luggage Da Nang`

### Tourist-intent long-tail
- luggage storage near Da Nang airport
- luggage storage near Marble Mountains / Ngũ Hành Sơn
- left luggage Da Nang before flight
- luggage storage Da Nang hourly
- where to store bags Da Nang day trip

### Expat / digital-nomad-intent long-tail
- visa run luggage storage Vietnam
- monthly luggage storage Da Nang
- long term luggage storage Da Nang
- storage for digital nomads Da Nang
- where to store bags during Da Nang visa run

### Vietnamese-language equivalents (relevant via Zalo/Facebook, domestic travelers)
- gửi hành lý Đà Nẵng (store luggage Da Nang)
- ký gửi hành lý Đà Nẵng
- giữ hành lý Đà Nẵng

**How this maps to the topical clusters above:** every long-tail term here already has a home in the cluster table — none of these require a new page, they require the existing sections to say these phrases in plain sentences (matching the kit's #1 ranked signal, word simplicity, and the "question-shaped H2" pattern for the FAQ entries specifically).

---

## Sources checked

- [Locafy — Entity SEO for Local Businesses](https://locafy.com/blog/entity-seo-local-businesses) — Knowledge Graph query share, entity-connection mechanics
- [Digital Applied — Entity SEO & Knowledge Graph Optimization Guide 2026](https://www.digitalapplied.com/blog/entity-seo-knowledge-graph-optimization-guide-2026) — entity build sequence
- [Digital Applied — SEO Content Clusters 2026](https://www.digitalapplied.com/blog/seo-content-clusters-2026-topic-authority-guide) — pillar-cluster architecture, March 2026 Core Update context
- [TopicalMap.ai — Topical Map Strategy for Local SEO Service Pages](https://topicalmap.ai/blog/auto/topical-map-strategy-for-local-seo-service-pages)
- [Nice Digitals — Entity SEO: The Foundation of AI Search Rankings in 2026](https://www.nicedigitals.com/entity-seo-the-foundation-of-ai-search-rankings-in-2026/) — how ChatGPT/Perplexity resolve entities before keywords
- Da Nang expat/digital-nomad context cross-checked against [Emerhub](https://emerhub.com/vietnam/living-in-da-nang-as-a-digital-nomad/) and [The Digital Nomad Asia](https://www.thedigitalnomad.asia/inspiration/digital-nomads/vietnam-digital-nomad-visa/) for accurate visa/persona terminology (E-Visa, TRC, business visa — not inventing a "digital nomad visa" that doesn't exist in Vietnam)
