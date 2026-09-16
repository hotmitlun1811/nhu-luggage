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

const pageTitle = "Da Nang to Hue Day Trip: The Hai Van Pass, the Train, and the Imperial City";
const pageDescription =
  "How to do a Da Nang to Hue day trip: the Hai Van Pass vs the tunnel, every way to get there with real prices, the scenic train, what to see in Hue in one day with 2026 ticket costs, and what to do with your bags.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides/da-nang-to-hue-day-trip" },
  openGraph: { title: `${pageTitle} | Stow`, description: pageDescription, url: "https://www.stowdanang.com/guides/da-nang-to-hue-day-trip" },
  twitter: { title: `${pageTitle} | Stow`, description: pageDescription },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Da Nang to Hue Day Trip", path: "/guides/da-nang-to-hue-day-trip" },
]);

const FAQ_ITEMS = [
  {
    q: "How far is Hue from Da Nang?",
    a: "About 95 to 100 km by road, and a 2 to 2.5-hour drive each way. Road guides often cite around 92 km, while the rail line is about 103 km. The distance is short enough for a day trip, but the two-way travel makes it a long day, so start early.",
  },
  {
    q: "Should I take the Hai Van Tunnel or the old pass?",
    a: "The tunnel is fast and dull, about 10 to 15 minutes straight under the mountain. The old Hai Van Pass is the scenic 21 km detour over the top, about 45 to 60 minutes, with the best views of the trip. Motorbikes cannot use the tunnel and must take the pass.",
  },
  {
    q: "How much is the Da Nang to Hue train, and how long is it?",
    a: "The scenic Heritage train is about 180,000 VND on a weekday and 210,000 VND on a weekend, taking roughly 2.5 to 3.5 hours with a 10-minute photo stop at Lang Co. A normal soft seat on a regular train starts around 106,000 VND. A VIP heritage seat costs more.",
  },
  {
    q: "How much does a private car with driver cost?",
    a: "Roughly 1,000,000 to 1,700,000 VND one-way, or from about 2,000,000 VND for a same-day round trip. The direct drive is about 2 hours, but with stops on the old pass the day can stretch to around 9 hours. A private car is the best way to actually stop for the views.",
  },
  {
    q: "What is an easy-rider tour, and what does it cost?",
    a: "A local guide drives you over the Hai Van Pass on a motorbike, or leads while you ride your own, for about 65 US dollars per person, with the bike, driver, and fuel included. These tours run about 6 to 8 hours and are the classic way to do the pass without driving-licence worries.",
  },
  {
    q: "How much is the Hue Imperial City ticket in 2026?",
    a: "The Imperial Citadel is 200,000 VND for adults and 40,000 VND for children aged 7 to 12. A combo ticket covering the Citadel plus three royal tombs is 530,000 VND, valid two days. Bring cash, since the Citadel and tomb gates do not take cards.",
  },
  {
    q: "How much are the royal tombs in Hue?",
    a: "The main tombs, Minh Mang, Tu Duc, and Khai Dinh, are 150,000 VND each for adults and 30,000 VND for children. Dong Khanh is 100,000 VND. If you plan to see three or more sites, the combo ticket with the Citadel is better value.",
  },
  {
    q: "Is Thien Mu Pagoda free?",
    a: "Yes. Thien Mu Pagoda, with its iconic seven-storey tower on the Perfume River, has no admission fee. It pairs well with a short dragon-boat trip, and it is an easy, cheap addition to a one-day Hue plan alongside the Citadel and a tomb.",
  },
  {
    q: "Can I legally drive a motorbike over the Hai Van Pass?",
    a: "Only with a 1968 Vienna Convention international driving permit plus your home licence, or a Vietnamese licence. A 1949 Geneva permit is not accepted. There are police checks on the pass, and riding without a valid licence can void your travel and medical insurance.",
  },
  {
    q: "Is a Hue day trip enough, or should I stay overnight?",
    a: "One day covers the Citadel, one or two tombs, and Thien Mu, but it is a long day with 4 to 5 hours of travel. An overnight adds more tombs, the night market, DMZ side trips, and a slower pace. If Hue is a highlight for you, stay the night.",
  },
];

