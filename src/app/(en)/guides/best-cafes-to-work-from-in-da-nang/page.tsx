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

const pageTitle = "The Best Cafes to Work From in Da Nang (Wifi, Power, and Quiet)";
const pageDescription =
  "The best laptop-friendly cafes to work from in Da Nang, ranked for wifi, power outlets, noise, and how long you can linger. Real prices and hours, cafe etiquette, and where the nomad cluster is.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides/best-cafes-to-work-from-in-da-nang" },
  openGraph: { title: `${pageTitle} | Stow`, description: pageDescription, url: "https://www.stowdanang.com/guides/best-cafes-to-work-from-in-da-nang" },
  twitter: { title: `${pageTitle} | Stow`, description: pageDescription },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Best Cafes to Work From in Da Nang", path: "/guides/best-cafes-to-work-from-in-da-nang" },
]);

const RANKED = [
  {
    name: "The Local Beans",
    area: "Hai Chau",
    meta: "6:30am - 10:30pm · day pass ~85,000 - 140,000 VND",
    blurb:
      "The one true cafe-and-coworking hybrid on this list. The lower floors are a normal cafe; the top floor is a dedicated coworking space with real desks, office chairs, air conditioning, and enforced quiet, with phones on silent and no food. It is the pick for a distraction-free, office-like full day.",
    schema: "Cafe with a dedicated, enforced-quiet coworking floor and real desks.",
  },
  {
    name: "Dng.coffee",
    area: "An Thuong",
    meta: "coffee from ~45,000 VND",
    blurb:
      "One traveler clocked the fastest all-round wifi in the city here, and there are power outlets everywhere. A second-floor quiet zone keeps calls and deep work away from the chatter downstairs. This is the bet when you need reliable upload for video calls and file sync.",
    schema: "Fast, reliable wifi with a dedicated second-floor quiet zone.",
  },
  {
    name: "Gozar Coffee",
    area: "An Thuong (Ngu Hanh Son)",
    meta: "7am - 10pm · coffee from ~35,000 VND",
    blurb:
      "The affordable default in the An Thuong nomad cluster. Two floors, with a quiet upstairs where remote workers gather, plenty of outlets, and strong upload for calls. Cheap, dependable, and right where the nomads already are.",
    schema: "Affordable An Thuong all-rounder with a quiet upstairs work floor.",
  },
  {
    name: "The Hideout Cafe",
    area: "Bac My Phu (Ngu Hanh Son)",
    meta: "8am - 9pm · coffee from ~35,000 VND",
    blurb:
      "A calm spot down a quiet alley, with soft jazz, a garden and patio, several outlets, and excellent food and egg coffee. The wifi is reliable for everyday work, though one measured upload was modest, so it suits focus and email more than back-to-back video calls.",
    schema: "Calm, food-forward alley cafe with garden seating and several outlets.",
  },
  {
    name: "43 Factory Coffee Roaster (XLIII)",
    area: "near An Thuong",
    meta: "premium · coffee ~125,000 VND",
    blurb:
      "A design-led specialty roaster with soaring glass, high ceilings, and quiet ponds, plus power outlets built into the floor and a focused international crowd. It is the priciest here, calmest on weekday mornings, and unbeatable if you care about the coffee as much as the work.",
    schema: "Design-led specialty roaster, quiet, with in-floor power outlets.",
  },
  {
    name: "Z! Coffee & Roastery",
    area: "Hai Chau (downtown)",
    meta: "coffee from ~40,000 VND",
    blurb:
      "A downtown pick with the fastest download one traveler measured, lots of seating, natural light, and an all-day brunch menu so you can eat and stay. One catch: the outlets are two-prong, so bring an adapter.",
    schema: "Fast download, natural light, and all-day brunch downtown.",
  },
  {
    name: "The Cups Coffee Roastery",
    area: "Bac My Phu, one block from My Khe",
    meta: "7am - 11pm",
    blurb:
      "Bright, spacious, and serious about coffee, a block from My Khe beach and open latest on this list, until 11pm. The pick if you want to work near the sand and stay into the evening.",
    schema: "Bright, beach-adjacent roastery open until 11pm.",
  },
  {
    name: "Cafe Dalky",
    area: "downtown",
    meta: "coffee from ~25,000 VND",
    blurb:
      "Cozy, cheap, and great for a short focused session, with fast download and excellent egg coffee. It is small, so seats are limited, and the upload is weak, so save the video calls for elsewhere.",
    schema: "Cozy, cheap downtown spot for short focused sessions.",
  },
  {
    name: "GOLO Coffee",
    area: "downtown",
    meta: "cash only · coffee from ~39,000 VND",
    blurb:
      "A rare covered outdoor option with real tables and plenty of outlets, including a koi-pond corner. The trade-off is street noise, so it suits people who want fresh air over silence. Bring cash.",
    schema: "Covered outdoor cafe with real tables and plenty of outlets.",
  },
  {
    name: "Roots Plant-based Cafe",
    area: "An Thuong",
    meta: "healthy menu · drinks ~$1 - 2",
    blurb:
      "Strong multi-router wifi and a genuinely good vegan menu in a bright, airy room. It is more social than silent, so treat it as a lunch-plus-laptop spot rather than a deep-focus cave.",
    schema: "Bright plant-based cafe with strong multi-router wifi.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Which cafes in Da Nang are best for working?",
    a: "The most work-friendly are The Local Beans, Dng.coffee, and Gozar Coffee, for reliable wifi, power outlets, and quiet upstairs floors. The Hideout and 43 Factory suit calmer, design-led sessions. Most sit in the An Thuong and Ngu Hanh Son area near the beaches.",
  },
  {
    q: "Do Da Nang cafes have good wifi?",
    a: "Yes, generally. On-site tests by travelers have recorded well over 100 Mbps at spots like Z! Coffee and Dng.coffee. Speeds vary by time of day and how busy the cafe is, so test the wifi when you arrive and keep a phone hotspot as a backup.",
  },
  {
    q: "Can you work all day in a Da Nang cafe?",
    a: "Yes. Most work cafes open around 7am and close between 9 and 11pm, and The Local Beans sells all-day coworking passes. The unwritten rule is to order a drink every 90 minutes to two hours, so you are paying for your seat over a long stay.",
  },
  {
    q: "Which Da Nang cafes have power outlets?",
    a: "Gozar Coffee has plenty upstairs, Dng.coffee has many, 43 Factory has outlets built into the floor, and GOLO Coffee has them outdoors. Z! Coffee's outlets are two-prong, so pack a travel adapter if you plan to work there.",
  },
  {
    q: "Where do digital nomads work in Da Nang?",
    a: "Mostly in An Thuong and Bac My Phu, in the Ngu Hanh Son district near My An and My Khe beaches. This is the expat and nomad heart of the city, with the densest cluster of laptop-friendly cafes and coworking spaces within walking distance.",
  },
  {
    q: "Which Da Nang cafe is quietest for calls and focus?",
    a: "The Local Beans coworking floor enforces quiet, with phones on silent and no food. Dng.coffee and Gozar both have dedicated quiet upstairs floors, and 43 Factory is calmest on weekday mornings. For sensitive calls, a coworking space with a phone booth is safer than any cafe.",
  },
  {
    q: "How much does it cost to work from a cafe in Da Nang?",
    a: "A basic Vietnamese coffee runs about 25,000 to 45,000 VND at most work cafes, and specialty spots like 43 Factory charge around 125,000 VND. A coworking day pass at The Local Beans is roughly 85,000 to 140,000 VND, so a cafe is the cheaper option if you buy a drink or two.",
  },
  {
    q: "Is there a coworking-style cafe in Da Nang?",
    a: "Yes. The Local Beans has a dedicated top-floor coworking space with desks, air conditioning, and quiet rules, and HI4 offers private booths. If you want a proper desk, a monitor, or a phone booth, a full coworking space is the better call; see our coworking guide.",
  },
  {
    q: "Which work cafe in Da Nang is closest to the beach?",
    a: "The Cups Coffee is one block from My Khe beach and open until 11pm. Beach bars have views but usually slow wifi and no outlets, so they suit a break, not deep work. For a swim between sessions, the An Thuong cafes are a short walk from the sand.",
  },
  {
    q: "Are Da Nang cafes laptop-friendly for foreigners?",
    a: "Yes. Staff in the An Thuong cluster are used to remote workers, the wifi is free, and many cafes post the password on the wall or the receipt. English menus are common in the expat area, so ordering and settling in is easy.",
  },
];

