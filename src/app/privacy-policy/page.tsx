import type { Metadata } from "next";
import PrimaryNav from "@/components/layout/PrimaryNav";
import Footer from "@/components/layout/Footer";
import PrivacyPolicyContent from "@/components/legal/PrivacyPolicyContent";
import { EFFECTIVE, EMAIL } from "@/components/legal/LegalShared";
import { breadcrumbJsonLd } from "@/lib/structured-data";

const pageTitle = "Privacy Policy — Stow Da Nang";
const pageDescription = "How Stow Da Nang collects, uses, and protects your personal information.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "https://www.stowdanang.com/privacy-policy",
  },
  twitter: {
    title: pageTitle,
    description: pageDescription,
  },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy-policy" },
]);

const toc = [
  { href: "#who-we-are",   label: "1. Who we are" },
  { href: "#data",         label: "2. What we collect" },
  { href: "#use",          label: "3. How we use it" },
  { href: "#sharing",      label: "4. Who we share it with" },
  { href: "#retention",    label: "5. How long we keep it" },
  { href: "#rights",       label: "6. Your rights" },
  { href: "#security",     label: "7. Security" },
  { href: "#cookies",      label: "8. Cookies" },
  { href: "#children",     label: "9. Children" },
  { href: "#changes",      label: "10. Updates" },
  { href: "#contact-priv", label: "11. Contact" },
];

export default function PrivacyPage() {
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
            Privacy Policy
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
                  Privacy questions?
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
              <PrivacyPolicyContent />

              <div className="mt-8 pt-6 border-t border-[#EAEAE6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-[12px] text-[#9CA3AF]" style={{ fontFamily: "var(--font-inter)" }}>
                  Stow Da Nang · {EFFECTIVE} · v1.0 · Vietnam PDPL 2025
                </p>
                <a
                  href="/terms-of-service"
                  className="text-[12px] text-[#E8742C] hover:underline"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Read our Terms of Service
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
