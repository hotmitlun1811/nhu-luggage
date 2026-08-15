import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/components/guides/GuideLayout";
import { GuideH2, GuideH3, GuideLead, GuideFacts, GuideList, GuideTable, GuideCallout, GuideFAQ, GuideTOC, GuideImage } from "@/components/guides/GuideElements";
import { breadcrumbJsonLd, guideFaqJsonLd } from "@/lib/structured-data";
import { getDictionary } from "@/content/dictionary";

const pageTitle = "Da Nang Visa Run Guide: Land Border vs. Flying, Real Costs";
const pageDescription =
  "How a Vietnam e-visa run from Da Nang actually works: the Lao Bao land border step by step, flying to Bangkok or KL, real costs, overstay penalties, and where your bags go while you're gone.";

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
    q: "Is there a limit on how many visa runs I can do?",
    a: "No hard official limit — you can renew as often as your visa expires. But a pattern of back-to-back runs (several in a few months) can draw questions from immigration officers about your ticket, income, or purpose, and in serious cases risks a re-entry ban. If you're running every 1-3 months long-term, it's worth looking at a TRC or business visa instead.",
  },
  {
    q: "Do I need a return or onward ticket for the e-visa?",
    a: "Vietnam's e-visa itself doesn't require one. Your airline might, though — some carriers won't let you board without proof of onward travel, as a standard liability rule, not an immigration one. Worth checking with your specific airline before you fly.",
  },
  {
    q: "If I buy the multiple-entry e-visa, do I need a new one every run?",
    a: "No — a multiple-entry e-visa (US$50) lets you exit and re-enter as many times as you want within its 90-day window. You only need a fresh e-visa each time if you bought the cheaper single-entry version.",
  },
  {
    q: "What actually happens if I overstay by a day or two?",
    a: "A 1-15 day overstay runs 500,000-2,000,000₫ under current rules, and can often be paid directly at the airport on your way out. That's the easy part — the fine creates a permanent record on your passport that can affect how future entries are treated, so it's not a completely free pass.",
  },
  {
    q: "Can I really do Da Nang to Bangkok and back in one day?",
    a: "Technically, with a midday-out, late-afternoon-back flight pairing. Realistically, most people find it exhausting with zero room for a delay. An overnight — fly out, one night in Bangkok, fly back the next day — is the more common, saner version, and door-to-door it's not much longer than the bus to Lao Bao and back.",
  },
  {
    q: "Do I need cash for the Lao Bao border crossing?",
    a: "Yes — there are no ATMs at the border. Bring USD for Laos's visa-on-arrival fee and some VND or USD in small notes for incidental fees along the way. Cards aren't a reliable backup here.",
  },
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
        subhead="Your e-visa runs out in a few days. Here's what a run actually costs, how the two real routes compare, and what to do with your bags while you're gone."
        related={[
          { title: "Marble Mountains Guide", href: "/guides/marble-mountains-guide", blurb: "Something to do with the extra day before or after your run." },
          { title: "Da Nang Layover Guide", href: "/guides/da-nang-layover-guide", blurb: "Flying out for the run itself? Same logic applies at the airport." },
        ]}
      >
        <GuideLead>
          A Vietnam e-visa is valid for up to 90 days and can&apos;t be extended from inside the country. When it&apos;s
          close to running out, you leave, then come back in on a fresh one. Two routes actually get used from
          Da Nang: a long bus day to the Laos border, or a short flight to Bangkok or Kuala Lumpur.
        </GuideLead>

        <GuideTOC
          sections={[
            { id: "evisa", label: "The e-visa itself" },
            { id: "overstay", label: "Overstay penalties" },
            { id: "two-ways", label: "The two real routes" },
            { id: "watch-for", label: "What to watch for" },
            { id: "alternatives", label: "If you're doing this every few months" },
            { id: "your-stuff", label: "What to do with your bags" },
            { id: "faq", label: "Questions people actually ask" },
          ]}
        />

        <GuideImage
          src="https://upload.wikimedia.org/wikipedia/commons/4/48/Da_Nang_International_Airport%2C_Vietnam.jpg"
          alt="Da Nang International Airport terminal exterior"
          width={5184}
          height={3456}
          credit="Gary Todd"
          license="CC0"
        />

        <GuideFacts
          items={[
            { label: "E-visa fee", value: "$25 single / $50 multiple" },
            { label: "Validity", value: "Up to 90 days" },
            { label: "Processing", value: "3-5 business days" },
            { label: "Overstay, 1-15 days", value: "500,000-2,000,000₫" },
            { label: "Nearest land border", value: "Lao Bao / Dansavanh (Laos)" },
            { label: "Land border, one-way", value: "~244km, 4-5.5 hrs" },
          ]}
        />

        <div id="evisa" className="flex flex-col gap-3 scroll-mt-24">
          <GuideH2 id="evisa">The e-visa itself</GuideH2>
          <p>
            The government fee is $25 for single-entry or $50 for multiple-entry, both valid up to 90 days, set
            under Circular 28/2026/TT-BTC. Processing officially takes 3 business days, though 3-5 working days is
            more realistic in practice, and the immigration department doesn&apos;t process over weekends or
            Vietnamese public holidays — apply 5-7 days before you actually need it, not the day before.
          </p>
          <p>
            Apply only through Vietnam&apos;s official government portal. A number of third-party sites charge
            several times the government fee for &ldquo;express&rdquo; processing that isn&apos;t actually faster —
            a real, common upsell to watch for.
          </p>
          <p>
            Around 38 countries get visa-free entry instead of needing an e-visa at all — most of Western Europe,
            Japan, and South Korea get 45 days; ASEAN neighbors get 30. <strong>US, Canadian, and Australian
            citizens are not on that list</strong> and need a valid e-visa regardless of how short the trip is —
            worth knowing since a lot of general visa-run content assumes everyone needs the same paperwork.
          </p>
        </div>

        <div id="overstay" className="flex flex-col gap-3 scroll-mt-24">
          <GuideH2 id="overstay">Overstay penalties</GuideH2>
          <p>
            Under the current decree, overstaying 1-15 days runs 500,000-2,000,000₫, rising to 5,000,000-10,000,000₫
            for 16-29 days, and up to 40,000,000₫ for longer stretches. Immigration can deport anyone who overstays
            16 or more days.
          </p>
          <GuideCallout label="Worth knowing before you cut it close">
            A short overstay can often be paid directly at the airport on your way out. That doesn&apos;t make it a
            clean slate — the fine creates a permanent record on your passport that can factor into how future
            entries or applications get treated. Build the run into your calendar a week before the visa actually
            expires, not the day before.
          </GuideCallout>
        </div>

        <div id="two-ways" className="flex flex-col gap-6 scroll-mt-24">
          <GuideH2 id="two-ways">The two real routes</GuideH2>

          <div className="flex flex-col gap-3">
            <GuideH3>Lao Bao land border</GuideH3>
            <p>
              The default option from Da Nang: Route 9 to the Lao Bảo / Dansavanh crossing, about 244km and 4-5.5
              hours each way. The crossing itself is open 7am-10pm. A public bus runs for around $8 each way, or a
              sleeper/VIP option exists for a higher fixed price — buy directly at the bus station&apos;s Lao Bao
              counter rather than through a middleman.
            </p>
            <p>
              At the border: exit Vietnam immigration (15-20 min, occasionally an informal small stamping fee),
              cross into Laos and pay for a Laos visa-on-arrival in cash ($40-50), then turn around and re-enter
              Vietnam on your freshly issued e-visa. The whole border process runs 1-2 hours on a normal day, up
              to 3 on a holiday. <strong>Bring cash — there are no ATMs at the crossing</strong>, and bring your
              e-visa printed, not just on your phone; paper is what land-border officials tend to expect.
            </p>
            <p>
              Realistic all-in cost doing it yourself: roughly $75-120 (bus, Laos VOA fee, e-visa fee, incidental
              costs). Some packaged agency trips run $150-213+ — that gap is usually a service-fee markup, not a
              faster or safer trip, so it&apos;s worth pricing the DIY version before booking a package.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <GuideH3>Flying to Bangkok or Kuala Lumpur</GuideH3>
            <p>
              Several airlines fly Da Nang direct to Bangkok in under two hours — Thai VietJet, Vietnam Airlines,
              VietJet, and Thai AirAsia between them run the route regularly. One-way fares start around $56-68;
              a realistic round trip lands somewhere between $110-300 depending on how far ahead you book and
              whether you stay overnight.
            </p>
            <p>
              A same-day out-and-back is technically possible with the right flight pairing, but it leaves zero
              room for a delay and most people who&apos;ve tried it call it exhausting. The more common version is
              one night in Bangkok — door to door, that&apos;s roughly 24-30 hours, not dramatically longer than
              a hard one-day Lao Bao trip, with an actual city in between instead of a van.
            </p>
          </div>

          <GuideTable
            columns={["Realistic cost", "Time", "What it's actually like"]}
            rows={[
              { label: "Land (Lao Bao)", values: ["$75-120 DIY", "10-12 hrs, one hard day", "Long bus day, cash-only, no ATMs at the border"] },
              { label: "Flight (Bangkok)", values: ["$110-300", "9 hrs same-day / 24-30 hrs with a night", "Faster, more predictable, costs more, needs a flight booked ahead"] },
            ]}
          />
        </div>

        <div id="watch-for" className="flex flex-col gap-3 scroll-mt-24">
          <GuideH2 id="watch-for">What to watch for</GuideH2>
          <GuideList
            items={[
              "Photo rejections — plain light background, no glasses, taken within 6 months, and a genuinely different file than your passport-page scan (reusing the same image for both triggers an automatic flag)",
              "Data that doesn't exactly match your passport — name, passport number, date of birth, and watch the date format (Vietnam uses DD/MM/YYYY)",
              "Third-party sites charging well above the $25/$50 government fee for the same processing time",
              "Travel/expat advice sites commonly describe extra scrutiny for people doing very frequent back-to-back runs — treat this as a real caution worth knowing about, not an officially confirmed policy, since it isn't something we could verify against an official government notice",
            ]}
          />
        </div>

        <div id="alternatives" className="flex flex-col gap-3 scroll-mt-24">
          <GuideH2 id="alternatives">If you're doing this every few months</GuideH2>
          <p>
            A visa run every 1-3 months for a year or more starts to add up in cost and hassle. A Temporary
            Residence Card (TRC), typically tied to a work permit or business sponsorship, removes the cycle
            entirely — valid from 1 to 10 years with unlimited entry/exit. A longer-term business visa is another
            route some people use instead of repeated tourist e-visas. Both involve more setup than a visa run, but
            are worth a look if the cycle has become a recurring cost on your calendar rather than a once-off.
          </p>
        </div>

        <div id="your-stuff" className="flex flex-col gap-3 scroll-mt-24">
          <GuideH2 id="your-stuff">What to do with your bags while you're gone</GuideH2>
          <p>
            Nobody wants to drag a laptop bag and a week of clothes through a 15-hour border run. And nobody wants
            to pay for a hotel room in Bangkok just to have somewhere to put a bag between flights.
          </p>
          <p>
            Stow&apos;s flat-rate plans line up with the run itself, not by accident: Mini covers up to a week for
            150,000₫, Strand covers up to a month for 300,000₫, and the price doesn&apos;t change whether you&apos;re
            back in two days or two weeks. Drop your bag off before you leave for the border or the airport, and
            it&apos;s waiting at 55 Bà Bang Nhãn, Ngũ Hành Sơn when you&apos;re back.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <GuideH2>Quick checklist before you go</GuideH2>
          <GuideList
            items={[
              "New e-visa applied for and approved before you leave, not after",
              "Passport has at least 6 months of validity and 2+ blank pages",
              "Land border: cash on hand (USD for the Laos VOA fee, small notes for incidentals) — no ATMs at the crossing",
              "Flight: return ticket booked, since some airlines require proof of onward travel to let you board",
              "If your bags aren't coming with you, drop them at Stow before you head to the border or airport",
            ]}
          />
        </div>

        <div id="faq" className="flex flex-col gap-3 scroll-mt-24">
          <GuideH2 id="faq">Questions people actually ask</GuideH2>
          <GuideFAQ items={FAQ_ITEMS} />
        </div>

        <p className="text-[13px] text-[#9CA3AF]">
          Visa and overstay rules change, and enforcement details can vary by nationality and situation. This
          reflects Vietnam&apos;s e-visa policy and overstay decree as understood at time of writing — confirm
          current requirements with{" "}
          <a href="https://www.vietnamtourism.com/en/visa" target="_blank" rel="noopener noreferrer" className="text-[#E8742C] underline">
            Vietnam&apos;s official visa page
          </a>{" "}
          before you travel.
        </p>
      </GuideLayout>
    </>
  );
}