const SOURCES = [
  { label: "Two Packs and a Pup: best cafes in Da Nang for remote work", url: "https://twopacksandapup.com/the-9-best-cafes-in-da-nang-for-remote-work/", note: "on-site wifi speed tests, outlet notes, and drink prices per cafe" },
  { label: "Goats on the Road: best cafes in Da Nang", url: "https://www.goatsontheroad.com/best-cafes-in-da-nang/", note: "full addresses and daily opening hours for the work cafes" },
  { label: "Roampads: best work cafes in Da Nang", url: "https://www.roampads.com/blog/best-work-cafes-da-nang", note: "the quiet-zone and outlet framing, and the order-every-90-minutes etiquette" },
  { label: "Laptop Friendly Cafe: Da Nang", url: "https://laptopfriendlycafe.com/cities/da-nang", note: "aggregator star ratings and laptop-friendly tags (verified as displayed)" },
  { label: "Tripadvisor: 43 Factory Coffee Roaster", url: "https://www.tripadvisor.com/Restaurant_Review-g298085-d15035668-Reviews-43_Factory_Coffee_Roaster-Da_Nang.html", note: "the 43 Factory rating and review count, seen September 2026" },
  { label: "Sprudge: inside 43 Factory Coffee Roasters", url: "https://sprudge.com/vietnam-inside-43-factory-coffee-roasters-stunning-da-nang-cafe-140742.html", note: "the roaster's architecture and specialty focus" },
  { label: "Johnny Africa: best work cafes in Da Nang", url: "https://johnnyafrica.com/best-work-cafes-danang/", note: "cross-check on The Local Beans and the general nomad picks" },
  { label: "Nomad Wise: The Local Beans coworking", url: "https://www.nomadwise.io/coworking/vietnam-da-nang-the-local-beans", note: "The Local Beans wifi and coworking specifics" },
];

