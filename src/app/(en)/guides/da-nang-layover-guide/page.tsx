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

const pageTitle = "Da Nang Layover Guide: Can You Leave the Airport, and What Fits";
const pageDescription =
  "Whether you can leave Da Nang airport on a layover (the visa rule most guides skip), the 4-hour rule, real immigration and Grab times, a bag-first plan for 5, 6, 8 and 10-hour layovers, and where to store your luggage first.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides/da-nang-layover-guide" },
  openGraph: { title: `${pageTitle} | Stow`, description: pageDescription, url: "https://www.stowdanang.com/guides/da-nang-layover-guide" },
  twitter: { title: `${pageTitle} | Stow`, description: pageDescription },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Da Nang Layover Guide", path: "/guides/da-nang-layover-guide" },
]);

const FAQ_ITEMS = [
  {
    q: "Can I leave Da Nang airport during a layover?",
    a: "Only if you can formally enter Vietnam, with a valid e-visa or a visa-free passport. There is no broad transit rule that lets you out of the terminal on a layover. If you stay airside and never clear immigration, you need nothing. The moment you step into the city, it counts as entering the country, like any other arrival.",
  },
  {
    q: "Do I need a visa just to leave the airport?",
    a: "It depends on your passport, not your layover length. About 39 nationalities get visa-free entry (most of Western Europe, Japan, South Korea, and ASEAN neighbours), but US, Canadian, and Australian passports are not on the list and need an e-visa arranged in advance. An e-visa cannot be issued same day for a spontaneous stop, so sort it before you fly if you plan to leave.",
  },
  {
    q: "Is my layover long enough to bother leaving?",
    a: "Use the 4-hour rule. Between getting off the plane, immigration, the ride each way, and getting back with a check-in buffer, about 60 to 90 minutes goes to process before you see anything. Under 4 hours on the ground, stay airside and use a lounge. With 4 hours or more, one real stop is worth it.",
  },
  {
    q: "How long does immigration take at Da Nang?",
    a: "About 10 to 30 minutes off-peak, and Da Nang is one of Vietnam's faster airports for it. During holiday and charter peaks, when several international flights land together, waits can reach 60 to 90 minutes and sometimes close to two hours. Budget more buffer than the airport's small size suggests.",
  },
  {
    q: "How much is a Grab from the airport to the city or the beach?",
    a: "The airport is only 2 to 3 km from downtown, so a GrabCar into the centre is about 45,000 to 100,000 VND (roughly US$2 to US$4), and a metered taxi about 60,000 VND. My Khe Beach is about 10 to 15 minutes away for roughly 90,000 to 140,000 VND. Grab shows a fixed price before you confirm.",
  },
  {
    q: "Is there luggage storage at Da Nang airport?",
    a: "There is no official left-luggage counter run by the airport. A third-party desk sits outside the domestic terminal and stores bags from about 60,000 VND for under 3 hours up to 100,000 VND for a full day, open roughly 9:00 AM to 11:30 PM. Its limits: it is by the domestic terminal, not international; it closes before midnight; and it is priced in short blocks.",
  },
  {
    q: "What can I do on a 5 to 6 hour layover?",
    a: "After immigration both ways and a return buffer, expect 2.5 to 3.5 usable hours. That is enough for one close thing: a walk on My Khe Beach, the Museum of Cham Sculpture, or the Marble Mountains if you move quickly. It is not enough to reach Hoi An and back comfortably.",
  },
  {
    q: "Can I get to Hoi An and back on a layover?",
    a: "Only with a long one, about 8 hours or more on the ground. Hoi An is 28 to 32 km away, 45 minutes to over an hour each way in traffic (Grab about US$10 to US$20, or a shuttle around US$5). On a shorter layover the drive eats the day, so save Hoi An for a proper visit.",
  },
  {
    q: "When is the Dragon Bridge fire show?",
    a: "Friday, Saturday, and Sunday nights only, at 9:00 PM, for about 30 minutes, and it is free with no ticket. There is no show Monday to Thursday, so a weekday-evening layover will not catch it. Arrive by about 8:30 PM for a spot on the riverfront.",
  },
  {
    q: "Is there a lounge if I cannot leave the airport?",
    a: "Yes. The international terminal has lounges (about US$25 for roughly three hours, usually with a buffet, showers, and rest areas), and the domestic terminal a cheaper option around US$15. For a short layover, or if you cannot enter Vietnam, a lounge is the sensible plan B.",
  },
];

