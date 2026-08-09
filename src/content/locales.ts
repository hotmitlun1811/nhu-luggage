/**
 * Locale registry — single source of truth for which locales exist and
 * which routes each one has, so the language switcher, the sitemap, and
 * hreflang tags all read from the same list and can't disagree (per the
 * i18n plan, decision #8).
 *
 * English lives unprefixed at the site root (not in INTL_LOCALES) — the
 * canonical domain, sitemap, robots.txt, JSON-LD @ids, and GSC property
 * were all built there before this migration and must not move (decision #1).
 */

export const INTL_LOCALES = ["ko", "zh"] as const;
export type IntlLocale = (typeof INTL_LOCALES)[number];
export type AppLocale = "en" | IntlLocale;

export const DEFAULT_LOCALE: AppLocale = "en";

export function isIntlLocale(value: string): value is IntlLocale {
  return (INTL_LOCALES as readonly string[]).includes(value);
}

/**
 * Which top-level pages exist per locale, right now — not what's planned.
 * Drives 3 things directly: the switcher (never link to a page that isn't
 * built), sitemap.ts's locale alternates, and each page's hreflang tags.
 * Update this the same commit a new locale route ships, not before.
 */
export const LOCALE_ROUTES: Record<AppLocale, readonly string[]> = {
  en: ["/", "/trust-safety", "/privacy-policy", "/terms-of-service"],
  ko: ["/"], // Phase 1 — homepage only. /ko/trust-safety lands in Phase 2.
  zh: [], // Not built yet — Phase 3.
};

/** Endonyms for the switcher — never flags (a flag maps a language to one country; Da Nang draws Korean/Chinese speakers from many). */
export const LOCALE_LABEL: Record<AppLocale, string> = {
  en: "EN",
  ko: "한국어",
  zh: "中文",
};

/** BCP-47 tags for hreflang and Intl.* date/number formatting. */
export const BCP47: Record<AppLocale, string> = {
  en: "en",
  ko: "ko-KR",
  zh: "zh-Hans",
};
