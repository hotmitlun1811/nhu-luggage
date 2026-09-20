"use client";

import { Select } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import { FLAT_PLANS, FLEX_PLANS, PLAN_FACTS, vnd, type Lane, type PlanKey } from "@/lib/plans";
import type { PlanChoice } from "@/lib/pricing";
import type { Dictionary } from "@/content/types";

/**
 * All the plans in one dropdown, split under "Flexible", "Flat Rate" and
 * "Custom" headings so it is obvious which plan belongs to which lane. The lane
 * is not chosen separately: it follows from the plan (`PLAN_FACTS[plan].lane`).
 * Custom is for any stay that doesn't fit a plan (23 days, 45 days, 3 months):
 * its price is worked out from the dates, so the row says "Best price" instead
 * of a figure.
 *
 * There is deliberately NO default plan. It starts empty ("Choose your plan"),
 * and the form below stays locked until one is picked, so nobody submits a
 * plan they never looked at.
 *
 * Custom rather than a native <select> so each row can show what a customer
 * needs to compare plans (name, price per bag, how long it covers) and the
 * popup matches the rest of the form. The closed control shows the same three
 * facts for the chosen plan.
 */
type GroupKey = Lane | "custom";
const GROUPS: { lane: GroupKey; plans: PlanChoice[] }[] = [
  { lane: "flexible", plans: FLEX_PLANS },
  { lane: "flatrate", plans: FLAT_PLANS },
  { lane: "custom", plans: ["custom"] },
];

const groupOf = (pk: PlanChoice): GroupKey => (pk === "custom" ? "custom" : PLAN_FACTS[pk].lane);
const isPopular = (pk: PlanChoice) => pk !== "custom" && !!PLAN_FACTS[pk as PlanKey].popular;

export default function PlanSelect({
  value,
  onChange,
  open,
  onOpenChange,
  dict,
  className,
}: {
  /** null until the customer has chosen. */
  value: PlanChoice | null;
  onChange: (plan: PlanChoice) => void;
  /** Controlled so the locked part of the form can open this dropdown when it is tapped. */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dict: Dictionary["booking"];
  /** Field styling, supplied by the form so every input in it matches. */
  className: string;
}) {
  const laneName = (g: GroupKey) => (g === "flexible" ? dict.laneFlexible : g === "flatrate" ? dict.laneFlatRate : dict.laneCustom);
  const laneSub = (g: GroupKey) => (g === "flexible" ? dict.laneFlexibleSub : g === "flatrate" ? dict.laneFlatRateSub : dict.laneCustomSub);

  const topBadge = (
    <span
      className="flex-shrink-0 rounded-full bg-[#E8742C] px-1.5 text-[8px] font-bold leading-[1.7] text-white"
      style={{ fontFamily: "var(--font-poppins)" }}
    >
      {dict.planTopBadge}
    </span>
  );
  const price = (pk: PlanChoice) => (
    <span className="flex-shrink-0 text-[12px] font-bold text-[#E8742C]" style={{ fontFamily: "var(--font-poppins)" }}>
      {pk === "custom" ? (
        dict.customPrice
      ) : (
        <>
          {vnd(PLAN_FACTS[pk].price)}
          <span className="font-medium opacity-70"> / {dict.bagUnit.singular}</span>
        </>
      )}
    </span>
  );

  return (
    <Select.Root
      value={value}
      onValueChange={(v) => { if (v) onChange(v as PlanChoice); }}
      open={open}
      onOpenChange={onOpenChange}
    >
      <Select.Label
        className="mb-1.5 block cursor-default text-[10px] font-bold uppercase tracking-[0.12em] text-white/30"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {dict.planLabel}
      </Select.Label>

      {/* min-h keeps the closed control the same height empty and filled, so
          choosing a plan doesn't push the form down. While nothing is chosen
          the box turns white and pulses (`plan-attention`, globals.css): it is
          the one thing to do first. The white comes from data-[empty] variants,
          which outrank the shared field style's dark background and border in
          `className` regardless of the order the stylesheet lists them. */}
      <Select.Trigger
        data-empty={value ? undefined : ""}
        className={`${className} flex min-h-[54px] items-center gap-3 text-left data-[empty]:border-white data-[empty]:bg-white ${
          value ? "" : "plan-attention"
        }`}
      >
        <Select.Value className="flex min-w-0 flex-1 items-center justify-between gap-3">
          {(pk: PlanChoice | null) =>
            pk ? (
              <>
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5">
                    <span className="truncate text-[13px] font-semibold text-white" style={{ fontFamily: "var(--font-poppins)" }}>
                      {dict.planNames[pk]}
                    </span>
                    {isPopular(pk) && topBadge}
                  </span>
                  <span className="block truncate text-[10.5px] text-white/45">
                    {laneName(groupOf(pk))} · {dict.planDurations[pk]}
                  </span>
                </span>
                {price(pk)}
              </>
            ) : (
              <span className="truncate text-[13px] font-semibold text-[#0D1829]" style={{ fontFamily: "var(--font-poppins)" }}>
                {dict.planPlaceholder}
              </span>
            )
          }
        </Select.Value>
        <Select.Icon>
          <ChevronDown size={14} className={value ? "text-white/40" : "text-[#0D1829]/60"} aria-hidden />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Positioner alignItemWithTrigger={false} sideOffset={6} collisionPadding={12} className="z-[70] outline-none">
          <Select.Popup
            className="min-w-[var(--anchor-width)] max-w-[calc(100vw-24px)] overflow-hidden rounded-xl border border-white/[0.16] bg-[#16243F] text-white shadow-2xl outline-none transition-opacity duration-100 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0"
            style={{ fontFamily: "var(--font-inter)", colorScheme: "dark" }}
          >
            <Select.List className="max-h-[var(--available-height)] overflow-y-auto py-1.5">
              {GROUPS.map((g, gi) => (
                <Select.Group key={g.lane} className={gi > 0 ? "mt-1.5 border-t border-white/[0.09] pt-1.5" : ""}>
                  <Select.GroupLabel className="flex flex-wrap items-baseline gap-x-2 px-3 pb-1 pt-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#E8742C]" style={{ fontFamily: "var(--font-poppins)" }}>
                      {laneName(g.lane)}
                    </span>
                    <span className="text-[10.5px] text-white/40">{laneSub(g.lane)}</span>
                  </Select.GroupLabel>
                  {g.plans.map((pk) => (
                    <Select.Item
                      key={pk}
                      value={pk}
                      className="grid cursor-pointer grid-cols-[14px_1fr_auto] items-center gap-2.5 px-3 py-2 outline-none data-[highlighted]:bg-white/10 data-[selected]:bg-[#E8742C]/[0.13]"
                    >
                      <Select.ItemIndicator className="col-start-1 flex text-[#E8742C]">
                        <Check size={14} strokeWidth={3} aria-hidden />
                      </Select.ItemIndicator>
                      <Select.ItemText className="col-start-2 min-w-0">
                        <span className="flex items-center gap-1.5">
                          <span className="text-[13px] font-semibold" style={{ fontFamily: "var(--font-poppins)" }}>
                            {dict.planNames[pk]}
                          </span>
                          {isPopular(pk) && topBadge}
                        </span>
                        <span className="block text-[10.5px] text-white/45">{dict.planDurations[pk]}</span>
                      </Select.ItemText>
                      <span className="col-start-3">{price(pk)}</span>
                    </Select.Item>
                  ))}
                </Select.Group>
              ))}
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
