import type { MetadataRoute } from "next";

const BASE_URL = "https://www.stowdanang.com";

/* ── AEO note ──
   These 10 UAs are the ones AI answer engines actually crawl/browse with
   (see aeo-audit-kit/04-bot-fetch-commands.md). We name them explicitly
   rather than relying on the wildcard so a future blanket-disallow rule
   added under `*` can't silently take AI citations out with it. */
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/intake", "/api/"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      { userAgent: AI_BOTS, allow: "/", disallow },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
