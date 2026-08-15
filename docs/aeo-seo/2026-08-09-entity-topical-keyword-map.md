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

---

## Expanded keyword brainstorm (2026-08-09, follow-up pass)

Requested by the owner: push past the 3 original clusters toward comprehensive coverage — every real way someone searches for "store my stuff in Da Nang," across both classic search and AI answer engines. Same rule as before: this is intent-clustering, not volume data (still no GSC/Ahrefs access — see the follow-up item at the top of this doc). Grouped by what's *actually different* about the searcher's intent, since that's what determines where each phrase should live, not just word-swapping the head term.

### Trust / quality modifiers
The pattern the owner specifically flagged ("trustworthy luggage storage") is its own cluster — these are bottom-of-funnel, high-intent searches from someone who's already decided *what* they need and is now vetting safety before handing over a bag with their passport in it. This maps directly to the existing `trust-safety` page and `TrustSafety` component — don't invent new content, make sure that page's copy contains these exact phrases in plain sentences (it currently proves trust through specifics — photo receipts, CCTV, unique tags — without ever using the word "trustworthy" itself, which is the actual gap):
- trustworthy luggage storage Da Nang
- safe luggage storage Da Nang
- secure bag storage Da Nang
- is it safe to store luggage in Da Nang
- luggage storage with CCTV Da Nang
- reputable left luggage service Da Nang
- verified luggage storage Da Nang

### Location / landmark variants
Beyond the existing Marble Mountains connection — every real point of reference someone near 55 Bà Bang Nhãn would search from:
- luggage storage near Ngũ Hành Sơn
- luggage storage near Marble Mountains
- bag storage near My Khe Beach
- luggage storage Da Nang airport to Hoi An
- storage between Da Nang and Hoi An day trip
- luggage storage near Non Nuoc Beach
- left luggage Da Nang city center vs Ngu Hanh Son *(comparison-shaped — see below)*

### Item-type variants
Google and LLMs both match on the *object*, not just the service category — "bag" ≠ "suitcase" ≠ "backpack" in a literal-match sense even though they mean the same thing here:
- suitcase storage Da Nang
- backpack storage Da Nang
- where to store a bike Da Nang *(real — oversized-item surcharge already covers bicycles)*
- surfboard storage Da Nang
- stroller storage Da Nang
- where to leave a laptop bag safely Da Nang
- oversized luggage storage Da Nang

### Persona / duration-intent variants
Sharpening the two existing persona clusters into the exact phrase-shapes each group actually types:
- luggage storage for a few hours Da Nang *(tourist, Lane 1)*
- day trip bag storage Da Nang
- luggage storage between flights Da Nang
- weekly luggage storage Da Nang *(expat, Lane 2 — "Mini")*
- monthly bag storage Da Nang for expats
- storage while on a visa run Vietnam
- long term luggage storage for digital nomads Da Nang
- where do digital nomads store luggage in Da Nang

### Question-shaped / AEO conversational queries
This is the cluster that matters most for *AI* answer engines specifically — ChatGPT/Perplexity/AI Overviews resolve a direct question to a direct-answer sentence, not a keyword match. Each of these needs a literal question-as-H2 or FAQ entry with a one-sentence answer immediately after it (ties to the AUTHOR-tier content brief, `2026-08-09-author-content-brief.md` — direct-answer format is the whole point of that doc):
- Where can I store my luggage in Da Nang?
- How much does luggage storage cost in Da Nang?
- Is there luggage storage near the Marble Mountains?
- Can I store my bag for just a few hours in Da Nang?
- What's the best luggage storage option for a Da Nang visa run?
- Do I need to book luggage storage in Da Nang in advance?
- What happens if I pick up my bag late in Da Nang?

### Comparison / evaluative queries
Someone choosing between options — this is where Stow's actual differentiators (real address + staffed check-in vs. marketplace host-network model) become the answer, not a weakness to hide:
- Stow vs Stasher Da Nang
- best luggage storage Da Nang reviews
- cheapest luggage storage Da Nang
- luggage storage Da Nang vs hotel storage
- luggage storage locker vs staffed storage Da Nang

