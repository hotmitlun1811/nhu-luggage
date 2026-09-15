import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/components/guides/GuideLayout";
import {
  GuideH2,
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
import { breadcrumbJsonLd, guideFaqJsonLd } from "@/lib/structured-data";
import { getDictionary } from "@/content/dictionary";

const pageTitle = "Getting Around Da Nang: Grab, Motorbikes, Taxis & Fares";
const pageDescription =
  "How to get around Da Nang: Grab and Xanh SM fares, whether Grab is safe, the truth about renting a motorbike and the licence law, metered taxis, airport transfers, buses, and what common trips actually cost.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides/getting-around-da-nang" },
  openGraph: { title: `${pageTitle} | Stow`, description: pageDescription, url: "https://www.stowdanang.com/guides/getting-around-da-nang" },
  twitter: { title: `${pageTitle} | Stow`, description: pageDescription },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Getting Around Da Nang", path: "/guides/getting-around-da-nang" },
]);

const FAQ_ITEMS = [
  {
    q: "How do you get around Da Nang without renting a scooter?",
    a: "Use Grab or Xanh SM for almost everything. A car across town is about 60,000 to 150,000 VND, priced upfront in the app, and both work in English. A GrabBike (motorbike taxi) is about half the price of a car if you are traveling light.",
  },
  {
    q: "Is Grab safe in Da Nang?",
    a: "Yes for the ride itself: fares are fixed, the route is tracked in the app, and you can pay cashless. The main risk is fake 'Grab' drivers touting inflated fares at the airport, so always match the driver's name, plate, and car to the app before you get in, and never accept a 'the app is broken, pay me cash' switch.",
  },
  {
    q: "Can tourists legally rent and ride a motorbike in Da Nang?",
    a: "Only with your valid home licence plus an International Driving Permit issued under the 1968 Vienna Convention. Travelers from the US, Canada, and China are in a grey area, because their countries did not sign that convention, so their IDP is not clearly valid in Vietnam, even though rental shops rarely check. If you are from most of Europe, Australia, New Zealand, or South Korea, a 1968 IDP plus your licence covers you.",
  },
  {
    q: "What happens if I ride a motorbike without the right licence?",
    a: "Fines start around 2,000,000 VND and can reach about 6,000,000 VND, police can impound the bike, and, more importantly, your travel and health insurance will typically deny a crash claim. Enforcement has increased since the 2025 traffic-fine changes, with roadside checks common in tourist areas.",
  },
  {
    q: "How much is a scooter rental in Da Nang?",
    a: "About 120,000 to 250,000 VND a day for a standard automatic, plus a deposit of roughly 500,000 to 800,000 VND (try to leave a cash deposit rather than your passport). Helmets are mandatory for rider and passenger; riding without one is a 400,000 to 600,000 VND fine.",
  },
  {
    q: "How much is a taxi from Da Nang airport to the city?",
    a: "About 70,000 to 120,000 VND by Grab or metered taxi for the roughly 10-minute hop. The small airport-pickup surcharge is usually already inside the app quote. See our airport guide for the arrival details.",
  },
  {
    q: "Which taxi companies are reliable in Da Nang?",
    a: "Vinasun (white with a green stripe) and Mai Linh (green). Read the full company name on the door to avoid lookalike cars, make sure the driver runs the meter, and get out if they will not.",
  },
  {
    q: "Grab, Xanh SM, or Be, which should I use?",
    a: "Keep Grab and Xanh SM on your phone and compare before each ride. Xanh SM is an all-electric fleet whose fares tend to move less during surges; Grab has the most drivers; Be works but has fewer. Between them you are covered across the city.",
  },
  {
    q: "What is the cheapest way to get from Da Nang to Hoi An?",
    a: "The LK02 public minibus at about 8,000 to 35,000 VND, but it leaves from the VKU station in Ngu Hanh Son rather than downtown, so factor in a short Grab to reach it. A Grab car is about 250,000 to 350,000 VND door to door. Full detail is in our Da Nang to Hoi An guide.",
  },
  {
    q: "Do I need cash to get around Da Nang?",
    a: "Not for the ride apps, which take cashless payment, but keep small notes for buses, cyclos, and metered taxis. Carry only what you need on the beach or a bike, since petty theft targets unattended bags.",
  },
];

