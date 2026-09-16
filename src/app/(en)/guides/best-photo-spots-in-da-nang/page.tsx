import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/components/guides/GuideLayout";
import {
  GuideH2,
  GuideH3,
  GuideLead,
  GuideTLDR,
  GuideFacts,
  GuideTable,
  GuideCallout,
  GuideStowCallout,
  GuideFAQ,
  GuideImage,
  GuideSources,
} from "@/components/guides/GuideElements";
import { breadcrumbJsonLd, guideFaqJsonLd, itemListJsonLd } from "@/lib/structured-data";
import { getDictionary } from "@/content/dictionary";

const pageTitle = "The Best Photo Spots in Da Nang: Sunrise Views, Bridges, and Landmarks";
const pageDescription =
  "The best photo spots in Da Nang, with the right time of day for each: the Golden Bridge, the Dragon Bridge fire show, Ban Co Peak and My Khe at sunrise, the Pink Church, Son Tra Marina, Hai Van Pass, and more.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides/best-photo-spots-in-da-nang" },
  openGraph: { title: `${pageTitle} | Stow`, description: pageDescription, url: "https://www.stowdanang.com/guides/best-photo-spots-in-da-nang" },
  twitter: { title: `${pageTitle} | Stow`, description: pageDescription },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Best Photo Spots in Da Nang", path: "/guides/best-photo-spots-in-da-nang" },
]);

