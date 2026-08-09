# Ready-to-paste profile copy — Google Business Profile, Facebook, Zalo OA

**Correction, same day:** the first version of this doc told you to *create* a Google Business Profile. That was wrong — Stow already has one, live: **[Stow - Luggage Storage Da Nang](https://share.google/4fTTPlY1pwqbLAvmB)** (Knowledge Graph entity `kgmid=/g/11z9561m6s`), owner-reported 5.0 rating. The original local-SEO audit missed it because the site's own Maps links pointed at a bare address pin and a dead text search instead of the real listing — both now fixed and wired into `sameAs`. See [[feedback-gbp-exists-verify-before-missing]] in memory for the full lesson. **Facebook Page and Zalo OA are still genuinely missing** — those sections below are unchanged.

---

## Google Business Profile — optimize the existing listing, don't create a new one

**Link:** https://share.google/4fTTPlY1pwqbLAvmB — already wired into the site (`sameAs`, "Get directions," "5.0 on Google").

I don't have dashboard access, so I can't see what's already filled in — this is a checklist to run against the real listing, not fresh copy to submit. Everything below is written to match the pricing/hours already live on the site, ready to paste into whichever fields are currently blank:

- **Category** — confirm it's set to `Luggage Storage Facility` (or the closest real label in the picker). If it's set to something that reads "self-storage," that's the same long-term-vs-hourly mismatch the on-site schema work already fixed once — worth correcting here too.
- **Description** (750-char limit, if not already set):
  > Stow is a luggage storage service in Ngũ Hành Sơn, Da Nang — 10 minutes from Da Nang Airport and steps from the Marble Mountains. Store your bags by the hour (15,000₫) or day (60,000₫) for sightseeing and layovers, or choose a flat-rate plan (from 150,000₫) for a week, a month, or a visa run. Every item gets a photo receipt and a unique ID tag at drop-off, and storage areas run on CCTV all day. Open 7am–10pm, every day including holidays. Message us on WhatsApp or Zalo to book ahead, or just walk in.
- **Services list** — add each individually if not already there (a real 2026 ranking factor, not just a formality):
  - Hourly luggage storage — 15,000₫
  - Daily luggage storage — 60,000₫
  - Weekly flat-rate storage — 150,000₫
  - Monthly flat-rate storage — 300,000₫
  - Long-stay storage (up to 4 months) — 1,000,000₫
  - Oversized item storage (surcharge)
- **Hours** — confirm they match the live site exactly: 7:00 AM–10:00 PM, every day, no holiday exceptions.
- **Photos** — storefront exterior/signage, the storage area itself, staff performing the tag-and-photo check-in process, if not already uploaded.
- **What I still need from you:** a dashboard screenshot (or just tell me) — exact review count, verified badge status, current category, and whether the fields above are already filled in. Those all feed the `AggregateRating` schema and the local-SEO audit's remaining "VERIFY" items.

---

## Facebook Page — still doesn't exist

**Page name:** `Stow`
**Category:** closest match to "Luggage Storage Service" / "Shipping & Package Service" in Facebook's category list — check what's actually offered when you create it.
**Short description / bio** (255-char limit):
> Luggage storage in Da Nang — hourly, daily, or flat-rate. 55 Bà Bang Nhãn, Ngũ Hành Sơn. Open 7am–10pm daily.

**Long "About" section** — same copy as the GBP description above, already written for this length.

**Website, phone, hours:** identical to GBP — this consistency is the whole point (NAP matching across every profile is what lets Google merge them into one entity).

---

## Zalo Official Account — still doesn't exist

Zalo is the highest-relevance Tier 1 platform in Vietnam per the audit (the default local-business contact surface, and the phone number is already Zalo-enabled). This one should reach a bilingual audience — English for tourists/expats, Vietnamese for the "gửi hành lý Đà Nẵng" search cluster identified in the keyword map.

**Name:** `Stow Đà Nẵng`

**Short intro (EN):**
> Luggage storage in Da Nang. Hourly (15,000₫), daily (60,000₫), or flat-rate weekly/monthly/long-stay plans (from 150,000₫). Open 7am–10pm every day.

**Short intro (VI) — draft, have a native speaker check this line before it goes live under your name:**
> Dịch vụ gửi hành lý tại Đà Nẵng. Theo giờ (15.000₫), theo ngày (60.000₫), hoặc trọn gói theo tuần/tháng (từ 150.000₫). Mở cửa 7h–22h mỗi ngày.

**Address, phone, hours:** identical to GBP/Facebook.

---

## Outstanding

1. **Facebook + Zalo** — create these, send me the URLs the moment they're live, I'll add both to `sameAs` immediately (GBP's already in there).
2. **Instagram bio** — still points to the old `stow-vn.vercel.app` URL, not `stowdanang.com`. Needs the Instagram app, not code.
3. **GBP dashboard facts** — exact review count, category, verified badge (see checklist above) — send a screenshot when you have a minute, unblocks `AggregateRating` schema.
4. **GSC/Bing Webmaster** — Bing's done (`BingSiteAuth.xml` live). Google Search Console still needs your account.
