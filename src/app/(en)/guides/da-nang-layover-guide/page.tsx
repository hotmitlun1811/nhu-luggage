import type { Metadata } from "next";
import GuideLayout from "@/components/guides/GuideLayout";
import { GuideH2, GuideH3, GuideLead, GuideFacts, GuideList, GuideTable, GuideCallout, GuideFAQ, GuideTOC, GuideImage } from "@/components/guides/GuideElements";
import { breadcrumbJsonLd, guideFaqJsonLd } from "@/lib/structured-data";
import { getDictionary } from "@/content/dictionary";

const pageTitle = "Da Nang Layover Guide: Visa Rules, Real Wait Times, What to Do";
const pageDescription =
  "Do you even need a visa to leave Da Nang Airport on a layover? Real immigration wait times, time-banded itineraries, and where to leave your bag before you go anywhere.";

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
    q: "Do I need a visa just to leave the airport during a layover?",
    a: "Depends on your passport, not your layover length. If you stay airside and never clear immigration, no visa is needed. To physically exit — which means clearing immigration and collecting any checked bags — you need either a visa-exempt passport (around 38 countries, not including the US, Canada, or Australia) or a valid e-visa arranged beforehand.",
  },
  {
    q: "How long does immigration actually take at Da Nang airport?",
    a: "10-20 minutes off-peak. Da Nang's international terminal has been running well over its designed capacity in 2026, and waits of close to two hours have been reported during the worst windows — late morning to early afternoon, and late evening. Budget more buffer than you'd expect from the airport's size.",
  },
  {
    q: "Is it safe to leave luggage at the airport while I explore?",
    a: "The airport's own storage is legitimate — a staffed counter in a separate building, tiered pricing from about 60,000₫. Its two real limitations: it's a short walk across from the terminal, not inside it, and it doesn't open until 9am, which locks out anyone landing on an early flight.",
  },
  {
    q: "What can I realistically do in a 5-hour layover?",
    a: "After immigration both ways and a return buffer, expect 2.5-3.5 usable hours. That's enough for My Khe Beach, the Cham Museum, or a wander through Han Market — not enough to comfortably reach Hoi An or the Marble Mountains and back.",
  },
  {
    q: "Does the Dragon Bridge really breathe fire?",
    a: "Yes, but only Friday, Saturday, and Sunday nights at 9pm, for about 30 minutes. It's a common trap for travelers whose layover lands on a weekday evening expecting the show.",
  },
  {
    q: "Is Grab reliable from Da Nang airport?",
    a: "Yes, with the app and a data connection. Some drivers avoid the airport pickup zone due to access fees, and prices rise during peak hours or late at night — build in a few minutes' buffer for a pickup that isn't instant.",
  },
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
        subhead="Flight lands at 7am, next one leaves at 6pm. Whether that's worth leaving the airport for depends on your passport and the clock, not just how long you're stuck here."
        related={[
          { title: "Marble Mountains Guide", href: "/guides/marble-mountains-guide", blurb: "Fits into a layover of 8+ hours." },
          { title: "Da Nang to Hoi An Day Trip", href: "/guides/da-nang-to-hoi-an-day-trip", blurb: "Doable on the longest layovers if you start early." },
        ]}
      >
        <GuideLead>
          Da Nang Airport sits close to the city, not out in the middle of nowhere — that makes a long layover
          genuinely usable. Whether it's worth leaving for depends on two things most guides skip: your passport,
          and how bad immigration is running that day.
        </GuideLead>

        <GuideTOC
          sections={[
            { id: "visa-question", label: "Do you need a visa to leave?" },
            { id: "the-bag", label: "Step one: the bag" },
            { id: "itineraries", label: "What fits in your window" },
            { id: "stops", label: "The stops, with real hours" },
            { id: "getting-back", label: "Getting back in time" },
          ]}
        />

        <div id="visa-question" className="flex flex-col gap-3 scroll-mt-24">
          <GuideH2 id="visa-question">Do you need a visa just to leave the airport?</GuideH2>
          <p>
            This is the question most layover content skips, and it matters more than the itinerary. Vietnam's
            rule turns on whether you clear immigration, not on how long your layover is. Stay airside — never
            collect your bags, never pass through passport control — and no visa is needed. Step out into the city,
            and that counts as entering the country, same as any other arrival.
          </p>
          <p>
            About 38 nationalities get visa-free entry: most of Western and Eastern Europe, Japan, South Korea (45
            days), and Vietnam's ASEAN neighbors (30 days) among them. <strong>US, Canadian, and Australian
            passport holders are not on that list</strong> and need a valid e-visa arranged before they land — it
            can't realistically be issued same-day for a spontaneous layover trip, since processing normally takes
            several business days.
          </p>
        </div>

        <GuideCallout label="Worth knowing before you plan a tight layover">
          Da Nang's international terminal has been running significantly over its designed passenger capacity in
          2026, and travelers have reported waits close to two hours during the worst windows — late morning
          through early afternoon, and again late evening. A renovation is underway, but until it's done, budget
          real buffer on both ends of a layover, not just the textbook 20-minute estimate.
        </GuideCallout>

        <div id="the-bag" className="flex flex-col gap-3 scroll-mt-24">
          <GuideH2 id="the-bag">Step one: the bag</GuideH2>
          <p>
            Everything below assumes your bag isn&apos;t with you. The airport has its own left-luggage counter — a
            separate building a short walk from arrivals, tiered pricing from about 60,000₫ for under 3 hours up
            to 100,000₫ for a full day. It works, but it has two real gaps: it&apos;s a walk across, not inside the
            terminal, and it doesn&apos;t open until 9am — useless if you land at 7.
          </p>
          <p>
            Stow is about 10 minutes from the airport by taxi or Grab, open 7am to 10pm every day. Hourly is
            15,000₫ with a 1-hour minimum, or 60,000₫ for the full day. Drop off takes under 3 minutes: tag the
            bag, get a photo receipt, go.
          </p>
        </div>

        <GuideTable
          columns={["Hours", "Location", "Price"]}
          rows={[
            { label: "Airport storage", values: ["9am-11:30pm", "Separate building, short walk from arrivals", "60,000-100,000₫ tiered by hour"] },
            { label: "Stow", values: ["7am-10pm, every day", "~10 min by taxi/Grab", "15,000₫/hr or 60,000₫/day"] },
          ]}
        />

        <div id="itineraries" className="flex flex-col gap-5 scroll-mt-24">
          <GuideH2 id="itineraries">What fits in your window</GuideH2>
          <p>
            Build every estimate around this math: 15+ minutes to deplane, then 10-20 minutes for immigration on a
            good day (up to two hours on a bad one), before you&apos;re even at the curb — then the same in reverse,
            plus a real airport buffer before your outbound flight. On a short layover, an hour or more disappears
            into airport process alone before sightseeing starts.
          </p>

          <div className="flex flex-col gap-2">
            <GuideH3>3-5 hours</GuideH3>
            <p>
              Realistically 1.5-3 usable hours after both ends of airport process. Stay within 10-15 minutes of the
              airport — My Khe Beach for a walk, the Cham Museum, or a wander through downtown. Don&apos;t attempt
              Hoi An or the Marble Mountains in this window.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <GuideH3>5-8 hours</GuideH3>
            <p>
              3-5 usable hours. The Marble Mountains (20-25 min away) plus a beach stop and Han Market fits
              comfortably. A rushed Hoi An visit is possible (45-60 min each way) but tight — expect most of the
              window spent on the road. The Dragon Bridge fire show only fits if your evening overlaps 8:30-9:30pm
              on a Friday, Saturday, or Sunday.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <GuideH3>8-12 hours</GuideH3>
            <p>
              6-9 usable hours — enough for a genuine half-day in Hoi An, or a fuller Da Nang loop: Han Market in
              the morning, the Cathedral and Cham Museum midday, My Khe Beach in the afternoon, dinner near the
              Dragon Bridge timed for the weekend fire show.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <GuideH3>12+ hours</GuideH3>
            <p>
              Enough to combine a Hoi An half-day with Da Nang sights at an unhurried pace, or do the full city
              loop without rushing any one stop.
            </p>
          </div>
        </div>

        <div id="stops" className="flex flex-col gap-5 scroll-mt-24">
          <GuideH2 id="stops">The stops, with real hours</GuideH2>
          <GuideFacts
            items={[
              { label: "My Khe Beach", value: "Best 5:30-8am or 3:30-6:30pm" },
              { label: "Han Market", value: "6am-10pm" },
              { label: "Con Market street food", value: "Ramps up after 3pm" },
              { label: "Da Nang Cathedral", value: "Closed Sundays" },
              { label: "Cham Museum", value: "7:30am-5pm, 60,000₫" },
              { label: "Dragon Bridge fire show", value: "Fri/Sat/Sun, 9pm only" },
            ]}
          />

          <GuideImage
            src="https://upload.wikimedia.org/wikipedia/commons/f/f6/Da_Nang_Dragon_Bridge_in_2015.jpg"
            alt="Dragon Bridge spanning the Han River in Da Nang"
            width={3072}
            height={1728}
            credit="Vuong Tri Binh"
            creditUrl="https://commons.wikimedia.org/wiki/File:Da_Nang_Dragon_Bridge_in_2015.jpg"
            license="CC BY-SA 4.0"
          />

          <p>
            The Dragon Bridge&apos;s fire-and-water show is a real, verified schedule — 9pm, Friday through Sunday
            only, about 30 minutes, free, no ticket. A weekday-evening layover simply won&apos;t catch it, no
            matter how the timing works out otherwise. Da Nang Cathedral closes Sundays for mass, so that&apos;s
            the one day it&apos;s off the list. Con Market&apos;s indoor food stalls run mornings, but the real
            street-food scene doesn&apos;t start until the afternoon crowd arrives.
          </p>

          <GuideImage
            src="https://upload.wikimedia.org/wikipedia/commons/d/d4/My_Khe_Beach_15.jpg"
            alt="My Khe Beach in Da Nang"
            width={4032}
            height={3024}
            credit="Christophe95"
            creditUrl="https://commons.wikimedia.org/wiki/File:My_Khe_Beach_15.jpg"
            license="CC BY-SA 4.0"
          />
        </div>

        <div id="getting-back" className="flex flex-col gap-3 scroll-mt-24">
          <GuideH2 id="getting-back">Getting back in time</GuideH2>
          <GuideList
            items={[
              "Domestic check-in: arrive 2 hours before departure (2.5 at peak 5-8am/4-7pm)",
              "International check-in: arrive 3 hours before (3.5 at peak) — the international terminal is the one running over capacity",
              "Avoid scheduling your return drive during Da Nang's rush hours, roughly 7:30-9am and 4:30-6pm",
              "Message Stow ahead if you're picking up close to 10pm closing",
              "Grab works reliably with the airport's wifi or a local SIM, but some drivers avoid the airport pickup zone — build in a few minutes for the pickup itself",
            ]}
          />
        </div>

        <div className="flex flex-col gap-3">
          <GuideH2>Questions people actually ask</GuideH2>
          <GuideFAQ items={FAQ_ITEMS} />
        </div>
      </GuideLayout>
    </>
  );
}
