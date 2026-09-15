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
import { breadcrumbJsonLd, guideFaqJsonLd } from "@/lib/structured-data";
import { getDictionary } from "@/content/dictionary";

const pageTitle = "Da Nang to Hoi An Day Trip: Transport Compared, Tickets, Timing";
const pageDescription =
  "Every way to get from Da Nang to Hoi An compared on real cost and time, the bus route that changed in 2024, how the Ancient Town ticket really works, when to go for the lanterns, and where to leave your bags if you fly out that night.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides/da-nang-to-hoi-an-day-trip" },
  openGraph: { title: `${pageTitle} | Stow`, description: pageDescription, url: "https://www.stowdanang.com/guides/da-nang-to-hoi-an-day-trip" },
  twitter: { title: `${pageTitle} | Stow`, description: pageDescription },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Da Nang to Hoi An Day Trip", path: "/guides/da-nang-to-hoi-an-day-trip" },
]);

const FAQ_ITEMS = [
  {
    q: "How far is Hoi An from Da Nang, and how long does it take?",
    a: "About 30 km by road from central Da Nang, roughly 30 to 60 minutes by car depending on traffic. From Da Nang airport it is a little closer, about 25 to 30 km and 30 to 40 minutes in normal conditions. The city's rush hours, roughly 7 to 9 AM and 5 to 7 PM, stretch all of these, so add time if you are catching a flight.",
  },
  {
    q: "What is the cheapest way to get from Da Nang to Hoi An?",
    a: "The public minibus, now the LK02 run by Phuong Trang (FUTA), at about 8,000 to 35,000 VND depending on distance, plus a small fee for a large bag. The catch: it leaves from the VKU station in Ngu Hanh Son, not central Da Nang. If you are downtown, you will Grab to the stop first, which eats into the savings.",
  },
  {
    q: "Does the old yellow bus number 1 still run?",
    a: "The bus most travelers take today is the LK02, which took over the Da Nang to Hoi An public route in April 2024. Older route-01 timetables and fares online are out of date, so do not build a tight plan around them. Check at the stop, or the DanaBus app, on the day.",
  },
  {
    q: "How much is a Grab from Da Nang to Hoi An?",
    a: "Usually about 250,000 to 350,000 VND per car (roughly US$10 to US$14), with the price shown in the app before you confirm, so there is no haggling. From the airport it is similar, about 200,000 to 350,000 VND. A metered taxi is in the same range; a private car with driver costs a little more but lets you stop at the Marble Mountains on the way.",
  },
  {
    q: "Do I need a ticket just to walk around Hoi An Old Town?",
    a: "No. Walking the lanes, crossing the bridges, shopping, and eating are all free. The Ancient Town ticket is only checked at the door of the heritage sites: the old merchant houses, assembly halls, museums, and the Japanese Covered Bridge itself. You can see most of the town, day or night, without buying one.",
  },
  {
    q: "How much is the Hoi An Ancient Town ticket and what does it cover?",
    a: "The standard foreign-visitor ticket is 120,000 VND (about US$5) and gives you five coupons, each good for entry to one of about 22 heritage sites. Note that Da Nang's official tourism portal describes the 80,000 VND and 120,000 VND prices as basic and premium tiers (differing in how many sites and whether the museums are included) rather than a Vietnamese-versus-foreigner split, so confirm the exact structure at the booth.",
  },
  {
    q: "Is the ticket actually enforced?",
    a: "Only at the door of each heritage building, not out on the street. Thousands of people walk the old town every day without one. Buy from an official yellow booth if you plan to go inside the heritage sites. Ignore anyone in a vaguely official shirt demanding to see a ticket in the open lanes or claiming the real booth is closed.",
  },
  {
    q: "When is the Hoi An lantern festival?",
    a: "It falls on the 14th night of every lunar month, the full moon or the night before, so about twelve nights a year. On those evenings the old town closes to traffic and dims its electric lights, and the streets and the Thu Bon River glow with lanterns. The biggest is the first full moon of the lunar new year. The festival is free, and the dates shift each year with the lunar calendar, so check before you plan around one.",
  },
  {
    q: "Is a day trip to Hoi An worth it, or should I stay overnight?",
    a: "A day trip works well. The Ancient Town is compact and walkable, and a half-day covers the main sights. But the town is at its best in the late afternoon and evening, once the day-trippers leave and the lanterns come on. If you can, time your visit to run into the evening rather than starting early and leaving by mid-afternoon.",
  },
  {
    q: "Where can I leave my luggage for a Hoi An day trip if I have checked out?",
    a: "Storage in Hoi An itself is limited, so the practical move is to leave your bags in Da Nang and go bag-free. Hotels usually hold bags only until early evening, and the airport lockers charge extra late at night. A storage shop on the Da Nang side, on the road toward Hoi An, lets you leave bags before you go and collect them on the way to an evening flight.",
  },
];

