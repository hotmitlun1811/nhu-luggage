import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/components/guides/GuideLayout";
import {
  GuideH2,
  GuideLead,
  GuideTLDR,
  GuideFacts,
  GuideList,
  GuideTable,
  GuideCallout,
  GuideStowCallout,
  GuideFAQ,
  GuideImage,
  GuideSources,
} from "@/components/guides/GuideElements";
import { breadcrumbJsonLd, guideFaqJsonLd } from "@/lib/structured-data";
import { getDictionary } from "@/content/dictionary";

const pageTitle = "Da Nang or Hoi An: Which Should You Stay In? An Honest Comparison";
const pageDescription =
  "Da Nang or Hoi An: an honest, side-by-side comparison of beaches, food, nightlife, walkability, cost and atmosphere, who each suits, how far apart they are, and the strategy that beats choosing, base in one and day-trip the other.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides/da-nang-vs-hoi-an" },
  openGraph: { title: `${pageTitle} | Stow`, description: pageDescription, url: "https://www.stowdanang.com/guides/da-nang-vs-hoi-an" },
  twitter: { title: `${pageTitle} | Stow`, description: pageDescription },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Da Nang or Hoi An", path: "/guides/da-nang-vs-hoi-an" },
]);

const FAQ_ITEMS = [
  {
    q: "Is it nicer to stay in Da Nang or Hoi An?",
    a: "It depends on the trip. Da Nang is nicer for a modern beach-city base with the airport, big beaches, and conveniences; Hoi An is nicer for walkable, lantern-lit charm and a slower pace. For a short first trip, most travelers base in Da Nang and day-trip Hoi An. For a week or more, split your nights between both.",
  },
  {
    q: "How far is Hoi An from Da Nang?",
    a: "About 30 km by road, roughly 40 to 50 minutes by car or Grab in normal traffic, and 70 to 80 minutes by public bus. A Grab or private car between the two runs about 200,000 to 300,000 VND. Either city works as a day trip from the other.",
  },
  {
    q: "Does Hoi An have an airport?",
    a: "No. The nearest airport is Da Nang International (DAD), about 30 km and a 45 to 50 minute drive from Hoi An's Ancient Town. Everyone flies into Da Nang, which is the single biggest reason short first trips tend to base there.",
  },
  {
    q: "Is Da Nang or Hoi An better for families?",
    a: "Da Nang generally suits families better, thanks to modern amenities, big sandy beaches like My Khe, water parks, and more activities for children. Hoi An is slower-paced and more about atmosphere, though An Bang beach and countryside bike rides are lovely with older kids.",
  },
  {
    q: "Is Da Nang or Hoi An better for couples?",
    a: "Hoi An is the more romantic choice, with lantern-lit streets, boutique hotels, riverside cafes, and countryside bike rides. Da Nang leans modern and lively. Many couples base in Hoi An and day-trip Da Nang for the beach and Ba Na Hills.",
  },
  {
    q: "Which is better for digital nomads?",
    a: "Da Nang. It is Vietnam's central tech hub, with faster, more reliable internet and a much bigger long-stay and coworking scene, especially around An Thuong. Hoi An suits a shorter creative break rather than a months-long remote-work base.",
  },
  {
    q: "Is Hoi An cheaper than Da Nang?",
    a: "They are close overall, roughly US$51 a day in Hoi An versus US$55 in Da Nang, so cost is not really a deciding factor. Budget guesthouses are a little cheaper in Hoi An; mid-range hotels and in-city transport are usually cheaper in Da Nang because there is more supply.",
  },
  {
    q: "Can you day-trip Hoi An from Da Nang, or the reverse?",
    a: "Yes, easily. At about 30 km and 40 to 50 minutes each way, either city works as a day trip from the other. Hoi An is best timed to run into the evening, when the day-trippers leave and the lanterns come on.",
  },
  {
    q: "How many nights should I spend in each?",
    a: "For a first trip, roughly 3 to 4 nights in Da Nang with a Hoi An day trip covers the highlights. With a week or more, split your nights so you sleep in both, for example a few in Da Nang for the beach and a couple in Hoi An for the old town.",
  },
  {
    q: "Where do I leave my luggage on the day I move between them?",
    a: "Storage in Hoi An itself is limited, so the practical move is to leave your bags on the Da Nang side, near the airport and the Hoi An road, and travel bag-free for the day, then collect them before an evening flight.",
  },
];