const SOURCES = [
  { label: "BestPrice Travel: Da Nang to Hue", url: "https://www.bestpricetravel.com/travel-guide/da-nang-to-hue-2729.html", note: "the distance, per-mode costs and times, train fares, and the tunnel note" },
  { label: "Culture Pham Travel: Hue entrance fees", url: "https://culturephamtravel.com/hue-entrance-fee/", note: "the detailed 2026 ticket table for the Citadel, tombs, and combos, and the cash-only note" },
  { label: "Hoi An Day Trip: Da Nang to Hue tourist train", url: "https://hoiandaytrip.com/da-nang-to-hue-tourist-train/", note: "the Heritage train schedule, duration, fares, and the Lang Co photo stop" },
  { label: "Banyan Tree Lang Co: Hai Van Pass", url: "https://www.banyantree.com/vietnam/lang-co/hai-van-pass", note: "the pass overview and the fact that motorbikes must take the pass, not the tunnel" },
  { label: "Vietnam Coracle: Hai Van, the Pass of Ocean Mist", url: "https://www.vietnamcoracle.com/hai-van-the-pass-of-ocean-mist-5/", note: "the 2005 tunnel, why the old road is now mostly motorbikes, and the summit fog" },
  { label: "Local Vietnam: Lap An Lagoon", url: "https://localvietnam.com/hue/lap-an-lagoon/", note: "the Lap An lagoon stop, oyster farms, and reflections along the drive" },
  { label: "U.S. Embassy Vietnam: driving in Vietnam", url: "https://vn.usembassy.gov/driving-in-vietnam/", note: "the official position on the 1968 international driving permit requirement" },
  { label: "The Abroad Guide: Hai Van Pass easy-rider tour", url: "https://theabroadguide.com/hai-van-pass-motorbike-tour-with-easy-rider/", note: "the easy-rider tour cost, duration, and format" },
];

