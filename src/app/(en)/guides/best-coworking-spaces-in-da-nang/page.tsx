import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/components/guides/GuideLayout";
import {
  GuideH2,
  GuideH3,
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
import { breadcrumbJsonLd, guideFaqJsonLd, itemListJsonLd } from "@/lib/structured-data";
import { getDictionary } from "@/content/dictionary";

const pageTitle = "The Best Coworking Spaces in Da Nang (Prices, Wifi, and Community)";
const pageDescription =
  "The best coworking spaces in Da Nang, ranked for community, wifi, price, and location. Real day-pass and monthly prices, where the nomad cluster is, coliving options, and how to pick the right one.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides/best-coworking-spaces-in-da-nang" },
  openGraph: { title: `${pageTitle} | Stow`, description: pageDescription, url: "https://www.stowdanang.com/guides/best-coworking-spaces-in-da-nang" },
  twitter: { title: `${pageTitle} | Stow`, description: pageDescription },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Best Coworking Spaces in Da Nang", path: "/guides/best-coworking-spaces-in-da-nang" },
]);

const RANKED = [
  {
    name: "Enosta Space (formerly Enouvo)",
    area: "Son Tra",
    meta: "fixed desk ~1,800,000 - 2,000,000 VND/month · coliving from ~$227/month",
    blurb:
      "Da Nang's original coworking pioneer, and the one most consistently named best across nomad guides. It is the rare space that pairs coworking with coliving in the same building, so you can sleep upstairs and work downstairs. The pick for your first weeks, before you have an apartment sorted.",
    schema: "Pioneer coworking space with coliving rooms in the same building.",
  },
  {
    name: "ACE Coworking Space",
    area: "Bac My An, Ngu Hanh Son",
    meta: "day 200,000 VND · 30 days 3,500,000 VND",
    blurb:
      "The most polished space in the city, with the fastest published wifi, over 800 Mbps on the dedicated-desk add-on, plus long hours, a ground-floor cafe, a quiet mid-floor, phone booths, free monitors, and a rooftop terrace. Best for people who work long or late and want wellness extras.",
    schema: "Polished space with the fastest published wifi and long hours.",
  },
  {
    name: "Coworking Danang",
    area: "Khue My, Ngu Hanh Son",
    meta: "day 200,000 VND · month 3,000,000 VND · 24/7 for members",
    blurb:
      "The strongest community in town. The hosts run regular events, from shared meals to pickleball nights, so it is the fastest way to make friends as a new arrival. A green garden setting, standing desks, phone booths, and unlimited Vietnamese coffee round it out.",
    schema: "Community-first space with a garden and regular member events.",
  },
  {
    name: "Hana's Coworking",
    area: "Khue My / An Thuong",
    meta: "3 hours 70,000 VND · day 130,000 VND · month 2,000,000 VND",
    blurb:
      "A warm, host-led budget pick, roughly half the price of the sea-view spaces, and heavy on events and personal help. Free monitors, a garden lounge, and free water, coffee, and tea. The best value if you want community without the premium price tag.",
    schema: "Warm, host-led budget coworking with events and free monitors.",
  },
  {
    name: "Seaview Coworking",
    area: "Phuoc My, Son Tra (by My Khe)",
    meta: "3 hours 70,000 VND · day 135,000 VND · month 2,000,000 VND · 24/7",
    blurb:
      "The literal sea view. It sits on the 9th floor of a hotel overlooking My Khe beach, open 24 hours, with a Stay and Work package that bundles a room. Free fruit and coffee, lockers, and monitor rental. Best for beach lovers and night owls.",
    schema: "24/7 coworking on a hotel 9th floor with My Khe sea views.",
  },
  {
    name: "SpaceA",
    area: "My An, Ngu Hanh Son",
    meta: "day 250,000 VND · 10-day pass 2,200,000 VND (valid 40 days) · month 3,800,000 VND",
    blurb:
      "Quiet and focus-first, with a flexible 10-day pass valid across 40 days that suits people who only cowork a few days a week. A free drink daily, a food discount, printing, and a personal locker on the monthly plan. Closed Sundays.",
    schema: "Quiet, focus-first space with a flexible part-time 10-day pass.",
  },
  {
    name: "HIVE Coworking",
    area: "An Thuong 5, Ngu Hanh Son",
    meta: "day 210,000 - 260,000 VND · month 4,000,000 - 4,500,000 VND",
    blurb:
      "A wellness-forward premium space in the heart of An Thuong, with a rooftop garden, an ice bath, and a dedicated Focus zone with dual monitors. Best for people who will pay up for wellness perks and a serious desk setup.",
    schema: "Premium wellness space with a rooftop garden and dual-monitor focus zone.",
  },
  {
    name: "Circo Da Nang",
    area: "Hai Chau (downtown)",
    meta: "day 150,000 VND · month 1,800,000 VND",
    blurb:
      "The most business-like option, downtown rather than beachside, with private offices and meeting rooms instead of a beach-nomad vibe. Best for small teams, startups, and anyone who wants a central, professional base near the river.",
    schema: "Business-focused downtown space with private offices and meeting rooms.",
  },
  {
    name: "Green Co-Working",
    area: "An Hai Bac, Son Tra",
    meta: "day 100,000 VND",
    blurb:
      "A library-and-bookshop crossover: quiet, book-lined, and one of the cheapest true coworking day passes in the city. Self-service snacks and a calm reading-room feel, near the beach. Best for budget workers who want quiet over community.",
    schema: "Quiet, cheap library-style coworking near the beach.",
  },
  {
    name: "Nomads Coworking",
    area: "Hai Chau (downtown)",
    meta: "trial pass 79,000 VND",
    blurb:
      "New (opened in 2025), central, and the cheapest entry point via a 79,000 VND trial pass. An ergonomic setup with indoor and outdoor areas. Best for budget nomads and short-stay visitors testing the water downtown before committing.",
    schema: "New, central, budget space with a cheap trial day pass.",
  },
];

