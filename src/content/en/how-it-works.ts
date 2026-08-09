export const howItWorks = {
  label: "How It Works",
  /* 3 short lines, joined with <br/> in the component. A translation
     doesn't have to keep exactly 3 lines — see hero.ts's note on the
     same pattern. */
  headlineLines: ["Drop off.", "Explore.", "Come back."],
  subhead: "Four steps. Under 3 minutes in, under 2 minutes out.",
  steps: [
    {
      title: "Book Online",
      description:
        "Pick what fits your trip — a few hours or a few months. Confirm via WhatsApp and we'll be ready when you walk in.",
    },
    {
      title: "Drop Off",
      description:
        "Walk in, show your confirmation. We photograph your bag, attach a unique ID tag, and you're out in under 3 minutes.",
    },
    {
      title: "Go Explore",
      description:
        "Your bags are safe with us. Hit My Khe Beach, grab coffee at Han Market, or ride out to the Marble Mountains.",
    },
    {
      title: "Pick Up",
      description: "Come back whenever you're ready. Show your tag and your bag is back in under 2 minutes.",
    },
  ],
  walkInTitle: "Walk-ins always welcome.",
  walkInBody: "No booking needed — just come in and tell us what you need.",
} as const;