const SOURCES = [
  { label: "Da Nang Hotel Guide: Da Nang vs Hoi An", url: "https://www.dananghotelguide.com/da-nang-vs-hoi-an.html", note: "the head-to-head base comparison and the two-different-worlds framing" },
  { label: "BudgetYourTrip: Hoi An vs Da Nang cost", url: "https://www.budgetyourtrip.com/compare/hoi-an-vs-da-nang-1580541-1583992", note: "the per-day cost averages and inter-city transport prices" },
  { label: "Vinpearl: Da Nang to Hoi An distance", url: "https://vinpearl.com/en/da-nang-to-hoi-an-distance", note: "the distance and per-mode travel times" },
  { label: "VinWonders: is there a Hoi An airport", url: "https://vinwonders.com/en/wonderpedia/news/hoi-an-airport/", note: "confirmation that Hoi An has no airport and you fly into DAD" },
  { label: "Vietnam.travel: Hoi An", url: "https://vietnam.travel/places-to-go/central-vietnam/hoi-an", note: "the official tourism overview and the 1999 UNESCO inscription" },
  { label: "Nomadic Notes: beach neighborhoods of Da Nang and Hoi An", url: "https://www.nomadicnotes.com/beach-neighbourhoods-of-da-nang-and-hoi-an/", note: "the My Khe vs An Bang beach comparison" },
  { label: "Muy Linda Travels: Da Nang or Hoi An", url: "https://muylindatravels.com/da-nang-or-hoi-an/", note: "the walkability and atmosphere contrasts" },
  { label: "Mel365: Hoi An or Da Nang", url: "https://mel365.com/hoi-an-or-da-nang/", note: "nightlife and the couples-versus-families split" },
];

