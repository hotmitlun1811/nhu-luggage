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

const pageTitle = "Where to Stay in Da Nang: Best Areas & Neighborhoods";
const pageDescription =
  "Where to stay in Da Nang, area by area: An Thuong and My Khe for the beach, Hai Chau for the city, Son Tra for quiet luxury, and which neighborhood suits first-timers, families, nomads and nightlife, plus what a hotel really costs.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides/where-to-stay-in-da-nang" },
  openGraph: { title: `${pageTitle} | Stow`, description: pageDescription, url: "https://www.stowdanang.com/guides/where-to-stay-in-da-nang" },
  twitter: { title: `${pageTitle} | Stow`, description: pageDescription },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Where to Stay in Da Nang", path: "/guides/where-to-stay-in-da-nang" },
]);

const FAQ_ITEMS = [
  {
    q: "What is the best area to stay in Da Nang for first-timers?",
    a: "My An and An Thuong, the grid just behind My Khe Beach. You get the sand a short walk away, a dense, walkable mix of cafes, bars and restaurants at every price point, and cheap Grab rides to everything else. It is the best all-round balance of beach, food, walkability, and price for a first trip.",
  },
  {
    q: "Is it nicer to stay in Da Nang or Hoi An?",
    a: "For most first trips, base in Da Nang for the beach-city mix and convenience, and day-trip to Hoi An (about 45 minutes south). Choose Hoi An as your base only if the lantern-lit Ancient Town matters more to you than the beach and city life, since Hoi An's old town sits several km inland from any beach.",
  },
  {
    q: "Which area is best for families with kids?",
    a: "The My Khe beachfront (family suites, pools, a flat walk to restaurants) or the Non Nuoc and Xuan Thieu resort clusters (Hyatt Regency, the Mikazuki water park). Son Tra suits families who want a quiet, upscale escape away from the busy strips.",
  },
  {
    q: "Where should backpackers and digital nomads stay?",
    a: "An Thuong / My An. Hostel dorm beds start around US$5 to US$10, and the area is packed with coworking spaces, cafes with reliable wifi, gyms, and a walkable social scene. The trade-off is noise, so pick a room off the main bar streets if you are a light sleeper.",
  },
  {
    q: "Where is the nightlife in Da Nang?",
    a: "Three zones: An Thuong / My An for bars and live music behind the beach, the Bach Dang riverside for rooftop bars and the Dragon Bridge, and the My Khe beachfront for beach bars. The Dragon Bridge breathes fire on Friday, Saturday, and Sunday nights at 9pm.",
  },
  {
    q: "How far is My Khe Beach from Da Nang airport?",
    a: "About 6 km, roughly 15 to 30 minutes depending on traffic. The airport is only about 3 km from the city centre, so wherever you stay, you are not far from the plane.",
  },
  {
    q: "How much does a hotel in Da Nang cost per night?",
    a: "It varies a lot by season. Budget rooms are roughly US$15 to US$25, mid-range 3 to 4-star hotels commonly US$35 to US$70 (aggregated booking averages run lower, nearer US$20 to US$40), and beachfront 5-star resorts from about US$120 to US$200 in peak season, with flagship resorts far higher. Treat these as shoulder-versus-peak ranges, not fixed prices.",
  },
  {
    q: "Should I stay near the Dragon Bridge?",
    a: "Stay in Hai Chau near the Han River if you want city life, markets, and the weekend fire show. Expect crowds on show nights, and book a river-view room three to four weeks ahead in peak season. If you want to wake up on the sand instead, stay on the My Khe side.",
  },
  {
    q: "Is it worth staying on the Son Tra Peninsula?",
    a: "Only for a quiet, upscale, resort-bubble stay. It is beautiful and secluded, but it is about 25 minutes from the city and priced from roughly US$150 a night up. For a first trip where you want to walk to food and beach, the My An or My Khe side is easier.",
  },
  {
    q: "What time is hotel check-in, and what do I do before it?",
    a: "Standard check-in is 2pm and checkout is noon. Since you will often land in the morning, drop your bags at your hotel or a nearby storage shop and spend the gap on the beach or in a cafe rather than waiting in a lobby with your suitcases.",
  },
];

