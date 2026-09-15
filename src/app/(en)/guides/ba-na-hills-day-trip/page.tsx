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

const pageTitle = "Ba Na Hills Day Trip: Golden Bridge, 2026 Ticket Prices, the Fog";
const pageDescription =
  "What is actually at the top of Ba Na Hills, the real 2026 ticket prices and the weekend surcharge, the record-holding cable car, an honest is-it-worth-it, the fog and crowd timing most guides skip, and where to leave your bags.";

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
    q: "How much is a Ba Na Hills ticket in 2026?",
    a: "The standard cable-car and park-entry ticket is about 1,000,000 VND for adults and children over 1.4 m, about 800,000 VND for children 1 to 1.4 m, and free for under 1 m. Da Nang residents with local ID pay less, around 650,000 VND for an adult. There is a weekend and public-holiday surcharge of about 50,000 VND per person. Prices change and carry surcharges, so confirm the current figure on the official Sun World site before you go.",
  },
  {
    q: "Is the food included in the Ba Na Hills ticket?",
    a: "No. The standard ticket covers the cable car, the Golden Bridge, French Village, Fantasy Park, and the gardens, but not the lunch buffet. You either buy a combo ticket with the buffet included (around 1,300,000 VND for an adult) or pay for a buffet on the day (around 380,000 VND). The basic ticket does come with a small drink or fast-food voucher.",
  },
  {
    q: "How long is the Ba Na Hills cable car, and is it a world record?",
    a: "Yes. Guinness World Records lists it as the longest non-stop single-track cable car at 5,801 metres, set in 2013, and the system holds several records, including one of the largest gaps in height between stations. The ride up is part of the experience, not just transport: about 15 to 20 minutes over forest and waterfalls.",
  },
  {
    q: "Are the Golden Bridge's giant hands made of stone?",
    a: "No, and this surprises people. The two huge hands holding the bridge are built from fiberglass over a wire-mesh frame, then finished to look like old carved stone. The illusion is convincing in photos; up close you can tell. The bridge opened in June 2018, is 150 metres long, and sits at about 1,414 metres above sea level.",
  },
  {
    q: "Is Ba Na Hills worth it, or is it too touristy?",
    a: "Both are true, and which matters more is up to you. It is a polished, artificial, very crowded fantasy park, and some of the rocks are literally concrete, so if you want untouched nature or local culture you will be let down. But on its own terms, the Golden Bridge, the cable-car ride, and the cool mountain air are genuinely impressive, and many people who resisted going for years end up glad they did. Go with the right expectations and it is a fun full day.",
  },
  {
    q: "How much time do I need, and can I do it as a half-day?",
    a: "A half-day works if the Golden Bridge and the cable car are the priority: arrive at the base station by about 8 AM, ride up, see the bridge and French Village, and come back down by early afternoon, about 3 to 4 hours on the mountain. A full day (5 to 6 hours) adds Fantasy Park, the gardens, the shows, and a slower lunch. Either way, arriving early is the best decision you will make.",
  },
  {
    q: "How do I get from Da Nang to Ba Na Hills?",
    a: "It is about 25 to 42 km west of Da Nang (sources vary because the road winds), roughly 45 minutes to an hour by car. A Grab or taxi is about 300,000 to 400,000 VND one-way, though finding a return Grab at the base can be hard. A private car with driver waits for you and is the most flexible. Shuttle buses run for about US$6 to US$10 per person on a fixed schedule. Every option is separate from the cable-car ticket.",
  },
  {
    q: "What should I wear? Is it cold at the top?",
    a: "It is noticeably cooler than the coast. The top sits around 1,487 metres and usually runs 8 to 10 degrees C colder than Da Nang, dropping to 14 to 18 degrees C in early-morning fog even in the hot months. Bring a light jacket or fleece whatever the weather in Da Nang, plus closed shoes with grip for the stone paths and stairs, and something waterproof if fog or rain is likely.",
  },
  {
    q: "What if it is foggy? Should I reschedule?",
    a: "There is no reliable live fog forecast for the top, so it is a gamble either way. The good news is that fog often clears around midday, so if you arrive to a whiteout you may still get clear views later. Some visitors find the mist atmospheric. If clear Golden Bridge photos are the goal, the dry season (roughly February to September) and an early arrival give you the best odds.",
  },
  {
    q: "Is the Linh Ung Pagoda at Ba Na the same as the famous Lady Buddha one?",
    a: "No, they are different pagodas that share a name. The famous 67-metre Lady Buddha statue is at Linh Ung Pagoda on the Son Tra Peninsula, by the coast. The Ba Na version is a smaller mountaintop temple included in the cable-car ticket. It is the same naming overlap you find at the Marble Mountains, which has its own third Linh Ung Pagoda.",
  },
];

