"use client";

import Link from "next/link";
import { INTL_LOCALES, LOCALE_LABEL, LOCALE_ROUTES, type AppLocale } from "@/content/locales";

/**
 * Shared between PrimaryNav and Footer (decision #8 of the i18n plan) —
 * one component, one source of truth (LOCALE_ROUTES), so the switcher
 * can never link somewhere the sitemap/hreflang don't also know about.
 *
 * `currentPath` is the canonical, locale-agnostic path ("/", "/trust-safety")
 * — never link to a route a locale doesn't have yet (Phase 1 ships /ko
 * with only "/"; falls back to that locale's homepage instead of a 404).
 * No flags — endonyms only, see locales.ts.
 */
export default function LanguageSwitcher({
  currentLocale,
  currentPath,
  variant = "nav",
}: {
  currentLocale: AppLocale;
  currentPath: string;
  variant?: "nav" | "footer";
}) {
  const allLocales: AppLocale[] = ["en", ...INTL_LOCALES];
  const buildable = allLocales.filter((loc) => loc === "en" || LOCALE_ROUTES[loc].length > 0);

  return (
    <div className="flex items-center gap-3" aria-label="Language">
      {buildable.map((loc, i) => {
        const isActive = loc === currentLocale;
        const hasRoute = LOCALE_ROUTES[loc].includes(currentPath);
        const href = loc === "en"
          ? currentPath
          : hasRoute
            ? currentPath === "/" ? `/${loc}` : `/${loc}${currentPath}`
            : `/${loc}`;

        return (
          <span key={loc} className="flex items-center gap-3">
            {i > 0 && (
              <span className={variant === "nav" ? "text-[#D1D5DB]" : "text-white/20"}>·</span>
            )}
            <Link
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={
                variant === "nav"
                  ? `text-[12px] font-semibold transition-colors ${
                      isActive ? "text-[#E8742C]" : "text-[#6B7280] hover:text-[#16243F]"
                    }`
                  : `text-[12px] font-medium transition-colors ${
                      isActive ? "text-[#E8742C]" : "text-white/50 hover:text-white"
                    }`
              }
            >
              {LOCALE_LABEL[loc]}
            </Link>
          </span>
        );
      })}
    </div>
  );
}