const RANKED = [
  {
    name: "The Golden Bridge (Ba Na Hills)",
    meta: "Ba Na Hills · sunrise, before 9am · ~1,000,000 VND combo",
    blurb:
      "Vietnam's single most iconic photo: a walkway held up by two giant stone hands. Ride one of the first cable cars and shoot before 9am, when it is quieter and mist can wrap the bridge. The combo ticket covers the round-trip cable car and the whole park.",
    schema: "The famous bridge held up by two giant stone hands, best shot early.",
  },
  {
    name: "The Dragon Bridge fire show",
    meta: "city center · Fri - Sun 9pm · free",
    blurb:
      "The dragon-shaped bridge breathes real fire and sprays water on weekend nights at 9pm, for about 15 to 30 minutes. Arrive by 8:30pm, shoot the blue-hour sky before it starts, then use a long exposure for the flames. It is free, and there is no show Monday to Thursday.",
    schema: "The Dragon Bridge fire-and-water show, free on weekend nights at 9pm.",
  },
  {
    name: "Ban Co Peak at sunrise",
    meta: "Son Tra ridge · sunrise · free",
    blurb:
      "The highest reachable viewpoint on Son Tra, with a bronze sage at a stone chessboard and a near-360-degree panorama of the city and coast. Come around sunrise for orange light and cloud, the classic Da Nang cloud-hunting shot. Check the Son Tra road and scooter rules before you go.",
    schema: "A sunrise summit viewpoint over the city, coast, and East Sea.",
  },
  {
    name: "The Lady Buddha and Linh Ung Pagoda",
    meta: "Son Tra · sunset or soft morning · free",
    blurb:
      "Vietnam's tallest Buddha statue at 67 m, facing the sea from the Son Tra peninsula, with sweeping coastline views from the grounds. Soft morning light or a peninsula sunset both work. Entry is free, and it pairs naturally with Ban Co Peak and Son Tra Marina in one loop.",
    schema: "Vietnam's tallest Buddha statue with sweeping coastline views.",
  },
  {
    name: "Marble Mountains (Vong Giang Dai)",
    meta: "Ngu Hanh Son · 7 - 8:30am · 40,000 VND + 15,000 lift",
    blurb:
      "The Vong Giang Dai pavilion gives a near-360-degree view over Non Nuoc beach, the river, and the coastal plain, above a warren of caves and pagodas. Go early, about 7 to 8:30am, for soft light and few people. Entry is 40,000 VND, with a 15,000 VND lift or free stairs.",
    schema: "A marble-peak pavilion with near-360-degree coastal views.",
  },
  {
    name: "My Khe Beach at dawn",
    meta: "east coast · sunrise · free",
    blurb:
      "The long white-sand city beach is at its best at sunrise, when golden light hits the water and fishermen and round coracle boats add foreground. It is free and central, an easy first stop before the day heats up. Sunset works too, though the light is behind the city.",
    schema: "The main city beach, best at sunrise with coracle-boat foregrounds.",
  },
  {
    name: "The Han River bridges at night",
    meta: "east bank · blue hour and night · free",
    blurb:
      "The riverfront strings together the lit Dragon Bridge, the Han River swing bridge, the glowing red Love Bridge with its heart lanterns, and the tall Carp-Dragon statue. Shoot at blue hour and after dark for city lights and reflections. All free, all walkable on the east bank.",
    schema: "The lit Han River bridges, Love Bridge, and Carp-Dragon statue at night.",
  },
  {
    name: "Son Tra Marina (Little Santorini)",
    meta: "Tho Quang, Son Tra · 7:30 - 9:30am or golden hour · cafe spend",
    blurb:
      "A white-and-blue Mediterranean-style marina cafe with an ocean setting and a mountain backdrop, Da Nang's answer to Santorini. Shoot 7:30 to 9:30am for soft light and few people, or at golden hour for the postcard look. It is a cafe, so plan to buy a drink.",
    schema: "A white-and-blue Santorini-style marina cafe by the sea.",
  },
  {
    name: "Da Nang Cathedral (the Pink Church)",
    meta: "city center · daytime, Mon - Sat · free",
    blurb:
      "A pastel-pink French-Gothic cathedral topped by a rooster weathervane, one of the city's most colorful backdrops. Morning light flatters the pink facade. Entry is free (any ticket sold outside is a scam), it is open to sightseers Monday to Saturday, and modest dress is required.",
    schema: "A pastel-pink French-Gothic cathedral, a colorful central backdrop.",
  },
  {
    name: "The Hai Van Pass",
    meta: "north toward Lang Co · 7 - 10am · free",
    blurb:
      "A legendary coastal mountain road with sweeping ocean-and-mountain views, plus the old Hai Van Gate bunkers and the Lang Co Bay viewpoint. Ride 7 to 10am for cool air, soft light, and lighter traffic. Free to ride, and often paired with a Hue day trip.",
    schema: "A coastal mountain pass with sweeping ocean-and-mountain views.",
  },
  {
    name: "Lap An Lagoon",
    meta: "Lang Co, ~29 km north · sunrise or sunset · free",
    blurb:
      "A mirror-like lagoon below the Hai Van Pass, backed by mountains and dotted with oyster-farm stakes. At sunrise or sunset the water turns to glass for clean reflection shots, and low tide reveals the walking-path look. Free, and a natural add-on to a Hai Van ride.",
    schema: "A mirror-like lagoon with mountain reflections and oyster-farm stakes.",
  },
  {
    name: "APEC Sculpture Park",
    meta: "west bank, city center · sunset or night · free",
    blurb:
      "A riverside park under a tall white steel structure shaped like a flying kite, ringed by 21 sculptures from APEC economies, just west of the Dragon Bridge. The white form pops against a sunset sky and is lit at night. Free, central, and an easy add-on to a Dragon Bridge evening.",
    schema: "A riverside sculpture park under a white kite-shaped landmark.",
  },
];

