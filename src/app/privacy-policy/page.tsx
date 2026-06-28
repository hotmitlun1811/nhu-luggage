import type { Metadata } from "next";
import PrimaryNav from "@/components/layout/PrimaryNav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Stow Da Nang",
  description: "How Stow Da Nang collects, uses, and protects your personal information.",
};

const EFFECTIVE = "1 June 2026";
const EMAIL = "stowdanang@gmail.com";
const PHONE = "+84 905 955 161";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10 scroll-mt-[88px]">
      <h2
        className="text-[18px] font-bold text-[#16243F] mb-4 pb-3 border-b border-[#EAEAE6]"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {title}
      </h2>
      <div
        className="text-[15px] text-[#4B5563] leading-relaxed flex flex-col gap-3"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {children}
      </div>
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}

function Ul({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span className="mt-[8px] w-1.5 h-1.5 rounded-full bg-[#E8742C] flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

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

              <div className="mb-8 p-4 bg-[#FFF8F4] rounded-xl border border-[#E8742C]/20">
                <p className="text-[14px] text-[#4B5563] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                  This policy explains what information Stow Da Nang collects when you use our service,
                  why we collect it, and how you can control it. We collect only what we need to
                  run a booking and get your bag back to you. This policy complies with Vietnam&apos;s
                  Personal Data Protection Law (PDPL 2025, in effect January 2026).
                </p>
              </div>

              <Section id="who-we-are" title="1. Who we are">
                <P>
                  Stow Luggage Storage Da Nang is a luggage storage business based in Da Nang, Vietnam.
                  We are the data controller for all personal information you give us.
                </P>
                <P>
                  Email: <strong>{EMAIL}</strong> · WhatsApp/Zalo: <strong>{PHONE}</strong>
                </P>
                <P>
                  As a small enterprise, we fall within the five-year grace period under Vietnam&apos;s PDPL
                  for DPO appointment and impact assessments. We apply the core PDPL principles now
                  regardless.
                </P>
              </Section>

              <Section id="data" title="2. What we collect">
                <P>
                  We collect only what is needed to confirm and manage your booking:
                </P>
                <Ul items={[
                  "Your name, so we can identify you at collection",
                  "Your phone number (WhatsApp or Zalo), to send your booking confirmation and reach you if something comes up",
                  "Drop-off date and time, to calculate the storage duration and cost",
                  "Estimated pickup date, to remind Flat Rate customers before their plan expires",
                  "Storage plan selected and whether your item is oversized, to calculate your total",
                  "A photo of the exterior of your item at drop-off, taken by our staff as a shared condition record",
                  "CCTV footage of the facility, recorded continuously and overwritten after 30 days",
                ]} />
                <P>
                  We do not collect: payment card numbers (cash only), passport numbers or national ID
                  numbers, your location, or your browsing history.
                </P>
                <P>
                  We do not intentionally collect sensitive personal data such as health information,
                  ethnicity, or political views. If you include any of that in a WhatsApp message to us,
                  it will remain in our conversation history as governed by WhatsApp&apos;s own policy.
                </P>
              </Section>

              <Section id="use" title="3. How we use it">
                <P>We use your data for these purposes and no others:</P>
                <Ul items={[
                  "Confirming your booking via WhatsApp",
                  "Identifying you at drop-off and collection so no one else picks up your bag",
                  "Calculating your storage fee",
                  "Contacting you if your Flat Rate plan is close to expiry or has expired",
                  "Responding to claims or disputes",
                  "Meeting legal obligations, such as keeping payment records for tax purposes",
                  "Sending a one-time thank-you message with a Google review link after collection (you can opt out by replying)",
                ]} />
                <P>
                  We do not use your data for advertising, profiling, or any automated decision-making.
                </P>
              </Section>

              <Section id="sharing" title="4. Who we share it with">
                <P>We do not sell your data. We do not share it with advertisers or data brokers.</P>
                <P>
                  The only parties who may receive your data, and only to the extent necessary:
                </P>
                <Ul items={[
                  "WhatsApp (Meta): all customer communication goes through WhatsApp. Your messages are subject to Meta's privacy policy, which we cannot control.",
                  "Google: if you choose to leave a review, that interaction is between you and Google's platform.",
                  "Vietnamese authorities: we will share data with law enforcement only when required by a valid court order or legal obligation.",
                ]} />
                <P>
                  WhatsApp routes messages through Meta&apos;s global infrastructure, which means your
                  data may pass through servers outside Vietnam. By submitting a booking, you acknowledge
                  this.
                </P>
              </Section>

              <Section id="retention" title="5. How long we keep it">
                <Ul items={[
                  "Booking records (name, phone, dates, plan, condition photo): 12 months from drop-off, then deleted",
                  "WhatsApp conversation history: retained within WhatsApp under Meta's own policy; we do not archive these independently",
                  "CCTV footage: overwritten automatically after 30 days unless needed for an open dispute",
                  "Payment amounts: 5 years, as required by Vietnamese accounting law",
                ]} />
                <P>
                  When the retention period ends, data is deleted. We do not archive or sell it.
                </P>
              </Section>

              <Section id="rights" title="6. Your rights (Vietnam PDPL 2025)">
                <P>Under Vietnam&apos;s Personal Data Protection Law, you have the right to:</P>
                <Ul items={[
                  "Know what data we hold about you and how it is used",
                  "Access a copy of your personal data",
                  "Correct inaccurate or incomplete data",
                  "Delete your data, subject to our legal retention obligations",
                  "Withdraw consent at any time (this does not affect prior processing)",
                  "Object to processing based on legitimate interests, such as our post-collection review request",
                  "Complain to the relevant Vietnamese authority (Ministry of Public Security, Department of Cybersecurity and Hi-tech Crime Prevention)",
                ]} />
                <P>
                  To exercise any of these rights, email <strong>{EMAIL}</strong> or message us on
                  WhatsApp at <strong>{PHONE}</strong>. We will respond within 15 working days. We may
                  need to verify your identity first.
                </P>
              </Section>

              <Section id="security" title="7. Security">
                <P>Steps we take to protect your data:</P>
                <Ul items={[
                  "Booking records are only accessible to staff who need them to fulfil your booking",
                  "All customer communication uses WhatsApp's end-to-end encryption",
                  "CCTV footage is only reviewed in the event of a security incident or dispute",
                  "We accept cash only, so no payment card data ever enters our systems",
                ]} />
                <P>
                  No system is 100% secure. If you think your data has been compromised, contact us at{" "}
                  {EMAIL} immediately.
                </P>
              </Section>

              <Section id="cookies" title="8. Cookies">
                <P>
                  Our website is a static Next.js site. We do not use advertising cookies, tracking
                  pixels, Meta Pixel, or Google Analytics. The browser may set a session cookie for basic
                  page function. It expires when you close your tab.
                </P>
                <P>
                  If we add analytics in the future, we will update this policy and ask for your consent
                  where required.
                </P>
              </Section>

              <Section id="children" title="9. Children">
                <P>
                  Our service is not directed at anyone under 16. We do not knowingly collect data from
                  children. If you think a child&apos;s data has reached us, contact us and we will delete it.
                </P>
              </Section>

              <Section id="changes" title="10. Updates">
                <P>
                  We may update this policy when our service changes or when the law requires it. Changes
                  go live on the date shown at the top of this page. Active Flat Rate customers will get
                  a WhatsApp message for significant changes. Continued use after the update date means
                  you accept the revised policy.
                </P>
              </Section>

              <Section id="contact-priv" title="11. Contact">
                <Ul items={[
                  `Email: ${EMAIL}`,
                  `WhatsApp and Zalo: ${PHONE}`,
                  "In person: 7am to 10pm daily",
                ]} />
                <P>
                  We acknowledge privacy requests within 3 working days and aim to resolve them within
                  15. If you are not satisfied, you have the right to escalate to the Vietnamese data
                  protection authority.
                </P>
              </Section>

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
