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

const pageTitle = "Da Nang Hidden Gems: Offbeat Places Most Visitors Miss";
const pageDescription =
  "Da Nang hidden gems beyond Ba Na Hills and the Marble Mountains: Son Tra's quiet coves, Nam O reef, Ban Co Peak at dawn, Hoa Bac countryside, Con Market, the Tho Quang fish auction, and more, with real access notes.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides/da-nang-hidden-gems" },
  openGraph: { title: `${pageTitle} | Stow`, description: pageDescription, url: "https://www.stowdanang.com/guides/da-nang-hidden-gems" },
  twitter: { title: `${pageTitle} | Stow`, description: pageDescription },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Da Nang Hidden Gems", path: "/guides/da-nang-hidden-gems" },
]);

const RANKED = [
  {
    name: "Nam O Reef and fishing village",
    meta: "Lien Chieu, ~12 km northwest",
    blurb:
      "Three things in one spot at the foot of the Hai Van Pass: a rocky reef that turns emerald with moss in the cool months, a working anchovy-fishing village, and a centuries-old fish-sauce craft recognized as national heritage. The green-moss look is seasonal and best at low tide, so time it or you will see plain rock. Photographers and culture-first travelers love it.",
    schema: "A seasonal mossy reef beside a fishing and fish-sauce village.",
  },
  {
    name: "Son Tra's hidden coves",
    meta: "Son Tra, east of the center",
    blurb:
      "Beyond the Lady Buddha, Son Tra hides jungle-backed cove beaches like Bai Nam, Bai Da, and Da Den, with almost no facilities and few people on weekdays. One important catch: as of 2026 automatic scooters are banned on several Son Tra roads and some routes close after storms. Most rental bikes are automatic, so plan on a manual bike, a Grab car, or a driver.",
    schema: "Quiet, jungle-backed cove beaches on the Son Tra peninsula.",
  },
  {
    name: "Ban Co Peak at sunrise",
    meta: "Son Tra ridge · free",
    blurb:
      "The highest publicly reachable point on Son Tra, marked by a bronze sage seated at a giant stone chessboard, with near-360-degree views to the city, the beaches, and out toward the Cham Islands. Come at sunrise for cool cloud and near-solitude. The same Son Tra vehicle rules apply, so check the road status first.",
    schema: "A sunrise summit viewpoint with a chess statue and 360-degree views.",
  },
  {
    name: "Hoa Bac countryside",
    meta: "Hoa Vang, ~26 km northwest",
    blurb:
      "A quiet river valley of rice fields, Co Tu villages, and the clear Cu De river, an emerging eco-tourism area most visitors never reach. Come for river paddling, an old suspension bridge, off-road cycling, and ripe-rice-season photography. Facilities are scattered, so a guide or a homestay booking helps.",
    schema: "A rural river valley with rice fields and Co Tu ethnic villages.",
  },
  {
    name: "Suoi Voi (Elephant Springs)",
    meta: "~50 km north, on the Hue route",
    blurb:
      "A cluster of spring-fed jungle swimming pools named for an elephant-shaped boulder, cool and clear, about 20 km beyond the Hai Van Pass. It is the ideal swim-stop on a Da Nang to Hue drive, and one most day-trippers skip. Best in the dry season, when water levels are safe.",
    schema: "Spring-fed jungle swimming pools on the Hai Van route toward Hue.",
  },
  {
    name: "The Pink Church at opening time",
    meta: "Hai Chau center · free",
    blurb:
      "The 1923 candy-pink cathedral is no secret, but the gem is the timing. Arrive right at opening, before about 9am, for the pink glow, an empty forecourt, and soft light, with none of the midday crowds. It closes to sightseers during Mass and on Sundays, and modest dress is required.",
    schema: "A 1923 pink Gothic cathedral, best photographed right at opening.",
  },
  {
    name: "Con Market",
    meta: "Hai Chau center · cash only",
    blurb:
      "Da Nang's real working market since the 1940s, where residents shop and eat, in contrast to the souvenir-heavy Han Market. Cheap, loud, and unfiltered, with many dishes 15,000 to 50,000 VND. Go hungry, mid-morning, and bring small notes.",
    schema: "The locals' working market for cheap, authentic street food.",
  },
  {
    name: "Tho Quang fishing port at dawn",
    meta: "Son Tra base · roughly 4 - 6am",
    blurb:
      "Central Vietnam's biggest fishing port, where hundreds of boats unload and a raucous wholesale fish auction runs at first light. It is a genuine, non-touristy spectacle. It is also a working port, so it is wet, pungent, and busy; dress for mess and stay out of the way.",
    schema: "A dawn wholesale fish auction at a major working port.",
  },
  {
    name: "APEC Sculpture Park",
    meta: "Han riverfront, central · free",
    blurb:
      "A compact riverside park under a steel kite-shaped arch, ringed by 21 sculptures, each gifted by an APEC member economy. Most visitors walk straight past it on the way to the Dragon Bridge. It is free, central, and prettiest early in the morning or after dark, when it is lit.",
    schema: "A riverside sculpture park with works from 21 APEC economies.",
  },
  {
    name: "The Museum of Cham Sculpture",
    meta: "central, by the Dragon Bridge",
    blurb:
      "The best all-weather gem: a quiet 1915 colonial building holding the world's largest collection of Champa sculpture, hundreds of sandstone and terracotta works from the 5th to 15th centuries. Cool, calm, and uncrowded, it is the perfect rainy-day or midday-heat pick. Best in the morning for the light.",
    schema: "The world's largest collection of Champa sculpture, an all-weather pick.",
  },
];