const FAQ_ITEMS = [
  {
    q: "What are the most Instagrammable places in Da Nang?",
    a: "The Golden Bridge, the Dragon Bridge, My Khe Beach, the Marble Mountains viewpoints, the Pink Cathedral, Son Tra Marina, Ban Co Peak, and the Lady Buddha are the most-photographed spots. Most are free, and the best light is early morning or golden hour.",
  },
  {
    q: "When is the best light for the Golden Bridge?",
    a: "Go early, before 9am, to catch soft morning light and the mist that sometimes wraps the bridge, and to beat the crowds by riding one of the first cable cars. The dry season, roughly January to September, gives the clearest views up at altitude.",
  },
  {
    q: "Is there an entry fee for the Lady Buddha?",
    a: "No. Entry to the Lady Buddha and Linh Ung Pagoda on Son Tra is free; you pay only a small motorbike-parking fee, and donation boxes inside are optional. Dress modestly, since it is an active temple, and allow an hour or two for the grounds and views.",
  },
  {
    q: "What time is the Dragon Bridge fire show?",
    a: "Friday, Saturday, and Sunday at 9pm, for about 15 to 30 minutes, with no show Monday to Thursday. Arrive by about 8:30pm for a spot on the promenade. Shoot the blue-hour sky first, then switch to a long exposure to capture the fire and water.",
  },
  {
    q: "Is the Da Nang Cathedral (Pink Church) free to visit?",
    a: "Yes, entry is free, and anyone selling tickets outside is running a scam. It is open to sightseers Monday to Saturday, roughly morning and early afternoon, and closed for sightseeing on Sundays. Morning light is best on the pink facade, and modest dress is required.",
  },
  {
    q: "How much does the Golden Bridge and Ba Na Hills cost?",
    a: "The combo ticket is about 1,000,000 VND for an adult in 2026, and it includes the round-trip cable car, the Golden Bridge, the gardens, and Fantasy Park. Children are priced by height, and the smallest go free. Prices change yearly, so confirm before you book.",
  },
  {
    q: "Where do you get the best sunrise photos in Da Nang?",
    a: "Ban Co Peak on Son Tra, around 5:30 to 6am, for cloud and sea; My Khe Beach at dawn for golden water and coracle boats; and the Marble Mountains' Vong Giang Dai pavilion around 7 to 8:30am for coastal views with few people.",
  },
  {
    q: "Where is the Little Santorini in Da Nang?",
    a: "Son Tra Marina, a white-and-blue Mediterranean-style marina cafe in Tho Quang on the Son Tra side, about 10 to 15 minutes from the center. Shoot 7:30 to 9:30am or at golden hour. It is a cafe, so plan to order a drink while you are there.",
  },
  {
    q: "Is the Marble Mountains viewpoint worth it, and what does it cost?",
    a: "Yes. Entry is 40,000 VND, with a 15,000 VND lift each way or free stairs, and the Vong Giang Dai pavilion gives near-360-degree coastal views above the caves and pagodas. Go early, about 7 to 8:30am, for the best light and the smallest crowds.",
  },
  {
    q: "What are the best photo stops on the Hai Van Pass?",
    a: "The old Hai Van Gate with its war-era bunkers, the Lang Co Bay viewpoint, and the roadside pullouts along the climb. Ride between about 7 and 10am for cool air, soft light, and lighter traffic, and add Lap An Lagoon at the northern foot of the pass.",
  },
];

const SOURCES = [
  { label: "Danang FantastiCity: Instagrammable spots", url: "https://danangfantasticity.com/en", note: "the official city tourism portal's photo-spot and APEC Park coverage" },
  { label: "VietnamPlus: top new Instagrammable spots in Da Nang", url: "https://en.vietnamplus.vn/top-new-instagrammable-spots-in-da-nang-post292188.vnp", note: "the state news agency's roundup of trending photo spots" },
  { label: "Hoi An Day Trip: Dragon Bridge fire show", url: "https://hoiandaytrip.com/dragon-bridge-fire-water-show-da-nang/", note: "the fire-show schedule, duration, and best viewing spots" },
  { label: "Vinpearl: Ban Co Peak", url: "https://vinpearl.com/en/ban-co-peak", note: "the Ban Co Peak viewpoint, access, and sunrise timing" },
  { label: "Banyan Tree: Hai Van Pass and Lap An Lagoon", url: "https://www.banyantree.com/vietnam/lang-co/hai-van-pass", note: "the Hai Van Pass and Lap An lagoon timing and access" },
  { label: "Culture Pham Travel: Da Nang entrance fees", url: "https://culturephamtravel.com/da-nang-entrance-fee/", note: "the Marble Mountains entry and lift fees" },
  { label: "Couples Travel Stories: Da Nang Cathedral", url: "https://couplestravelstories.ca/da-nang-cathedral/", note: "the Pink Church hours, the free entry, and the ticket-scam warning" },
  { label: "Hoi An Day Trip: Ba Na Hills tickets", url: "https://hoiandaytrip.com/ba-na-hills-tickets/", note: "the Golden Bridge and Ba Na Hills ticket price and inclusions" },
];

