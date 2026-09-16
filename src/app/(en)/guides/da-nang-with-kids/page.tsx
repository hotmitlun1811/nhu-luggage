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

const pageTitle = "Da Nang With Kids: A Family Guide to Beaches, Parks, and a Sane Pace";
const pageDescription =
  "How to visit Da Nang with kids: the best time to go, family things to do by age with real ticket prices, where to stay, a sane 4-day pace, car seats and strollers, and how to handle the checkout-day gap.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides/da-nang-with-kids" },
  openGraph: { title: `${pageTitle} | Stow`, description: pageDescription, url: "https://www.stowdanang.com/guides/da-nang-with-kids" },
  twitter: { title: `${pageTitle} | Stow`, description: pageDescription },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Da Nang With Kids", path: "/guides/da-nang-with-kids" },
]);

const FAQ_ITEMS = [
  {
    q: "Is Da Nang good for a family holiday?",
    a: "Yes. It has a long, gentle-slope beach, big all-weather attractions like water parks and Ba Na Hills, and short drives between everything. Locals are very welcoming to children, many restaurants have high chairs, and the beach promenade is wide and stroller-friendly.",
  },
  {
    q: "When is the best time to visit Da Nang with kids?",
    a: "February to May, especially March and April, when it is about 26 to 30 degrees C with low humidity and a calm sea. Avoid September to November, the peak rainy and storm season. June to August is hot but works with a resort-and-pool plan.",
  },
  {
    q: "Is My Khe Beach safe for young children to swim?",
    a: "Generally yes in the dry season. It has a gentle slope, shallow water far offshore, and lifeguards during daylight in peak season. Always swim in the flagged zones and check the flags, since currents get stronger in the rainy season from about October to December.",
  },
  {
    q: "Do Grab and taxis in Da Nang have child car seats?",
    a: "No. Grab cars and taxis do not provide child car seats, and local use is rare. Commercial vehicles are exempt from Vietnam's child-restraint rules, so if you want a seat for longer drives, rent one from a local service that delivers and installs it.",
  },
  {
    q: "How much are Ba Na Hills tickets for children?",
    a: "As of 2026, children 100 to 139 cm pay 800,000 VND, children under 100 cm are free, and anyone 130 cm and above pays the adult 1,000,000 VND. The round-trip cable car, the Golden Bridge, and Fantasy Park are included. Prices are height-based, so measure your child first.",
  },
  {
    q: "Is Ba Na Hills worth it with a toddler?",
    a: "The full experience opens up around ages 2 to 4. Under-2s love the cable car but tire quickly, so cap the visit at two to three hours. Some Fantasy Park rides have a minimum height of 1.2 m, so plan around what your child can actually ride.",
  },
  {
    q: "Can I visit the Marble Mountains with small kids?",
    a: "It is better for older children. The steps are uneven and slippery when wet, and some cave sections are steep. Take the elevator (about 15,000 VND per person one way) to reach the main peak, and skip it entirely with toddlers or a stroller.",
  },
  {
    q: "Where can I buy diapers and formula in Da Nang?",
    a: "Lotte Mart at 6 Nai Nam near the airport, Big C at 255 Hung Vuong, plus Co.opMart and Circle K stores near My Khe all stock major brands. Some specialty formulas are hard to find, so bring your own if your child uses a specific brand.",
  },
  {
    q: "Is Da Nang stroller-friendly?",
    a: "Mostly. The beach promenade and the resort strips are wide and smooth, so a stroller rolls easily there. Side streets often have broken paving, so expect to detour, and you can rent a stroller locally if you would rather not bring one.",
  },
  {
    q: "What do we do on the last day if checkout is at noon but our flight is at night?",
    a: "Store your bags, stroller, and car seat at a luggage-storage shop, keep a small day bag, and spend the last afternoon at the beach or pool. Let the kids nap and play, shower at a beach club, and collect everything on the way to the airport.",
  },
];

