"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

/**
 * A whole-number field with − / + buttons and a typeable centre, so 1–2 bags
 * is two taps with no keyboard, and a group of 12 can still be typed.
 *
 * `value` is always the source of truth and is always inside [min, max]. The
 * only local state is the text being typed, which exists so the box can be
 * briefly empty mid-edit (select all, retype) without the value snapping back
 * on every keystroke. Outside an edit the box just shows `value`, so a clamp
 * done by the parent (fewer bags than oversized bags) shows up immediately
 * with no syncing effect.
 */
export default function CountField({
  id,
  value,
  min,
  max,
  onChange,
  decLabel,
  incLabel,
  invalid = false,
}: {
  id: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  decLabel: string;
  incLabel: string;
  invalid?: boolean;
}) {
  const [text, setText] = useState<string | null>(null);
  const clamp = (n: number) => Math.min(max, Math.max(min, n));

  const stepButton =
    "flex h-full w-[38px] flex-shrink-0 items-center justify-center text-white/60 transition-colors hover:text-white disabled:text-white/20 disabled:hover:text-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#E8742C]";

  return (
    <div
      className={`flex h-[38px] items-center rounded-lg border bg-white/[0.07] transition-colors focus-within:border-[#E8742C]/70 ${
        invalid ? "border-red-400/70" : "border-white/[0.12]"
      }`}
    >
      <button
        type="button"
        aria-label={decLabel}
        disabled={value <= min}
        onClick={() => onChange(clamp(value - 1))}
        className={stepButton}
      >
        <Minus size={14} strokeWidth={2.25} aria-hidden />
      </button>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="off"
        aria-invalid={invalid || undefined}
        value={text ?? String(value)}
        onFocus={(e) => {
          const el = e.currentTarget;
          setText(String(value));
          setTimeout(() => el.select(), 0);
        }}
        onChange={(e) => {
          const digits = e.target.value.replace(/\D/g, "");
          if (!digits) { setText(""); return; }
          // Clamp the visible text too, so the box never shows a number that
          // differs from what is being charged ("99" snaps to the max at once).
          const n = clamp(parseInt(digits, 10));
          setText(String(n));
          onChange(n);
        }}
        onBlur={() => {
          if (text === "") onChange(min);
          setText(null);
        }}
        className="min-w-0 flex-1 bg-transparent text-center text-[14px] font-semibold text-white focus:outline-none"
        style={{ fontFamily: "var(--font-poppins)" }}
      />
      <button
        type="button"
        aria-label={incLabel}
        disabled={value >= max}
        onClick={() => onChange(clamp(value + 1))}
        className={stepButton}
      >
        <Plus size={14} strokeWidth={2.25} aria-hidden />
      </button>
    </div>
  );
}
