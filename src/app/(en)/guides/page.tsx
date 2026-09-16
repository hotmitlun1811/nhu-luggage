import type { Metadata } from "next";
import Link from "next/link";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import PrimaryNav from "@/components/layout/PrimaryNav";
import Footer from "@/components/layout/Footer";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { getDictionary } from "@/content/dictionary";

const pageTitle = "Da Nang Travel Guides";
const pageDescription =
  "Practical guides for Da Nang: visa runs, layovers, the Marble Mountains, and day trips to Hoi An and Ba Na Hills, from the team behind Stow's luggage storage.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides" },
  openGraph: { title: `${pageTitle} | Stow`, description: pageDescription, url: "https://www.stowdanang.com/guides" },
  twitter: { title: `${pageTitle} | Stow`, description: pageDescription },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
]);

const GUIDES = [
  {
    href: "/guides/da-nang-itinerary",
    title: "The Perfect Da Nang Itinerary",
    blurb: "A day-by-day plan for 3 days (with 1, 2, 4 and 5-day options), real timings, and the arrival and departure days most plans get wrong.",
  },
  {
    href: "/guides/where-to-stay-in-da-nang",
    title: "Where to Stay in Da Nang",
    blurb: "The city's areas ranked by who each suits, real price ranges, and the check-in gap nobody warns you about.",
  },
  {
    href: "/guides/da-nang-vs-hoi-an",
    title: "Da Nang or Hoi An?",
    blurb: "An honest side-by-side, who each suits, and the strategy that beats choosing: base in one, day-trip the other.",
  },
  {
    href: "/guides/da-nang-airport-guide",
    title: "Da Nang Airport (DAD) Guide",
    blurb: "Arrival steps, SIM cards, real fares to the city, My Khe and Hoi An, lounges, and the truth about left luggage.",
  },
  {
    href: "/guides/getting-around-da-nang",
    title: "Getting Around Da Nang",
    blurb: "Grab, Xanh SM, motorbikes and taxis, with real fares and the licence law nobody spells out.",
  },
  {
    href: "/guides/da-nang-food-guide",
    title: "Da Nang Food Guide",
    blurb: "15 dishes and where to eat them, several Michelin-listed, plus how to eat street food without getting sick.",
  },
  {
    href: "/guides/best-beaches-in-da-nang",
    title: "The Best Beaches in Da Nang",
    blurb: "My Khe, Non Nuoc, and the hidden Son Tra coves, with beach clubs, surfing seasons, and rip-current safety.",
  },
  {
    href: "/guides/best-time-to-visit-da-nang",
    title: "Best Time to Visit Da Nang",
    blurb: "A month-by-month weather guide: the best months, the ones to avoid, and when the sea and prices are right.",
  },
  {
    href: "/guides/da-nang-with-kids",
    title: "Da Nang With Kids",
    blurb: "A family playbook: what to do by age with real prices, a sane pace, car seats and strollers, and the checkout-day fix.",
  },
  {
    href: "/guides/son-tra-peninsula",
    title: "Son Tra Peninsula and the Lady Buddha",
    blurb: "Monkey Mountain, the 67 m Lady Buddha, the viewpoints, the endangered doucs, and the scooter rules that changed.",
  },
  {
    href: "/guides/da-nang-to-hue-day-trip",
    title: "Da Nang to Hue Day Trip",
    blurb: "The Hai Van Pass or the tunnel, every way to get there with real prices, the scenic train, and one day in the imperial city.",
  },
  {
    href: "/guides/da-nang-nightlife",
    title: "Da Nang at Night",
    blurb: "The free Dragon Bridge fire show, the An Thuong bar strip, rooftop sky bars, night markets, and a Han River cruise.",
  },
  {
    href: "/guides/best-day-trips-from-da-nang",
    title: "The Best Day Trips from Da Nang",
    blurb: "Eight trips ranked, from the easy Hoi An run to the temples of My Son and the forests of Bach Ma, with real costs and timings.",
  },
  {
    href: "/guides/best-coffee-shops-in-da-nang",
    title: "The Best Coffee Shops in Da Nang",
    blurb: "Specialty roasters and Vietnamese classics, what the signature drinks are, and where to find a great cup with a view.",
  },
  {
    href: "/guides/best-cafes-to-work-from-in-da-nang",
    title: "The Best Cafes to Work From in Da Nang",
    blurb: "Ten laptop-friendly cafes ranked for wifi, power, and quiet, plus where the nomad cluster is.",
  },
  {
    href: "/guides/best-coworking-spaces-in-da-nang",
    title: "The Best Coworking Spaces in Da Nang",
    blurb: "Ten spaces ranked for community, wifi, price, and location, with real day-pass and monthly costs.",
  },
  {
    href: "/guides/da-nang-hidden-gems",
    title: "Da Nang Hidden Gems",
    blurb: "Ten offbeat places most visitors miss, from Son Tra's quiet coves to a dawn fish auction, with honest access notes.",
  },
  {
    href: "/guides/best-photo-spots-in-da-nang",
    title: "The Best Photo Spots in Da Nang",
    blurb: "Twelve landmarks and viewpoints, and the exact time of day to shoot each one, from sunrise on Son Tra to the fire show.",
  },
  {
    href: "/guides/da-nang-visa-run-guide",
    title: "Da Nang Visa Run Guide",
    blurb: "Land border or flying out, real costs, the entry-point mistake that gets people turned away, and where your bags go.",
  },
  {
    href: "/guides/da-nang-layover-guide",
    title: "Da Nang Layover Guide",
    blurb: "A real itinerary for 6-10 hours between flights, built around where to leave your bag first.",
  },
  {
    href: "/guides/marble-mountains-guide",
    title: "Marble Mountains (Ngu Hanh Son) Guide",
    blurb: "Cave by cave, the full 2026 ticket prices, the dress code, and what's actually there, 10 minutes from the airport.",
  },
  {
    href: "/guides/da-nang-to-hoi-an-day-trip",
    title: "Da Nang to Hoi An Day Trip",
    blurb: "Transport compared, the Old Town ticket explained, and what to do with luggage if you're flying out that night.",
  },
  {
    href: "/guides/ba-na-hills-day-trip",
    title: "Ba Na Hills Day Trip",
    blurb: "Cable car tickets, the Golden Bridge, the fog problem, and planning a full day up the mountain.",
  },
];

