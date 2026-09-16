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

const pageTitle = "Son Tra Peninsula (Monkey Mountain) and the Lady Buddha: A Complete Guide";
const pageDescription =
  "A full guide to Son Tra Peninsula (Monkey Mountain) in Da Nang: the 67 m Lady Buddha at Linh Ung Pagoda, the best viewpoints, the endangered red-shanked doucs, the scooter ban, and a half-day route.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides/son-tra-peninsula" },
  openGraph: { title: `${pageTitle} | Stow`, description: pageDescription, url: "https://www.stowdanang.com/guides/son-tra-peninsula" },
  twitter: { title: `${pageTitle} | Stow`, description: pageDescription },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Son Tra Peninsula", path: "/guides/son-tra-peninsula" },
]);

const FAQ_ITEMS = [
  {
    q: "How tall is the Lady Buddha in Da Nang?",
    a: "About 67 meters, which makes it Vietnam's tallest statue of its kind, roughly the height of a 30-storey building. It stands on a lotus pedestal about 35 meters wide at Linh Ung Pagoda on the Son Tra peninsula, and it faces out to sea.",
  },
  {
    q: "Is the Son Tra Lady Buddha the same as the one at the Marble Mountains?",
    a: "No. The famous 67 m Lady Buddha that most tourists photograph is on the Son Tra peninsula. Da Nang has three separate Linh Ung Pagodas, at Son Tra, the Marble Mountains, and Ba Na Hills, and the Marble Mountains have their own, older Quan Am site.",
  },
  {
    q: "Is Linh Ung Pagoda free, and what are the opening hours?",
    a: "Entry is free, with donations welcome. The pagoda is typically open from about 6am to 9pm daily. Note these are the pagoda's hours; the steep mountain routes to the viewpoints have separate, shorter access hours set by the reserve management.",
  },
  {
    q: "What is the dress code at the Lady Buddha and Linh Ung Pagoda?",
    a: "Cover your shoulders and knees. Avoid tank tops, short shorts, and short skirts, since it is a working temple. Lightweight long clothing is fine in the heat, and a scarf or sarong is an easy cover-up to carry if you are coming from the beach.",
  },
  {
    q: "Can you ride a scooter up Son Tra?",
    a: "Not an automatic one on the steep mountain routes. The reserve management bans automatic scooters from routes like Ban Co Peak and the Banyan Tree, because automatics have no engine braking and the brakes can overheat and fail on long descents. Use a manual or semi-automatic bike, a car, or a tour.",
  },
  {
    q: "Why is Son Tra called Monkey Mountain?",
    a: "American forces nicknamed it Monkey Mountain during the Vietnam War for its many monkeys, including the red-shanked douc langur, and the US also ran a radar facility on top. The name Son Tra itself likely comes from the wild son tra trees that grow on the headland.",
  },
  {
    q: "Will I see monkeys or langurs on Son Tra?",
    a: "Often, yes, especially in the cool early morning between about 6 and 9am, high in the trees along the quieter roads. More than 1,300 endangered red-shanked doucs live here, the largest population of the species. Watch them quietly from a distance and never feed them.",
  },
  {
    q: "How far is Son Tra from Da Nang, and how do I get there?",
    a: "The peninsula sits about 10 km northeast of the city center, roughly 20 to 25 minutes by taxi or Grab. There is no bus or train, so you reach it by car, taxi, motorbike, or bicycle only. A taxi from the airport to Linh Ung Pagoda costs around 200,000 VND.",
  },
  {
    q: "What is the best time of day to visit Son Tra?",
    a: "Early morning, from about 5 to 7am, gives cool light, low cloud, and the most active langurs. Late afternoon, after 4pm, is best for sunset over the city from the peaks. Midday is hot and hazy, and the open plaza at the pagoda offers little shade.",
  },
  {
    q: "How long do I need for Son Tra?",
    a: "A focused visit to Linh Ung Pagoda plus one viewpoint is a comfortable half day, about 3 to 4 hours including transport. If you want to hike, spot langurs, and reach the Banyan Tree, budget most of a day and check road access before you go.",
  },
];

