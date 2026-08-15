# GEO/AEO strategic flow — validated against research + Stow's actual state

**Trigger:** owner shared a Vietnamese SEO/GEO practitioner's framework (workflow: Technical SEO → Content Strategy → Topical Map → Semantic SEO → Entity Building → Schema → Internal Link/Knowledge Graph → GEO → AI Citation & Visibility) and asked for it to be validated against research and turned into a complete implementable flow for Stow specifically.

**Method:** the shared framework was checked against 4 research passes (GEO best practices, Google AI Overview citation factors, llms.txt adoption reality, AI-visibility tracking tooling — sources at the bottom) — not accepted at face value. It was written from an e-commerce (laptop retailer) angle; every step below is re-derived for what actually applies to a single-location, single-service local business. Then every stage is checked against Stow's real code/docs, not assumed.

---

## Part 1 — Is the framework right?

**Core thesis holds up:** SEO and GEO overlap heavily. Google's own AI Overview pipeline is RAG-based and pulls from the same crawl/index Google Search already builds — a page that's uncrawlable or unindexed is invisible to it. Confirmed: "the five pillars [of AI Overview citation] are topical authority, E-E-A-T, content comprehensiveness, structured and scannable formatting, and technical crawlability" ([Wellows](https://wellows.com/blog/google-ai-overviews-ranking-factors/)) — same five things good SEO already optimizes for. The framework's ordering (technical foundation → topical/entity structure → schema → content → off-site reputation) is sound and matches what Stow's own prior work independently arrived at.

**Three corrections/additions from research, not in the original framework:**

1. **You don't need to rank #1 to be cited.** Google's AI Overview uses query fan-out (breaking one query into sub-queries) and pulls passages from positions 4–20 based on passage quality and trust signals, not just top rank ([Digital Applied](https://www.digitalapplied.com/blog/ai-search-citation-ranking-factors-2026-data-study)). This matters for a 2-month-old site with no ranking history yet — the FAQ/schema work already shipped has a real shot at citation even before Stow ranks #1 for anything.
2. **Off-site reputation outweighs on-site polish more than the framework implies.** "Brand web mentions correlate roughly 3x more strongly with AI visibility than backlinks" ([same source]), and GEO is described as "primarily a third-party game (your reputation across the ecosystem)" vs. SEO's first-party game ([SEOtuners](https://seotuners.com/blog/generative-engine-optimization/generative-engine-optimization-best-practices/)). This directly reprioritizes Stow's roadmap — see Part 3.
3. **llms.txt (mentioned in the shared post as one of the "final-layer" GEO tactics) is not worth building.** The post itself already treated it as secondary — research confirms that instinct was correct and goes further: "no major AI company, including OpenAI, Google, Anthropic, Meta, or Mistral, has publicly committed to reading or acting on llms.txt" and Google's John Mueller compared it to the discredited keywords meta tag; "8 out of 9 sites saw no measurable change in traffic after implementation" ([CodersEra](https://codersera.com/blog/llms-txt-complete-guide-2026/)). Stow's `robots.ts` AI-bot allow-listing is the mechanism that actually works today — do not add an llms.txt file.

**One real trade-off worth naming, not hiding:** statistics-with-sources and expert quotes measurably boost citation rate (+25.9% and +27.8% respectively — [SEOtuners]), but Stow deliberately ships zero fabricated stats (2-month-old business, zero reviews) per its own established rule. That's the right call ethically and for long-term trust, but it means Stow is knowingly leaving a real citation-boost lever unused until it has genuine numbers (first N customers, real review count) to cite. Worth revisiting once that data exists — not before.

---

## Part 2 — The flow, adapted for a single-location local service (not e-commerce)

The original framework's Topical Map step (Dell → Latitude/Precision/XPS → RAM/SSD/drivers → …) is built for a retailer with hundreds of SKUs needing deep, wide topic coverage. Stow is one location selling one service in five pricing tiers — the equivalent structure is **narrow and deep, not wide**: fewer pages, denser answers per page. This is exactly the call the topical-map research already made for Stow (`ρ = 0.194` correlation between page count and citations — near zero) and the owner just reaffirmed keeping that discipline on 2026-08-15. The stages below are the same conceptual steps, resized to that reality.

| # | Stage | What it means for Stow | Status |
|---|---|---|---|
| 1 | **Technical SEO** | Crawlable, indexed, fast, explicit AI-bot access | ✅ Done — `robots.ts` (10 named AI bots incl. GPTBot/ClaudeBot/PerplexityBot), `sitemap.ts`, canonical `www.stowdanang.com` |
| 2 | **Topical Map** | Not 10 new pages — 5 dense clusters mapped onto the existing homepage sections | ✅ Done — `docs/aeo-seo/2026-08-09-entity-topical-keyword-map.md`: airport/short-stay, visa-run/expat, pricing, trust & safety, Marble Mountains/location |
| 3 | **Semantic SEO** (answer the follow-up questions, not just the head keyword) | Direct-answer FAQ entries per cluster, ≤60-word leading answers | ✅ Mostly done — 12 FAQ Q&As live (`faq.ts`, en+ko) covering the clusters in #2; the 3 proposed direct-answer *section intros* (HowItWorks/PricingSection/TrustSafety) shipped in spirit but not verbatim — worth a copy pass to tighten `PricingSection`'s intro and add a photo-receipt/CCTV opening line to the homepage `TrustSafety.tsx` (currently that fact lives only in the FAQ and the dedicated page, not the homepage card itself) |
| 4 | **Entity Building** | Every real-world identity of "Stow" connected and consistent (NAP, sameAs) | 🟡 Partial — GBP live and wired into `sameAs` (biggest single entity signal secured); Instagram live but bio still links to a dead old URL; **Facebook Page and Zalo OA still don't exist** — the single biggest entity gap left |
| 5 | **Schema** | Structured data an LLM/crawler can parse without inference | 🟡 Partial-but-solid — `LocalBusiness` + `Service` + 5-tier `OfferCatalog` + `BreadcrumbList` + `FAQPage`, deliberately *not* using e-commerce types (`Product`/`AggregateRating`/`Review`) that don't fit a service business yet — correctly withheld until real review data exists, not a gap |
| 6 | **Internal Link / Knowledge Graph** | Content cross-references itself so crawlers see one connected entity, not isolated pages | 🔴 **Not addressed by any prior doc — genuinely new finding.** Right now internal linking is thin: one FAQ answer links to `/trust-safety`, and that's essentially it. The dedicated `/trust-safety` page doesn't link back to the relevant FAQ questions or pricing. No page links to the location/Maps section by anchor text. This is cheap to fix — see Part 3 |
| 7 | **GEO / off-site reputation** | Brand mentions and citations *outside* stowdanang.com — proven to outweigh backlinks 3x for AI visibility | 🔴 Biggest lever, least built. Facebook, Zalo, Apple Business Connect, TripAdvisor, marketplace listings all still missing; Bing Places live but has 3 known data errors pending a dashboard fix |
| 8 | **AI Citation & Visibility (KPIs)** | Actually measuring whether any of this works | 🔴 **Not tracked at all.** No GSC (blocked on owner's account), no AI-visibility tool of any kind. Stow is flying blind on whether the schema/FAQ work is being cited anywhere |

---

## Part 3 — Prioritized roadmap (ranked by research-backed leverage, not by what's easiest)

*Superseded by Part 4's findings below in several places — Part 3 is kept as the original pass, corrections are called out inline.*

**Tier 1 — off-site entity signals (highest leverage per the 3x brand-mention finding, currently the biggest gap, blocked on the owner's accounts/identity, not on code):**
1. Create Facebook Page, Zalo OA (both P1 in the local-SEO audit, both zero-cost, both fast)
2. Fix Instagram bio (dead URL → stowdanang.com)
3. Fix the 3 known Bing Places errors (wrong hours, wrong category, missing district)
4. Apple Business Connect, TripAdvisor (P2, still cheap)

**Tier 2 — internal linking pass (cheap, code-only, no owner dependency, currently a real gap):**
- Add reciprocal links: `/trust-safety` page → the relevant FAQ entries and back; `PricingSection` → the pricing FAQ cluster; `LocationSection` → the Marble Mountains FAQ entry. All content already exists — this is wiring, not new copy, so it doesn't need the AUTHOR-tier sign-off gate.

**Tier 3 — close the remaining semantic-SEO gap:**
- Tighten `PricingSection`'s intro toward the original direct-answer draft; add a one-line photo-receipt/CCTV opener to the homepage `TrustSafety.tsx` card (currently only in FAQ/dedicated page). Small, AUTHOR-tier — needs a one-line approval, same as the 2026-08-15 FAQ additions.
- **Correction from Part 4:** don't expand this tier further than the above. Real data (Semrush/Datos study) shows informational-intent queries are AI Overviews' most-targeted category — Stow's FAQ is already appropriately sized for a small transactional local business; deepening it further chases a category Stow doesn't actually compete in (Shopping/local-service queries show the *lowest* AIO growth of any vertical).

**Tier 4 — start measuring (currently zero visibility into whether any of this works):**
- ~~Adopt a low-cost AI-visibility tracker~~ — **superseded, see Part 4:** start with the free manual method first; a paid tool is not the right first move here.
- Get Google Search Console verified (needs the owner's Google account) — **escalated in Part 4 from "follow-up item" to genuinely urgent**, since Google's own docs confirm GSC has a dedicated Generative-AI/AI-features performance report that's the only real window into this.

**Deliberately still deferred (correct to defer, not forgotten):**
- `AggregateRating`/`Review` schema — needs real review count from the GBP dashboard, never fabricate
- Korean/Chinese GBP description — needs native-speaker review before publishing
- Tet-holiday seasonal FAQ — timing-dependent, revisit closer to the date
- New dedicated landing pages per keyword cluster — owner explicitly declined this 2026-08-15, staying with the dense-existing-pages approach

---

## Part 4 — Deep research pass, 2026-08-15: primary sources + real video content, not search snippets

Part 1's research was WebSearch snippet summaries — fast, but shallow, and (as it turned out) largely drawn from a batch of generic 2026 SEO-agency blog posts that read like content-farm output. The owner asked for genuinely deep research instead: real videos watched in full via the `/watch-video` skill (full transcript + on-screen data extraction, not title-guessing), and full primary-source pages read via Playwright/WebFetch instead of trusting a search snippet. Five sources were dispatched in parallel; each was told to assess its own credibility honestly rather than pad a report. **Full transcripts, video files, and extracted frames are saved locally** under `~/Documents/videos/youtube-*-2026-08-15/` for spot-checking any figure below.

### Source credibility — weight these very differently

| Source | Type | Credibility |
|---|---|---|
| [Google Search Central — AI features](https://developers.google.com/search/docs/appearance/ai-features) + linked docs | Primary, official | **Highest** — Google's own stated position |
| Semrush/Datos 10M-keyword study (watched via Edward Sturm's reaction video, real charts verified on-screen) | Real third-party data, reacted-to not produced by a neutral party | **High** — the data is authentic (confirmed via visible chart frames), even though the commentary layer is one podcaster's take |
| Nathan Gotch "Local SEO & AI Search Masterclass" | Real practitioner, live tool demo, 13 years running local SEO campaigns | **High** — every claim anchored to an on-screen dashboard, not just talk |
| "Mastering GEO in 2026" (Search Engine Land) | **Turned out to be sponsored/native content** — disclosed as "opinions of the sponsor," byline is a SaaS company (Tor.app), functions as a funnel to a GEO-tracking product (Geoptie) | **Low** — treat as advertorial; only kept the tactics that are cheap/sound independent of the source's bias |
| "Most AI SEO Fails" (Vasco's SEO Tips) | Presenter is a real person but the video is ~60% product demo for his own SaaS (Arvow); the 3 "case studies" are anonymized customer testimonials, two of them trivially small (57 and 44 monthly visits) | **Low** — useful as a calibration example for discounting inflated "AI SEO growth" claims, not as a source of new tactics |

### Findings that actually change the plan

**1. Google's own docs directly settle a debated point: no special AI markup exists, period.** Verbatim: *"There's also no special schema.org structured data that you need to add"* and *"Structured data isn't required for generative AI search."* AI-Overview/AI-Mode eligibility is just: page is indexed and eligible to show a normal Search snippet — nothing more. This confirms Stow's existing LocalBusiness/Service/OfferCatalog/FAQPage schema is fine as-is and not a bottleneck; it also means **the SEL advertorial's "add Article/HowTo schema" pitch is unnecessary**, and its "BreadcrumbList is missing" claim was simply wrong — checked the live code, `breadcrumbJsonLd` is already wired into all 3 sub-pages (`privacy-policy`, `terms-of-service`, `trust-safety`).

**2. GSC verification is more urgent than previously stated.** Google's docs confirm Search Console has a dedicated **Generative AI / AI features performance report** — the only real, first-party visibility into whether Stow is appearing in AI Overviews at all. This has been sitting as a "follow-up item" since 2026-08-09; it should move to an active ask for the owner's Google account access, not stay a background note.

**3. The Semrush/Datos data tempers how much to invest in AI-citation-chasing for a business like Stow's.** Two real findings: zero-click rate among AI-Overview-triggering keywords is **not rising** (it declined slightly Jan→Mar 2025) — the "AI is eating all your traffic" narrative is overstated; and **Shopping and Real Estate — the categories closest to a transactional local service — show the lowest AI Overview growth of any vertical measured**, while informational categories (Science, Health, Law) dominate AIO growth. A quoted expert frames AI Overviews for local queries as "a less visual local pack": people still want photos, reviews, directions — meaning broad off-site presence, not deeper FAQ content, is the actual lever for Stow's query types. This reinforces (with real data, not just the "3x brand mentions" stat from Part 1) that Tier 1 (Facebook, Zalo, directories) is correctly the top priority, and argues against expanding the FAQ/schema investment further.

**4. AI-citation measurement has a free, immediate starting point — skip the paid tool for now.** Nathan Gotch's masterclass shows a concrete, zero-cost method: manually prompt ChatGPT, Gemini, Perplexity, Claude, and Grok on a schedule with realistic queries ("luggage storage Da Nang," "where to store bags near Marble Mountains," etc.) and log which sources get cited. This is a better first move than adopting Otterly.ai — start manual, only pay for a tracking tool once there's a real cadence of content/citations worth automating.

**5. AI citation-building should be concentrated, not distributed.** Gotch's core reframe: AI platforms cite a small number (4–7) of sources per niche/location, not a long tail of directories. This changes *how* to think about the existing Facebook/Zalo/TripAdvisor/marketplace gap — it's not "get listed everywhere," it's "find out via the manual prompting method in #4 which 4–7 sources actually get cited for 'luggage storage Da Nang' queries, and concentrate effort on winning those specifically" (which may include sources not yet on Stow's radar — e.g. a Da Nang travel blog or expat forum thread, not just directories).

**6. Backlinks are a genuinely missing classic-SEO pillar — not addressed in any prior Stow doc.** Even discounting the vendor-bias in the "Most AI SEO Fails" video, this specific gap is real: nothing in Stow's AEO/SEO work to date has addressed earning backlinks/mentions from external sites. The Tier 3 (Facebook group for Da Nang expats), already flagged in the citation tracker as a community to engage with, is a natural first target — a genuine mention/link from an expat forum thread or a Da Nang travel blog serves both the backlink gap and the off-site brand-mention lever from finding #3.

**7. Two small, concrete audit items surfaced from the Gotch video, cheap to run now:**
- Check GBP's "preferred location" setting for drift (his example found a business's preferred location set to a neighboring city — an easy miss that costs local-pack rank).
- Audit Stow's page titles for keyword+zip/city stacking (e.g. avoid patterns like "Luggage Storage Da Nang | Da Nang Storage | Storage in Da Nang") — his claim is LLMs already infer location equivalence, so this pattern now reads as spammy rather than helpful, a reversal of old local-SEO convention.

### Updated priority order (supersedes Part 3's tier list)

1. **Escalate GSC verification** with the owner — now justified by Google's own documented AI-features report, not just generally "useful"
2. **Start free manual AI-citation tracking today** — no tool purchase, no code change, immediate signal
3. **Off-site entity work (Facebook, Zalo, Instagram bio, Bing Places fixes)** — unchanged as top-priority, now reinforced by three independent sources (brand-mentions stat, Semrush local-pack framing, Gotch's citation-concentration model) instead of one
4. **Run the citation-concentration exercise** — once manual tracking (#2) surfaces which sources actually get cited for Stow's queries, prioritize those specifically over generic directory sign-ups
5. **New: pursue a small number of real backlinks/mentions** — starting with the Da Nang expats Facebook group already on the citation tracker, and any Da Nang travel-blog outreach — genuinely new gap, not previously tracked
6. Internal linking pass, GBP preferred-location check, title-tag audit — cheap, code/dashboard-only, no blocker
7. Tier 3 semantic-SEO tightening from Part 3 — kept, but explicitly capped, not expanded

---

## Part 5 — Real GSC data, 2026-08-15: confirms the diagnosis, not just theory

GSC turned out to be already verified (`stowdanang.com` property exists, data current as of ~5 hours before this check) — the "blocked on owner access" status from Parts 1–4 was itself stale, corrected the moment the owner actually opened the dashboard. Screenshots captured by the owner (no direct GSC access exists for this session — screenshot-sharing is the correct and only way to get this data in, not a workaround).

**3-month site-wide totals (Web search only):** 4 clicks, 140 impressions, 2.9% average CTR, **~11.6 average position**.

**Top query:** "luggage storage da nang" — 28 impressions (by far the largest of any query), **0 clicks**.

**What this confirms, first-party, not inferred:** an average position of ~11.6 means Stow is landing at the bottom of page 1 / top of page 2 on average — which fully explains the 28-impression/0-click head-term result on its own; page-2 positions get almost no clicks regardless of content quality. This directly corroborates Part 4's finding #3 (Semrush data: transactional/local queries need off-site authority more than deeper on-site content) with real first-party numbers instead of third-party research: **the bottleneck right now is ranking position, not content or schema** — and ranking position for a 2-month-old single-location site is moved by off-site authority signals (backlinks, citations, GBP strength), not further on-page work. This raises Tier 1 (Facebook, Zalo, Bing Places fixes, backlinks) from "research-backed priority" to "confirmed-by-live-data priority."

**Also observed:** small impression spillover on adjacent-but-wrong-location queries ("luggage storage hoi an," "ba na hills luggage storage") — low volume, not concerning yet, but worth re-checking once there's more data to see if it's noise or a real (mis)targeting signal.

**Not yet available:** the dedicated AI Overview/AI-features "Search appearance" filter Google announced June 3, 2026 doesn't appear in this property's filter list yet (checked directly — only Query/Page/Country/Device filters are offered). Likely still rolling out to smaller/newer properties. Not a blocker; re-check periodically, no action needed now.

---

## Sources checked

**Part 1 (WebSearch snippets):**
- [SEOtuners — GEO Best Practices 2026](https://seotuners.com/blog/generative-engine-optimization/generative-engine-optimization-best-practices/)
- [Digital Applied — AI Search Citation Ranking Factors 2026](https://www.digitalapplied.com/blog/ai-search-citation-ranking-factors-2026-data-study)
- [Wellows — Google AI Overviews Ranking Factors 2026](https://wellows.com/blog/google-ai-overviews-ranking-factors/)
- [CodersEra — llms.txt Explained (2026)](https://codersera.com/blog/llms-txt-complete-guide-2026/)
- [OrganiKPI — llms.txt Adoption Data 2026](https://organikpi.com/blog/distribution/llms-txt-adoption-impact/)
- [AirOps — Tracking LLM Brand Citations 2026](https://www.airops.com/blog/llm-brand-citation-tracking)

**Part 4 (deep research — full videos watched via `/watch-video`, full pages read via Playwright/WebFetch):**
- [Google Search Central — AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) (primary/official)
- Edward Sturm — reaction/read-through of the Semrush + Datos 10M-keyword AI Overview study (YouTube, `watch?v=3WWGc8qdunM`) — transcript + chart frames saved locally
- Nathan Gotch — "Local SEO & AI Search Masterclass for 2026" (YouTube, `watch?v=53h_-LoEGiw`) — transcript + dashboard frames saved locally
- "Mastering generative engine optimization in 2026" (Search Engine Land, sponsored content by Tor.app) — full page read, credibility discounted per above
- Vasco's SEO Tips — "Most AI SEO Fails" (YouTube, `watch?v=D4Gfzp-iH44`) — transcript + dashboard frames saved locally, credibility discounted per above