const FAQ_ITEMS = [
  {
    q: "How much does coworking cost in Da Nang?",
    a: "Day passes generally run about 100,000 to 280,000 VND, and 3-hour passes start around 70,000 VND. A monthly hot desk runs roughly 1,800,000 to 4,500,000 VND depending on the space and perks. Budget spots like Green Co-Working start at 100,000 VND a day.",
  },
  {
    q: "Which coworking space is best for digital nomads in Da Nang?",
    a: "Enosta Space, ACE Coworking, Coworking Danang, and Hana's Coworking are the names that recur most across nomad guides. The best one depends on your priority: community, wifi speed, a sea view, coliving, or budget. Most sit in the beachside Ngu Hanh Son and Son Tra areas.",
  },
  {
    q: "Do coworking spaces in Da Nang have day passes?",
    a: "Yes. Most offer drop-in day passes and shorter 3-hour passes, so you do not need a membership. Hana's and Seaview run 3-hour passes around 70,000 VND, and day passes across the city range from about 100,000 to 280,000 VND.",
  },
  {
    q: "Where do most digital nomads cowork in Da Nang?",
    a: "In the beachside An Thuong and My An area of Ngu Hanh Son, and along the My Khe and Son Tra strip. Most of the top spaces sit within a short ride of these two zones, near the cafes, gyms, and long-stay apartments nomads use.",
  },
  {
    q: "Which Da Nang coworking space has the fastest wifi?",
    a: "ACE Coworking publishes the fastest figure, over 800 Mbps by ethernet on the dedicated-desk add-on. Most spaces advertise fast wifi without a number, and citywide you can generally expect 50 Mbps or more, which is fine for calls and file sync.",
  },
  {
    q: "Is there a 24/7 coworking space in Da Nang?",
    a: "Yes. Seaview Coworking is open 24 hours daily, and Coworking Danang offers 24/7 access to members. ACE runs long hours, roughly 7am to 2am on weekdays. If round-the-clock access matters, confirm it directly, since hours change.",
  },
  {
    q: "Is there coworking with coliving in Da Nang?",
    a: "Yes. Enosta Space pairs coworking with coliving rooms and dorms in the same building, with coliving from about 227 US dollars a month. Seaview also runs a Stay and Work package that bundles accommodation with desk access, handy for a first landing.",
  },
  {
    q: "What is the cheapest coworking space in Da Nang?",
    a: "Among true coworking spaces, Nomads Coworking (a 79,000 VND trial pass) and Green Co-Working (100,000 VND a day) are the cheapest drop-ins. Laptop-friendly cafes are cheaper still, but they are less reliable for calls than a proper coworking space.",
  },
  {
    q: "Which coworking space is best for meeting people?",
    a: "Coworking Danang and Hana's Coworking are the two most cited for community, with regular events, shared meals, and hands-on hosts. If making friends fast is your goal, start at one of those rather than a quiet, focus-first space.",
  },
  {
    q: "Do I need a monthly membership, or can I just drop in?",
    a: "You can drop in. Every top space sells day and 3-hour passes, and SpaceA even sells a 10-day pass valid across 40 days for part-time coworkers. Try a couple on day passes first, then commit to a month once you know which community and location fit you.",
  },
];

