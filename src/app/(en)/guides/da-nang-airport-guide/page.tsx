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
  GuideStowCallout,
  GuideFAQ,
  GuideImage,
  GuideSources,
} from "@/components/guides/GuideElements";
import { breadcrumbJsonLd, guideFaqJsonLd } from "@/lib/structured-data";
import { getDictionary } from "@/content/dictionary";

const pageTitle = "Da Nang Airport (DAD) Guide: Arrivals, SIM, Getting to the City";
const pageDescription =
  "A practical Da Nang Airport (DAD) guide: the two terminals, arrival steps, buying a SIM or eSIM, real Grab and taxi fares to the city, My Khe beach and Hoi An, airport lounges, and the truth about left luggage.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides/da-nang-airport-guide" },
  openGraph: { title: `${pageTitle} | Stow`, description: pageDescription, url: "https://www.stowdanang.com/guides/da-nang-airport-guide" },
  twitter: { title: `${pageTitle} | Stow`, description: pageDescription },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Da Nang Airport Guide", path: "/guides/da-nang-airport-guide" },
]);

const FAQ_ITEMS = [
  {
    q: "How far is Da Nang airport from the city center?",
    a: "About 2 to 3 km, roughly a 10-minute drive. It is one of the shortest airport-to-downtown hops in Vietnam, so wherever you are staying, you are not far from the plane.",
  },
  {
    q: "How much is a Grab or taxi from Da Nang airport to the city?",
    a: "A Grab into the city centre starts around 80,000 VND (about US$3). Expect a surge of 1.5x to 2x in rain or during the 5pm to 7pm peak. Pin your pickup to the taxi rank near Door 3, because a pin dropped inside the terminal can't be reached by drivers.",
  },
  {
    q: "Can I buy a SIM card at Da Nang airport?",
    a: "Yes. Viettel and Vinaphone have staffed booths in the T2 arrivals hall. You pay a small premium over city shops (roughly US$3 to US$5), but you walk out connected in under 10 minutes with English-speaking staff. Bring your passport; all SIMs must be registered to it.",
  },
  {
    q: "Should I buy an eSIM or a physical SIM for Da Nang?",
    a: "If your phone supports eSIM, buy one before you fly (Airalo, Saily, or Holafly) so it activates the moment you land and you skip the queue. A physical SIM from the arrivals booth is the easy fallback if your phone isn't eSIM-capable.",
  },
  {
    q: "How do I get from Da Nang airport to My Khe beach?",
    a: "It is about 6 km and 15 minutes. A GrabCar is roughly 90,000 to 150,000 VND (about US$4 to US$6), and a metered taxi is a little more.",
  },
  {
    q: "How do I get from Da Nang airport to Hoi An?",
    a: "It is about 30 km. A Grab car is around 250,000 to 350,000 VND and takes 30 to 45 minutes; a private transfer or hotel shuttle costs more but meets you at arrivals. The public LK02 bus is cheapest (about 35,000 VND) but does not enter the airport and takes 60 to 90 minutes, so it suits light-luggage budget travelers.",
  },
  {
    q: "Is there luggage storage at Da Nang airport?",
    a: "There is no official airport left-luggage counter. Storage is run by third-party desks near the terminals, at roughly 60,000 to 100,000 VND per bag per day, open only about 9am to 11pm with nothing overnight. Early arrivals and long layovers often drop bags at a shop in town instead.",
  },
  {
    q: "Does Da Nang airport have lounges and showers?",
    a: "Yes, for departing passengers past security in T2: the CIP Orchid Lounge (showers, day beds, massage chairs), the Vietnam Airlines Lotus Lounge, and the pay-in Vanda Lounge (about US$29 for three hours). There is no arrivals lounge, so you can't wait out an early hotel check-in airside.",
  },
  {
    q: "How many terminals does Da Nang airport have?",
    a: "Two: T1 for domestic flights and T2 for international, connected by a short covered walkway. T2 opened in 2017 and holds a 5-star Skytrax rating.",
  },
  {
    q: "Do I need to book an airport transfer to Hoi An in advance?",
    a: "Not usually. Grab and metered taxis are on demand at the rank. Pre-booking a private transfer or hotel shuttle only helps if you want a named driver waiting or you land very late.",
  },
];