const SOURCES = [
  { label: "vietnam-visa.com — transit in Vietnam", url: "https://www.vietnam-visa.com/transit-in-vietnam/", note: "the core rule: you must clear immigration (with a visa or exemption) to leave the terminal; airside transit under 24 hours needs no visa" },
  { label: "evisasvietnam.com — Vietnam visa-exemption list", url: "https://evisasvietnam.com/blog/vietnam-visa-exemption-list/", note: "which nationalities can enter visa-free and for how long, plus e-visa cost and validity" },
  { label: "Traveloka — Vietnam Digital Arrival Card", url: "https://www.traveloka.com/en-en/explore/tips/vietnam-digital-arrival-card/1007396", note: "the online pre-arrival declaration and where it currently applies" },
  { label: "kisstour.com — Vietnam airport immigration wait times", url: "https://kisstour.com/travel-guide/vietnam-airport-immigration-wait-times/", note: "Da Nang immigration times, off-peak and peak" },
  { label: "hiddenhoian.com — Da Nang airport guide", url: "https://hiddenhoian.com/travel/da-nang-airport/", note: "the third-party left-luggage desk prices and hours, lounges, and airport-to-city fares" },
  { label: "entryvn.com — Da Nang airport guide", url: "https://entryvn.com/da-nang-airport-guide/", note: "distances, Grab and taxi fare ranges, and the Hoi An transfer" },
  { label: "hoiandaytrip.com — Dragon Bridge fire and water show", url: "https://hoiandaytrip.com/dragon-bridge-fire-water-show-da-nang/", note: "the Friday-to-Sunday 9:00 PM schedule and where to watch" },
];

