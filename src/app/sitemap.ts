import type { MetadataRoute } from "next";

const BASE_URL = "https://www.stowdanang.com";

/* Guide slugs, kept in one list so new /guides/* pages are never missed in the
   sitemap. Add a slug here whenever a new guide page ships. */
const GUIDE_SLUGS = [
  "da-nang-itinerary",
  "where-to-stay-in-da-nang",
  "da-nang-vs-hoi-an",
  "da-nang-airport-guide",
  "getting-around-da-nang",
  "da-nang-food-guide",
  "best-beaches-in-da-nang",
  "best-time-to-visit-da-nang",
  "da-nang-with-kids",
  "son-tra-peninsula",
  "da-nang-to-hue-day-trip",
  "da-nang-nightlife",
  "da-nang-visa-run-guide",
  "da-nang-layover-guide",
  "marble-mountains-guide",
  "da-nang-to-hoi-an-day-trip",
  "ba-na-hills-day-trip",
];

/* /intake is excluded — staff-only walk-in form, already `robots: noindex`
   on the page itself (src/app/intake/page.tsx). Keeping it out of the
   sitemap too avoids sending crawl budget at a page we never want indexed. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const guideEntries: MetadataRoute.Sitemap = GUIDE_SLUGS.map((slug) => ({
    url: `${BASE_URL}/guides/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/trust-safety`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...guideEntries,
    {
      url: `${BASE_URL}/terms-of-service`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
