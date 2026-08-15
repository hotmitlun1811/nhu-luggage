import type { AppLocale } from "./locales";
import type { Dictionary } from "./types";

/**
 * Server-only by convention (not `import "server-only"`, since English
 * pages under (en)/ also call this and aren't inside the (intl)/[lang]
 * tree). Client components (HeroBookingForm, PrimaryNav, ConsentModal)
 * never call this directly — they receive an already-resolved dictionary
 * slice as a prop from their nearest server-component page, per the i18n
 * plan's decision #6. Shipping all three languages' dictionaries to
 * every visitor's browser would be the mistake this avoids.
 */
const loaders: Record<AppLocale, () => Promise<Dictionary>> = {
  en: async () => (await import("./en")).en,
  ko: async () => (await import("./ko")).ko,
  ja: async () => (await import("./ja")).ja,
  // zh: Phase 3 of the i18n plan — not built yet.
  zh: async () => (await import("./en")).en,
};

export async function getDictionary(locale: AppLocale): Promise<Dictionary> {
  return loaders[locale]();
}