export default async function GuidesIndex() {
  const dict = await getDictionary("en");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <main>
        <PrimaryNav dict={dict.nav} locale="en" currentPath="/guides" />

        {/* Nav clearance + announcement + header as one navy block, the fixed
            nav overlays the top 72px, so the announcement sits below it. */}
        <div className="bg-[#16243F] pt-[72px]">
          <AnnouncementBar dict={dict.announcement} />
          <div className="max-w-[900px] mx-auto px-6 pt-[28px] pb-[56px] lg:pt-[44px] lg:pb-[72px]">
            <p
              className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E8742C] mb-3"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Guides
            </p>
            <h1
              className="text-white font-bold leading-[1.08] mb-5"
              style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(28px, 4vw, 46px)", letterSpacing: "-0.03em" }}
            >
              Da Nang, from someone who&apos;s actually here.
            </h1>
            <p className="text-white/50 text-[15px] max-w-xl leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
              Visa runs, layovers, and the day trips people actually take from Da Nang. Real prices, real timing.
            </p>
          </div>
        </div>

        <div className="bg-white">
          <div className="max-w-[900px] mx-auto px-6 py-20 lg:py-28">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {GUIDES.map((g) => (
                <Link
                  key={g.href}
                  href={g.href}
                  className="block rounded-2xl border border-[#E8E8E4] p-7 hover:border-[#E8742C] transition-colors"
                >
                  <p
                    className="text-[17px] font-bold text-[#0D1829] mb-2"
                    style={{ fontFamily: "var(--font-poppins)", letterSpacing: "-0.01em" }}
                  >
                    {g.title}
                  </p>
                  <p className="text-[14px] text-[#6B7280] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                    {g.blurb}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Footer dict={dict.footer} locale="en" currentPath="/guides" />
      </main>
    </>
  );
}
