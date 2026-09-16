import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/components/guides/GuideLayout";
import {
  GuideH2,
  GuideLead,
  GuideTLDR,
  GuideFacts,
  GuideList,
  GuideTable,
  GuideCallout,
  GuideStowCallout,
  GuideFAQ,
  GuideImage,
  GuideSources,
} from "@/components/guides/GuideElements";
import { breadcrumbJsonLd, guideFaqJsonLd } from "@/lib/structured-data";
import { getDictionary } from "@/content/dictionary";

const pageTitle = "The Best Beaches in Da Nang: My Khe, Non Nuoc, and the Hidden Coves";
const pageDescription =
  "A local guide to the best beaches in Da Nang: My Khe, My An, Non Nuoc, and the hidden Son Tra coves. Which beach suits you, beach clubs and resorts, surfing seasons, rip-current safety, and the best time to swim.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides/best-beaches-in-da-nang" },
  openGraph: { title: `${pageTitle} | Stow`, description: pageDescription, url: "https://www.stowdanang.com/guides/best-beaches-in-da-nang" },
  twitter: { title: `${pageTitle} | Stow`, description: pageDescription },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Best Beaches in Da Nang", path: "/guides/best-beaches-in-da-nang" },
]);

const FAQ_ITEMS = [
  {
    q: "Which is the best beach in Da Nang?",
    a: "My Khe is the best all-round choice. It is central, has lifeguards and sunbeds, and ranked 6th among Asia's best beaches in Tripadvisor's 2024 Travelers' Choice awards. For quieter sand, choose Non Nuoc under the Marble Mountains; for wild coves, head onto the Son Tra peninsula.",
  },
  {
    q: "Is My Khe beach clean?",
    a: "Yes. My Khe is widely praised as clean and well maintained, with monitored sand and daily lifeguards. Some reviews note conditions can vary, and storms in October and November can wash up seaweed or debris, but on a normal dry-season day it is a good, clean swimming beach.",
  },
  {
    q: "Can you swim at Da Nang beaches, and is it safe?",
    a: "Yes, in the dry season (about April to September) and inside the flagged, lifeguard-patrolled zones. Lifeguards work roughly 4:30am to 7pm in summer. Green flag means safe, red flag means dangerous currents and no swimming. Do not swim outside those hours or those zones.",
  },
  {
    q: "When is the best time to visit Da Nang's beaches?",
    a: "February to May has the most reliable weather, and the dry season (about April to September) has the calmest, clearest sea for swimming. October to February brings higher waves, rip currents, and the typhoon window, so treat the water with more caution then.",
  },
  {
    q: "Can you surf in Da Nang, and when?",
    a: "Yes. The main surf season runs about September to March, when the northeast monsoon brings the bigger swell. My Khe is a mellow, forgiving beach break that suits beginners and longboarders. Waves are smaller and gentler from April to August, which is fine for first lessons.",
  },
  {
    q: "Are there rip currents in Da Nang?",
    a: "Yes. They are most common during the monsoon (roughly September to March) and worst from October to February. Warning signs include darker water, smaller waves in one spot, and debris moving offshore. If caught, stay calm, float, signal for help, and swim sideways out of the flow.",
  },
  {
    q: "What is the difference between My Khe and Non Nuoc?",
    a: "My Khe is central, lively, and full of facilities, from sunbeds to beach clubs, and it gets busy at sunset. Non Nuoc, about 8 km south under the Marble Mountains, is quieter and cleaner, backed by pine forest, and better for long walks and beginner surf.",
  },
  {
    q: "Are there hidden beaches near Da Nang?",
    a: "Yes, on the Son Tra peninsula. Bai But, Bai Rang, Bai Nam, and Da Den are small coves between jungle and sea, some with snorkeling over rocky reefs. You reach them by motorbike or taxi, and a few are controlled by resorts, so check access before you go.",
  },
  {
    q: "How much do sunbeds or beach clubs cost?",
    a: "A sunbed and umbrella from a beach vendor runs about 50,000 to 100,000 VND for the day. Beach clubs vary: some have free entry with a minimum spend, and a typical visit costs around 200,000 to 800,000 VND per person, depending on the venue and what you order.",
  },
  {
    q: "What was China Beach in Da Nang?",
    a: "China Beach is the wartime nickname US soldiers gave the My Khe and My An stretch of Da Nang's coast during the Vietnam War. Today it is a long, developed sweep of hotels, cafes, and swimming beach, and the old name mostly survives in guidebooks.",
  },
];

