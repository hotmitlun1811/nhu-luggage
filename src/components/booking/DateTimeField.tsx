"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Popover } from "@base-ui/react/popover";
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { formatLongDate, formatMonthYear, formatShortDate, formatWeekdayDate, weekdayInitials, type AppLocale } from "@/lib/format";

/**
 * One field for "date, then time". Tapping it opens a small panel: pick a day
 * on the calendar and it moves straight on to the time list; pick a time and
 * the panel closes. Two taps to fill a whole date-and-time. The closed field is
 * narrow enough to sit two to a row and reads back on ONE line: "Sun, 20 Sept
 * · 09:00" (no weekday on a phone). While empty it says "Date · Time", which
 * is also the order they are chosen in.
 *
 * Why not two native inputs: the native date and time controls look different
 * on every browser, can't be limited to the shop's 07:00–22:00 half-hour
 * slots, and a time list can't hide slots that have already passed today.
 *
 * Dates are "YYYY-MM-DD" strings throughout (the form's own format), never
 * `Date` objects across the boundary, so time zones can't shift a day.
 */

type Stage = "date" | "time";

const pad = (n: number) => String(n).padStart(2, "0");
const toIso = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;
function parseIso(iso: string) {
  return { y: Number(iso.slice(0, 4)), m: Number(iso.slice(5, 7)) - 1, d: Number(iso.slice(8, 10)) };
}
function shiftIso(iso: string, days: number) {
  const { y, m, d } = parseIso(iso);
  const t = new Date(y, m, d + days, 12);
  return toIso(t.getFullYear(), t.getMonth(), t.getDate());
}

/** Always 42 cells (6 weeks, Monday first) so the panel never changes height between months. */
function monthCells(y: number, m: number): (string | null)[] {
  const lead = (new Date(y, m, 1, 12).getDay() + 6) % 7;
  const days = new Date(y, m + 1, 0, 12).getDate();
  const cells: (string | null)[] = Array(lead).fill(null);
  for (let d = 1; d <= days; d++) cells.push(toIso(y, m, d));
  while (cells.length < 42) cells.push(null);
  return cells;
}

const TAB =
  "flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-[12px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E8742C] disabled:cursor-not-allowed disabled:opacity-35";
const NAV_BTN =
  "flex h-[30px] w-[30px] items-center justify-center rounded-md text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E8742C] disabled:cursor-not-allowed disabled:text-white/20 disabled:hover:bg-transparent";