const SOURCES = [
  { label: "Miss Tourist: where to stay in Da Nang", url: "https://misstourist.com/where-to-stay-in-da-nang-vietnam/", note: "the area breakdown and per-area price feel used across the neighborhood sections" },
  { label: "Da Nang Hotel Guide: nightlife zones", url: "https://www.dananghotelguide.com/da-nang-nightlife-guide.html", note: "the three nightlife zones (An Thuong, Bach Dang riverside, My Khe beachfront)" },
  { label: "Bucket List Bri: Da Nang digital nomad guide", url: "https://bucketlistbri.com/da-nang-digital-nomad/", note: "An Thuong / My An as the nomad and backpacker hub, and the My An vs An Thuong vs My Khe naming" },
  { label: "Origin Vietnam: Da Nang travel cost", url: "https://www.originvietnam.com/da-nang-travel-cost/", note: "budget and dorm price tiers" },
  { label: "BudgetYourTrip: Da Nang hotels", url: "https://www.budgetyourtrip.com/hotels/vietnam/da-nang-1583992", note: "aggregated hotel-price averages, the counterpoint to editorial ranges" },
  { label: "Roavara: Da Nang vs Hoi An", url: "https://roavara.com/da-nang-vs-hoi-an/", note: "beach access and the base-in-Da-Nang, day-trip-Hoi-An logic" },
  { label: "Crystal Bay: airport to My Khe beach", url: "https://crystalbay.com/en/62-da-nang-airport-to-my-khe-beach-suggestions-for-the-4-most-convenient-ways-to-travel-n62119.html", note: "the airport-to-beach distance and time" },
  { label: "Vietnam Paradise Travel: hotel check-in rules", url: "https://www.vietnamparadisetravel.com/blog/hotel-regulations-vietnam", note: "the 2pm check-in / noon checkout norm behind the arrival-day gap" },
];

