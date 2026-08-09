# Local SEO & Business Profile Audit — Stow (Da Nang)

**Scope:** stowdanang.com — off-site/local-pack layer (companion to [`2026-08-09-structured-data-research.md`](2026-08-09-structured-data-research.md), which covers the on-site schema layer)
**Method:** Renn Labs Local SEO & Business Profile Kit (`~/Downloads/07_Tools-Skills/local-seo-kit-2026-06-04/local-seo-kit/`), SOP file `01-local-audit-sop.md`, Phases 0–8
**Date:** August 9, 2026
**Access:** Public-data audit only — no GBP / Meta / Bing dashboard login. Every claim below is either **VERIFY** (needs dashboard/owner confirmation) or **OBSERVED** (confirmed on the live public web). Labeled per the kit's Golden Rule 6.

---

## The one-line finding

**Update, same day:** the first pass of this audit reported no Google Business Profile. That was wrong — GBP exists (owner-confirmed, verified via the real share link, see Phase 2) — but the site itself was never linking to it: both Maps-related CTAs on the live site pointed at a bare address pin and a dead text-search instead of the real listing. That's now fixed. The corrected picture: Stow has a technically excellent, schema-rich website *and* a working Google Business Profile with a reported 5.0 rating — but everything **besides** Google is still unbuilt: no Facebook Page, no Bing/Apple listing, no directories, and the one other social profile that exists (Instagram, 2 followers) links to a dead old URL. The prominence signal isn't zero, but it's resting on a single channel that the site wasn't even pointing at correctly until today. Meanwhile direct local competition (Easy Storage Da Nang, WhaleLO, plus the international host-marketplaces Stasher/Nannybag/Radical Storage) already has a broader footprint. Still fixable fast — Stow just launched, so there's no history to untangle on the *new* channels, only ground to build.

---

## Phase 1 — Canonical NAP (locked from public data)

Extracted from the live JSON-LD `LocalBusiness` block (`src/lib/structured-data.ts`), cross-checked against the rendered footer, location section, and Instagram bio.

```
CANONICAL NAP — Stow — locked 2026-08-09 (public-data pass, CONFIRM with owner before GBP submission)
Display name : Stow — Luggage Storage Da Nang   (site schema `name`)
Short name   : Stow                             (schema `alternateName`: "Stow Da Nang"; logo/social per project brand spec)
Address model: Storefront — staffed location, customers physically drop off/pick up, staff tags + photographs items (per ops model). NOT a Service-Area Business.
Street       : 55 Bà Bang Nhãn
City/State/Zip: Ngũ Hành Sơn, Đà Nẵng 550000, Vietnam
Phone        : +84 905 955 161            (one number — also the WhatsApp/Zalo contact; consistent everywhere it appears)
Website      : https://stowdanang.com     (see Open Item 3 — apex vs www)
Email        : stowdanang@gmail.com
Hours        : 7:00 AM – 10:00 PM, every day incl. holidays  (schema `openingHoursSpecification` matches footer text — good)
Primary GBP category candidate : "Luggage Storage Facility" (closest Google predefined category; confirm exact label in the category picker — verify it isn't "Storage Facility" instead, which reads long-term/self-storage)
sameAs profiles:
  Instagram : https://www.instagram.com/stowdanang/  (only one currently linked in schema)
  Google Business Profile : NOT YET CREATED
  Facebook  : NOT YET CREATED
  Zalo OA   : NOT YET CREATED
```

### Open items flagged during NAP lock (confirm with owner before creating GBP)

1. **Display-name drift across the 3 places it already appears.** Site schema: *"Stow — Luggage Storage Da Nang"* (full) / *"Stow Da Nang"* (alternateName). Instagram bio: *"STOW"*. Google's guideline is the **real-world name as it appears on signage/branding** — not a keyword-stuffed SEO string (Golden Rule 3; a name like "Stow — Luggage Storage Da Nang" in the GBP *name field* itself risks a guideline flag). **Recommendation:** submit GBP as **"Stow"** alone, let the category + description carry "luggage storage Da Nang." Confirm against actual signage at 55 Bà Bang Nhãn before submitting.
2. **Legal entity name** — none found publicly. Needed if any Vietnamese business-registration or B2B directory requires it later.
3. **Canonical host mismatch (site-side, not NAP, but blocks consistent citation-building):** `https://stowdanang.com` returns **HTTP 308 → `https://www.stowdanang.com`**, yet the site's own `canonical` and `og:url` meta tags still declare `https://stowdanang.com` (the apex, redirecting URL) rather than the host that actually serves content. Pick one — recommend keeping the redirect and pointing canonical/OG at the resolved `www` host, or vice versa — before that URL gets published across a dozen citations.
4. **Confirm 55 Bà Bang Nhãn is a dedicated, staffed, client-facing space** — not a desk inside a shared building. The address is real (no fabrication concern, Golden Rule 5 is clear here), just confirm it's signed/staffed so the storefront GBP model is the right one and not SAB.