export default async function DaNangToHueDayTrip() {
  const dict = await getDictionary("en");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideFaqJsonLd(FAQ_ITEMS)) }} />
      <GuideLayout
        dict={dict}
        currentPath="/guides/da-nang-to-hue-day-trip"
        eyebrow="Day Trips"
        title="Da Nang to Hue Day Trip"
        subhead="The Hai Van Pass or the tunnel, every way to get there with real prices, the scenic train, and one perfect day in the old imperial capital."
        readingTime="12 min read"
        toc={[
          { id: "how-far", label: "How far, and tunnel vs pass" },
          { id: "how-to-get", label: "Every way to get there" },
          { id: "hai-van", label: "The Hai Van Pass" },
          { id: "stops", label: "Stops along the way" },
          { id: "train", label: "The scenic train" },
          { id: "what-to-see", label: "One day in Hue" },
          { id: "day-or-overnight", label: "Day trip or overnight?" },
          { id: "driving", label: "The licence caveat" },
          { id: "bags", label: "What to do with your bags" },
          { id: "faq", label: "Questions people ask" },
        ]}
        related={[
          { title: "Da Nang to Hoi An Day Trip", href: "/guides/da-nang-to-hoi-an-day-trip", blurb: "The other classic day trip, in the opposite direction." },
          { title: "Getting Around Da Nang", href: "/guides/getting-around-da-nang", blurb: "Grab, bikes, and the driving-licence law, before you rent anything." },
        ]}
      >
        <GuideLead>
          Hue is the old imperial capital, a UNESCO city of citadels, royal tombs, and river pagodas, and the road there
          is half the reason to go. Between Da Nang and Hue rises the Hai Van Pass, a coastal mountain road that a famous
          TV crew once called one of the best in the world. This guide covers the real choice at the mountain, every way
          to make the trip with current prices, and how to see Hue properly in a single day.
        </GuideLead>

        <GuideTLDR>
          Hue sits about <strong>95 to 100 km north of Da Nang</strong>, a 2 to 2.5-hour drive each way. At the mountain
          you choose: the fast <strong>Hai Van Tunnel</strong> (about 10 to 15 minutes) or the scenic{" "}
          <strong>old Hai Van Pass</strong> (about 45 to 60 minutes over the top). Best ways to go: the{" "}
          <strong>scenic train</strong> (from ~180,000 VND, easiest views), a <strong>private car</strong> (~1,000,000
          to 2,000,000 VND, best for pass stops), or an <strong>easy-rider motorbike</strong> (from about $65). In Hue,
          one day covers the <strong>Imperial Citadel</strong> (200,000 VND), a royal tomb or two, and free Thien Mu
          Pagoda. It works, but it is a long day.
        </GuideTLDR>

        <GuideImage
          src="https://upload.wikimedia.org/wikipedia/commons/b/be/View_from_Hai_Van_pass_%285679784228%29.jpg"
          alt="The sweeping coastal view of the bay and mountains from the Hai Van Pass between Da Nang and Hue"
          width={3779}
          height={2519}
          credit="Andrea Schaffer"
          creditUrl="https://commons.wikimedia.org/wiki/File:View_from_Hai_Van_pass_(5679784228).jpg"
          license="CC BY 2.0"
        />

        <GuideFacts
          items={[
            { label: "Distance", value: "~95 - 100 km" },
            { label: "Drive time", value: "2 - 2.5 hrs each way" },
            { label: "Tunnel", value: "~10 - 15 min" },
            { label: "Old pass", value: "~45 - 60 min over the top" },
            { label: "Citadel ticket", value: "200,000 VND" },
            { label: "Scenic train", value: "from ~180,000 VND" },
          ]}
        />

        <div id="how-far" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="how-far">How far is Hue, and the tunnel vs the pass</GuideH2>
          <p>
            Hue is about 95 to 100 km north of Da Nang. Road guides usually cite around 92 km, and the rail line is
            about 103 km, so you will see both figures. Either way, plan on a 2 to 2.5-hour drive each way. The distance
            is easy; it is the there-and-back that makes a day trip long.
          </p>
          <p>
            The real decision comes at the mountain in the middle. The Hai Van Tunnel is 6.2 km and runs straight under
            it, cutting the crossing to about 10 to 15 minutes, but you see nothing. The old Hai Van Pass is the 21 km
            road over the top, about 45 to 60 minutes, and it is the scenic point of the whole trip. One key rule:
            motorbikes are not allowed in the tunnel, so anyone on two wheels rides the pass.
          </p>
        </div>

        <div id="how-to-get" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="how-to-get">Every way to get from Da Nang to Hue, compared</GuideH2>
          <p>
            There is no single best option, only the best one for you. Here is the honest comparison. Fares vary with
            season, operator, and traffic, so treat them as ranges.
          </p>
          <GuideTable
            columns={["Cost (one-way, approx)", "Time", "Best for"]}
            rows={[
              { label: "Private car + driver", values: ["1,000,000 - 2,000,000 VND", "~2 hrs; up to ~9 with stops", "Taking the old pass and stopping for photos"] },
              { label: "Scenic Heritage train", values: ["180,000 - 210,000 VND", "~2.5 - 3.5 hrs", "Best views for least effort, non-drivers"] },
              { label: "Regular train (soft seat)", values: ["from ~106,000 VND", "~2.5 - 3.8 hrs", "Budget rail, flexible departures"] },
              { label: "Easy-rider motorbike", values: ["from ~$65 / person", "6 - 8 hr tour", "Adventure over the pass, no licence worry"] },
              { label: "Organized group day tour", values: ["Varies (lunch + guide)", "Full day, ~10 - 12 hrs", "Hassle-free, guided, hotel pickup"] },
              { label: "Limousine van / bus", values: ["bus ~70,000; van from 200,000", "2 - 3 hrs", "Cheapest door-to-door, no driving"] },
            ]}
          />
          <p>
            In short: take the train for the easiest beautiful ride, a private car if you want to stop along the pass, an
            easy-rider for the adventure, or a group tour if you would rather someone else handle everything.
          </p>
        </div>

        <div id="hai-van" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="hai-van">The Hai Van Pass, and why it is the point of the trip</GuideH2>
          <p>
            The Hai Van Pass is a 21 km coastal mountain road with sweeping views of Lang Co Bay to the north and Da
            Nang to the south. Its name means the Pass of Ocean Mist, and the summit often sits in cloud. At the top you
            will find the old Hai Van Quan gate and a scatter of French and American war-era bunkers, plus viewpoints
            where the lagoon, the beach, and the sea line up in one frame.
          </p>
          <p>
            Since the tunnel opened in 2005, almost all cars and trucks go under the mountain, which has left the old
            road largely to motorbikes and the occasional tour van. That is good news for the view. A famous British car
            show filmed here and called it one of the best coast roads in the world, and the spot where they shot the
            sunset is now known as the Top Gear viewpoint.
          </p>
        </div>

        <div id="stops" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="stops">Stops along the way: Lang Co and Lap An</GuideH2>
          <p>
            The stops are where a private car or an easy-rider beats the train, which cannot pull over at will. Lang Co
            is a long, golden beach backed by palms on the Hue side of the pass, an easy place to stretch your legs. Just
            beyond it, Lap An Lagoon is a shallow, 800-hectare brackish lake famous for its mirror-like reflections of
            the mountains and its oyster farms, best in still, clear weather.
          </p>
          <p>
            If you have a full day and a driver, Elephant Springs, a set of cool forest swimming pools about 10 to 15
            minutes inland from the lagoon, makes a refreshing detour. These stops turn a transfer into an experience,
            which is exactly why so many people pick the road over the tunnel.
          </p>
        </div>

        <div id="train" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="train">The scenic train: Da Nang to Hue by rail</GuideH2>
          <p>
            The rail journey is one of the most beautiful in Vietnam. The line hugs the coast and climbs over the Hai
            Van Pass, giving long ocean views you cannot get from the tunnel road. The dedicated Heritage tourist train
            runs a morning and an afternoon service each way, takes about 2.5 to 3.5 hours, and includes a 10-minute
            stop at Lang Co station for photos.
          </p>
          <p>
            A Heritage standard seat is about 180,000 VND on a weekday and 210,000 VND on a weekend, with pricier VIP
            seats available. If those are sold out, a normal soft seat on a regular Reunification Express train starts
            around 106,000 VND and still crosses the same scenery. The trade-off is that the train follows its own
            schedule, so you cannot stop for the lagoon or the pass viewpoints.
          </p>
          <GuideCallout label="Which side to sit">
            Heading north from Da Nang to Hue, the sea is on your right for the best coastal views, so aim for a
            right-hand window seat if you can pick. Book the Heritage service ahead in busy months, since it sells out.
          </GuideCallout>
        </div>

        <div id="what-to-see" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="what-to-see">What to see in Hue in one day</GuideH2>
          <p>
            Hue rewards focus. In a single day, prioritize the Imperial Citadel, add one royal tomb, and finish at the
            free Thien Mu Pagoda. Here are the main sites with their 2026 adult fees. Bring cash, since the Citadel and
            tomb gates do not take cards.
          </p>
          <GuideTable
            columns={["Fee 2026 (adult)", "Time", "Note"]}
            rows={[
              { label: "Imperial Citadel (Dai Noi)", values: ["200,000 VND", "2 - 3 hrs", "The must-do; Ngo Mon gate, Thai Hoa Palace, Forbidden Purple City"] },
              { label: "Khai Dinh Tomb", values: ["150,000 VND", "1 hr", "The most ornate, with a dazzling mosaic interior"] },
              { label: "Minh Mang Tomb", values: ["150,000 VND", "1 - 1.5 hrs", "Grand and symmetrical, in a garden setting"] },
              { label: "Tu Duc Tomb", values: ["150,000 VND", "1 - 1.5 hrs", "Poetic and lakeside, the largest tomb complex"] },
              { label: "Thien Mu Pagoda", values: ["Free", "30 - 45 min", "The iconic seven-storey tower on the Perfume River"] },
              { label: "Combo: Citadel + 3 tombs", values: ["530,000 VND", "Full day", "Best value if you will see three or more sites, valid 2 days"] },
            ]}
          />
          <GuideImage
            src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Meridian_Gate_%28Citadel_of_Hu%E1%BA%BF%29.jpg"
            alt="The Ngo Mon (Meridian) Gate, the main entrance to the Imperial Citadel in Hue"
            width={4032}
            height={3024}
            credit="Christophe95"
            creditUrl="https://commons.wikimedia.org/wiki/File:Meridian_Gate_(Citadel_of_Hu%E1%BA%BF).jpg"
            license="CC BY-SA 4.0"
          />
          <p>
            A realistic one-day pick is the Citadel, plus Khai Dinh tomb, plus Thien Mu, which keeps entrance fees to
            about 350,000 VND and leaves time for the drive. Add a short dragon-boat trip on the Perfume River, from
            about 100,000 to 200,000 VND per person on a shared boat, if you want to link Thien Mu and the tombs by
            water.
          </p>
        </div>

        <div id="day-or-overnight" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="day-or-overnight">Is a day trip enough, or should you stay overnight?</GuideH2>
          <p>
            A day trip genuinely works for the headline sights: the Citadel, one or two tombs, and Thien Mu. But be
            honest about the clock. With 2 to 2.5 hours of travel each way, plus a couple of hours in the Citadel, the
            day fills fast, and you will be moving the whole time.
          </p>
          <p>
            An overnight is the calmer choice if Hue is a highlight for you. It opens up more tombs, the riverside night
            market, DMZ side trips north of the city, and simply a slower pace. It also suits anyone relocating from Da
            Nang to Hue who wants to see the pass and the city properly, rather than just transiting through the tunnel.
            To fit either version into a bigger plan, see our{" "}
            <Link href="/guides/da-nang-itinerary" className="text-[#E8742C] underline underline-offset-2">
              Da Nang itinerary
            </Link>
            .
          </p>
        </div>

        <div id="driving" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="driving">Driving yourself over the pass: the licence caveat</GuideH2>
          <p>
            If you plan to ride the pass on your own bike, know the rules first. To legally ride a motorbike over 50cc,
            a foreigner needs a 1968 Vienna Convention international driving permit carried with a matching home licence,
            or a Vietnamese licence. A 1949 Geneva Convention permit is not accepted, and police treat it as no licence.
            There are checkpoints on the Hai Van Pass where riders are checked.
          </p>
          <p>
            This is not just a fine risk. Riding without a valid licence typically voids your travel and health
            insurance, so an insurer can refuse medical and evacuation claims that can run into tens of thousands of
            dollars. Add the frequent summit fog and wet surfaces, and the sensible call for most visitors is an
            easy-rider or a private car. Our{" "}
            <Link href="/guides/getting-around-da-nang" className="text-[#E8742C] underline underline-offset-2">
              getting around Da Nang guide
            </Link>{" "}
            explains the licence law in full.
          </p>
        </div>

        <div id="bags" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="bags">What to do with your luggage</GuideH2>
          <p>
            A Hue day trip is, by nature, an early start and a late return, and a lot of people doing it are mid-move.
            Nobody wants a full suitcase on the back of a motorbike over the Hai Van Pass, wedged into a packed
            heritage-train seat, or riding around all day in a car. The fix is to travel light and leave the heavy bags
            behind.
          </p>

          <GuideStowCallout
            eyebrow="Travel light over the pass"
            heading="Leave the big bags in Da Nang and cross with just a daypack."
            facts={[
              { label: "Near the airport", value: "~10 min" },
              { label: "By the day", value: "60,000 VND (up to 24h)" },
              { label: "Open", value: "7am - 10pm daily" },
            ]}
          >
            Drop your suitcases at Stow, at 55 Ba Bang Nhan in Ngu Hanh Son, about ten minutes from the airport and open
            7am to 10pm, from 15,000 VND an hour or 60,000 VND a day. Cross the pass with a daypack, spend the day in
            Hue, and collect the bags on the way back, in time for an evening flight. It is the same move whether you are
            doing Hue as a loop or a{" "}
            <Link href="/guides/da-nang-to-hoi-an-day-trip" className="text-[#E8742C] underline underline-offset-2">
              Hoi An day trip
            </Link>
            , or relocating and want to see the city properly before you continue.
          </GuideStowCallout>
        </div>

        <div id="faq" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="faq">Questions people ask</GuideH2>
          <GuideFAQ items={FAQ_ITEMS} />
        </div>

        <GuideSources items={SOURCES} />

        <p className="text-[13px] text-[#9CA3AF]">
          Fares, train schedules, tour prices, and Hue&apos;s ticket fees change, and several figures here come from
          operator and travel-guide listings. This guide reflects current prices at the time of writing; confirm train
          times on a rail booking site and ticket prices on the official Hue World Heritage portal before you go.
        </p>
      </GuideLayout>
    </>
  );
}
