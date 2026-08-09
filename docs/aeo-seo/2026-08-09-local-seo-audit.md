# Local SEO & Business Profile Audit — Stow (Da Nang)

**Scope:** stowdanang.com — off-site/local-pack layer (companion to [`2026-08-09-structured-data-research.md`](2026-08-09-structured-data-research.md), which covers the on-site schema layer)
**Method:** Renn Labs Local SEO & Business Profile Kit (`~/Downloads/07_Tools-Skills/local-seo-kit-2026-06-04/local-seo-kit/`), SOP file `01-local-audit-sop.md`, Phases 0–8
**Date:** August 9, 2026
**Access:** Public-data audit only — no GBP / Meta / Bing dashboard login. Every claim below is either **VERIFY** (needs dashboard/owner confirmation) or **OBSERVED** (confirmed on the live public web). Labeled per the kit's Golden Rule 6.

---

## The one-line finding

Stow has a technically excellent, schema-rich website — [the JSON-LD is already correct](2026-08-09-structured-data-research.md) — but the business is **completely invisible off-site**: no Google Business Profile, no Facebook Page, no Bing/Apple listing, no directories, and the one social profile that exists (Instagram, 2 followers) links to a dead old URL. Google currently has **zero prominence signal** to rank Stow on for "luggage storage Da Nang" — it isn't ranking low, it *doesn't exist* in the local pack at all. Meanwhile direct local competition (Easy Storage Da Nang, WhaleLO, plus the international host-marketplaces Stasher/Nannybag/Radical Storage) already has a footprint. This is fixable in days — Stow just launched, so there's no history to untangle, only ground to build on.

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

## Phase 2 — Google Business Profile: **MISSING** (the single biggest gap)

- **No GBP exists.** Confirmed by tracing the site's own "Get Directions" link: `https://maps.app.goo.gl/wVmkxJ1DgLUJeBAWA` resolves to a Google Maps place titled only *"55 Bà Bang Nhãn, Ngũ Hành Sơn, Đà Nẵng 550000, Vietnam"* — a raw geocoded address pin, not a named, claimed business listing. If a GBP existed, that place would carry the business name.
- **A related site bug, caused by the same gap:** the location section's other CTA links to `https://www.google.com/maps/search/Stow+Da+Nang+luggage+storage` — a text search. Since no business named "Stow" is indexed on Maps, any visitor who clicks it currently gets **no result / an unrelated result**, not the store. This is a broken user-facing link, not just a missing citation — fix it (point to the real GBP share link) the moment the profile is verified.

```
GBP SCORE — Stow — 2026-08-09 (public-data pass, from-scratch build, not an edit)
MUST:    0/8 — nothing exists yet to score against
SHOULD:  0/9 — n/a until created
ONGOING: not running
Headline fixes (top 3 by impact):
  1) Create + verify the Business Profile — storefront model, real address, primary category "Luggage Storage Facility" (or closest predefined match).
  2) Once created, swap the site's broken "search" CTA for the real GBP share link, and add the GBP URL to schema `sameAs`.
  3) Populate fully on creation — services (add every relevant predefined service, not custom-only — this is a real 2026 ranking lever), photos (storefront exterior/interior, staff, tagging process), and description built from the existing brand copy in project memory.
```

Per the kit's 2026 ranking-factor research, **GBP signals are ~32% of local-pack ranking weight** — the largest single lever available, and currently at zero.

---

## Phase 3 — Bing Places + Apple Business Connect: **MISSING**

Neither found in search. Both are fast creates once GBP exists (Bing supports "import from Google Business Profile"). Apple is worth prioritizing given the tourist half of Stow's audience skews iPhone/Maps+Siri users.

---

## Phase 4 — Citation sweep (tiers adapted for a Da Nang / Vietnam service business)

The kit's US-centric tier list (BBB, YellowPages, Chamber of Commerce…) doesn't map directly to a Vietnamese single-location tourism/expat service — tiers below are re-weighted for this market: Google/Facebook/Zalo are the real Tier 1 in Vietnam (Zalo is the dominant local messaging/business-profile app), and the three international "host marketplace" platforms double as both a citation *and* an actual booking channel — the direct equivalent of Debit & Co's "QuickBooks ProAdvisor" flagship-directory pick.

| Tier | Platform | Found? | Status | Notes |
|---|---|---|---|---|
| 1 | **Google Business Profile** | N | **Missing** | See Phase 2 — the whole game. |
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

**Baseline counts:** Match 0 / Mismatch 1 (Instagram) / Missing 8+. The footprint isn't "messy," it's **empty** — one profile exists and it has a broken link. That's a faster fix than untangling years of inconsistent listings, but every Tier 1/2 platform above is a from-scratch build.

*(Full row-by-row tracker: [`citation-tracker.csv`](citation-tracker.csv) alongside this file.)*

---

## Phase 5 — Reviews & competitive position