const SOURCES = [
  { label: "Vietnam Tourism: driving in Vietnam and renting a motorbike legally", url: "https://www.vietnamtourism.com/en/driving-in-vietnam-international-permits-rules-and-renting-a-motorbike-legally", note: "the primary source for the licence law, the 1968 vs 1949 IDP issue, fines, and insurance" },
  { label: "Vietnam Law Magazine: how foreigners are sanctioned for traffic violations", url: "https://vietnamlawmagazine.vn/how-are-foreigners-sanctioned-for-traffic-violations-in-vietnam-75473.html", note: "legal-press confirmation that foreigners face the same penalties as locals" },
  { label: "Da Nang Hotel Guide: Grab guide", url: "https://www.dananghotelguide.com/da-nang-grab-guide.html", note: "GrabCar and GrabBike fares, surge times, and the airport pickup logistics" },
  { label: "VietnameSIM: Grab, Xanh SM & Be compared", url: "https://vietnamesim.com/grab-xanh-sm-be-vietnam/", note: "the cross-town car fare range and the app-by-app comparison" },
  { label: "Vinpearl: Da Nang motorbike rental prices", url: "https://vinpearl.com/en/da-nang-motorbike-rental-the-best-guide-with-updated-prices", note: "scooter daily rates and deposit norms" },
  { label: "VietnamSpot: Da Nang transport", url: "https://vietnamspot.ru/en/blog/da-nang-transport", note: "the Vinasun and Mai Linh fleets, per-km taxi rate, and Xanh SM surge behaviour" },
  { label: "Before You Go Travels: Da Nang scams", url: "https://beforeyougotravels.com/destinations/da-nang", note: "the fake-Grab-at-the-airport scam and the inflated-fare example" },
  { label: "hoianit.com: Da Nang to Hoi An by bus", url: "https://hoianit.com/da-nang-to-hoi-an-by-public-bus/", note: "the LK02 bus fare, bag fee, and VKU departure point" },
];