const FAQ_ITEMS = [
  {
    q: "What are the best hidden gems in Da Nang?",
    a: "Son Tra's cove beaches and Ban Co Peak at dawn, Nam O reef and fishing village, the Hoa Bac countryside, Con Market, the Tho Quang dawn fish auction, and the Museum of Cham Sculpture. These sit well off the Ba Na Hills and Marble Mountains trail that most visitors follow.",
  },
  {
    q: "Where can I find quiet, uncrowded beaches in Da Nang?",
    a: "On the Son Tra peninsula. Bai Nam, Bai Da, and Da Den are jungle-backed cove beaches with few facilities, and Nam O beach in the northwest is a working fishing shore. On weekdays you can have long stretches almost to yourself.",
  },
  {
    q: "Is Nam O Reef worth visiting, and when?",
    a: "Yes, for photographers, but the emerald-moss look is seasonal, roughly the cool months, and only shows at low tide. Time it or you will see plain rock. The rocks are slippery, so wear grippy shoes, and pair the reef with the fishing and fish-sauce village nearby.",
  },
  {
    q: "Can I ride a scooter on the Son Tra peninsula in 2026?",
    a: "Often not on the key roads. As of 2026, automatic scooters are banned on several Son Tra segments, and some routes have closed for storm repair. Most rental bikes are automatic, so use a manual bike, a Grab car, or a driver, and check the current road status before you go.",
  },
  {
    q: "What is the best offbeat day trip from Da Nang?",
    a: "The Hoa Bac countryside for rivers and ethnic-minority villages, or Suoi Voi (Elephant Springs) as a cool jungle swim-stop on the Hai Van route toward Hue. Both sit well away from the coast and see far fewer visitors than the headline sights.",
  },
  {
    q: "Where do locals actually eat and shop in Da Nang?",
    a: "Con Market for cheap, authentic street food, where residents shop rather than tourists, and the Tho Quang fishing port at dawn for the freshest catch. Both are unpolished and real, and both reward going early and hungry.",
  },
  {
    q: "What is a good rainy-day hidden gem in Da Nang?",
    a: "The Museum of Cham Sculpture. It is quiet, air-conditioned, and full of Champa art from the 5th to 15th centuries, right by the Dragon Bridge. A morning visit takes about 30 to 45 minutes and is a calm contrast to the outdoor spots.",
  },
  {
    q: "When should I visit the Pink Church to avoid crowds?",
    a: "Right at opening, before about 9am, for soft light and an empty forecourt. It closes to sightseers during Mass and on Sundays, and modest dress is required, so an early weekday morning is the sweet spot for photos.",
  },
  {
    q: "How do I reach these offbeat spots without a scooter?",
    a: "Grab cars, private drivers, and small group tours reach Son Tra, Hoa Bac, and Nam O. Cars are allowed on many Son Tra roads where automatic scooters are not, so a driver is often the simplest and most legal way to see the peninsula's coves and viewpoints.",
  },
  {
    q: "Are these hidden gems family-friendly?",
    a: "Some are. Hoa Bac, Elephant Springs, the Cham Museum, and APEC Park suit families. The steep Son Tra lanes, the dawn fish port, and the slippery Nam O reef are better for older or more adventurous travelers who can handle rougher ground and early starts.",
  },
];