const SOURCES = [
  { label: "Vinpearl: Linh Ung Pagoda and Son Tra Mountain", url: "https://vinpearl.com/en/linh-ung-pagoda-a-famous-spiritual-site-in-da-nang-vietnam", note: "the statue height, location, name origin, and the reserve's radar history" },
  { label: "DanangBike: Monkey Mountain scooter ban", url: "https://danangbike.com/monkey-mountain-scooter-ban/", note: "the automatic-scooter ban, route-by-route status, and the mountain access hours" },
  { label: "Vietnam Coracle: Son Tra motorbike guide", url: "https://www.vietnamcoracle.com/son-tra-peninsular-danang-motorbike-guide/", note: "the riding routes, road hazards, landslide risk, and coastal landmarks" },
  { label: "Nhan Dan: 1,300+ red-shanked doucs in Son Tra", url: "https://en.nhandan.vn/da-nang-more-than-1-300-red-shanked-doucs-live-in-son-tra-post51342.html", note: "the current douc langur population figure" },
  { label: "GreenViet: red-shanked douc langurs", url: "https://greenviet.org/en/blog/red-shanked-douc-langurs-the-treasure-of-da-nang/", note: "the conservation status and the local surveys of the species" },
  { label: "Hoi An Day Trip: Ban Co Peak", url: "https://hoiandaytrip.com/ban-co-peak-da-nang/", note: "the Ban Co Peak viewpoint, the chess statue, and the panorama" },
  { label: "Your Vietnam Travel: the three Linh Ung Pagodas", url: "https://www.yourvietnamtravel.com/linh-ung-pagoda-da-nang", note: "the disambiguation between Da Nang's three Linh Ung Pagodas" },
  { label: "AllTrails: Ban Co Peak Son Tra trail", url: "https://www.alltrails.com/trail/vietnam/da-nang/ban-co-peak-son-tra-mountain-trail", note: "the full hike distance, elevation gain, and time" },
];

