"use client";

import { useEffect, useState } from "react";

/**
 * Thin reading-progress bar that fills as the reader scrolls a guide. Sits
 * just under the 72px fixed nav. Purely decorative (aria-hidden), and it
 * degrades to an invisible 0%-width bar if JS is off — no layout impact.
 */
export default function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setPct(max > 0 ? Math.min(100, Math.max(0, (el.scrollTop / max) * 100)) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 z-[45] h-[3px] bg-[#E8742C] transition-[width] duration-100 ease-out"
      style={{ top: "72px", width: `${pct}%` }}
    />
  );
}
