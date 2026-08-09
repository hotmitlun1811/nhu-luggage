import type { Dictionary } from "../types";
import { nav } from "./nav";
import { announcement } from "./announcement";
import { hero } from "./hero";
import { howItWorks } from "./how-it-works";
import { services } from "./services";
import { pricing } from "./pricing";
import { expats } from "./expats";
import { why } from "./why";
import { trust } from "./trust";
import { social } from "./social";
import { location } from "./location";
import { footer } from "./footer";
import { booking } from "./booking";
import { faq } from "./faq";
import { meta } from "./meta";

/**
 * DRAFT — first-pass translation, not yet reviewed by a native speaker.
 * Ships `noindex` until that review happens (per the i18n plan's Phase 1
 * gate). `satisfies Dictionary` is the structural safety net: if this
 * object is missing a key the English dictionary has, `next build` fails
 * with a type error instead of silently rendering a blank string in
 * production.
 */
export const ko = {
  nav,
  announcement,
  hero,
  howItWorks,
  services,
  pricing,
  expats,
  why,
  trust,
  social,
  location,
  footer,
  booking,
  faq,
  meta,
} satisfies Dictionary;