const SOURCES = [
  { label: "VietnamPlus: My Khe on Asia's most beautiful beach list", url: "https://en.vietnamplus.vn/my-khe-an-bang-on-asias-most-beautiful-beach-list-tripadvisor-post279910.vnp", note: "the Tripadvisor 2024 Travelers' Choice ranking (My Khe 6th in Asia)" },
  { label: "Danang FantastiCity (official city tourism)", url: "https://danangfantasticity.com/en/discovery/my-khe-beach-one-of-the-ten-most-beautiful-beaches-in-asia.html", note: "the official framing of My Khe among Asia's most beautiful beaches" },
  { label: "DTiNews / Dan Tri: Da Nang rip-current safety advice", url: "https://dtinews.dantri.com.vn/lifestyle/danang-issues-rip-current-safety-advice-for-beachgoers-20260608114128073.htm", note: "the official 2026 lifeguard hours, summer-season dates, and rip-current advice" },
  { label: "Asia Tour Advisor: Da Nang beaches", url: "https://www.asiatouradvisor.com/get-inspired/vietnam/da-nang-beach/", note: "the flag system, lifeguard numbers, and the most dangerous months" },
  { label: "Da Nang Surf Shop: surf season guide", url: "https://danangsurfshop.vn/best-time-to-surf-in-da-nang-da-nang-surf-season-vietnam-surfing-months-guide/", note: "surf seasons, wave heights, water temperature, and spots by level" },
  { label: "Ahoy Vietnam: beaches in Da Nang", url: "https://ahoyvietnam.com/beaches-in-da-nang/", note: "per-beach facilities, distances, parking, and gate fees" },
  { label: "Vietnam Nomad: Son Tra peninsula", url: "https://vietnamnomad.com/destinations/central-vietnam/da-nang/son-tra-peninsula/", note: "the hidden Son Tra coves, snorkeling, and access notes" },
  { label: "Mikazuki: best beach clubs in Da Nang", url: "https://mikazuki.com.vn/en/best-beach-club-da-nang.html", note: "sunbed and beach-club price ranges" },
];

