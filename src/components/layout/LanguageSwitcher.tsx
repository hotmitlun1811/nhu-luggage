"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, ChevronDown, Globe } from "lucide-react";
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
 *
 * Presented as a labelled dropdown rather than the bare "EN · 한국어" text
 * links this replaced. Those failed on three counts: nothing marked them
 * as a control, the only signal for the active language was a colour
 * change, and in the nav's unscrolled state they rendered mid-grey on a
 * dark photo — the inactive language was effectively invisible. A menu
 * also scales to zh (Phase 3) without turning the nav into a row of
 * dot-separated words.
 */

type Tone = "onDark" | "onLight";

export default function LanguageSwitcher({
  currentLocale,
  currentPath,
  label = "Language",
  tone = "onLight",
  align = "down",
  anchor = "right",
}: {
  currentLocale: AppLocale;
  currentPath: string;
  /** Translated word for "Language" — screen-reader label on the trigger. */
  label?: string;
  /** Which surface it sits on, so it stays legible on the hero photo, the white scrolled nav, and the navy footer alike. */
  tone?: Tone;
  /** Footer sits at the page bottom, so its menu opens upward. */
  align?: "down" | "up";
  /** Which edge the menu is anchored to. Right by default (nav/footer sit
   *  at the right edge); the mobile drawer's trigger is left-aligned, where
   *  a right-anchored menu would hang off the left of the screen. */
  anchor?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const allLocales: AppLocale[] = ["en", ...INTL_LOCALES];
  const buildable = allLocales.filter((loc) => loc === "en" || LOCALE_ROUTES[loc].length > 0);

  function hrefFor(loc: AppLocale) {
    if (loc === "en") return currentPath;
    const hasRoute = LOCALE_ROUTES[loc].includes(currentPath);
    if (!hasRoute) return `/${loc}`;
    return currentPath === "/" ? `/${loc}` : `/${loc}${currentPath}`;
  }

  // Dismiss on outside click and on Escape. Escape returns focus to the
  // trigger so keyboard users aren't dropped at the top of the document.
  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: MouseEvent | TouchEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Arrow keys move between options once the menu is open — expected of
  // anything exposing role="menu".
  function onMenuKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const next = e.key === "ArrowDown"
      ? (index + 1) % buildable.length
      : (index - 1 + buildable.length) % buildable.length;
    itemRefs.current[next]?.focus();
  }

  const onDark = tone === "onDark";

  const triggerClass = [
    "inline-flex items-center gap-1.5 rounded-[4px] border px-2.5 py-1.5 text-[12px] font-semibold transition-colors",
    onDark
      ? "border-white/25 bg-white/[0.08] text-white hover:border-white/45 hover:bg-white/[0.16]"
      : "border-[#E2E2DE] bg-white text-[#16243F] hover:border-[#C9C9C4] hover:bg-[#F4F4F0]",
  ].join(" ");

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${label}: ${LOCALE_LABEL[currentLocale]}`}
        className={triggerClass}
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        <Globe size={14} className={onDark ? "text-[#E8742C]" : "text-[#E8742C]"} aria-hidden="true" />
        <span>{LOCALE_LABEL[currentLocale]}</span>
        <ChevronDown
          size={13}
          aria-hidden="true"
          className={`transition-transform ${open ? "rotate-180" : ""} ${onDark ? "opacity-70" : "opacity-50"}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label={label}
          className={`absolute z-50 min-w-[148px] overflow-hidden rounded-lg border border-[#E2E2DE] bg-white py-1 shadow-xl ${
            anchor === "left" ? "left-0" : "right-0"
          } ${align === "up" ? "bottom-full mb-2" : "top-full mt-2"}`}
        >
          {buildable.map((loc, i) => {
            const isActive = loc === currentLocale;
            return (
              <Link
                key={loc}
                ref={(el) => { itemRefs.current[i] = el; }}
                href={hrefFor(loc)}
                role="menuitem"
                lang={loc}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setOpen(false)}
                onKeyDown={(e) => onMenuKeyDown(e, i)}
                className={`flex items-center justify-between gap-3 px-3 py-2 text-[13px] transition-colors ${
                  isActive
                    ? "font-semibold text-[#E8742C]"
                    : "font-medium text-[#16243F] hover:bg-[#F4F4F0]"
                }`}
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <span>{LOCALE_LABEL[loc]}</span>
                {isActive && <Check size={14} aria-hidden="true" className="flex-shrink-0" />}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