### Price-intent queries
Directly answerable with the live `PricingSection` data — verify current numbers there before ever writing a price into new copy (pricing has changed once already this project; Mini/Strand/Long Stay at 150k/300k/1,000,000₫ as of 2026-08-08):
- luggage storage Da Nang price
- luggage storage Da Nang cost per day
- cheap bag storage Da Nang
- luggage storage Da Nang per hour rate

### Vietnamese-language expansion
Original doc had 3 — domestic travelers and Zalo/Facebook audiences search in Vietnamese, and this is also the primary language local directories/aggregators index in:
- gửi hành lý Đà Nẵng *(store luggage Da Nang)*
- ký gửi hành lý Đà Nẵng
- giữ hành lý Đà Nẵng
- gửi đồ Đà Nẵng *(store belongings/stuff — broader than just luggage)*
- kho gửi hành lý gần Ngũ Hành Sơn *(luggage storage near Ngu Hanh Son)*
- dịch vụ giữ hành lý uy tín Đà Nẵng *(trustworthy luggage-holding service — the Vietnamese-language version of the trust cluster above)*
- gửi hành lý theo giờ Đà Nẵng *(hourly luggage storage)*
- gửi hành lý dài hạn Đà Nẵng *(long-term luggage storage)*

### Synonym / naming variants
Cheap coverage — same intent, different literal string. Google normalizes most of these automatically now, but AI answer engines historically match more literally, so a few natural mentions across the site (not stuffed) still help:
- baggage storage Da Nang *(vs. "luggage")*
- Danang vs Da Nang vs Đà Nẵng *(schema already covers this — `addressRegion: "Đà Nẵng"` plus "Da Nang" throughout copy)*
- bag drop Da Nang
- left luggage service Da Nang

---

### The honest strategy note — where these actually belong

Every phrase above needs a home, and **the Instagram bio is the wrong home for almost all of them.** A few reasons, worth being direct about before implementing anything:

1. **Instagram doesn't do keyword-match ranking on bio text the way Google does on a webpage.** A stuffed bio ("Luggage Storage Da Nang | Bag Storage Da Nang | Trustworthy Storage Da Nang...") reads as spam to a human visitor and doesn't move Instagram's own discovery algorithm, which weights hashtags/captions/engagement far more than bio text. It *does* get read by AI answer engines as an entity description — so 1–2 real phrases matter, dozens don't.
2. **The kit's own Golden Rule 3** (flagged in the local SEO audit) applies to Instagram the same way it applies to GBP: a keyword-stuffed *name* or bio reads as spam and risks worse trust signals, not better ranking. "More keywords crammed in" is not the lever — **genuine entity + citation + content signals are** (the whole body of work already shipped: schema, GBP, the audit).
3. **Where the real ranking weight actually sits**, per phrase-cluster above:

| Cluster | Real home | Status |
|---|---|---|
| Trust/quality modifiers | `trust-safety` page copy | Needs the exact phrases added to existing content — tracked in the AUTHOR-tier content brief |
| Location/landmark | `LocationSection` + a location FAQ entry | Marble Mountains connection already flagged as underused in this doc |
| Item-type | `TrustSafety` accept-list copy (already lists most items — needs the search phrases, not new facts) | Minor copy pass |
| Persona/duration | `PricingSection` intro + `ForExpats` (built, not on page yet per codebase-state memory) | Partially blocked on shipping `ForExpats` |
| Question-shaped (AEO) | New FAQ entries, direct-answer format | This is the entire point of the AUTHOR-tier content brief — proposal only, needs sign-off |
| Comparison | Could be a single FAQ entry ("What makes Stow different from app-based storage marketplaces?") — real differentiator, not spin | Not yet drafted |
| Price-intent | Already answered by `PricingSection` — mostly needs the FAQ phrasing layered on top | Minor |
| Vietnamese | Zalo OA (once created) + Facebook Page, not the English-first website | Blocked on Zalo/Facebook creation |

