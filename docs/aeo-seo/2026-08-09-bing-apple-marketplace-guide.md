# Bing Places, Apple Business Connect & Marketplace Listings — guided setup

**Scope:** Phase 3 (Bing/Apple) + the marketplace row of the Tier 2 citation sweep from `2026-08-09-local-seo-audit.md`. Follows `01-local-audit-sop.md` and `04-citation-audit-and-tracker.md` from the local-seo-kit.
**Audit confirmed 2026-08-09:** owner confirmed directly (not just inferred from public search, per the GBP lesson — [[feedback-gbp-exists-verify-before-missing]]) that none of Bing Places, Apple Business Connect, Stasher, Nannybag, or Radical Storage exist for Stow yet. All five are genuine from-scratch creates, not corrections.

Canonical facts to use everywhere below (from `02-nap-source-of-truth.md` / the locked audit NAP — don't retype from memory, this is the source):
```
Name     : Stow  (recommended — matches the "no keyword stuffing" guideline; confirm against actual shop signage before submitting anywhere)
Address  : 55 Bà Bang Nhãn, Ngũ Hành Sơn, Đà Nẵng 550000, Vietnam
Phone    : +84 905 955 161
Website  : https://www.stowdanang.com
Hours    : 7:00 AM – 10:00 PM, every day including public holidays
Category : Luggage Storage Facility (or closest predefined match per platform)
```

---

## 1. Bing Places — do this first (fastest, lowest-effort)

**bingplaces.com**

Bing Places is a straightforward directory claim — same shape as GBP, no revenue-share decision attached. Fastest path exists now that GBP is live and verified: Bing offers a direct import.

1. Go to **bingplaces.com**, sign in with a Microsoft account (create one if needed — can be a fresh one just for the business, doesn't need to match the Gmail used elsewhere).
2. Search "Stow" + the address first, to check whether Bing already auto-generated a placeholder listing from Google/aggregator data (common — claim it if one exists rather than creating a duplicate; duplicates split ranking, same rule as Google).
3. If nothing exists: **Add a Business**, then look for **"Import from Google My Business"** (Bing's own naming, GBP's old name) — this pulls NAP, hours, and category directly from the now-live GBP, so it can't drift from what's already correct there. Use it if offered.
4. If import isn't offered, enter the canonical facts above manually. Category: search for "Luggage Storage" — if Bing's list doesn't have that exact term, "Storage Facility" is the fallback (same reasoning as GBP).
5. Verification is typically instant or same-day when the data matches an existing Google listing; otherwise Bing verifies by phone call or postcard, similar to Google.
6. Once verified, get the listing's share URL from the dashboard and send it over — same pattern as the GBP fix: I'll add it to `structured-data.ts` `sameAs` and update the citation tracker.

**Why bother, concretely:** Bing Places feeds both Bing's own search results and Copilot — per the kit's AI-era research, ChatGPT pulls local data from Bing (not Google), so this is the single highest-leverage move for ChatGPT visibility specifically, not just a redundant Google copy.

---

## 2. Apple Business Connect — second (feeds Apple Maps + Siri)

**businessconnect.apple.com**

1. Sign in with an Apple ID (a personal one is fine for a solo/small operator — no business Apple ID required to start).
2. Search the business name + address first — same duplicate-check logic as Bing. Apple Maps sometimes has a data-provider-sourced placeholder already.
3. If none exists: **Add a business** or **Add a location**, enter the canonical facts above. Apple's category list tends to be broader than Google's — look for "Luggage Storage" or "Storage" as the primary category.
4. Add photos if you have them ready (storefront, drop-off counter) — Apple Business Connect weights photo completeness more visibly in its own dashboard UI than Google does.
5. Verification: usually a phone call/text to the listed number, sometimes near-instant for a real, findable street address. Occasionally requires a brief domain-ownership check (a meta tag or DNS TXT record on stowdanang.com) if Apple can't otherwise confirm you're the site owner — if that comes up, send it over and I'll add it directly, it's a 2-minute code change.
6. This is the one that matters most for the **tourist half of Stow's audience** specifically — Apple Maps + Siri are the default on iPhone, and a large share of Western tourists in Da Nang are on iPhone. Skipping this is skipping a real chunk of the actual customer base, not just a citation checkbox.

---

## 3. Marketplace listings — a business decision first, a citation second

**Stop here before applying to any of these.** Unlike Bing/Apple, these three are not free directory claims — they're commission-based partnerships where Stow becomes a bookable location *inside someone else's platform*, and that platform takes a cut of every booking that comes through it. Worth deciding deliberately, not just checking a box, because it changes how bookings and revenue flow.

### What's actually being decided

| | What you get | What it costs |
|---|---|---|
| A citation (this session's framing) | A backlink + brand mention on a high-traffic travel site — real local-SEO value | Nothing directly |
| A marketplace listing (what actually happens) | The above, **plus** a live booking channel bringing in customers who never see stowdanang.com at all | A commission on every booking made through that channel — see rates below |

That second column is the real decision. It's not "should Stow have a citation on Stasher" — it's "should Stow accept walk-in-style bookings from Stasher's app, at Stasher's commission, alongside the direct bookings the site already drives." Both are legitimate answers; worth being explicit which one you're choosing.

### The three, compared (researched directly from each platform, 2026-08-09)

| Platform | Host term | Revenue split | Space/hours requirement | Notes |
|---|---|---|---|---|
| **Stasher** | "Host" | 100% of the online price stays with Stasher's own pricing model; hosts earn **commission** — real examples cited on their own site range up to ~£3,000/month for busy spots, even a 2m² space cited at ~£900/month | Min. 2m², secure/supervised area, no public access to bags | Stasher **provides insurance** covering theft/loss/damage while stored — the one of the three that explicitly covers this |
| **Nannybag** | "Nanny" | **50/50 split** — stated directly on their host page: customer pays ~€6/bag/day, host keeps half | Dedicated storage area, fixed drop-off/pickup hours | Simplest stated application (5 steps, no fees), most transparent commission math of the three |
| **Radical Storage** | "Angel" | **~10% commission** to the host per third-party sources (not confirmed directly on their own page — verify the exact figure during application before committing) | Not fully published — confirm during application | Explicitly **selective**: their own copy says only "a few" scouted businesses become Angels — not a guaranteed acceptance the way the other two are |

**A real tension worth naming:** Stasher and Nannybag's numbers put the *host's* cut at roughly half or more of a low price point (~€3–15 depending on duration) — compare that against Stow's own direct rates (15,000₫/hr ≈ €0.55, 60,000₫/day ≈ €2.20, or the flat-rate plans from 150,000₫ ≈ €5.50/week). A marketplace booking at marketplace pricing could net Stow **less per bag** than a walk-in or WhatsApp booking at Stow's own posted rates, in exchange for volume/discovery Stow doesn't have yet off-platform. That's a real trade to weigh, not a reason to avoid it outright — new, low-citation businesses often take the volume trade deliberately in year one.

### Recommendation, if it helps decide

Given Stow is 2 months old with close to zero off-platform discovery (the whole premise of this audit), the citation + discovery value likely outweighs the commission cost early on — the kit's own research (file 06) ranks appearing across multiple "best of" / curated lists as a top-5 AI-visibility signal, and these marketplaces function as exactly that kind of curated list for LLMs like ChatGPT and Perplexity, on top of the direct booking traffic. **Nannybag first** — clearest terms, simplest application, best-documented 50/50 split. Stasher second — real insurance coverage is a genuine safety net worth having regardless of volume. Radical Storage third, and only if the first two are worth the operational lift — it's selective and the commission terms are the least confirmed of the three.

### Application steps (once you've decided which to pursue)

1. **Nannybag** — nannybag.com/en/keep-luggage → "Become a Nanny." 5 steps: confirm business suitability, estimate storage capacity, complete registration, set bank details for payouts, wait for approval. No fees.
2. **Stasher** — stasher.com/becomeahost → free signup, approval typically within a few hours, onboarding guidance by email.
3. **Radical Storage** — look for "Become an Angel" via radicalstorage.com (their host page is JS-heavy and didn't render cleanly for me to link the exact current URL — search "Radical Storage become an angel" from the site itself to find the live application form) → fill the Angel application, wait for review.

For all three: use the canonical NAP block at the top of this doc exactly, set hours to the real 7am–10pm, and **do not** overcommit capacity beyond what the physical space (Lane 1 short-term zone + Lane 2 locked zone) can actually hold — overbooking a marketplace slot and turning away a paying marketplace customer is worse for the relationship than a lower initial capacity number.

---

## What happens after each is live

Same pattern as GBP: send me the resulting listing URL for each (Bing share link, Apple Maps link, and/or the marketplace listing page) and I'll:
1. Verify NAP matches canonical.
2. Add each to `structured-data.ts` `sameAs`.
3. Update `citation-tracker.csv` from Missing → Match.
4. Correct the local SEO audit's baseline counts, same way the GBP correction was handled — logged, not silently edited.