export default async function LayoverGuide() {
  const dict = await getDictionary("en");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideFaqJsonLd(FAQ_ITEMS)) }} />
      <GuideLayout
        dict={dict}
        currentPath="/guides/da-nang-layover-guide"
        eyebrow="Layovers"
        title="Da Nang Layover Guide"
        subhead="Your flight lands at 7am and the next one leaves at 6pm. Whether it is worth leaving the airport depends on your passport and the clock. Here is the bag-first version most guides skip."
        readingTime="11 min read"
        toc={[
          { id: "can-you-leave", label: "Can you even leave the airport?" },
          { id: "long-enough", label: "Is your layover long enough?" },
          { id: "into-town", label: "Getting into the city" },
          { id: "the-bag", label: "Step one: where the bag goes" },
          { id: "itineraries", label: "What fits in your window" },
          { id: "stops", label: "What is reachable fast" },
          { id: "eat", label: "What to eat" },
          { id: "airside", label: "Cannot leave? Airside plan B" },
          { id: "faq", label: "Questions people ask" },
        ]}
        related={[
          { title: "Marble Mountains Guide", href: "/guides/marble-mountains-guide", blurb: "The best short-layover sight, about 20 minutes from the airport." },
          { title: "Da Nang to Hoi An Day Trip", href: "/guides/da-nang-to-hoi-an-day-trip", blurb: "Only worth it on a layover of 8 hours or more, if you start early." },
        ]}
      >
        <GuideLead>
          A long Da Nang layover is genuinely usable. The airport sits almost in the city, not far out. But two
          things decide whether you should leave, and neither is how many hours you have on paper: your passport,
          and where your bag goes before you go anywhere.
        </GuideLead>

        <GuideTLDR>
          You can leave Da Nang airport on a layover <strong>only if you can formally enter Vietnam</strong>, with a
          valid e-visa or a visa-free passport. There is no broad transit rule; stay airside and you need nothing,
          but stepping into the city counts as entering the country. If you qualify, Da Nang is easy: the airport is{" "}
          <strong>2 to 3 km from the centre and about 10 to 15 minutes from My Khe Beach</strong>, with a Grab into
          town around <strong>US$2 to US$4</strong>. Budget 60 to 90 minutes of airport time each way, so only leave
          with <strong>4 or more hours on the ground</strong>. Store your bag first, before you go anywhere.
        </GuideTLDR>
        <GuideFacts
          items={[
            { label: "Airport to city", value: "2-3 km, ~10-20 min" },
            { label: "Grab into town", value: "~45,000-100,000 VND" },
            { label: "Immigration, off-peak", value: "10-30 min" },
            { label: "My Khe Beach", value: "~10-15 min" },
            { label: "Marble Mountains", value: "~12 km, ~20 min" },
            { label: "Leave only with", value: "4+ hours on the ground" },
          ]}
        />

        <div id="can-you-leave" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="can-you-leave">First, can you even leave the airport?</GuideH2>
          <p>
            Most layover guides skip this, and it matters more than the itinerary. Vietnam&apos;s rule turns on
            whether you clear immigration, not on how long your layover is. Stay airside — never collect a checked
            bag, never pass passport control — and you need no visa. Step into the city, and that counts as entering
            the country, like any other arrival. There is no short-transit scheme that lets you out for a few hours.
          </p>

          <GuideH3>If you have an e-visa or a visa-free passport</GuideH3>
          <p>
            You are free to leave. About 39 nationalities get visa-free entry, including most of Western Europe,
            Japan, South Korea (45 days), and Vietnam&apos;s ASEAN neighbours (30 days). Everyone else needs a valid
            e-visa, which is fine if you arranged it before you flew.
          </p>

          <GuideH3>If you cannot (US, Canadian, Australian passports)</GuideH3>
          <p>
            <strong>US, Canadian, and Australian passport holders are not on the exemption list</strong> and need an
            e-visa arranged in advance. It cannot be issued same day for a spontaneous layover trip, because
            processing takes several working days. If that is you and you do not have one, use the airside plan below
            rather than risk it at the counter.
          </p>

          <GuideCallout label="One thing to check">
            Vietnam has been phasing in a mandatory online arrival form that generates a QR code. At the time of
            writing it applied at Ho Chi Minh City&apos;s airport, with other airports being added, and true airside
            transit passengers are exempt. Sources differ on which airports are covered when, so if you plan to enter
            at Da Nang, check the current status on the official immigration site before you travel.
          </GuideCallout>
        </div>

        <div id="long-enough" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="long-enough">Is your layover long enough? The 4-hour rule</GuideH2>
          <p>
            Plan around the overhead. Getting off the plane takes 15 minutes or more. Immigration runs 10 to 30
            minutes off-peak, and Da Nang is one of the faster Vietnamese airports for it. During holiday and
            charter peaks, with several flights landing together, it can reach 60 to 90 minutes, sometimes close to
            two hours. Then you do the ride into town, and the same again in reverse, plus a check-in buffer.
          </p>
          <p>
            Add it up: about <strong>60 to 90 minutes goes to airport process each way</strong> before you see
            anything. The simple rule is to leave the airport only with <strong>4 or more hours on the ground</strong>.
            Under that, stay airside. The maths does not leave enough time to make the trip worthwhile.
          </p>
        </div>

        <div id="into-town" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="into-town">Getting from the airport into the city</GuideH2>
          <p>
            Da Nang&apos;s airport is one of the closest-to-town airports in Vietnam, 2 to 3 km from the centre.
            Grab is the easy default: the price is fixed and shown before you confirm, so there is no metering or
            haggling. The pickup zone is just outside arrivals. Expect a few minutes&apos; wait, longer at busy times
            (early morning, late night, rain, holidays).
          </p>
          <GuideTable
            columns={["GrabCar", "Time", "Worth knowing"]}
            rows={[
              { label: "Airport to city centre", values: ["~45,000-100,000 VND", "~10-20 min", "Metered taxi is similar (~60,000 VND)"] },
              { label: "Airport to My Khe Beach", values: ["~90,000-140,000 VND", "~10-15 min", "The closest stop worth making"] },
              { label: "Airport to Marble Mountains", values: ["~US$5-8", "~20 min", "More in bad traffic"] },
              { label: "Airport to Hoi An", values: ["~250,000-450,000 VND", "~35-90 min", "Or a shuttle about US$5; only on a long layover"] },
            ]}
          />
        </div>

        <div id="the-bag" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="the-bag">Step one: where the bag goes</GuideH2>
          <p>
            This is the first decision, not an afterthought. Anything you might do on a layover is miserable with a
            suitcase in tow. You have three options, and they are a real trade-off.
          </p>
          <GuideTable
            columns={["Price", "Hours", "Where"]}
            rows={[
              { label: "Airport desk (third-party)", values: ["60,000-100,000 VND, tiered", "~9:00 AM-11:30 PM", "Outside the domestic terminal, a short walk"] },
              { label: "City storage shop", values: ["From ~15,000 VND/hr or 60,000 VND/day", "Varies (Stow 7am-10pm)", "In town, near the beach and Marble Mountains"] },
              { label: "Bring it with you", values: ["Free", "—", "Fine for very short stops only"] },
            ]}
          />
          <p>
            The airport&apos;s own option is a third-party desk outside the <em>domestic</em> terminal. It is a walk
            from international arrivals, closes before midnight, and charges in short blocks. It works, but it is
            awkward for an international connection or a red-eye. If your plan takes you into town anyway, leaving the
            bag where you will actually be is usually the better move.
          </p>

          <GuideStowCallout
            eyebrow="Step one, before you leave the airport"
            heading="Leave the bag in town, then do the layover hands-free."
            facts={[
              { label: "From the airport", value: "~10 min" },
              { label: "By the hour", value: "15,000 VND/hr" },
              { label: "Full day", value: "60,000 VND (up to 24h)" },
            ]}
          >
            Stow is at 55 Ba Bang Nhan in Ngu Hanh Son, about ten minutes from the airport and right by both My Khe
            Beach and the Marble Mountains — the exact loop a good layover runs. We are open{" "}
            <strong>7am to 10pm every day</strong>, including the evening hours after the airport desk has closed.
            Drop-off takes under three minutes: we tag the bag, take a photo receipt, and you go. By the hour is
            15,000 VND, billed as a full day past four hours, so a long layover simply becomes the 60,000 VND day
            rate.
          </GuideStowCallout>
        </div>

        <div id="itineraries" className="flex flex-col gap-5 scroll-mt-[88px]">
          <GuideH2 id="itineraries">What fits in your window</GuideH2>
          <p>
            Each plan below assumes your bag is stored and you can enter Vietnam. Times are usable hours{" "}
            <em>after</em> the airport process, not the raw layover length.
          </p>

          <GuideH3>Under 4 hours: stay airside</GuideH3>
          <p>
            Immigration and the ride each way eat most of it, with no room for a delay. Use a lounge, eat, rest, and
            catch your flight relaxed instead of sprinting back through passport control.
          </p>
          <GuideH3>4 to 6 hours: one thing</GuideH3>
          <p>
            About 2.5 to 3.5 usable hours. Pick a single close stop: a walk and a swim at My Khe Beach, the Museum
            of Cham Sculpture, or a quick look at the Marble Mountains. Add a local meal and head back. Do not try
            Hoi An.
          </p>
          <GuideH3>6 to 10 hours: the sweet spot</GuideH3>
          <p>
            About 4 to 7 usable hours, enough for a real mini-visit. The classic loop: the Marble Mountains first
            (about 20 minutes away), then My Khe Beach and a mi quang or banh xeo lunch, with Han Market if time
            allows. If your evening falls on a Friday, Saturday, or Sunday around 9pm, end on the Dragon Bridge fire
            show.
          </p>
          <GuideH3>10 hours or overnight: add a second zone</GuideH3>
          <p>
            Now Hoi An&apos;s Ancient Town is reachable (about 45 minutes each way), or you can add the Son Tra
            Peninsula and the Lady Buddha statue to a fuller Da Nang loop without rushing any stop.
          </p>
        </div>

        <div id="stops" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="stops">What is reachable fast, with real hours</GuideH2>
          <GuideFacts
            items={[
              { label: "My Khe Beach", value: "Best early / late afternoon" },
              { label: "Marble Mountains", value: "7:00 AM-5:30 PM, ~12 km" },
              { label: "Han Market", value: "~6am-7pm" },
              { label: "Cham Museum", value: "7:30am-5pm" },
              { label: "Dragon Bridge show", value: "Fri/Sat/Sun 9pm" },
              { label: "Lady Buddha (Son Tra)", value: "~15-20 min from centre" },
            ]}
          />

          <GuideImage
            src="https://upload.wikimedia.org/wikipedia/commons/d/d4/My_Khe_Beach_15.jpg"
            alt="My Khe Beach in Da Nang, the closest worthwhile stop from the airport"
            width={4032}
            height={3024}
            credit="Christophe95"
            creditUrl="https://commons.wikimedia.org/wiki/File:My_Khe_Beach_15.jpg"
            license="CC BY-SA 4.0"
          />

          <p>
            <strong>My Khe Beach</strong> is the closest stop worth making, 10 to 15 minutes from the airport — a
            long, clean strip of sand for a walk or a swim. The <strong>Marble Mountains</strong> are about 20
            minutes out and open 7:00 AM to 5:30 PM (there is more on tickets and the climb in our{" "}
            <Link href="/guides/marble-mountains-guide" className="text-[#E8742C] underline underline-offset-2">
              Marble Mountains guide
            </Link>
            ). <strong>Han Market</strong> downtown is good for a fast browse and street snacks, and the{" "}
            <strong>Museum of Cham Sculpture</strong> is small enough for a shorter window.
          </p>

          <GuideImage
            src="https://upload.wikimedia.org/wikipedia/commons/f/f6/Da_Nang_Dragon_Bridge_in_2015.jpg"
            alt="Dragon Bridge over the Han River in Da Nang, lit at dusk"
            width={3072}
            height={1728}
            credit="Vuong Tri Binh"
            creditUrl="https://commons.wikimedia.org/wiki/File:Da_Nang_Dragon_Bridge_in_2015.jpg"
            license="CC BY-SA 4.0"
          />

          <p>
            The <strong>Dragon Bridge</strong> breathes fire and sprays water on Friday, Saturday, and Sunday nights
            at 9pm, for about 30 minutes, free and with no ticket. It is a fixed schedule, so a weekday-evening
            layover will not catch it. Further out, the <strong>Son Tra Peninsula</strong> and its 67-metre Lady
            Buddha statue are worth the drive if your layover runs long.
          </p>
        </div>

        <div id="eat" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="eat">What to eat on a Da Nang layover</GuideH2>
          <p>
            Da Nang has its own dishes worth timing a stop around. <strong>Mi quang</strong> — yellow noodles with a
            little rich broth, herbs, and a shard of rice cracker — is the local signature.{" "}
            <strong>Banh xeo</strong> (crispy stuffed rice pancakes you roll into rice paper with herbs) and{" "}
            <strong>bun cha ca</strong> (fishcake noodle soup) round out the shortlist. Near My Khe you will find
            plenty of seafood and beachside spots, so a beach stop and lunch fold into one.
          </p>
        </div>

        <div id="airside" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="airside">Cannot leave? The airside plan B</GuideH2>
          <p>
            If your layover is under four hours, or you cannot enter Vietnam, the airport is modern and comfortable.
            The international terminal has lounges — about US$25 for three hours, usually with a buffet, showers, and
            rest areas — and the domestic terminal a cheaper option around US$15. There is little within walking
            distance outside, so for a short connection a lounge is the sensible move.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <GuideH2>Getting back with time to spare</GuideH2>
          <GuideList
            items={[
              "Domestic flight: be back at the airport about 2 hours before departure (2.5 at the 5-8am and 4-7pm peaks)",
              "International flight: about 3 hours before — the international terminal is the busy one",
              "Do not schedule your return ride through Da Nang's rush hours, roughly 7:30-9am and 4:30-6pm",
              "If you stored bags in town, message the shop ahead if you will collect close to closing",
              "Grab is reliable with airport wifi or a local SIM, but allow a few minutes — some drivers skip the airport pickup zone",
            ]}
          />
        </div>

        <div id="faq" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="faq">Questions people ask</GuideH2>
          <GuideFAQ items={FAQ_ITEMS} />
        </div>

        <GuideSources items={SOURCES} />

        <p className="text-[13px] text-[#9CA3AF]">
          Immigration times, transport fares, and airport services vary by day and season, and Vietnam&apos;s entry
          rules change. This guide reflects the situation at the time of writing. Confirm your own visa or exemption
          status, and the arrival-form requirement, on{" "}
          <a href="https://evisa.xuatnhapcanh.gov.vn/trang-chu-ttdt" target="_blank" rel="noopener noreferrer" className="text-[#E8742C] underline">
            Vietnam&apos;s official immigration portal
          </a>{" "}
          before you travel.
        </p>
      </GuideLayout>
    </>
  );
}
