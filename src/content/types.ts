import type { en } from "./en";

/**
 * Every per-domain dictionary file uses `as const` (so `dict.plans.hourly`
 * etc. stay precise tuples/literal unions where that matters, like
 * `PlanKey`-indexed records) — but that also makes `typeof en` infer
 * literal string types ("How It Works"), which would make `Dictionary`
 * require that *exact* English string in every locale. `Widen` recovers
 * the actual intent: keep the shape (which keys exist, arrays vs.
 * objects), widen every leaf to its base primitive type.
 */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends null
        ? null
        : T extends readonly (infer U)[]
          ? readonly Widen<U>[]
          : T extends object
            ? { -readonly [K in keyof T]: Widen<T[K]> }
            : T;

/**
 * English is the schema. Every other locale's dictionary is checked with
 * `satisfies Dictionary`, so a missing translation key is a `next build`
 * type error — not a silently-blank div in production. This repo has no
 * test framework, so this is the only automated safety net; per the i18n
 * plan (decision #6), leaning on it hard is deliberate.
 */
export type Dictionary = Widen<typeof en>;
