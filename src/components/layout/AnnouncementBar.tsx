import { Clock, Phone } from "lucide-react";
import type { Dictionary } from "@/content/types";

export default function AnnouncementBar({ dict }: { dict: Dictionary["announcement"] }) {
  return (
    <div className="w-full bg-[#16243F] text-white flex items-center justify-center h-9 px-4">
      <p
        className="text-[12.5px] font-medium text-center flex items-center gap-2"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        <Clock size={12} className="text-[#E8742C] flex-shrink-0" />
        <span>{dict.hours}</span>
        <span className="text-white/25 mx-1">|</span>
        <Phone size={11} className="text-[#E8742C] flex-shrink-0" />
        <span>
          {dict.whatsappLabel}&nbsp;
          <a
            href="https://wa.me/84905955161"
            className="text-[#E8742C] font-semibold hover:text-white transition-colors"
          >
            0905 955 161
          </a>
        </span>
        <span className="text-white/25 mx-1 hidden sm:inline">|</span>
        <span className="hidden sm:inline text-white/60">{dict.location}</span>
      </p>
    </div>
  );
}