export default async function SonTraPeninsula() {
  const dict = await getDictionary("en");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideFaqJsonLd(FAQ_ITEMS)) }} />
      <GuideLayout
        dict={dict}
        currentPath="/guides/son-tra-peninsula"
        eyebrow="See & Do"
        title="Son Tra Peninsula and the Lady Buddha"
        subhead="Monkey Mountain, the 67 m Lady Buddha, the viewpoints, the endangered doucs, and how to get around now the scooter rules have changed."
        readingTime="11 min read"
        toc={[
          { id: "what-where", label: "What and where it is" },
          { id: "lady-buddha", label: "The Lady Buddha and Linh Ung" },
          { id: "which-lady-buddha", label: "Which Lady Buddha is this?" },
          { id: "viewpoints", label: "The best viewpoints" },
          { id: "wildlife", label: "The red-shanked doucs" },
          { id: "getting-there", label: "Getting there and around" },
          { id: "scooter", label: "The scooter ban explained" },
          { id: "best-time", label: "Best time to visit" },
          { id: "route", label: "A half-day route" },
          { id: "faq", label: "Questions people ask" },
        ]}
        related={[
          { title: "Marble Mountains (Ngu Hanh Son) Guide", href: "/guides/marble-mountains-guide", blurb: "The other Lady Buddha site, and how the three pagodas differ." },
          { title: "The Best Beaches in Da Nang", href: "/guides/best-beaches-in-da-nang", blurb: "The wild coves along the Son Tra coast, and the main city beaches." },
        ]}
      >
        <GuideLead>
          Son Tra is the green headland you see across the water from My Khe beach, crowned by a giant white statue that
          watches over the bay. Locals call it Monkey Mountain. It holds Da Nang&apos;s most photographed sight, some of
          the city&apos;s best viewpoints, and one of the rarest primates in the world. It is also the one place near Da
          Nang where getting around has real rules, so this guide covers both what to see and how to reach it safely.
        </GuideLead>

        <GuideTLDR>
          Son Tra Peninsula (Monkey Mountain) is a forested headland about 10 km northeast of central Da Nang. Its star
          sight is the <strong>67 m Lady Buddha</strong>, Vietnam&apos;s tallest such statue, at the free{" "}
          <strong>Linh Ung Pagoda</strong> (open about 6am to 9pm). The peninsula also has big viewpoints like{" "}
          <strong>Ban Co Peak</strong> and more than <strong>1,300 endangered red-shanked doucs</strong>. Note the
          access rules: automatic scooters are barred from the steep mountain routes, so use a car, a manual bike, or a
          tour. A pagoda visit plus one viewpoint is a comfortable half day.
        </GuideTLDR>

        <GuideImage
          src="https://upload.wikimedia.org/wikipedia/commons/9/9c/Linh_Ung_Pagoda_1.jpg"
          alt="Linh Ung Pagoda and the tall white Lady Buddha statue on the Son Tra peninsula in Da Nang"
          width={4032}
          height={3024}
          credit="Christophe95"
          creditUrl="https://commons.wikimedia.org/wiki/File:Linh_Ung_Pagoda_1.jpg"
          license="CC BY-SA 4.0"
        />

        <GuideFacts
          items={[
            { label: "Lady Buddha height", value: "67 m" },
            { label: "Pagoda entry", value: "Free" },
            { label: "Pagoda hours", value: "~6am - 9pm" },
            { label: "From city center", value: "~10 km, 20-25 min" },
            { label: "Doucs on Son Tra", value: "1,300+" },
            { label: "Auto scooters", value: "Barred on mountain routes" },
          ]}
        />

        <div id="what-where" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="what-where">What and where is Son Tra Peninsula?</GuideH2>
          <p>
            Son Tra is a forested headland and nature reserve about 10 km northeast of central Da Nang. The name likely
            comes from the wild son tra trees that grow here, while the nickname Monkey Mountain came from American
            forces during the Vietnam War, for the many monkeys on the slopes. Because of its position over the harbor,
            the US military built a radar facility and a helicopter pad on top.
          </p>
          <p>
            Today it is a rare thing: a large protected wilderness right on the edge of a growing city. The reserve
            holds more than 1,000 plant species and around 360 animal species, and its ridges give some of the widest
            views in central Vietnam. Most visitors come for the Lady Buddha, but the peninsula rewards a slower look.
          </p>
        </div>

        <div id="lady-buddha" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="lady-buddha">The Lady Buddha and Linh Ung Pagoda</GuideH2>
          <p>
            The Lady Buddha is the headline. At about 67 meters, it is Vietnam&apos;s tallest statue of its kind, roughly
            a 30-storey building, standing on a lotus pedestal about 35 meters wide. It depicts the Bodhisattva of
            Compassion, known here as Quan Am, with one hand raised in teaching and the other holding a jar of holy
            water, facing out to sea. It was unveiled in 2010, and inside it is hollow, with 17 interior levels.
          </p>
          <p>
            It stands at Linh Ung Pagoda, a working temple with wide views over the bay. Entry is free, with donations
            welcome, and the pagoda is typically open from about 6am to 9pm. Coastal fishing communities pray to Quan Am
            for protection from storms, and a local legend tells of fishermen who found a Lady Buddha statue washed
            ashore and built a shrine on the spot.
          </p>
          <GuideCallout label="Dress for a temple">
            This is an active place of worship, so cover your shoulders and knees. Skip tank tops and short shorts. If
            you are coming straight from the beach, carry a light scarf or sarong to cover up before you go in.
          </GuideCallout>
        </div>

        <div id="which-lady-buddha" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="which-lady-buddha">Is this the same Lady Buddha as the Marble Mountains?</GuideH2>
          <p>
            This trips up a lot of visitors. No, they are different. The famous 67 m Lady Buddha that fills the photos is
            the one on Son Tra. Confusingly, Da Nang has three separate Linh Ung Pagodas: the one on Son Tra, an older
            one at the Marble Mountains, and a third at Ba Na Hills. The Marble Mountains have their own, separate Quan
            Am veneration.
          </p>
          <p>
            If you want the full story of the Marble Mountains site and its caves, our{" "}
            <Link href="/guides/marble-mountains-guide" className="text-[#E8742C] underline underline-offset-2">
              Marble Mountains guide
            </Link>{" "}
            covers it, and the Ba Na Hills pagoda features in our{" "}
            <Link href="/guides/ba-na-hills-day-trip" className="text-[#E8742C] underline underline-offset-2">
              Ba Na Hills day trip guide
            </Link>
            . Between them, that clears up which Lady Buddha is which.
          </p>
        </div>

        <div id="viewpoints" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="viewpoints">The best viewpoints and photo spots</GuideH2>
          <p>
            Beyond the pagoda, Son Tra is about the views. Here are the spots worth the drive, and roughly how long each
            takes.
          </p>
          <GuideTable
            columns={["What it is", "Time needed", "Note"]}
            rows={[
              { label: "Linh Ung Pagoda + Lady Buddha", values: ["Free temple, 67 m statue, sea views", "45 - 75 min", "The easiest sight, low on the peninsula."] },
              { label: "Ban Co Peak (chess statue)", values: ["~700 m viewpoint, full city panorama", "45 - 90 min with drive", "Reached by a steep route; best at sunrise."] },
              { label: "Thousand-Year Banyan Tree", values: ["An 800-plus-year-old heritage banyan", "30 - 45 min", "Access road is rough; can close after landslides."] },
              { label: "Bai Bac / north coast", values: ["Scenic coast and a landmark resort", "Drive-by / photo stop", "A waypoint on the coastal loop, not a public site."] },
              { label: "Tien Sa area / lighthouse", values: ["Beach and an early-1900s lighthouse", "Optional 30 min", "Some nearby routes close for repairs."] },
            ]}
          />
          <p>
            Ban Co Peak is the standout, an immortal-sage statue seated at a giant stone chessboard, about 700 meters up,
            with the whole of Da Nang spread below. The full hiking trail is hard, roughly 15 km round trip with about
            780 meters of climbing over 5 to 6 hours, so most casual visitors drive up rather than walk.
          </p>
        </div>

        <div id="wildlife" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="wildlife">The red-shanked douc: the queen of primates</GuideH2>
          <p>
            Son Tra shelters one of the world&apos;s most striking monkeys, the red-shanked douc langur, nicknamed the
            queen of primates for its colorful coat. Recent surveys count more than 1,300 here, the largest and most
            stable population of the species, which the IUCN lists as endangered. Numbers have fallen sharply across
            their wider range, so this urban-edge refuge matters.
          </p>
          <p>
            To see them, come early. They are most active and easiest to spot in the cool of the morning, roughly 6 to
            9am, high in the tall trees along the quieter roads. Move slowly, keep your distance, and never feed them.
            Feeding wild langurs harms their health and changes their behavior, and it is exactly what conservationists
            here are trying to stop.
          </p>
        </div>

        <div id="getting-there" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="getting-there">How to get there and get around</GuideH2>
          <p>
            The peninsula is about 10 km northeast of the center, roughly 20 to 25 minutes by taxi or Grab, and a taxi
            from the airport to Linh Ung Pagoda runs around 200,000 VND. There is no public bus or train, so your
            options are a car, a taxi or Grab, a motorbike, or a bicycle.
          </p>
          <GuideList
            items={[
              "Car, taxi, or Grab: the easiest choice, and the only sensible one if you are flying out the same day. Drivers handle the steep roads for you.",
              "Private car with driver or a half-day tour: best if you want the pagoda plus a viewpoint without navigating the restricted routes yourself.",
              "Manual or semi-automatic motorbike: needed for the steep controlled routes; confident riders only.",
              "Automatic scooter: fine for the lower and coastal areas and the pagoda, but barred from the steep mountain routes (see below).",
              "Bicycle: possible on the lower sections, but the full climb is very demanding.",
            ]}
          />
          <p>
            For the wider picture on Grab, bikes, and fares across the city, see our{" "}
            <Link href="/guides/getting-around-da-nang" className="text-[#E8742C] underline underline-offset-2">
              getting around Da Nang guide
            </Link>
            .
          </p>
        </div>

        <div id="scooter" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="scooter">Can you ride a scooter up Son Tra? The ban explained</GuideH2>
          <p>
            This is the single most important safety fact on the peninsula. The reserve management bars automatic
            scooters, and buses over 24 seats, from the steep controlled routes such as those toward Ban Co Peak and the
            Banyan Tree. The reason is mechanical, not bureaucratic: automatic scooters have no engine braking, so on a
            long, steep descent the brakes overheat until they fail. People have crashed doing exactly this.
          </p>
          <p>
            Checkpoints enforce the rule, so do not plan to ride a rented Vision, PCX, or Vespa up the mountain. The
            mountain routes also have their own access hours, separate from the pagoda: roughly 7:30am to 6:30pm from
            March to September, and 7:30am to 5:30pm from October to February. Roads can close after storms or
            landslides, and the access rules change by season and management notice.
          </p>
          <GuideCallout label="Check before you climb">
            Access rules, open routes, and hours shift often, and the Banyan Tree road in particular can be closed by
            landslides. Confirm the current situation with your rental shop or the on-site staff before you head up, and
            follow the signs and checkpoint instructions when you get there.
          </GuideCallout>
        </div>

        <div id="best-time" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="best-time">Best time of day and season to visit</GuideH2>
          <p>
            For the day, early morning is best: cool light, low cloud over the peaks, and the most active langurs, from
            about 5 to 7am. Late afternoon, after 4pm, is the pick for sunset over the city. Midday is hot and hazy, and
            the open plaza at the Lady Buddha gives little shade.
          </p>
          <p>
            For the season, the dry months from about March to September give the safest roads and the clearest photos.
            January and February can bring a dramatic sea of clouds at the peaks, but also wetter, greyer conditions.
            Bring a light jacket for an early ride, since it is cooler and breezier up top. If you are timing a whole
            trip, our{" "}
            <Link href="/guides/best-time-to-visit-da-nang" className="text-[#E8742C] underline underline-offset-2">
              best time to visit guide
            </Link>{" "}
            has the month-by-month detail.
          </p>
        </div>

        <div id="route" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="route">A suggested half-day route</GuideH2>
          <p>
            A focused Son Tra visit fits neatly into half a day, about 3 to 4 hours including transport. Start early,
            beat the heat, and you can still be back for lunch or a beach afternoon.
          </p>
          <GuideList
            items={[
              "Leave the city around 6 to 6:30am by car or a manual bike, watching for langurs in the trees on the quieter roads.",
              "Drive up to Ban Co Peak for the sunrise panorama, then come back down while the light is still soft.",
              "Stop at Linh Ung Pagoda and the Lady Buddha, allowing 45 to 75 minutes, and dress to cover shoulders and knees.",
              "Add the coastal loop past Bai Bac and the lighthouse if roads are open, then head back to the city.",
            ]}
          />
          <p>
            Because the peninsula, the beach coast, and the airport all sit on the same side of the city, Son Tra also
            makes a natural last stop on a departure day. To slot it into a wider trip, see our{" "}
            <Link href="/guides/da-nang-itinerary" className="text-[#E8742C] underline underline-offset-2">
              Da Nang itinerary
            </Link>
            .
          </p>

          <GuideStowCallout
            eyebrow="On your departure day"
            heading="Do the Son Tra loop bag-free, then head straight to the airport."
            facts={[
              { label: "Near the airport", value: "~10 min" },
              { label: "By the day", value: "60,000 VND (up to 24h)" },
              { label: "Open", value: "7am - 10pm daily" },
            ]}
          >
            If you check out in the morning but fly out in the afternoon, Son Tra is an easy final stop, but the pagoda
            has steps and a hot open plaza and the viewpoints mean walking, so you do not want a suitcase in tow. Drop
            your bags first at Stow, at 55 Ba Bang Nhan in Ngu Hanh Son, about ten minutes from the airport and open 7am
            to 10pm, from 15,000 VND an hour or 60,000 VND a day. Do the loop hands-free, collect your bags, and go
            straight to the terminal.
          </GuideStowCallout>
        </div>

        <div id="faq" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="faq">Questions people ask</GuideH2>
          <GuideFAQ items={FAQ_ITEMS} />
        </div>

        <GuideSources items={SOURCES} />

        <p className="text-[13px] text-[#9CA3AF]">
          Access rules, route closures, and opening hours on Son Tra change with the season, the weather, and management
          notices. This guide reflects the situation at the time of writing; check current signs, staff instructions,
          and your rental shop before you head up the mountain.
        </p>
      </GuideLayout>
    </>
  );
}
