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

const pageTitle = "Da Nang at Night: The Dragon Bridge Fire Show, Bars, and Night Markets";
const pageDescription =
  "A guide to Da Nang nightlife: the free Dragon Bridge fire-and-water show schedule and where to watch, the An Thuong bar strip, Bach Dang rooftop sky bars, beach bars, a Han River cruise, and night markets.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides/da-nang-nightlife" },
  openGraph: { title: `${pageTitle} | Stow`, description: pageDescription, url: "https://www.stowdanang.com/guides/da-nang-nightlife" },
  twitter: { title: `${pageTitle} | Stow`, description: pageDescription },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Da Nang at Night", path: "/guides/da-nang-nightlife" },
]);

const FAQ_ITEMS = [
  {
    q: "What time is the Dragon Bridge fire show in Da Nang?",
    a: "The Dragon Bridge fire-and-water show starts at 9pm on weekend nights, Friday, Saturday, and Sunday. It is free, with no ticket needed, and there is no show from Monday to Thursday. Arrive by about 8:15 to 8:30pm for a good spot, as the nearby roads close before it starts.",
  },
  {
    q: "How long does the Dragon Bridge show last?",
    a: "Sources differ, so budget for about 15 to 30 minutes, roughly 9 to 9:30pm. The bronze dragon breathes fire for a couple of minutes, then sprays water for a few more, cycling through the sequence. If you stand near the dragon's head on the bridge, expect to get sprayed.",
  },
  {
    q: "Is the Dragon Bridge fire show free?",
    a: "Yes. It is completely free to watch from the bridge walkway and the riverside promenade, with no ticket or registration. It is the single best free thing to do in Da Nang at night, and it draws a big, family-friendly crowd every weekend.",
  },
  {
    q: "Where is the best place to watch the Dragon Bridge show?",
    a: "The bridge walkway is closest, reached by stairs at either end, but you may get sprayed near the dragon's mouth. The Bach Dang promenade near the Love Bridge and Carp Statue is the most popular free ground-level spot. Tran Hung Dao Street on the east bank also works.",
  },
  {
    q: "What is the best area for nightlife in Da Nang?",
    a: "An Thuong, near My Khe beach, has the highest concentration of bars, clubs, and restaurants within walking distance, and it is the easiest zone for bar-hopping. Bach Dang, along the Han River, has the upscale rooftop sky bars with Dragon Bridge views.",
  },
  {
    q: "Is there a rooftop bar in Da Nang with a Dragon Bridge view?",
    a: "Yes. Sky36, on the 36th floor of the Novotel, is the highest rooftop bar in the city. Brilliant Top Bar and Sky 21, both on the Bach Dang riverfront, also have panoramic Han River and Dragon Bridge views. Cocktails at this tier run about 180,000 to 300,000 VND.",
  },
  {
    q: "What time do Da Nang night markets open?",
    a: "Son Tra Night Market, near the Dragon Bridge on the east bank, is open daily from around 6pm until about 11pm and is free to enter. Helio Night Market runs in the evenings and may now be weekend-only, so check before you go. Both have cheap, plentiful street food.",
  },
  {
    q: "Can you see the Dragon Bridge fire show from a river cruise?",
    a: "Yes. On weekend nights, a Han River cruise that departs around 8 or 8:30pm lets you watch the fire show from the water. Dinner cruises cost roughly 15 to 25 US dollars, and shorter sightseeing tickets are cheaper. Arrive about 15 minutes early to check in.",
  },
  {
    q: "What time does the Sun Wheel close?",
    a: "The 115 m Sun Wheel at Sun World Da Nang Wonders runs until about 10:30pm, opening from around 3:30pm on weekdays and 9:30am on weekends, though hours vary by season. A wheel ride costs 100,000 VND for adults, with cheaper tickets for children and free entry for the smallest.",
  },
  {
    q: "How late do bars stay open in Da Nang?",
    a: "Most bars open around 7pm and close between midnight and 2am. Clubs can run until about 4am on weekends, and the top rooftop bars like Sky36 stay open until around 2am. The An Thuong strip is the most reliable place to find somewhere still lively late.",
  },
];

