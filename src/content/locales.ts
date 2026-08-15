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

/* Order here is the order the language menu lists them in. ja added
   2026-08-15 — the owner reports significant Japanese traffic. */
export const INTL_LOCALES = ["ko", "ja", "zh"] as const;
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
  ja: ["/"], // Homepage only, same scope as ko.
  zh: [], // Not built yet — Phase 3.
};

/** Endonyms for the switcher — the language's own name, never a translation of it. */
export const LOCALE_LABEL: Record<AppLocale, string> = {
  en: "EN",
  ko: "한국어",
  ja: "日本語",
  zh: "中文",
};

/**
 * Flag shown beside each endonym in the switcher (client request,
 * 2026-08-15). This reverses an earlier decision recorded here against
 * flags — the objection was that a flag names a country, not a language,
 * and Da Nang draws Korean/Japanese/Chinese speakers from more than one
 * of them. The endonym still carries the actual meaning; the flag is a
 * recognition aid on top of it, which is what the client asked for.
 *
 * English gets 🇬🇧 as the conventional stand-in — English has no single
 * country, and 🇬🇧 is the usual pick on Asian travel sites.
 *
 * Caveat: Windows ships no flag glyphs in Segoe UI Emoji, so Windows
 * browsers render these as two-letter codes ("GB", "KR"). That degrades
 * readably next to the endonym rather than breaking; swapping to inline
 * SVG flags is the fix if it ever matters enough.
 */
export const LOCALE_FLAG: Record<AppLocale, string> = {
  en: "🇬🇧",
  ko: "🇰🇷",
  ja: "🇯🇵",
  zh: "🇨🇳",
};

/** BCP-47 tags for hreflang and Intl.* date/number formatting. */
export const BCP47: Record<AppLocale, string> = {
  en: "en",
  ko: "ko-KR",
  ja: "ja",
  zh: "zh-Hans",
};