**Instagram's actual job here:** bio + 1–2 pinned/recent posts with real keyword-bearing captions (Instagram *does* index caption text for search), not the 150-character bio field.

### Recommended Instagram bio (keeps brand voice, adds the two highest-value real phrases)

```
STOW | Safe Luggage Storage in Da Nang 🧳
Near Ngũ Hành Sơn (Marble Mountains) · Store • Explore • Pick Up
📍 Da Nang, Vietnam · ⏰ 7am–10pm daily
🔒 Secure Storage ⚡ Friendly Local Support
```

Two real search phrases woven in as plain sentences ("Safe Luggage Storage in Da Nang", "Near Ngũ Hành Sơn (Marble Mountains)") — matches the humanizer voice rules (short, concrete, no corporate keyword-soup), and picks the two clusters with the best ROI: the core head term, and the underused Marble Mountains entity link this doc already flagged as a gap.

---

## Second follow-up pass (2026-08-09) — verified copy gaps + the Korean/Chinese blind spot

Requested by the owner: audit whether the target phrases actually made it into live copy yet (not just this doc), and go broader — the biggest source markets weren't covered at all.

### What's actually shipped vs. still just planned

Checked by grepping the real component files, not assuming from this doc:

| Target phrase | Status | Where |
|---|---|---|
| "luggage storage in Da Nang" | **Thin** — 1 occurrence, in the Footer tagline; not in any heading | `Footer.tsx` |
| "bag storage" | **Was missing entirely** — fixed today | `Footer.tsx` now reads "luggage and bag storage" |
| "trustworthy" | **Was missing entirely** — fixed today | FAQ question reworded to "Is Stow a trustworthy, safe place to store luggage in Da Nang?" (`faq-data.ts`) |
| "Ngũ Hành Sơn" / Marble Mountains | **Present** | `LocationSection.tsx`, `HeroSplit.tsx`, `HowItWorks.tsx`, plus a dedicated FAQ entry |

**The honest takeaway:** the entity/topical/keyword research has been ahead of the actual copy all day — this doc correctly identified "trustworthy" as a gap in the first follow-up pass and it stayed unfixed until this second pass. Research alone doesn't move rankings; only what's actually rendered does. Re-audit this table any time new copy ships.

### The blind spot: Korean and Chinese searchers

