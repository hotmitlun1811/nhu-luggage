import type { Metadata } from "next";
import GuideLayout from "@/components/guides/GuideLayout";
import { GuideH2, GuideH3, GuideLead, GuideFacts, GuideList, GuideTable, GuideCallout, GuideFAQ, GuideTOC, GuideImage } from "@/components/guides/GuideElements";
import { breadcrumbJsonLd, guideFaqJsonLd } from "@/lib/structured-data";
import { getDictionary } from "@/content/dictionary";

const pageTitle = "Marble Mountains (Ngũ Hành Sơn) Guide: Caves, Tickets, What to Skip";
const pageDescription =
  "A cave-by-cave guide to the Marble Mountains: what's actually inside Thuy Son, the elevator vs. the 156 steps, real ticket prices, and the Linh Ung Pagoda mix-up almost everyone makes.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides/marble-mountains-guide" },
  openGraph: { title: `${pageTitle} | Stow`, description: pageDescription, url: "https://www.stowdanang.com/guides/marble-mountains-guide" },
  twitter: { title: `${pageTitle} | Stow`, description: pageDescription },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Marble Mountains Guide", path: "/guides/marble-mountains-guide" },
]);

const FAQ_ITEMS = [
  {
    q: "Is the Marble Mountains worth visiting?",
    a: "For most people, yes — but go in knowing it's a limestone outcrop riddled with caves and pagodas, not a sprawling theme park. Visitors expecting a bigger spectacle sometimes leave underwhelmed; visitors who like the idea of Buddhist shrines built into cave openings tend to find it genuinely worth the couple of hours.",
  },
  {
    q: "How much time do I actually need?",
    a: "2.5 to 3 hours covers Thuy Son properly. Add another hour if you're doing Am Phu Cave too. It's a half-day stop at most, not a full-day one — plan something else for the afternoon.",
  },
  {
    q: "Should I take the elevator or the stairs?",
    a: "The elevator only covers about the first 100 of the mountain's 156 steps, dropping you at a mid-level terrace near Xa Loi Tower — you'll still climb more stairs from there to reach the caves and viewpoints either way. A common compromise is elevator up, stairs down (or the reverse), so you're not doing all 156 steps in one direction.",
  },
  {
    q: "Is it accessible for elderly visitors or anyone with mobility issues?",
    a: "Only partially. The elevator helps, but the remaining stairs and cave paths are uneven stone with no ramp alternative — it isn't wheelchair accessible. If mobility is a real concern, stick to the pagodas and gardens near the top terrace and skip the deeper cave routes.",
  },
  {
    q: "Is this the same pagoda as the giant Buddha statue?",
    a: "No — that's the 67-meter Lady Buddha at Linh Ung Pagoda on Son Tra Peninsula, about 10km away and unrelated logistically. The Marble Mountains have their own, older, much smaller Linh Ung Pagoda, built in 1825.",
  },
  {
    q: "Do I need a separate ticket for Am Phu Cave?",
    a: "Yes. It's 20,000₫ on top of the 40,000₫ main entrance, sold at a separate booth, and it isn't part of the main cave route up Thuy Son — it's a ground-level cave depicting Buddhist hell.",
  },
  {
    q: "Morning or afternoon?",
    a: "Morning, and earlier than you'd think. Tour buses tend to arrive between 9:30 and 11am, so getting there by 7:30-8am means quieter paths, cooler air, and better light in the caves.",
  },
];

