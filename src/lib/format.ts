/**
 * Locale-aware date formatting for `HeroBookingForm.tsx` — replaces its 3
 * previously-hardcoded `toLocaleString("en-GB", …)` calls so the booking
 * form can render Korean/Chinese-formatted dates once those locales ship
 * (Phase 1+ of the i18n build). `IntakeForm.tsx`'s own date formatting is
 * deliberately left as-is: it's a staff-only tool that stays English
 * forever (per the i18n plan), so there's nothing to make locale-aware.
 */

export type AppLocale = "en" | "ko" | "zh";

const BCP47: Record<AppLocale, string> = {
  en: "en-GB",
  ko: "ko-KR",
  zh: "zh-CN",
};

/** e.g. "9 Aug 2026, 14:30" — used for the consent-modal audit trail. */
export function formatDateTime(d: Date, locale: AppLocale = "en"): string {
  return d.toLocaleString(BCP47[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** e.g. "9 Aug" — compact form for period ranges. */
export function formatShortDate(dateStr: string, locale: AppLocale = "en"): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString(BCP47[locale], {
    day: "numeric",
    month: "short",
  });
}

/** e.g. "Sun, 9 August 2026" — used for the drop-off date in the WhatsApp message. */
export function formatLongDate(dateStr: string, locale: AppLocale = "en"): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString(BCP47[locale], {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Picks the singular or plural form of a dictionary-provided word pair
 * based on count — English has real singular/plural ("1 hour" / "2
 * hours"); Korean/Chinese don't pluralize nouns this way, so their
 * dictionary entries just set `singular === plural` and this becomes a
 * no-op for them. No i18n library needed for a distinction this small.
 */
export function pluralizeWord(count: number, word: { singular: string; plural: string }): string {
  return count > 1 ? word.plural : word.singular;
}
