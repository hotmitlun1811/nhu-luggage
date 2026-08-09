export const services = {
  eyebrow: "More than storage",
  /* 2 segments — desktop joins with <br/>, mobile joins with a space.
     See hero.ts's note on this pattern; a translation can put
     everything in the first segment and leave the second empty. */
  headlineLines: ["We go where", "you need us."],
  intro:
    "Storage is the core. But when your itinerary demands it, we handle pickup, delivery, and the little things that make travel smoother.",
  /* Icon/image/overlay stay local to ServicesSection.tsx — this is display text only, keyed the same order as that component's local `services` array. */
  items: [
    {
      title: "Pickup & Delivery",
      subtitle: "We come to you",
      description:
        "WhatsApp us your hotel or address — we collect your bags and bring them back when you need them.",
    },
    {
      title: "Airport Transfer",
      subtitle: "Straight to the gate",
      description:
        "Flying out? We deliver your bags directly to Da Nang Airport so you can head straight to check-in.",
    },
    {
      title: "Hotel Delivery",
      subtitle: "Door to door",
      description: "Checked into a new place? We'll deliver your bags to your hotel lobby at a time that works for you.",
    },
  ],
  onRequestBadge: "On Request",
  whatsappToArrange: "WhatsApp to arrange",
  freeWhileYouWait: "Free while you wait",
  addons: ["Phone charging", "Free Wi-Fi", "Drinking water", "Boarding pass print"],
  bookStorageNow: "Book storage now",
} as const;