---

## Phase 2 — Google Business Profile: **EXISTS** (correction — see below)

**Correction, 2026-08-09 (same day):** the first pass of this audit reported GBP as missing. That was wrong in the way it mattered — it existed, but the *site* wasn't linking to it. Tracing the site's own CTAs found two different, both-wrong links: the "Get Directions" link resolved to a bare geocoded address pin (`maps.app.goo.gl/wVmkxJ1DgLUJeBAWA`, titled only by the street address), and the "5.0 on Google" badge pointed at a Maps text-search that returns no result. Neither is the real listing. The owner supplied the actual profile link (`https://share.google/4fTTPlY1pwqbLAvmB`), which resolves through Google's redirector to a real Knowledge Graph entity — `kgmid=/g/11z9561m6s`, bound to the query **"Stow - Luggage Storage Da Nang"** — confirming a genuine indexed Business Profile. Both site links have been repointed to it, and it's now in schema `sameAs`.

- **OBSERVED (via the redirect trace):** a real Google entity exists for "Stow - Luggage Storage Da Nang" (`/g/11z9561m6s`).
- **VERIFY (dashboard-only — Google's business panel is JS-rendered and didn't come through on a plain fetch):** exact registered category, verified/claimed badge status, live review count and rating, hours as shown on the profile vs. the site's 7am–10pm, and photo count. The owner reports the rating shown is genuine — worth a screenshot for the record next time the dashboard's open, since the previous pass had no way to confirm it independently.

```
GBP SCORE — Stow — 2026-08-09 (corrected)
MUST:    claimed/verified=VERIFY · primary category=VERIFY · name="Stow - Luggage Storage Da Nang" (per kgmid query, OK) ·
         NAP=VERIFY against canonical · address-model=storefront (assumed correct) · phone=VERIFY · website=VERIFY link target · hours=VERIFY
SHOULD:  description / services / photos / attributes / Q&A — VERIFY (all dashboard-only)
ONGOING: Posts=VERIFY · Reviews=reported 5.0 (genuine per owner) · responses=VERIFY
Headline fixes (top 3 by impact):
  1) Screenshot the dashboard once (category, hours, review count, verified badge) to convert the VERIFY rows above into confirmed facts — the previous "doesn't exist" miss happened precisely because this audit had no dashboard access.
  2) Confirm the site's `website` field in GBP points at https://www.stowdanang.com (matches the canonical-host fix from Phase 1), not the old Vercel URL.
  3) Now that the real link is wired into the site, keep completing the profile — services (every relevant predefined service, not custom-only), fresh photos, weekly Posts — per the SHOULD/ONGOING checklist in file `03-gbp-optimization-checklist.md`.
```

---

## Phase 3 — Bing Places + Apple Business Connect: **MISSING**

Neither found in search. Both are fast creates once GBP exists (Bing supports "import from Google Business Profile"). Apple is worth prioritizing given the tourist half of Stow's audience skews iPhone/Maps+Siri users.

---

## Phase 4 — Citation sweep (tiers adapted for a Da Nang / Vietnam service business)

The kit's US-centric tier list (BBB, YellowPages, Chamber of Commerce…) doesn't map directly to a Vietnamese single-location tourism/expat service — tiers below are re-weighted for this market: Google/Facebook/Zalo are the real Tier 1 in Vietnam (Zalo is the dominant local messaging/business-profile app), and the three international "host marketplace" platforms double as both a citation *and* an actual booking channel — the direct equivalent of Debit & Co's "QuickBooks ProAdvisor" flagship-directory pick.

