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
  GuideStowCallout,
  GuideFAQ,
  GuideImage,
  GuideSources,
} from "@/components/guides/GuideElements";
import { breadcrumbJsonLd, guideFaqJsonLd } from "@/lib/structured-data";
import { getDictionary } from "@/content/dictionary";

const pageTitle = "Da Nang Itinerary: 3 Perfect Days (Plus 1, 2, 4 & 5-Day Plans)";
const pageDescription =
  "A day-by-day Da Nang itinerary for 3 days, with 1, 2, 4 and 5-day options: how many days you need, the best time to go, what to do each day, where to eat, and how to handle your bags on arrival and departure day.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides/da-nang-itinerary" },
  openGraph: { title: `${pageTitle} | Stow`, description: pageDescription, url: "https://www.stowdanang.com/guides/da-nang-itinerary" },
  twitter: { title: `${pageTitle} | Stow`, description: pageDescription },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Da Nang Itinerary", path: "/guides/da-nang-itinerary" },
]);

const FAQ_ITEMS = [
  {
    q: "How many days do you need in Da Nang?",
    a: "Three days is the sweet spot for a first trip: enough for the city and beach, the Marble Mountains, and one big day trip (Hoi An or Ba Na Hills). Four days gives you breathing room for a second day trip or a slow beach day. Two days works only if Da Nang is one stop in a longer Vietnam route, and five or more suits slow travel or using the city as a base for Hue and the wider region.",
  },
  {
    q: "Which month should you avoid in Da Nang?",
    a: "October and November are the ones to avoid: they are the peak of the rain and typhoon season, and storm risk starts rising through September. The best window is February to May, when it is warm and dry, and April to August is best for beach time and calm seas.",
  },
  {
    q: "Is 3 days in Da Nang too much?",
    a: "No. Three days lets you cover the city, the beach, and one major day trip without rushing. If anything, most first-timers wish they had a fourth day so they could do both Hoi An and Ba Na Hills instead of choosing.",
  },
  {
    q: "What do you do on arrival day before hotel check-in?",
    a: "Most Da Nang hotels do not check you in until about 2pm, so a morning landing leaves several free hours. Drop your bags at your hotel or a nearby storage shop, then use the morning for the Marble Mountains or a first beach walk, and check in fresh in the afternoon. You do not have to waste those hours in a lobby.",
  },
  {
    q: "How do I get from Da Nang airport to My Khe beach?",
    a: "It is about 6 km and 15 minutes. A GrabCar is roughly 90,000 to 140,000 VND (about US$4 to US$6), and a metered taxi is a little more. The airport sits only about 3 km from the city centre, one of the closest airport-to-city hops in Vietnam.",
  },
  {
    q: "How far is Hoi An from Da Nang?",
    a: "About 30 km, or 40 to 50 minutes by car. A Grab or taxi runs roughly US$15 to US$20 for the car; the public bus is much cheaper but slower. Many people do Hoi An as a day trip and sleep in Da Nang.",
  },
  {
    q: "What time is the Dragon Bridge fire show?",
    a: "Friday, Saturday, and Sunday nights at 9pm, for about 30 minutes, free and with no ticket. There is no show Monday to Thursday. Arrive by about 8:30pm for a spot near the dragon's head or along the Han River promenade.",
  },
  {
    q: "How much are Ba Na Hills tickets, and how long do you need?",
    a: "The 2026 adult ticket is about 1,000,000 VND and includes the cable car, the Golden Bridge, and the themed areas. Plan a full day, and go early to beat the cloud and crowds. From January 2026 the ticket is valid for up to three consecutive days, so you can return for a second, quieter look.",
  },
  {
    q: "Where should you eat local food in Da Nang?",
    a: "Han Market has the widest range of traditional street food, the My Khe seafood strip on Vo Nguyen Giap is best for a tank-to-table dinner, and Con Market is the local street-food engine after about 3pm. Signature dishes are mi quang, banh xeo, and bun cha ca; mi quang runs about 30,000 to 50,000 VND.",
  },
  {
    q: "Is Da Nang good with kids?",
    a: "Yes. The wide, shallow My Khe beach, water parks, and easy day trips make it an easy family base. The trick is to alternate active and slow days, for example a full Ba Na Hills day followed by a beach or pool day, so nobody burns out.",
  },
];

