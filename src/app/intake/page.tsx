import type { Metadata } from "next";
import Link from "next/link";
import IntakeForm from "@/components/intake/IntakeForm";

export const metadata: Metadata = {
  title: "Walk-in Intake — Stow Staff",
  description: "Staff intake form for walk-in customers.",
  robots: { index: false, follow: false },
};

export default function IntakePage() {
  return (
    <main className="min-h-screen bg-[#16243F]">
      {/* Staff header */}
      <div className="border-b border-white/10 px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-6 bg-[#E8742C] rounded-md flex items-center justify-center">
            <span
              className="text-white font-bold text-[12px] leading-none"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              S
            </span>
          </div>
          <div>
            <p
              className="text-[14px] font-bold text-white leading-none"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Stow
            </p>
            <p
              className="text-[11px] text-white/35 mt-0.5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Walk-in intake
            </p>
          </div>
        </div>
        <Link
          href="/"
          className="text-[12px] text-white/30 hover:text-white/60 transition-colors"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          ← Home
        </Link>
      </div>

      <IntakeForm />
    </main>
  );
}