| Tier | Platform | Found? | Status | Notes |
|---|---|---|---|---|
| 1 | **Google Business Profile** | Y | **Match (owner-confirmed) — site links fixed** | `https://share.google/4fTTPlY1pwqbLAvmB` → kgmid `/g/11z9561m6s`, "Stow - Luggage Storage Da Nang". Site's two Maps CTAs were pointing elsewhere; both repointed here and added to schema `sameAs`. Category/hours/photo VERIFY still open — see Phase 2. |
| 1 | **Facebook Page** | N | **Missing** | No page found under "Stow Da Nang" / "stowdanang" in public search. Create with matching NAP. |
| 1 | **Instagram** | Y | **Mismatch** | `@stowdanang`, 2 followers. Bio website link is the **old Vercel URL `stow-vn.vercel.app`**, not `stowdanang.com` — a live NAP mismatch on the one profile that exists. No phone/address in bio either. |
| 1 | **Zalo Official Account** | N | **Missing** | Not found. Zalo is the default local-business/contact surface in Vietnam and the number is already Zalo-enabled per project notes — low-effort, high-relevance create. |
| 2 | **Bing Places** | N | **Missing** | Import from GBP once it exists. Also feeds Copilot. |
| 2 | **Apple Business Connect** | N | **Missing** | Feeds Apple Maps + Siri — relevant to the tourist segment. |
| 2 | **TripAdvisor** | N | **Missing** | Tourist-facing; worth a listing under "Things to Do" / services in Da Nang. |
| 2 | **Stasher / Nannybag / Radical Storage** (host marketplaces) | N | **Missing** | These are the vertical's flagship directories *and* live booking channels — dozens of competing Da Nang spots are already listed on them, Stow is on none. Double-purpose citation. |
| 3 | **Easy Storage Da Nang listings / local directories** | — | n/a | Not a citation target — this is a direct local competitor (see Phase 5), noted for competitive tracking, not to be listed. |
| 3 | **"Expats in Da Nang City" (Facebook group) presence** | N | **Missing** | Not a formal citation but a high-intent community for the expat/visa-run segment — the project's stated primary revenue driver. |
| 3 | **TikTok** | N | **Missing** | Optional, matches younger-tourist reach; not NAP-critical. |

**Baseline counts:** Match 1 (GBP, corrected) / Mismatch 1 (Instagram) / Missing 7+. Better than the first pass suggested — GBP is real and reportedly performing (5.0 rating) — but it was carrying the whole footprint alone, and even it wasn't correctly linked from the site. Every other Tier 1/2 platform above is still a from-scratch build.

*(Full row-by-row tracker: [`citation-tracker.csv`](citation-tracker.csv) alongside this file.)*

---

## Phase 5 — Reviews & competitive position

- **Reviews: GBP reportedly at 5.0 (owner-confirmed); 0 everywhere else.** Worth exporting the actual count/rating from the dashboard for the record — this pass couldn't render it independently (Phase 2 VERIFY). Review-recency/velocity is now the single biggest 2025-26 ranking shift per the kit's research (file `06-advanced-ai-era-tactics.md`) — a rating is only as strong as the flow of fresh reviews behind it, so a request-workflow is still worth standing up even with GBP already live.
- **Direct local competitor confirmed:** *Easy Storage Da Nang*, operating out of Hana's Coworking, 69 Bùi Tá Hán, Khuê Mỹ Ward — the **same Ngũ Hành Sơn district**. Worth a follow-up spot-check on their GBP category/review count as the local benchmark to beat.
- **International marketplace competitors already active in Da Nang:** Stasher, Nannybag, Radical Storage, and WhaleLO (the last is Klook-listed) all show multiple Da Nang "host" spots. None currently include Stow.
- **Local-pack reality check:** worth re-running now that the real GBP link is confirmed — search "luggage storage near me" / "luggage storage Da Nang" in an incognito window and note where Stow lands in the 3-pack vs. the competitors above. Not done in this pass (needs a live, geo-located search session, not a scripted one) — flagged as the next concrete step rather than assumed.

---

## Phase 6 — Synthesis & the plan (impact × effort)

**Narrative:** the site is doing its job (schema, copy, pricing — all solid per the companion AEO doc); GBP already exists and is reportedly performing well — the gap was that the site wasn't linking to it, and everything besides Google is still unbuilt. Most of what's left below is *creation*, not *untangling* — the fastest kind of local SEO work there is.

