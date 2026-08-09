import type { MetadataRoute } from "next";

const BASE_URL = "https://www.stowdanang.com";

/* /intake is excluded — staff-only walk-in form, already `robots: noindex`
   on the page itself (src/app/intake/page.tsx). Keeping it out of the
   sitemap too avoids sending crawl budget at a page we never want indexed. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

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