export default function DateTimeField({
  id,
  labelId,
  className,
  locale,
  date,
  time = "",
  onDateChange,
  onTimeChange = () => {},
  minDate,
  maxDate,
  today,
  dateLocked = false,
  dateOnly = false,
  disabled = false,
  slotsFor = () => [],
  emptySlotsNote = "",
  popupAlign = "start",
  dateWord,
  timeWord = "",
  prevMonthLabel,
  nextMonthLabel,
}: {
  /** id of the trigger button; the parent's <label htmlFor> points here. */
  id: string;
  /** id of that label, so the button is announced as "label + current value". */
  labelId: string;
  /** Field styling, supplied by the form so every input in it matches. */
  className: string;
  locale: AppLocale;
  date: string;
  /** Not used when `dateOnly`. */
  time?: string;
  onDateChange: (iso: string) => void;
  /** Not used when `dateOnly`. */
  onTimeChange?: (t: string) => void;
  minDate: string;
  maxDate?: string;
  today: string;
  /** The date is decided elsewhere (By the Hour is same-day): only the time is chosen here. */
  dateLocked?: boolean;
  /**
   * Only a date is asked for (the "extend my storage" form): no time step, the
   * panel closes on the day tapped, and the closed field reads "Sat, 27 September 2026".
   * The time props are not needed then.
   */
  dateOnly?: boolean;
  disabled?: boolean;
  /**
   * The times selectable on a given date. A function, not a list, so the
   * calendar can grey out any day that has no valid time (a plan's last day
   * might only allow the early hours, today may have none left).
   */
  slotsFor?: (iso: string) => string[];
  /** Shown instead of the time list when the chosen date has no times. */
  emptySlotsNote?: string;
  /** Which edge of the field the popup lines up with (the right-hand field of a row uses "end"). */
  popupAlign?: "start" | "end";
  dateWord: string;
  timeWord?: string;
  prevMonthLabel: string;
  nextMonthLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("date");
  const [view, setView] = useState(() => {
    const s = parseIso(date || minDate);
    return { y: s.y, m: s.m };
  });
  const popupRef = useRef<HTMLDivElement>(null);

  // Open on whichever half still needs an answer: the time once a date is
  // chosen, the calendar otherwise (and again when both are already set, since
  // changing the day is the likelier edit).
  function handleOpenChange(next: boolean) {
    if (next) {
      const s = parseIso(date || minDate);
      setView({ y: s.y, m: s.m });
      setStage(dateOnly ? "date" : dateLocked ? "time" : !date ? "date" : !time ? "time" : "date");
    }
    setOpen(next);
  }

  // Put keyboard focus on the current day / time each time the panel opens or
  // flips between calendar and time list. Not on month changes, or the focus
  // would jump off the month arrows while they're being clicked.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => popupRef.current?.querySelector<HTMLElement>("[data-anchor]")?.focus(), 40);
    return () => clearTimeout(t);
  }, [open, stage]);

  const cells = useMemo(() => monthCells(view.y, view.m), [view]);
  const weekdays = useMemo(() => weekdayInitials(locale), [locale]);
  const viewIdx = view.y * 12 + view.m;
  const minParts = parseIso(minDate);
  const maxParts = maxDate ? parseIso(maxDate) : null;
  const canPrev = viewIdx > minParts.y * 12 + minParts.m;
  const canNext = !maxParts || viewIdx < maxParts.y * 12 + maxParts.m;
  const isOff = (iso: string) => iso < minDate || (!!maxDate && iso > maxDate) || (!dateOnly && slotsFor(iso).length === 0);
  const slots = date && !dateOnly ? slotsFor(date) : [];

  // The one day that is in the Tab order (the rest are reached with arrow keys).
  const anchorIso =
    date && cells.includes(date) && !isOff(date) ? date
    : cells.includes(today) && !isOff(today) ? today
    : cells.find((c) => c && !isOff(c)) ?? null;
  const anchorSlot = time && slots.includes(time) ? time : slots[0];

  function goMonth(delta: number) {
    const t = new Date(view.y, view.m + delta, 1, 12);
    setView({ y: t.getFullYear(), m: t.getMonth() });
  }

  function onDayKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, iso: string) {
    const stepBy: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    let target: string | null = null;
    if (e.key in stepBy) {
      target = shiftIso(iso, stepBy[e.key]);
    } else if (e.key === "PageDown" || e.key === "PageUp") {
      const { y, m, d } = parseIso(iso);
      const t = new Date(y, m + (e.key === "PageDown" ? 1 : -1), 1, 12);
      const lastDay = new Date(t.getFullYear(), t.getMonth() + 1, 0, 12).getDate();
      target = toIso(t.getFullYear(), t.getMonth(), Math.min(d, lastDay));
    }
    if (!target) return;
    e.preventDefault();
    if (isOff(target)) return;
    const p = parseIso(target);
    setView({ y: p.y, m: p.m });
    const focusIso = target;
    setTimeout(() => popupRef.current?.querySelector<HTMLElement>(`[data-iso="${focusIso}"]`)?.focus(), 0);
  }

  function onSlotKeyDown(e: React.KeyboardEvent<HTMLButtonElement>, i: number) {
    const stepBy: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -6, ArrowDown: 6 };
    if (!(e.key in stepBy)) return;
    e.preventDefault();
    const j = i + stepBy[e.key];
    if (j < 0 || j >= slots.length) return;
    popupRef.current?.querySelector<HTMLElement>(`[data-slot-i="${j}"]`)?.focus();
  }

  const valueId = `${id}-value`;

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Trigger
        id={id}
        type="button"
        disabled={disabled}
        aria-labelledby={`${labelId} ${valueId}`}
        // On a phone the two fields share one row, so each gets about 130px:
        // less padding and no arrow keep "20 Sept · 09:00" whole. A cut-off
        // time would hide the half of the value that matters most.
        className={`${className} flex items-center justify-between gap-2 ${
          // A date-only field is full width, so it keeps its normal padding and text size.
          dateOnly ? "" : "max-sm:gap-1 max-sm:px-[10px] max-[360px]:text-[12px] max-[340px]:px-[8px] max-[340px]:text-[11.5px]"
        } text-left disabled:cursor-not-allowed disabled:opacity-60`}
      >
        <span id={valueId} className="min-w-0 flex-1 truncate">
          {dateOnly ? (
            date ? (
              <span className="text-white">{formatLongDate(date, locale)}</span>
            ) : (
              <span className="text-white/30" aria-hidden>{dateWord}</span>
            )
          ) : (
            <>
              {date ? (
                <>
                  {/* The weekday only where there is room; a phone's half-width
                      field shows "20 Sept" so the whole value stays on one line. */}
                  <span className="text-white max-sm:hidden">{formatWeekdayDate(date, locale)}</span>
                  <span className="text-white sm:hidden">{formatShortDate(date, locale)}</span>
                </>
              ) : (
                // Empty-state hints are decoration: the label already says what the field is.
                <span className="text-white/30" aria-hidden>{dateWord}</span>
              )}
              <span className="text-white/25" aria-hidden>{" · "}</span>
              {time ? <span className="text-white/80">{time}</span> : <span className="text-white/30" aria-hidden>{timeWord}</span>}
            </>
          )}
        </span>
        <ChevronDown size={14} className={`flex-shrink-0 text-white/40 ${dateOnly ? "" : "max-sm:hidden"}`} aria-hidden />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Positioner side="bottom" align={popupAlign} sideOffset={6} collisionPadding={12} className="z-[70]">
          <Popover.Popup
            ref={popupRef}
            aria-labelledby={labelId}
            className="w-[296px] max-w-[calc(100vw-24px)] rounded-xl border border-white/[0.16] bg-[#16243F] p-3 text-white shadow-2xl outline-none transition-opacity duration-100 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0"
            style={{ fontFamily: "var(--font-inter)", colorScheme: "dark" }}
          >
            {/* Date / Time tabs — they show the current choice, and either can be tapped to go back to it. Nothing to switch between when only a date is asked. */}
            {!dateOnly && (
            <div className="flex gap-[3px] rounded-lg border border-white/[0.08] bg-white/[0.06] p-[3px]">
              <button
                type="button"
                disabled={dateLocked}
                aria-pressed={stage === "date"}
                onClick={() => setStage("date")}
                className={`${TAB} ${stage === "date" ? "bg-white text-[#0D1829]" : "text-white/55 hover:text-white"}`}
              >
                <CalendarDays size={13} aria-hidden />
                {date ? formatShortDate(date, locale) : dateWord}
              </button>
              <button
                type="button"
                disabled={!date}
                aria-pressed={stage === "time"}
                onClick={() => setStage("time")}
                className={`${TAB} ${stage === "time" ? "bg-white text-[#0D1829]" : "text-white/55 hover:text-white"}`}
              >
                <Clock size={13} aria-hidden />
                {time || timeWord}
              </button>
            </div>
            )}

            {stage === "date" ? (
              <div className={dateOnly ? "" : "mt-3"}>
                <div className="mb-1.5 flex items-center justify-between">
                  <button type="button" aria-label={prevMonthLabel} disabled={!canPrev} onClick={() => goMonth(-1)} className={NAV_BTN}>
                    <ChevronLeft size={16} aria-hidden />
                  </button>
                  <p className="text-[13px] font-semibold" style={{ fontFamily: "var(--font-poppins)" }} aria-live="polite">
                    {formatMonthYear(view.y, view.m, locale)}
                  </p>
                  <button type="button" aria-label={nextMonthLabel} disabled={!canNext} onClick={() => goMonth(1)} className={NAV_BTN}>
                    <ChevronRight size={16} aria-hidden />
                  </button>
                </div>
                <div className="mb-1 grid grid-cols-7 text-center text-[10px] font-semibold uppercase text-white/35" aria-hidden>
                  {weekdays.map((w, i) => <span key={i}>{w}</span>)}
                </div>
                <div className="grid grid-cols-7 gap-y-1">
                  {cells.map((iso, i) => {
                    if (!iso) return <span key={i} aria-hidden />;
                    const off = isOff(iso);
                    const selected = iso === date;
                    return (
                      <button
                        key={iso}
                        type="button"
                        data-iso={iso}
                        data-anchor={iso === anchorIso ? "" : undefined}
                        tabIndex={iso === anchorIso ? 0 : -1}
                        aria-label={formatLongDate(iso, locale)}
                        aria-pressed={selected}
                        aria-disabled={off || undefined}
                        onClick={() => {
                          if (off) return;
                          onDateChange(iso);
                          if (dateOnly) setOpen(false);
                          else setStage("time");
                        }}
                        onKeyDown={(e) => onDayKeyDown(e, iso)}
                        className={`h-[36px] rounded-lg text-[13px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E8742C] ${
                          selected
                            ? "bg-[#E8742C] font-bold text-white"
                            : off
                            ? "cursor-not-allowed text-white/20"
                            : `text-white/85 hover:bg-white/10 ${iso === today ? "ring-1 ring-inset ring-white/35" : ""}`
                        }`}
                      >
                        {Number(iso.slice(8))}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="mt-3">
                {slots.length === 0 ? (
                  <p className="py-2 text-[12px] leading-snug text-[#E8742C]">{emptySlotsNote}</p>
                ) : (
                  <div className="grid max-h-[240px] grid-cols-6 gap-1.5 overflow-y-auto">
                    {slots.map((t, i) => {
                      const selected = t === time;
                      return (
                        <button
                          key={t}
                          type="button"
                          data-slot-i={i}
                          data-anchor={t === anchorSlot ? "" : undefined}
                          tabIndex={t === anchorSlot ? 0 : -1}
                          aria-pressed={selected}
                          onClick={() => {
                            onTimeChange(t);
                            setOpen(false);
                          }}
                          onKeyDown={(e) => onSlotKeyDown(e, i)}
                          className={`h-[34px] rounded-md border text-[12px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#E8742C] ${
                            selected
                              ? "border-[#E8742C] bg-[#E8742C] font-bold text-white"
                              : "border-white/[0.12] bg-white/[0.06] text-white/85 hover:border-white/30"
                          }`}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
