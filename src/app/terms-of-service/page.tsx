import type { Metadata } from "next";
import PrimaryNav from "@/components/layout/PrimaryNav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Stow Da Nang",
  description: "Terms of Service for Stow luggage storage in Da Nang, Vietnam. Read before you book.",
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

              <div className="mb-8 p-4 bg-[#FFF8F4] rounded-xl border border-[#E8742C]/20">
                <p className="text-[14px] text-[#4B5563] leading-relaxed" style={{ fontFamily: "var(--font-inter)" }}>
                  These Terms are the agreement between you and Stow Luggage Storage Da Nang.
                  We&apos;ve kept them short and plain. Questions? Email{" "}
                  <a href={`mailto:${EMAIL}`} className="text-[#E8742C] hover:underline">{EMAIL}</a>{" "}
                  and we will explain.
                </p>
              </div>

              <Section id="acceptance" title="1. Acceptance">
                <P>
                  By using our website, submitting a booking form, or dropping off a bag at our store, you
                  are agreeing to these Terms. That applies to all customers, walk-in and pre-booked, and
                  to both storage lanes.
                </P>
                <P>If you do not agree, please do not use our services.</P>
              </Section>

              <Section id="service" title="2. What we provide">
                <P>
                  Stow stores luggage in Da Nang. One location. Open 7am to 10pm every day, including
                  public holidays.
                </P>
                <P>Two lanes:</P>
                <Ul items={[
                  "Lane 1 (Flexible): 15,000 VND per hour or 60,000 VND for the day. For tourists, day-trippers, and walk-ins.",
                  "Lane 2 (Flat Rate): fixed-price plans from one week to four months. For expats, digital nomads, and visa runners.",
                ]} />
                <P>
                  Each item gets a unique ID tag and a condition photo at drop-off. Lane 2 items go into a
                  secured locked zone. CCTV covers the whole facility.
                </P>
              </Section>

              <Section id="booking" title="3. Booking">
                <P>
                  You can book online or just walk in. An online booking is a request. It is confirmed when
                  you receive a WhatsApp reply from us.
                </P>
                <P>
                  No reply within 30 minutes? Message us at {PHONE} before coming in.
                </P>
                <P>
                  Walk-ins are served first-come. We may decline if we are at capacity.
                </P>
              </Section>

              <Section id="checkin" title="4. Drop-off and collection">
                <P>
                  <strong>Drop-off:</strong> Staff check the item condition, attach an ID tag, and photo
                  the exterior. This is the reference point if any dispute arises. Under 3 minutes.
                </P>
                <P>
                  <strong>Collection:</strong> Show your ID tag or booking confirmation. Staff verify your
                  identity before releasing anything. Lost your tag? Message us before arriving. We may ask
                  for a government ID.
                </P>
              </Section>

              <Section id="accepted" title="5. What we accept">
                <P>We store:</P>
                <Ul items={[
                  "Suitcases and rolling luggage of all sizes (oversized surcharge for 28 inches and above)",
                  "Backpacks and day packs",
                  "Travel bags and duffels",
                  "Shopping bags",
                  "Non-hazardous sports equipment: surfboards, bicycles, helmets",
                  "Foldable baby strollers",
                ]} />
                <P>We do not store:</P>
                <Ul items={[
                  "Cash, jewelry, gold, watches, or anything with high monetary value",
                  "Laptops, cameras, drones, tablets, or other electronics",
                  "Flammable, pressurized, hazardous, or chemically dangerous items",
                  "Illegal substances or weapons",
                  "Fresh food, live animals, or perishables",
                  "Passports, identity documents, or valuable papers",
                ]} />
                <P>
                  We do not open sealed luggage. By handing a bag to us, you confirm nothing prohibited is
                  inside. You remain responsible for your bag&apos;s contents. Keep valuables, passports,
                  and electronics on your person.
                </P>
              </Section>

              <Section id="pricing" title="6. Pricing and payment">
                <P>
                  All prices are in Vietnamese Dong (VND) and apply per pax — each bag or item stored
                  counts as one pax. No hidden fees. Payment is cash at the store. We do not process
                  online payments.
                </P>
                <P><strong>Lane 1 (Flexible):</strong></P>
                <Ul items={[
                  "By the hour: 15,000 VND. Minimum one hour, billed in full hours.",
                  "By the day: 60,000 VND for 24 hours from drop-off.",
                  "Oversized surcharge: +30,000 VND for bags 28 inches and above, bicycles, or surfboards.",
                ]} />
                <P><strong>Lane 2 (Flat Rate):</strong></P>
                <Ul items={[
                  "Mini: 150,000 VND, up to one week.",
                  "Strand: 300,000 VND, up to one month.",
                  "Long Stay: 1,000,000 VND, up to four months.",
                  "Oversized surcharge: +50,000 VND.",
                ]} />
                <P>
                  Flat Rate plans are not refundable. The price is fixed for the period regardless of
                  when you collect. Flexible charges are calculated at collection based on actual time
                  stored.
                </P>
              </Section>

              <Section id="duration" title="7. Storage period">
                <P>
                  <strong>Flexible Lane:</strong> Collect any time during opening hours. If your bag is
                  still with us at 10pm, we secure it overnight at no extra charge. You pay for the
                  additional time when you collect.
                </P>
                <P>
                  <strong>Flat Rate Lane:</strong> Your plan runs from the time of drop-off. If you do not
                  collect by the end of your plan, we will contact you on the number you gave us.
                </P>
                <P>
                  Bags left more than 14 days past plan expiry: 30,000 VND daily holding fee. Bags left
                  more than 60 days past expiry with no contact may be donated or disposed of. We will
                  make reasonable attempts to reach you first.
                </P>
              </Section>

              <Section id="liability" title="8. Liability">
                <P>
                  <strong>What we are responsible for:</strong> Physical loss of or damage to your stored
                  item caused by our proven negligence, up to the amount you paid for storage.
                </P>
                <P><strong>What we are not responsible for:</strong></P>
                <Ul items={[
                  "Loss or damage to contents inside sealed luggage",
                  "Anything on the prohibited list (Section 5), including cash, electronics, jewelry",
                  "Damage from fragile, defective, or improperly packed items",
                  "Loss from force majeure events (Section 10)",
                  "Missed flights, accommodation costs, or other consequential loss",
                  "Items collected by someone presenting your ID tag",
                  "Loss or damage after your storage plan has expired",
                ]} />
                <P>
                  Our total liability will not exceed the fee you paid. If you need cover for valuable
                  items, get travel insurance. We do not sell insurance.
                </P>
                <P>
                  Claims must be reported in writing via WhatsApp or email within 24 hours of collection.
                </P>
              </Section>

              <Section id="obligations" title="9. Your obligations">
                <Ul items={[
                  "Give us your real name, phone number, and drop-off details",
                  "Do not store prohibited items. You are responsible for your bag's contents.",
                  "Bring bags that are clean and safe to handle",
                  "Collect within your plan period or renew early",
                  "Treat staff with respect. We may refuse service for abusive behaviour.",
                ]} />
              </Section>

              <Section id="forcemajeure" title="10. Force majeure">
                <P>
                  We are not liable for failures caused by events outside our control: natural disasters,
                  floods, fire, pandemic, power outages, government orders, or civil unrest.
                </P>
                <P>
                  In those situations we will do what we can to contact you and protect your items.
                  Refunds will be considered case by case.
                </P>
              </Section>

              <Section id="governing" title="11. Governing law">
                <P>
                  These Terms are governed by the laws of Vietnam. Any dispute should first be raised
                  directly with us. We will try to resolve it within 30 days. If we cannot, the matter
                  goes to the competent court in Da Nang City.
                </P>
              </Section>

              <Section id="changes" title="12. Updates">
                <P>
                  We may update these Terms when our service changes or the law requires it. Changes are
                  posted here with a new effective date. Active Flat Rate customers will get a WhatsApp
                  message for significant changes. Continued use after the update date means you accept
                  the revised Terms.
                </P>
              </Section>

              <Section id="contact-terms" title="13. Contact">
                <Ul items={[
                  `Email: ${EMAIL}`,
                  `WhatsApp and Zalo: ${PHONE}`,
                  "In person: 7am to 10pm daily",
                ]} />
                <P>We aim to respond within 24 hours.</P>
              </Section>

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
