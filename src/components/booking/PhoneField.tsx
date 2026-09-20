"use client";

import { useMemo, useRef, useState } from "react";
import { Combobox } from "@base-ui/react/combobox";
import { Check, ChevronDown, Search } from "lucide-react";
import {
  COUNTRIES,
  COUNTRY_BY_ISO,
  DEFAULT_COUNTRY_ISO,
  flagEmoji,
  splitInternational,
} from "@/lib/countries";

// `search` / `compact`: the country's name in the page language, English and
// Vietnamese, folded (see fold) and joined by "|". `compact` also has the spaces
// removed, so "Viet Nam", "Việt Nam" and "vietnam" all find the same country.
type Option = { iso: string; dial: string; name: string; search: string; compact: string };

// Loose matching for the search box:
//  - accents don't matter: "Türkiye" matches "turkiye", "Côte d'Ivoire" matches "cote";
//  - katakana and hiragana are the same letters, so typing ベトナム or べとなむ both find it;
//  - NFD splits Hangul syllables into letters, so a half-typed 베ㅌ still matches 베트남.
const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\u30a1-\u30f6]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60))
    .toLowerCase();

/**
 * Search by country name (in the page language, English or Vietnamese), ISO
 * code ("vn"), or dial code ("84" or "+84").
 */
function matches(o: Option, query: string): boolean {
  const q = fold(query.trim());
  if (!q) return true;
  const digits = q.replace(/\D/g, "");
  const compactQ = q.replace(/\s+/g, "");
  return (
    o.search.includes(q) ||
    (compactQ.length > 0 && o.compact.includes(compactQ)) ||
    o.iso.toLowerCase() === q ||
    (digits.length > 0 && o.dial.slice(1).startsWith(digits))
  );
}

/**
 * Country-code picker + number box, the way global sites do it.
 *
 * The picker is a small searchable popup, not a native <select>: a native list
 * of ~140 countries opens as an enormous OS menu (huge on desktop, cut off at
 * the panel edge), which is what this replaces. Here the popup is capped at
 * 320px wide and about 260px tall on every screen, lists countries A to Z in
 * the page language, and can be searched by name or dial code. Country names
 * come from Intl.DisplayNames, so there is no name list to translate.
 *
 * On a phone the search box is NOT focused when the popup opens: that would
 * raise the keyboard over the list. Tapping a country is one tap; tapping the
 * search box is how you opt in to typing.
 */