- **Reviews: 0 everywhere.** Expected — Stow launched June 2026 and has no GBP yet to collect them on. Not a defect, a build-from-zero.
- **Direct local competitor confirmed:** *Easy Storage Da Nang*, operating out of Hana's Coworking, 69 Bùi Tá Hán, Khuê Mỹ Ward — the **same Ngũ Hành Sơn district**. Worth a follow-up spot-check on their GBP category/review count as the local benchmark to beat.
- **International marketplace competitors already active in Da Nang:** Stasher, Nannybag, Radical Storage, and WhaleLO (the last is Klook-listed) all show multiple Da Nang "host" spots. None currently include Stow.
- **Local-pack reality check:** meaningless to run yet — with no GBP, Stow structurally *cannot* appear in the Maps 3-pack for any "luggage storage near me"-type search right now, regardless of how well the site itself is optimized. This is whitespace, not a low ranking.

---

## Phase 6 — Synthesis & the plan (impact × effort)

**Narrative:** the site is doing its job (schema, copy, pricing — all solid per the companion AEO doc); the local-pack layer simply hasn't been switched on yet. Every fix below is a *creation*, not an *untangling* — the fastest kind of local SEO work there is.

```
        HIGH IMPACT
            │  [P1 — this week]                [P2 — weeks 2–4]
            │  • Lock display name w/ owner     • Bing Places + Apple Business
            │    (confirm signage → "Stow")       Connect (import from GBP)
            │  • Create + verify GBP            • List on Stasher / Nannybag /
            │    (storefront, category, hours)    Radical Storage — citation +
            │  • Create Facebook Page             booking channel in one
            │  • Create Zalo OA                 • TripAdvisor listing
            │  • Fix Instagram bio link          • Resolve apex-vs-www canonical
            │    (stow-vn.vercel.app → real       mismatch site-side
            │    domain) + add phone            • Add GBP/Facebook/Zalo URLs to
            │  • Fix dead "search" Maps CTA        schema `sameAs` as each is
            │    once GBP share link exists        created
            │  • Design review-request flow
            │    (ready day 1 of verification,
            │    not after)
 ───────────┼──────────────────────────────────────────────────────
            │  [quick wins, lower impact]       [P3 — ongoing / volume]
            │  • Standardize "Stow" vs "Stow —   • Da Nang tourism directories
            │    Luggage Storage Da Nang"          + "Expats in Da Nang City"
            │    across whichever profiles         FB group presence
            │    keep the long form              • TikTok
            │                                    • Weekly GBP Posts once live
            │                                    • Review velocity: target
            │                                      5–15/mo, respond ≤48h
        LOW IMPACT          LOW EFFORT ──────────────────────► HIGH EFFORT
```

**Sequenced:**
- **P1 (this week):** confirm the GBP display name and address model with the owner, create + verify GBP, stand up Facebook + Zalo, fix the two live NAP/link bugs (Instagram bio URL, dead Maps CTA), design the review-ask flow now so it fires the moment GBP is verified.
- **P2 (weeks 2–4):** Bing, Apple, the three luggage-storage marketplaces (real revenue + citation), TripAdvisor, the apex/www canonical fix, `sameAs` + `aggregateRating` schema updates as profiles/reviews land.
- **P3 (ongoing):** community + volume — expat Facebook group, Da Nang tourism sites, TikTok, weekly Posts, permanent review-velocity cadence.

---

## Phase 7 — Measurement baseline (set today, re-pull +30 / +60 / +90)

| Metric | Baseline 2026-08-09 | +30 | +60 | +90 | Target |
|---|---|---|---|---|---|
| GBP status | Does not exist | | | | Verified, fully complete |
| "luggage storage Da Nang" local-pack presence | Not applicable — no listing to rank | | | | Appears in 3-pack |
| GBP reviews (count / avg) | 0 / — | | | | 10+ / 4.5+ |
| Citations Match / Mismatch / Missing | 0 / 1 / 8+ | | | | 8+ / 0 / 0 |
| Instagram followers / bio link correct | 2 / **incorrect** (old Vercel URL) | | | | growing / fixed |
| GSC clicks on local terms | VERIFY (no GSC access in this pass) | | | | rising |

---

## Phase 8 — QA before delivery

- [x] Canonical NAP extracted from live schema, cross-checked against footer + Instagram — locked above, flagged 4 open items for owner confirmation.
- [x] Every "missing/broken" claim traced on the live public site or via direct search (the Maps redirect trace, the Instagram bio fetch) — not assumed from an aggregator.
- [x] Public-data vs dashboard-required items labeled (VERIFY where dashboard access would be needed — none were, since nothing exists yet to check).
- [x] Address model — storefront, matches the staffed check-in/tagging ops process from project brand spec; recommend confirming with owner it's not a shared/unstaffed space (Open Item 4).
- [x] No invented address, suite, or virtual office — the real address already on the live site was used throughout.
- [x] Fixes tiered P1/P2/P3 by impact × effort.
- [x] Baseline captured 2026-08-09 for the 30/60/90 table above.

---

## What this hands back to the owner (the ask)

1. **Confirm the GBP display name** — recommend "Stow" alone (see Open Item 1); confirm against actual shop signage.
2. **Owner/manager access** to create Google Business Profile, Facebook Page, and Zalo OA (or delegate creation with a shared login) — these require the business owner's identity for verification, not something that can be scaffolded from code.
3. **Confirm the address model** — dedicated staffed space at 55 Bà Bang Nhãn vs. shared/unstaffed (Open Item 4).
4. **Sign-off on the two live bug fixes** (Instagram bio link, dead Maps CTA) and the canonical-host decision (Open Item 3) — code-side, can ship immediately once decided.
