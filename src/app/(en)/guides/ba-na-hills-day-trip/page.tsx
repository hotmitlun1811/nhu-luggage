import type { Metadata } from "next";
import GuideLayout from "@/components/guides/GuideLayout";
import { GuideH2, GuideH3, GuideLead, GuideFacts, GuideList, GuideTable, GuideCallout, GuideFAQ, GuideTOC, GuideImage } from "@/components/guides/GuideElements";
import { breadcrumbJsonLd, guideFaqJsonLd } from "@/lib/structured-data";
import { getDictionary } from "@/content/dictionary";

const pageTitle = "Ba Na Hills Day Trip: Golden Bridge, Real Ticket Prices, the Fog Problem";
const pageDescription =
  "What's actually at the top of Ba Na Hills, real 2026 ticket pricing, the record-holding cable car, and why the mountain's own weather is the detail most guides skip.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides/ba-na-hills-day-trip" },
  openGraph: { title: `${pageTitle} | Stow`, description: pageDescription, url: "https://www.stowdanang.com/guides/ba-na-hills-day-trip" },
  twitter: { title: `${pageTitle} | Stow`, description: pageDescription },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Ba Na Hills Day Trip", path: "/guides/ba-na-hills-day-trip" },
]);

const FAQ_ITEMS = [
  {
    q: "Is Ba Na Hills worth the price?",
    a: "Opinions genuinely split. People who go for the cable car ride, the French Village atmosphere, and the Golden Bridge photo tend to say yes. People expecting something more than a large, polished theme park sometimes come away calling it touristic. Worth going in with realistic expectations either way.",
  },
  {
    q: "How much time do I actually need?",
    a: "6-8 hours for a full visit — Golden Bridge, French Village, Fantasy Park, without rushing. 3-6 hours covers just the Golden Bridge and top photo spots if that's the priority.",
  },
  {
    q: "What if it's foggy — should I reschedule?",
    a: "There's no live fog-check tool specific to the site, so it's a real gamble either way. Some visitors find the fog adds atmosphere; most who go specifically for the views prefer March-August, the driest, clearest stretch of the year, and arriving before 8am for the best odds.",
  },
  {
    q: "Is the Linh Ung Pagoda at Ba Na the same as the famous Lady Buddha one?",
    a: "No — genuinely different pagodas with the same name. The 67-meter Lady Buddha is at Son Tra Peninsula near the coast. The Ba Na version is a smaller mountaintop temple included in the cable car ticket, nicknamed \"the pagoda in the clouds.\"",
  },
  {
    q: "Can I store my luggage at Ba Na Hills?",
    a: "Yes — free storage at the main gate, no stated size limit, though valuables like cash, cameras, and jewelry aren't accepted. That covers you once you've arrived. It doesn't help earlier that morning, checked out of your hotel and still in Da Nang.",
  },
  {
    q: "Is it accessible for elderly visitors or anyone with mobility issues?",
    a: "Partially. Cable car stations have ramps and free wheelchairs are available at the main gate, but garden trails and some viewpoints are uneven, and the Wax Museum requires an escalator with no lift alternative. Worth planning around rather than assuming full accessibility.",
  },
];