const SOURCES = [
  { label: "Da Nang Hotel Guide: Dragon Bridge", url: "https://www.dananghotelguide.com/dragon-bridge-da-nang.html", note: "the fire-show schedule (Fri/Sat/Sun 9pm), the free entry, and the best viewing spots" },
  { label: "Hoi An Day Trip: Dragon Bridge fire and water show", url: "https://hoiandaytrip.com/dragon-bridge-fire-water-show-da-nang/", note: "the fire-then-water sequence and the longer duration estimate" },
  { label: "Local Vietnam: Dragon Bridge", url: "https://localvietnam.com/da-nang/dragon-bridge/", note: "the ground-level viewing spots, arrival timing, and road closures" },
  { label: "Da Nang Hotel Guide: nightlife guide", url: "https://www.dananghotelguide.com/da-nang-nightlife-guide.html", note: "the three nightlife zones, bar hours, cocktail price bands, and named venues" },
  { label: "The Rooftop Guide: Sky36", url: "https://www.therooftopguide.com/rooftop-bars-in-da-nang/sky36.html", note: "Sky36's location and its status as the city's highest rooftop bar" },
  { label: "Visit Da Nang: Han River cruise", url: "https://visitdanang.org/cruise-on-the-han-river-in-da-nang/", note: "the cruise times, prices, and the weekend departure that catches the fire show" },
  { label: "Trip.com: Son Tra Night Market", url: "https://us.trip.com/travel-guide/attraction/da-nang/son-tra-night-market-61886355/", note: "the Son Tra night market hours and free entry" },
  { label: "Hoi An Day Trip: Sun Wheel", url: "https://hoiandaytrip.com/sun-wheel-da-nang/", note: "the Sun Wheel hours and ticket prices" },
];

