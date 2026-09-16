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

const pageTitle = "The Best Day Trips from Da Nang: Hoi An, Hue, My Son, and More";
const pageDescription =
  "The best day trips from Da Nang, ranked: Hoi An, Hue over the Hai Van Pass, Ba Na Hills, the Marble Mountains, Son Tra, My Son Sanctuary, the Cham Islands, and Bach Ma National Park. Distances, costs, and how long each takes.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides/best-day-trips-from-da-nang" },
  openGraph: { title: `${pageTitle} | Stow`, description: pageDescription, url: "https://www.stowdanang.com/guides/best-day-trips-from-da-nang" },
  twitter: { title: `${pageTitle} | Stow`, description: pageDescription },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Best Day Trips from Da Nang", path: "/guides/best-day-trips-from-da-nang" },
]);

const RANKED = [
  {
    name: "Hoi An",
    meta: "~30 km · ~45 min · half or full day",
    blurb:
      "The easiest and most popular trip: a UNESCO Ancient Town of lantern-lit lanes, tailors, and riverfront food, about 30 km south. Time it for the late afternoon and evening, when the day crowds thin and the lanterns come on.",
    schema: "UNESCO Ancient Town about 30 km south, the easiest day trip.",
    href: "/guides/da-nang-to-hoi-an-day-trip",
    hrefLabel: "Read our Da Nang to Hoi An day trip guide",
  },
  {
    name: "Hue via the Hai Van Pass",
    meta: "~95 - 100 km · ~2 hr · full day",
    blurb:
      "The former imperial capital, with its Citadel, royal tombs, and the Perfume River, reached over the scenic Hai Van Pass. Fold in a photo stop at Lang Co beach and Lap An lagoon on the way. Start early, since it is a full day.",
    schema: "The imperial capital reached over the scenic Hai Van Pass.",
    href: "/guides/da-nang-to-hue-day-trip",
    hrefLabel: "Read our Da Nang to Hue day trip guide",
  },
  {
    name: "Ba Na Hills and the Golden Bridge",
    meta: "~35 km · ~45 - 60 min · full day · ~1,000,000 VND",
    blurb:
      "A mountaintop resort with the famous Golden Bridge held up by giant stone hands, a French Village, and Fantasy Park, all reached by cable car. One combined ticket runs about 1,000,000 VND for an adult in 2026. Great for families and first-time photographers.",
    schema: "Mountaintop resort with the Golden Bridge, reached by cable car.",
    href: "/guides/ba-na-hills-day-trip",
    hrefLabel: "Read our Ba Na Hills day trip guide",
  },
  {
    name: "The Marble Mountains",
    meta: "~7 km · ~15 - 20 min · 2 - 3 hr · 40,000 VND",
    blurb:
      "Five limestone-and-marble peaks riddled with caves, shrines, and viewpoints, just 15 minutes from the city. Entry is 40,000 VND, with a 15,000 VND elevator or free stairs. The easiest half-day here, and the closest of all these trips to the beach-resort district.",
    schema: "Five marble peaks with caves and viewpoints, 15 minutes away.",
    href: "/guides/marble-mountains-guide",
    hrefLabel: "Read our Marble Mountains guide",
  },
  {
    name: "Son Tra Peninsula",
    meta: "~10 km · ~20 min · half day · free",
    blurb:
      "A forested cape with the 67 m Lady Buddha at Linh Ung Pagoda, coastal viewpoints, and rare red-shanked doucs in the trees. The pagoda and viewpoints are free, and a focused visit is an easy half day.",
    schema: "Forested cape with the Lady Buddha statue and coastal viewpoints.",
    href: "/guides/son-tra-peninsula",
    hrefLabel: "Read our Son Tra peninsula guide",
  },
  {
    name: "My Son Sanctuary",
    meta: "~40 km · ~1 - 1.5 hr · half day · 150,000 VND",
    blurb:
      "A UNESCO site of red-brick Hindu temple-towers built by the Champa kingdom between roughly the 4th and 13th centuries, set in a jungle valley and often called Vietnam's Angkor Wat in miniature. Entry is 150,000 VND for foreign adults in 2026, which includes the electric shuttle and a short daytime Cham dance. Go early, before the tour buses and the heat, and allow 2 to 3 hours on site.",
    schema: "UNESCO Cham temple ruins in a jungle valley, about 40 km southwest.",
  },
  {
    name: "The Cham Islands (Cu Lao Cham)",
    meta: "via Hoi An port · full day · from ~70,000 VND + boat",
    blurb:
      "A small archipelago about 15 km off Hoi An, a marine park and UNESCO biosphere reserve with coral reefs, snorkeling, and quiet beaches. There is no direct boat from Da Nang: drive to Cua Dai Port near Hoi An (about 45 to 60 minutes), then take a speedboat, roughly 20 minutes. Island entry is about 70,000 VND plus a small eco fee. Best from about March to September, since boats are often suspended in the rough winter months.",
    schema: "Marine-park archipelago off Hoi An for snorkeling and beaches.",
  },
  {
    name: "Bach Ma National Park",
    meta: "~60 - 70 km · ~1 hr 20 · full day · ~60,000 - 65,000 VND",
    blurb:
      "A cool mountain park rising to about 1,450 m, with cloud-forest trails, the tall Do Quyen Waterfall, mountain lakes, old French villa ruins, and a summit viewpoint. It is about a 1 hour 20 minute drive via the Hai Van Tunnel, and entry is roughly 60,000 to 65,000 VND. Best from December to April for clear views and safer trails, and a full day for the hiking.",
    schema: "Cool mountain national park with cloud forest, waterfalls, and trails.",
  },
];

