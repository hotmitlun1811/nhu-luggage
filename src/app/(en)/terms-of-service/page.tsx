import type { Metadata } from "next";
import PrimaryNav from "@/components/layout/PrimaryNav";
import Footer from "@/components/layout/Footer";
import TermsOfServiceContent from "@/components/legal/TermsOfServiceContent";
import { EFFECTIVE, EMAIL } from "@/components/legal/LegalShared";
import { breadcrumbJsonLd } from "@/lib/structured-data";

/* Short title — the root layout's title.template ("%s | Stow Da Nang")
   appends the brand suffix automatically; this used to already include
   "Stow Da Nang" itself, doubling it on the rendered <title> tag. Social
   titles keep the fuller string since og:title/twitter:title don't go
   through that template. */
const pageTitle = "Terms of Service";
const socialTitle = "Terms of Service — Stow Da Nang";
const pageDescription = "Terms of Service for Stow luggage storage in Da Nang, Vietnam. Read before you book.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/terms-of-service" },
  openGraph: {
    title: socialTitle,
    description: pageDescription,
    url: "https://www.stowdanang.com/terms-of-service",
  },
  twitter: {
    title: socialTitle,
    description: pageDescription,
  },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Terms of Service", path: "/terms-of-service" },
]);

const toc = [
  { href: "#acceptance",    label: "1. Acceptance" },
  { href: "#service",       label: "2. What we provide" },
  { href: "#booking",       label: "3. Booking" },
  { href: "#checkin",       label: "4. Drop-off and collection" },
  { href: "#accepted",      label: "5. What we accept" },
  { href: "#pricing",       label: "6. Pricing and payment" },
  { href: "#duration",      label: "7. Storage period" },
  { href: "#liability",     label: "8. Liability" },
  { href: "#obligations",   label: "9. Your obligations" },
  { href: "#forcemajeure",  label: "10. Force majeure" },
  { href: "#governing",     label: "11. Governing law" },
  { href: "#changes",       label: "12. Updates" },
  { href: "#contact-terms", label: "13. Contact" },
];

export default function TermsPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <PrimaryNav />

      <div className="bg-[#16243F]" style={{ paddingTop: "72px" }}>
        <div className="max-w-[1280px] mx-auto px-6" style={{ paddingTop: "56px", paddingBottom: "56px" }}>
          <p
            className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E8742C] mb-3"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Legal
          </p>
          <h1
            className="text-white font-bold leading-[1.08] mb-3"
            style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(26px, 4vw, 44px)" }}
          >
            Terms of Service
          </h1>
          <p className="text-white/40 text-[13px]" style={{ fontFamily: "var(--font-inter)" }}>
            Effective {EFFECTIVE} · Stow Luggage Storage Da Nang
          </p>
        </div>
      </div>

      <div className="bg-[#F4F4F0] min-h-screen">
        <div className="max-w-[1280px] mx-auto px-6" style={{ paddingTop: "48px", paddingBottom: "64px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10 items-start">

            {/* TOC sidebar — sticky with correct offset below 72px nav */}
            <aside className="hidden lg:block" style={{ position: "sticky", top: "88px" }}>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9CA3AF] mb-3"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                On this page
              </p>
              <nav className="flex flex-col gap-1">
                {toc.map(({ href, label }) => (
                  <a
                    key={href}
                    href={href}
                    className="text-[12.5px] text-[#6B7280] hover:text-[#E8742C] transition-colors leading-snug py-0.5"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {label}
                  </a>
                ))}
              </nav>
              <div className="mt-6 p-3.5 bg-white rounded-xl border border-[#EAEAE6]">
                <p className="text-[11px] text-[#9CA3AF] mb-1" style={{ fontFamily: "var(--font-inter)" }}>
                  Questions?
                </p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-[11.5px] font-medium text-[#E8742C] hover:underline break-all"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {EMAIL}
                </a>
              </div>
            </aside>

            {/* Content */}
            <article className="bg-white rounded-2xl p-7 lg:p-10 border border-[#EAEAE6]">
              <TermsOfServiceContent />

              <div className="mt-8 pt-6 border-t border-[#EAEAE6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-[12px] text-[#9CA3AF]" style={{ fontFamily: "var(--font-inter)" }}>
                  Stow Da Nang · {EFFECTIVE} · v1.0
                </p>
                <a
                  href="/privacy-policy"
                  className="text-[12px] text-[#E8742C] hover:underline"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Read our Privacy Policy
                </a>
              </div>

            </article>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
