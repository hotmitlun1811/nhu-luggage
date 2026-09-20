"use client";

import { Popover } from "@base-ui/react/popover";
import { Info } from "lucide-react";

/**
 * A small "i" button that opens a short explanation. A popover, not a
 * hover-only tooltip: most visitors are on phones, where there is no hover,
 * so it opens on tap and on hover, and closes on Escape or an outside tap.
 *
 * The popup renders in a portal. The booking panel is `overflow-hidden`, so a
 * normally positioned popup near the panel edge would be cut off; the portal
 * plus collision padding keeps it fully on screen.
 */
export default function InfoTip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Popover.Root>
      <Popover.Trigger
        type="button"
        openOnHover
        delay={120}
        aria-label={label}
        // 24px hit area (WCAG 2.2 target size) pulled back with negative
        // margins so it doesn't make the label row taller than the label.
        className="-my-[6px] inline-flex h-[24px] w-[24px] flex-shrink-0 items-center justify-center rounded-full text-white/45 transition-colors hover:text-white/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#E8742C] data-[popup-open]:text-[#E8742C]"
      >
        <Info size={14} strokeWidth={2} aria-hidden />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={6} collisionPadding={12} className="z-[70]">
          <Popover.Popup
            className="max-w-[260px] rounded-lg border border-white/[0.16] bg-[#16243F] px-3 py-2.5 text-[12px] leading-snug text-white/85 shadow-xl outline-none transition-opacity duration-100 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <Popover.Description className="m-0">{children}</Popover.Description>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