const FAQ_ITEMS = [
  {
    q: "What is the best day trip from Da Nang?",
    a: "Hoi An is the easiest and most popular, about 30 km and 45 minutes away, with lantern-lit streets and great food. For history, choose My Son Sanctuary; for families, Ba Na Hills and the Golden Bridge; for nature, the Cham Islands or Bach Ma National Park.",
  },
  {
    q: "How far is My Son from Da Nang?",
    a: "About 40 km southwest, roughly a 1 to 1.5 hour drive. It makes a comfortable half-day trip, and it pairs well with an early start to beat the heat and the tour buses. Allow 2 to 3 hours to walk the temple groups on site.",
  },
  {
    q: "How much is the My Son entrance fee?",
    a: "In 2026 it is 150,000 VND for foreign adults and 100,000 VND for Vietnamese adults, with lower rates for children aged 5 to 15 and free entry under 5. The ticket includes the electric shuttle into the valley and a short daytime Cham dance performance.",
  },
  {
    q: "Can you visit the Cham Islands from Da Nang?",
    a: "Yes, but there is no direct boat. Drive to Cua Dai Port near Hoi An, about 45 to 60 minutes, then take a speedboat, roughly 20 minutes each way. Most people book a guided snorkel day tour that bundles the boat, fees, lunch, and gear.",
  },
  {
    q: "How much does it cost to visit the Cham Islands?",
    a: "Island entry is about 70,000 VND plus a small ecological fee of around 20,000 to 30,000 VND, and the boat is extra, with a speedboat roundtrip roughly 500,000 VND. Bring cash in VND, since card payment on the island is limited.",
  },
  {
    q: "When is the best time to visit the Cham Islands?",
    a: "The dry season, about March to September, has calm seas and clear water for snorkeling. From October to February the sea gets rough and boat services are often suspended, so avoid planning a Cham Islands day in the wet, stormy months.",
  },
  {
    q: "How far is Bach Ma National Park from Da Nang?",
    a: "About 60 to 70 km, roughly a 1 hour 20 minute drive via the Hai Van Tunnel, or the slower, scenic Hai Van Pass. It is a full-day trip, so start early and plan to be off the mountain by late afternoon.",
  },
  {
    q: "What is the entrance fee for Bach Ma National Park?",
    a: "About 60,000 to 65,000 VND for adults and 20,000 to 25,000 VND for children, depending on the source, so confirm the current rate at the gate. A park vehicle is normally used to reach the summit area, which may cost extra.",
  },
  {
    q: "When is the best time to visit Bach Ma National Park?",
    a: "December to April, the dry season, brings cooler air, clearer views, and safer trails. The park sits high and gets a lot of cloud and rain, so a dry-season day gives you the best chance of the summit view and dry paths.",
  },
  {
    q: "Can you do Hue as a day trip from Da Nang?",
    a: "Yes. Hue is about 95 to 100 km and roughly 2 hours away over the Hai Van Pass, so it works as a full day if you start early. Many people take the scenic train or a private car so they can enjoy the pass and the coastal views along the way.",
  },
];

