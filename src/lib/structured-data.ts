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
 * `sameAs` currently only lists Instagram — add the Google Business
 * Profile, TripAdvisor, and Facebook URLs here as soon as those exist;
 * each one strengthens entity resolution for AI answer engines.
 *
 * Not shipped here (see backlog in the research writeup — needs real data,
 * not code): AggregateRating (needs real review counts), FAQPage (needs
 * visible Q&A body copy — Google also killed the FAQ rich result in
 * May 2026, so this is no longer a quick win either way).
 */

const BASE_URL = "https://stowdanang.com";
const BUSINESS_ID = `${BASE_URL}/#business`;
const SERVICE_ID = `${BASE_URL}/#service`;

type StorageOffer = {
  name: string;
  price: number;
  unitText: string;
};

const STORAGE_PLANS: StorageOffer[] = [
  { name: "Hourly", price: 15000, unitText: "per hour, 1-hour minimum" },
  { name: "Daily", price: 60000, unitText: "per day, up to 24 hours" },
  { name: "Flat — Mini", price: 150000, unitText: "flat rate, up to 1 week" },
  { name: "Flat — Standard", price: 300000, unitText: "flat rate, up to 1 month" },
  { name: "Flat — Long Stay", price: 500000, unitText: "flat rate, up to 3 months" },
];

const localBusiness = {
  "@type": "LocalBusiness",
  "@id": BUSINESS_ID,
  name: "Stow — Luggage Storage Da Nang",
  alternateName: "Stow Da Nang",
  description:
    "Safe, simple luggage storage in Da Nang, Vietnam. Hourly and daily plans for tourists, flat-rate weekly and monthly plans for expats and visa runners. CCTV monitored, open 7am–10pm every day.",
  url: BASE_URL,
  logo: `${BASE_URL}/logo-final.png`,
  image: `${BASE_URL}/opengraph-image`,
  telephone: "+84905955161",
  email: "stowdanang@gmail.com",
  priceRange: "15.000₫–500.000₫",
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
  sameAs: ["https://www.instagram.com/stowdanang/"],
};

const luggageStorageService = {
  "@type": "Service",
  "@id": SERVICE_ID,
  name: "Luggage Storage Service",
  serviceType: "Luggage storage",
  description:
    "Two pricing lanes: pay-per-time (hourly/daily) for tourists and day-trippers, flat-rate (weekly/monthly/long-stay) for expats and visa runners. +30,000₫ oversized-item surcharge on hourly/daily plans, +50,000₫ on flat plans.",
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

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@graph": [localBusiness, luggageStorageService],
} as const;

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