const SOURCES = [
  { label: "Daco Tours: how many days in Da Nang", url: "https://dacotours.com/how-many-days-in-da-nang-do-you-really-need-guide/", note: "the day-count guidance and how long each attraction takes" },
  { label: "Kalakala Beach Club: which month to avoid Da Nang", url: "https://kalakalabeachclub.com/blog/which-month-to-avoid-da-nang-a-local-experts-honest-guide/", note: "the Oct-Nov rain/typhoon window and the best months to go" },
  { label: "Your Vietnam Travel: best time to visit Da Nang", url: "https://www.yourvietnamtravel.com/best-time-to-visit-da-nang", note: "month-by-month weather and the Feb-May sweet spot" },
  { label: "Vietnam Paradise Travel: Vietnam hotel check-in rules", url: "https://www.vietnamparadisetravel.com/blog/hotel-regulations-vietnam", note: "the 2pm check-in / noon checkout norm behind the arrival- and departure-day plan" },
  { label: "Crystal Bay: Da Nang airport to My Khe beach", url: "https://crystalbay.com/en/62-da-nang-airport-to-my-khe-beach-suggestions-for-the-4-most-convenient-ways-to-travel-n62119.html", note: "airport-to-beach distance, time, and fares" },
  { label: "Oxalis: Da Nang to Hoi An transport options", url: "https://oxalisadventure.com/travel-options-from-da-nang-to-hoi-an/", note: "distance, time, and cost from Da Nang to Hoi An by each mode" },
  { label: "Hoi An Day Trip: Dragon Bridge fire show", url: "https://hoiandaytrip.com/dragon-bridge-fire-water-show-da-nang/", note: "the Fri-Sun 9pm schedule" },
  { label: "Mercure: Da Nang local market food guide", url: "https://mercure.accor.com/en/mercure-local-guide/local-gastronomy/danang-local-market-guide.html", note: "Han Market and where to eat local dishes" },
];