const SOURCES = [
  { label: "Vietnam Airlines: Bach Ma National Park", url: "https://www.vietnamairlines.com/cn/en/plan-book/travel/travel-guide/bach-ma-nation-park", note: "the national carrier's guide to Bach Ma: fees, hours, distance, and activities" },
  { label: "Bliss Hoi An: My Son Sanctuary entrance fee", url: "https://blisshoian.com/news/my-son-sanctuary-entrance-fee/", note: "the clearest 2026 My Son fee table and ticket inclusions" },
  { label: "Hoi An Day Trip: how to get to Cham Island", url: "https://hoiandaytrip.com/how-to-get-to-cham-island-vietnam/", note: "the Cua Dai port route, boat times and prices, and island fees" },
  { label: "Pullman Da Nang: My Son Sanctuary", url: "https://www.pullman-danang.com/discovery/destination/my-son-sanctuary/", note: "the distance, drive time, and Champa heritage context" },
  { label: "Holidify: My Son Sanctuary", url: "https://www.holidify.com/places/da-nang/site-archelogique-de-my-son-sightseeing-124301.html", note: "a cross-check on My Son fees and opening hours" },
  { label: "Sun Paradise Land: Ba Na Hills ticket prices 2026", url: "https://sunparadiseland.com/en/SunParadiseLandDaNang/tin-tuc/ba-na-hills-ticket-prices-2026-cable-car-fares-and-saving-tips-7745", note: "the 2026 Ba Na Hills combined ticket price" },
  { label: "VinWonders: Hue to Da Nang", url: "https://vinwonders.com/en/wonderpedia/news/hue-to-da-nang/", note: "the Da Nang to Hue distance and drive time" },
  { label: "Jungle Boss Tours: Marble Mountains", url: "https://junglebosstours.com/explorer/tourism-blog/vietnam-marble-mountains-danang", note: "the Marble Mountains distance, entry, and elevator fee" },
];