export default async function BestPhotoSpotsInDaNang() {
  const dict = await getDictionary("en");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideFaqJsonLd(FAQ_ITEMS)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            itemListJsonLd(
              RANKED.map((r) => ({ name: r.name, description: r.schema })),
              "The Best Photo Spots in Da Nang"
            )
          ),
        }}
      />
      <GuideLayout
        dict={dict}
        currentPath="/guides/best-photo-spots-in-da-nang"
        eyebrow="See & Do"
        title="The Best Photo Spots in Da Nang"
        subhead="Twelve landmarks and viewpoints, and the exact time of day to shoot each one, from sunrise on Son Tra to the fire show at night."
        readingTime="10 min read"
        toc={[
          { id: "how-we-chose", label: "How we chose" },
          { id: "ranked", label: "The 12 best photo spots" },
          { id: "compare", label: "Timing at a glance" },
          { id: "bags", label: "For a photo walk" },
          { id: "faq", label: "Questions people ask" },
        ]}
        related={[
          { title: "Son Tra Peninsula and the Lady Buddha", href: "/guides/son-tra-peninsula", blurb: "Ban Co Peak, the Lady Buddha, and Son Tra Marina, and how to reach them." },
          { title: "Da Nang at Night", href: "/guides/da-nang-nightlife", blurb: "The Dragon Bridge fire show and the lit river bridges, in full." },
        ]}
      >
        <GuideLead>
          Da Nang is a photogenic city, but the difference between a snapshot and a great shot here is almost always
          timing. The same viewpoint that is hazy and crowded at noon is golden and empty at sunrise. This guide covers
          the twelve best photo spots, and, more usefully, the exact time of day to shoot each one. Most cost nothing to
          enter, so the main price is an early alarm.
        </GuideLead>

        <GuideTLDR>
          Da Nang&apos;s best photo spots mix landmarks and coastline. Shoot the <strong>Golden Bridge</strong> and{" "}
          <strong>Ban Co Peak</strong> at sunrise, <strong>My Khe Beach</strong> at dawn, and the{" "}
          <strong>Dragon Bridge fire show</strong> on weekend nights at 9pm. Add the <strong>Pink Cathedral</strong>,
          the Marble Mountains viewpoints, <strong>Son Tra Marina</strong>, and the <strong>Hai Van Pass</strong>. Most
          are free to enter, and the golden light of early morning and late afternoon beats the harsh midday sun every
          time.
        </GuideTLDR>

        <GuideImage
          src="https://upload.wikimedia.org/wikipedia/commons/0/07/Da_Nang_-_Dragon_Bridge.jpg"
          alt="The Dragon Bridge over the Han River in Da Nang, a top photo spot"
          width={4288}
          height={2848}
          credit="P. Hughes"
          creditUrl="https://commons.wikimedia.org/wiki/File:Da_Nang_-_Dragon_Bridge.jpg"
          license="CC BY 4.0"
        />

        <GuideFacts
          items={[
            { label: "Most iconic", value: "Golden Bridge" },
            { label: "Best sunrise", value: "Ban Co Peak, My Khe" },
            { label: "Fire show", value: "Fri - Sun 9pm" },
            { label: "Little Santorini", value: "Son Tra Marina" },
            { label: "Most spots", value: "Free to enter" },
            { label: "Best light", value: "Golden and blue hour" },
          ]}
        />

        <div id="how-we-chose" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="how-we-chose">How we chose these</GuideH2>
          <p>
            We cross-checked Da Nang tourism portals, established travel publishers, and current local check-in reports,
            then verified each spot&apos;s access, hours, and fees against at least two sources. We ranked by iconic pull,
            photo payoff, ease of access, and cost, favoring free, well-lit viewpoints. Where a spot has a clear best
            time of day, that is the single most useful thing on this page, so we led with it.
          </p>
          <GuideCallout label="Chase the light, not the hour hand">
            Two windows do most of the work here: the golden hour just after sunrise and before sunset, and the blue
            hour just after dark for the lit bridges. Midday sun is harsh and the crowds are thickest then. The dry
            season, roughly February to September, gives the clearest skies for the viewpoints.
          </GuideCallout>
        </div>

        <div id="ranked" className="flex flex-col gap-5 scroll-mt-[88px]">
          <GuideH2 id="ranked">The 12 best photo spots in Da Nang</GuideH2>
          {RANKED.map((spot, i) => (
            <div key={spot.name} className="flex flex-col gap-1.5">
              <GuideH3>{`${i + 1}. ${spot.name}`}</GuideH3>
              <p className="text-[13px] text-[#6B7280]">{spot.meta}</p>
              <p>{spot.blurb}</p>
            </div>
          ))}
        </div>

        <div id="compare" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="compare">The photo spots by timing</GuideH2>
          <GuideTable
            columns={["Best light / time", "Area", "Fee"]}
            rows={[
              { label: "Golden Bridge", values: ["Sunrise, before 9am", "Ba Na Hills (west)", "~1,000,000 VND combo"] },
              { label: "Dragon Bridge show", values: ["Fri - Sun 9pm", "City center", "Free"] },
              { label: "Ban Co Peak", values: ["Sunrise", "Son Tra ridge", "Free"] },
              { label: "Lady Buddha", values: ["Sunset or soft morning", "Son Tra", "Free"] },
              { label: "Marble Mountains", values: ["7 - 8:30am or sunset", "Ngu Hanh Son", "40,000 + 15,000 lift"] },
              { label: "My Khe Beach", values: ["Sunrise", "East coast", "Free"] },
              { label: "Han River bridges", values: ["Blue hour and night", "City center", "Free"] },
              { label: "Son Tra Marina", values: ["7:30 - 9:30am / golden hour", "Tho Quang, Son Tra", "Cafe spend"] },
              { label: "Pink Church", values: ["Daytime, Mon - Sat", "City center", "Free"] },
              { label: "Hai Van Pass", values: ["7 - 10am", "North toward Lang Co", "Free"] },
              { label: "Lap An Lagoon", values: ["Sunrise or sunset", "Lang Co, ~29 km N", "Free"] },
              { label: "APEC Sculpture Park", values: ["Sunset or night", "City center, west bank", "Free"] },
            ]}
          />
          <GuideImage
            src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Han_River_in_Da_Nang_at_sunrise.jpg"
            alt="The Han River and Da Nang bridges glowing at sunrise"
            width={4912}
            height={2533}
            credit="Christophe95"
            creditUrl="https://commons.wikimedia.org/wiki/File:Han_River_in_Da_Nang_at_sunrise.jpg"
            license="CC BY-SA 4.0"
          />
        </div>

        <div id="bags" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="bags">Shooting the city on an arrival or checkout day?</GuideH2>
          <p>
            The best light often lands on the days you are moving. You land at dawn, perfect for My Khe, but cannot check
            in yet, or you check out at noon and want the riverfront at blue hour before a night flight. Either way, a
            camera in one hand and a suitcase in the other is a bad combination.
          </p>

          <GuideStowCallout
            eyebrow="Hands-free"
            heading="Store the bags, then shoot the riverfront and the coast unencumbered."
            facts={[
              { label: "By the Marble Mountains", value: "Ngu Hanh Son" },
              { label: "By the day", value: "60,000 VND (up to 24h)" },
              { label: "Open", value: "7am - 10pm daily" },
            ]}
          >
            Stow sits at 55 Ba Bang Nhan in Ngu Hanh Son, right by the Marble Mountains viewpoint and about ten minutes
            from the airport. Drop your bags from 15,000 VND an hour or 60,000 VND a day, open 7am to 10pm, then chase
            the light from My Khe at dawn to the Dragon Bridge at night without a wheelie bag in the frame. It pairs
            neatly with a{" "}
            <Link href="/guides/da-nang-layover-guide" className="text-[#E8742C] underline underline-offset-2">
              short layover
            </Link>{" "}
            too.
          </GuideStowCallout>
        </div>

        <div id="faq" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="faq">Questions people ask</GuideH2>
          <GuideFAQ items={FAQ_ITEMS} />
        </div>

        <GuideSources items={SOURCES} />

        <p className="text-[13px] text-[#9CA3AF]">
          This guide was compiled from tourism portals, travel publishers, and local reports, and last reviewed in
          September 2026. Opening hours, ticket prices, show schedules, and Son Tra access can change, so confirm the
          details for anything you plan a sunrise around before you go.
        </p>
      </GuideLayout>
    </>
  );
}
