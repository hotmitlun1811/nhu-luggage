/**
 * Locale-aware date formatting for `HeroBookingForm.tsx` — replaces its 3
 * previously-hardcoded `toLocaleString("en-GB", …)` calls so the booking
 * form can render Korean/Japanese/Chinese-formatted dates once those
 * locales ship (Phase 1+ of the i18n build). `IntakeForm.tsx`'s own date formatting is
 * deliberately left as-is: it's a staff-only tool that stays English
 * forever (per the i18n plan), so there's nothing to make locale-aware.
 */

import type { AppLocale } from "@/content/locales";

export type { AppLocale };

/**
 * Deliberately NOT locales.ts's BCP47 map, despite the overlap.
 * That one feeds hreflang, where the correct English tag is the
 * region-less "en"; here we want "en-GB" so dates read "9 Aug 2026"
 * rather than "Aug 9, 2026" — the format this form has always used.
 * Same reasoning for zh: "zh-CN" formats dates, "zh-Hans" is a script
 * subtag hreflang wants. Two maps, two jobs; keep both in sync on the
 * locale KEYS (a missing key is a type error) but not on the values.
 */
const DATE_LOCALE: Record<AppLocale, string> = {
  en: "en-GB",
  ko: "ko-KR",
  ja: "ja-JP",
  zh: "zh-CN",
};

/** e.g. "9 Aug 2026, 14:30" — used for the consent-modal audit trail. */
export function formatDateTime(d: Date, locale: AppLocale = "en"): string {
  return d.toLocaleString(DATE_LOCALE[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** e.g. "9 Aug" — compact form for period ranges. */
export function formatShortDate(dateStr: string, locale: AppLocale = "en"): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString(DATE_LOCALE[locale], {
    day: "numeric",
    month: "short",
  });
}

/** e.g. "9 Aug 2026" — a short date that also names the year, for a span that crosses into another one. */
export function formatDateWithYear(dateStr: string, locale: AppLocale = "en"): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString(DATE_LOCALE[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** e.g. "Sun, 9 August 2026" — used for the drop-off date in the WhatsApp message. */
export function formatLongDate(dateStr: string, locale: AppLocale = "en"): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString(DATE_LOCALE[locale], {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** e.g. "Sun, 20 Sept" — the date line of a compact date-and-time field. */
export function formatWeekdayDate(dateStr: string, locale: AppLocale = "en"): string {
  return new Date(dateStr + "T12:00:00").toLocaleDateString(DATE_LOCALE[locale], {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

/** e.g. "September 2026" — the month title above the date-picker calendar. */
export function formatMonthYear(year: number, monthIndex: number, locale: AppLocale = "en"): string {
  return new Date(year, monthIndex, 1, 12).toLocaleDateString(DATE_LOCALE[locale], {
    month: "long",
    year: "numeric",
  });
}

/** Monday-first single-letter weekday names ("M T W T F S S"), for the calendar's header row. */
export function weekdayInitials(locale: AppLocale = "en"): string[] {
  // 1 Jan 2024 was a Monday, so days 1..7 walk Monday to Sunday.
  return Array.from({ length: 7 }, (_, i) =>
    new Date(2024, 0, 1 + i, 12).toLocaleDateString(DATE_LOCALE[locale], { weekday: "narrow" })
  );
}

/**
 * Picks the singular or plural form of a dictionary-provided word pair
 * based on count — English has real singular/plural ("1 hour" / "2
 * hours"); Korean/Japanese/Chinese don't pluralize nouns this way, so their
 * dictionary entries just set `singular === plural` and this becomes a
 * no-op for them. No i18n library needed for a distinction this small.
 */
export function pluralizeWord(count: number, word: { singular: string; plural: string }): string {
  return count > 1 ? word.plural : word.singular;
}

/**
 * Fills {name} placeholders in a dictionary sentence. The values go where each
 * language's grammar wants them, which fixed prefix/suffix pairs can't do.
 * An unknown placeholder is left as written so a typo shows up on screen.
 */
export function fillTemplate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (whole, key: string) => (key in values ? String(values[key]) : whole));
}