const SOURCES = [
  { label: "Danang Fantasticity — official Da Nang City tourism portal (Hoi An tickets)", url: "https://danangfantasticity.com/en/discovery/hoi-an-ancient-town-entrance-tickets-2026", note: "the official 2026 ticket tiers, up-to-3-day validity, and the car-free pedestrian hours" },
  { label: "hoianit.com — Da Nang to Hoi An by public bus", url: "https://hoianit.com/da-nang-to-hoi-an-by-public-bus/", note: "the LK02-replaces-route-01 change, fares, the luggage fee, hours, and the VKU departure point" },
  { label: "north-vietnam.com — Da Nang to Hoi An transport overview", url: "https://north-vietnam.com/da-nang-to-hoi-an/", note: "distance and per-mode cost and time ranges, and named shuttle operators" },
  { label: "dananghoian.net — 2026 all transport options", url: "https://dananghoian.net/en/explore/travel-da-nang-hoi-an-2026-all-transportation-options/", note: "specific VND fares for Grab, private cars, and shared vans" },
  { label: "Hidden Hoi An — the Ancient Town ticket, explained", url: "https://hiddenhoian.com/general/hoi-an-old-town-ticket-fees-sites/", note: "the door-not-street enforcement reality and the five-of-many coupon system" },
  { label: "Gastrotravelogue — Hoi An lantern festival dates", url: "https://www.gastrotravelogue.com/travel/hoi-an-lantern-festival/", note: "the 14th-of-the-lunar-month timing, the traffic-free dimmed-light evenings, and that it is free" },
  { label: "Vietnam Tourism — luggage storage in Vietnam", url: "https://www.vietnamtourism.com/en/luggage-storage-in-vietnam-where-to-leave-bags-between-trains-flights-and-hotels", note: "hotel and airport storage norms, and why storing in Da Nang beats Hoi An for a day trip" },
];

