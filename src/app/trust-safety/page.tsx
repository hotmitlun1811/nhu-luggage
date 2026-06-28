import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, XCircle, ShieldCheck, Camera, Tag, Lock, Users, MessageCircle } from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import PrimaryNav from "@/components/layout/PrimaryNav";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Trust & Safety — Stow Luggage Storage Da Nang",
  description:
    "How Stow keeps your belongings safe. Our security measures, what we can and cannot store, and what we promise.",
};

const canStore = [
  "Suitcases & rolling luggage",
  "Backpacks & daypacks",
  "Travel bags & duffel bags",
  "Shopping bags",
  "Sports equipment (non-hazardous)",
  "Foldable baby strollers & helmets",
];

const cannotStore = [
  { label: "Cash, jewelry, luxury watches" },
  { label: "Laptops, cameras, tablets, drones" },
  { label: "Flammable, hazardous, or pressurized items" },
  { label: "Illegal substances or weapons" },
  { label: "Fresh food, live animals, or perishables" },
  { label: "Passports & valuable documents" },
];

const security = [
  { Icon: Tag,         text: "Unique QR/ID tag on every item at drop-off" },
  { Icon: Camera,      text: "Photo receipt sent to you at check-in" },
  { Icon: ShieldCheck, text: "CCTV coverage of all storage areas, always on" },
  { Icon: Lock,        text: "Flat Rate items stored in a dedicated locked zone" },
  { Icon: Users,       text: "Authorized staff only — identity verified at pick-up" },
];

export default function TrustSafetyPage() {
  return (
    <main>
      <AnnouncementBar />
      <PrimaryNav />

      {/* Page header */}
      <div className="bg-[#16243F] py-40 lg:py-64">
        <div className="max-w-[1280px] mx-auto px-6">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E8742C] mb-3"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Trust &amp; Safety
          </p>
          <h1
            className="text-white font-bold leading-[1.06] mb-5"
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "clamp(28px, 4vw, 52px)",
              letterSpacing: "-0.03em",
            }}
          >
            Clear rules, no surprises.
          </h1>
          <p
            className="text-white/50 text-[15px] max-w-lg leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Short, honest, and written to protect you as much as us. Here&apos;s
            exactly how we keep your bags safe and what we can and cannot accept.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="bg-white">
        <div className="max-w-[1280px] mx-auto px-6 py-20 lg:py-28 flex flex-col gap-20 lg:gap-28">

          {/* ── What we store ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-10 lg:gap-20">
            <div>
              <p
                className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E8742C] mb-3"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Storage rules
              </p>
              <h2
                className="text-[#0D1829] font-bold leading-[1.1]"
                style={{
                  fontFamily: "var(--font-poppins)",
                  fontSize: "clamp(22px, 2.5vw, 34px)",
                  letterSpacing: "-0.025em",
                }}
              >
                What we accept and what we don&apos;t.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-0">
              {/* Can store */}
              <div>
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#16A34A] mb-5"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  We accept
                </p>
                <div className="flex flex-col">
                  {canStore.map((item) => (
                    <div key={item} className="flex items-start gap-3 border-t border-[#F0F0EC] py-3.5">
                      <CheckCircle2 size={15} className="text-[#16A34A] flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <span
                        className="text-[14px] text-[#374151] leading-snug"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cannot store */}
              <div>
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#DC2626] mb-5"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  We cannot accept
                </p>
                <div className="flex flex-col">
                  {cannotStore.map((item) => (
                    <div key={item.label} className="flex items-start gap-3 border-t border-[#F0F0EC] py-3.5">
                      <XCircle size={15} className="text-[#DC2626] flex-shrink-0 mt-0.5" strokeWidth={2} />
                      <span
                        className="text-[14px] text-[#374151] leading-snug"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Valuables warning ── */}
          <div className="bg-[#FFF8F4] border border-[#F0D5C0] rounded-2xl px-8 py-6 flex items-start gap-5">
            <div className="w-8 h-8 rounded-full bg-[#E8742C]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <ShieldCheck size={16} className="text-[#E8742C]" strokeWidth={1.75} />
            </div>
            <div>
              <p
                className="text-[14px] font-semibold text-[#16243F] mb-1"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Keep valuables with you.
              </p>
              <p
                className="text-[13.5px] text-[#6B7280] leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                We strongly recommend keeping your passport, cash, jewelry, and electronics
                on you at all times. Stow cannot verify or inventory the contents inside
                sealed luggage — customers remain responsible for what&apos;s packed inside.
              </p>
            </div>
          </div>

          {/* ── Security protocol ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-10 lg:gap-20">
            <div>
              <p
                className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E8742C] mb-3"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Security
              </p>
              <h2
                className="text-[#0D1829] font-bold leading-[1.1]"
                style={{
                  fontFamily: "var(--font-poppins)",
                  fontSize: "clamp(22px, 2.5vw, 34px)",
                  letterSpacing: "-0.025em",
                }}
              >
                Every bag gets the same care.
              </h2>
            </div>

            <div className="flex flex-col">
              {security.map(({ Icon, text }, i) => (
                <div
                  key={text}
                  className={`flex items-center gap-5 py-5 ${
                    i < security.length - 1 ? "border-b border-[#F0F0EC]" : ""
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-[#F4F4F0] flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[#16243F]" strokeWidth={1.75} />
                  </div>
                  <p
                    className="text-[15px] text-[#374151]"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Liability ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-10 lg:gap-20">
            <div>
              <p
                className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E8742C] mb-3"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Liability
              </p>
              <h2
                className="text-[#0D1829] font-bold leading-[1.1]"
                style={{
                  fontFamily: "var(--font-poppins)",
                  fontSize: "clamp(22px, 2.5vw, 34px)",
                  letterSpacing: "-0.025em",
                }}
              >
                If something goes wrong.
              </h2>
            </div>

            <div className="flex flex-col gap-5">
              <p
                className="text-[15px] text-[#4B5563] leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Stow is responsible for your bag from the moment we tag it to the moment
                you pick it up. If an item is lost or damaged due to our negligence,
                WhatsApp us the same day and we will resolve it.
              </p>
              <p
                className="text-[15px] text-[#4B5563] leading-relaxed"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                We cannot verify or inspect the contents inside sealed bags. Customers
                remain fully responsible for what is packed inside their own luggage.
                We reserve the right to refuse any item that appears unsafe, prohibited,
                or outside the scope of standard travel luggage.
              </p>
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="border-t border-[#E8E8E4] pt-12 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            <div>
              <p
                className="text-[18px] font-bold text-[#0D1829] mb-2"
                style={{ fontFamily: "var(--font-poppins)", letterSpacing: "-0.02em" }}
              >
                Still have a question?
              </p>
              <p
                className="text-[14px] text-[#6B7280]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                We&apos;re here in English and Vietnamese. Just WhatsApp us.
              </p>
            </div>
            <div className="flex gap-3 sm:justify-end flex-wrap">
              <a
                href="https://wa.me/84905955161"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#E2E2DE] text-[#16243F] text-[14px] font-semibold px-5 py-2.5 rounded-xl hover:bg-[#F4F4F0] transition-colors"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                <MessageCircle size={15} strokeWidth={1.75} />
                WhatsApp us
              </a>
              <Link
                href="/#booking"
                className="inline-flex items-center justify-center bg-[#E8742C] text-white text-[14px] font-semibold px-5 py-2.5 rounded-xl hover:bg-[#C85E1E] transition-colors"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Book Storage
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