export default async function DaNangVsHoiAn() {
  const dict = await getDictionary("en");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideFaqJsonLd(FAQ_ITEMS)) }} />
      <GuideLayout
        dict={dict}
        currentPath="/guides/da-nang-vs-hoi-an"
        eyebrow="Plan Your Trip"
        title="Da Nang or Hoi An?"
        subhead="An honest, category-by-category comparison of the two, who each one suits, and the strategy that beats choosing at all."
        readingTime="10 min read"
        toc={[
          { id: "what-each-is", label: "What each place is" },
          { id: "no-airport", label: "Hoi An has no airport" },
          { id: "head-to-head", label: "Head-to-head comparison" },
          { id: "who", label: "Which city suits you" },
          { id: "distance", label: "How far apart, and getting between" },
          { id: "split", label: "The strategy that beats choosing" },
          { id: "nights", label: "How many nights in each?" },
          { id: "bags", label: "The bag problem on the move day" },
          { id: "faq", label: "Questions people ask" },
        ]}
        related={[
          { title: "Where to Stay in Da Nang", href: "/guides/where-to-stay-in-da-nang", blurb: "If you base in Da Nang, here is which neighborhood to pick." },
          { title: "Da Nang to Hoi An Day Trip", href: "/guides/da-nang-to-hoi-an-day-trip", blurb: "How to get between them, and how to do Hoi An in a day." },
        ]}
      >
        <GuideLead>
          Da Nang and Hoi An sit only about 30 km apart, yet they feel like two different trips. There is no single
          right answer to which you should stay in, and any guide that gives you one is oversimplifying. It comes
          down to what you came for and how long you have. Here is the honest, category-by-category comparison, and
          the move that sidesteps the choice entirely.
        </GuideLead>

        <GuideTLDR>
          For a short first trip (3 to 4 nights), <strong>base in Da Nang</strong>: you fly into Da Nang (Hoi An has
          no airport), the beach and conveniences are there, and Hoi An is an easy day trip you can time for the
          evening lanterns. If you want <strong>atmosphere, walkability, and a slower pace</strong>, base in Hoi An
          and treat Da Nang as the day trip. With <strong>a week or more, do not choose</strong>: the two are 40 to
          50 minutes apart, so split your nights. The one universal: the day you move between them, or day-trip one
          from the other, is the day your luggage is in the way. Solve that once and both cities open up.
        </GuideTLDR>

        <GuideImage
          src="https://upload.wikimedia.org/wikipedia/commons/2/23/Lanterns_in_Hoi_An_4.jpg"
          alt="Silk lanterns lighting a street in Hoi An Old Town at night"
          width={4032}
          height={3024}
          credit="Christophe95"
          creditUrl="https://commons.wikimedia.org/wiki/File:Lanterns_in_Hoi_An_4.jpg"
          license="CC BY-SA 4.0"
        />

        <GuideFacts
          items={[
            { label: "Distance apart", value: "~30 km" },
            { label: "Drive time", value: "40-50 min" },
            { label: "Grab between", value: "~200,000-300,000 VND" },
            { label: "Cost per day", value: "~US$51 vs US$55" },
            { label: "Hoi An airport", value: "None (fly into DAD)" },
            { label: "Short first trip", value: "Base in Da Nang" },
          ]}
        />

        <div id="what-each-is" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="what-each-is">What each place actually is</GuideH2>
          <p>
            <strong>Da Nang</strong> is a modern, spread-out coastal city: wide roads, a long beach (My Khe),
            high-rise hotels, real nightlife, the airport, and the big-ticket sights nearby (the Marble Mountains,
            Ba Na Hills and the Golden Bridge, the Dragon Bridge). It is convenient and dynamic, and you get around
            by Grab or scooter.
          </p>
          <p>
            <strong>Hoi An</strong> is a small UNESCO Ancient Town (inscribed in 1999): lantern-lit lanes, old
            merchant houses, a riverfront, tailors, and a slow, walkable rhythm. It is romantic and atmospheric,
            though the quiet it was famous for is busier now, with evening crowds bused in from Da Nang. Its beach,
            An Bang, is a few km from the old town.
          </p>
        </div>

        <div id="no-airport" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="no-airport">The single biggest practical fact: Hoi An has no airport</GuideH2>
          <p>
            Whatever you decide, you will land in Da Nang. Hoi An has no airport; the nearest is Da Nang
            International (DAD), about 30 km and a 45 to 50 minute drive from the Ancient Town. That shapes a lot of
            trips: if you are only here for a few nights, basing in Da Nang saves you two 45-minute transfers, and
            you can still get the full Hoi An experience on a well-timed day trip.
          </p>
        </div>

        <div id="head-to-head" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="head-to-head">Head-to-head, category by category</GuideH2>
          <p>
            Most of this is subjective, so treat it as widely-held opinion rather than fact. The distances, costs,
            and transport are the hard anchors.
          </p>
          <GuideTable
            columns={["Da Nang", "Hoi An"]}
            rows={[
              { label: "What it is", values: ["Modern beach city, big and wide", "UNESCO Ancient Town, lanterns, walkable"] },
              { label: "Best beach", values: ["My Khe: lively, lifeguards, water sports", "An Bang: laid-back, bohemian, beach clubs"] },
              { label: "Walkability", values: ["Spread out; Grab or scooter needed", "Very walkable; explore all day on foot"] },
              { label: "Signature food", values: ["Mi quang; bigger everyday food scene", "Cao lau, White Rose dumplings; heritage setting"] },
              { label: "Nightlife", values: ["Lively; bars, beach clubs, Dragon Bridge show", "Quiet, tranquil, lantern-lit"] },
              { label: "Cost per day (approx)", values: ["~US$55", "~US$51"] },
              { label: "Best for", values: ["First-timers, families, nomads, nightlife", "Couples, culture, slow travel, walkers"] },
            ]}
          />
        </div>

        <div id="who" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="who">Which city suits which traveler</GuideH2>
          <GuideList
            items={[
              "First-timers: Da Nang. The airport, the beach, and the conveniences are all in one place, with Hoi An as an easy day trip.",
              "Families: Da Nang. Modern amenities, big sandy beaches, water parks, and more to do with kids.",
              "Couples: Hoi An. Lantern-lit streets, boutique hotels, riverside dinners, and countryside bike rides.",
              "Digital nomads: Da Nang. Faster internet, coworking, and a real long-stay scene, especially around An Thuong.",
              "Nightlife and backpackers: Da Nang for the bars, beach clubs, and energy; Hoi An for a calmer evening.",
              "Slow travelers and photographers: Hoi An, for the walkable old town and the light on the river.",
            ]}
          />
        </div>

        <div id="distance" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="distance">How far apart, and how to get between them</GuideH2>
          <p>
            It is about 30 km between central Da Nang and Hoi An, roughly 40 to 50 minutes by car or Grab (200,000
            to 300,000 VND), 70 to 80 minutes by public bus, or 45 to 60 minutes by motorbike. In other words, a
            base swap is a short drive, not a travel day. For the full breakdown, the 2024 LK02 bus, exact fares,
            the Ancient Town ticket, and lantern timing, see our{" "}
            <Link href="/guides/da-nang-to-hoi-an-day-trip" className="text-[#E8742C] underline underline-offset-2">
              Da Nang to Hoi An day trip guide
            </Link>
            .
          </p>
        </div>

        <div id="split" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="split">The strategy that beats choosing: base in one, day-trip the other</GuideH2>
          <p>
            If you have the time, the smartest plan is not to pick a winner. Base in Da Nang for the beach, the
            conveniences, and the day trips, and give Hoi An an afternoon-into-evening day trip so you catch the
            lanterns after the crowds thin. Or base in Hoi An for the atmosphere and pop into Da Nang for the beach,
            Ba Na Hills, and the Dragon Bridge. Because they are so close, you get both trips without a real
            relocation.
          </p>
          <GuideCallout label="Time Hoi An for the evening">
            Hoi An is at its best in the late afternoon and evening, once the day-trippers leave and the lanterns
            come on. The Old Town lights up most fully on the 14th night of each lunar month (the monthly lantern
            festival), when it dims its electric lights, but any evening beats a midday visit. If your day trip runs
            on lantern-festival timing, expect bigger crowds.
          </GuideCallout>
        </div>

        <div id="nights" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="nights">How many nights in each?</GuideH2>
          <GuideList
            items={[
              "3 to 4 nights (first trip): base in Da Nang, day-trip Hoi An. Covers the beach, the Marble Mountains, Ba Na Hills, and a lantern evening.",
              "5 to 6 nights: split them, for example 3 nights in Da Nang and 2 in Hoi An, so you wake up in both.",
              "7-plus nights: split, and add Hue or the wider region; at least one night per city to feel each vibe.",
              "Just a night or two: stay in Da Nang near the airport and see Hoi An on a single well-timed evening.",
            ]}
          />
          <p>
            A full day-by-day version of the short trip is in our{" "}
            <Link href="/guides/da-nang-itinerary" className="text-[#E8742C] underline underline-offset-2">
              Da Nang itinerary
            </Link>
            , and if you have settled on Da Nang, our{" "}
            <Link href="/guides/where-to-stay-in-da-nang" className="text-[#E8742C] underline underline-offset-2">
              where to stay guide
            </Link>{" "}
            breaks down the neighborhoods.
          </p>
        </div>

        <div id="bags" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="bags">The bag problem on the move (or day-trip) day</GuideH2>
          <p>
            Whichever way you split the two, one day is always awkward: the day you check out of one and into the
            other, or the day you day-trip and your evening flight leaves from Da Nang. That is the day your
            suitcase follows you around a UNESCO town or a beach you wanted to swim at. Hotels usually only hold
            bags until early evening, storage inside Hoi An is limited, and the airport lockers get pricey and close
            late at night.
          </p>

          <GuideStowCallout
            eyebrow="On the move day"
            heading="Leave the bags on the Da Nang side and travel free for the day."
            facts={[
              { label: "On the Hoi An road", value: "Ngu Hanh Son" },
              { label: "By the day", value: "60,000 VND (up to 24h)" },
              { label: "Open", value: "7am - 10pm daily" },
            ]}
          >
            The simple fix is to leave your bags on the Da Nang side, near the airport and on the road toward Hoi
            An, and travel bag-free. Stow is at 55 Ba Bang Nhan in Ngu Hanh Son, about ten minutes from the airport,
            open 7am to 10pm, from 15,000 VND an hour or 60,000 VND a day (with flat weekly and monthly rates for
            longer trips). Drop bags in the morning, spend the day in either city unencumbered, and collect them
            before your flight. It is the same move whether you are relocating between the two or doing a{" "}
            <Link href="/guides/da-nang-to-hoi-an-day-trip" className="text-[#E8742C] underline underline-offset-2">
              Hoi An day trip
            </Link>
            .
          </GuideStowCallout>
        </div>

        <div id="faq" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="faq">Questions people ask</GuideH2>
          <GuideFAQ items={FAQ_ITEMS} />
        </div>

        <GuideSources items={SOURCES} />

        <p className="text-[13px] text-[#9CA3AF]">
          Much of this comparison is a matter of taste, and costs, transport, and lantern-festival dates change.
          This guide reflects widely-held views and current figures at the time of writing; check anything you are
          planning tightly around before you go.
        </p>
      </GuideLayout>
    </>
  );
}