const SOURCES = [
  { label: "Danang FantastiCity (official city tourism)", url: "https://danangfantasticity.com/en", note: "the official portal for Nam O fish sauce, Hoa Bac eco-tourism, and APEC Park" },
  { label: "Vietnam Coracle: Son Tra motorbike guide", url: "https://www.vietnamcoracle.com/son-tra-peninsular-danang-motorbike-guide/", note: "the named Son Tra coves and viewpoints and honest access warnings" },
  { label: "DanangBike: Monkey Mountain scooter ban", url: "https://danangbike.com/monkey-mountain-scooter-ban/", note: "the current Son Tra automatic-scooter ban and closed segments" },
  { label: "Local Vietnam: Elephant Springs", url: "https://localvietnam.com/blog/the-elephant-springs-suoi-voi-between-hue-and-da-nang/", note: "the Suoi Voi swimming pools and their location on the Hue route" },
  { label: "Origin Vietnam: Nam O beach", url: "https://www.originvietnam.com/destinations/nam-o-beach/", note: "the Nam O reef, village, and seasonal moss detail" },
  { label: "Vinpearl: Con Market", url: "https://vinpearl.com/en/con-market-da-nang", note: "the Con Market history, hours, and local-food context" },
  { label: "Local Vietnam: Museum of Cham Sculpture", url: "https://localvietnam.com/da-nang/museum-of-cham-sculpture/", note: "the Cham Museum collection, building, and visit tips" },
  { label: "AllTrails: Ban Co Peak trail", url: "https://www.alltrails.com/trail/vietnam/da-nang/ban-co-peak-son-tra-mountain-trail", note: "the Ban Co Peak hike distance and difficulty" },
];

