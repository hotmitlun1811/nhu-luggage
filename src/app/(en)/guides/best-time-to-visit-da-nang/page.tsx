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

const pageTitle = "The Best Time to Visit Da Nang: A Month-by-Month Weather Guide";
const pageDescription =
  "When to visit Da Nang, month by month. The best months (February to May), the ones to avoid (October and November), the rainy and typhoon season, the best time for the beach, festivals, and when prices drop.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides/best-time-to-visit-da-nang" },
  openGraph: { title: `${pageTitle} | Stow`, description: pageDescription, url: "https://www.stowdanang.com/guides/best-time-to-visit-da-nang" },
  twitter: { title: `${pageTitle} | Stow`, description: pageDescription },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Best Time to Visit Da Nang", path: "/guides/best-time-to-visit-da-nang" },
]);

const FAQ_ITEMS = [
  {
    q: "What is the best time to visit Da Nang?",
    a: "February to May. You get warm, dry days, low rain, and calm seas, before the summer heat and domestic crowds peak in June to August. March is often the single best month: clear, dry, and not yet too hot. April adds a warmer sea for swimming.",
  },
  {
    q: "What is the worst time to visit Da Nang, and which month should I avoid?",
    a: "October and November are the months to avoid. They bring the heaviest rain, the highest flood and typhoon risk, and rough seas, with October usually the wettest month of the year. If you can move your dates out of that window, do.",
  },
  {
    q: "When is the rainy season in Da Nang?",
    a: "Roughly September to December, with rain rising from August and peaking in October and November. Da Nang has two seasons rather than four, so the year splits into a long dry stretch and a shorter, intense wet one, not spring, summer, autumn, and winter.",
  },
  {
    q: "When is typhoon season in Da Nang?",
    a: "The main window runs from early September to about mid-December, with October and November the most likely for a direct storm. A smaller, usually weaker window runs late April to late June. Storm tracks vary every year, so watch forecasts if you travel in autumn.",
  },
  {
    q: "Is October a good time to visit Da Nang?",
    a: "Not for weather. October is the wettest month with the highest flood and typhoon risk. In October 2022 about 700 mm of rain fell on Da Nang in 24 hours and caused major flooding. Prices are at their lowest, so October suits only flexible, budget-focused travelers.",
  },
  {
    q: "When is the best time for the beach in Da Nang?",
    a: "April to August, when the sea is warmest (up to about 29 to 30 degrees C) and rain is low. Avoid October to December for swimming, when the sea turns rough and lifeguard cover winds down. June to August is warmest but also the most crowded.",
  },
  {
    q: "When is the cheapest time to visit Da Nang?",
    a: "The rainy season, roughly September to December, when hotel and airfare prices often drop 20 to 40 percent below the dry months. September is the sweet spot: high season has ended and crowds have thinned, but the heaviest rain has not yet arrived.",
  },
  {
    q: "When is Da Nang most crowded?",
    a: "June to August, during Vietnamese school holidays, when domestic tourism peaks. Beach-hotel rates can run 40 to 60 percent above shoulder-season levels and fill up weeks ahead, so book early if you travel in summer.",
  },
  {
    q: "When is the Da Nang fireworks festival?",
    a: "The Da Nang International Fireworks Festival (DIFF) usually runs from late spring into early summer, with competition nights on Saturdays. Dates move each edition, so check the official schedule before you plan around it. It draws big crowds to the Han River banks.",
  },
  {
    q: "What can I do in Da Nang when it rains?",
    a: "Head indoors. The Cham Sculpture Museum, the Da Nang Museum, air-conditioned malls like Vincom Plaza and Lotte Mart, the covered Han Market, and the partly sheltered Marble Mountains caves all work in the rain. Storing your bags first makes a wet-weather day far easier.",
  },
];

const SOURCES = [
  { label: "Climates to Travel: Da Nang climate", url: "https://www.climatestotravel.com/climate/vietnam/da-nang", note: "the month-by-month temperatures, rainfall, sea temperatures, and typhoon window" },
  { label: "WeatherSpark: average weather in Da Nang", url: "https://weatherspark.com/y/119966/Average-Weather-in-Da-Nang-Vietnam-Year-Round", note: "model-based averages, the tourism score, and sea temperatures (cross-check)" },
  { label: "Climate-Data.org: Da Nang", url: "https://en.climate-data.org/asia/vietnam/da-nang-city/da-nang-4260/", note: "the February to May best-time framing" },
  { label: "TravelChinaGuide: Da Nang weather", url: "https://www.travelchinaguide.com/asia/vietnam/da-nang/weather.htm", note: "the two-season climate overview and hottest and coolest months" },
  { label: "Wikipedia: 2020 Central Vietnam floods", url: "https://en.wikipedia.org/wiki/2020_Central_Vietnam_floods", note: "a real-world example of the October and November flood and typhoon risk" },
  { label: "Wikipedia: Tropical Storm Sonca (2022)", url: "https://en.wikipedia.org/wiki/Tropical_Storm_Sonca_(2022)", note: "the 700 mm in 24 hours Da Nang flood figure for October 2022" },
  { label: "Ahoy Vietnam: best time to visit Da Nang", url: "https://ahoyvietnam.com/best-time-to-visit-da-nang/", note: "the crowd and price seasonality, peak premiums, and wet-season discounts" },
  { label: "Hotels.com: things to do in Da Nang when it rains", url: "https://www.hotels.com/go/vietnam/things-to-do-da-nang-when-rains", note: "the indoor, rainy-day attractions for the backup plan" },
];

