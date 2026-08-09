# Ready-to-paste profile copy — Google Business Profile, Facebook, Zalo OA

**Status: PROPOSAL — none of these profiles exist yet** (per [`2026-08-09-local-seo-audit.md`](2026-08-09-local-seo-audit.md), P1 gap #1). This is copy-paste-ready for the moment you (or whoever has owner access) creates each one. I can't create these myself — they need your identity to verify.

**One rule that applies to all three:** keep the *name field* itself short — **"Stow"** — not the keyword-stuffed full name. The audit flagged this: Google's guideline is the real-world name as it appears on signage, and a name like "Stow — Luggage Storage Da Nang" in the name field risks a guideline flag. Let category + description carry the keywords. **Confirm "Stow" matches your actual shopfront signage before submitting anywhere.**

The moment each profile is live, send me the URL — it goes straight into `sameAs` in `src/lib/structured-data.ts`, which is currently Instagram-only.

---

## Google Business Profile

**Name:** `Stow`
**Primary category:** `Luggage Storage Facility` — confirm this exact label exists in your category picker when you get there; if it doesn't, the audit's fallback is anything closer to "storage" than "self-storage" (self-storage reads long-term rented units, which caused the schema.org type mismatch fixed in the on-site work).
**Address:** `55 Bà Bang Nhãn, Ngũ Hành Sơn, Đà Nẵng 550000, Vietnam`
**Phone:** `+84 905 955 161`
**Website:** `https://www.stowdanang.com`
**Hours:** `7:00 AM – 10:00 PM`, every day, no holiday exceptions
**Business type:** Storefront (has a physical location customers visit) — not "service area business." Confirm 55 Bà Bang Nhãn is a dedicated, staffed, client-facing space before submitting (the audit's one unresolved open item).

**Description** (750-char limit, plain text, no keyword stuffing):
> Stow is a luggage storage service in Ngũ Hành Sơn, Da Nang — 10 minutes from Da Nang Airport and steps from the Marble Mountains. Store your bags by the hour (15,000₫) or day (60,000₫) for sightseeing and layovers, or choose a flat-rate plan (from 150,000₫) for a week, a month, or a visa run. Every item gets a photo receipt and a unique ID tag at drop-off, and storage areas run on CCTV all day. Open 7am–10pm, every day including holidays. Message us on WhatsApp or Zalo to book ahead, or just walk in.

**Services to add** (GBP's Services feature — add every one individually, not just as one line; this is a real 2026 ranking factor per the audit):
- Hourly luggage storage — 15,000₫
- Daily luggage storage — 60,000₫
- Weekly flat-rate storage — 150,000₫
- Monthly flat-rate storage — 300,000₫
- Long-stay storage (up to 3 months) — 500,000₫
- Oversized item storage (surcharge)

**Photos to shoot before launch** (audit's Phase 6 recommendation): storefront exterior/signage, the storage area itself, staff performing the tag-and-photo check-in process. Real photos, not stock — this is a trust signal Google and customers both weigh.

---

## Facebook Page

**Page name:** `Stow`
**Category:** closest match to "Luggage Storage Service" / "Shipping & Package Service" in Facebook's category list — check what's actually offered when you create it.
**Short description / bio** (255-char limit):
> Luggage storage in Da Nang — hourly, daily, or flat-rate. 55 Bà Bang Nhãn, Ngũ Hành Sơn. Open 7am–10pm daily.

**Long "About" section** — same copy as the GBP description above, it's already written for this length.

**Website, phone, hours:** identical to GBP — this consistency is the whole point (NAP matching across every profile is what lets Google merge them into one entity).

---

## Zalo Official Account

Zalo is the highest-relevance Tier 1 platform in Vietnam per the audit (the default local-business contact surface, and the phone number is already Zalo-enabled). This one should reach a bilingual audience — English for tourists/expats, Vietnamese for the "gửi hành lý Đà Nẵng" search cluster identified in the keyword map.

**Name:** `Stow Đà Nẵng`

**Short intro (EN):**
> Luggage storage in Da Nang. Hourly (15,000₫), daily (60,000₫), or flat-rate weekly/monthly/long-stay plans (from 150,000₫). Open 7am–10pm every day.

**Short intro (VI) — draft, have a native speaker check this line before it goes live under your name:**
> Dịch vụ gửi hành lý tại Đà Nẵng. Theo giờ (15.000₫), theo ngày (60.000₫), hoặc trọn gói theo tuần/tháng (từ 150.000₫). Mở cửa 7h–22h mỗi ngày.

**Address, phone, hours:** identical to GBP/Facebook.

---

## After you create these

1. Send me each profile URL — I'll add it to `sameAs` in `structured-data.ts` immediately.
2. Fix the Instagram bio link at the same time if you haven't already (still points to the old `stow-vn.vercel.app` URL, per the local-SEO audit) — that one's on you, needs the Instagram app, not code.
3. Once GBP has been live a few weeks and picks up real reviews, tell me the count/rating and I'll add real `AggregateRating` schema — not before, per Google's policy on fabricated review markup.