export default async function WhereToStayInDaNang() {
  const dict = await getDictionary("en");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideFaqJsonLd(FAQ_ITEMS)) }} />
      <GuideLayout
        dict={dict}
        currentPath="/guides/where-to-stay-in-da-nang"
        eyebrow="Where to Stay"
        title="Where to Stay in Da Nang"
        subhead="The city's areas, honestly ranked by who each one suits, with real price ranges and the one booking detail nobody warns you about."
        readingTime="11 min read"
        toc={[
          { id: "layout", label: "How Da Nang is laid out" },
          { id: "an-thuong", label: "An Thuong / My An (the beach strip)" },
          { id: "my-khe", label: "My Khe beachfront" },
          { id: "hai-chau", label: "Hai Chau / the Han River" },
          { id: "son-tra", label: "Son Tra Peninsula" },
          { id: "south", label: "The Marble Mountains side" },
          { id: "best-for-you", label: "Best area for you" },
          { id: "da-nang-or-hoi-an", label: "Da Nang or Hoi An?" },
          { id: "check-in-gap", label: "The check-in gap" },
          { id: "faq", label: "Questions people ask" },
        ]}
        related={[
          { title: "Da Nang or Hoi An?", href: "/guides/da-nang-vs-hoi-an", blurb: "The honest comparison, and how to do both without dragging your bags." },
          { title: "The Perfect Da Nang Itinerary", href: "/guides/da-nang-itinerary", blurb: "Once you have picked an area, here is a day-by-day plan for 3 days." },
        ]}
      >
        <GuideLead>
          Da Nang is a long, flat beach city, so where you stay changes your trip more than the specific hotel does.
          The good news: there are really only a handful of areas to choose between, and each one suits a clear kind
          of traveler. Here is what each area is actually like, what it costs, and which one fits you.
        </GuideLead>

        <GuideTLDR>
          For a first trip, the safest all-round base is the <strong>An Thuong / My An strip behind My Khe
          Beach</strong>: sand a short walk away, a walkable grid of cafes and restaurants, and cheap Grab rides
          everywhere. Then pick by type: <strong>An Thuong / My An</strong> for backpackers, nomads, and nightlife
          on a budget; the <strong>My Khe beachfront</strong> for couples and families who want a resort on the
          sand; <strong>Hai Chau / the Han River</strong> for local markets, food, and the Dragon Bridge;{" "}
          <strong>Son Tra</strong> for quiet luxury; and the <strong>Marble Mountains side</strong> for very early
          flights or a car-based trip. Wherever you land, most hotels only check you in at 2pm and out by noon, so
          plan your arrival afternoon and departure morning around where you leave your bags.
        </GuideTLDR>

        <GuideFacts
          items={[
            { label: "Best all-round base", value: "An Thuong / My An" },
            { label: "Airport to beach", value: "~6 km, 15-30 min" },
            { label: "Budget room", value: "~US$15-25" },
            { label: "Mid-range (3-4 star)", value: "~US$35-70" },
            { label: "Beachfront 5-star", value: "from ~US$120-200" },
            { label: "Check-in / out", value: "2pm / noon" },
          ]}
        />

        <div id="layout" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="layout">How Da Nang is laid out</GuideH2>
          <p>
            Da Nang has two sides split by the Han River. The <strong>beach side</strong> (east) is where most
            visitors stay: My Khe Beach runs for kilometres, with the An Thuong / My An grid of cafes and bars just
            behind it. The <strong>city side</strong> (west, Hai Chau) is the local heart, with markets, the
            cathedral, and the Dragon Bridge on the river between the two. The airport sits about 3 km from the
            centre and roughly 6 km from the beach, so nothing is far apart.
          </p>
          <GuideCallout label="One naming thing to clear up">
            &ldquo;My An,&rdquo; &ldquo;An Thuong,&rdquo; and &ldquo;My Khe&rdquo; get used interchangeably, but
            they are not three separate districts. My An is the ward, An Thuong is the specific cafe-and-bar grid
            inside it, and My Khe is the beach in front. When people say &ldquo;stay in An Thuong,&rdquo; they mean
            that walkable beach-backing strip.
          </GuideCallout>
        </div>

        <div id="an-thuong" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="an-thuong">An Thuong / My An: the beach backpacker and nomad strip</GuideH2>
          <p>
            This is where most tourists, backpackers, and digital nomads stay, and the best default for a first
            trip. Behind My Khe Beach sits a walkable grid of coworking spaces, cafes with reliable wifi, gyms, yoga
            studios, and restaurants at every price, with the sand two to five minutes away. Dorm beds start around
            US$5 to US$10, private budget rooms US$15 to US$25, and mid-range rooms US$35 to US$70.
          </p>
          <p>
            The trade-off is noise: honking, karaoke, the night market, and megaphone ads are part of the package,
            and it has grown from a backpacker area into a remote-worker hub, so it is not the place for deep local
            immersion. If you sleep lightly, book a room a street or two back from the main bar strips.
          </p>
        </div>

        <div id="my-khe" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="my-khe">My Khe beachfront: resorts and couples on the sand</GuideH2>
          <p>
            One row closer to the water, the My Khe beachfront is for people who want to wake up on the beach. My
            Khe is a wide, kilometres-long strip with gentle water, sunbeds, and lifeguards, and you can stay in a
            hotel right on it. Rooms a block or two back run roughly US$35 to US$70 in shoulder season; beachfront
            five-star resorts start around US$120 to US$200 in peak. It suits couples and families who want a swim
            before breakfast and a flat walk to a hundred restaurants, with Grab for everything else.
          </p>
        </div>

        <div id="hai-chau" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="hai-chau">Hai Chau and the Han River: markets, food, and the Dragon Bridge</GuideH2>
          <p>
            Hai Chau is the local heart of the city, on the west bank of the Han River. Stay here for markets (Han
            Market, Con Market), the cathedral, real local food, and walkable access to the Dragon Bridge, whose
            fire show runs at 9pm on Friday, Saturday, and Sunday. The riverside on the city side has more life than
            the riverside on the beach side. The catch is that you are a 5 to 10 minute drive from the beach, and
            river-view rooms sell out fast in peak season and around the fireworks festival, so book three to four
            weeks ahead for those dates.
          </p>

          <GuideImage
            src="https://upload.wikimedia.org/wikipedia/commons/f/f6/Da_Nang_Dragon_Bridge_in_2015.jpg"
            alt="The Dragon Bridge over the Han River, the landmark of the Hai Chau city-centre area"
            width={3072}
            height={1728}
            credit="Vuong Tri Binh"
            creditUrl="https://commons.wikimedia.org/wiki/File:Da_Nang_Dragon_Bridge_in_2015.jpg"
            license="CC BY-SA 4.0"
          />
        </div>

        <div id="son-tra" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="son-tra">Son Tra Peninsula: quiet luxury and nature</GuideH2>
          <p>
            The Son Tra Peninsula, north of the beach, is the quiet, upscale option: secluded jungle-and-cliff
            resorts with private beaches, about 25 minutes from the airport. This is honeymoon and high-end-family
            territory, with five-star names from roughly US$150 up (the flagship InterContinental runs from around
            US$340 a night). Beautiful and calm, but you will Grab into town for anything beyond the resort, so it
            is not the pick if you want to walk to food and nightlife.
          </p>
        </div>

        <div id="south" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="south">The Marble Mountains side (south): who it is and is not for</GuideH2>
          <p>
            South of the main beach strip, toward the Marble Mountains and Non Nuoc Beach, is quieter and less
            walkable, a mix of resort clusters (Hyatt Regency on Non Nuoc, the Mikazuki water park) and
            transit-friendly hotels. Non Nuoc Beach is about 500 m from the Marble Mountains entrance, so it pairs
            well with that half-day, and it is closer to both the airport and the Hoi An road. Choose it for a
            car-based trip, a very early flight, or a resort-bubble family stay, not for a walk-everywhere first
            trip. This is also the area Stow is in, which makes it a handy bag-drop on your way in or out.
          </p>
        </div>

        <div id="best-for-you" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="best-for-you">Best area for you</GuideH2>
          <GuideTable
            columns={["Best for", "Vibe", "Price feel"]}
            rows={[
              { label: "An Thuong / My An", values: ["First-timers, backpackers, nomads, nightlife", "Walkable, lively, noisy", "Budget to mid"] },
              { label: "My Khe beachfront", values: ["Couples, families, beach lovers", "Resort-on-the-sand, relaxed", "Mid to high"] },
              { label: "Hai Chau / Han River", values: ["Local food, markets, city life", "Urban, busy, local", "Budget to high"] },
              { label: "Son Tra Peninsula", values: ["Honeymooners, quiet luxury", "Secluded, natural", "High to very high"] },
              { label: "Marble Mountains side", values: ["Early flights, car trips, resort families", "Quiet, spread out", "Mixed"] },
            ]}
          />
          <p className="text-[13px] text-[#9CA3AF]">
            Prices are shoulder-season feels and move a lot with the season; US dollar figures are approximate.
            Aggregated booking averages tend to run lower than editorial ranges, so treat these as guides, not quotes.
          </p>
        </div>

        <div id="da-nang-or-hoi-an" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="da-nang-or-hoi-an">Da Nang or Hoi An: which should you base in?</GuideH2>
          <p>
            For most first trips, base in Da Nang and day-trip to Hoi An. Da Nang gives you the beach, the airport,
            more mid-range hotels, and easier transport; Hoi An&apos;s Ancient Town is charming but sits several km
            inland from any beach and is often crowded. Choose Hoi An as a base only if lantern-lit old-town
            evenings matter more to you than beach and city convenience. The full head-to-head is in our{" "}
            <Link href="/guides/da-nang-vs-hoi-an" className="text-[#E8742C] underline underline-offset-2">
              Da Nang or Hoi An comparison
            </Link>
            , and the day-trip logistics are in our{" "}
            <Link href="/guides/da-nang-to-hoi-an-day-trip" className="text-[#E8742C] underline underline-offset-2">
              Da Nang to Hoi An guide
            </Link>
            .
          </p>
        </div>

        <div id="check-in-gap" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="check-in-gap">The check-in gap nobody warns you about</GuideH2>
          <p>
            Here is the one thing no hotel map tells you: whichever area you pick, your first afternoon and last
            morning fall into a gap. Most Da Nang hotels do not hand over a room until 2pm and check you out by
            noon, and early check-in only happens if a room is already free. Since the airport is about 15 minutes
            from the beach strip, you will often land hours before 2pm, then either sit in a lobby with your
            suitcases or drag them to the beach.
          </p>

          <GuideStowCallout
            heading="Land before 2pm? Start the trip bag-free."
            facts={[
              { label: "By the hour", value: "15,000 VND/hr" },
              { label: "Full day", value: "60,000 VND (up to 24h)" },
              { label: "From the airport", value: "~10 min" },
            ]}
          >
            The easy fix is to drop your bags somewhere secure and start your trip straight away. Stow is at 55 Ba
            Bang Nhan in Ngu Hanh Son, about ten minutes from the airport and near the Marble Mountains and My Khe,
            from 15,000 VND an hour or 60,000 VND a day (with flat weekly and monthly rates for longer stays), open
            7am to 10pm. Land early, store the bags, get your first swim in, and check in relaxed at 2pm. Do the
            same on the way out: check out at noon, leave the bags, and keep the beach instead of babysitting
            luggage until an evening flight.
          </GuideStowCallout>
        </div>

        <div id="faq" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="faq">Questions people ask</GuideH2>
          <GuideFAQ items={FAQ_ITEMS} />
        </div>

        <GuideSources items={SOURCES} />

        <p className="text-[13px] text-[#9CA3AF]">
          Hotel prices, area character, and exchange rates change, and US dollar figures are approximate. This guide
          reflects the situation at the time of writing; check current rates and book-ahead windows before you travel.
        </p>
      </GuideLayout>
    </>
  );
}
