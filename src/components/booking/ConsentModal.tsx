"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import TermsOfServiceContent from "@/components/legal/TermsOfServiceContent";
import PrivacyPolicyContent from "@/components/legal/PrivacyPolicyContent";
import { EMAIL } from "@/components/legal/LegalShared";

// How close to the bottom (px) counts as "reached the end" — a couple of
// lines of slack so sub-pixel scroll rounding never blocks the button.
const SCROLL_THRESHOLD_PX = 24;

// Only mounted while `open` is true (see ConsentModal below), so its state
// starts fresh — including the scroll-gate — every time it opens, with no
// reset effect required.
function ConsentDialog({ onClose, onAgree }: { onClose: () => void; onAgree: () => void }) {
  const [reachedEnd, setReachedEnd] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  function isAtBottom(el: HTMLDivElement) {
    return el.scrollTop + el.clientHeight >= el.scrollHeight - SCROLL_THRESHOLD_PX;
  }

  // Content this short (a wide screen, a zoomed-out browser) may not overflow
  // at all — no scroll event ever fires, so the gate must not require one. A
  // callback ref runs synchronously at mount/layout (unlike a setState call
  // inside an effect, which would double-render), so it can safely check fit
  // as soon as the node exists.
  function measureRef(node: HTMLDivElement | null) {
    scrollRef.current = node;
    if (node && isAtBottom(node)) setReachedEnd(true);
  }

  // Re-check on resize (e.g. orientation change) in case content that used
  // to overflow no longer does.
  useEffect(() => {
    function onResize() {
      const el = scrollRef.current;
      if (el && isAtBottom(el)) setReachedEnd(true);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock page scroll for as long as the dialog is mounted.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prevOverflow; };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el || reachedEnd) return;
    if (isAtBottom(el)) setReachedEnd(true);
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#0D1829]/70 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="consent-modal-title"
        className="relative w-full sm:max-w-[560px] sm:mx-6 sm:rounded-2xl rounded-t-2xl bg-white flex flex-col overflow-hidden shadow-2xl"
        style={{ maxHeight: "min(88vh, 720px)" }}
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 16, opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-6 sm:px-[32px] py-5 border-b border-[#EAEAE6] flex-shrink-0">
          <div className="min-w-0">
            <p id="consent-modal-title" className="text-[15px] font-bold text-[#16243F]" style={{ fontFamily: "var(--font-poppins)" }}>
              Terms of Service &amp; Privacy Policy
            </p>
            <p className="text-[11.5px] text-[#9CA3AF] mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>
              Please read both in full before confirming
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex-shrink-0 w-[32px] h-[32px] rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-[#16243F] hover:bg-[#F4F4F0] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable content */}
        <div
          ref={measureRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-6 py-6 sm:px-[32px] overscroll-contain"
        >
          <TermsOfServiceContent />

          <div className="my-10 pt-[32px] border-t-2 border-[#16243F]/10">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#E8742C] mb-1" style={{ fontFamily: "var(--font-poppins)" }}>
              Part 2
            </p>
            <h2 className="text-[20px] font-bold text-[#16243F]" style={{ fontFamily: "var(--font-poppins)" }}>
              Privacy Policy
            </h2>
          </div>

          <PrivacyPolicyContent />

          <p className="text-[11px] text-[#9CA3AF] pt-2 pb-1" style={{ fontFamily: "var(--font-inter)" }}>
            That&apos;s everything. Questions? Email {EMAIL}.
          </p>
        </div>

        {/* Footer — extra bottom padding on mobile clears the iPhone home-indicator gesture area */}
        <div className="flex-shrink-0 border-t border-[#EAEAE6] px-6 sm:px-[32px] pt-5 pb-[max(20px,env(safe-area-inset-bottom))] sm:pb-5">
          {!reachedEnd && (
            <div className="flex items-center gap-1.5 justify-center mb-3 text-[11.5px] text-[#9CA3AF]" style={{ fontFamily: "var(--font-inter)" }}>
              <ChevronDown size={13} className="animate-bounce" />
              Scroll to the end to continue
            </div>
          )}
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 text-[13px] font-semibold text-[#6B7280] border border-[#D1D5DB] rounded-lg py-2.5 hover:bg-[#F4F4F0] transition-colors"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!reachedEnd}
              onClick={onAgree}
              className="flex-[2] text-[13px] font-bold text-white rounded-lg py-2.5 transition-colors bg-[#E8742C] hover:bg-[#C85E1E] disabled:bg-[#D1D5DB] disabled:cursor-not-allowed disabled:hover:bg-[#D1D5DB]"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              I Agree to Both
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Client-only (see the `dynamic(..., { ssr: false })` import in
// HeroBookingForm), so `document` is always available here — no server
// render ever calls this component, so no mounted-gate/hydration dance
// is needed for the portal target.
export default function ConsentModal({
  open,
  onClose,
  onAgree,
}: {
  open: boolean;
  onClose: () => void;
  onAgree: () => void;
}) {
  return createPortal(
    <AnimatePresence>
      {open && <ConsentDialog onClose={onClose} onAgree={onAgree} />}
    </AnimatePresence>,
    document.body
  );
}
