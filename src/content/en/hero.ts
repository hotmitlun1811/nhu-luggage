export const hero = {
  tagline: "Luggage Storage · Da Nang",
  /* Headline splits in three so the middle segment can render in the
     accent color (HeroSplit.tsx's orange <span>) — English: "Drop your
     bags. " + "Explore Da Nang" (orange) + " freely." A translation with
     a different sentence structure doesn't have to preserve the split:
     put the whole line in `headlinePre` and leave `headlineHighlight`/
     `headlinePost` empty — the component renders whatever's non-empty. */
  headlinePre: "Drop your bags. ",
  headlineHighlight: "Explore Da Nang",
  headlinePost: " freely.",
  subcopy:
    "Fixed flat rates for expats, remote workers, and visa runners storing by the week or month. Hourly and daily plans for tourists and day-trippers. Drop off in under 3 minutes.",
  whatsappZalo: "WhatsApp · Zalo",
  hoursLine: "7am to 10pm, every day",
  address: "55 Bà Bang Nhãn, Ngũ Hành Sơn, Đà Nẵng",
  bookingPanel: {
    openStatus: "Open · 7am–10pm daily",
    bookNow: "Book now",
  },
} as const;
