# Content engine playbook — how new pages get decided, built, and retired

**Purpose:** make the process that produced the 5 guides below (`docs/aeo-seo/2026-08-15-*-guide` pages, shipped 2026-08-15) repeatable, so the next round of content doesn't require re-deriving strategy from scratch. This is the missing "Tier 2" execution layer on top of the topical map — not a new strategy.

**Trigger for this doc:** owner asked to pivot from off-site (Facebook/Zalo) work to building more on-site content — a real reprioritization, reconciled with the earlier "no new pages" research this way: genuinely useful, specific guides are themselves a backlink-earning mechanism (expat forums/travel blogs link to resources, not to a homepage), so this serves the same off-site-authority goal through content instead of directly creating profiles. It only works if every piece clears the bar below — otherwise it's exactly the thin-content pattern the research warned against.

---

## The pipeline

```
Entity Map ──→ Topical Map ──→ Keyword Map ──→ Prioritization gate ──→ Draft (voice + fact-check)
     │              │               │                                          │
     └── fixed, rarely changes ─────┘               ┌────────────────────────┘
                                                      ▼
                          Internal-link wiring ──→ Schema/sitemap ──→ Ship ──→ Measure ──→ Retire or expand
```

All three maps already exist in `docs/aeo-seo/2026-08-09-entity-topical-keyword-map.md` — don't recreate them per content cycle. Read that doc first, every time.

### 1. Prioritization gate — a cluster earns a new page when ALL of:

- It has a row in the existing keyword map (or a **new, evidence-backed** addition to it — see below)
- It maps to real revenue intent (expat/visa-run, the stated primary driver) **or** has live search signal (GSC impressions on a query the site doesn't currently serve)
- There's enough real, specific, non-fabricated substance to fill a genuinely useful page — if the honest answer is 3 sentences, it's an FAQ entry, not a page

**Updating the keyword map with new evidence:** the Hoi An and Ba Na Hills guides didn't come from the original keyword-map research — they came from GSC showing real impressions on those queries that the site wasn't addressing. When GSC (or the manual AI-citation tracking from Part 4 of `2026-08-15-geo-strategy-validated-flow.md`) surfaces a query cluster like this, add it to the keyword map doc with its evidence source, then run it through this same gate. This is what keeps the engine fed with real demand instead of guessing.

### 2. Draft — non-negotiable gates before anything ships

- **Outline first, in the open, before writing prose.** State the section structure and which real search intent each section serves before drafting — catches shallow/generic structure early instead of after 5 guides are already written. This gate exists because the first pass at this batch (2026-08-15) shipped ~500-word guides on ~1 search each per topic, which is exactly the "content comprehensiveness" pillar (Part 1 of the strategy doc) failing in practice — genuinely deep content needs 6-8+ real searches per topic, not one.
- Every fact (distance, price, hours, visa rule) is verified against a current source, never assumed from training data or invented — Vietnam-specific facts (visa rules, transport prices) change and this niche has zero tolerance for confidently wrong logistics advice. Where sources conflict or a claim is single-sourced, hedge in the copy ("commonly reported," a price range instead of one number) rather than presenting it as settled fact — this matters most on the visa-run guide, where a wrong "fact" is immigration advice, not a travel tip.
- Full `STOW_HUMANIZER_RULES.md` compliance — no forbidden openers/closers/transitions/buzzwords, specific facts not abstractions, mixed sentence rhythm, no "5 Reasons Why" listicle structure
- Opens with a direct answer to the implied question (the AEO/semantic-SEO pattern already established for the FAQ) before elaborating
- Real structure for a real-length page: a table of contents once there are 5+ sections, comparison tables where two real options are being weighed, a per-guide FAQ block (with matching `guideFaqJsonLd` schema) — not just three shallow H2s
- One dedicated, earned Stow-conversion section per guide, triggered by a real pain point already established earlier in the piece (the physical problem of carrying a bag through *this specific* situation) — not a mention forced into every paragraph, and not just a generic CTA at the end
- **Images: only from a verified-reusable-license source (Wikimedia Commons CC0/CC-BY/CC-BY-SA checked per file), never hotlinked from a Google Image search result.** Most images Google surfaces are copyrighted and not licensed for reuse — hotlinking them is real infringement exposure for a live commercial site, not a theoretical risk. Every image needs its exact license and photographer credit recorded via `GuideImage`, and the source file size checked before use (a 22MB source caused multi-second load times on first fetch — swap for a smaller same-subject alternative, ideally under ~3MB)

### 3. Wire into the graph, don't let it stand alone

- Link the new page **from** at least one existing high-traffic surface (FAQ cluster, relevant homepage section)
- Link **back** from the new page to the homepage pillar and the relevant FAQ cluster
- Interlink new guides with each other where topically real (not manufactured — only if a reader genuinely would want the other page next)
- Add to `sitemap.ts`, add `breadcrumbJsonLd`

### 4. Measure, then decide — the part that keeps this sustainable

- Check the new URL in GSC's Pages report after a real window (a month minimum — Part 5 of the strategy doc already flagged that a few weeks of data is too thin to act on)
- If it's getting impressions: consider expanding the cluster (more depth, or a sibling page)
- If it's getting zero traction after a real window: fold its useful facts back into an FAQ entry and consider removing the standalone page — an unlinked, untrafficked page sitting around indefinitely is exactly the Scaled-Content-Abuse pattern this whole discipline exists to avoid. Don't let "we already wrote it" be a reason to keep a page nobody reads.

---

## 2026-08-15 batch — first run through this pipeline

| Guide | Cluster | Source |
|---|---|---|
| Da Nang layover guide | Airport/short-stay | Existing keyword map |
| Da Nang visa run guide | Visa-run/expat (primary revenue driver) | Existing keyword map |
| Marble Mountains (Ngũ Hành Sơn) guide | Location/landmark | Existing keyword map, flagged as underused since the first entity audit |
| Da Nang → Hoi An day trip guide | New | GSC impressions, 2026-08-15 — not in the original keyword map |
| Ba Na Hills day trip guide | New | GSC impressions, 2026-08-15 — not in the original keyword map |

Re-check all 5 against GSC's Pages report no earlier than 2026-09-15.

**Revision note, same day:** the first pass above shipped thin (~500 words, ~1 search per topic). Owner feedback caught it directly ("your content is not the content... not very deep research"). All 5 were rewritten same-day against the gates in step 2 above — 6-8 real searches per topic via parallel research agents, tables/FAQ blocks/TOCs added, one licensed Wikimedia image per guide, one earned Stow-conversion section per guide tied to a specific pain point. The gates in step 2 (outline-first, source-count minimum, hedge-don't-invent) were written *from* this correction — apply them from the start on the next batch, don't wait for the same feedback twice.