export default async function GettingAroundDaNang() {
  const dict = await getDictionary("en");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideFaqJsonLd(FAQ_ITEMS)) }} />
      <GuideLayout
        dict={dict}
        currentPath="/guides/getting-around-da-nang"
        eyebrow="Getting Around"
        title="Getting Around Da Nang"
        subhead="Grab, Xanh SM, motorbikes, taxis and buses, with real fares, the licence law nobody spells out, and the one thing that decides whether you should rent a bike at all."
        readingTime="12 min read"
        toc={[
          { id: "orientation", label: "How getting around works" },
          { id: "grab-apps", label: "Grab and the ride-hailing apps" },
          { id: "grab-safe", label: "Is Grab safe in Da Nang?" },
          { id: "motorbike", label: "Renting a motorbike (the licence reality)" },
          { id: "taxis", label: "Metered taxis" },
          { id: "airport", label: "Airport transfers" },
          { id: "buses", label: "Buses, walking and cyclo" },
          { id: "fares", label: "What common trips cost" },
          { id: "choose", label: "Which option should you choose?" },
          { id: "faq", label: "Questions people ask" },
        ]}
        related={[
          { title: "Da Nang Airport (DAD) Guide", href: "/guides/da-nang-airport-guide", blurb: "The full arrival walkthrough, SIM cards, and fares from the airport." },
          { title: "Da Nang to Hoi An Day Trip", href: "/guides/da-nang-to-hoi-an-day-trip", blurb: "Every way to reach Hoi An compared, including the LK02 bus." },
        ]}
      >
        <GuideLead>
          Da Nang is one of the easiest Vietnamese cities to get around: ride-hailing is cheap, everywhere, and
          priced upfront in the app. For most visitors the honest answer is simple, use Grab or Xanh SM for almost
          everything, and only rent a motorbike if you genuinely know how to ride and understand the licence
          situation. Here is how each option works, what it really costs, and how to choose.
        </GuideLead>

        <GuideTLDR>
          Use <strong>Grab or Xanh SM</strong> for almost everything: a car across town is about{" "}
          <strong>60,000 to 150,000 VND</strong>, priced in the app before you ride, and a GrabBike is about half
          that. The airport is only 10 minutes out, so an airport car is usually{" "}
          <strong>70,000 to 120,000 VND</strong>. Scooters rent from about <strong>120,000 to 250,000 VND a
          day</strong>, but Vietnam legally requires a <strong>1968-Convention IDP plus your home licence</strong>,
          and US, Canadian and Chinese permits are not clearly recognised, which can void your insurance in a crash.
          Metered taxis (Vinasun, Mai Linh) are a fine backup. The one thing no guide tells you: a big suitcase does
          not fit on a scooter or a GrabBike, so store the big bag and ride with a daypack.
        </GuideTLDR>

        <GuideImage
          src="https://upload.wikimedia.org/wikipedia/commons/4/40/H%E1%BB%93_Nghinh_street%2C_My_An%2C_Da_Nang.jpg"
          alt="A street in the My An beach area of Da Nang, the kind of ride most trips are made of"
          width={3408}
          height={2240}
          credit="Klientos"
          creditUrl="https://commons.wikimedia.org/wiki/File:H%E1%BB%93_Nghinh_street,_My_An,_Da_Nang.jpg"
          license="CC BY-SA 4.0"
        />

        <GuideFacts
          items={[
            { label: "GrabCar cross-town", value: "~60,000-150,000 VND" },
            { label: "GrabBike cross-town", value: "~40,000 VND" },
            { label: "Airport to city", value: "~70,000-120,000 VND" },
            { label: "Scooter rental", value: "~120,000-250,000 VND/day" },
            { label: "Taxi rate", value: "~14,000-20,000 VND/km" },
            { label: "Best apps", value: "Grab + Xanh SM" },
          ]}
        />

        <div id="orientation" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="orientation">How getting around Da Nang works</GuideH2>
          <p>
            Da Nang is compact and flat. The riverfront core (Hai Chau) and the beach strip (My Khe, An Thuong) sit
            about 5 to 10 minutes apart across the Han River, and the airport is roughly 10 minutes west of the
            centre. Everything else, the Marble Mountains, Son Tra, the markets, is a cheap ride away. You do not
            need a car or a bike to have a great trip; ride-hailing covers almost everything.
          </p>
        </div>

        <div id="grab-apps" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="grab-apps">Grab and the ride-hailing apps</GuideH2>
          <p>
            <strong>Grab</strong> is the default: you book in the app, see the price before you confirm, and can pay
            cashless. A <strong>GrabCar</strong> across town is about 60,000 to 150,000 VND; a{" "}
            <strong>GrabBike</strong> (a motorbike taxi, helmet provided) is about 40,000 VND and quicker through
            traffic if you are traveling light. Prices surge 30 to 50 percent on Saturday evenings around the Dragon
            Bridge, on holidays, and in rain, so wait a few minutes if the quote looks high.
          </p>
          <p>
            Worth adding a second app: <strong>Xanh SM</strong> is an all-electric fleet that has grown into one of
            Vietnam&apos;s largest ride-hailing services, with strong Da Nang coverage. Its fares are close to
            Grab&apos;s and tend to move less during surges, so it is a good comparison when Grab spikes.{" "}
            <strong>Be</strong> is a third option that works but has fewer drivers. The simple play for 2026 is to
            keep Grab and Xanh SM and check both before a ride.
          </p>
        </div>

        <div id="grab-safe" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="grab-safe">Is Grab safe in Da Nang?</GuideH2>
          <p>
            Yes, for the ride itself. Fares are fixed, the route is tracked in the app, and you can pay without
            cash. The one scam to know is fake &ldquo;Grab&rdquo; drivers who intercept bookings at the airport and
            show a phone with an inflated VIP fare (one traveler was quoted 500,000 VND for a ride that was about
            50,000 VND on the real app). The fix is easy: book in the app, then check the driver&apos;s name, plate,
            and car against what the app shows before you get in, and never accept a &ldquo;the app is broken, just
            pay me cash&rdquo; switch.
          </p>
        </div>

        <div id="motorbike" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="motorbike">Renting a motorbike, and the licence reality nobody spells out</GuideH2>
          <p>
            A scooter is the fun way to explore, and shops make it easy: about 120,000 to 250,000 VND a day for a
            standard automatic, plus a deposit of roughly 500,000 to 800,000 VND. Try to leave a cash deposit rather
            than your passport. But the licence rules are stricter than the rental counter makes them look, and this
            is worth getting right.
          </p>
          <GuideCallout label="The licence law, honestly (as of 2026)">
            Vietnam legally requires a Vietnamese licence, or your valid home licence plus an International Driving
            Permit issued under the <strong>1968 Vienna Convention</strong>. The older <strong>1949 Geneva</strong>{" "}
            IDP is not accepted. Most of Europe, Australia, New Zealand, and South Korea issue 1968 permits, so those
            travelers can ride legally. The <strong>US, Canada, and China did not sign the 1968 Convention</strong>,
            so their travelers are in a genuine grey area and cannot clearly ride legally, even with &ldquo;an
            IDP.&rdquo; Rental shops almost never check, which lulls people into thinking it is fine; enforcement,
            not the counter, is where it matters.
          </GuideCallout>
          <p>
            The stakes: riding without a valid licence draws fines from about 2,000,000 to 6,000,000 VND, police can
            impound the bike, and, most importantly, most travel and health insurance will deny a crash claim,
            regardless of fault. Enforcement has visibly increased since Vietnam raised traffic fines in 2025, with
            roadside checks common in tourist areas on evenings and weekends. Helmets are mandatory for rider and
            passenger, and riding without one is a 400,000 to 600,000 VND fine. If you are not confident riding in
            chaotic traffic, or you are from a country whose licence is not recognised, a GrabBike gives you the
            same two-wheel experience with none of the risk.
          </p>
        </div>

        <div id="taxis" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="taxis">Metered taxis</GuideH2>
          <p>
            Two reliable fleets: <strong>Vinasun</strong> (white with a green stripe) and <strong>Mai Linh</strong>{" "}
            (green). The meter runs at roughly 14,000 to 20,000 VND per km, so a 5 km ride is about 70,000 to
            100,000 VND, similar to Grab. They are a good app-free backup at hotel ranks and the airport. Avoid
            lookalike cars that copy those colours: read the full company name on the door, make sure the meter
            starts, and get out if the driver refuses. Watch for the &ldquo;broken meter&rdquo; and the slow scenic
            detour.
          </p>
        </div>

        <div id="airport" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="airport">Airport transfers</GuideH2>
          <p>
            The airport is a 10-minute hop from the city, so an airport GrabCar to the centre or the beach area is
            about 70,000 to 120,000 VND, with the small pickup surcharge usually already in the quote. Book from
            outside (the terminal blocks the signal) and walk to the signed ride-hailing pickup area. A pre-booked
            private car (from about US$7.50 for the city, US$25 to US$40 to Hoi An) is worth it mainly for
            late-night arrivals, big groups, lots of luggage, or a direct run to Hoi An; otherwise Grab is cheaper.
            The full arrival walkthrough is in our{" "}
            <Link href="/guides/da-nang-airport-guide" className="text-[#E8742C] underline underline-offset-2">
              Da Nang Airport guide
            </Link>
            .
          </p>
        </div>

        <div id="buses" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="buses">Buses, walking, and cyclo</GuideH2>
          <p>
            Da Nang&apos;s yellow city buses are clean, air-conditioned, and cheap (about 6,000 to 15,000 VND), but
            slow and limited; use the DanaBus app to plan routes. Handy lines include Route 12 along the My Khe
            beach strip and Route 11 or 06 toward the Marble Mountains. For Hoi An, the{" "}
            <strong>LK02 minibus</strong> (which replaced the old route 01 in 2024) is the cheapest option at about
            8,000 to 35,000 VND, but it leaves from the VKU station in Ngu Hanh Son, not downtown, so it suits
            light-luggage budget travelers; the full comparison is in our{" "}
            <Link href="/guides/da-nang-to-hoi-an-day-trip" className="text-[#E8742C] underline underline-offset-2">
              Da Nang to Hoi An guide
            </Link>
            . A cyclo is a slow scenic novelty (agree the price first, about 100,000 to 200,000 VND), and the
            riverfront and beach promenade are genuinely walkable outside the midday heat.
          </p>
        </div>

        <div id="fares" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="fares">What common trips actually cost</GuideH2>
          <GuideTable
            columns={["GrabCar", "GrabBike", "Bus"]}
            rows={[
              { label: "Airport to city centre", values: ["70,000-120,000 VND", "~40,000-60,000 VND", "Route 06, ~8,000 VND"] },
              { label: "City to My Khe beach", values: ["70,000-100,000 VND", "~35,000-50,000 VND", "Route 12, ~8,000 VND"] },
              { label: "City to Marble Mountains", values: ["100,000-130,000 VND", "~60,000-70,000 VND", "Route 11/06, ~15,000 VND"] },
              { label: "Da Nang to Hoi An", values: ["250,000-350,000 VND", "Not advisable", "LK02, ~8,000-35,000 VND"] },
            ]}
          />
          <p className="text-[13px] text-[#9CA3AF]">
            Fares are indicative ranges that move with traffic, time of day, surge, and fuel, so always confirm the
            live price in the app before you ride.
          </p>
        </div>

        <div id="choose" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="choose">Which option should you choose?</GuideH2>
          <GuideTable
            columns={["Best for", "Watch-outs"]}
            rows={[
              { label: "Grab / Xanh SM car", values: ["Most trips, groups, luggage, heat, rain, night", "Surge on Sat nights and holidays; keep two apps"] },
              { label: "GrabBike", values: ["Solo, light, fast through traffic", "Only a daypack fits, no suitcase"] },
              { label: "Scooter rental", values: ["Confident riders exploring at their own pace", "Licence law, insurance void, fines, real crash risk"] },
              { label: "Metered taxi", values: ["App-free backup, hotel ranks", "Lookalike cars, meter tricks"] },
              { label: "Bus / cyclo", values: ["Budget or novelty", "Slow, not luggage-friendly"] },
            ]}
          />
          <p>
            For most visitors: Grab or Xanh SM for daily trips, a GrabBike when you are light and in a hurry, and a
            metered taxi as backup. Rent a scooter only if you can ride confidently and your licence is recognised.
          </p>

          <GuideStowCallout
            eyebrow="Before you jump on a bike"
            heading="A suitcase does not fit on a scooter. Ride light instead."
            facts={[
              { label: "By the hour", value: "15,000 VND/hr" },
              { label: "Full day", value: "60,000 VND (up to 24h)" },
              { label: "From the airport", value: "~10 min" },
            ]}
          >
            A scooter or a GrabBike has room for a daypack, not a 25 kg suitcase. Balancing a big case on the
            footwell is exactly how bags get scraped, dropped, or snatched. If you want to scoot the city or arrive
            before your hotel check-in, leave the big bag at Stow (55 Ba Bang Nhan, Ngu Hanh Son, about ten minutes
            from the airport, 15,000 VND an hour or 60,000 VND a day, open 7am to 10pm) and ride with just a
            daypack. It solves the same problem on a{" "}
            <Link href="/guides/da-nang-to-hoi-an-day-trip" className="text-[#E8742C] underline underline-offset-2">
              Hoi An day trip
            </Link>{" "}
            or a{" "}
            <Link href="/guides/da-nang-layover-guide" className="text-[#E8742C] underline underline-offset-2">
              layover
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
          Fares, app coverage, and traffic laws change, and US dollar figures are approximate. The motorbike-licence
          position in particular is a genuine grey area for some nationalities and is stated as understood at the
          time of writing; check your own licence, insurance, and the current rules before you ride.
        </p>
      </GuideLayout>
    </>
  );
}