const SOURCES = [
  { label: "The Digital Nomad Asia: coworking spaces in Da Nang", url: "https://thedigitalnomad.asia/", note: "the most complete price, hours, and area comparison used here" },
  { label: "Things Nomads Do: Da Nang coworking", url: "https://thingsnomadsdo.com/", note: "cross-checks on Enosta, ACE, Seaview, and Hana's, plus community notes" },
  { label: "ACE Coworking (official)", url: "https://acecoworking.vn/", note: "ACE prices, address, the 800+ Mbps wifi figure, and amenities" },
  { label: "Seaview Coworking (official)", url: "https://seaviewcoworkingdanang.com/", note: "Seaview prices, the 24/7 hours, and the Stay and Work package" },
  { label: "Hana's Coworking (official)", url: "https://hanacoworkingdanang.com/", note: "Hana's prices, hours, and address" },
  { label: "SpaceA (official)", url: "https://spacea-danang.com/", note: "SpaceA prices and the 10-day part-time pass rule" },
  { label: "Surf Office: coworking in Da Nang", url: "https://www.surfoffice.com/coworking/da-nang", note: "alternate addresses and its own aggregate scores (not Google ratings)" },
  { label: "Coworking Spaces directory (Da Nang)", url: "https://coworkingspaces.me/da-nang", note: "directory ratings and review counts, seen September 2026" },
];

