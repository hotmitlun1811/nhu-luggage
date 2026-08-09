# Trust & Safety copy pass — AUTHOR-tier proposal

**Status: SHIPPED 2026-08-09.** All 3 diffs approved and live. Extended beyond the original proposal in the same pass — see "Also shipped" below for the additional metadata/OG work done at the owner's request.

**Scope:** `src/app/trust-safety/page.tsx` (the dedicated crawlable page) and `src/components/sections/TrustSafety.tsx` (the homepage card). **Grounded in:** the trust/quality-modifier cluster from `2026-08-09-entity-topical-keyword-map.md` — the owner specifically named "trustworthy luggage storage Da Nang" as a target phrase.

---

## The gap this fixes

Both surfaces already *prove* trustworthiness in specifics (unique ID tags, photo receipts, constant CCTV, locked zone, staff ID verification) — that content doesn't need to change. What's missing is the literal phrase a search engine or AI answer engine actually matches against: neither page contains the words "trustworthy," "safe luggage storage," or "Da Nang" together in one extractable sentence. The dedicated FAQ ("Is it safe to store luggage in Da Nang with Stow?") already covers the *question* form of this — this pass covers the *page-level* surfaces the FAQ doesn't touch: `<title>`, meta description, and the page's own lead sentences.

## The voice-rule tension, and how it's resolved below

`STOW_HUMANIZER_RULES.md` §6 lists **"trusted (just show why)"** as a forbidden buzzword — an unsupported claim of trust is exactly the AI-brochure pattern the whole doc exists to prevent. So "trustworthy" can't just get inserted as an adjective in a sentence on its own. Two ways this is handled below:

1. **Title tag + meta description** — these aren't read aloud to a customer at the counter; they're search-result snippet text, not on-page brand voice. Not bound by the counter test the same way body copy is.
2. **Body copy** — every use below pairs the word immediately with the concrete mechanism that earns it, in the same breath (matching the brand's own Pattern 3 — name the real thing, no softening — and Pattern 7 — long sentence with specifics, short landing line). Never a bare claim standing alone.

---

## Proposed changes

### 1. `/trust-safety` page `<title>` and meta description

```diff
- title: "Trust & Safety — Stow Luggage Storage Da Nang",
+ title: "Safe & Trustworthy Luggage Storage in Da Nang | Stow",
  description:
-   "How Stow keeps your belongings safe. Our security measures, what we can and cannot store, and what we promise.",
+   "How Stow keeps luggage storage in Da Nang safe and trustworthy: unique ID tags, CCTV, photo receipts at drop-off, and what we can and cannot store.",
```

Both target phrases now sit in the two fields search engines weight most for the snippet, and the description still names the concrete mechanisms in the same sentence rather than claiming trust and stopping.

### 2. Page subhead (the paragraph under the H1)

Leaving the H1 itself alone — **"Clear rules, no surprises."** already passes the counter test and forcing a keyword into it would flatten a working headline into a generic one (the exact failure mode the humanizer doc warns about). The subhead right under it has room:

```diff
- Short, honest, and written to protect you as much as us. Here's
- exactly how we keep your bags safe and what we can and cannot accept.
+ Short, honest, and written to protect you as much as us. Here's
+ exactly how Stow keeps luggage storage in Da Nang safe, and what
+ we can and cannot accept.
```

One phrase, inserted where it reads as a natural continuation of the existing sentence, not bolted on.

### 3. New lead-in line for the "Security protocol" block

The security list (ID tag, photo receipt, CCTV, locked zone, staff verification) currently has no sentence introducing it — it just starts at the H2 "Every bag gets the same care." Proposing one line above the list that does the "trustworthy" work the humanizer-compliant way — name it, then immediately prove it:

```
Trust here isn't a slogan. Every bag gets a unique ID tag, a photo
receipt at drop-off, and CCTV coverage until you're back.
```

This mirrors the FAQ answer already shipped for "Is it safe to store luggage in Da Nang with Stow?" almost verbatim — same facts, same order — which is deliberate: consistent facts across the FAQ, this page, and the schema reinforce each other as one entity signal instead of three slightly different versions of the same claim.

### 4. Homepage `TrustSafety.tsx` — deferring to the existing pending proposal

`2026-08-09-author-content-brief.md` already proposed a direct-answer opener for this exact section (*"Every bag gets a photo receipt and a unique ID tag at check-in. CCTV runs on every storage area, all day."*) and it's still unshipped. Rather than draft a second, competing version, recommend just approving that existing line — it already does the specific-facts-first job the homepage card needs. The homepage card's real estate is small (max-width 260px column) and mostly a teaser toward the dedicated page, which is doing the keyword-carrying work; not proposing changes to it beyond what's already sitting in that brief.

---

## What's deliberately NOT touched

- The H1 (**"Clear rules, no surprises."**) — already on-brand, changing it for a keyword risks the "generic keyword-stuffed headline" failure mode.
- The accept/don't-accept lists — factual, complete, no gap.
- The liability section — legal-adjacent copy, out of scope for a keyword pass.
- Homepage `TrustSafety.tsx` beyond noting the existing pending proposal above.

---

## Also shipped in the same pass (owner asked to extend to all metadata/OG)

Site-wide metadata/OG consistency sweep, done alongside the 3 approved diffs:

- **`/trust-safety`, `/terms-of-service`, `/privacy-policy` all inherited the homepage's `openGraph`/`twitter` title and description** — none of the three had their own set, so sharing any of those links on social/messaging showed "Luggage Storage Da Nang | Stow" and the homepage pitch, not the actual page. Added explicit `openGraph`/`twitter` blocks (sourced from each page's own `title`/`description`, one variable each so they can't drift apart) to all three.
- **New dedicated OG image at `src/app/trust-safety/opengraph-image.tsx`** — same visual system (colors, wordmark) as the root image, headline swapped to match the new page title. File-convention routing means Next serves it automatically for `/trust-safety`, no metadata wiring needed. `/terms-of-service` and `/privacy-policy` deliberately kept the shared root image — low social-share value, not worth a unique visual.
- **Root `opengraph-image.tsx` headline fix**: *"Explore Da Nang freely"* → *"Go explore Da Nang"* — "freely" is on `STOW_HUMANIZER_RULES.md`'s banned freedom/transformation list (Test 4). Found while in the file for the trust-safety image; fixed since it's a one-line, easily-reverted, already-documented rule violation rather than reopening a full approval round for one word.
- **Sitewide `keywords` meta array** expanded from 10 to 16 terms — added the trust/landmark/persona clusters this pass and the entity-topical-keyword-map doc surfaced (`trustworthy luggage storage Da Nang`, `safe luggage storage Da Nang`, `luggage storage near Marble Mountains`, `luggage storage Da Nang airport`, `monthly luggage storage Da Nang`, `suitcase storage Da Nang`). Noted honestly in a code comment that this tag carries ~zero direct Google ranking weight (deprecated since 2009) — kept aligned since it's free, not because it moves rank.

Not touched: `/intake` (staff-only, already `noindex`, correctly out of scope).