export default async function DaNangItinerary() {
  const dict = await getDictionary("en");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideFaqJsonLd(FAQ_ITEMS)) }} />
      <GuideLayout
        dict={dict}
        currentPath="/guides/da-nang-itinerary"
        eyebrow="Plan Your Trip"
        title="The Perfect Da Nang Itinerary"
        subhead="A day-by-day plan for 3 days in Da Nang, with 1, 2, 4 and 5-day options, real timings and costs, and the one thing most itineraries get wrong: your first and last days."
        readingTime="13 min read"
        toc={[
          { id: "how-many-days", label: "How many days do you need?" },
          { id: "when-to-go", label: "When to go (and what to avoid)" },
          { id: "half-days", label: "The two half-days everyone plans wrong" },
          { id: "day-1", label: "Day 1: arrival, Marble Mountains, My Khe" },
          { id: "day-2", label: "Day 2: the big day trip" },
          { id: "day-3", label: "Day 3: city, Son Tra, and flying out" },
          { id: "at-a-glance", label: "The 3-day plan at a glance" },
          { id: "variants", label: "1, 2, 4 and 5-day versions" },
          { id: "food", label: "Where and what to eat" },
          { id: "kids", label: "Da Nang with kids" },
          { id: "faq", label: "Questions people ask" },
        ]}
        related={[
          { title: "Where to Stay in Da Nang", href: "/guides/where-to-stay-in-da-nang", blurb: "Pick the right neighborhood before you book, by what each area is actually good for." },
          { title: "Da Nang or Hoi An?", href: "/guides/da-nang-vs-hoi-an", blurb: "Which to base yourself in, and how to do both without dragging your bags." },
        ]}
      >
        <GuideLead>
          Da Nang packs a beach city, a set of caves and pagodas, and two of central Vietnam&apos;s best day trips
          into a small, easy-to-cover area. Three days is enough to enjoy it without rushing. This plan gives you a
          real day-by-day route with timings and costs, plus shorter and longer versions, and it fixes the mistake
          almost every other itinerary makes: treating your arrival and departure days as if they were full days.
        </GuideLead>

        <GuideTLDR>
          <strong>Three days is the sweet spot</strong> for a first trip to Da Nang: the city and beach on Day 1, a
          big day trip on Day 2 (<strong>Hoi An or Ba Na Hills</strong>), and the Marble Mountains plus a slower
          finish on Day 3. Give it <strong>4 to 5 days</strong> if you also want Hue, the Son Tra peninsula, or
          unhurried beach time. Go <strong>February to May</strong> and avoid <strong>October and November</strong>{" "}
          (peak rain and typhoons). The one thing to plan around: you land around 9am but hotels do not check in
          until 2pm, and on your last day checkout is noon for a flight that often leaves at night, so build those
          two windows around where you leave your bags.
        </GuideTLDR>

        <GuideFacts
          items={[
            { label: "Ideal length", value: "3 days (4 is roomier)" },
            { label: "Best months", value: "February to May" },
            { label: "Avoid", value: "October - November" },
            { label: "Airport to beach", value: "~6 km, ~15 min" },
            { label: "To Hoi An", value: "~30 km, 40-50 min" },
            { label: "Dragon Bridge show", value: "Fri-Sun 9pm" },
          ]}
        />

        <GuideImage
          src="https://upload.wikimedia.org/wikipedia/commons/d/d4/My_Khe_Beach_15.jpg"
          alt="My Khe Beach in Da Nang, the long sand strip most itineraries are built around"
          width={4032}
          height={3024}
          credit="Christophe95"
          creditUrl="https://commons.wikimedia.org/wiki/File:My_Khe_Beach_15.jpg"
          license="CC BY-SA 4.0"
        />

        <div id="how-many-days" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="how-many-days">How many days do you need in Da Nang?</GuideH2>
          <p>
            Three days covers the highlights: the city and beach, the Marble Mountains, and one big day trip. Four
            days is the more comfortable choice if you want to do both Hoi An and Ba Na Hills instead of picking one.
            Two days works only when Da Nang is a single stop in a longer Vietnam trip, and five to seven days suits
            slow travel or using the city as a base for Hue and the wider region.
          </p>
          <GuideTable
            columns={["Who it suits", "What you fit", "Verdict"]}
            rows={[
              { label: "1 day / layover", values: ["Long-layover flyers", "Marble Mountains OR the beach, plus a meal", "Too short for a real trip"] },
              { label: "2 days", values: ["Da Nang as one stop on a bigger route", "City and beach, then one day trip", "Enough if you are tight"] },
              { label: "3 days", values: ["First-timers wanting the highlights", "City, beach, Marble Mountains + one day trip", "The recommended minimum"] },
              { label: "4 days", values: ["First-timers who want room", "Adds a second day trip or a slow day", "The sweet spot"] },
              { label: "5-7 days", values: ["Slow travel / regional base", "Adds Hue, Son Tra, My Son", "Not too long"] },
            ]}
          />
          <p>
            On a single spare day, our{" "}
            <Link href="/guides/da-nang-layover-guide" className="text-[#E8742C] underline underline-offset-2">
              Da Nang layover guide
            </Link>{" "}
            has the tighter, hour-limited version of this plan.
          </p>
        </div>

        <div id="when-to-go" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="when-to-go">When to go, and which month to avoid</GuideH2>
          <p>
            The best window is <strong>February to May</strong>: warm, dry, and comfortable, with February through
            April the pick of the year. If the beach is your priority, April to August brings the most reliable sun
            and the calmest seas.
          </p>
          <p>
            The months to avoid are <strong>October and November</strong>, the peak of the rain and typhoon season.
            Storm risk starts rising through September, so a fixed beach itinerary in early autumn is a gamble. The
            rain usually eases by late December. Sources disagree on the exact start of the wet season, so the safe
            way to think about it is: risk climbs through September and peaks in October and November.
          </p>
        </div>

        <div id="half-days" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="half-days">Before you start: the two half-days everyone plans wrong</GuideH2>
          <p>
            Here is the part most Da Nang itineraries skip. You will probably land around 9am, but your hotel will
            not let you check in until about 2pm, and on your last day checkout is noon even if your flight does not
            leave until the evening. That is roughly five hours at the start and eight at the end where you are
            technically homeless with your bags. Early check-in and late checkout exist, but they depend on
            availability and usually cost extra, so do not count on them.
          </p>
          <p>
            You do not have to spend those hours in a lobby or drag a suitcase up the Marble Mountains. Plan them as
            proper half-days, with your bags left somewhere first.
          </p>

          <GuideStowCallout
            heading="Land at 9am, check in at 2pm. Do not waste the gap."
            facts={[
              { label: "By the hour", value: "15,000 VND/hr" },
              { label: "Full day", value: "60,000 VND (up to 24h)" },
              { label: "From the airport", value: "~10 min" },
            ]}
          >
            Da Nang has luggage-storage shops on the beach and airport side of town where you can leave bags for a
            few hours. Stow is at 55 Ba Bang Nhan in Ngu Hanh Son, about ten minutes from the airport and right by
            the Marble Mountains and My Khe beach, at 15,000 VND an hour or 60,000 VND for the day. Drop the bags,
            do the Marble Mountains and lunch as a real half-day, then collect them and check in fresh at 2pm. Same
            trick on the last day: check out at noon, store the bags, get one more beach afternoon and dinner, and
            head to the airport with nothing to carry.
          </GuideStowCallout>
        </div>

        <div id="day-1" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="day-1">Day 1: arrival, the Marble Mountains, and My Khe beach</GuideH2>
          <p>
            Your first day is a half-day, so keep it close to the airport and the beach. The Marble Mountains sit in
            the same district as the beach strip, about ten minutes from the airport, which makes them the perfect
            arrival-day stop while you cannot check in yet.
          </p>
          <GuideTable
            columns={["Time", "What to do"]}
            rows={[
              { label: "~9:00", values: ["Land, clear arrivals (the airport is ~3 km from the centre)"] },
              { label: "9:30-10:00", values: ["Drop your bags near the beach or Marble Mountains"] },
              { label: "10:00-12:30", values: ["Marble Mountains (40,000 VND entry, 15,000 VND elevator)"] },
              { label: "12:30-13:30", values: ["Lunch: mi quang nearby (about 30,000-50,000 VND)"] },
              { label: "14:00", values: ["Collect bags, check in, rest"] },
              { label: "Evening", values: ["My Khe seafood dinner; Fri-Sun, the 9pm Dragon Bridge show"] },
            ]}
          />
          <p>
            The full cave-by-cave detail, tickets, and dress code are in our{" "}
            <Link href="/guides/marble-mountains-guide" className="text-[#E8742C] underline underline-offset-2">
              Marble Mountains guide
            </Link>
            . In the evening, My Khe&apos;s seafood halls on Vo Nguyen Giap are the easy first-night dinner, and if
            it is a Friday, Saturday, or Sunday, the Dragon Bridge breathes fire at 9pm.
          </p>
        </div>

        <div id="day-2" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="day-2">Day 2: the big day trip (Hoi An or Ba Na Hills)</GuideH2>
          <p>
            Day 2 is your one full day, so spend it on the region&apos;s marquee trip. With three days you pick one;
            with four you can do both.
          </p>
          <GuideH3>Option A: Hoi An</GuideH3>
          <p>
            The UNESCO Ancient Town is about 30 km south, 40 to 50 minutes by car. Go for the late afternoon and
            evening, when the day-trippers leave and the lanterns come on. Full transport options, the Old Town
            ticket, and timing are in our{" "}
            <Link href="/guides/da-nang-to-hoi-an-day-trip" className="text-[#E8742C] underline underline-offset-2">
              Da Nang to Hoi An day trip guide
            </Link>
            .
          </p>
          <GuideH3>Option B: Ba Na Hills</GuideH3>
          <p>
            The mountaintop park and the Golden Bridge are about 45 minutes west. It is a full day, and the 2026
            ticket is about 1,000,000 VND (now valid for up to three days). Arrive early to beat the fog and crowds.
            Our{" "}
            <Link href="/guides/ba-na-hills-day-trip" className="text-[#E8742C] underline underline-offset-2">
              Ba Na Hills day trip guide
            </Link>{" "}
            has the pricing, timing, and the honest is-it-worth-it.
          </p>

          <GuideImage
            src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Golden_Bridge_at_Ba_Na_Hills_20250718.jpg"
            alt="The Golden Bridge at Ba Na Hills, the marquee Day 2 option west of Da Nang"
            width={4096}
            height={2649}
            credit="DvTor8303"
            creditUrl="https://commons.wikimedia.org/wiki/File:Golden_Bridge_at_Ba_Na_Hills_20250718.jpg"
            license="CC0"
          />
        </div>

        <div id="day-3" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="day-3">Day 3: the city, Son Tra, and flying out</GuideH2>
          <p>
            Day 3 is usually another half-day, because of the noon checkout. Start early on the Son Tra Peninsula:
            the Linh Ung Pagoda and its 67-metre Lady Buddha, the tallest in Vietnam, are free and open from 6am, a
            calm morning stop about 10 km northeast of the centre. Back in town, Han Market is the spot for a last
            food crawl and souvenirs.
          </p>
          <p>
            Then handle the checkout gap the same way as Day 1: check out at noon, leave your bags, and use the
            afternoon for one more beach hour or a long lunch before an evening flight. If you are connecting rather
            than staying, our{" "}
            <Link href="/guides/da-nang-layover-guide" className="text-[#E8742C] underline underline-offset-2">
              layover guide
            </Link>{" "}
            covers the airport timing.
          </p>
        </div>

        <div id="at-a-glance" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="at-a-glance">The 3-day plan at a glance</GuideH2>
          <GuideTable
            columns={["Morning", "Afternoon", "Evening"]}
            rows={[
              { label: "Day 1", values: ["Land, store bags, Marble Mountains", "Check in at 2pm, beach", "My Khe seafood; Dragon Bridge (Fri-Sun)"] },
              { label: "Day 2", values: ["Head out early", "Hoi An OR Ba Na Hills", "Hoi An lanterns, or back to Da Nang"] },
              { label: "Day 3", values: ["Son Tra + Lady Buddha", "Han Market; checkout noon, store bags", "Beach, dinner, then the airport"] },
            ]}
          />
        </div>

        <div id="variants" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="variants">1, 2, 4 and 5-day versions</GuideH2>
          <GuideList
            items={[
              "1 day or a layover: pick one anchor (the Marble Mountains or the beach) plus a meal, and store your bags near the airport. See the layover guide.",
              "2 days: Day 1 city and beach, Day 2 a single day trip (Hoi An is the usual pick). Skip Son Tra.",
              "4 days: the 3-day plan plus a second day trip, so you do both Hoi An and Ba Na Hills, or add a full beach-and-pool day.",
              "5 days or more: add a Hue day trip over the Hai Van Pass, more Son Tra time, or the My Son ruins, using Da Nang as your base.",
            ]}
          />
        </div>

        <div id="food" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="food">Where and what to eat</GuideH2>
          <p>
            Da Nang is a food city, and it is cheap. The three dishes to try are <strong>mi quang</strong>{" "}
            (turmeric noodles with a little rich broth), <strong>banh xeo</strong> (crispy stuffed pancakes), and{" "}
            <strong>bun cha ca</strong> (fishcake noodle soup). Han Market has the widest range of traditional
            street food, the My Khe seafood strip on Vo Nguyen Giap is best for a tank-to-table dinner, and Con
            Market is the local street-food engine after about 3pm. Prices are low: mi quang is about 30,000 to
            50,000 VND, and a two-person seafood feast with beer runs roughly 400,000 to 800,000 VND. With seafood,
            always ask the price per kilogram before you order. Our full{" "}
            <Link href="/guides/da-nang-food-guide" className="text-[#E8742C] underline underline-offset-2">
              Da Nang food guide
            </Link>{" "}
            has the dish-by-dish detail and named spots.
          </p>
        </div>

        <div id="kids" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="kids">Da Nang with kids</GuideH2>
          <p>
            Da Nang is an easy family base. The wide, shallow My Khe beach, water parks like Mikazuki, and short day
            trips keep a range of ages happy. The one rule that saves the trip: alternate active and slow days, for
            example a full Ba Na Hills day followed by a beach or pool day. Families also tend to travel with more
            bags, strollers, and gear, which makes the arrival- and departure-day storage trick above even more
            useful.
          </p>
        </div>

        <div id="faq" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="faq">Questions people ask</GuideH2>
          <GuideFAQ items={FAQ_ITEMS} />
        </div>

        <GuideSources items={SOURCES} />

        <p className="text-[13px] text-[#9CA3AF]">
          Prices, opening hours, and transport fares change, and US dollar figures are approximate. This guide
          reflects the situation at the time of writing; check anything you are planning tightly around before you go.
        </p>
      </GuideLayout>
    </>
  );
}