const SOURCES = [
  { label: "KidEase: Da Nang with a baby and toddler guide", url: "https://www.kidease-rentals.com/post/da-nang-baby-toddler-practical-guide-2026", note: "the heat rhythm, stroller surfaces, stores by name, medical care, and age-by-attraction pace" },
  { label: "VietnamNet: child car-seat exemption for taxis and ride-hailing", url: "https://vietnamnet.vn/en/vietnam-exempts-taxis-and-ride-hailing-cars-from-child-seat-requirement-2471226.html", note: "the car-seat exemption for commercial vehicles and the low local usage rate" },
  { label: "Your Vietnam Travel: best time to visit Da Nang", url: "https://www.yourvietnamtravel.com/best-time-to-visit-da-nang", note: "the family-focused month-by-month weather and best travel window" },
  { label: "Hoi An Day Trip: Ba Na Hills tickets", url: "https://hoiandaytrip.com/ba-na-hills-tickets/", note: "the height-based ticket prices, inclusions, and three-day validity" },
  { label: "Danang FantastiCity: Mikazuki Water Park ticket prices", url: "https://danangfantasticity.com/en/gia-ve-mikazuki-water-park-365-da-nang-2026", note: "the official water-park ticket prices by day and height" },
  { label: "Hoi An Day Trip: Da Nang Downtown theme park", url: "https://hoiandaytrip.com/da-nang-downtown-theme-park/", note: "the Sun Wheel and all-in-one ticket prices and the 2024 rename" },
  { label: "Little Steps Asia: best family hotels and resorts in Da Nang", url: "https://www.littlestepsasia.com/travel/vietnam/hoi-an/family-hotels-resorts-in-danang/", note: "the family resort picks, kids clubs, and pool details" },
  { label: "Venus Vietnam Travel: My Khe Beach guide", url: "https://venusvietnamtravel.com/my-khe-beach-da-nang-vietnam-guide/", note: "the gentle slope and shallow water that make My Khe safe for small children" },
];

