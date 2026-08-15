import type { Metadata } from "next";
import Link from "next/link";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import PrimaryNav from "@/components/layout/PrimaryNav";
import Footer from "@/components/layout/Footer";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { getDictionary } from "@/content/dictionary";

const pageTitle = "Da Nang Travel Guides";
const pageDescription =
  "Practical guides for Da Nang: visa runs, layovers, the Marble Mountains, and day trips to Hoi An and Ba Na Hills — from the team behind Stow's luggage storage.";

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
    href: "/guides/da-nang-visa-run-guide",
    title: "Da Nang Visa Run Guide",
    blurb: "Land border vs. flying out, real costs, and what to do with your bags while you're gone.",
  },
  {
    href: "/guides/da-nang-layover-guide",
    title: "Da Nang Layover Guide",
    blurb: "A real itinerary for 6-10 hours between flights, built around where to leave your bag first.",
  },
  {
    href: "/guides/marble-mountains-guide",
    title: "Marble Mountains (Ngũ Hành Sơn) Guide",
    blurb: "Hours, ticket prices, and what's actually there — 10 minutes from the airport.",
  },
  {
    href: "/guides/da-nang-to-hoi-an-day-trip",
    title: "Da Nang to Hoi An Day Trip",
    blurb: "Transport options, real timing, and what to do with luggage if you're flying out that night.",
  },
  {
    href: "/guides/ba-na-hills-day-trip",
    title: "Ba Na Hills Day Trip",
    blurb: "Cable car tickets, timing, and planning a full day up the mountain.",
  },
];

export default async function GuidesIndex() {
  const dict = await getDictionary("en");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <main>
        <AnnouncementBar dict={dict.announcement} />
        <PrimaryNav dict={dict.nav} locale="en" currentPath="/guides" />

        <div className="bg-[#16243F] py-40 lg:py-64">
          <div className="max-w-[900px] mx-auto px-6">
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