export default async function BestTimeToVisitDaNang() {
  const dict = await getDictionary("en");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideFaqJsonLd(FAQ_ITEMS)) }} />
      <GuideLayout
        dict={dict}
        currentPath="/guides/best-time-to-visit-da-nang"
        eyebrow="Plan Your Trip"
        title="The Best Time to Visit Da Nang"
        subhead="A month-by-month weather guide: the best months, the ones to avoid, and the right time for the beach, festivals, and low prices."
        readingTime="10 min read"
        toc={[
          { id: "two-seasons", label: "Two seasons, not four" },
          { id: "month-by-month", label: "Weather month by month" },
          { id: "dry-season", label: "The dry season" },
          { id: "rainy-season", label: "The rainy and typhoon season" },
          { id: "beach-vs-sights", label: "Beach vs sightseeing timing" },
          { id: "festivals", label: "Festivals worth timing" },
          { id: "crowds", label: "Crowds and prices by season" },
          { id: "rainy-backup", label: "A rainy-season backup plan" },
          { id: "bags", label: "On a checkout-day trip" },
          { id: "faq", label: "Questions people ask" },
        ]}
        related={[
          { title: "The Perfect Da Nang Itinerary", href: "/guides/da-nang-itinerary", blurb: "Once you have picked your month, here is how to spend the days." },
          { title: "Ba Na Hills Day Trip", href: "/guides/ba-na-hills-day-trip", blurb: "Cooler and foggier up top, so timing matters even more." },
        ]}
      >
        <GuideLead>
          Da Nang has a short, sharp weather calendar. Most of the year is warm and dry, then a few autumn months turn
          very wet, with real flood and typhoon risk. Get the timing right and you get sun, calm seas, and fair prices.
          Get it wrong and you can lose days to rain. Here is the honest month-by-month picture, plus the best windows
          for the beach, festivals, and low prices.
        </GuideLead>

        <GuideTLDR>
          The best time to visit Da Nang is <strong>February to May</strong>: warm, dry days, calm seas, and the lowest
          rain of the year. The worst months are <strong>October and November</strong>, the peak of the rainy season,
          when typhoons, heavy downpours, and flooding are most likely. For the <strong>beach, aim for April to
          August</strong>, when the sea is warmest. For sightseeing without extreme heat, February to April is the
          sweet spot. If you must travel in October or November, keep flexible plans and indoor backups.
        </GuideTLDR>

        <GuideImage
          src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Beach_of_Da_Nang%2C_inner-gulf.jpg"
          alt="Calm inner-gulf coastline of Da Nang on a clear day"
          width={2816}
          height={1095}
          credit="Fa2f"
          creditUrl="https://commons.wikimedia.org/wiki/File:Beach_of_Da_Nang,_inner-gulf.jpg"
          license="CC BY 3.0"
        />

        <GuideFacts
          items={[
            { label: "Best overall", value: "Feb - May" },
            { label: "Avoid", value: "Oct - Nov" },
            { label: "Warmest sea", value: "Jun - Aug" },
            { label: "Wettest month", value: "October" },
            { label: "Cheapest", value: "Rainy season" },
            { label: "Peak crowds", value: "Jun - Aug" },
          ]}
        />

        <div id="two-seasons" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="two-seasons">Da Nang has two seasons, not four</GuideH2>
          <p>
            Central Vietnam does not run on the four-season pattern of Hanoi in the north. Da Nang has a tropical
            climate with two seasons: a long dry season and a shorter, intense rainy season. The coolest months are
            December to February, and the hottest are June to August. Rain is the number that really shapes a trip, and
            it is very unevenly spread across the year.
          </p>
          <p>
            The city gets a lot of rain overall, roughly 2,100 to 2,600 mm a year depending on the source, but most of
            it falls in just a few autumn months. That is why the same city can feel like a sun-soaked beach resort in
            March and a flooded, storm-battered coast in October. Plan around the rain, and the temperature mostly
            takes care of itself.
          </p>
        </div>

        <div id="month-by-month" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="month-by-month">Da Nang weather month by month</GuideH2>
          <p>
            Here is the year at a glance. Temperatures are average daily high and low. Rainfall is an approximate
            monthly total, since sources differ on exact figures, so treat the numbers as directional rather than
            precise.
          </p>
          <GuideTable
            columns={["High / Low (C)", "Rain (approx)", "Verdict"]}
            rows={[
              { label: "January", values: ["25 / 19", "~85 mm", "OK. Coolest, a few lingering showers, quiet."] },
              { label: "February", values: ["26 / 20", "~25 mm", "Great. Dry and mild; Tet timing varies."] },
              { label: "March", values: ["29 / 22", "~20 mm", "Excellent. The sweet spot, clear and dry."] },
              { label: "April", values: ["31 / 24", "~35 mm", "Excellent. Warm, dry, sea warming up."] },
              { label: "May", values: ["34 / 25", "~85 mm", "Very good. Hot, short showers, warm sea."] },
              { label: "June", values: ["35 / 26", "~90 mm", "Good but hot and busy. Domestic peak."] },
              { label: "July", values: ["34 / 26", "~85 mm", "Good but hot and busy. Warmest sea."] },
              { label: "August", values: ["34 / 25", "~115 mm", "Mixed. Hot, rain starting to rise."] },
              { label: "September", values: ["32 / 24", "~310 mm", "Shoulder gamble. Showers up, prices down."] },
              { label: "October", values: ["30 / 23", "~650 mm", "Avoid. Wettest month, flood and typhoon peak."] },
              { label: "November", values: ["28 / 22", "~430 mm", "Avoid. Very wet, storm and rough-sea risk."] },
              { label: "December", values: ["25 / 20", "~215 mm", "Improving late. Cooler, rain tapering off."] },
            ]}
          />
        </div>

        <div id="dry-season" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="dry-season">The dry season: sun, beach, and heat</GuideH2>
          <p>
            The dry season runs roughly February to August. February to April is the driest, mildest stretch, with
            highs in the high 20s to low 30s C and very little rain. This is the best window for sightseeing, temples,
            and long days outdoors without the extreme heat. Weather models often single out late March as the peak of
            the year for warm-weather activities.
          </p>
          <p>
            From May the heat builds, and June to August brings the hottest days, with highs around 34 to 35 degrees C.
            The sea is at its warmest then, which is great for swimming, but the midday sun is fierce, so plan the
            beach for early morning or late afternoon. Short, sharp showers start to appear by August as the wet season
            approaches.
          </p>
        </div>

        <div id="rainy-season" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="rainy-season">The rainy season and the typhoon window</GuideH2>
          <p>
            The rainy season runs roughly September to December, driven by the northeast monsoon, with rain rising from
            August and peaking in October and November. October is usually the wettest month of all. Rainfall in this
            period is not a light drizzle: it comes in heavy, sustained downpours that can flood streets within hours.
          </p>
          <p>
            The main typhoon window runs from early September to about mid-December, and Da Nang and nearby Hoi An see
            direct storms most often in October and November. The risk is real, not theoretical. In October 2022, about
            700 mm of rain fell on the city in 24 hours and caused major flooding. The 2020 central Vietnam floods, tied
            to a run of storms, killed roughly 189 people across the region.
          </p>
          <GuideCallout label="Storms vary year to year">
            The typhoon window is a probability, not a fixed schedule. Some autumns bring severe flooding, others are
            fairly mild. If you travel between October and November, watch the forecast in the days before you go, keep
            plans flexible, and consider travel insurance that covers weather disruption.
          </GuideCallout>
        </div>

        <div id="beach-vs-sights" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="beach-vs-sights">Best time for the beach vs best time for sightseeing</GuideH2>
          <p>
            These are two different answers, and mixing them up is a common mistake. For the beach and swimming, aim
            for April to August, when the sea is warmest, up to about 29 to 30 degrees C, and rain is low. Avoid
            October to December for swimming, when the sea turns rough and unsafe. Our{" "}
            <Link href="/guides/best-beaches-in-da-nang" className="text-[#E8742C] underline underline-offset-2">
              best beaches guide
            </Link>{" "}
            covers the safe-swim seasons in more detail.
          </p>
          <p>
            For sightseeing without the extreme heat, February to April is the pick, with pleasant highs and little
            rain. One altitude note: Ba Na Hills sits far above the coast and is cooler and foggier, so a clear day at
            sea level does not guarantee a view of the Golden Bridge up top. Our{" "}
            <Link href="/guides/ba-na-hills-day-trip" className="text-[#E8742C] underline underline-offset-2">
              Ba Na Hills day trip guide
            </Link>{" "}
            explains how to time it around the fog.
          </p>
        </div>

        <div id="festivals" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="festivals">Festivals worth timing your trip around</GuideH2>
          <p>
            Two events are worth knowing. The Da Nang International Fireworks Festival (DIFF) is the city&apos;s
            signature event, usually running from late spring into early summer over several weeks, with international
            competition nights on Saturdays and big crowds along the Han River. Dates move each edition, so check the
            official schedule before you plan around it.
          </p>
          <p>
            Tet, the Lunar New Year, is the biggest holiday and shifts each year with the lunar calendar, usually
            landing in late January or February. The weather during Tet is typically pleasant and mostly dry, around 20
            to 25 degrees C. Note that many small local shops, restaurants, and museums close for roughly the first
            three days, while hotels, chains, and tourist-district businesses generally stay open.
          </p>
        </div>

        <div id="crowds" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="crowds">Crowds and prices by season</GuideH2>
          <p>
            Timing changes the bill as much as the weather. June to August is peak season, driven by Vietnamese school
            holidays and domestic tourism, so the city is busiest and priciest then. Beach-hotel rates can run 40 to 60
            percent above shoulder-season levels and sell out weeks ahead.
          </p>
          <GuideList
            items={[
              "February to May: shoulder pricing, roughly 20 to 30 percent below the summer peak, with the best all-round weather. The value sweet spot.",
              "June to August: peak crowds and prices, but the warmest sea and the fireworks festival.",
              "September: a narrow budget window, with high season over and rates falling before the heaviest rain.",
              "October to November: cheapest and emptiest, but the wettest and most storm-prone. For flexible risk-takers only.",
              "December: low season with rates improving late, as the rain eases through the month.",
            ]}
          />
        </div>

        <div id="rainy-backup" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="rainy-backup">Visiting in the rainy season anyway: a backup plan</GuideH2>
          <p>
            If your dates land in the wet months, do not write the trip off. A good rainy day in Da Nang is an indoor
            day. Build a short list of covered options so a downpour changes your plan, not your mood.
          </p>
          <GuideList
            items={[
              "Da Nang Museum of Cham Sculpture: the world's largest collection of Cham stone art, across ten rooms, founded in 1915.",
              "Da Nang Museum: three floors and more than 2,500 artifacts on the city's history and culture.",
              "Air-conditioned malls: Vincom Plaza and Lotte Mart, with cinemas, arcades, shopping, and food.",
              "Han Market: a covered market for souvenirs, snacks, and people-watching out of the rain.",
              "The Marble Mountains: the caves and pagodas are partly sheltered, so they work in lighter rain.",
            ]}
          />
          <p>
            Traveling with children in the wet season needs a longer indoor list; our{" "}
            <Link href="/guides/da-nang-with-kids" className="text-[#E8742C] underline underline-offset-2">
              Da Nang with kids guide
            </Link>{" "}
            has family-friendly rainy-day ideas.
          </p>
        </div>

        <div id="bags" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="bags">On a checkout-day trip or a final beach morning</GuideH2>
          <p>
            Whatever month you pick, one day is always awkward: the day you check out but your flight leaves in the
            evening. In the dry-season heat you might want a last beach morning, and in the rainy season you might want
            to duck between indoor spots. Either way, you do not want to drag your luggage around for it.
          </p>

          <GuideStowCallout
            eyebrow="Your last day"
            heading="Store the bags after checkout and keep the day free until your flight."
            facts={[
              { label: "Near the airport", value: "~10 min" },
              { label: "By the day", value: "60,000 VND (up to 24h)" },
              { label: "Open", value: "7am - 10pm daily" },
            ]}
          >
            Stow is at 55 Ba Bang Nhan in Ngu Hanh Son, about ten minutes from the airport and open 7am to 10pm. Leave
            your bags after checkout from 15,000 VND an hour or 60,000 VND a day, then spend a sunny morning on the
            beach or a rainy afternoon in the museums, and collect them on the way to your flight. It turns a dead
            checkout day into a real one, whatever the weather.
          </GuideStowCallout>
        </div>

        <div id="faq" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="faq">Questions people ask</GuideH2>
          <GuideFAQ items={FAQ_ITEMS} />
        </div>

        <GuideSources items={SOURCES} />

        <p className="text-[13px] text-[#9CA3AF]">
          Weather figures are long-term averages and vary by source and by year; storm tracks and festival dates shift
          each season. This guide reflects current data and events at the time of writing, so check a live forecast and
          the official festival schedule before you plan tightly around them.
        </p>
      </GuideLayout>
    </>
  );
}