export default async function DaNangWithKids() {
  const dict = await getDictionary("en");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideFaqJsonLd(FAQ_ITEMS)) }} />
      <GuideLayout
        dict={dict}
        currentPath="/guides/da-nang-with-kids"
        eyebrow="Plan Your Trip"
        title="Da Nang With Kids"
        subhead="The family playbook: the best months, what to do by age with real prices, where to stay, a pace that does not break anyone, and the checkout-day fix."
        readingTime="12 min read"
        toc={[
          { id: "why", label: "Why it works for families" },
          { id: "when", label: "Best time, and beating the heat" },
          { id: "things-to-do", label: "Things to do by age" },
          { id: "where-to-stay", label: "Where to stay for families" },
          { id: "itinerary", label: "A sane 4-day pace" },
          { id: "getting-around", label: "Car seats and strollers" },
          { id: "checkout-day", label: "The checkout-day problem" },
          { id: "practical", label: "Supplies, medical, high chairs" },
          { id: "faq", label: "Questions parents ask" },
        ]}
        related={[
          { title: "Ba Na Hills Day Trip", href: "/guides/ba-na-hills-day-trip", blurb: "The headline family attraction, tickets and the fog problem." },
          { title: "Where to Stay in Da Nang", href: "/guides/where-to-stay-in-da-nang", blurb: "The areas ranked, including the best beach bases for families." },
        ]}
      >
        <GuideLead>
          Da Nang is one of the easiest family bases in Vietnam. It pairs a long, gentle beach with big rainy-day
          attractions, and it is compact enough that most drives are under 30 minutes. The trick is not fitting in more,
          it is pacing the days so nobody melts down in the afternoon heat. Here is what to do by age, where to stay,
          how to get around, and how to handle the one day every family trip gets wrong.
        </GuideLead>

        <GuideTLDR>
          Da Nang works well for families: a shallow, gentle-slope beach (<strong>My Khe</strong>), big all-weather
          parks (<strong>Mikazuki water park, Ba Na Hills, Da Nang Downtown</strong>), and short drives. The best months
          are <strong>February to May</strong>, when the sea is calm and humidity is low. Plan a slow rhythm: one active
          day, then one beach-and-pool day, with a mandatory midday break because the midday sun is extreme. Theme parks
          price children by <strong>height, not age</strong>, so measure before you buy, and note that Grab and taxis
          carry no car seats.
        </GuideTLDR>

        <GuideImage
          src="https://upload.wikimedia.org/wikipedia/commons/a/a1/My_Khe_Beach_Da_Nang.jpg"
          alt="The wide, gentle sand of My Khe Beach in Da Nang, a family-friendly beach"
          width={3072}
          height={2304}
          credit="Dragfyre"
          creditUrl="https://commons.wikimedia.org/wiki/File:My_Khe_Beach_Da_Nang.jpg"
          license="CC BY-SA 3.0"
        />

        <GuideFacts
          items={[
            { label: "Best months", value: "Feb - May" },
            { label: "Ideal trip length", value: "4 days + Hoi An" },
            { label: "Midday break", value: "~10:30am - 4pm" },
            { label: "Park pricing", value: "By height" },
            { label: "Grab car seats", value: "None provided" },
            { label: "Beach", value: "Gentle slope, lifeguards" },
          ]}
        />

        <div id="why" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="why">Why Da Nang works for families</GuideH2>
          <p>
            Da Nang is set up for young children better than most Vietnamese cities. The beachfront has wide, smooth,
            stroller-friendly sidewalks, and My Khe has a gentle slope where toddlers can wade without deep-water risk.
            Locals are warm with kids, and many restaurants keep high chairs. Crucially, the city mixes indoor and
            outdoor attractions, so a rainy or brutally hot day does not sink the trip.
          </p>
          <p>
            It is also compact. The airport is 10 to 20 minutes from most hotels, the Marble Mountains are 20 to 25
            minutes, Ba Na Hills is about 45 minutes, and Hoi An is 30 to 35 minutes. Short drives mean less time
            wrangling tired children in a car and more time actually doing things.
          </p>
        </div>

        <div id="when" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="when">Best time to visit with kids, and beating the heat</GuideH2>
          <p>
            February to May is the family sweet spot, especially March and April: about 26 to 30 degrees C, low
            humidity, and a calm, safe sea. June to August is hot, often 33 to 35 degrees C, and busiest, since
            Vietnamese school holidays fall then, but a resort-and-pool plan handles it. Avoid September to November,
            the peak rainy season with storms and the occasional typhoon. For the full picture, see our{" "}
            <Link href="/guides/best-time-to-visit-da-nang" className="text-[#E8742C] underline underline-offset-2">
              best time to visit Da Nang guide
            </Link>
            .
          </p>
          <GuideCallout label="The midday-heat rhythm">
            With babies and toddlers, treat the midday sun as off-limits. A good daily rhythm: get out from about 6:30
            to 9:30am, be back at the hotel by 10 to 10:30am for a rest through the hottest hours, then head out again
            from about 4pm into the evening. Midday UV runs extreme, so this is a health rule, not just a comfort one.
          </GuideCallout>
        </div>

        <div id="things-to-do" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="things-to-do">Best family things to do, by age and price</GuideH2>
          <p>
            Here are the attractions worth building a trip around, with rough 2026 prices. Theme parks charge by a
            child&apos;s height, not age, so measure before you buy tickets, and treat prices as a guide, since they
            move with the day and any promotion.
          </p>
          <GuideTable
            columns={["Best age", "Approx price (2026)", "Note"]}
            rows={[
              { label: "My Khe Beach", values: ["All ages", "Free", "Gentle slope, lifeguards; calmest Apr to Aug."] },
              { label: "Mikazuki Water Park 365", values: ["3+ (under 1m free)", "~325,000 - 430,000 VND adult", "Indoor and outdoor, so it works in wet weather."] },
              { label: "Ba Na Hills / Fantasy Park", values: ["2 to 4+", "1,000,000 VND adult; 800,000 VND 100-139cm", "Cable car and Golden Bridge included; cap at a few hours."] },
              { label: "Da Nang Downtown + Sun Wheel", values: ["3+ (evening)", "All-in-one 250,000 VND adult", "Entry free; the 115m Sun Wheel is Vietnam's largest."] },
              { label: "Marble Mountains", values: ["6+ / older kids", "Elevator ~15,000 VND one way", "Uneven, slippery steps; use the elevator, skip with toddlers."] },
              { label: "Cham Islands snorkeling", values: ["5+", "Tour price varies", "UNESCO marine park; best water Mar to Sep."] },
              { label: "Dragon Bridge fire show", values: ["All ages", "Free", "~9pm on weekend nights, ~15 min; loud but not scary."] },
            ]}
          />
          <p>
            A few age notes. Mikazuki is the strongest all-weather pick, with indoor and outdoor zones. Ba Na Hills is
            the headline day out; its cable car and the Golden Bridge wow most ages, though the full experience really
            opens up from about 4. The Dragon Bridge breathes fire and sprays water on weekend evenings, a free,
            genuinely exciting 15 minutes for kids.
          </p>
          <GuideImage
            src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Golden_Bridge_at_Ba_Na_Hills_20250718.jpg"
            alt="The Golden Bridge held up by two giant stone hands at Ba Na Hills near Da Nang"
            width={4096}
            height={2649}
            credit="DvTor8303"
            creditUrl="https://commons.wikimedia.org/wiki/File:Golden_Bridge_at_Ba_Na_Hills_20250718.jpg"
            license="CC0"
          />
          <p>
            The Ba Na Hills cable-car ticket can now be valid for up to three consecutive days, which suits families who
            want to split the mountain across two shorter visits. Our{" "}
            <Link href="/guides/ba-na-hills-day-trip" className="text-[#E8742C] underline underline-offset-2">
              Ba Na Hills day trip guide
            </Link>{" "}
            has the full ticket breakdown and how to time it around the fog.
          </p>
        </div>

        <div id="where-to-stay" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="where-to-stay">Where to stay for families</GuideH2>
          <p>
            Base yourself on the beach. The My Khe and Non Nuoc strips, and An Bang toward Hoi An, are the classic
            family bases: resort-style stays with pools, kids clubs, and on-site dining, so you can retreat from the
            heat without a drive. Look for family suites or connecting rooms, and a pool with a genuinely shallow
            section for little ones.
          </p>
          <p>
            Well-known family resorts include Furama, a long-time My Khe staple with a kids club and a big pool complex,
            Pullman Danang for its daily children&apos;s activities, and the Hyatt Regency and InterContinental at the
            higher end. For a full breakdown of the neighborhoods and what each suits, see our{" "}
            <Link href="/guides/where-to-stay-in-da-nang" className="text-[#E8742C] underline underline-offset-2">
              where to stay in Da Nang guide
            </Link>
            .
          </p>
        </div>

        <div id="itinerary" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="itinerary">A sane sample pace (4 days)</GuideH2>
          <p>
            Four days plus a Hoi An day is a good target: enough for the highlights without exhausting anyone. The rule
            is to alternate. One active day earns one slow day, and every day has a midday break.
          </p>
          <GuideList
            items={[
              "Day 1 (light): arrive, check in, unpack, and let the kids adjust. A gentle late-afternoon paddle at My Khe and an early dinner.",
              "Day 2 (active): Ba Na Hills in the morning while everyone is fresh; back for a rest, then a relaxed evening.",
              "Day 3 (slow): beach and pool, a midday nap, then the Dragon Bridge fire show if it is a weekend night.",
              "Day 4 (mixed): Mikazuki water park, or the Marble Mountains for older kids, with plenty of downtime.",
              "Optional Day 5: a slow Hoi An visit, timed for the late afternoon and evening lanterns.",
            ]}
          />
          <p>
            For a non-family version with more sightseeing packed in, our{" "}
            <Link href="/guides/da-nang-itinerary" className="text-[#E8742C] underline underline-offset-2">
              full Da Nang itinerary
            </Link>{" "}
            lays out the day-by-day options.
          </p>
        </div>

        <div id="getting-around" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="getting-around">Getting around with kids: car seats and strollers</GuideH2>
          <p>
            The big thing to know: Grab cars and taxis do not carry child car seats, and local use is rare. Commercial
            vehicles are exempt from Vietnam&apos;s child-restraint rules, and one study found only about 1.3 percent of
            car owners use a child seat. If you want a seat for the longer drives to Ba Na Hills or Hoi An, rent one
            from a local service that delivers and installs it.
          </p>
          <p>
            Strollers work well on the beach promenade and the resort strips, which are wide and smooth. Side streets
            are another story, with broken paving that forces detours, so a light, foldable stroller or a carrier is the
            practical choice for exploring. You can also rent strollers and other baby gear locally. For the wider
            transport picture, fares, and apps, see our{" "}
            <Link href="/guides/getting-around-da-nang" className="text-[#E8742C] underline underline-offset-2">
              getting around Da Nang guide
            </Link>
            .
          </p>
        </div>

        <div id="checkout-day" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="checkout-day">The family checkout-day problem, and how to solve it</GuideH2>
          <p>
            Here is the day every family trip gets wrong. Your hotel releases the room at noon, but a lot of families
            fly out on a cheap late-night flight. That leaves half a day of dead time in the heat with a stroller, a car
            seat, extra bags, and children who still have energy to burn. Dragging all of it around a beach or a mall is
            miserable, and it is the part no itinerary warns you about.
          </p>

          <GuideStowCallout
            eyebrow="The last day"
            heading="Store the stroller, car seat, and bags, and keep the last afternoon for the kids."
            facts={[
              { label: "Near the resorts", value: "Ngu Hanh Son" },
              { label: "By the day", value: "60,000 VND (up to 24h)" },
              { label: "Open", value: "7am - 10pm daily" },
            ]}
          >
            The fix is simple. Check out at noon, drop the stroller, car seat, and suitcases at a luggage-storage shop,
            and keep only a small day bag. Stow is at 55 Ba Bang Nhan in Ngu Hanh Son, in the beach-resort district and
            about ten minutes from the airport, open 7am to 10pm, from 15,000 VND an hour or 60,000 VND a day. Spend the
            last afternoon at the beach or pool, let the little ones nap and play, shower at a beach club, and collect
            everything on the way to your flight. It turns a dead half-day into the best afternoon of the trip.
          </GuideStowCallout>
        </div>

        <div id="practical" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="practical">Practical tips: supplies, medical, and high chairs</GuideH2>
          <GuideList
            items={[
              "Baby supplies: Lotte Mart (6 Nai Nam, near the airport), Big C (255 Hung Vuong), Co.opMart, and Circle K stock major diaper and formula brands. Bring specialty brands from home, as some are hard to find.",
              "Medical care: Vinmec is an international-standard hospital and Family Medical Practice has English-speaking doctors. Pharmacies line the beach strip, some open 24 hours.",
              "High chairs: some restaurants have them, but not all, even good ones. A clip-on booster seat is a safe backup to pack.",
              "Beach safety: swim only in the flagged zones, prefer the dry season, and keep toddlers to the shallow, gentle-slope sections near the central resorts.",
              "Sun and heat: strong sunscreen, hats, and plenty of water. The midday break is as much about UV as about naps.",
            ]}
          />
          <p>
            For older kids, the Marble Mountains are a fun half-day of caves and viewpoints, and they sit right by the
            beach-resort district. It is far easier to climb without bags in hand, so it pairs well with a bag-drop on a
            travel day; our{" "}
            <Link href="/guides/marble-mountains-guide" className="text-[#E8742C] underline underline-offset-2">
              Marble Mountains guide
            </Link>{" "}
            covers the elevator, the caves, and the dress code.
          </p>
        </div>

        <div id="faq" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="faq">Questions parents ask</GuideH2>
          <GuideFAQ items={FAQ_ITEMS} />
        </div>

        <GuideSources items={SOURCES} />

        <p className="text-[13px] text-[#9CA3AF]">
          Ticket prices, show schedules, resort rates, and car-seat rules change, and several theme-park prices here
          come from operator listings. This guide reflects current figures at the time of writing; measure your child,
          and confirm prices and schedules on the official sites before you book.
        </p>
      </GuideLayout>
    </>
  );
}