const SOURCES = [
  { label: "Wikipedia: Da Nang International Airport", url: "https://en.wikipedia.org/wiki/Da_Nang_International_Airport", note: "terminal history, the 2017 T2 opening, and passenger figures" },
  { label: "Vietnam Airlines: Da Nang airport to the city", url: "https://www.vietnamairlines.com/ch/en/plan-book/travel/travel-guide/da-nang-airport-to-city", note: "the airport-to-city distance and time" },
  { label: "VietnameSIM: Da Nang SIM card guide", url: "https://vietnamesim.com/vietnam-sim-card-da-nang/", note: "the airport SIM booths, carrier coverage, and the airport premium" },
  { label: "Da Nang Hotel Guide: Grab guide", url: "https://www.dananghotelguide.com/da-nang-grab-guide.html", note: "Grab surge times and the Door 3 pickup pin" },
  { label: "hoianitinerary.com: airport to Hoi An", url: "https://hoianitinerary.com/hoian-airport-guide", note: "2026 airport-to-Hoi-An fares and times by mode" },
  { label: "hoianit.com: Da Nang to Hoi An by bus", url: "https://hoianit.com/da-nang-to-hoi-an-by-public-bus/", note: "the LK02 bus fares and the fact it does not enter the airport" },
  { label: "hoiandaytrip.com: Da Nang airport luggage storage", url: "https://hoiandaytrip.com/da-nang-airport-luggage-storage/", note: "the third-party storage desk hours and per-bag pricing" },
  { label: "fasttrack-vietnam.com: Da Nang airport lounges", url: "https://fasttrack-vietnam.com/blog/danang-airport-lounges-guide/", note: "the lounge list, Skytrax rating, and airside amenities" },
];