export default async function BestBeachesInDaNang() {
  const dict = await getDictionary("en");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideFaqJsonLd(FAQ_ITEMS)) }} />
      <GuideLayout
        dict={dict}
        currentPath="/guides/best-beaches-in-da-nang"
        eyebrow="See & Do"
        title="The Best Beaches in Da Nang"
        subhead="Which beach suits you, from the lively main strip to the hidden coves, plus surfing, safety, and the best time to get in the water."
        readingTime="11 min read"
        toc={[
          { id: "which-beach", label: "Which beach suits you" },
          { id: "my-khe", label: "My Khe, the main event" },
          { id: "my-an", label: "My An and An Thuong" },
          { id: "non-nuoc", label: "Non Nuoc, quiet sand" },
          { id: "son-tra", label: "Son Tra hidden coves" },
          { id: "clubs", label: "Beach clubs and resorts" },
          { id: "surfing", label: "Surfing seasons and spots" },
          { id: "safety", label: "Beach safety and rip currents" },
          { id: "best-time", label: "Best time to swim" },
          { id: "bags", label: "A beach day with no room yet" },
          { id: "faq", label: "Questions people ask" },
        ]}
        related={[
          { title: "Son Tra Peninsula and the Lady Buddha", href: "/guides/son-tra-peninsula", blurb: "The wild coves, the giant statue, and the drive above the coast." },
          { title: "Best Time to Visit Da Nang", href: "/guides/best-time-to-visit-da-nang", blurb: "Month by month weather, so you know when the sea is calm." },
        ]}
      >
        <GuideLead>
          Da Nang built its reputation on sand. The coast runs for kilometers, from the lively main beach right in the
          city to quiet stretches under the Marble Mountains and wild little coves out on the Son Tra peninsula. They
          are not all the same, and the right one depends on whether you want facilities, peace, snorkeling, or a
          beginner surf lesson. Here is the honest breakdown of each, plus how to swim safely and when to go.
        </GuideLead>

        <GuideTLDR>
          <strong>My Khe</strong> is the best all-round beach: central, patrolled by lifeguards, and ranked 6th in Asia
          in Tripadvisor&apos;s 2024 Travelers&apos; Choice awards. For quieter sand, choose <strong>Non Nuoc</strong>{" "}
          under the Marble Mountains or <strong>My An</strong> in the cafe quarter; for hidden coves and snorkeling,
          head onto the <strong>Son Tra peninsula</strong>. Swim only inside flagged, lifeguard-patrolled zones (about
          4:30am to 7pm in summer), and treat October to February as the rip-current and typhoon season.
        </GuideTLDR>

        <GuideImage
          src="https://upload.wikimedia.org/wikipedia/commons/4/43/Palm_trees_beach_Da_Nang.jpg"
          alt="Palm trees lining a quiet stretch of Da Nang beach with fishing boats near the shore"
          width={3072}
          height={2304}
          credit="Dragfyre"
          creditUrl="https://commons.wikimedia.org/wiki/File:Palm_trees_beach_Da_Nang.jpg"
          license="CC BY-SA 3.0"
        />

        <GuideFacts
          items={[
            { label: "Best all-round", value: "My Khe" },
            { label: "My Khe from center", value: "~3 km" },
            { label: "Swim season", value: "~Apr - Sep" },
            { label: "Lifeguards (summer)", value: "~4:30am - 7pm" },
            { label: "Surf season", value: "~Sep - Mar" },
            { label: "Sunbed + umbrella", value: "~50,000 - 100,000 VND" },
          ]}
        />

        <div id="which-beach" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="which-beach">Which beach in Da Nang is right for you?</GuideH2>
          <p>
            Most visitors only need one beach, so start with what you came for. If you want the classic beach day with
            lifeguards, sunbeds, and food nearby, go to My Khe. If you want a slower morning near cafes and coworking,
            pick My An. For peace and long walks, drive south to Non Nuoc. For snorkeling and near-empty coves, take a
            motorbike onto Son Tra. Here is the quick version.
          </p>
          <GuideTable
            columns={["Vibe", "Best for", "Access from center"]}
            rows={[
              { label: "My Khe", values: ["Lively, iconic, busy at sunset", "First-timers, families, swimmers, mellow surf", "~3 km, central"] },
              { label: "My An / An Thuong", values: ["Relaxed, cafes and nomads", "Slow beach days, food plus beach", "Same strip, just south"] },
              { label: "Non Nuoc", values: ["Quiet, pine-backed, scenic", "Peace, long walks, beginner surf", "~8 km, ~10 min south"] },
              { label: "Son Tra coves", values: ["Wild, secluded, jungle meets sea", "Snorkeling, escaping crowds", "Peninsula, motorbike or taxi"] },
              { label: "Nam O", values: ["Rugged, local, stronger surf", "Experienced surfers, off-track feel", "Northwest of the city"] },
            ]}
          />
        </div>

        <div id="my-khe" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="my-khe">My Khe Beach: the main event</GuideH2>
          <p>
            My Khe is the beach most people mean when they say Da Nang. It is part of a roughly 10 km sweep of soft
            white sand that runs from the foot of Son Tra south toward Non Nuoc, and the core swimming stretch sits
            about 3 km from the city center along Vo Nguyen Giap street. The water is calm and clear for much of the
            dry season, roughly March to September.
          </p>
          <p>
            It is also the beach with the most going on. You will find fee-based sun chairs, showers and vendors,
            exercise equipment along the promenade, and lifeguards on duty. Motorbike parking along the seafront is
            usually free. Come at about 5pm and you will see the beach fill up with locals after work, which is the
            best time to feel the city&apos;s daily rhythm. The city tourism board profiles My Khe as one of the ten
            most beautiful beaches in Asia, and Tripadvisor ranked it 6th in Asia in its 2024 Travelers&apos; Choice
            awards.
          </p>
          <GuideCallout label="China Beach">
            My Khe and the sand just south of it is the stretch US soldiers nicknamed China Beach during the Vietnam
            War. You will still see the name in older guidebooks, though locals just call it My Khe today.
          </GuideCallout>
        </div>

        <div id="my-an" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="my-an">My An and the An Thuong quarter: beach plus cafes</GuideH2>
          <p>
            My An is technically the same long sand strip as My Khe, just further south, but it feels different. Behind
            it sits An Thuong, the area many people call the foreigner quarter, packed with smoothie bowls, craft beer,
            coworking spaces, and Da Nang&apos;s most concentrated nightlife strip. It suits a slow beach day where you
            swim, then walk five minutes to a good coffee.
          </p>
          <p>
            This is the natural base for digital nomads and anyone who wants food and a beach within one short walk.
            Several hotel complexes along the seafront run beach clubs with DJs and sunbeds here too. If you are still
            deciding where to sleep, our{" "}
            <Link href="/guides/where-to-stay-in-da-nang" className="text-[#E8742C] underline underline-offset-2">
              where to stay in Da Nang guide
            </Link>{" "}
            weighs An Thuong against the other neighborhoods.
          </p>
        </div>

        <div id="non-nuoc" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="non-nuoc">Non Nuoc Beach: quiet sand under the Marble Mountains</GuideH2>
          <p>
            Non Nuoc sits at the foot of the Marble Mountains, about 8 km southeast of the center and roughly 10
            minutes south of My Khe. It runs for about 5 km, backed by Casuarina pine forest, and it is noticeably
            quieter and cleaner than the main beach. Lifeguards are on duty, and access and parking are free. This is
            the beach for long walks and a calmer morning.
          </p>
          <p>
            It also pairs perfectly with a half-day at the caves and pagodas next door. You can swim, then climb the
            marble peaks in the same trip; our{" "}
            <Link href="/guides/marble-mountains-guide" className="text-[#E8742C] underline underline-offset-2">
              Marble Mountains guide
            </Link>{" "}
            covers the tickets and cave route. For surfers, Non Nuoc has a gentle slope and smaller waves, which makes
            it a good beginner spot in the summer months.
          </p>
          <GuideImage
            src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Non_nuoc_Basket_boats.jpg"
            alt="Traditional round coracle fishing boats on Non Nuoc beach near Da Nang"
            width={2047}
            height={1365}
            credit="Vyacheslav Argenberg"
            creditUrl="https://commons.wikimedia.org/wiki/File:Non_nuoc_Basket_boats.jpg"
            license="CC BY 2.0"
          />
        </div>

        <div id="son-tra" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="son-tra">Son Tra peninsula: hidden coves and snorkeling</GuideH2>
          <p>
            For the wild side of Da Nang&apos;s coast, head onto the Son Tra peninsula, the green headland north of the
            city. Its beaches include Bai Bac (North Beach), Da Den, Bai But, Bai Rang, Bai Nam (South Beach), and
            Tien Sa. Several are small coves tucked between jungle and sea, with rocky outcrops and coral reefs you can
            see from shore. At the calmer ones you can rent a hut, order fresh seafood, and snorkel.
          </p>
          <p>
            A few things to know before you go. Some coves, such as Bai Nam and parts of Bai But, are effectively
            controlled by resorts, and access to parts of the peninsula has been restricted at times, so check before
            you drive in. Man Thai, on the northern edge, is a quiet local fishing beach with few amenities, and Tien
            Sa charges a small gate fee of around 10,000 VND. You reach all of this by motorbike or taxi, not on foot.
            Our{" "}
            <Link href="/guides/son-tra-peninsula" className="text-[#E8742C] underline underline-offset-2">
              Son Tra peninsula guide
            </Link>{" "}
            covers the full loop, including the Lady Buddha statue above the coves.
          </p>
        </div>

        <div id="clubs" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="clubs">Beach clubs and beachfront resorts</GuideH2>
          <p>
            You do not need to book a resort to enjoy the beach. A sunbed and umbrella from a beachfront vendor runs
            about 50,000 to 100,000 VND for the day. Beach clubs sit a step up: some have free regular entry with a
            minimum spend, and a typical visit runs around 200,000 to 800,000 VND per person. Named spots along My Khe
            and An Thuong include Paradise Beach Bar and Cinema, which shows outdoor films in the evening, plus
            Nautica, Kala Kala, Maia, and Apocalypse.
          </p>
          <p>
            If you would rather stay on the sand, the My An and My Khe strip has the big beachfront resorts, including
            Furama, TIA Wellness, and Premier Village, most a short walk from the water. These are indicative 2026
            prices from operator and blog pages, so treat them as a guide, not a quote, and expect changes.
          </p>
        </div>

        <div id="surfing" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="surfing">Surfing in Da Nang: season, spots, and lessons</GuideH2>
          <p>
            Da Nang has a real, if modest, surf scene. The main season runs about September to March, when the
            northeast monsoon pushes the bigger swell. Peak waves reach about 2 to 5 feet, and the water stays warm all
            year, roughly 25 to 30 degrees C, so you do not need a wetsuit. From April to August the waves are smaller
            and cleaner, which is easier for a first lesson.
          </p>
          <GuideList
            items={[
              "My Khe: all levels. A mellow, forgiving beach break with multiple peaks, good for learners and longboarding. The north end is stronger in the main season, the south end gentler in summer.",
              "Non Nuoc: beginners. A gentle slope and smaller waves, best from about April to August.",
              "Nam O: experienced surfers. Stronger, rugged beach breaks northwest of the city, with an off-track feel.",
            ]}
          />
          <p>
            Local surf shops rent boards and run lessons, and the best conditions at My Khe tend to come when a
            northeast swell meets a light offshore wind, often around October.
          </p>
        </div>

        <div id="safety" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="safety">Beach safety: rip currents, flags, and lifeguard hours</GuideH2>
          <p>
            Da Nang&apos;s beaches are patrolled, but the sea still deserves respect. Under the city&apos;s 2026
            guidance, lifeguards are on duty daily from about 4:30am to 7pm during the summer season, which runs March
            15 to September 30. Do not swim outside those hours or outside the marked zones. Nearly 100 lifeguards work
            the main beaches, backed by jet-ski patrols and rescue vehicles.
          </p>
          <p>
            Read the flags: green means safe, red means dangerous currents and no swimming. Rip currents are most
            likely during the monsoon (roughly September to March) and worst from October to February, and typhoons can
            hit especially in October and November. Warning signs of a rip include darker water, an odd patch of
            smaller waves, and debris moving steadily offshore.
          </p>
          <GuideCallout label="If a rip current catches you">
            Stay calm and do not fight it head-on. Float to save energy, raise an arm and call for help, and swim
            sideways along the beach, out of the flow, before you turn back to shore. Panic and swimming straight
            against the current are what exhaust people.
          </GuideCallout>
        </div>

        <div id="best-time" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="best-time">Best time of day and year for Da Nang beaches</GuideH2>
          <p>
            For the year, February to May has the most reliable weather, and the dry season (about April to September)
            has the calmest, clearest sea for swimming. October to February is the rougher, wetter half, with higher
            waves and the typhoon window. For the day, early morning and late afternoon are the sweet spots: the sand
            is cooler, the light is better, and you avoid the fierce midday sun.
          </p>
          <p>
            If you are lining up a whole trip around the weather, our{" "}
            <Link href="/guides/best-time-to-visit-da-nang" className="text-[#E8742C] underline underline-offset-2">
              best time to visit Da Nang guide
            </Link>{" "}
            breaks it down month by month, and the{" "}
            <Link href="/guides/da-nang-itinerary" className="text-[#E8742C] underline underline-offset-2">
              Da Nang itinerary
            </Link>{" "}
            shows how to fit a beach half-day into a full plan.
          </p>
        </div>

        <div id="bags" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="bags">A beach day with no hotel room yet?</GuideH2>
          <p>
            One of the best beach days in Da Nang is the one most people miss: your arrival morning before check-in, or
            your last afternoon before a night flight. My Khe and Non Nuoc are only a short drive from the airport, so
            you can go straight from the terminal to the sand, or squeeze in one more swim after checkout. The catch is
            your luggage. Beach clubs will not watch a suitcase, and dragging bags across the sand is no fun.
          </p>

          <GuideStowCallout
            eyebrow="Beach then flight"
            heading="Store the bags, shower, and swim hands-free until it is time to go."
            facts={[
              { label: "Near Non Nuoc", value: "Ngu Hanh Son" },
              { label: "By the day", value: "60,000 VND (up to 24h)" },
              { label: "Open", value: "7am - 10pm daily" },
            ]}
          >
            If you are near the Marble Mountains end of the coast, Stow is a handy drop point at 55 Ba Bang Nhan in Ngu
            Hanh Son, about ten minutes from the airport and open 7am to 10pm. Leave the suitcases from 15,000 VND an
            hour or 60,000 VND a day (with flat weekly and monthly rates for longer trips), then head to Non Nuoc or My
            Khe with just a towel. It is the same trick for an early arrival or a late-flight beach day, and it pairs
            neatly with a{" "}
            <Link href="/guides/da-nang-layover-guide" className="text-[#E8742C] underline underline-offset-2">
              short layover
            </Link>
            .
          </GuideStowCallout>
        </div>

        <div id="faq" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="faq">Questions people ask</GuideH2>
          <GuideFAQ items={FAQ_ITEMS} />
        </div>

        <GuideSources items={SOURCES} />

        <p className="text-[13px] text-[#9CA3AF]">
          Beach conditions, prices, and lifeguard schedules change with the season. This guide reflects current figures
          and official advice at the time of writing; check the flags and the day&apos;s conditions on the beach, and
          confirm any price before you rely on it.
        </p>
      </GuideLayout>
    </>
  );
}