```
        HIGH IMPACT
            │  [P1 — this week]                [P2 — weeks 2–4]
            │  • Screenshot GBP dashboard        • Bing Places + Apple Business
            │    (category/hours/reviews/          Connect (import from GBP)
            │    photos) — close the VERIFY      • List on Stasher / Nannybag /
            │    rows from Phase 2                 Radical Storage — citation +
            │  • Create Facebook Page              booking channel in one
            │  • Create Zalo OA                  • TripAdvisor listing
            │  • Fix Instagram bio link           • Resolve apex-vs-www canonical
            │    (stow-vn.vercel.app → real         mismatch site-side (done —
            │    domain) + add phone                see Phase 1, Open Item 3)
            │  • [done] Repoint site's Maps      • Add Facebook/Zalo URLs to
            │    CTAs + schema sameAs at the        schema sameAs as each is
            │    real GBP listing                   created
            │  • Design/confirm review-request
            │    workflow now GBP is live
 ───────────┼──────────────────────────────────────────────────────
            │  [quick wins, lower impact]        [P3 — ongoing / volume]
            │  • Standardize "Stow" vs "Stow —    • Da Nang tourism directories
            │    Luggage Storage Da Nang"           + "Expats in Da Nang City"
            │    across whichever profiles          FB group presence
            │    keep the long form               • TikTok
            │                                     • Weekly GBP Posts
            │                                     • Review velocity: target
            │                                       5–15/mo, respond ≤48h
        LOW IMPACT          LOW EFFORT ──────────────────────► HIGH EFFORT
```

**Sequenced:**
- **P1 (this week):** pull the GBP dashboard screenshot to close out the VERIFY rows, stand up Facebook + Zalo, fix the Instagram bio link — the Maps CTA/schema fixes are already shipped this session.
- **P2 (weeks 2–4):** Bing, Apple, the three luggage-storage marketplaces (real revenue + citation), TripAdvisor, `sameAs` + `aggregateRating` schema updates as Facebook/Zalo/reviews land.
- **P3 (ongoing):** community + volume — expat Facebook group, Da Nang tourism sites, TikTok, weekly Posts, permanent review-velocity cadence.

---

## Phase 7 — Measurement baseline (set today, re-pull +30 / +60 / +90)

| Metric | Baseline 2026-08-09 | +30 | +60 | +90 | Target |
|---|---|---|---|---|---|
| GBP status | Exists, owner-confirmed; category/verified-badge/photos VERIFY | | | | Fully complete + confirmed |
| "luggage storage Da Nang" local-pack presence | VERIFY — not run this pass, needs a live incognito search | | | | Appears in 3-pack |
| GBP reviews (count / avg) | Reported 5.0 avg (owner-confirmed); exact count VERIFY | | | | Rising count, 4.5+ maintained |
| Citations Match / Mismatch / Missing | 1 / 1 / 7+ | | | | 8+ / 0 / 0 |
| Instagram followers / bio link correct | 2 / **incorrect** (old Vercel URL) | | | | growing / fixed |
| GSC clicks on local terms | VERIFY (no GSC access in this pass) | | | | rising |

---

## Phase 8 — QA before delivery

- [x] Canonical NAP extracted from live schema, cross-checked against footer + Instagram — locked above, flagged 4 open items for owner confirmation.
- [x] Every "missing/broken" claim traced on the live public site or via direct search (the Maps redirect trace, the Instagram bio fetch) — not assumed from an aggregator.
- [x] Public-data vs dashboard-required items labeled VERIFY where dashboard access would be needed. **Correction applied same-day:** the first pass mislabeled GBP itself as missing rather than VERIFY, because the site's own links didn't point at it and public search didn't surface it either — owner correction + the redirect trace on the real link fixed this. Recorded here rather than silently edited, per the kit's own Golden Rule 6 (verify, don't assume — and when you get it wrong, say so).
- [x] Address model — storefront, matches the staffed check-in/tagging ops process from project brand spec; recommend confirming with owner it's not a shared/unstaffed space (Open Item 4).
- [x] No invented address, suite, or virtual office — the real address already on the live site was used throughout.
- [x] Fixes tiered P1/P2/P3 by impact × effort.
- [x] Baseline captured 2026-08-09 for the 30/60/90 table above.

---

## What this hands back to the owner (the ask)

1. **A GBP dashboard screenshot** (category, hours, verified badge, exact review count, photo count) — the one thing that can't be confirmed from outside the dashboard; closes the remaining VERIFY rows in Phase 2.
2. **Owner/manager access** to create Facebook Page and Zalo OA (or delegate creation with a shared login) — these require the business owner's identity for verification, not something that can be scaffolded from code.
3. **Confirm the address model** — dedicated staffed space at 55 Bà Bang Nhãn vs. shared/unstaffed (Open Item 4).
4. **Confirm the GBP display name matches signage** — the entity resolves under "Stow - Luggage Storage Da Nang" (Open Item 1); worth checking that's what's on the shop sign, not a keyword-stuffed name Google could flag later.