export default function PhoneField({
  id,
  locale,
  iso,
  number,
  onIsoChange,
  onNumberChange,
  countryLabel,
  labels,
  placeholder,
  invalid = false,
  inputClassName,
}: {
  /** id of the number input (the parent's <label htmlFor> points here). */
  id: string;
  /** BCP-47 tag for country names, e.g. "en", "ko", "ja". */
  locale: string;
  iso: string;
  number: string;
  onIsoChange: (iso: string) => void;
  onNumberChange: (number: string) => void;
  countryLabel: string;
  labels: { search: string; empty: string };
  placeholder: string;
  invalid?: boolean;
  /** Styling of the number input, supplied by the form so every input matches. */
  inputClassName: string;
}) {
  const numberRef = useRef<HTMLInputElement>(null);
  // The search box is controlled, and only typing changes it. Left alone, Base
  // UI copies the selected country's name into it (and did so from whichever
  // country was selected when the field first mounted), so the picker opened
  // with "Vietnam" already typed and a one-item list. It now opens empty every
  // time, showing every country.
  const [query, setQuery] = useState("");

  // Every country, A to Z in the page language. Each also carries its English
  // and Vietnamese names as search aliases, so a Vietnamese visitor on the
  // English page can type "Hàn Quốc" for South Korea.
  const options = useMemo<Option[]>(() => {
    const namesIn = (tag: string) => {
      try { return new Intl.DisplayNames([tag], { type: "region" }); } catch { return null; } // old browser: fall back to codes
    };
    const shown = namesIn(locale);
    const aliasSources = [shown, namesIn("en"), namesIn("vi")];
    return COUNTRIES.map((c) => {
      const name = shown?.of(c.iso) ?? c.iso;
      const aliases = [name, ...aliasSources.slice(1).map((n) => n?.of(c.iso) ?? "")].filter(Boolean).map(fold);
      return { ...c, name, search: aliases.join("|"), compact: aliases.map((a) => a.replace(/\s+/g, "")).join("|") };
    }).sort((a, b) => a.name.localeCompare(b.name, locale));
  }, [locale]);

  const selectedIso = (COUNTRY_BY_ISO[iso] ?? COUNTRY_BY_ISO[DEFAULT_COUNTRY_ISO]).iso;
  const selected = useMemo(() => options.find((o) => o.iso === selectedIso) ?? null, [options, selectedIso]);
  const dial = COUNTRY_BY_ISO[selectedIso].dial;

  return (
    <div className="flex gap-2">
      <Combobox.Root
        items={options}
        value={selected}
        onValueChange={(o) => { if (o) onIsoChange(o.iso); }}
        inputValue={query}
        onInputValueChange={(v, details) => { if (details.reason === "input-change") setQuery(v); }}
        onOpenChange={() => setQuery("")}
        itemToStringLabel={(o: Option) => o.name}
        itemToStringValue={(o: Option) => o.iso}
        isItemEqualToValue={(a: Option, b: Option) => a.iso === b.iso}
        filter={matches}
      >
        <Combobox.Trigger
          aria-label={countryLabel}
          className={`flex flex-shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border bg-white/[0.07] pl-2.5 pr-2 text-[13px] text-white transition-colors focus-visible:border-[#E8742C]/70 focus-visible:outline-none data-[popup-open]:border-[#E8742C]/70 ${
            invalid ? "border-red-400/70" : "border-white/[0.12]"
          }`}
          style={{ fontFamily: "var(--font-inter)" }}
        >
          <span aria-hidden className="text-[15px] leading-none">{flagEmoji(selectedIso)}</span>
          <span aria-hidden>{dial}</span>
          <ChevronDown size={13} className="text-white/40" aria-hidden />
        </Combobox.Trigger>

        <Combobox.Portal>
          <Combobox.Positioner align="start" sideOffset={6} collisionPadding={12} className="z-[70] outline-none">
            <Combobox.Popup
              aria-label={countryLabel}
              // Desktop / keyboard: straight into the search box. Touch: leave
              // focus alone so the on-screen keyboard doesn't cover the list.
              initialFocus={(type) => type !== "touch"}
              // After choosing, carry on into the phone number.
              finalFocus={numberRef}
              className="w-[min(320px,calc(100vw-24px))] overflow-hidden rounded-xl border border-white/[0.16] bg-[#16243F] text-white shadow-2xl outline-none transition-opacity duration-100 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0"
              style={{ fontFamily: "var(--font-inter)", colorScheme: "dark" }}
            >
              <div className="relative border-b border-white/[0.10] p-2">
                <Search size={14} className="pointer-events-none absolute left-[18px] top-1/2 -translate-y-1/2 text-white/40" aria-hidden />
                <Combobox.Input
                  placeholder={labels.search}
                  aria-label={labels.search}
                  // Base UI deliberately ignores text while an input method (IME:
                  // Vietnamese Telex/VNI, Korean, Japanese) is still composing, and
                  // only filters once the word is committed. That left "Vietnam"
                  // sitting in the box, underlined, with the whole list unfiltered
                  // until space or Enter. Filter on every keystroke instead.
                  onChange={(e) => setQuery(e.currentTarget.value)}
                  // 16px on touch screens so iOS doesn't zoom the page on focus.
                  className="h-[34px] w-full rounded-lg border border-white/[0.12] bg-white/[0.07] pl-8 pr-2 text-[13px] text-white outline-none placeholder:text-white/30 focus:border-[#E8742C]/70 [@media(any-pointer:coarse)]:text-[16px]"
                />
              </div>
              <Combobox.Empty>
                <p className="px-3 py-4 text-[12px] text-white/45">{labels.empty}</p>
              </Combobox.Empty>
              <Combobox.List className="max-h-[min(260px,calc(var(--available-height)-56px))] overflow-y-auto overscroll-contain py-1">
                {(o: Option) => (
                  <Combobox.Item
                    key={o.iso}
                    value={o}
                    className="grid cursor-pointer grid-cols-[14px_20px_1fr_auto] items-center gap-2 px-3 py-1.5 text-[13px] outline-none data-[highlighted]:bg-white/10 data-[selected]:bg-[#E8742C]/[0.13]"
                  >
                    <Combobox.ItemIndicator className="col-start-1 flex text-[#E8742C]">
                      <Check size={13} strokeWidth={3} aria-hidden />
                    </Combobox.ItemIndicator>
                    <span aria-hidden className="col-start-2 text-[15px] leading-none">{flagEmoji(o.iso)}</span>
                    <span className="col-start-3 min-w-0 truncate">{o.name}</span>
                    <span className="col-start-4 text-[12px] text-white/45">{o.dial}</span>
                  </Combobox.Item>
                )}
              </Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>

      <input
        ref={numberRef}
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder={placeholder}
        value={number}
        aria-invalid={invalid || undefined}
        onChange={(e) => {
          const raw = e.target.value;
          // A full international number pasted or typed with "+" picks the
          // country and keeps only the local part.
          const intl = splitInternational(raw, selectedIso);
          if (intl) {
            onIsoChange(intl.iso);
            onNumberChange(intl.national);
            return;
          }
          onNumberChange(raw.replace(/[^\d\s-]/g, ""));
        }}
        className={`min-w-0 flex-1 ${inputClassName}`}
        style={{ fontFamily: "var(--font-inter)" }}
      />
    </div>
  );
}