export default async function BestDayTripsFromDaNang() {
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
              RANKED.map((r) => ({
                name: r.name,
                description: r.schema,
                ...(r.href ? { url: `https://www.stowdanang.com${r.href}` } : {}),
              })),
              "The Best Day Trips from Da Nang"
            )
          ),
        }}
      />
      <GuideLayout
        dict={dict}
        currentPath="/guides/best-day-trips-from-da-nang"
        eyebrow="Day Trips"
        title="The Best Day Trips from Da Nang"
        subhead="Eight trips ranked, from the easy Hoi An run to the temples of My Son and the cool forests of Bach Ma, with real distances, costs, and timings."
        readingTime="11 min read"
        toc={[
          { id: "how-we-chose", label: "How we chose" },
          { id: "ranked", label: "The 8 best day trips" },
          { id: "compare", label: "Compared at a glance" },
          { id: "bags", label: "Day-tripping on checkout day" },
          { id: "faq", label: "Questions people ask" },
        ]}
        related={[
          { title: "The Perfect Da Nang Itinerary", href: "/guides/da-nang-itinerary", blurb: "How to fit these day trips into a 3 to 5 day plan without rushing." },
          { title: "Da Nang to Hoi An Day Trip", href: "/guides/da-nang-to-hoi-an-day-trip", blurb: "The most popular trip of all, done properly, timed for the lanterns." },
        ]}
      >
        <GuideLead>
          Da Nang sits in the middle of central Vietnam&apos;s best sights, which is half the reason to base here. Within
          an easy drive you have a UNESCO old town, an imperial capital, ancient temple ruins, a giant golden bridge, and
          a cool mountain national park. This hub ranks the eight best day trips, keeps the ones with a full guide short
          and links you through, and digs into the three that deserve more detail.
        </GuideLead>

        <GuideTLDR>
          The best day trips from Da Nang are <strong>Hoi An</strong> (about 30 km), <strong>Hue</strong> over the Hai
          Van Pass, <strong>Ba Na Hills</strong> and the Golden Bridge, and the <strong>Marble Mountains</strong>. For
          history, add <strong>My Son Sanctuary</strong>, about 40 km southwest. For nature, choose the{" "}
          <strong>Cham Islands</strong> or <strong>Bach Ma National Park</strong>. Most take a half or full day, and the
          one universal tip is to leave your bags behind and travel light.
        </GuideTLDR>

        <GuideImage
          src="https://upload.wikimedia.org/wikipedia/commons/9/92/2024_-_M%E1%BB%B9_S%C6%A1n_Group_B%2C_C_and_D_-_img_48.jpg"
          alt="Red-brick Champa temple towers at My Son Sanctuary near Da Nang"
          width={4032}
          height={3024}
          credit="Chainwit."
          creditUrl="https://commons.wikimedia.org/wiki/File:2024_-_M%E1%BB%B9_S%C6%A1n_Group_B,_C_and_D_-_img_48.jpg"
          license="CC BY 4.0"
        />

        <GuideFacts
          items={[
            { label: "Easiest", value: "Hoi An (~30 km)" },
            { label: "Furthest common", value: "Hue (~100 km)" },
            { label: "For history", value: "My Son" },
            { label: "For nature", value: "Cham Islands, Bach Ma" },
            { label: "My Son fee", value: "150,000 VND" },
            { label: "Cham season", value: "Mar - Sep" },
          ]}
        />

        <div id="how-we-chose" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="how-we-chose">How we chose and ranked these</GuideH2>
          <p>
            We ranked these trips by how easy they are to reach from Da Nang, the drive time, the cost, and how much you
            gain from a single day out. We cross-checked every distance, fee, and opening time against official tourism
            sources and multiple 2026 traveler guides. The five with a dedicated Stow guide are kept short here, with a
            link to the full version; the three without one, My Son, the Cham Islands, and Bach Ma, get the detail.
          </p>
          <GuideCallout label="A note on prices and schedules">
            The figures here reflect September 2026. Entrance fees, boat schedules, and Ba Na Hills ticket prices change,
            and the Cham Islands boats are often suspended in the rough winter months, so reconfirm before you travel.
          </GuideCallout>
        </div>

        <div id="ranked" className="flex flex-col gap-5 scroll-mt-[88px]">
          <GuideH2 id="ranked">The 8 best day trips from Da Nang</GuideH2>
          {RANKED.map((trip, i) => (
            <div key={trip.name} className="flex flex-col gap-1.5">
              <GuideH3>{`${i + 1}. ${trip.name}`}</GuideH3>
              <p className="text-[13px] text-[#6B7280]">{trip.meta}</p>
              <p>{trip.blurb}</p>
              {trip.href && (
                <p>
                  <Link href={trip.href} className="text-[#E8742C] underline underline-offset-2 text-[14px]">
                    {trip.hrefLabel}
                  </Link>
                </p>
              )}
            </div>
          ))}
        </div>

        <div id="compare" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="compare">The day trips compared</GuideH2>
          <GuideTable
            columns={["Distance", "Travel time", "Length", "Best for"]}
            rows={[
              { label: "Hoi An", values: ["~30 km", "~45 min", "half / full day", "First-timers, food, lanterns"] },
              { label: "Hue (Hai Van Pass)", values: ["~95 - 100 km", "~2 hr", "full day", "History, scenic drive"] },
              { label: "Ba Na Hills", values: ["~35 km", "~45 - 60 min", "full day", "Families, photos"] },
              { label: "Marble Mountains", values: ["~7 km", "~15 - 20 min", "2 - 3 hr", "Short on time, culture"] },
              { label: "Son Tra", values: ["~10 km", "~20 min", "half day", "Views, wildlife"] },
              { label: "My Son", values: ["~40 km", "~1 - 1.5 hr", "half day", "History, UNESCO temples"] },
              { label: "Cham Islands", values: ["via Hoi An port", "~1 hr + boat", "full day", "Snorkeling, beaches"] },
              { label: "Bach Ma", values: ["~60 - 70 km", "~1 hr 20", "full day", "Hikers, cool nature"] },
            ]}
          />
          <GuideImage
            src="https://upload.wikimedia.org/wikipedia/commons/1/1a/A_seaside_shot_in_C%C3%B9_Lao_Ch%C3%A0m%2C_Qu%E1%BA%A3ng_Nam_province%2C_taken_in_July_2024.jpg"
            alt="A quiet seaside view on the Cham Islands off the coast near Hoi An"
            width={2048}
            height={1536}
            credit="Theguywithkpdomain"
            creditUrl="https://commons.wikimedia.org/wiki/File:A_seaside_shot_in_C%C3%B9_Lao_Ch%C3%A0m,_Qu%E1%BA%A3ng_Nam_province,_taken_in_July_2024.jpg"
            license="CC0"
          />
        </div>

        <div id="bags" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="bags">Day-tripping on your checkout day?</GuideH2>
          <p>
            These trips often bump into the last day of a stay. You check out at noon, but your flight is not until the
            evening, so there is time for one more trip, except that you are now hauling a suitcase to a temple or a
            mountain. The fix is simple: leave the bags in Da Nang and travel light.
          </p>

          <GuideStowCallout
            eyebrow="One last trip"
            heading="Leave the bags in Da Nang, day-trip light, and collect before your flight."
            facts={[
              { label: "By the Marble Mountains", value: "Ngu Hanh Son" },
              { label: "By the day", value: "60,000 VND (up to 24h)" },
              { label: "Open", value: "7am - 10pm daily" },
            ]}
          >
            Stow is at 55 Ba Bang Nhan in Ngu Hanh Son, right by the Marble Mountains and about ten minutes from the
            airport. Drop your bags from 15,000 VND an hour or 60,000 VND a day, open 7am to 10pm, then head out to My
            Son or Bach Ma unencumbered and collect everything on the way to the terminal. To slot these trips into a
            wider plan, see our{" "}
            <Link href="/guides/da-nang-itinerary" className="text-[#E8742C] underline underline-offset-2">
              Da Nang itinerary
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
          This guide was compiled from official tourism sources and 2026 traveler guides, and last reviewed in September
          2026. Entrance fees, boat schedules, and ticket prices change, and Cham Islands boats can be suspended in
          rough weather, so reconfirm the details before you set out.
        </p>
      </GuideLayout>
    </>
  );
}
