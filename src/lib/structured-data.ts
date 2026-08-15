/**
 * Site-wide JSON-LD entity graph for Stow — one physical location selling
 * one service, so this lives in the root layout and describes the business
 * on every page rather than being re-declared per route.
 *
 * Architecture (see the research writeup for the full rationale):
 *   - LocalBusiness (#business) — the entity: NAP, geo, hours.
 *   - Service (#service) — what it sells, linked back via `provider`,
 *     with a 5-tier `hasOfferCatalog` mapping Stow's real hourly/daily/
 *     flat-rate pricing to extractable facts (kit's #3/#4 ranked signals:
 *     statistic density, table density).
 *
 * Deliberately NOT using `SelfStorage` as a secondary @type — checked the
 * schema.org definition ("a self-storage facility", i.e. long-term rented
 * units) against four real luggage-storage competitors' live markup and
 * none use it. A plain, precise LocalBusiness + an explicit Service beats
 * a plausible-sounding but mismatched type.
 *
 * Per aeo-audit-kit/02-page-checklist.md (MUST — Schema):
 *   - page-role schema present, `Organization.sameAs` linking every
 *     external entity, validates in Google Rich Results Test.
 *
 * `sameAs` — Google Business Profile added 2026-08-09 (local SEO audit,
 * docs/aeo-seo/2026-08-09-local-seo-audit.md). Add TripAdvisor and
 * Facebook URLs here as soon as those exist too; each one strengthens
 * entity resolution for AI answer engines.
 *
 * i18n (Phase 1, 2026-08-09) — split by what each field IS, per the i18n
 * plan's decision #7:
 *   - Identity/facts (@id, address, geo, telephone, sameAs, price) stay
 *     IDENTICAL across every locale. It's one business, not three —
 *     forking @id per locale would fragment the entity signal this graph
 *     exists to build.
 *   - description text and FAQPage content are locale-parameterized,
 *     read from the resolved Dictionary passed in by the caller (never
 *     fetched here — this module has no async/locale-loading of its own,
 *     matching the "pass a resolved dict down" pattern used by every
 *     component in this build).
 *   - faqPageJsonLd only emits a mainEntity for locales that actually
 *     have translated FAQ content — Google's own policy requires
 *     structured data to be a true representation of page content, and
 *     an /ko page not yet reviewed by a native speaker (still `noindex`)
 *     has nothing here to represent yet regardless.
 */

import type { Dictionary } from "@/content/types";
import { GOOGLE_MAPS_PLACE_URL } from "@/lib/maps";

const BASE_URL = "https://www.stowdanang.com";
const BUSINESS_ID = `${BASE_URL}/#business`;
const SERVICE_ID = `${BASE_URL}/#service`;

type StorageOffer = {
  name: string;
  price: number;
  unitText: string;
};

/* Source of truth for these five is src/components/sections/PricingSection.tsx —
   read the live component before ever editing this list again. (One already
   drifted: this used to say "Standard"/500,000₫/3 months, copied from a stale
   memory note instead of the actual component, which has said "Strand" and
   1,000,000₫/4 months since 2026-08-08, commit 2485a68 — a day before this
   schema was even written.) Locale-invariant — prices don't change by language. */
const STORAGE_PLANS: StorageOffer[] = [
  { name: "Hourly", price: 15000, unitText: "per hour, 1-hour minimum" },
  { name: "Daily", price: 60000, unitText: "per day, up to 24 hours" },
  { name: "Flat — Mini", price: 150000, unitText: "flat rate, up to 1 week" },
  { name: "Flat — Strand", price: 300000, unitText: "flat rate, up to 1 month" },
  { name: "Flat — Long Stay", price: 1000000, unitText: "flat rate, up to 4 months" },
];

/** The one entity — identical on every locale page it appears on. */
export function localBusinessJsonLd(dict: Dictionary) {
  const localBusiness = {
    "@type": "LocalBusiness",
    "@id": BUSINESS_ID,
    name: "Stow — Luggage Storage Da Nang",
    alternateName: "Stow Da Nang",
    description: dict.meta.businessDescription,
    url: BASE_URL,
    logo: `${BASE_URL}/logo-final.png`,
    /* Was `${BASE_URL}/opengraph-image` — broke during the i18n route-group
       restructure: Next.js appends a disambiguation hash to the served path
       for opengraph-image.tsx files nested inside a route group (verified:
       it now serves at /opengraph-image-<hash>, not the clean path), so the
       hardcoded URL here started 404ing. Pointing at the stable logo file
       instead — a real storefront/interior photo would be a better long-term
       value here once one exists (already on the local-SEO audit's shot list). */
    image: `${BASE_URL}/logo-final.png`,
    telephone: "+84905955161",
    email: "stowdanang@gmail.com",
    priceRange: "15.000₫–1.000.000₫",
    address: {
      "@type": "PostalAddress",
      streetAddress: "55 Bà Bang Nhãn",
      addressLocality: "Ngũ Hành Sơn",
      addressRegion: "Đà Nẵng",
      postalCode: "550000",
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 16.009581,
      longitude: 108.254455,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "07:00",
      closes: "22:00",
    },
    areaServed: {
      "@type": "City",
      name: "Da Nang",
    },
    /* The Maps URL is the canonical ?cid= form, not the share shortener —
       `sameAs` is an entity-resolution signal, and a redirector is a
       weaker one. (The previous https://share.google/… link was worse
       than weak: it 302s to a non-existent Maps path.) */
    sameAs: [
      "https://www.instagram.com/stowdanang/",
      GOOGLE_MAPS_PLACE_URL,
    ],
  };

  const luggageStorageService = {
    "@type": "Service",
    "@id": SERVICE_ID,
    name: "Luggage Storage Service",
    serviceType: "Luggage storage",
    description: dict.meta.serviceDescription,
    provider: { "@id": BUSINESS_ID },
    areaServed: {
      "@type": "City",
      name: "Da Nang",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Storage Plans",
      itemListElement: STORAGE_PLANS.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          priceCurrency: "VND",
          price: plan.price,
          unitText: plan.unitText,
        },
      })),
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [localBusiness, luggageStorageService],
  } as const;
}

/** Per-page BreadcrumbList for the sub-pages — cheap, correct, no content risk. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  } as const;
}

/** Homepage FAQPage — flattens the dictionary's grouped Q&A into schema.org's
 *  flat mainEntity list. Grouping is a visual/scannability affordance in
 *  FAQSection.tsx; schema.org's FAQPage has no concept of it. */
export function faqPageJsonLd(dict: Dictionary) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.groups.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      }))
    ),
  } as const;
}

/** Generic FAQPage builder for /guides/* pages — pass the exact same
 *  `items` array a page renders via <GuideFAQ items={...} /> so the schema
 *  can never drift from what's visibly on the page (the same discipline
 *  faqPageJsonLd above follows for the homepage). */
export function guideFaqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  } as const;
}