export default async function BaNaHillsGuide() {
  const dict = await getDictionary("en");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideFaqJsonLd(FAQ_ITEMS)) }} />
      <GuideLayout
        dict={dict}
        currentPath="/guides/ba-na-hills-day-trip"
        eyebrow="Day Trips"
        title="Ba Na Hills Day Trip"
        subhead="The Golden Bridge, a record-holding cable car, and a mountain that runs 10°C colder than the beach you left that morning."
        related={[
          { title: "Da Nang to Hoi An Day Trip", href: "/guides/da-nang-to-hoi-an-day-trip", blurb: "The other big day trip from Da Nang, opposite direction." },
          { title: "Da Nang Layover Guide", href: "/guides/da-nang-layover-guide", blurb: "Ba Na Hills needs a full day — this covers shorter windows instead." },
        ]}
      >
        <GuideLead>
          Ba Na Hills is a full day, not a stopover — between the drive out, the cable car, and actually walking
          the site, most visits run 6-8 hours round trip from Da Nang.
        </GuideLead>

        <GuideTOC
          sections={[
            { id: "whats-there", label: "What's actually at the top" },
            { id: "tickets", label: "Tickets, in full" },
            { id: "cable-car", label: "The cable car" },
            { id: "weather", label: "Weather and fog" },
            { id: "itinerary", label: "A realistic day" },
            { id: "your-stuff", label: "Your bags, honestly" },
          ]}
        />

        <GuideImage
          src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Golden_Bridge_at_Ba_Na_Hills_20250718.jpg"
          alt="The Golden Bridge at Ba Na Hills, held up by two giant stone hands"
          width={4096}
          height={2649}
          credit="DvTor8303"
          creditUrl="https://commons.wikimedia.org/wiki/File:Golden_Bridge_at_Ba_Na_Hills_20250718.jpg"
          license="CC0"
        />

        <GuideFacts
          items={[
            { label: "Distance", value: "~30-35 km" },
            { label: "From Da Nang", value: "35-50 min by car" },
            { label: "Standard ticket", value: "~950,000₫ adult" },
            { label: "Cable car ride", value: "~15 min one-way" },
          ]}
        />

        <div id="whats-there" className="flex flex-col gap-5 scroll-mt-24">
          <GuideH2 id="whats-there">What's actually at the top</GuideH2>

          <GuideH3>Golden Bridge</GuideH3>
          <p>
            150 meters long, held up by two giant weathered-stone hands emerging from the hillside — the site&apos;s
            signature image and the one most people come for. Best photos are early, before roughly 8:30-9am, when
            the light is softer and the crowds haven&apos;t built up yet.
          </p>

          <GuideH3>French Village</GuideH3>
          <p>
            A built European-style quarter — cobblestone streets, cafes, and Saint Denis Church, styled as a
            miniature version of the Basilica of Saint-Denis in France. The Debay Wine Cellar, dug into the
            hillside in 1923 by French colonists to use the cool underground temperature for storage, is the more
            unusual stop here — named for the army captain credited with first developing Ba Na as a hill station.
          </p>

          <GuideH3>Fantasy Park</GuideH3>
          <p>
            An indoor amusement complex — an Alpine Coaster (a self-braked sled ride, extra cost around 70,000₫),
            a 4D/5D cinema, and a Wax Museum on a separate 100,000₫ ticket. Genuinely useful as a rain or heat
            contingency, and reads as more kid-oriented than romantic if you're coming as a couple.
          </p>

          <GuideH3>Linh Ứng Pagoda</GuideH3>
          <p>
            Sitting above 1,400 meters, construction began in 1999 and finished in 2004 — nicknamed &ldquo;the
            pagoda in the clouds&rdquo; for how often mist rolls through. Included in the cable car ticket, a short
            walk from one of the stations.
          </p>
        </div>

        <GuideCallout label="Don't mix this up">
          There are three pagodas named Linh Ứng in Da Nang. This is the smaller mountaintop one at Ba Na. The
          famous one — the 67-meter Lady Buddha statue most people picture — is a separate, much larger site on
          Sơn Trà Peninsula near the coast, unrelated logistically. Same disambiguation applies as at the Marble
          Mountains, which also has its own third Linh Ứng.
        </GuideCallout>

        <div id="tickets" className="flex flex-col gap-4 scroll-mt-24">
          <GuideH2 id="tickets">Tickets, in full</GuideH2>
          <GuideTable
            columns={["Adult", "Child (1.0-1.4m)"]}
            rows={[
              { label: "Standard (non-resident)", values: ["~950,000₫", "~750,000₫"] },
              { label: "Da Nang resident", values: ["~650,000₫", "~550,000₫"] },
              { label: "Lunch combo", values: ["~1,250,000₫", "~1,050,000₫"] },
            ]}
          />
          <p>
            Standard tickets cover the round-trip cable car, Golden Bridge, French Village, Fantasy Park, and Linh
            Ứng Pagoda. As of 2026, cable car tickets are valid for 3 consecutive days with unlimited rides in that
            window — worth knowing if you want a second, less crowded pass at the views. Gate tickets can sell out
            by mid-morning on weekends and holidays; booking online 2-3 days ahead is the safe move for those dates
            specifically, since online pricing tracks the gate price without a real discount.
          </p>
        </div>

        <div id="cable-car" className="flex flex-col gap-3 scroll-mt-24">
          <GuideH2 id="cable-car">The cable car</GuideH2>
          <p>
            Verified with Guinness World Records: the Toc Tien Waterfall–L&apos;Indochine line holds the record for
            longest non-stop single-track cable car, 5,801 meters, opened in 2013. Five lines run across the
            network in total — Suối Mơ–Bà Nà is the main ascent from the base gate, while Hội An–Marseille runs
            most directly toward the Golden Bridge itself.
          </p>
        </div>

        <GuideCallout label="The detail most guides skip">
          Ba Na Hills sits at 1,487 meters and can genuinely feel like a different climate than the beach you left
          that morning. Even in Vietnam&apos;s hottest months, temperatures at the top can drop to 14-18°C,
          colder again if fog rolls in — bring a light jacket regardless of how hot Da Nang feels when you leave.
          March through August is the clearest, driest stretch for actually seeing the views; October through
          February brings more fog and rain.
        </GuideCallout>

        <div id="itinerary" className="flex flex-col gap-3 scroll-mt-24">
          <GuideH2 id="itinerary">A realistic day</GuideH2>
          <p>
            Leave Da Nang by 7:30-8am — tour groups typically arrive around 9am, and mornings give the best odds
            of clear, fog-free views. A loose sequence that works: Golden Bridge first for the light, French
            Village and the wine cellar next, lunch at one of the hilltop buffet restaurants (service generally
            runs 10:30am-3pm), then Fantasy Park in the afternoon before heading back down.
          </p>
        </div>

        <div id="your-stuff" className="flex flex-col gap-3 scroll-mt-24">
          <GuideH2 id="your-stuff">Your bags, honestly</GuideH2>
          <p>
            Ba Na Hills does offer free luggage storage at its own main gate — tag and claim, no stated size limit,
            though cash, cameras, and jewelry aren&apos;t accepted there. That covers you once you&apos;ve arrived.
          </p>
          <p>
            It doesn&apos;t help at 7am, checked out of your hotel, still in Da Nang with a suitcase and a cable
            car ticket. Drop your bag at Stow (55 Bà Bang Nhãn, Ngũ Hành Sơn, about 10 minutes from the airport)
            before you head out — daily rate is 60,000₫ for up to 24 hours, open until 10pm for whenever the day
            actually ends.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <GuideH2>Quick checklist</GuideH2>
          <GuideList
            items={[
              "Book online 2-3 days ahead if traveling on a weekend or holiday",
              "Bring a light jacket — the summit runs noticeably colder than Da Nang",
              "Wear real shoes; French Village and the gardens involve a lot of walking",
              "March-August for the best odds of a clear, fog-free view",
            ]}
          />
        </div>

        <div className="flex flex-col gap-3">
          <GuideH2>Questions people actually ask</GuideH2>
          <GuideFAQ items={FAQ_ITEMS} />
        </div>

        <p className="text-[13px] text-[#9CA3AF]">
          Ticket prices and policies are set by the site operator and shift by season — worth a quick check before
          you go if you&apos;re planning tightly around a specific price.
        </p>
      </GuideLayout>
    </>
  );
}
