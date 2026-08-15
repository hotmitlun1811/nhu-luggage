import type { Metadata } from "next";
import GuideLayout from "@/components/guides/GuideLayout";
import { GuideH2, GuideH3, GuideLead, GuideFacts, GuideList, GuideTable, GuideCallout, GuideFAQ, GuideTOC, GuideImage } from "@/components/guides/GuideElements";
import { breadcrumbJsonLd, guideFaqJsonLd } from "@/lib/structured-data";
import { getDictionary } from "@/content/dictionary";

const pageTitle = "Da Nang to Hoi An Day Trip: The Ticket System, Real Timing, Your Luggage";
const pageDescription =
  "Transport options compared, what the Hoi An Old Town ticket actually requires (and doesn't), and the real timeline if you're flying out of Da Nang that same night.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides/da-nang-to-hoi-an-day-trip" },
  openGraph: { title: `${pageTitle} | Stow`, description: pageDescription, url: "https://www.stowdanang.com/guides/da-nang-to-hoi-an-day-trip" },
  twitter: { title: `${pageTitle} | Stow`, description: pageDescription },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Da Nang to Hoi An Day Trip", path: "/guides/da-nang-to-hoi-an-day-trip" },
]);

const FAQ_ITEMS = [
  {
    q: "Do I need to buy a ticket just to walk around Hoi An Old Town?",
    a: "No. Walking the streets, crossing the bridges, shopping, and eating are all free. The 120,000₫ ticket (5 tear-off coupons) is only needed to enter about 22 specific heritage buildings — old houses, assembly halls, museums, and the Japanese Covered Bridge itself.",
  },
  {
    q: "Is the ticket actually enforced?",
    a: "Inconsistently. Real checks happen at the doorway of each heritage site, not in the open street — though touts in vaguely official-looking shirts have reportedly stopped tourists demanding to see tickets outside that system. Buy from an official booth only, and ignore anyone claiming the official booth is closed and redirecting you elsewhere.",
  },
  {
    q: "Is a day trip to Hoi An actually worth it, or should I stay overnight?",
    a: "A day trip works, but locals and repeat visitors consistently say mornings and evenings — after the day-trippers leave — are when Hoi An is at its best. Worth knowing going in: a single rushed day gets you the sights, not the atmosphere everyone raves about.",
  },
  {
    q: "Can I get a tailored suit made same-day?",
    a: "No, despite what some shops advertise. Quality tailoring realistically takes 24-48 hours minimum. If a custom order matters to your trip, that's not a same-day-trip errand.",
  },
  {
    q: "Does Hoi An have its own luggage storage?",
    a: "Yes, through marketplace services like Stasher or Nannybag partnering with local shops and cafes as drop points — not a dedicated facility. It works for people staying in Hoi An. It doesn't help if your bags, and your flight, are back in Da Nang.",
  },
];