export default async function DaNangHiddenGems() {
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
              "Da Nang Hidden Gems"
            )
          ),
        }}
      />
      <GuideLayout
        dict={dict}
        currentPath="/guides/da-nang-hidden-gems"
        eyebrow="See & Do"
        title="Da Nang Hidden Gems"
        subhead="Ten offbeat places most visitors miss, from Son Tra's quiet coves to a dawn fish auction, with honest notes on how to reach each one."
        readingTime="11 min read"
        toc={[
          { id: "how-we-chose", label: "How we chose" },
          { id: "ranked", label: "The 10 hidden gems" },
          { id: "compare", label: "At a glance" },
          { id: "bags", label: "For early starts" },
          { id: "faq", label: "Questions people ask" },
        ]}
        related={[
          { title: "Son Tra Peninsula and the Lady Buddha", href: "/guides/son-tra-peninsula", blurb: "The peninsula behind several of these gems, with the current access rules." },
          { title: "The Best Beaches in Da Nang", href: "/guides/best-beaches-in-da-nang", blurb: "From the main strip to the wild Son Tra coves and Nam O." },
        ]}
      >
        <GuideLead>
          Most Da Nang lists send you to the same five sights. This one does not. After the Marble Mountains and Ba Na
          Hills, the city keeps a quieter set of places locals actually use: cove beaches with no hotels, a reef that
          turns green, a dawn fish auction, a rural river valley, and a candy-pink cathedral best seen before the crowds.
          Here are ten of them, with the honest access notes the glossy lists leave out.
        </GuideLead>

        <GuideTLDR>
          Da Nang hides real gems beyond the headline sights. Ride <strong>Son Tra&apos;s quiet coves</strong> and{" "}
          <strong>Ban Co Peak</strong> at dawn, watch <strong>Nam O reef</strong> turn green at low tide, eat at{" "}
          <strong>Con Market</strong>, wander the <strong>Hoa Bac</strong> countryside, and catch the{" "}
          <strong>Tho Quang</strong> dawn fish auction. Go early for the best light and fewest people, and always check
          Son Tra&apos;s road closures and scooter rules first, since automatic scooters are barred on several routes.
        </GuideTLDR>

        <GuideImage
          src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Da_Nang_and_the_Son_Tra_Peninsula.jpg"
          alt="Da Nang city with the green Son Tra peninsula rising behind it"
          width={4032}
          height={3024}
          credit="Christophe95"
          creditUrl="https://commons.wikimedia.org/wiki/File:Da_Nang_and_the_Son_Tra_Peninsula.jpg"
          license="CC BY-SA 4.0"
        />

        <GuideFacts
          items={[
            { label: "Offbeat spots", value: "10 picks" },
            { label: "Son Tra access", value: "Auto scooters barred" },
            { label: "Nam O moss", value: "Cool months, low tide" },
            { label: "Locals' market", value: "Con Market" },
            { label: "Dawn spectacle", value: "Tho Quang port" },
            { label: "Rainy-day pick", value: "Cham Museum" },
          ]}
        />

        <div id="how-we-chose" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="how-we-chose">How we chose these</GuideH2>
          <p>
            Many pages that promise hidden gems just relist the famous sights. We did the opposite: we kept only places
            with low tourist footfall, a specific reason to go, and a realistic way to reach them, cross-checked against
            Vietnamese tourism sources and independent guides. We also flagged every access issue, because in Da Nang the
            catch is usually getting there, not the place itself.
          </p>
          <GuideCallout label="Read this before you ride Son Tra">
            Several of these gems sit on the Son Tra peninsula, and the access rules changed in 2026. Automatic scooters
            are now banned on several Son Tra roads, and some routes close after storms. Most rental bikes are automatic,
            so the simplest legal option is a manual bike, a Grab car, or a driver. Check the current road status before
            you set out.
          </GuideCallout>
        </div>

        <div id="ranked" className="flex flex-col gap-5 scroll-mt-[88px]">
          <GuideH2 id="ranked">The 10 best hidden gems in Da Nang</GuideH2>
          {RANKED.map((spot, i) => (
            <div key={spot.name} className="flex flex-col gap-1.5">
              <GuideH3>{`${i + 1}. ${spot.name}`}</GuideH3>
              <p className="text-[13px] text-[#6B7280]">{spot.meta}</p>
              <p>{spot.blurb}</p>
            </div>
          ))}
          <p className="text-[14px] text-[#6B7280]">
            One more for the truly off-map: the early-1900s <strong>Tien Sa lighthouse</strong> and an 800-year-old
            banyan tree at Son Tra&apos;s far-eastern tip. They are atmospheric and remote, but access to those routes is
            often restricted, so confirm they are open before you make the trip.
          </p>
        </div>

        <div id="compare" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="compare">The hidden gems at a glance</GuideH2>
          <GuideTable
            columns={["What it is", "Area", "Key note"]}
            rows={[
              { label: "Nam O reef + village", values: ["Mossy reef, fishing, fish sauce", "Lien Chieu, ~12 km NW", "Moss is seasonal, low tide only"] },
              { label: "Son Tra coves", values: ["Jungle-backed cove beaches", "Son Tra, east", "Auto scooters banned; use a driver"] },
              { label: "Ban Co Peak", values: ["360-degree summit viewpoint", "Son Tra ridge", "Go at sunrise; vehicle limits"] },
              { label: "Hoa Bac", values: ["River valley, Co Tu villages", "Hoa Vang, ~26 km NW", "Limited facilities; guide helps"] },
              { label: "Suoi Voi", values: ["Jungle spring pools", "~50 km N, Hue route", "Dry-season best; Hai Van detour"] },
              { label: "Pink Church", values: ["1923 pink cathedral", "Hai Chau center", "Go before 9am; closed at Mass"] },
              { label: "Con Market", values: ["Real local market", "Hai Chau center", "Cheap eats; cash only"] },
              { label: "Tho Quang port", values: ["Dawn fish auction", "Son Tra base", "4 - 6am; working port, messy"] },
              { label: "APEC Sculpture Park", values: ["Riverside sculpture garden", "Han riverfront", "Free; best lit at night"] },
              { label: "Cham Museum", values: ["Champa sculpture collection", "By the Dragon Bridge", "All-weather; quiet mornings"] },
            ]}
          />
          <GuideImage
            src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Da_Nang_Cathedral_in_2015_05.jpg"
            alt="The pink Da Nang Cathedral, known as the Pink Church, in the city center"
            width={3072}
            height={1728}
            credit="Vuong Tri Binh"
            creditUrl="https://commons.wikimedia.org/wiki/File:Da_Nang_Cathedral_in_2015_05.jpg"
            license="CC BY-SA 4.0"
          />
        </div>

        <div id="bags" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="bags">Chasing an early start or a departure-day detour?</GuideH2>
          <p>
            Many of these gems reward an early start or a between-hotels detour. The Tho Quang catch comes in at dawn,
            Son Tra is best at sunrise, and Nam O only glows at low tide, which may fall on your departure day. None of
            that is fun with a suitcase up a jungle lane or on a working dock.
          </p>

          <GuideStowCallout
            eyebrow="Travel light"
            heading="Drop the bags first, then chase the sunrise hands-free."
            facts={[
              { label: "Near the Son Tra base", value: "Ngu Hanh Son" },
              { label: "By the day", value: "60,000 VND (up to 24h)" },
              { label: "Open", value: "7am - 10pm daily" },
            ]}
          >
            If you are chasing the dawn fish auction on your last day, or squeezing Son Tra into a{" "}
            <Link href="/guides/da-nang-layover-guide" className="text-[#E8742C] underline underline-offset-2">
              layover
            </Link>
            , drop your bags first. Stow is at 55 Ba Bang Nhan in Ngu Hanh Son, about ten minutes from the airport and
            open 7am to 10pm, from 15,000 VND an hour or 60,000 VND a day. Explore unencumbered, then collect everything
            on the way to your flight.
          </GuideStowCallout>
        </div>

        <div id="faq" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="faq">Questions people ask</GuideH2>
          <GuideFAQ items={FAQ_ITEMS} />
        </div>

        <GuideSources items={SOURCES} />

        <p className="text-[13px] text-[#9CA3AF]">
          This guide was compiled from official tourism sources and independent guides, and last reviewed in September
          2026. Access rules on Son Tra, seasonal conditions at Nam O, and opening hours all change, and some routes
          close after storms, so confirm the current status of anything you plan around before you go.
        </p>
      </GuideLayout>
    </>
  );
}
