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

const pageTitle = "Da Nang Visa Run Guide: Land Border vs Flying, Real Costs";
const pageDescription =
  "How a Vietnam visa run from Da Nang works: whether you still need one, the Lao Bao land border versus flying to Bangkok, real costs, the entry-port mistake that gets people turned away, overstay fines, and where to leave your bags.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides/da-nang-visa-run-guide" },
  openGraph: { title: `${pageTitle} | Stow`, description: pageDescription, url: "https://www.stowdanang.com/guides/da-nang-visa-run-guide" },
  twitter: { title: `${pageTitle} | Stow`, description: pageDescription },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Da Nang Visa Run Guide", path: "/guides/da-nang-visa-run-guide" },
]);

const FAQ_ITEMS = [
  {
    q: "Do I still need a visa run from Da Nang?",
    a: "Yes, if you want to stay past your current e-visa or visa-free days. Vietnam has no digital-nomad visa, and you cannot extend an e-visa from inside the country. So the only way to stay longer is to leave and come back on a fresh entry. The 90-day e-visa has made runs less frequent than before, about every three months instead of monthly, but it has not removed them.",
  },
  {
    q: "How much does a visa run from Da Nang cost?",
    a: "A land trip to the Lao Bao border with Laos costs about US$85 to US$115 all in (bus, the Laos visa on arrival, small border fees, and food). A flight to Bangkok is faster but costs more, usually US$150 to US$250 with a budget return flight and one night. On top of either, budget the new Vietnam e-visa: US$25 for single entry, US$50 for multiple entry.",
  },
  {
    q: "Can I get the new e-visa at the land border on the day?",
    a: "No. This is the most common and most expensive mistake. You must apply for the Vietnam e-visa online and wait for approval before you travel. It usually takes 3 to 5 working days, and the office is closed on weekends and public holidays. Apply at least 7 to 10 days ahead, or two weeks to be safe.",
  },
  {
    q: "Does my e-visa work at the Lao Bao crossing?",
    a: "Only if you chose it. The Vietnam e-visa is tied to the exact entry and exit points you pick on the form. If you pick the wrong point, or leave it as an airport when you cross by land, border officers can turn you away. For the Lao Bao land run, choose Lao Bao as your entry point.",
  },
  {
    q: "Is the e-visa single or multiple entry, and what does it cost?",
    a: "Both exist. Single entry costs US$25 and lets you in once. Multiple entry costs US$50 and lets you leave and return as often as you like within the same 90-day window. If you do runs, multiple entry is usually worth the extra US$25, because one visa covers several trips. Buy either one only on Vietnam's official portal.",
  },
  {
    q: "What is the closest border for a Da Nang visa run?",
    a: "Lao Bao, on the border with Laos, about 250 km west of Da Nang. That is roughly 4 to 6 hours each way, so 10 to 12 hours for a same-day round trip. It is the classic overland run from Da Nang and Hue. The crossing keeps daytime hours, so start early.",
  },
  {
    q: "What happens if I overstay by a day or two?",
    a: "Under the stricter rules in force since late 2025, a 1 to 15 day overstay is fined about 500,000 to 2,000,000 VND (roughly US$20 to US$80), and you can often pay it at the airport on your way out. Longer overstays cost much more, and past two weeks you risk deportation and a re-entry ban. Any fine also leaves a record. Plan the run before your stamp ends, not after.",
  },
  {
    q: "How often can I do a visa run before it is a problem?",
    a: "There is no fixed limit on paid e-visa runs, each one is a new, legal visa. But officers can question travelers with a long line of back-to-back tourist entries, and near-constant runs can draw extra checks. Three or four runs a year is normal. If you run every few weeks for a year or more, look at a longer-term visa instead.",
  },
  {
    q: "Is it faster to fly or take the bus?",
    a: "Flying, clearly. Da Nang to Bangkok is under two hours in the air, and you can do it in one long day or a single overnight. The Lao Bao bus is a 10 to 12 hour road day. Flying also tends to draw fewer questions at passport control. The land run only wins on price: land is cheaper, air is faster.",
  },
  {
    q: "Do I need to carry all my luggage on the run?",
    a: "No, and you should not. A run takes you out of Vietnam for one to three days and then brings you straight back to Da Nang. There is no reason to check out of your place or drag a large suitcase across a border or onto a budget flight. Most long-stayers travel light and leave their heavy bags in storage in the city.",
  },
];

