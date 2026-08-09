/**
 * Site-wide JSON-LD entity for Stow — one physical location, so this lives
 * in the root layout and describes the business on every page rather than
 * being re-declared per route.
 *
 * Per aeo-audit-kit/02-page-checklist.md (MUST — Schema):
 *   - page-role schema present, `Organization.sameAs` linking every
 *     external entity, validates in Google Rich Results Test.
 *
 * `sameAs` currently only lists Instagram — add the Google Business
 * Profile, TripAdvisor, and Facebook URLs here as soon as those exist;
 * each one strengthens entity resolution for AI answer engines.
 */
export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "SelfStorage"],
  name: "Stow — Luggage Storage Da Nang",
  alternateName: "Stow Da Nang",
  description:
    "Safe, simple luggage storage in Da Nang, Vietnam. Hourly and daily plans for tourists, flat-rate weekly and monthly plans for expats and visa runners. CCTV monitored, open 7am–10pm every day.",
  url: "https://stowdanang.com",
  logo: "https://stowdanang.com/logo-final.png",
  image: "https://stowdanang.com/opengraph-image",
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
} as const;
