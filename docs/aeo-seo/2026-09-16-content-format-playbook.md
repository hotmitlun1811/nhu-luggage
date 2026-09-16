# Content Format Playbook — matching format to the surface you want to win

**Date:** 2026-09-16
**Purpose:** The layer the owner asked for: after the entity map and topic clusters, decide the *format* each piece ships in, because format determines which SERP/AEO/GEO surface it can win. Complements, does not replace: the [content engine playbook](2026-08-15-content-engine-playbook.md) (how pages get decided/built/retired), the [entity/topic/keyword map](2026-08-09-entity-topical-keyword-map.md) (what to write about), and the [writing style guide](2026-09-15-writing-style-guide.md) (how the prose reads).

Grounding: free-method research only (no Semrush), 2026 sources listed at the end. This is a plan to review, not shipped work.

---

## The core insight

Google and the AI answer engines reward *different content shapes for different question shapes*. You do not "write an article and hope"; you pick the format that owns the surface the query triggers. The owner is right that "Top X" is one of the best. It is not the only one, and it only works under conditions (below).

Two hard facts from 2026 data:
- Featured snippets split by format: **paragraph ~70%, list ~19%, table ~8%, video ~3%**. Match the format to the query type or you cannot win the snippet.
- AI citations by content type: **listicles ~21.9%, articles ~16.7%, product pages ~13.7%**. Listicles appear on ~55% of Google result pages. For commercial/discovery queries, ~41% of AI citations go to listicles.

So: listicles punch above their weight in AI answers, *but only if they add analysis, not just a list of names* (the "thin content" classifier is the trap, see the integrity section).

---

## The format → surface → intent matrix

| Format | Wins this surface | Query shape it serves | Schema | We already do it? |
|---|---|---|---|---|
| **Direct-answer / definition** (40-60 word paragraph under a question H2) | Paragraph snippet + AI Overview | "what is / how much / is X safe" | FAQPage | Yes — the TLDR + FAQ in every guide |
| **Top X / "Best [thing]"** (ranked list + why-each) | List snippet + AI citation (discovery/commercial) | "best / top / coolest X in Da Nang" | ItemList + FAQPage | No — the new format to add |
| **Comparison "X vs Y"** (table) | Table snippet + AI (decision) | "A or B / A vs B / difference between" | FAQPage | Yes — da-nang-vs-hoi-an |
| **How-to / step-by-step** (numbered list) | List snippet + AI (procedural) | "how to / how do I" | HowTo + FAQPage | Partly — inside guides |
| **Cost / pricing breakdown** (table + exact numbers) | Table snippet + AI (high-intent) | "how much / cost / price / fees" | FAQPage | Yes — ticket/fare tables in guides |
| **Local / "near me"** (NAP, map, hours) | Map pack + local AI | "near me / near [landmark]" | LocalBusiness | Yes — this is where the money pages live |
| **FAQ / Q&A hub** (question H2s) | People Also Ask + AI extraction | long-tail questions | FAQPage | Yes — sitewide |
| **Original data / first-hand observation** | AI citation multiplier | any (differentiation) | Article | Underused — our real edge (see below) |
| **Pillar / ultimate guide** (hub that links to clusters) | Topical authority + broad AI | head term ("things to do in Da Nang") | Article + ItemList | Planned — built last |

**Format stacking is the real win.** The pages that rank *and* get cited combine formats: a Top X that also carries a comparison table, exact numbers, and an FAQ. Our guide template already stacks (TLDR + facts + tables + callouts + FAQ + Sources). A "Top X" for us is therefore not a new template, it is the same rich template arranged as a ranked list with ItemList schema.

---

## Top X, done the way that actually ranks in 2026

The owner's instinct is correct: "best coffee shops in Da Nang", "best day trips", etc. are listicle-dominated SERPs (Tripadvisor, hostelgeeks, willflyforfood all rank with listicles), and listicles win a disproportionate share of AI citations. But the same research is blunt: **a list that just names things with generic blurbs is filtered as thin content and cited by nobody.** The win conditions:

1. **Analysis, not aggregation.** Each entry needs a specific reason it is on the list, a distinguishing detail, and who it suits. "Great coffee, nice vibe" is filler. "Specialty single-origin roaster, serious pour-over, quiet enough to work from until noon" is extractable.
2. **Specific, attributed numbers.** Content with statistics/specifics is ~40% more likely to be cited. Ratings, prices, hours, distances, "consistently ranked across N guides" — concrete beats vague every time.
3. **A stated methodology.** Say how the list was built. This is what makes a Top X credible without a review team (see integrity rules).
4. **Freshness.** Pages updated within ~2 months earn ~28% more AI citations. Top X needs a visible "last reviewed" discipline; stale listicles decay fast.
5. **ItemList + FAQPage schema.** Tells AI exactly what the items are instead of making it guess; drives list/carousel rich results.
6. **One term per concept, self-contained sentences.** Every sentence should stand alone as a quotable answer (extractability).

### The integrity rules for Top X (non-negotiable)

We are a luggage-storage company, not a review outlet with a team that visited every cafe. So:

- **Never fabricate first-hand experience** ("we tested", "our favourite") that we did not have. **Never invent ratings or an aggregate score.** (Same rule as the AggregateRating schema note: never fabricate.)
- **The credible model = transparent, sourced curation.** Frame it honestly: "compiled from the most consistently recommended spots across Da Nang travel guides and Google reviews, as of [month]." Give each pick its real, checkable evidence (Google rating with the date, specialty, what multiple sources say).
- **First-hand is allowed only where it is real.** Stow is a genuine on-the-ground Da Nang business. If the owner wants to add first-hand picks or local knowledge, that is legitimate and a ranking asset, but it is the owner's call to supply, not something a writer invents. This is a decision to confirm before the first Top X ships.
- This honesty is not a handicap. Verifiability and neutral tone are exactly what LLMs cite. Done right, the integrity model *is* the GEO advantage.

---

## What else besides Top X (ranked by leverage for us specifically)

1. **Original / first-hand observation woven into any format.** The single biggest GEO differentiator, because it is the one thing competitors cannot copy from the same sources. Our version: operational reality we actually see (airport-to-district timings, when the Marble Mountains area is quiet, real checkout-day patterns, what travelers actually store and when). Sprinkle it as specific, attributable observations. It also feeds the luggage tie-in naturally.
2. **Comparison "X vs Y" (tables).** Owns decision queries and table snippets. We proved it with da-nang-vs-hoi-an. Backlog: "Grab vs Xanh SM vs taxi", "tunnel vs Hai Van Pass" (already inside the Hue guide), "hourly vs daily vs monthly storage" (a money-page comparison).
3. **Cost / pricing breakdowns.** "How much does a trip to Da Nang cost", "Ba Na Hills ticket prices explained". AI loves concrete money numbers; high commercial intent.
4. **Direct-answer trust/safety pages.** "Is Da Nang safe?", "Is the tap water safe?" These are paragraph-snippet + AEO plays, *not* listicles. Also reinforce our own trust cluster.
5. **How-to / step-by-step.** "How to get from Da Nang airport to Hoi An", "How to ride the Hai Van Pass legally". Numbered lists win procedural snippets.
6. **Pillar / ultimate guide (the hub).** "Things to Do in Da Nang" built last, linking down to every cluster (including all the Top X pieces), so authority compounds.

---

## Two technical enablers to add

- **`ItemList` JSON-LD** in `src/lib/structured-data.ts` — a small helper (`itemListJsonLd([{position, name, url?}])`) wired into every Top X page, next to the existing breadcrumb/FAQ helpers. Low effort, direct AEO/carousel benefit.
- **`llms.txt`** at the domain root — a markdown map of the site's key pages for AI comprehension. Not widely adopted yet, early adopters report better citation accuracy; cheap to add and maintain. Flag as a quick technical task, owner's call.

---

## The reformatted backlog (format lens applied)