export default async function HoiAnGuide() {
  const dict = await getDictionary("en");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideFaqJsonLd(FAQ_ITEMS)) }} />
      <GuideLayout
        dict={dict}
        currentPath="/guides/da-nang-to-hoi-an-day-trip"
        eyebrow="Day Trips"
        title="Da Nang to Hoi An Day Trip"
        subhead="How to get there without overpaying, how the Old Town ticket really works, when to go for the lanterns, and what to do with your bags if your flight is the same night."
        readingTime="11 min read"
        toc={[
          { id: "distance", label: "How far, and how long" },
          { id: "transport", label: "Every way to get there, compared" },
          { id: "bus", label: "The bus (it changed in 2024)" },
          { id: "when", label: "When to go: day, evening, lanterns" },
          { id: "ticket", label: "The Old Town ticket, explained" },
          { id: "do", label: "What to see in a day" },
          { id: "marble", label: "Combine the Marble Mountains" },
          { id: "your-stuff", label: "What to do with your bags" },
          { id: "faq", label: "Questions people ask" },
        ]}
        related={[
          { title: "Marble Mountains Guide", href: "/guides/marble-mountains-guide", blurb: "It sits right on the road to Hoi An, the easiest stop to combine." },
          { title: "Ba Na Hills Day Trip", href: "/guides/ba-na-hills-day-trip", blurb: "The other big day trip from Da Nang, in the opposite direction." },
        ]}
      >
        <GuideLead>
          Hoi An is close enough to Da Nang that thousands of people do it as a day trip. It is also fiddly enough
          around transport, tickets, and timing that a lot of those days go slightly wrong. Here is how to get the
          money, the ticket, and the lanterns right, and how it all fits around a bag you may not want to carry.
        </GuideLead>

        <GuideTLDR>
          Hoi An is about <strong>30 km south of Da Nang</strong>, a <strong>30 to 60 minute drive</strong>.
          Cheapest to comfiest: the public <strong>LK02 minibus</strong> (about 8,000 to 35,000 VND, but it leaves
          from Ngu Hanh Son, not the city centre); a <strong>Grab or taxi</strong> (about 250,000 to 400,000 VND per
          car), the easy default; or a <strong>private car with driver</strong> if you want to stop at the Marble
          Mountains on the way. It is worth a day trip: the Ancient Town is compact and walkable, and best in the{" "}
          <strong>lantern-lit evening</strong>. The foreign-visitor ticket is <strong>120,000 VND</strong>, but it
          is only checked at the doors of the heritage sites, so you can walk, eat, and shop for free. If you have
          checked out or fly out that night, leave your bags in Da Nang and go bag-free.
        </GuideTLDR>
        <GuideImage
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2024_H%E1%BB%99i_An_-_Japanese_Covered_Bridge_%28Ch%C3%B9a_C%E1%BA%A7u%29_after_renovation_-_img_11.jpg"
          alt="The Japanese Covered Bridge (Chua Cau) in Hoi An Old Town, after its 2024 renovation"
          width={3287}
          height={2465}
          credit="Chainwit."
          creditUrl="https://commons.wikimedia.org/wiki/File:2024_H%E1%BB%99i_An_-_Japanese_Covered_Bridge_(Ch%C3%B9a_C%E1%BA%A7u)_after_renovation_-_img_11.jpg"
          license="CC BY 4.0"
        />

        <GuideFacts
          items={[
            { label: "Distance", value: "~30 km" },
            { label: "Drive time", value: "30-60 min" },
            { label: "Grab / taxi", value: "~250,000-400,000 VND/car" },
            { label: "Public bus (LK02)", value: "~8,000-35,000 VND" },
            { label: "Old Town ticket", value: "120,000 VND, 5 coupons" },
            { label: "Lantern festival", value: "14th of each lunar month" },
          ]}
        />

        <div id="distance" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="distance">How far is Hoi An from Da Nang?</GuideH2>
          <p>
            About 30 km by road from central Da Nang, a 30 to 60 minute drive depending on traffic. From the airport
            it is a little closer, about 25 to 30 km and 30 to 40 minutes in normal conditions. The range matters
            more than the average. Da Nang&apos;s rush hours, roughly 7 to 9 AM and 5 to 7 PM, can push the drive to
            the top of that band, which is the difference between a relaxed airport run and a stressful one.
          </p>
        </div>

        <div id="transport" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="transport">Every way to get from Da Nang to Hoi An, compared</GuideH2>
          <p>
            There is no single right way. It is a trade between price, ease, and whether you want to stop on the way.
            Here is the honest comparison, cheapest to comfiest.
          </p>
          <GuideTable
            columns={["Cost (one-way)", "Time", "Best for"]}
            rows={[
              { label: "Public bus (LK02)", values: ["~8,000-35,000 VND (+bag fee)", "45-70 min", "Budget travelers already near Ngu Hanh Son"] },
              { label: "Grab (car)", values: ["~250,000-350,000 VND", "45-60 min", "Easy door to door, price shown up front"] },
              { label: "Metered taxi", values: ["~300,000-400,000 VND", "30-60 min", "Anyone without the Grab app"] },
              { label: "Private car + driver", values: ["350,000-400,000 VND+", "30-60 min", "Groups; stopping at the Marble Mountains"] },
              { label: "Booked shuttle / van", values: ["~US$2-17/person", "60-90 min", "Booking online, sharing the cost"] },
              { label: "Motorbike (self-ride)", values: ["Rental varies", "~60 min", "Confident riders who want flexibility"] },
            ]}
          />
          <p className="text-[13px] text-[#9CA3AF]">
            Fares swing with traffic, surge pricing, and season, and USD conversions are approximate. Treat every
            figure as a range, not a fixed price.
          </p>
        </div>

        <div id="bus" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="bus">The public bus (it changed in 2024)</GuideH2>
          <p>
            The bus is by far the cheapest way to Hoi An, but it comes with a catch a lot of older guides get wrong.
            Since April 2024, the Da Nang to Hoi An public route has been the <strong>LK02</strong>, run by Phuong
            Trang (FUTA). These are modern air-conditioned minibuses with fixed, posted fares, which ended the
            overcharging of the old tourist-bus days. Fares run about 8,000 to 35,000 VND by distance, plus a small
            charge (about 8,000 to 13,000 VND) for a large bag, with departures every 15 to 30 minutes.
          </p>
          <GuideCallout label="The catch, before you rely on it">
            The LK02 does not start in central Da Nang. Its Da Nang terminal is the VKU (Viet Han University) bus
            station out in <strong>Ngu Hanh Son district</strong>, about 10 km south of downtown. If you are staying
            in the city centre, you will need a Grab to the stop first, which eats into the savings. If you are
            already on the southern, Marble-Mountains side of town, the bus is right there. Because the route changed
            recently, confirm the current fare and stops at the station or on the DanaBus app rather than trusting an
            old timetable.
          </GuideCallout>
        </div>

        <div id="when" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="when">When to go: day, evening, and the lanterns</GuideH2>
          <p>
            If you only see Hoi An in the midday heat with the tour crowds, you will wonder what the fuss is about.
            The town rewards the edges of the day. Arrive early, before about 8 AM, and the lanes are quiet and cool.
            Stay into the evening, and the whole place changes as the lanterns come on and the riverfront fills with
            light.
          </p>

          <GuideH3>The monthly lantern festival</GuideH3>
          <p>
            Hoi An has lanterns year-round, but the full show follows the calendar. On the{" "}
            <strong>14th night of each lunar month</strong>, the full moon or the night before, about twelve nights a
            year, the old town closes to traffic and dims its electric lights, so the streets and the Thu Bon River
            glow by lantern alone. The biggest is the first full moon of the lunar new year. The festival is free,
            the dates shift each year with the lunar calendar, and on those nights access and parking are tighter
            than usual. Check the date and plan your arrival if you want to catch it.
          </p>

          <GuideImage
            src="https://upload.wikimedia.org/wikipedia/commons/2/23/Lanterns_in_Hoi_An_4.jpg"
            alt="Silk lanterns lighting the streets of Hoi An Old Town after dark"
            width={4032}
            height={3024}
            credit="Christophe95"
            creditUrl="https://commons.wikimedia.org/wiki/File:Lanterns_in_Hoi_An_4.jpg"
            license="CC BY-SA 4.0"
          />

          <GuideCallout label="If you fly out of Da Nang that night">
            The lantern atmosphere peaks around 8 to 9 PM, and the drive back to Da Nang plus an airport buffer means
            most evening flights force you to leave Hoi An before it does. That is a real trade-off, not a minor
            detail. Decide which one you are optimising for before you plan the day, and let your flight time, not
            the lanterns, set your exit.
          </GuideCallout>
        </div>

        <div id="ticket" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="ticket">The Ancient Town ticket, explained</GuideH2>
          <p>
            The foreign-visitor ticket is 120,000 VND (about US$5) and buys a booklet of five tear-off coupons. Each
            one is good for entry to one of about 22 heritage sites: old merchant houses, assembly halls, museums,
            and the Japanese Covered Bridge. You do not choose the five in advance; each site&apos;s ticket-taker
            tears one as you enter. (Da Nang&apos;s official tourism portal frames the 80,000 VND and 120,000 VND
            prices as basic and premium tiers, differing in how many sites and whether the museums are included,
            rather than a Vietnamese-versus-foreigner split, so it is worth a glance at the booth.)
          </p>
          <p>
            <strong>You do not need it to just walk around.</strong> The streets, the bridges, the shopping, and the
            food are all free. The ticket only gates entry to those specific buildings, and it is checked at each
            site&apos;s door, not in the lanes.
          </p>
          <GuideCallout label="A real scam to watch for">
            Official tickets are sold only at the marked yellow booths around the old town&apos;s edge. Unofficial
            sellers sometimes push single-site tickets at a markup, or claim the real booth is closed to send you to
            theirs. The city does not sell single-site tickets at all. Buy from a marked booth, or skip the ticket if
            you are not going inside the heritage buildings.
          </GuideCallout>
        </div>

        <div id="do" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="do">What to see and do in a day</GuideH2>
          <p>
            The core of a first visit is small and walkable: the <strong>Japanese Covered Bridge</strong> (reopened
            in 2024 after a careful renovation), the <strong>assembly halls</strong> built by the town&apos;s Chinese
            trading communities, and the old <strong>merchant houses</strong> along Tran Phu Street, now living
            museums. None of it is far apart. Hoi An is a place you drift through rather than tick off.
          </p>
          <p>
            By late morning the heat becomes the limiting factor. A basket-boat ride through the Cam Thanh coconut
            village (often bundled into day tours) is a shaded way to spend the hottest hours. Or duck into an
            air-conditioned tailor for made-to-measure clothing, a genuine Hoi An institution, though a proper
            fitting takes 24 to 48 hours, so it is not a same-day errand. Come evening, dinner among the lanterns and
            a wish-lantern on the river are the classic close to the day.
          </p>
        </div>

        <div id="marble" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="marble">Combine the Marble Mountains on the way</GuideH2>
          <p>
            The{" "}
            <Link href="/guides/marble-mountains-guide" className="text-[#E8742C] underline underline-offset-2">
              Marble Mountains
            </Link>{" "}
            sit almost exactly between Da Nang and Hoi An, which makes them the easiest stop to fold into the day.
            Entry is 40,000 VND plus an optional 15,000 VND elevator, and a focused visit is about 1 to 2 hours. A
            private car or a motorbike makes this simple; on the bus it is harder to slot in. Many combined day tours
            pair the mountains and the Ancient Town because they are on the same road.
          </p>
        </div>

        <div id="your-stuff" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="your-stuff">What to do with your bags</GuideH2>
          <p>
            This quietly decides a lot of Hoi An days. If you have checked out of a Da Nang hotel with an evening
            flight, or you are moving between the two cities, you do not want to drag a suitcase through Old
            Town&apos;s pedestrian lanes. And Hoi An&apos;s own storage is more limited than Da Nang&apos;s. Hotels
            there hold bags only until early evening, and the airport lockers cost extra late at night. So the
            practical answer is to leave your bags on the Da Nang side and travel light.
          </p>

          <GuideStowCallout
            eyebrow="On the road to Hoi An"
            heading="Leave the bags in Da Nang, do Hoi An hands-free, collect them on the way to your flight."
            facts={[
              { label: "On the Hoi An road", value: "Ngu Hanh Son" },
              { label: "Full day", value: "60,000 VND (up to 24h)" },
              { label: "Open", value: "7am - 10pm daily" },
            ]}
          >
            Stow is at 55 Ba Bang Nhan in <strong>Ngu Hanh Son</strong>, the Da Nang side that faces Hoi An, right by
            the Marble Mountains and about ten minutes from the airport. That location is the whole point: leave your
            bags before you head south, spend the day (and the lantern evening) in Hoi An with nothing to carry, then
            swing back through on the way to an evening flight. We are open <strong>until 10pm</strong>, which covers
            a late Hoi An dinner, and the daily rate is 60,000 VND for up to 24 hours. Every bag is tagged and
            photographed at drop-off.
          </GuideStowCallout>
        </div>

        <div className="flex flex-col gap-3">
          <GuideH2>A sample bag-free day</GuideH2>
          <GuideList
            items={[
              "Morning: leave your bags in Da Nang, then stop at the Marble Mountains (1 to 2 hours) on the way south.",
              "Midday: lunch in Hoi An, then the Japanese Bridge, an assembly hall, and a merchant house before the heat peaks.",
              "Afternoon: a shaded basket-boat ride or a tailor fitting, out of the sun.",
              "Evening: dinner among the lanterns and a wish-lantern on the river.",
              "Then: back to Da Nang, collect your bags, and on to the airport with time to spare.",
            ]}
          />
          <p className="text-[13px] text-[#9CA3AF]">
            For the timing: international flights want about 3 to 3.5 hours from Hoi An once you count the drive and
            check-in; domestic can be 2 to 2.5. That is the number to plan your Old Town exit around, not the lantern
            show&apos;s peak hour.
          </p>
        </div>

        <div id="faq" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="faq">Questions people ask</GuideH2>
          <GuideFAQ items={FAQ_ITEMS} />
        </div>

        <GuideSources items={SOURCES} />

        <p className="text-[13px] text-[#9CA3AF]">
          Transport fares, ticket prices, and bus routes change — the public route in particular was reorganised in
          2024 — so treat the figures here as ranges that were current at the time of writing, and confirm anything
          you are planning tightly around on the day.
        </p>
      </GuideLayout>
    </>
  );
}