const SOURCES = [
  { label: "Guinness World Records: longest non-stop single-track cable car", url: "https://www.guinnessworldrecords.com/world-records/longest-non-stop-single-track-cable-car", note: "the primary source for the 5,801 m record, the 2013 date, and the operator" },
  { label: "Danang Fantasticity: 2026 Ba Na Hills three-day ticket validity", url: "https://danangfantasticity.com/en/news/from-2026-cable-car-tickets-at-sun-world-ba-na-hills-will-be-valid-for-up-to-three-consecutive-days", note: "the official 2026 policy: three-day validity, resident vs non-resident pricing, and inclusions" },
  { label: "Wikipedia: Ba Na Hills", url: "https://en.wikipedia.org/wiki/B%C3%A0_N%C3%A0_Hills", note: "the 1919 French founding, the elevation and distance from Da Nang, and the cable-car history" },
  { label: "Wikipedia: Golden Bridge (Vietnam)", url: "https://en.wikipedia.org/wiki/Golden_Bridge_(Vietnam)", note: "the June 2018 opening, the 150 m dimensions, the fiberglass-and-wire-mesh hands, and the architect" },
  { label: "Sun Paradise Land: Ba Na Hills 2026 ticket prices", url: "https://sunparadiseland.com/en/SunParadiseLandDaNang/tin-tuc/ba-na-hills-ticket-prices-2026-cable-car-fares-and-saving-tips-7745", note: "the 2026 adult and child prices and the weekend/holiday surcharge" },
  { label: "Hoi An Day Trip: Ba Na Hills tickets and buffet", url: "https://hoiandaytrip.com/ba-na-hills-tickets/", note: "what the standard ticket includes and excludes, and the combo and buffet pricing" },
  { label: "Da Nang Journey: Is Ba Na Hills worth it?", url: "https://danangjourney.com/is-ba-na-hills-worth-it/", note: "a balanced local view of the pros and cons, and the crowd-timing advice" },
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
        subhead="The Golden Bridge, a record-holding cable car, and a mountaintop park that runs 10 degrees colder than the beach you left that morning. Here is the honest version: prices, timing, fog, and all."
        readingTime="11 min read"
        toc={[
          { id: "what", label: "What Ba Na Hills is" },
          { id: "bridge", label: "The Golden Bridge" },
          { id: "cable-car", label: "The record-setting cable car" },
          { id: "tickets", label: "2026 tickets, in full" },
          { id: "getting-there", label: "Getting there from Da Nang" },
          { id: "timing", label: "Half-day vs full-day, and when to arrive" },
          { id: "weather", label: "Weather, fog, and what to wear" },
          { id: "food", label: "Food at the top" },
          { id: "worth-it", label: "Is it worth it? An honest take" },
          { id: "your-stuff", label: "Doing it on your arrival or departure day" },
          { id: "faq", label: "Questions people ask" },
        ]}
        related={[
          { title: "Da Nang to Hoi An Day Trip", href: "/guides/da-nang-to-hoi-an-day-trip", blurb: "The other big day trip from Da Nang, in the opposite direction." },
          { title: "Da Nang Layover Guide", href: "/guides/da-nang-layover-guide", blurb: "Ba Na Hills needs a full day. This covers shorter windows instead." },
        ]}
      >
        <GuideLead>
          Ba Na Hills is the most photographed place near Da Nang, and the most argued about. It is a full day, not a
          quick stop, and whether it is a good one comes down to expectations, timing, and the weather doing you a
          favour. Here is what to expect, and what it costs in 2026.
        </GuideLead>

        <GuideTLDR>
          Ba Na Hills is a Sun World mountaintop park about <strong>25 to 42 km west of Da Nang</strong> (roughly 45
          minutes to an hour by car), famous for the <strong>Golden Bridge</strong> and a record-setting cable car,
          the world&apos;s longest non-stop single-track at <strong>5,801 metres</strong>. A 2026 ticket is about{" "}
          <strong>1,000,000 VND for adults</strong> (children priced by height; Da Nang residents pay less; a weekend
          surcharge applies), and it now stays valid for up to three days. As a day trip it works best if you{" "}
          <strong>leave Da Nang by 7:30 to 8 AM</strong> and reach the Golden Bridge before the crowds peak (about
          10:30 AM to 2:30 PM). Is it worth it? If you go knowing it is a polished, very touristy fantasy park rather
          than raw nature, most people find the bridge, the cable car, and the cool air genuinely impressive.
        </GuideTLDR>
        <GuideImage
          src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Golden_Bridge_at_Ba_Na_Hills_20250718.jpg"
          alt="The Golden Bridge at Ba Na Hills, held up by two giant hands styled to look like weathered stone"
          width={4096}
          height={2649}
          credit="DvTor8303"
          creditUrl="https://commons.wikimedia.org/wiki/File:Golden_Bridge_at_Ba_Na_Hills_20250718.jpg"
          license="CC0"
        />

        <GuideFacts
          items={[
            { label: "Distance", value: "~25-42 km west" },
            { label: "From Da Nang", value: "45 min - 1 hr by car" },
            { label: "Adult ticket (2026)", value: "~1,000,000 VND" },
            { label: "Cable car ride", value: "~15-20 min, 5,801 m" },
            { label: "Top temperature", value: "8-10 degrees cooler" },
            { label: "Time to allow", value: "Half to full day" },
          ]}
        />

        <div id="what" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="what">What Ba Na Hills is</GuideH2>
          <p>
            Ba Na Hills is a Sun World resort built across a mountaintop about 1,487 to 1,500 metres up, west of Da
            Nang. The setting has real history: the French built a hill station here in 1919 as a cool-climate
            escape, and at its 1930s peak it held more than 200 villas. But almost nothing you see today is old.
            Since about 2009 the developer Sun Group has turned it into a purpose-built fantasy park: a French-styled
            village, indoor games, flower gardens, temples, shows, and the two headline attractions, the cable car
            and the Golden Bridge.
          </p>
          <p>
            That is the key to enjoying it. It is a beautifully made theme park with genuinely world-class views, not
            a heritage site or a nature reserve. Judge it as the first, and it is a great day out.
          </p>
        </div>

        <div id="bridge" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="bridge">The Golden Bridge (Cau Vang)</GuideH2>
          <p>
            The bridge that put Ba Na Hills on every feed. It opened in June 2018, runs 150 metres in a curve, and
            looks like it is lifted out of the hillside by two huge weathered hands. It went viral worldwide almost
            at once and made TIME&apos;s list of the World&apos;s 100 Greatest Places that year.
          </p>
          <GuideCallout label="The detail people get wrong">
            The giant hands are not stone. They are built from fiberglass over a wire-mesh frame and finished to look
            like old carved rock, convincing in photos, less so up close. It is a stage set, brilliantly done, and
            knowing that beforehand tends to make people enjoy it more, not less. The bridge sits at about 1,414
            metres, with eight arches spanning the drop.
          </GuideCallout>
          <p>
            For photos, arrive as early as you can, ideally before about 8:30 to 9 AM, when the light is soft and the
            crowds have not built. By late morning the bridge is packed, and it is narrow, so the difference between
            an early photo and a mid-morning one is dramatic.
          </p>
        </div>

        <div id="cable-car" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="cable-car">The record-setting cable car</GuideH2>
          <p>
            You reach the top by cable car, and the ride is part of the attraction, not just a lift. Guinness World
            Records lists the system as the longest non-stop single-track cable car in the world, at 5,801 metres,
            set in 2013, and it holds several records, including one of the largest gaps in height between stations
            anywhere. The 15-to-20-minute ride glides over dense forest and waterfalls. A sixth line was added in
            2021 to move the crowds.
          </p>
        </div>

        <div id="tickets" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="tickets">2026 tickets, in full</GuideH2>
          <p>
            One ticket covers the round-trip cable car and almost everything built into the resort: the Golden
            Bridge, French Village, Fantasy Park&apos;s indoor games, the gardens, the pagoda, and the shows. Food is
            the main thing it leaves out.
          </p>
          <GuideTable
            columns={["Non-resident", "Da Nang resident"]}
            rows={[
              { label: "Adult / child over 1.4 m", values: ["~1,000,000 VND", "~650,000 VND"] },
              { label: "Child 1 - 1.4 m", values: ["~800,000 VND", "~550,000 VND"] },
              { label: "Child under 1 m", values: ["Free", "Free"] },
              { label: "Weekend / holiday surcharge", values: ["+50,000 VND", "+50,000 VND"] },
              { label: "Combo with lunch buffet (adult)", values: ["~1,300,000 VND", "n/a"] },
            ]}
          />
          <p>
            A useful 2026 change: each cable-car ticket is now valid for <strong>up to three days</strong>, so you
            can go back for a second, quieter look at the views without paying again. The Da Nang-resident rate needs
            local ID and does not apply to tourists. Lunch is not in the basic ticket, so buy the combo or a buffet
            on the day (about 380,000 VND). A few things cost extra even with a ticket, such as the Alpine Coaster
            (about 70,000 VND a ride) and the Wax Museum (about 100,000 VND).
          </p>
          <p className="text-[13px] text-[#9CA3AF]">
            Ba Na Hills changes prices and runs surcharges, so treat these as 2026 figures and confirm the current
            headline price on the official Sun World site before you commit to a date.
          </p>
        </div>

        <div id="getting-there" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="getting-there">Getting there from Da Nang</GuideH2>
          <p>
            The resort is about 25 to 42 km west of the city, the wide range is because the road winds, so about 45
            minutes to an hour by car. Every option below is separate from the cable-car ticket you buy at the base.
          </p>
          <GuideTable
            columns={["Cost", "Flexibility", "Best for"]}
            rows={[
              { label: "Grab / taxi", values: ["~300,000-400,000 VND one-way", "Medium; a return Grab can be hard to find", "Couples, spontaneous trips"] },
              { label: "Private car + driver", values: ["Varies (waits for you)", "Highest; hotel pickup, flexible return", "Families, comfort"] },
              { label: "Shuttle bus", values: ["~US$6-10/person", "Low; fixed morning out, afternoon back", "Solo or budget travelers"] },
              { label: "Organized tour", values: ["Varies by bundle", "Low; set schedule", "First-timers who want it all arranged"] },
            ]}
          />
          <p className="text-[13px] text-[#9CA3AF]">
            One thing to plan for: at the base station at the end of the day, on-demand Grabs can be scarce, so a
            private car or a pre-booked return saves a stressful wait.
          </p>
        </div>

        <div id="timing" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="timing">Half-day vs full-day, and when to arrive</GuideH2>
          <p>
            The most important decision is the arrival time. Aim to be at the base cable-car station by about 8 AM.
            Crowds build from mid-morning and peak roughly 10:30 AM to 2:30 PM as the tour groups arrive. The early
            cars are quieter, the air is cooler, and the Golden Bridge is photographable before it fills up.
          </p>
          <GuideTable
            columns={["Time on the mountain", "What you cover", "Head down by"]}
            rows={[
              { label: "Half-day (~3-4 hrs)", values: ["Cable car + Golden Bridge + a quick French Village", "Early afternoon, before the rush"] },
              { label: "Full day (~5-6 hrs)", values: ["Plus Fantasy Park, gardens, shows, a hilltop lunch", "Late afternoon, once crowds thin after 3 PM"] },
            ]}
          />
          <p>
            A half-day suits photo-focused visitors and anyone doing this on an arrival or departure day. A full day
            suits families and first-timers who want to see everything. Either way, go early.
          </p>
        </div>

        <div id="weather" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="weather">Weather, fog, and what to wear</GuideH2>
          <p>
            This is the detail most guides skip, and it changes the day. The top sits around 1,487 metres and runs 8
            to 10 degrees C cooler than the coast, often 17 to 25 degrees C, dropping to 14 to 18 degrees C in
            early-morning fog even in the hottest months. Bring a light jacket or fleece whatever the weather in Da
            Nang, and closed shoes with grip for the stone paths and stairs.
          </p>
          <GuideCallout label="On the fog">
            Fog and low cloud are common up here, pushed up off the sea, and there is no reliable live forecast for
            the top, so it is a gamble either way. The consolation: fog often clears around midday, so arriving to a
            whiteout does not mean the day is ruined, the views may open up later. For the best odds of a clear
            Golden Bridge, the dry season (roughly February to September) beats the foggier, quieter October to
            February stretch.
          </GuideCallout>
        </div>

        <div id="food" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="food">Food at the top</GuideH2>
          <p>
            There is a spread of buffet restaurants up top serving Vietnamese, Asian, and European food, with lunch
            generally running about 10:30 AM to 3 PM. Eat before noon or after about 1:30 PM to miss the worst of the
            lunch crush. If you know you will eat there, the combo ticket with the buffet included is usually better
            value than buying a buffet separately on the day. Later on, Beer Plaza does a dinner buffet with live
            music if you stay into the evening.
          </p>
        </div>

        <div id="worth-it" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="worth-it">Is Ba Na Hills worth it? An honest take</GuideH2>
          <p>Opinions split, and both sides are right about different things.</p>
          <GuideTable
            columns={["The case for", "The case against"]}
            rows={[
              { label: "The spectacle", values: ["The Golden Bridge and cable car are genuinely impressive", "It is a fantasy park, not nature; some rocks are literally concrete"] },
              { label: "The feel", values: ["French Village, gardens, and shows are fun; the cool air is a relief", "Very touristy and crowded; an exit-through-the-gift-shop feel"] },
              { label: "Who it suits", values: ["Anyone who wants the photo and an easy, fun day", "Anyone after untouched nature or local culture"] },
            ]}
          />
          <p>
            The way to decide: accept it as a beautifully designed mountaintop theme park with world-class views,
            arrive early, and you will likely have a great day. Go expecting wilderness or heritage and you will
            leave underwhelmed. Many people who avoided it for years for being too touristy end up glad they went.
          </p>
          <p>
            Torn between this and the region&apos;s other big day trip? Our{" "}
            <Link href="/guides/da-nang-to-hoi-an-day-trip" className="text-[#E8742C] underline underline-offset-2">
              Da Nang to Hoi An day trip
            </Link>{" "}
            guide covers that one, a slower, more atmospheric day in the opposite direction.
          </p>
        </div>

        <div id="your-stuff" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="your-stuff">Doing it on your arrival or departure day</GuideH2>
          <p>
            Ba Na Hills is a common first-or-last-day plan. You land in the morning before hotel check-in, or you
            have a late-evening flight and want one more big attraction. Both leave you with the same problem: a full
            day of cable-car queues, stairs, and the Golden Bridge is no place for a suitcase, and the mountain is
            not where you want to be sorting out where to leave one.
          </p>

          <GuideStowCallout
            eyebrow="Before your early start"
            heading="Leave the suitcase in the city. Do not take it up a mountain."
            facts={[
              { label: "From the airport", value: "~10 min" },
              { label: "Full day", value: "60,000 VND (up to 24h)" },
              { label: "Open", value: "7am - 10pm daily" },
            ]}
          >
            Stow is at 55 Ba Bang Nhan in Ngu Hanh Son, about ten minutes from Da Nang airport and open{" "}
            <strong>7am to 10pm</strong>. So you can leave your bags near the airport on your arrival morning, spend
            the whole day hands-free at Ba Na Hills, and collect them before check-in or your flight out. The daily
            rate is 60,000 VND for up to 24 hours, and every bag is tagged and photographed at drop-off. It is the
            same move that makes a first day (before your room is ready) or a last day (after checkout) actually
            usable.
          </GuideStowCallout>
        </div>

        <div className="flex flex-col gap-3">
          <GuideH2>Quick checklist</GuideH2>
          <GuideList
            items={[
              "Leave Da Nang by 7:30 to 8 AM and be at the cable-car station by about 8 AM to beat the crowds.",
              "Bring a light jacket. The top runs noticeably colder than the coast.",
              "Wear closed shoes with grip. French Village and the gardens involve a lot of walking.",
              "February to September gives the best odds of a clear, fog-free Golden Bridge.",
              "Arrange a return car in advance. Grabs can be scarce at the base at the end of the day.",
              "Confirm the current ticket price on the official site. It changes and carries a weekend surcharge.",
            ]}
          />
        </div>

        <div id="faq" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="faq">Questions people ask</GuideH2>
          <GuideFAQ items={FAQ_ITEMS} />
        </div>

        <GuideSources items={SOURCES} />

        <p className="text-[13px] text-[#9CA3AF]">
          The site operator sets ticket prices and policies, and they shift by season, with weekend and holiday
          surcharges. This guide reflects 2026 pricing at the time of writing. Confirm the current figure on the
          official Sun World Ba Na Hills site if you are planning tightly around a specific price.
        </p>
      </GuideLayout>
    </>
  );
}
