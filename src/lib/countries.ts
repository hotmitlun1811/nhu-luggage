/**
 * Country calling codes for the booking form's WhatsApp field.
 *
 * Only the ISO 3166-1 code and the dial code live here. The country NAME is
 * not stored: it comes from `Intl.DisplayNames` in the visitor's own language
 * (see PhoneField), so there is no translation table to keep in sync and the
 * list reads correctly in English, Korean and Japanese for free.
 *
 * Covers the countries Stow's guests actually come from, plus the rest of
 * the world's main ones. Shared codes are fine (the +1 countries, Russia and
 * Kazakhstan on +7): the ISO code is the unique key, the dial code is not.
 * Caribbean +1-xxx territories are left out on purpose; they dial as +1 and
 * a guest there can pick United States.
 */
export type Country = { iso: string; dial: string };

export const COUNTRIES: readonly Country[] = [
  { iso: "AF", dial: "+93" }, { iso: "AL", dial: "+355" }, { iso: "DZ", dial: "+213" },
  { iso: "AD", dial: "+376" }, { iso: "AO", dial: "+244" }, { iso: "AR", dial: "+54" },
  { iso: "AM", dial: "+374" }, { iso: "AU", dial: "+61" }, { iso: "AT", dial: "+43" },
  { iso: "AZ", dial: "+994" }, { iso: "BH", dial: "+973" }, { iso: "BD", dial: "+880" },
  { iso: "BY", dial: "+375" }, { iso: "BE", dial: "+32" }, { iso: "BT", dial: "+975" },
  { iso: "BO", dial: "+591" }, { iso: "BA", dial: "+387" }, { iso: "BR", dial: "+55" },
  { iso: "BN", dial: "+673" }, { iso: "BG", dial: "+359" }, { iso: "KH", dial: "+855" },
  { iso: "CM", dial: "+237" }, { iso: "CA", dial: "+1" }, { iso: "CL", dial: "+56" },
  { iso: "CN", dial: "+86" }, { iso: "CO", dial: "+57" }, { iso: "CR", dial: "+506" },
  { iso: "CI", dial: "+225" }, { iso: "HR", dial: "+385" }, { iso: "CU", dial: "+53" },
  { iso: "CY", dial: "+357" }, { iso: "CZ", dial: "+420" }, { iso: "DK", dial: "+45" },
  { iso: "DO", dial: "+1" }, { iso: "EC", dial: "+593" }, { iso: "EG", dial: "+20" },
  { iso: "SV", dial: "+503" }, { iso: "EE", dial: "+372" }, { iso: "ET", dial: "+251" },
  { iso: "FJ", dial: "+679" }, { iso: "FI", dial: "+358" }, { iso: "FR", dial: "+33" },
  { iso: "PF", dial: "+689" }, { iso: "GE", dial: "+995" }, { iso: "DE", dial: "+49" },
  { iso: "GH", dial: "+233" }, { iso: "GR", dial: "+30" }, { iso: "GU", dial: "+1" },
  { iso: "GT", dial: "+502" }, { iso: "HN", dial: "+504" }, { iso: "HK", dial: "+852" },
  { iso: "HU", dial: "+36" }, { iso: "IS", dial: "+354" }, { iso: "IN", dial: "+91" },
  { iso: "ID", dial: "+62" }, { iso: "IR", dial: "+98" }, { iso: "IQ", dial: "+964" },
  { iso: "IE", dial: "+353" }, { iso: "IL", dial: "+972" }, { iso: "IT", dial: "+39" },
  { iso: "JM", dial: "+1" }, { iso: "JP", dial: "+81" }, { iso: "JO", dial: "+962" },
  { iso: "KZ", dial: "+7" }, { iso: "KE", dial: "+254" }, { iso: "KW", dial: "+965" },
  { iso: "KG", dial: "+996" }, { iso: "LA", dial: "+856" }, { iso: "LV", dial: "+371" },
  { iso: "LB", dial: "+961" }, { iso: "LY", dial: "+218" }, { iso: "LI", dial: "+423" },
  { iso: "LT", dial: "+370" }, { iso: "LU", dial: "+352" }, { iso: "MO", dial: "+853" },
  { iso: "MG", dial: "+261" }, { iso: "MY", dial: "+60" }, { iso: "MV", dial: "+960" },
  { iso: "MT", dial: "+356" }, { iso: "MU", dial: "+230" }, { iso: "MX", dial: "+52" },
  { iso: "MD", dial: "+373" }, { iso: "MC", dial: "+377" }, { iso: "MN", dial: "+976" },
  { iso: "ME", dial: "+382" }, { iso: "MA", dial: "+212" }, { iso: "MM", dial: "+95" },
  { iso: "NP", dial: "+977" }, { iso: "NL", dial: "+31" }, { iso: "NC", dial: "+687" },
  { iso: "NZ", dial: "+64" }, { iso: "NI", dial: "+505" }, { iso: "NG", dial: "+234" },
  { iso: "MK", dial: "+389" }, { iso: "NO", dial: "+47" }, { iso: "OM", dial: "+968" },
  { iso: "PK", dial: "+92" }, { iso: "PS", dial: "+970" }, { iso: "PA", dial: "+507" },
  { iso: "PG", dial: "+675" }, { iso: "PY", dial: "+595" }, { iso: "PE", dial: "+51" },
  { iso: "PH", dial: "+63" }, { iso: "PL", dial: "+48" }, { iso: "PT", dial: "+351" },
  { iso: "PR", dial: "+1" }, { iso: "QA", dial: "+974" }, { iso: "RO", dial: "+40" },
  { iso: "RU", dial: "+7" }, { iso: "RW", dial: "+250" }, { iso: "SA", dial: "+966" },
  { iso: "SN", dial: "+221" }, { iso: "RS", dial: "+381" }, { iso: "SG", dial: "+65" },
  { iso: "SK", dial: "+421" }, { iso: "SI", dial: "+386" }, { iso: "ZA", dial: "+27" },
  { iso: "KR", dial: "+82" }, { iso: "ES", dial: "+34" }, { iso: "LK", dial: "+94" },
  { iso: "SE", dial: "+46" }, { iso: "CH", dial: "+41" }, { iso: "SY", dial: "+963" },
  { iso: "TW", dial: "+886" }, { iso: "TJ", dial: "+992" }, { iso: "TZ", dial: "+255" },
  { iso: "TH", dial: "+66" }, { iso: "TL", dial: "+670" }, { iso: "TN", dial: "+216" },
  { iso: "TR", dial: "+90" }, { iso: "TM", dial: "+993" }, { iso: "UG", dial: "+256" },
  { iso: "UA", dial: "+380" }, { iso: "AE", dial: "+971" }, { iso: "GB", dial: "+44" },
  { iso: "US", dial: "+1" }, { iso: "UY", dial: "+598" }, { iso: "UZ", dial: "+998" },
  { iso: "VE", dial: "+58" }, { iso: "VN", dial: "+84" }, { iso: "YE", dial: "+967" },
  { iso: "ZM", dial: "+260" }, { iso: "ZW", dial: "+263" },
];