export default async function HoiAnGuide() {
  const dict = await getDictionary("en");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideFaqJsonLd(FAQ_ITEMS)) }} />
      <GuideLayout
        dict={dict}
        currentPath="/guides/da-nang-to-hoi-an-day-trip"
        eyebrow="Day Trips"
        title="Da Nang to Hoi An Day Trip"
        subhead="Checked out of the hotel, flight isn't until tonight, and Hoi An's Old Town is 40 minutes away. Here's what that day actually looks like, ticket system included."
        related={[
          { title: "Da Nang Layover Guide", href: "/guides/da-nang-layover-guide", blurb: "Hoi An works for a long layover too, if you start early." },
          { title: "Ba Na Hills Day Trip", href: "/guides/ba-na-hills-day-trip", blurb: "The other big day trip from Da Nang, opposite direction." },
        ]}
      >
        <GuideLead>
          Stow doesn&apos;t have a storefront in Hoi An. What it has is a location in Da Nang that sits on the way
          there — which matters if your day starts or ends with a bag you don&apos;t want dragging through Old
          Town&apos;s pedestrian streets.
        </GuideLead>

        <GuideTOC
          sections={[
            { id: "transport", label: "Getting there" },
            { id: "ticket", label: "The Old Town ticket, actually explained" },
            { id: "the-day", label: "A realistic day" },
            { id: "food", label: "What's actually Hoi An food" },
            { id: "lantern", label: "The lantern evening trade-off" },
            { id: "your-stuff", label: "Your bags, honestly" },
          ]}
        />

        <GuideImage
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2024_H%E1%BB%99i_An_-_Japanese_Covered_Bridge_%28Ch%C3%B9a_C%E1%BA%A7u%29_after_renovation_-_img_11.jpg"
          alt="The Japanese Covered Bridge (Chùa Cầu) in Hoi An Old Town, after its 2024 renovation"
          width={3287}
          height={2465}
          credit="Chainwit."
          creditUrl="https://commons.wikimedia.org/wiki/File:2024_H%E1%BB%99i_An_-_Japanese_Covered_Bridge_(Ch%C3%B9a_C%E1%BA%A7u)_after_renovation_-_img_11.jpg"
          license="CC BY 4.0"
        />

        <GuideFacts
          items={[
            { label: "Distance", value: "~30 km" },
            { label: "Grab/taxi", value: "40-60 min, 250,000-400,000₫" },
            { label: "Local bus (Route 01)", value: "~45 min, ~30,000₫" },
            { label: "Old Town ticket", value: "120,000₫, 5 coupons" },
          ]}
        />

        <div id="transport" className="flex flex-col gap-4 scroll-mt-24">
          <GuideH2 id="transport">Getting there</GuideH2>
          <p>
            A Grab or taxi is the straightforward option, 30-45 minutes on the coastal road for 250,000-400,000₫.
            The public bus (Route 01, roughly every 20 minutes, 5:30am to early evening) costs a fraction of that
            at about 30,000₫ but takes closer to 45-50 minutes with stops. Renting a motorbike for the day
            (~150,000-200,000₫ plus fuel) is the cheapest and most flexible option for confident riders, but comes
            with a real catch: rental shops commonly hold a passport or a large cash deposit until the bike comes
            back — worth deciding in advance if you&apos;re comfortable with that trade.
          </p>
          <GuideTable
            columns={["Cost", "Time", "Worth knowing"]}
            rows={[
              { label: "Grab / taxi", values: ["250,000-400,000₫", "30-45 min", "Simplest, door to door"] },
              { label: "Local bus", values: ["~30,000₫", "45-50 min", "Cheapest, runs every ~20 min, more stops"] },
              { label: "Motorbike rental", values: ["150,000-200,000₫/day + fuel", "~30 min", "Passport or cash deposit usually held until return"] },
              { label: "Organized tour", values: ["$39+", "6-8 hrs, bundled", "Includes basket boat, hotel pickup"] },
            ]}
          />
        </div>

        <div id="ticket" className="flex flex-col gap-3 scroll-mt-24">
          <GuideH2 id="ticket">The Old Town ticket, actually explained</GuideH2>
          <p>
            120,000₫ buys a booklet of 5 tear-off coupons, redeemable at any 5 of roughly 22 heritage sites — old
            merchant houses, assembly halls, museums, and the Japanese Covered Bridge. You don&apos;t choose which
            5 in advance; each site&apos;s ticket-taker tears one coupon as you enter.
          </p>
          <p>
            <strong>You don&apos;t need it to just walk around.</strong> The streets, the bridges, the shopping,
            the food — all free. The ticket only gates entry to those specific buildings, and by some estimates,
            most visitors never actually buy one.
          </p>
          <GuideCallout label="A real scam to watch for">
            Official tickets are sold only at marked booths. Unofficial sellers sometimes push single-site tickets
            at a markup, or claim the real booth is closed to redirect you to theirs — the city doesn&apos;t sell
            single-site tickets at all. Buy from a marked booth or skip it if you're not planning to enter the
            heritage buildings.
          </GuideCallout>
        </div>

        <div id="the-day" className="flex flex-col gap-4 scroll-mt-24">
          <GuideH2 id="the-day">A realistic day</GuideH2>
          <p>
            Arrive by 7-8am if you can — the Old Town is noticeably quieter and cooler before the tour groups and
            midday heat arrive. The Japanese Covered Bridge (reopened in 2024 after renovation), the merchant
            houses along Tran Phu Street, and the assembly halls make up the core of a first visit.
          </p>
          <p>
            By late morning the heat becomes the real limiting factor. A basket-boat ride through the Cam Thanh
            coconut village (often bundled into day tours) is a shaded, on-the-water way to spend the hottest hours
            instead of walking through them, or retreat into an air-conditioned tailor shop to browse.
          </p>
        </div>

        <div id="food" className="flex flex-col gap-3 scroll-mt-24">
          <GuideH2 id="food">What's actually Hoi An food</GuideH2>
          <p>
            Cao Lầu — thick, chewy noodles specific to this town — and Bánh Mì Phượng (2B Phan Chu Trinh Street,
            the spot that got international attention after a visit from Anthony Bourdain) are both genuinely
            distinct from what you&apos;d find in Da Nang, not the same central-Vietnam food repeated.
          </p>
          <GuideCallout label="A naming trap worth knowing">
            There&apos;s more than one similarly-named &ldquo;Phượng&rdquo; in the bánh mì scene here — worth
            confirming you&apos;re at the specific spot you meant to find, since the names are easy to mix up on
            foot. White Rose dumplings (bánh vạc) are another genuinely local specialty, but the most-cited spot
            reportedly sells out by midday — an early lunch beats a late one if you want to actually try them.
          </GuideCallout>
        </div>

        <div id="lantern" className="flex flex-col gap-3 scroll-mt-24">
          <GuideH2 id="lantern">The lantern evening trade-off</GuideH2>
          <p>
            Hoi An has lanterns year-round, but the full spectacle — electric lights dimmed, the whole town lit by
            lantern and moonlight — is specifically tied to the 14th night of the lunar month, peaking around
            8-9pm. If you&apos;re flying out of Da Nang that same night, this is a real trade-off, not a minor
            timing detail: the 40-50 minute drive back plus airport buffer means most evening flights force leaving
            Hoi An well before the lantern atmosphere actually peaks.
          </p>
        </div>

        <div id="your-stuff" className="flex flex-col gap-3 scroll-mt-24">
          <GuideH2 id="your-stuff">Your bags, honestly</GuideH2>
          <p>
            Hoi An does have legitimate storage options — marketplace services like Stasher and Nannybag partner
            with local shops and cafes as drop points, the same model those platforms use worldwide. That works if
            you&apos;re staying in Hoi An. It doesn&apos;t help if your bags — and your flight — are back in Da
            Nang.
          </p>
          <p>
            Drop your bag at Stow (55 Bà Bang Nhãn, Ngũ Hành Sơn, about 10 minutes from the airport) before you
            head out, spend the day in Hoi An, then swing back through on your way to your flight. Daily rate is
            60,000₫ for up to 24 hours, open until 10pm.
          </p>
          <p>
            For the timing math: international flights want roughly 3-3.5 hours of buffer from Hoi An factoring in
            the drive and check-in; domestic can compress to 2-2.5. Either way, that&apos;s the real number to plan
            your Old Town exit around — not the lantern show&apos;s peak hour.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <GuideH2>Questions people actually ask</GuideH2>
          <GuideFAQ items={FAQ_ITEMS} />
        </div>
      </GuideLayout>
    </>
  );
}
