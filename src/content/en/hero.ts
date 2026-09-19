export const hero = {
  tagline: "Bag storage · By the Marble Mountains",
  /* Headline splits in three so the middle segment can render in the
     accent color (HeroSplit.tsx's orange <span>) — English: "Drop your
     bags. " + "Explore Da Nang" (orange) + " freely." A translation with
     a different sentence structure doesn't have to preserve the split:
     put the whole line in `headlinePre` and leave `headlineHighlight`/
     `headlinePost` empty — the component renders whatever's non-empty. */
  headlinePre: "Luggage storage in ",
  headlineHighlight: "Da Nang",
  headlinePost: ", so you can explore freely.",
  subcopy:
    "Luggage storage in Da Nang, made simple. Fixed flat rates for expats, remote workers, and visa runners storing by the week or month, plus hourly and daily plans for tourists and day-trippers. Drop off in under 3 minutes.",
  whatsappZalo: "WhatsApp · Zalo",
  hoursLine: "7am to 10pm, every day",
  /* Street address — DO NOT translate in ko/zh, same reason as
     location.ts: a transliterated Vietnamese address is useless to a
     Grab driver. Rendered as a link to Stow's Google Maps listing. */
  address: "55 Bà Bang Nhãn, Ngũ Hành Sơn, Đà Nẵng",
  getDirections: "Get directions",
} as const;