Every cluster so far assumed English or Vietnamese searchers. That's wrong for Da Nang specifically — [South Korea and China are Vietnam's two largest inbound tourism source markets in 2026](https://www.travelandtourworld.com/news/article/f14ux4y9903u/) (nearly 490,000 South Korean arrivals in January alone; China retook the #1 spot with 482,000 in March), and [Da Nang is repeatedly named as one of the top coastal destinations Korean travelers choose specifically](https://danangfantasticity.com/en/vietnam-tourism-trends-2026-da-nang-shaping-its-position-amid-shifting-international-travel-flows), alongside Nha Trang and Phu Quoc. A meaningful share of Stow's actual tourist foot traffic is very likely searching in Korean or Chinese, not English — a gap this big shouldn't stay unaddressed just because it's outside the two languages already covered.

**Confidence caveat, stated plainly:** the phrases below are directionally correct (common travel-service phrasing, and 五行山 is the actual Chinese name matching Ngũ Hành Sơn's meaning) but this is not native-level fluency in either language. **Do not publish any of this anywhere — GBP, social captions, signage — without a native speaker or professional translator reviewing it first.** The stakes are real: wrong phrasing under the Stow name is more visible and more damaging with these audiences specifically than a typo in English would be.

**Korean (한국어) — tourist-intent, not visa-run (Korean visitors to Vietnam are overwhelmingly short-stay tourists, not long-term expats):**
- 다낭 짐 보관 *(Da Nang luggage storage — the head term)*
- 다낭 캐리어 보관 *(Da Nang suitcase storage)*
- 다낭 공항 짐 보관 *(Da Nang airport luggage storage)*
- 다낭 마블마운틴 근처 짐 보관 *(luggage storage near Marble Mountains)*
- 다낭 짐 보관소 *(Da Nang luggage-storage place/facility)*

**Chinese, Simplified (简体中文) — mainland tourist-intent:**
- 岘港行李寄存 *(Da Nang luggage storage — the head term)*
- 岘港寄存行李的地方 *(a place to store luggage in Da Nang)*
- 岘港机场行李寄存 *(Da Nang airport luggage storage)*
- 岘港五行山附近行李寄存 *(luggage storage near Ngũ Hành Sơn/Marble Mountains — 五行山 is the real Chinese name, same "five element mountains" meaning as the Vietnamese)*
- 岘港美溪海滩寄存行李 *(luggage storage near My Khe Beach)*

**Where this actually belongs — not the English website.** Language-mixing an English site with Korean/Chinese phrases would read as broken, not helpful. The real channels, in priority order: (1) Google Business Profile — Google auto-translates the description, but exact-phrase content in the visitor's own language still outperforms machine translation for AI answer engines and local-pack relevance; (2) occasional Korean/Chinese captions on Instagram/Facebook posts, given the tourist volume; (3) a translated one-page flyer for the physical storefront (a trust/conversion signal more than an SEO one, but real). This is a bigger call than a code change — it needs either a native-speaking team member or a small translation budget, not something to scaffold unilaterally. Flagging it as a decision for the owner, not shipping placeholder translations.

### A few more English-language gaps worth closing

- **Landmark pairings — SHIPPED 2026-08-15:** Dragon Bridge added alongside the existing My Khe Beach / Han Market / Marble Mountains mentions in `how-it-works.ts` (en + ko).
- **Group/multi-item intent — SHIPPED 2026-08-15:** new FAQ entry ("Can I store multiple bags or luggage for my whole family at Stow?") in `faq.ts` (en + ko), answered with the real per-bag pricing fact.
- **Seasonal:** Tet holiday luggage storage Da Nang — still open, deliberately deferred until closer to the date (not evergreen copy).
- **Direct booking-intent:** already covered — the "Book Online" step title in `HowItWorks` states this directly; no further action needed.

---

## Sources checked

- [Locafy — Entity SEO for Local Businesses](https://locafy.com/blog/entity-seo-local-businesses) — Knowledge Graph query share, entity-connection mechanics
- [Digital Applied — Entity SEO & Knowledge Graph Optimization Guide 2026](https://www.digitalapplied.com/blog/entity-seo-knowledge-graph-optimization-guide-2026) — entity build sequence
- [Digital Applied — SEO Content Clusters 2026](https://www.digitalapplied.com/blog/seo-content-clusters-2026-topic-authority-guide) — pillar-cluster architecture, March 2026 Core Update context
- [TopicalMap.ai — Topical Map Strategy for Local SEO Service Pages](https://topicalmap.ai/blog/auto/topical-map-strategy-for-local-seo-service-pages)
- [Nice Digitals — Entity SEO: The Foundation of AI Search Rankings in 2026](https://www.nicedigitals.com/entity-seo-the-foundation-of-ai-search-rankings-in-2026/) — how ChatGPT/Perplexity resolve entities before keywords
- Da Nang expat/digital-nomad context cross-checked against [Emerhub](https://emerhub.com/vietnam/living-in-da-nang-as-a-digital-nomad/) and [The Digital Nomad Asia](https://www.thedigitalnomad.asia/inspiration/digital-nomads/vietnam-digital-nomad-visa/) for accurate visa/persona terminology (E-Visa, TRC, business visa — not inventing a "digital nomad visa" that doesn't exist in Vietnam)