export default async function DaNangNightlife() {
  const dict = await getDictionary("en");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideFaqJsonLd(FAQ_ITEMS)) }} />
      <GuideLayout
        dict={dict}
        currentPath="/guides/da-nang-nightlife"
        eyebrow="See & Do"
        title="Da Nang at Night"
        subhead="The free Dragon Bridge fire show, the walkable bar strip, the rooftop sky bars, and how to build one great evening around them."
        readingTime="11 min read"
        toc={[
          { id: "fire-show", label: "The Dragon Bridge fire show" },
          { id: "an-thuong", label: "The An Thuong bar strip" },
          { id: "rooftops", label: "Rooftop sky bars" },
          { id: "beach-bars", label: "My Khe beach bars" },
          { id: "cruise", label: "A Han River cruise" },
          { id: "markets", label: "The night markets" },
          { id: "sun-wheel", label: "The Sun Wheel at night" },
          { id: "plan", label: "Putting a night together" },
          { id: "red-eye", label: "A last night before a red-eye" },
          { id: "faq", label: "Questions people ask" },
        ]}
        related={[
          { title: "Da Nang Food Guide", href: "/guides/da-nang-food-guide", blurb: "What to eat before or during the night out, and where." },
          { title: "Where to Stay in Da Nang", href: "/guides/where-to-stay-in-da-nang", blurb: "The nightlife zones as places to sleep, from An Thuong to the river." },
        ]}
      >
        <GuideLead>
          Da Nang is an easy city to enjoy after dark. The night has a natural anchor, the free Dragon Bridge fire show,
          and everything else clusters into three walkable zones around it: the An Thuong bar strip by the beach, the
          Bach Dang riverfront with its rooftop bars, and the sand-side lounges of My Khe. Add a night market and a
          river cruise, and you can fill an evening without ever needing a plan. Here is how it all fits together.
        </GuideLead>

        <GuideTLDR>
          The free <strong>Dragon Bridge fire-and-water show</strong> is the anchor: weekend nights (Friday, Saturday,
          Sunday) at <strong>9pm</strong>, no ticket needed. Around it sit three zones: <strong>An Thuong</strong> for
          casual pubs and live music near the beach, <strong>Bach Dang</strong> for rooftop sky bars with bridge views,
          and the <strong>My Khe</strong> beachfront for cold beer on the sand. Night markets and a{" "}
          <strong>Han River dinner cruise</strong> fill the earlier hours, and the 115 m Sun Wheel lights up until about
          10:30pm. Arrive at the bridge by 8:15 to 8:30pm for a spot.
        </GuideTLDR>

        <GuideImage
          src="https://upload.wikimedia.org/wikipedia/commons/8/82/Dragon_Bridge_at_night_1.jpg"
          alt="The Dragon Bridge in Da Nang lit up in color at night over the Han River"
          width={4032}
          height={3024}
          credit="Christophe95"
          creditUrl="https://commons.wikimedia.org/wiki/File:Dragon_Bridge_at_night_1.jpg"
          license="CC BY-SA 4.0"
        />

        <GuideFacts
          items={[
            { label: "Fire show", value: "Fri/Sat/Sun 9pm" },
            { label: "Show cost", value: "Free" },
            { label: "Arrive by", value: "~8:15 - 8:30pm" },
            { label: "Best bar strip", value: "An Thuong" },
            { label: "Rooftop bars", value: "Bach Dang riverfront" },
            { label: "Bars close", value: "~midnight - 2am" },
          ]}
        />

        <div id="fire-show" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="fire-show">The Dragon Bridge fire and water show</GuideH2>
          <p>
            The Dragon Bridge is a 666-meter bridge shaped like a golden dragon, and on weekend nights it comes alive.
            The show runs on Friday, Saturday, and Sunday at 9pm, and it is completely free, with no ticket or
            registration. There is no show from Monday to Thursday. The dragon&apos;s head breathes real fire for a
            couple of minutes, then sprays water, cycling through a sequence that lasts somewhere between about 15 and 30
            minutes, depending on the night.
          </p>
          <p>
            Where you stand matters. The bridge walkway is closest, reached by stairs at either end, but the crowd near
            the dragon&apos;s mouth gets soaked by the water spray, which is half the fun for kids. For a drier, wide
            view, the Bach Dang promenade near the Love Bridge and the Carp Statue is the most popular free spot.
          </p>
          <GuideCallout label="Get there early">
            Arrive by about 8:15 to 8:30pm to claim a railing spot, since the show draws a big crowd and the nearby
            roads close shortly before 9pm. On major holidays like Tet or National Day, the city sometimes adds extra or
            extended shows, so the schedule can change; check locally around those dates.
          </GuideCallout>
        </div>

        <div id="an-thuong" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="an-thuong">An Thuong: the walkable bar strip near the beach</GuideH2>
          <p>
            An Thuong, in the My An area just back from My Khe beach, is the densest and most convenient nightlife zone.
            The streets are packed with small, open-fronted bars, live-music pubs, and late-night spots, all within
            walking distance, which makes it the natural place to bar-hop. It draws a mixed crowd of travelers,
            long-stay expats, and locals, and drinks are reasonable, with cocktails at live-music venues around 90,000
            to 130,000 VND.
          </p>
          <p>
            Most bars open around 7pm and close between midnight and 2am, while clubs can run to about 4am on weekends.
            You will find everything from mellow live-music pubs to an underground techno venue, so it is easy to find
            your kind of night. To stay in the middle of it, our{" "}
            <Link href="/guides/where-to-stay-in-da-nang" className="text-[#E8742C] underline underline-offset-2">
              where to stay guide
            </Link>{" "}
            covers An Thuong as a base.
          </p>
        </div>

        <div id="rooftops" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="rooftops">Bach Dang riverside and rooftop sky bars</GuideH2>
          <p>
            For a smarter night with a view, head to Bach Dang Street on the east bank of the Han River, home to Da
            Nang&apos;s premier rooftop bars and fine dining, all looking out over the lit Dragon Bridge and the
            skyline. Sky36, on the 36th floor of the Novotel, is the highest rooftop bar in the city, running from
            sunset cocktails to late DJ sets and open until about 2am. There is no cover charge to enter, though a
            deposit can apply for prime tables or big groups.
          </p>
          <p>
            Nearby, Brilliant Top Bar and Sky 21 also have panoramic river and bridge views at a slightly calmer pace.
            Cocktails at this rooftop tier typically cost 180,000 to 300,000 VND, so it is a step up in price from An
            Thuong, but the view earns it. A rooftop table timed for 9pm is one of the best seats for the fire show.
          </p>
        </div>

        <div id="beach-bars" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="beach-bars">My Khe beach bars</GuideH2>
          <p>
            The third zone is the beach itself. Along the My Khe and Bac My An seafront, lower-key beach bars set out
            plastic chairs on the sand for cold beer and fresh coconuts, which is the most relaxed way to spend an
            evening in Da Nang. It is the antidote to the rooftop crowds: barefoot, breezy, and cheap.
          </p>
          <p>
            If you want something more polished on the beachfront, spots along Vo Nguyen Giap such as Gypsy Kitchen, Esco
            Beach Club, and A La Carte Rooftop mix beach-club energy with food and sunset views. This stretch pairs
            naturally with a beach day; our{" "}
            <Link href="/guides/best-beaches-in-da-nang" className="text-[#E8742C] underline underline-offset-2">
              best beaches guide
            </Link>{" "}
            covers the daytime side of the same coast.
          </p>
        </div>

        <div id="cruise" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="cruise">A Han River dinner cruise</GuideH2>
          <p>
            To fill the earlier hours, a Han River cruise is an easy, relaxed option. Boats generally run from about 6pm
            to 9:30pm, and dinner-cruise tickets cost roughly 15 to 25 US dollars, with cheaper sightseeing-only tickets
            from around 5 dollars. Premium dragon-boat cruises often add a short traditional dance performance.
          </p>
          <p>
            The clever move is the timing. On weekend nights, pick a departure around 8 or 8:30pm, and you will be out
            on the water when the Dragon Bridge breathes fire at 9pm, watching the whole show from the river instead of
            the crowded bank. Arrive about 15 minutes early to check in. For where to eat on land instead, see our{" "}
            <Link href="/guides/da-nang-food-guide" className="text-[#E8742C] underline underline-offset-2">
              Da Nang food guide
            </Link>
            .
          </p>
        </div>

        <div id="markets" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="markets">Da Nang&apos;s night markets</GuideH2>
          <p>
            Night markets are the cheapest, liveliest way to eat and browse after dark. Son Tra Night Market sits right
            by the Dragon Bridge on the east bank, open daily from around 6pm until about 11pm, free to enter, and
            mixing street food with clothes and souvenir stalls. It is an ideal place to graze before the 9pm show,
            since it is a two-minute walk from the best viewing spots.
          </p>
          <p>
            Helio Night Market, further from the river, is another food-and-shopping option, though it runs in the
            evenings and may now be weekend-only, so check before you make a trip. Both markets are cheap, casual, and
            good for families.
          </p>
        </div>

        <div id="sun-wheel" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="sun-wheel">The Sun Wheel at night</GuideH2>
          <p>
            For a lit-up city view without the price of a rooftop bar, ride the Sun Wheel at Sun World Da Nang Wonders,
            one of Asia&apos;s tallest Ferris wheels at 115 meters. It runs until about 10:30pm, opening from around
            3:30pm on weekdays and 9:30am on weekends, though hours shift with the season. A wheel ride is 100,000 VND
            for adults, with cheaper tickets for children and free entry for the smallest.
          </p>
          <p>
            The park around it has themed zones, rides, and its own night market, so it works as a self-contained family
            evening. It sits on the west bank, a short drive from the river bars, so it is easy to pair with a night by
            the water.
          </p>
        </div>

        <div id="plan" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="plan">Putting a night together</GuideH2>
          <p>
            Because everything clusters, you can chain a whole evening with almost no travel. Here is the map of the
            main options, and a couple of ready-made plans.
          </p>
          <GuideTable
            columns={["What it is", "Vibe", "Timing"]}
            rows={[
              { label: "Dragon Bridge fire show", values: ["Free fire-and-water show", "Family, crowded, must-see", "Fri/Sat/Sun 9pm"] },
              { label: "An Thuong strip", values: ["Dense pubs and live music", "Casual, walkable, cheap", "~7pm to 2am"] },
              { label: "Bach Dang rooftops", values: ["Sky bars with bridge views", "Upscale, view-focused", "Sunset to ~2am"] },
              { label: "My Khe beach bars", values: ["Cold beer on the sand", "Laid-back, barefoot", "Sunset to late"] },
              { label: "Han River cruise", values: ["Dinner boat on the river", "Romantic, relaxed", "~6 to 9:30pm"] },
              { label: "Son Tra Night Market", values: ["Street food and shopping", "Bustling, budget", "~6 to 11pm"] },
            ]}
          />
          <GuideList
            items={[
              "The easy classic: graze at Son Tra Night Market from 8pm, watch the fire show at 9pm from the Bach Dang promenade, then walk to an An Thuong bar.",
              "The view night: dinner and cocktails at a Bach Dang rooftop, timed so you are up there for the 9pm show, then a nightcap.",
              "The relaxed night: a Han River dinner cruise departing around 8:30pm to catch the show from the water, then a beer on My Khe beach.",
            ]}
          />
        </div>

        <div id="red-eye" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="red-eye">One last night out before a red-eye</GuideH2>
          <p>
            A lot of flights out of Da Nang leave late. If you have checked out of your hotel but your plane does not
            board until after midnight, you do not have to babysit your bags all evening. Drop them somewhere safe, then
            go enjoy the city hands-free: catch the 9pm fire show, have a riverside dinner, or grab one last drink in An
            Thuong, all without a suitcase in tow.
          </p>

          <GuideStowCallout
            eyebrow="Before a late flight"
            heading="Store the bags early evening, enjoy the show, and collect before closing."
            facts={[
              { label: "Near the airport", value: "~10 min" },
              { label: "By the day", value: "60,000 VND (up to 24h)" },
              { label: "Open until", value: "10pm daily" },
            ]}
          >
            Stow is at 55 Ba Bang Nhan in Ngu Hanh Son, about ten minutes from the airport, from 15,000 VND an hour or
            60,000 VND a day. One thing to plan around: it closes at 10pm, so this works best for the early-evening city,
            not a 2am club night. The weekend fire show wraps by about 9:30pm, which leaves time to collect your luggage
            before the 10pm close and head straight to the airport. It pairs perfectly with a{" "}
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
          Show times, bar hours, market days, and prices change, and nightlife venues open and close often. This guide
          reflects the situation at the time of writing; check the fire-show schedule and any specific venue locally
          before you build your evening around it.
        </p>
      </GuideLayout>
    </>
  );
}
