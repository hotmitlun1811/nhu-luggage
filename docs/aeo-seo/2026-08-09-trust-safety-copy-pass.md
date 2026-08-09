# Trust & Safety copy pass — AUTHOR-tier proposal

**Status: PROPOSAL — not shipped.** Per Golden Rule #4 (AUTHOR-tier content needs an editorial brief, never ships unilaterally) — same pattern as `2026-08-09-author-content-brief.md`. Nothing below is live.

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

## What I need from you

1. **Approve/edit/reject** the 3 concrete diffs above (title/meta, subhead, new lead-in line).
2. Once approved, I'll wire it directly into `trust-safety/page.tsx` (the `TrustSafety.tsx` homepage line is a separate approval, already pending in the earlier brief).