export default async function MarbleMountainsGuide() {
  const dict = await getDictionary("en");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideFaqJsonLd(FAQ_ITEMS)) }} />
      <GuideLayout
        dict={dict}
        currentPath="/guides/marble-mountains-guide"
        eyebrow="Marble Mountains"
        title="Marble Mountains (Ngũ Hành Sơn) Guide"
        subhead="Five limestone hills named for the five elements, one of them riddled with caves and pagodas — in the same district Stow is in."
        related={[
          { title: "Da Nang Layover Guide", href: "/guides/da-nang-layover-guide", blurb: "The Marble Mountains fit into a layover of 8+ hours." },
          { title: "Da Nang Visa Run Guide", href: "/guides/da-nang-visa-run-guide", blurb: "Something to do with a spare day before or after a run." },
        ]}
      >
        <GuideLead>
          Ngũ Hành Sơn means &ldquo;five element mountains.&rdquo; Only one of the five, Thuy Son (Water), has
          anything developed for visitors — caves, pagodas, an elevator, a ticket booth. The other four are largely
          bare hillside, worth knowing before you plan around all five.
        </GuideLead>

        <GuideTOC
          sections={[
            { id: "whats-there", label: "What's actually on Thuy Son" },
            { id: "up-the-mountain", label: "Elevator or the 156 steps" },
            { id: "tickets", label: "Tickets, in full" },
            { id: "village", label: "Non Nước marble-carving village" },
            { id: "planning", label: "Planning the visit" },
            { id: "faq", label: "Questions people actually ask" },
          ]}
        />

        <GuideFacts
          items={[
            { label: "Main entrance", value: "40,000₫" },
            { label: "Elevator, one-way", value: "15,000₫" },
            { label: "Am Phu Cave (separate)", value: "20,000₫" },
            { label: "Steps to the top", value: "156, uneven stone" },
            { label: "Hours", value: "~7am – 5:30pm" },
            { label: "Time to allow", value: "2.5 – 3.5 hours" },
          ]}
        />

        <div id="whats-there" className="flex flex-col gap-5 scroll-mt-24">
          <GuideH2 id="whats-there">What&apos;s actually on Thuy Son</GuideH2>
          <p>
            Thuy Son covers about 15 hectares and holds 9 caves and 5 temples — most of what anyone means by
            &ldquo;visiting the Marble Mountains&rdquo; happens here.
          </p>

          <GuideH3>Huyền Không Cave — the one to prioritize</GuideH3>
          <p>
            The largest cavern on the mountain, and the one repeat visitors call the highlight. Two natural
            openings in the roof let sunlight fall directly onto the altar and a large Shakyamuni Buddha statue —
            the effect is strongest on a clear, sunny morning and disappears completely under cloud cover. During
            the war, locals used the cave as a hideout and field hospital; that history is part of what makes it
            more than just a photo stop.
          </p>

          <GuideH3>Tam Thai Pagoda</GuideH3>
          <p>
            Over 400 years old, with blue walls and a dragon-decorated roof, set in a garden that looks out over
            the coast. Visitors consistently name this and Huyen Khong Cave as the two stops worth prioritizing if
            time is short.
          </p>

          <GuideH3>Vọng Hải Đài and Vọng Giang Đài — the two viewpoints</GuideH3>
          <p>
            Both built in 1837, facing opposite directions. Vọng Hải Đài (&ldquo;sea-watching tower&rdquo;) looks
            out over the ocean and the beach. Vọng Giang Đài (&ldquo;river-watching tower&rdquo;) faces inland,
            over Non Nước village, the Cổ Cò River, and the city skyline. Easy to assume they&apos;re the same spot
            since both are just &ldquo;the viewpoint&rdquo; in casual conversation — they&apos;re not.
          </p>

          <GuideH3>Am Phu Cave (Hell Cave)</GuideH3>
          <p>
            A separate, ground-level cave on a separate ticket. A roughly 350-meter corridor recreates the 18
            levels of hell from Buddhist cosmology in sculpture, ending at a Kṣitigarbha Bodhisattva statue. There
            are two ways through: the longer underworld loop, or a shorter, steep climb to a &ldquo;heaven&rdquo;
            viewpoint. It was deliberately named opposite the mountain&apos;s pagodas by Emperor Minh Mạng, a
            heaven-and-hell pairing built into the site on purpose.
          </p>

          <GuideH3>Xá Lợi Tower and the smaller caves</GuideH3>
          <p>
            A 7-story hexagonal tower near the elevator&apos;s upper terminal, about 28 meters tall, built in 1997.
            Beyond it, Tàng Chơn Cave, Vân Thông Cave, and Linh Nham Cave are smaller stops — worth a look if you
            have the extra time, skippable if you don&apos;t.
          </p>

          <GuideImage
            src="https://upload.wikimedia.org/wikipedia/commons/9/92/Bao_Thap_Xa_Loi_Marble_Mtns.jpg"
            alt="Xá Lợi Tower, a seven-story hexagonal tower on Thuy Son at the Marble Mountains"
            width={1536}
            height={2048}
            credit="Dragfyre"
            creditUrl="https://commons.wikimedia.org/wiki/File:Bao_Thap_Xa_Loi_Marble_Mtns.jpg"
            license="CC BY-SA 3.0"
          />
        </div>

        <GuideCallout label="Don't mix this up">
          There are three pagodas named Linh Ứng in Da Nang, and the Marble Mountains have one of them. It&apos;s
          small, quiet, and dates to 1825. The famous one — the 67-meter Lady Buddha statue most people picture
          when they hear &ldquo;Linh Ung Pagoda&rdquo; — is a completely separate, much larger site on Sơn Trà
          Peninsula (Monkey Mountain), about 10km away. If a photo of a giant white Buddha statue is why you&apos;re
          coming, you want Sơn Trà, not here.
        </GuideCallout>

        <div id="up-the-mountain" className="flex flex-col gap-4 scroll-mt-24">
          <GuideH2 id="up-the-mountain">Elevator or the 156 steps</GuideH2>
          <p>
            The free stone staircase is 156 steps, worn smooth and uneven in places, roughly 10-15 minutes of
            climbing. The elevator (15,000₫ one-way, 30,000₫ return) skips only about the first 100 of those steps,
            dropping you at a mid-level terrace near Xa Loi Tower — you still climb stairs from there to reach the
            caves, pagodas, and viewpoints either way. It can also close without notice for maintenance or weather.
          </p>
          <GuideTable
            columns={["Cost", "Effort", "Worth knowing"]}
            rows={[
              { label: "156 steps", values: ["Free", "10-15 min, steep in places", "Slippery when wet — skip after rain if unsteady on your feet"] },
              { label: "Elevator", values: ["15,000₫ one-way", "Skips ~100 of 156 steps", "Still stairs after — doesn't remove the climb entirely"] },
            ]}
          />
          <p className="text-[13.5px] text-[#6B7280]">
            A common approach: elevator up, stairs down (or the reverse), so the climb only happens in one
            direction.
          </p>
        </div>

        <div id="tickets" className="flex flex-col gap-4 scroll-mt-24">
          <GuideH2 id="tickets">Tickets, in full</GuideH2>
          <p>
            Three separate purchases, three separate booths — there&apos;s no combined ticket. Total spend per
            person typically runs 55,000-75,000₫ depending on whether you add Am Phu Cave and a return elevator
            ride.
          </p>
          <GuideTable
            columns={["Price"]}
            rows={[
              { label: "Main entrance (adult)", values: ["40,000₫"] },
              { label: "Main entrance (student)", values: ["10,000₫"] },
              { label: "Elevator, one-way", values: ["15,000₫"] },
              { label: "Elevator, return", values: ["30,000₫"] },
              { label: "Am Phu Cave (adult)", values: ["20,000₫, separate booth"] },
            ]}
          />
          <p className="text-[13px] text-[#9CA3AF]">
            Cash is the safe assumption at every booth — card acceptance is inconsistent past the main gate.
          </p>
        </div>

        <GuideCallout label="Accessibility, honestly">
          This isn&apos;t wheelchair accessible. The elevator helps, but the remaining stone stairs and cave paths
          have no ramp alternative. If you&apos;re visiting with someone who has limited mobility, plan on the
          elevator plus the top terrace&apos;s pagodas and gardens, and skip Van Thong Cave and the steeper climbs.
          Closed, grippy shoes matter here more than they sound like they would — flip-flops on wet marble steps
          are a real way to get hurt.
        </GuideCallout>

        <div id="village" className="flex flex-col gap-4 scroll-mt-24">
          <GuideH2 id="village">Non Nước marble-carving village</GuideH2>
          <p>
            At the base of the mountain, a short walk from the main gate, sits the village the Marble Mountains
            are actually named after. Close to 500 stone-carving workshops line its alleys, founded in the late
            17th century by a craftsman named Huỳnh Bá Quát — it was recognized as a National Intangible Cultural
            Heritage site in 2014. You can hear the chisels working before you see the showrooms, which sell
            everything from small Buddha figures to full statues. It's free to walk through, and it&apos;s a
            natural pairing with the mountain visit rather than a separate trip — though it's worth knowing the
            shop staff can be persistent about a sale, more so later in the day than early morning.
          </p>
        </div>

        <div id="planning" className="flex flex-col gap-4 scroll-mt-24">
          <GuideH2 id="planning">Planning the visit</GuideH2>
          <GuideList
            items={[
              "Arrive by 7:30-8am if you can — tour buses cluster between 9:30 and 11am, and mornings are cooler for the climb",
              "Bring small cash for the three separate ticket booths",
              "Wear real shoes with grip, not sandals — the stone steps are uneven and slippery when wet",
              "Shoulders and knees covered is expected at the shrines; free sarongs are usually available near the main one if needed",
              "About 10 minutes from Da Nang Airport and from Stow by taxi or Grab",
            ]}
          />
        </div>

        <div id="faq" className="flex flex-col gap-3 scroll-mt-24">
          <GuideH2 id="faq">Questions people actually ask</GuideH2>
          <GuideFAQ items={FAQ_ITEMS} />
        </div>

        <p className="text-[13px] text-[#9CA3AF]">
          Hours and ticket prices are set by the site operator and can shift seasonally — worth a quick check on
          the day if you&apos;re planning tightly around them.
        </p>
      </GuideLayout>
    </>
  );
}
