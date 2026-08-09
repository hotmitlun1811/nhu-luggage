import Link from "next/link";

/* Explicit per-group not-found — see (en)/not-found.tsx's note on why.
   Kept English/untranslated: `not-found.tsx` doesn't receive the [lang]
   route param the way a normal page does, and this is a low-traffic edge
   (dynamicParams = false already turns most bad URLs under /ko into a
   clean 404 before this even renders). */
export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#16243F] flex items-center justify-center px-6">
      <div className="text-center">
        <p
          className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8742C] mb-4"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          404
        </p>
        <h1
          className="text-white font-bold leading-[1.1] mb-4"
          style={{ fontFamily: "var(--font-poppins)", fontSize: "clamp(28px, 4vw, 44px)" }}
        >
          This page isn&apos;t here.
        </h1>
        <p
          className="text-white/50 text-[15px] mb-8"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          The page you&apos;re looking for doesn&apos;t exist or moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-[#E8742C] text-white text-[13.5px] font-bold px-7 py-3 rounded-[4px] hover:bg-[#C85E1E] transition-colors tracking-[0.06em] uppercase"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