const SOURCES = [
  { label: "Vietnam Immigration Department: official e-visa portal (evisa.gov.vn)", url: "https://evisa.xuatnhapcanh.gov.vn/trang-chu-ttdt", note: "the primary source for e-visa validity (up to 90 days, single or multiple entry), the official application domains, and current fees" },
  { label: "myvietnamvisa.com: e-visa fee and visa-exemption pages", url: "https://www.myvietnamvisa.com/vietnam-visa-exemption.html", note: "the US$25 and US$50 fees, the full visa-exemption country list, and the 45-day exemption window" },
  { label: "Vietcetera: Vietnam tightens overstay fines and deportation rules", url: "https://vietcetera.com/en/vietnam-tightens-regulations-on-foreigners-higher-fines-and-deportation-for-overstays", note: "the Decree 282/2025 fine brackets and the Decree 59/2026 deportation rules" },
  { label: "Vietnam News: new decree on penalties for foreign overstays", url: "https://vietnamnews.vn/society/1731763/viet-nam-tightens-penalties-for-foreign-overstays-under-new-decree.html", note: "state-media confirmation of the fine amounts" },
  { label: "danangvisarun.com: 2026 visa-run cost breakdown", url: "https://danangvisarun.com/blog/vietnam-visa-run-cost-2026-breakdown-en/", note: "Da Nang-specific land-run costs, the Lao Bao distance and timing, and the Laos fees" },
  { label: "The Digital Nomad Asia: Vietnam and the missing nomad visa", url: "https://www.thedigitalnomad.asia/digital-nomad-visa/vietnam-digital-nomad-visa/", note: "why there is no nomad visa and why long-stayers rely on the 90-day e-visa plus runs" },
  { label: "Shipped Away: Vietnam e-visa guide", url: "https://shippedaway.com/vietnam-e-visa/", note: "the port-specific rule: your entry and exit points must match what you chose on the form" },
];

