import type { Metadata } from "next";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import PrimaryNav from "@/components/layout/PrimaryNav";
import BookingForm from "@/components/booking/BookingForm";

export const metadata: Metadata = {
  title: "Book Storage — Stow Da Nang",
  description:
    "Book luggage storage in Da Nang. Choose your plan, pick a drop-off time, and we'll confirm via WhatsApp in minutes.",
};

export default function BookPage() {
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
            Booking
          </p>
          <h1
            className="text-white font-bold leading-[1.08] mb-4"
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "clamp(28px, 4vw, 48px)",
            }}
          >
            Book your storage
          </h1>
          <p
            className="text-white/55 text-[15px] max-w-lg leading-relaxed"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Choose what fits. Pick your drop-off time. Confirm via WhatsApp — we reply within 15 minutes.
            If your flight gets delayed or plans shift, just message us and we&apos;ll adjust.
          </p>
        </div>
      </div>

      {/* Form area */}
      <div className="bg-[#F4F4F0] min-h-[80vh]">
        <div className="max-w-[1280px] mx-auto px-6 py-10 lg:py-14">
          <BookingForm />
        </div>
      </div>
    </main>
  );
}