export default async function BestCafesToWorkFromInDaNang() {
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
              "The Best Cafes to Work From in Da Nang"
            )
          ),
        }}
      />
      <GuideLayout
        dict={dict}
        currentPath="/guides/best-cafes-to-work-from-in-da-nang"
        eyebrow="For Nomads"
        title="The Best Cafes to Work From in Da Nang"
        subhead="Ten laptop-friendly cafes ranked for wifi, power, and quiet, plus where the nomad cluster is and how long you can really linger."
        readingTime="11 min read"
        toc={[
          { id: "cluster", label: "Where nomads work" },
          { id: "how-we-chose", label: "How we chose" },
          { id: "ranked", label: "The 10 best work cafes" },
          { id: "compare", label: "Compared at a glance" },
          { id: "more", label: "More worth knowing" },
          { id: "etiquette", label: "Cafe work etiquette" },
          { id: "bags", label: "Working on an arrival day" },
          { id: "faq", label: "Questions people ask" },
        ]}
        related={[
          { title: "Best Coworking Spaces in Da Nang", href: "/guides/best-coworking-spaces-in-da-nang", blurb: "Need a proper desk, a monitor, or a phone booth? Here are the coworking spaces." },
          { title: "Best Coffee Shops in Da Nang", href: "/guides/best-coffee-shops-in-da-nang", blurb: "Here for the coffee, not the wifi? The cafes worth a trip for the cup alone." },
        ]}
      >
        <GuideLead>
          Da Nang is one of Asia&apos;s easiest cities to work from, and the cafe is the nomad&apos;s default office. The
          catch is that a great coffee shop and a great work cafe are not the same thing. This list ranks the places
          that get the work part right: reliable wifi, power you can actually reach, a noise level you can think in, and
          staff who let you stay. If you just want the best cup, that is a different list.
        </GuideLead>

        <GuideTLDR>
          The best cafes to work from in Da Nang cluster in <strong>An Thuong and Ngu Hanh Son</strong>, near My An and
          My Khe beaches. <strong>The Local Beans</strong> (a cafe with an enforced-quiet coworking floor),{" "}
          <strong>Dng.coffee</strong> (fast wifi, a quiet zone), and <strong>Gozar Coffee</strong> (cheap, quiet
          upstairs) lead the pack. Most open around 7am to 10pm and charge 25,000 to 60,000 VND a drink, and you can
          linger for hours. Order something every couple of hours as etiquette.
        </GuideTLDR>

        <GuideImage
          src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Ca_Phe_Sua_Da.jpg"
          alt="A glass of Vietnamese iced milk coffee, ca phe sua da, the standard order in a Da Nang cafe"
          width={1600}
          height={1200}
          credit="Clarin"
          creditUrl="https://commons.wikimedia.org/wiki/File:Ca_Phe_Sua_Da.jpg"
          license="CC BY 2.5"
        />

        <GuideFacts
          items={[
            { label: "Nomad cluster", value: "An Thuong / Ngu Hanh Son" },
            { label: "Typical coffee", value: "25,000 - 60,000 VND" },
            { label: "Most open", value: "~7am - 10pm" },
            { label: "Wifi", value: "Free, often fast" },
            { label: "Coworking day pass", value: "~85,000 - 140,000 VND" },
            { label: "Etiquette", value: "Order every ~2 hrs" },
          ]}
        />

        <div id="cluster" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="cluster">Where nomads actually work in Da Nang</GuideH2>
          <p>
            Almost all of the best work cafes sit in one area: An Thuong and Bac My Phu, in the Ngu Hanh Son district,
            just back from My An and My Khe beaches. This is the expat and nomad heart of the city, so the cafes here are
            built for laptops, the wifi is fast, and staff expect long stays. Basing yourself here means you can walk
            between three good options and the beach in ten minutes.
          </p>
          <p>
            A few strong picks sit downtown in Hai Chau instead, handy if you are staying near the river. If you are
            still choosing a neighborhood, our{" "}
            <Link href="/guides/where-to-stay-in-da-nang" className="text-[#E8742C] underline underline-offset-2">
              where to stay guide
            </Link>{" "}
            weighs An Thuong against the rest for long stays.
          </p>
        </div>

        <div id="how-we-chose" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="how-we-chose">How we chose these</GuideH2>
          <p>
            We ranked these cafes work-first, on five things that actually matter for a laptop day: wifi reliability,
            the number of reachable power outlets, noise level, seating comfort, and how long you can linger. We
            cross-checked digital-nomad guides, on-the-ground wifi speed tests, and public rating platforms in September
            2026, and we favored cafes with a dedicated quiet floor or workspace.
          </p>
          <GuideCallout label="A note on the numbers">
            Wifi speeds here come from travelers testing on a single visit, so treat them as a snapshot, not a promise;
            speeds swing with how busy a cafe is. Prices and hours at independent Vietnamese cafes change often, so
            check current details before you rely on them. This list was last reviewed in September 2026.
          </GuideCallout>
        </div>

        <div id="ranked" className="flex flex-col gap-5 scroll-mt-[88px]">
          <GuideH2 id="ranked">The 10 best cafes to work from in Da Nang</GuideH2>
          {RANKED.map((cafe, i) => (
            <div key={cafe.name} className="flex flex-col gap-1.5">
              <GuideH3>{`${i + 1}. ${cafe.name}`}</GuideH3>
              <p className="text-[13px] text-[#6B7280]">
                {cafe.area} · {cafe.meta}
              </p>
              <p>{cafe.blurb}</p>
            </div>
          ))}
        </div>

        <div id="compare" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="compare">The work cafes compared at a glance</GuideH2>
          <GuideTable
            columns={["Best for", "Noise", "Coffee from", "Area"]}
            rows={[
              { label: "The Local Beans", values: ["All-day office focus", "Quiet (enforced)", "~$1-2 + pass", "Hai Chau"] },
              { label: "Dng.coffee", values: ["Video calls, fast wifi", "Quiet zone upstairs", "45,000 VND", "An Thuong"] },
              { label: "Gozar Coffee", values: ["Cheap, dependable", "Quiet upstairs", "35,000 VND", "An Thuong"] },
              { label: "The Hideout", values: ["Calm, food, atmosphere", "Calm, soft jazz", "35,000 VND", "Bac My Phu"] },
              { label: "43 Factory (XLIII)", values: ["Specialty coffee, focus", "Quiet, focused", "125,000 VND", "Near An Thuong"] },
              { label: "Z! Coffee", values: ["Fast download, brunch", "Moderate", "40,000 VND", "Hai Chau"] },
              { label: "The Cups Coffee", values: ["Working near the beach", "Moderate", "~$1-3", "By My Khe"] },
              { label: "Cafe Dalky", values: ["Short focused sessions", "Cozy ambient", "25,000 VND", "Downtown"] },
              { label: "GOLO Coffee", values: ["Working outdoors", "Noisier (street)", "39,000 VND", "Downtown"] },
              { label: "Roots Plant-based", values: ["Lunch plus laptop", "Social", "~$1-2", "An Thuong"] },
            ]}
          />
          <GuideImage
            src="https://upload.wikimedia.org/wikipedia/commons/d/de/C%C3%A0_ph%C3%AA_tr%E1%BB%A9ng_%C4%91%C3%A1.jpg"
            alt="Iced egg coffee, ca phe trung da, a signature order at several Da Nang work cafes"
            width={1800}
            height={1200}
            credit="travel oriented"
            creditUrl="https://commons.wikimedia.org/wiki/File:C%C3%A0_ph%C3%AA_tr%E1%BB%A9ng_%C4%91%C3%A1.jpg"
            license="CC BY-SA 2.0"
          />
        </div>

        <div id="more" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="more">More worth knowing</GuideH2>
          <GuideList
            items={[
              "HI4 Coffee & Workspace: a coffee-plus-workspace concept with private booths and quiet zones. Confirm the exact address and hours before making a trip.",
              "Craft Cafe (An Hai Dong, Son Tra side): a leafy garden patio with healthy food, but it closes at 7pm, so not for night owls.",
              "Lately and Homnay: both praised for fast wifi. Arrive between 7 and 9am for a quiet upstairs seat before they fill up.",
              "Highlands Coffee: a reliable chain that opens late and has beach views, but it is lively rather than quiet, so keep it as a backup, not a deep-work base.",
            ]}
          />
        </div>

        <div id="etiquette" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="etiquette">Cafe work etiquette in Da Nang</GuideH2>
          <p>
            Working from cafes is normal here, but a few habits keep you welcome. Order a drink every 90 minutes to two
            hours so you are paying for your seat, and buy lunch or a snack if you settle in for the day. Avoid taking
            loud video calls in the main room; use a quiet upstairs floor, step outside, or book a coworking space with
            a phone booth. Do not hog a big table at a busy time if you only need a laptop and a coffee.
          </p>
          <p>
            One practical tip: keep a phone hotspot ready. Cafe wifi is usually good, but it slows when the room fills,
            and a hotspot saves a call or an upload. For getting between cafes and the beach, our{" "}
            <Link href="/guides/getting-around-da-nang" className="text-[#E8742C] underline underline-offset-2">
              getting around Da Nang guide
            </Link>{" "}
            covers Grab, bikes, and fares.
          </p>
        </div>

        <div id="bags" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="bags">Working from a cafe on your arrival or checkout day?</GuideH2>
          <p>
            Remote workers hit the same snag at both ends of a stay. You land in the morning but cannot check in until
            afternoon, or you check out at noon with a night flight, and you want to knock out a few hours of work in
            between. The one thing in the way is your luggage, and no cafe wants a suitcase parked between the tables.
          </p>

          <GuideStowCallout
            eyebrow="Arrival or checkout day"
            heading="Store the bags, then work hands-free until check-in or your flight."
            facts={[
              { label: "In the cafe district", value: "Ngu Hanh Son" },
              { label: "By the day", value: "60,000 VND (up to 24h)" },
              { label: "Open", value: "7am - 10pm daily" },
            ]}
          >
            Stow sits at 55 Ba Bang Nhan in Ngu Hanh Son, the same district as many of these cafes and about ten minutes
            from the airport. Drop your bags from 15,000 VND an hour or 60,000 VND a day, open 7am to 10pm, then settle
            into a good cafe and work unencumbered until your room or your flight is ready. For a longer stay or a visa
            run, there are flat weekly and monthly rates too; our{" "}
            <Link href="/guides/da-nang-visa-run-guide" className="text-[#E8742C] underline underline-offset-2">
              visa run guide
            </Link>{" "}
            covers that side.
          </GuideStowCallout>
        </div>

        <div id="faq" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="faq">Questions people ask</GuideH2>
          <GuideFAQ items={FAQ_ITEMS} />
        </div>

        <GuideSources items={SOURCES} />

        <p className="text-[13px] text-[#9CA3AF]">
          This list was compiled from digital-nomad guides, on-the-ground wifi tests, and public ratings, and last
          reviewed in September 2026. Wifi speeds are single-visit snapshots, and cafe prices and hours change often, so
          confirm the details that matter to you before you go.
        </p>
      </GuideLayout>
    </>
  );
}