The old deferred list was topic-only. Sorting it by *format* changes what each should be:

| Topic | Best format | Cluster / persona | Luggage tie-in strength |
|---|---|---|---|
| Coffee shops | **Top X** (ItemList) | Food/drink, tourist + nomad | Medium (cafe-hop on a checkout day) |
| Cafes to work from | **Top X** (ItemList) | Nomad/expat = revenue driver | High (long-stay + storage) |
| Coworking spaces | **Top X** (ItemList) | Nomad/expat = revenue driver | High (visa-run / long-term storage) |
| Day trips from Da Nang | **Top X hub** (ItemList) | See-do; links to hoi-an/hue/ba-na | High (leave bags, day-trip free) |
| Hidden gems / offbeat | **Top X** (ItemList) | See-do, differentiation | Low-medium |
| Photo / Instagram spots | **Top X** (ItemList) | See-do, discovery | Low |
| Da Nang on a budget | **Guide** (not Top X) | Budget traveler | Medium |
| Is Da Nang safe? | **Direct-answer page** (paragraph) | Trust; reinforces our own trust cluster | Low (but strong brand-trust halo) |
| My Son Sanctuary day trip | **Day-trip guide** (like Hue) | See-do | High (same as other day trips) |
| Things to Do in Da Nang | **Pillar / hub** — build LAST | Head term | Medium |

### Suggested first Top X batch (highest leverage first)
1. **Best Coworking Spaces in Da Nang** — hits the *primary revenue persona* (nomad/expat), strong, honest luggage tie-in (long-term / visa-run storage), links to where-to-stay + visa-run guides.
2. **Best Cafes to Work From in Da Nang** — same persona, huge nomad search demand, wifi/laptop-friendly angle, natural long-stay tie-in.
3. **Best Coffee Shops in Da Nang** — listicle-dominated SERP with plenty of sourceable entities, broad tourist appeal, links to the food guide.
4. **Best Day Trips from Da Nang** — a hub Top X that internal-links to the hoi-an, hue, and ba-na guides, with the cleanest luggage tie-in of all.

Each ships to the full house standard (deep, cited, plain global English, khong-dau, VND, no em dashes, verified Wikimedia images, one tactful tie-in) plus ItemList schema, a stated methodology line, and a visible "last reviewed" date.

### Guardrails
- **Cannibalization:** we already have food, beaches, nightlife, and where-to-stay guides. A "best restaurants" or "best beaches" Top X would compete with those, so either fold ItemList into the existing guide or skip it. Coffee/coworking/cafes-to-work-from are genuinely new ground.
- **Tie-in discipline:** still one tactful luggage mention per piece, at the real logistics moment; some Top X (photo spots) barely warrant one, and that is fine — the value there is authority + internal links.
- **Freshness discipline:** Top X decay. Each needs a "last reviewed [month]" and a periodic re-check, or it becomes a liability.

---

## Sources (2026, free-method research)
- Listicle SEO / AI-citation share — https://memorable.design/listicle-seo-2026/ ; https://www.searchlogistics.com/learn/seo/on-page/listicle/ ; https://smartclick.agency/blog/benefits-of-listicles/
- GEO / getting cited by LLMs (extractability, specifics, freshness, schema, brand mentions) — https://www.quattr.com/blog/how-to-get-cited-by-llms ; https://www.averi.ai/learn/the-definitive-guide-to-geo-get-cited-by-ai-in-2026 ; https://nextgrowth.ai/geo-best-practices-ai-citations/
- Featured snippet format split and how to win each — https://serpexa.com/featured-snippet-types-how-to-win-each-complete-guide-2026/ ; https://niumatrix.com/search-featured-snippets-guide/
- ItemList schema for listicles — https://schema.org/ItemList ; https://www.greadme.com/blog/schemas/what-is-itemlist-schema-complete-guide
- Da Nang "best coffee" SERP recon (listicle-dominated; sourceable entities) — Tripadvisor, hostelgeeks.com, willflyforfood.net listings