export default async function VisaRunGuide() {
  const dict = await getDictionary("en");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideFaqJsonLd(FAQ_ITEMS)) }} />
      <GuideLayout
        dict={dict}
        currentPath="/guides/da-nang-visa-run-guide"
        eyebrow="Visa Runs"
        title="Da Nang Visa Run Guide"
        subhead="Whether you still need one, how the land border and the flight compare on money and time, the entry-point mistake that gets people turned away, and what to do with your bags."
        readingTime="12 min read"
        toc={[
          { id: "what-it-is", label: "What a visa run is" },
          { id: "still-need", label: "Do you still need one?" },
          { id: "who", label: "Who runs, and how often" },
          { id: "types", label: "Visa types, compared" },
          { id: "land", label: "Option A: the Lao Bao land run" },
          { id: "fly", label: "Option B: the fly-out run" },
          { id: "land-vs-fly", label: "Land vs fly: which to pick" },
          { id: "cost", label: "What it really costs" },
          { id: "mistakes", label: "The mistakes that cost people" },
          { id: "your-stuff", label: "What to do with your bags" },
          { id: "faq", label: "Questions people ask" },
        ]}
        related={[
          { title: "Da Nang Layover Guide", href: "/guides/da-nang-layover-guide", blurb: "Flying out for the run? The same airport steps apply on the way back in." },
          { title: "Marble Mountains Guide", href: "/guides/marble-mountains-guide", blurb: "Something to do with the spare day before or after your run." },
        ]}
      >
        <GuideLead>
          If you live in Da Nang long-term, you will need visa runs. A run is easy once you know the rules, and
          stressful when you skip them. This guide covers the cost, the two routes, and the one mistake that gets
          people turned away at the border.
        </GuideLead>

        <GuideTLDR>
          Yes, you still need a <strong>visa run</strong> to stay past your current e-visa or visa-free days.
          Vietnam has no digital-nomad visa, and you cannot extend an e-visa from inside the country. You have two
          choices. A <strong>land trip to the Lao Bao border with Laos</strong> costs about US$85 to US$115 and
          takes a long 10 to 12 hour day. A <strong>flight to Bangkok, Kuala Lumpur, or Vientiane</strong> is faster
          but costs about US$150 to US$250. Apply for the new e-visa online first: it takes{" "}
          <strong>3 to 5 working days</strong> and must name your <strong>exact entry point</strong>. You will be
          away one to three days, so most people travel light and leave their heavy bags in storage.
        </GuideTLDR>
        <GuideFacts
          items={[
            { label: "E-visa fee", value: "US$25 single / US$50 multiple" },
            { label: "E-visa validity", value: "Up to 90 days" },
            { label: "Processing", value: "3-5 working days" },
            { label: "Nearest land border", value: "Lao Bao (Laos)" },
            { label: "Lao Bao, one-way", value: "~250 km, 4-6 hrs" },
            { label: "Fastest flight out", value: "Bangkok, under 2 hrs" },
          ]}
        />

        <div id="what-it-is" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="what-it-is">What a Da Nang visa run is</GuideH2>
          <p>
            A visa run means leaving Vietnam before your visa or visa-free stamp ends, then coming back on a new one.
            You cross into a nearby country, get a fresh Vietnam e-visa, and return. People do this because Vietnam
            does not let tourists extend an e-visa from inside the country, and there is no long-stay nomad visa.
          </p>
          <p>
            Da Nang is an easy base for it. The airport is about ten minutes from the city, with direct flights to
            Bangkok and Kuala Lumpur. The nearest land border, Lao Bao, is a long day trip to the west. Most people
            doing runs here are remote workers, expats, and long-stay travelers who want a few more months in
            central Vietnam.
          </p>
        </div>

        <div id="still-need" className="flex flex-col gap-5 scroll-mt-[88px]">
          <GuideH2 id="still-need">Do you still need a visa run?</GuideH2>
          <p>
            Settle this first, because Vietnam&apos;s rules eased in 2023 to 2025 and a lot of old advice is wrong.
            For some people the answer is now &ldquo;less often than you think.&rdquo; For others it is still
            &ldquo;every 90 days, no way around it.&rdquo;
          </p>

          <GuideH3>The 90-day e-visa changed the rhythm</GuideH3>
          <p>
            Since August 2023, the Vietnam e-visa allows a stay of up to 90 days. A multiple-entry version lets you
            come and go within that window. It is fully online, open to every nationality, and costs US$25 for
            single entry or US$50 for multiple entry. That turned a monthly chore into a quarterly one for most
            long-stayers. But it did not create a way to renew from inside Vietnam. When the 90 days end, you still
            leave and come back.
          </p>

          <GuideH3>Visa exemptions, check whether you are on the list</GuideH3>
          <p>
            About 39 nationalities can enter Vietnam visa-free for a set number of days. A group of European
            countries, plus Japan and South Korea, get 45 days under a tourism programme that runs for a limited
            time, so check whether it still applies. Most Southeast Asian neighbours get 30 days. One key point:{" "}
            <strong>US, Canadian, and Australian passports are not on the exemption list</strong> and need an e-visa,
            however short the trip.
          </p>

          <GuideCallout label="The part that has not changed">
            You still cannot extend a tourist e-visa from inside Vietnam, and there is still no digital-nomad visa.
            The reforms made stays longer and entries easier. They did not remove the need to leave and re-enter to
            reset your stay. If you plan to be here past your current window, assume a run is still part of the plan.
          </GuideCallout>
        </div>

        <div id="who" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="who">Who runs, and how often</GuideH2>
          <p>
            If your passport is not on the exemption list, or you want to stay past the 90 days an e-visa gives you,
            you are in run territory. That covers most Western long-stayers. On the 90-day multiple-entry e-visa, a
            run every three months keeps you legal for as long as you like.
          </p>
          <p>
            Three or four runs a year is normal and unremarkable. The thing to watch is the pattern. A passport full
            of back-to-back tourist entries can draw questions from immigration, and in rare cases extra checks on
            re-entry. If the cycle has become permanent, a longer-term route, a business visa, or a temporary
            residence card tied to work, removes it. It is worth pricing against a year of runs.
          </p>
        </div>

        <div id="types" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="types">Visa types, compared</GuideH2>
          <p>
            Before you plan the trip, be clear on what you are renewing. These are the options a long-stayer in Da
            Nang chooses between.
          </p>
          <GuideTable
            columns={["Duration", "Entries", "Cost", "Where you get it"]}
            rows={[
              { label: "E-visa (single)", values: ["Up to 90 days", "One", "US$25", "Online, official portal, 3-5 working days"] },
              { label: "E-visa (multiple)", values: ["Up to 90 days", "Unlimited in window", "US$50", "Online, official portal, 3-5 working days"] },
              { label: "Exemption (EU group, Japan, Korea)", values: ["45 days", "Per entry", "Free", "Stamped on arrival, listed nationalities"] },
              { label: "Exemption (ASEAN)", values: ["30 days", "Per entry", "Free", "Stamped on arrival"] },
              { label: "Business visa or TRC", values: ["1-10 years", "Unlimited", "Varies", "Needs sponsorship or a work permit"] },
            ]}
          />
          <p className="text-[13px] text-[#9CA3AF]">
            The government sets these fees and durations, and they change. The figures above were current at the time
            of writing. Check the current fee on the official portal before you apply.
          </p>
        </div>

        <div id="land" className="flex flex-col gap-5 scroll-mt-[88px]">
          <GuideH2 id="land">Option A: the Lao Bao land run to Laos</GuideH2>
          <p>
            The overland run from Da Nang goes west to the Lao Bao crossing into Laos, about 250 km, or 4 to 6
            hours each way. It is the cheapest option, and the usual choice if you are on a budget and have a full
            day to spare.
          </p>

          <GuideH3>How the day goes</GuideH3>
          <p>
            A sleeper or VIP bus is the normal way out, about 4 to 6 hours to the border. You clear Vietnam exit
            immigration, walk across, and pay for a <strong>Laos visa on arrival in cash</strong> (about US$40 to
            US$50, depending on nationality). Then you turn around and re-enter Vietnam on the fresh e-visa you
            already had approved. Laos also charges a small digital border fee, a fraction of a dollar. The border
            keeps daytime hours, so leave early. Crossing outside those hours can bring a small extra fee.
          </p>
          <p>
            Two warnings come up again and again. First, <strong>bring cash in small US dollar notes</strong>, there are no reliable ATMs at the crossing, and the Laos fee is cash only. Second, a same-day turnaround
            only works if your new Vietnam e-visa is <em>already approved</em>. You cannot get one at the border.
          </p>

          <GuideCallout label="The mistake that gets people turned away">
            The Vietnam e-visa is <strong>tied to the entry and exit points you choose on the form</strong>. It is
            only valid at those points. For the Lao Bao land run, you must choose <strong>Lao Bao</strong> as your
            entry point, not a Da Nang or Hanoi airport, and not a different land gate. Choose wrong, and officers
            can refuse you on an otherwise valid visa. It is the most common reason a run goes wrong, and most
            run-service pages skip it.
          </GuideCallout>
        </div>

        <div id="fly" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="fly">Option B: the fly-out run</GuideH2>
          <p>
            Flying out and back is faster and more predictable, and it tends to draw fewer questions than a repeat
            land crossing. You pay for that with a higher fare. From Da Nang the practical airports are:
          </p>
          <GuideTable
            columns={["Flight time", "Round trip from", "Notes"]}
            rows={[
              { label: "Bangkok", values: ["~2 hrs", "~US$90-150", "Most flights; the default fly-out"] },
              { label: "Kuala Lumpur", values: ["~3 hrs", "~US$130", "Direct on budget airlines"] },
              { label: "Vientiane", values: ["~1 hr 20 min", "~US$180", "Closest capital; fewer daily flights"] },
              { label: "Singapore", values: ["~3 hrs", "~US$230", "More expensive; good for a stopover"] },
            ]}
          />
          <p>
            A same-day trip out and back is possible with the right flights, but it leaves no room for a delay, and
            most people who try it find it exhausting. The easier version is one overnight: fly out, sleep in
            Bangkok, fly back the next day. Door to door that is about a day, not much longer than a hard Lao Bao
            trip, with a city in between instead of a bus seat.
          </p>
          <p className="text-[13px] text-[#9CA3AF]">
            Fares are seasonal and move a lot with how early you book, so treat these as typical &ldquo;from&rdquo;
            prices, not fixed ones. Book the return flight before you go. Some airlines want proof of onward travel
            to let you board, even though the e-visa itself does not require it.
          </p>
        </div>

        <div id="land-vs-fly" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="land-vs-fly">Land vs fly: which should you pick?</GuideH2>
          <GuideTable
            columns={["Real cost", "Time away", "What it is like"]}
            rows={[
              { label: "Land (Lao Bao)", values: ["~US$85-115", "10-12 hrs, one hard day", "Cheapest; long road hours, cash only, no ATMs at the border"] },
              { label: "Fly (Bangkok)", values: ["~US$150-250+", "Half a day to one overnight", "Faster, more predictable, fewer questions; costs more, book ahead"] },
            ]}
          />
          <p>
            A simple rule: <strong>go by land if you are counting every dong and have a day to spare; fly if your
            time is worth more than the fare difference</strong>. Neither is better. They trade money for hours. Both
            figures leave out the new Vietnam e-visa (US$25 or US$50), which you pay either way.
          </p>

          <GuideImage
            src="https://upload.wikimedia.org/wikipedia/commons/4/48/Da_Nang_International_Airport%2C_Vietnam.jpg"
            alt="Da Nang International Airport terminal, the departure point for a fly-out visa run"
            width={5184}
            height={3456}
            credit="Gary Todd"
            creditUrl="https://commons.wikimedia.org/wiki/File:Da_Nang_International_Airport,_Vietnam.jpg"
            license="CC0"
          />
        </div>

        <div id="cost" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="cost">What a Da Nang visa run really costs</GuideH2>
          <p>
            Per trip, add up three things: the route, the new e-visa, and the extras. A land run is about US$85 to
            US$115. A fly-out with one night is about US$150 to US$250 or more. The e-visa is US$25 or US$50. The
            extras are food, a Grab to the bus station or airport, and a hotel if you fly.
          </p>
          <p>
            A single land run comes to roughly US$110 to US$165 all in. A fly-out with one night is closer to US$200
            to US$350. Over a year, that adds up: four land runs are about US$450 to US$650 plus visas, four
            fly-outs closer to US$800 to US$1,400 plus visas. Seen that way, the visa fee is small next to travel and
            lost work days. That is why people who have been here a while treat the run as a short break to plan,
            not a chore to survive.
          </p>
        </div>

        <div id="mistakes" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="mistakes">The mistakes that cost people</GuideH2>
          <GuideList
            items={[
              "Applying for the e-visa too late. It takes 3 to 5 working days, and the office skips weekends and holidays. Apply 7 to 14 days ahead, not the night before.",
              "Choosing the wrong entry point. The e-visa only works at the points you selected; a land run needs Lao Bao, not an airport.",
              "Cutting the timing fine. Travel 5 to 7 days before your stamp ends, so a delayed flight or slow approval does not tip you into overstay.",
              "Carrying only large notes. The Laos visa on arrival and small border fees are cash only, in small US dollars.",
              "Not checking your new entry stamp before you leave the counter. Mistakes are rare but almost impossible to fix later.",
              "Reusing your passport-page scan as your e-visa photo. A separate, plain-background photo avoids an automatic rejection.",
            ]}
          />

          <GuideH3>Overstay fines got stricter, do not test them</GuideH3>
          <p>
            Vietnam tightened its overstay rules under Decree 282/2025 (in force from late 2025), with more
            deportation rules under Decree 59/2026. A 1 to 15 day overstay is fined about 500,000 to 2,000,000 VND,
            and you can usually pay at the airport on the way out. Beyond that it climbs fast, millions of dong for
            a few weeks, up to tens of millions and forced deportation with a multi-year re-entry ban in serious
            cases. Even a small fine leaves a record. Give yourself a buffer so you never find out where the
            brackets start.
          </p>
        </div>

        <div id="your-stuff" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="your-stuff">What to do with your bags while you are gone</GuideH2>
          <p>
            A run takes you out of Vietnam for one to three days and then drops you right back in Da Nang. So there
            is no reason to check out of your place, drag a suitcase across the Lao Bao border, or pay budget-airline
            baggage fees to fly your things to Bangkok and back. Travel light for the run, and leave the heavy things
            behind.
          </p>

          <GuideStowCallout
            heading="Between places, or just traveling light for the run?"
            facts={[
              { label: "Up to 1 week", value: "150,000 VND flat" },
              { label: "Up to 1 month", value: "300,000 VND flat" },
              { label: "Up to 4 months", value: "1,000,000 VND flat" },
            ]}
          >
            Stow&apos;s flat plans match how a run works. You pay one fixed price for up to a week, a month, or four
            months, whether you are back in two days or two weeks. If you are <strong>between leases</strong>, a
            month of storage costs far less than rent on an empty room while you are out of the country. We are at 55
            Ba Bang Nhan in Ngu Hanh Son, about ten minutes from the airport, so you can leave your bags on the way
            out and collect them on the way back in. Every item gets a photo, a condition receipt, a numbered tag,
            and a locked, camera-watched long-stay zone.
          </GuideStowCallout>

          <p>
            If you are weighing a long-stay plan, our{" "}
            <Link href="/#pricing" className="text-[#E8742C] underline underline-offset-2">storage prices</Link>{" "}
            and the{" "}
            <Link href="/trust-safety" className="text-[#E8742C] underline underline-offset-2">what we store and how we keep it safe</Link>{" "}
            page cover the details the run-service sites leave out.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <GuideH2>Quick checklist before you go</GuideH2>
          <GuideList
            items={[
              "New e-visa applied for and approved before you leave, with the correct entry point selected",
              "Passport valid at least 6 months, with 2 or more blank pages",
              "Land run: cash in small US dollars for the Laos visa on arrival and border fees, no ATMs at the crossing",
              "Fly-out: return flight booked, in case your airline asks for proof of onward travel",
              "A timing buffer: travel 5 to 7 days before your stamp ends, not on the last day",
              "Heavy bags left in storage in Da Nang if they are not coming on the run",
            ]}
          />
        </div>

        <div id="faq" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="faq">Questions people ask</GuideH2>
          <GuideFAQ items={FAQ_ITEMS} />
        </div>

        <GuideSources items={SOURCES} />

        <p className="text-[13px] text-[#9CA3AF]">
          The Vietnamese government sets visa fees, exemption lists, and overstay fines, and they change.
          Enforcement can also vary by nationality and situation. This guide reflects the rules at the time of
          writing and is not legal advice. Always confirm the current requirements on{" "}
          <a href="https://evisa.xuatnhapcanh.gov.vn/trang-chu-ttdt" target="_blank" rel="noopener noreferrer" className="text-[#E8742C] underline">
            Vietnam&apos;s official e-visa portal
          </a>{" "}
          before you travel.
        </p>
      </GuideLayout>
    </>
  );
}
