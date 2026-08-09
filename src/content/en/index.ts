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
 * The English dictionary — also the type schema every other locale is
 * checked against (see ../types.ts). Assembling from per-domain files
 * rather than one flat object keeps each domain independently reviewable
 * (a translator working on `booking.ts` doesn't need to open the whole
 * site's copy) — the same reason faq.ts was already structured this way
 * before this dictionary system existed.
 */
export const en = {
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
} as const;