export default async function DaNangAirportGuide() {
  const dict = await getDictionary("en");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideFaqJsonLd(FAQ_ITEMS)) }} />
      <GuideLayout
        dict={dict}
        currentPath="/guides/da-nang-airport-guide"
        eyebrow="Getting There"
        title="Da Nang Airport (DAD) Guide"
        subhead="Everything for the moment you land: the terminals, getting online, real fares into the city, to My Khe and to Hoi An, and where your bags go before check-in."
        readingTime="11 min read"
        toc={[
          { id: "at-a-glance", label: "DAD at a glance" },
          { id: "arrival", label: "Landing: the arrival steps" },
          { id: "sim", label: "Getting online: SIM vs eSIM" },
          { id: "to-city", label: "To the city center" },
          { id: "to-my-khe", label: "To My Khe beach" },
          { id: "to-hoi-an", label: "To Hoi An" },
          { id: "facilities", label: "Facilities and lounges" },
          { id: "left-luggage", label: "Left luggage: the reality" },
          { id: "tips", label: "First-timer tips" },
          { id: "faq", label: "Questions people ask" },
        ]}
        related={[
          { title: "Da Nang Layover Guide", href: "/guides/da-nang-layover-guide", blurb: "Whether you can leave the airport on a layover, and what fits in your window." },
          { title: "Getting Around Da Nang", href: "/guides/getting-around-da-nang", blurb: "Grab, motorbikes, taxis and the real fares once you're in the city." },
        ]}
      >
        <GuideLead>
          Da Nang International Airport is one of the easiest arrivals in Vietnam: small, modern, and unusually close
          to the city. This guide covers the practical stuff for the hour after you land, getting online, getting
          into town, getting to Hoi An, and the one thing the airport quietly does not offer.
        </GuideLead>

        <GuideTLDR>
          Da Nang Airport (code <strong>DAD</strong>) sits only about <strong>2 to 3 km from the city centre</strong>,
          so a Grab into town is roughly 10 minutes from around <strong>80,000 VND</strong>. There are two connected
          terminals, T1 domestic and T2 international. Get online with an <strong>eSIM</strong> installed before you
          fly, or a Viettel or Vinaphone <strong>SIM</strong> from the arrivals booths. My Khe beach is about 6 km
          (15 minutes); Hoi An is about 30 km (30 to 45 minutes by car, cheapest on the LK02 bus, which does not
          enter the airport). The one gap: DAD has <strong>no official left-luggage counter</strong>, so early
          arrivals and long layovers usually drop bags at a shop in town.
        </GuideTLDR>

        <GuideImage
          src="https://upload.wikimedia.org/wikipedia/commons/4/48/Da_Nang_International_Airport%2C_Vietnam.jpg"
          alt="Da Nang International Airport (DAD), central Vietnam's main gateway"
          width={5184}
          height={3456}
          credit="Gary Todd"
          creditUrl="https://commons.wikimedia.org/wiki/File:Da_Nang_International_Airport,_Vietnam.jpg"
          license="CC0"
        />

        <GuideFacts
          items={[
            { label: "Code", value: "DAD" },
            { label: "To city centre", value: "~2-3 km, ~10 min" },
            { label: "Grab to town", value: "from ~80,000 VND" },
            { label: "To My Khe beach", value: "~6 km, ~15 min" },
            { label: "To Hoi An", value: "~30 km, 30-45 min" },
            { label: "Terminals", value: "T1 domestic, T2 international" },
          ]}
        />

        <div id="at-a-glance" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="at-a-glance">Da Nang Airport at a glance</GuideH2>
          <p>
            DAD is central Vietnam&apos;s main airport, serving Da Nang, Hoi An, Hue, and the wider region. It has
            two terminals, <strong>T1 for domestic</strong> flights and <strong>T2 for international</strong>,
            within an easy covered walk of each other. The T2 international terminal opened in 2017 and holds a
            5-star Skytrax rating; it has grown far past its original design, handling nearly 7 million international
            passengers a year, with an expansion underway.
          </p>
          <p>
            The best thing about it is the location. The terminals sit only about 2 to 3 km from the city centre,
            one of the shortest airport-to-downtown distances of any big airport in Asia, so getting into town is
            quick and cheap no matter where you are staying.
          </p>
        </div>

        <div id="arrival" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="arrival">Landing at DAD: the arrival steps</GuideH2>
          <p>
            The order on arrival at T2 is simple: disembark, clear passport control, collect your bags, pass
            customs, and step out into the landside arrivals hall, where the SIM booths, ATMs, and taxi rank are.
            The airport is modern and rarely as crowded as Hanoi or Ho Chi Minh City, so it usually moves quickly.
          </p>
          <p>
            One thing to sort before you fly: whether you can actually leave the airport depends on your visa or
            visa-free status, and the e-visa has to be approved in advance. We cover the full entry rule (who can
            leave, and the visa-free list) in the{" "}
            <Link href="/guides/da-nang-layover-guide" className="text-[#E8742C] underline underline-offset-2">
              Da Nang layover guide
            </Link>
            , so it is not repeated here.
          </p>
        </div>

        <div id="sim" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="sim">Getting online: SIM card vs eSIM</GuideH2>
          <p>
            You will want data before you leave the hall, since Grab and maps need it. Two easy options:
          </p>
          <GuideTable
            columns={["Where", "Price", "Notes"]}
            rows={[
              { label: "eSIM (before you fly)", values: ["Online", "from ~US$4-5", "Airalo/Saily/Holafly; activates on landing, no queue"] },
              { label: "Viettel SIM", values: ["T2 arrivals booth", "~150,000-300,000 VND", "Widest national coverage; passport required"] },
              { label: "Vinaphone SIM", values: ["T2 arrivals booth", "~150,000-300,000 VND", "Strong in the city and along the coast"] },
              { label: "Mobifone SIM", values: ["Mostly city shops", "~90,000-250,000 VND", "Budget pick; weaker in the mountains (Ba Na)"] },
            ]}
          />
          <p className="text-[13px] text-[#9CA3AF]">
            Airport SIM prices carry a small premium over city shops (roughly US$3 to US$5), and plan prices move
            with promotions, so treat these as approximate ranges.
          </p>
        </div>

        <div id="to-city" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="to-city">Da Nang airport to the city center</GuideH2>
          <p>
            It is about 3 km and a 10-minute ride. A <strong>Grab</strong> starts around 80,000 VND; metered taxis
            (Mai Linh, Vinasun) wait at the rank, so use the meter and ignore anyone quoting an inflated flat fare
            inside the hall. Two tips that save money and hassle: in rain or the 5pm to 7pm peak, Grab surges 1.5x
            to 2x, and waiting about 15 minutes usually settles it; and pin your Grab pickup to the taxi rank near{" "}
            <strong>Door 3</strong>, because a pin dropped inside the terminal can&apos;t be reached by drivers. For
            the full picture on Grab, taxis, and motorbikes once you&apos;re in town, see{" "}
            <Link href="/guides/getting-around-da-nang" className="text-[#E8742C] underline underline-offset-2">
              Getting Around Da Nang
            </Link>
            .
          </p>
        </div>

        <div id="to-my-khe" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="to-my-khe">Da Nang airport to My Khe beach</GuideH2>
          <p>
            The My Khe and An Thuong beach strip, where most visitors stay, is about 6 km and 15 minutes from the
            airport. A GrabCar runs about 90,000 to 150,000 VND (US$4 to US$6), and a metered taxi is a little more.
            If you land before the 2pm hotel check-in, this is exactly the moment to leave your bags somewhere and
            hit the beach first (more on that below).
          </p>
        </div>

        <div id="to-hoi-an" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="to-hoi-an">Da Nang airport to Hoi An</GuideH2>
          <p>
            Hoi An is about 30 km south, 30 to 45 minutes by car. Here is the quick comparison; the full breakdown
            is in our{" "}
            <Link href="/guides/da-nang-to-hoi-an-day-trip" className="text-[#E8742C] underline underline-offset-2">
              Da Nang to Hoi An guide
            </Link>
            .
          </p>
          <GuideTable
            columns={["Cost", "Time", "Best for"]}
            rows={[
              { label: "Grab car", values: ["~250,000-350,000 VND", "30-45 min", "Value and comfort, on demand"] },
              { label: "Private transfer", values: ["~350,000-500,000 VND", "30-45 min", "A named driver meeting you"] },
              { label: "Hotel shuttle", values: ["Free to ~300,000 VND", "30-45 min", "Booked with your stay"] },
              { label: "LK02 public bus", values: ["~8,000-35,000 VND", "60-90 min", "Budget, light luggage (does not enter the airport)"] },
            ]}
          />
          <p className="text-[13px] text-[#9CA3AF]">
            The public bus is now the LK02 (it replaced the old &ldquo;route 01&rdquo;), and it does not come into
            the airport, so you walk to a nearby road stop or take a short Grab to reach it.
          </p>
        </div>

        <div id="facilities" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="facilities">Facilities and lounges</GuideH2>
          <p>
            Most of the comfort at DAD is airside, for <strong>departing</strong> passengers past security in T2:
            the CIP Orchid Lounge (showers, day beds, massage chairs), the Vietnam Airlines Lotus Lounge, and the
            pay-in Vanda Lounge (about US$29 for three hours). Both terminals have massage chairs, and T2 has
            charging workstations near the gates.
          </p>
          <p>
            The catch for arrivals: there is no arrivals lounge. Once you clear immigration you are in a landside
            hall with ATMs, SIM booths, cafes, and the taxi rank, but nowhere to wait out an early hotel check-in.
            That is what makes the luggage question below matter.
          </p>
        </div>

        <div id="left-luggage" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="left-luggage">Left luggage at Da Nang airport: the reality</GuideH2>
          <p>
            DAD has <strong>no official left-luggage counter</strong>. Storage is run by third-party desks near the
            terminals, at roughly 60,000 to 100,000 VND per bag per day, open only about 9am to 11pm with nothing
            overnight. That is awkward for three common situations: you land before your hotel check-in, you have a
            long layover, or you are about to jump on the Hoi An bus and do not want a big case on it.
          </p>

          <GuideStowCallout
            heading="No airport counter overnight, and it adds up by the bag."
            facts={[
              { label: "From the airport", value: "~10 min" },
              { label: "By the hour", value: "15,000 VND/hr" },
              { label: "Full day", value: "60,000 VND (up to 24h)" },
            ]}
          >
            A full day at the airport desk runs about 78,000 to 100,000 VND per bag and closes for the night. Stow
            is a staffed luggage-storage shop at 55 Ba Bang Nhan in Ngu Hanh Son, about ten minutes from the
            terminal and on the route most people take toward My Khe or the Hoi An bus, at 15,000 VND an hour or
            60,000 VND a day, open 7am to 10pm. If you land early, have a long layover, or are heading to Hoi An
            light, drop the bags in town and travel free. For a full layover plan, see the{" "}
            <Link href="/guides/da-nang-layover-guide" className="text-[#E8742C] underline underline-offset-2">
              layover guide
            </Link>
            .
          </GuideStowCallout>
        </div>

        <div id="tips" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="tips">First-timer tips at DAD</GuideH2>
          <GuideList
            items={[
              "Use the metered taxi rank or Grab pinned to Door 3; ignore drivers who approach you in the hall with a flat fare.",
              "Have an eSIM ready or buy a SIM before you leave arrivals, since Grab and maps need data.",
              "Carry small VND notes; not every taxi or booth makes easy change for large bills.",
              "If your check-in is hours away or you are connecting, decide where your bag goes before you leave the airport.",
              "In rain or the evening peak, wait out the Grab surge for 15 minutes rather than paying 2x.",
            ]}
          />
        </div>

        <div id="faq" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="faq">Questions people ask</GuideH2>
          <GuideFAQ items={FAQ_ITEMS} />
        </div>

        <GuideSources items={SOURCES} />

        <p className="text-[13px] text-[#9CA3AF]">
          Fares, SIM prices, lounge rates, and storage details change, and US dollar figures are approximate. This
          guide reflects the situation at the time of writing; check anything you are planning tightly around before
          you fly.
        </p>
      </GuideLayout>
    </>
  );
}