export default async function BestCoworkingSpacesInDaNang() {
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
              "The Best Coworking Spaces in Da Nang"
            )
          ),
        }}
      />
      <GuideLayout
        dict={dict}
        currentPath="/guides/best-coworking-spaces-in-da-nang"
        eyebrow="For Nomads"
        title="The Best Coworking Spaces in Da Nang"
        subhead="Ten spaces ranked for community, wifi, price, and location, with real day-pass and monthly costs and how to pick the right one."
        readingTime="12 min read"
        toc={[
          { id: "cluster", label: "Where to cowork" },
          { id: "how-we-chose", label: "How we chose" },
          { id: "ranked", label: "The 10 best spaces" },
          { id: "compare", label: "Compared at a glance" },
          { id: "choose", label: "How to pick one" },
          { id: "more", label: "More worth knowing" },
          { id: "bags", label: "Arriving or on a visa run" },
          { id: "faq", label: "Questions people ask" },
        ]}
        related={[
          { title: "Best Cafes to Work From in Da Nang", href: "/guides/best-cafes-to-work-from-in-da-nang", blurb: "Prefer a cafe to a desk? The laptop-friendly spots ranked for wifi and quiet." },
          { title: "Where to Stay in Da Nang", href: "/guides/where-to-stay-in-da-nang", blurb: "The neighborhoods ranked, including the best long-stay bases for nomads." },
        ]}
      >
        <GuideLead>
          Da Nang is one of Asia&apos;s top bases for remote work, and the coworking scene has grown up with it. You can
          find everything from a sea-view desk open 24 hours to a book-lined room for the price of a few coffees. The
          catch is that the spaces differ more by community and vibe than by wifi. This list ranks them on what actually
          shapes your month here, then helps you pick the right one.
        </GuideLead>

        <GuideTLDR>
          The best coworking spaces in Da Nang cluster in the beachside <strong>Ngu Hanh Son and Son Tra</strong> areas
          near An Thuong and My Khe. <strong>Enosta Space</strong> (coliving), <strong>ACE Coworking</strong> (fastest
          wifi), <strong>Coworking Danang</strong> and <strong>Hana&apos;s</strong> (community), and{" "}
          <strong>Seaview</strong> (24/7 sea view) lead most shortlists. Day passes run about 100,000 to 280,000 VND,
          and monthly desks run about 1,800,000 to 4,500,000 VND. Try a couple on day passes before you commit.
        </GuideTLDR>

        <GuideImage
          src="https://upload.wikimedia.org/wikipedia/commons/d/de/Skyline_of_Da_Nang_%2845579409022%29.jpg"
          alt="The Da Nang city skyline along the Han River, a top base for remote workers"
          width={2048}
          height={1469}
          credit="Tran Anh Khoa"
          creditUrl="https://commons.wikimedia.org/wiki/File:Skyline_of_Da_Nang_(45579409022).jpg"
          license="CC BY-SA 2.0"
        />

        <GuideFacts
          items={[
            { label: "Nomad cluster", value: "An Thuong / My Khe" },
            { label: "Day pass", value: "~100,000 - 280,000 VND" },
            { label: "Monthly desk", value: "~1.8M - 4.5M VND" },
            { label: "Fastest wifi", value: "ACE (800+ Mbps)" },
            { label: "Open 24/7", value: "Seaview" },
            { label: "Coliving", value: "Enosta Space" },
          ]}
        />

        <div id="cluster" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="cluster">Where to cowork in Da Nang</GuideH2>
          <p>
            Most of the best spaces sit in two beachside areas: the An Thuong and My An part of Ngu Hanh Son, and the My
            Khe and Son Tra strip. This is the nomad heart of the city, close to the cafes, gyms, and long-stay
            apartments remote workers use, so basing yourself here keeps everything a short walk or ride apart. A few
            spaces sit downtown in Hai Chau instead, better for teams or a central, professional feel.
          </p>
          <p>
            If you are still choosing where to live, our{" "}
            <Link href="/guides/where-to-stay-in-da-nang" className="text-[#E8742C] underline underline-offset-2">
              where to stay guide
            </Link>{" "}
            weighs the neighborhoods for long stays, and our{" "}
            <Link href="/guides/best-cafes-to-work-from-in-da-nang" className="text-[#E8742C] underline underline-offset-2">
              best cafes to work from
            </Link>{" "}
            covers the days you would rather not sit at a desk.
          </p>
        </div>

        <div id="how-we-chose" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="how-we-chose">How we chose these</GuideH2>
          <p>
            We cross-referenced the spaces most consistently recommended across independent nomad guides with public
            ratings and review counts, then verified prices and hours against each space&apos;s official website where
            one exists. We ranked them on the things that actually shape a month here: community, wifi and amenities,
            price, hours, and location.
          </p>
          <GuideCallout label="A note on prices">
            Coworking prices and hours in Da Nang change often, and some spaces list slightly different addresses across
            sources. The figures here are the official ones where we could confirm them, current at the time of writing
            (September 2026). Always check the venue&apos;s own channels and Google Maps before you commit to a month.
          </GuideCallout>
        </div>

        <div id="ranked" className="flex flex-col gap-5 scroll-mt-[88px]">
          <GuideH2 id="ranked">The 10 best coworking spaces in Da Nang</GuideH2>
          {RANKED.map((space, i) => (
            <div key={space.name} className="flex flex-col gap-1.5">
              <GuideH3>{`${i + 1}. ${space.name}`}</GuideH3>
              <p className="text-[13px] text-[#6B7280]">
                {space.area} · {space.meta}
              </p>
              <p>{space.blurb}</p>
            </div>
          ))}
        </div>

        <div id="compare" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="compare">The coworking spaces compared</GuideH2>
          <GuideTable
            columns={["Day pass", "Monthly desk", "Best for", "Area"]}
            rows={[
              { label: "Enosta Space", values: ["monthly focus", "~1.8M - 2M VND", "Work plus coliving", "Son Tra"] },
              { label: "ACE Coworking", values: ["200,000 VND", "3,500,000 VND", "Long days, fast wifi", "Bac My An"] },
              { label: "Coworking Danang", values: ["200,000 VND", "3,000,000 VND", "Community, events", "Khue My"] },
              { label: "Hana's Coworking", values: ["130,000 VND", "2,000,000 VND", "Community on a budget", "Khue My"] },
              { label: "Seaview", values: ["135,000 VND", "2,000,000 VND", "Sea view, 24/7", "By My Khe"] },
              { label: "SpaceA", values: ["250,000 VND", "3,800,000 VND", "Quiet, part-time", "My An"] },
              { label: "HIVE", values: ["210,000 - 260,000", "4M - 4.5M VND", "Wellness, focus", "An Thuong"] },
              { label: "Circo", values: ["150,000 VND", "1,800,000 VND", "Teams, downtown", "Hai Chau"] },
              { label: "Green Co-Working", values: ["100,000 VND", "n/a", "Cheap and quiet", "An Hai Bac"] },
              { label: "Nomads Coworking", values: ["79,000 (trial)", "n/a", "Budget, central", "Hai Chau"] },
            ]}
          />
          <GuideImage
            src="https://upload.wikimedia.org/wikipedia/commons/1/16/My_Khe_Beach_5.jpg"
            alt="A wide view of My Khe beach in Da Nang, near the beachside coworking cluster"
            width={5619}
            height={2612}
            credit="Christophe95"
            creditUrl="https://commons.wikimedia.org/wiki/File:My_Khe_Beach_5.jpg"
            license="CC BY-SA 4.0"
          />
        </div>

        <div id="choose" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="choose">How to pick the right one</GuideH2>
          <p>
            The wifi is good almost everywhere, so choose on fit, not megabits. A quick way to decide:
          </p>
          <GuideList
            items={[
              "New in town and want friends fast: Coworking Danang or Hana's, for the events and hosts.",
              "Just landed with no apartment yet: Enosta, so you can cowork and colive in one building.",
              "Long or late work days and calls: ACE, for the fastest wifi, phone booths, and long hours.",
              "Want a sea view or 24-hour access: Seaview, on the 9th floor over My Khe.",
              "Prefer quiet and part-time attendance: SpaceA, with its flexible 10-day pass.",
              "On a tight budget: Green Co-Working or Nomads, or a laptop-friendly cafe.",
              "A small team or a central, business base: Circo, downtown in Hai Chau.",
            ]}
          />
        </div>

        <div id="more" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="more">More worth knowing</GuideH2>
          <GuideList
            items={[
              "DNC (DNES): the local startup-incubator hub in Hai Chau, better for networking with Vietnamese founders than for the beach-nomad crowd. Confirm the current address and pricing directly.",
              "Coworking Space Da Nang Airport: purpose-built for transit, with lockers, baggage storage, and a flight board near the airport. Handy on a layover, but the priciest day pass on the scene.",
              "Note the name change: Enosta Space was formerly Enouvo Space, so you may still see the old name in listings and reviews.",
            ]}
          />
        </div>

        <div id="bags" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="bags">Arriving before your apartment is ready, or heading out on a visa run?</GuideH2>
          <p>
            Two moments catch nomads with luggage and nowhere to put it. On day one, you often land in the morning but
            cannot move into your apartment or coliving room until later. And on a visa run, you leave the city for a
            border hop and do not want to keep paying for a room just to hold your bags. Coworking-shopping with a
            suitcase in tow is nobody&apos;s idea of a good first day.
          </p>

          <GuideStowCallout
            eyebrow="Between places"
            heading="Store the bags in the same district, then go find your desk."
            facts={[
              { label: "In the nomad district", value: "Ngu Hanh Son" },
              { label: "Up to 1 month", value: "300,000 VND flat" },
              { label: "Up to 4 months", value: "1,000,000 VND flat" },
            ]}
          >
            Stow sits at 55 Ba Bang Nhan in Ngu Hanh Son, the same beachside district as ACE, Coworking Danang, Hana&apos;s,
            SpaceA, and HIVE, and about ten minutes from the airport. Drop your bags from 15,000 VND an hour or 60,000
            VND a day, open 7am to 10pm, with flat rates for longer gaps: 150,000 VND up to a week, 300,000 VND up to a
            month, or 1,000,000 VND up to four months. That covers the arrival-day wait and the whole visa run; our{" "}
            <Link href="/guides/da-nang-visa-run-guide" className="text-[#E8742C] underline underline-offset-2">
              visa run guide
            </Link>{" "}
            walks through the rest.
          </GuideStowCallout>
        </div>

        <div id="faq" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="faq">Questions people ask</GuideH2>
          <GuideFAQ items={FAQ_ITEMS} />
        </div>

        <GuideSources items={SOURCES} />

        <p className="text-[13px] text-[#9CA3AF]">
          This list was compiled from independent nomad guides, public ratings, and each space&apos;s official site, and
          last reviewed in September 2026. Coworking prices, hours, and addresses change often, so confirm the details
          on the venue&apos;s own channels and Google Maps before you commit.
        </p>
      </GuideLayout>
    </>
  );
}