export const COUNTRY_BY_ISO: Record<string, Country> = Object.fromEntries(COUNTRIES.map((c) => [c.iso, c]));

/** Shop is in Da Nang, so this is the fallback when nothing better is known. */
export const DEFAULT_COUNTRY_ISO = "VN";

/** "VN" → 🇻🇳. Regional-indicator letters; Windows shows the two letters instead of a flag. */
export function flagEmoji(iso: string): string {
  return String.fromCodePoint(...[...iso.toUpperCase()].map((c) => 127397 + c.charCodeAt(0)));
}

/**
 * A pasted "+84 905 955 161" should pick Vietnam and leave "905 955 161", not
 * end up as "+84" typed into the number box. Longest dial-code match wins
 * (so "+886…" is Taiwan, not "+8"), and the currently selected country is
 * kept when it shares the code (+1 stays Canada if Canada was picked).
 */
export function splitInternational(raw: string, currentIso: string): { iso: string; national: string } | null {
  const digits = raw.replace(/\D/g, "");
  if (!raw.trim().startsWith("+") || !digits) return null;
  for (let len = 4; len >= 1; len--) {
    const prefix = "+" + digits.slice(0, len);
    const matches = COUNTRIES.filter((c) => c.dial === prefix);
    if (matches.length === 0) continue;
    const keep = matches.find((c) => c.iso === currentIso);
    return { iso: (keep ?? matches[0]).iso, national: digits.slice(len) };
  }
  return null;
}
