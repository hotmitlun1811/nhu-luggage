import type { Metadata } from "next";
import Link from "next/link";
import GuideLayout from "@/components/guides/GuideLayout";
import {
  GuideH2,
  GuideH3,
  GuideLead,
  GuideTLDR,
  GuideFacts,
  GuideList,
  GuideTable,
  GuideCallout,
  GuideStowCallout,
  GuideFAQ,
  GuideTOC,
  GuideImage,
  GuideSources,
} from "@/components/guides/GuideElements";
import { breadcrumbJsonLd, guideFaqJsonLd } from "@/lib/structured-data";
import { getDictionary } from "@/content/dictionary";

const pageTitle = "Marble Mountains (Ngu Hanh Son) Guide: Caves, Tickets, Dress Code";
const pageDescription =
  "A complete guide to the Marble Mountains in Da Nang: the five element peaks and why you climb only one, cave by cave, the full 2026 ticket prices, elevator vs the 156 steps, the temple dress code, the Lady Buddha mix-up, and where to leave your bags.";

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
    q: "How much does it cost to visit the Marble Mountains?",
    a: "Entry to Thuy Son, the one developed mountain, is 40,000 VND per person. The elevator is optional at 15,000 VND one-way or 30,000 VND round-trip. Am Phu (Hell) Cave is a separate 20,000 VND ticket at the base. Doing all three comes to about 90,000 VND, roughly US$3.60, which is why it is one of Da Nang's best-value half-days.",
  },
  {
    q: "Is there an elevator, or do I have to climb the steps?",
    a: "Both exist. There are 156 stone steps to the top of Thuy Son, or a lift (15,000 VND one-way, 30,000 VND round-trip) to the main pagoda level. Beyond that level, the caves and viewpoints are reached on foot up more steps. The lift removes the first climb, not all of them.",
  },
  {
    q: "How long do you need at the Marble Mountains?",
    a: "About 2 to 3 hours covers Thuy Son well: the caves, the two main pagodas, the viewpoints, and the Xa Loi tower. Add about 30 to 45 minutes for Am Phu Cave at the base. It is a half-day trip, not a full day, so plan something else for the afternoon.",
  },
  {
    q: "What is the best time of day to go?",
    a: "Early, ideally 7:00 to 8:30 AM, for cool air, quiet paths, and empty caves. Tour buses cluster from about 9:30 AM, and the midday heat on the exposed top is real. The one trade-off: the light beams in Huyen Khong Cave are strongest late morning to midday, when the sun is overhead. If they matter to you, arrive early and wait in the cave for the light.",
  },
  {
    q: "Is there a dress code for the Marble Mountains?",
    a: "It is an active Buddhist site with working temples, so cover your shoulders and knees at the shrines. You will not be turned away at the gate for beach clothes, but you will feel out of place at the altars, and covering up also helps with the sun. Wear closed shoes with grip. The stone steps are uneven and slippery when wet.",
  },
  {
    q: "Is the Lady Buddha statue at the Marble Mountains?",
    a: "No. This is the most common mix-up. The giant 67-metre Lady Buddha statue is at a different Linh Ung Pagoda on the Son Tra Peninsula, about 20 minutes away on the coast. The Marble Mountains have their own, much older and smaller Linh Ung Pagoda, built in 1825. If a photo of a huge white statue is why you are coming, you want Son Tra, not here.",
  },
  {
    q: "Are the Marble Mountains accessible for wheelchairs or older visitors?",
    a: "Only partly. The elevator reaches the main pagoda level, but beyond it the temples, caves, and viewpoints are stairs only, with no ramps, and the stone is uneven and slippery when wet. It is not wheelchair accessible. If mobility is a concern, take the lift up, keep to the top pagodas and gardens, and skip the tight Van Thong squeeze and the steeper cave routes.",
  },
  {
    q: "What is Am Phu (Hell) Cave, and is it scary?",
    a: "It is a separate ground-level cave on its own 20,000 VND ticket that recreates the 18 levels of Buddhist hell in stone. A descending path to hell passes scenes of punishment; an ascending path to heaven climbs to a viewpoint over the coast. It is theatrical rather than frightening, and plenty of families do it. The inside stays cool year-round.",
  },
  {
    q: "How do I get to the Marble Mountains from Da Nang, the airport, or Hoi An?",
    a: "It is about 8 km and 10 to 15 minutes from Da Nang airport, roughly 9 km and 15 to 20 minutes from the city centre (a Grab is about 80,000 to 120,000 VND), and about 20 to 25 km and 25 to 30 minutes from Hoi An. So it fits neatly onto a Da Nang to Hoi An day. Grab, Xanh SM, and Maxim all work locally.",
  },
  {
    q: "Are all five Marble Mountains open to visit?",
    a: "No. Only Thuy Son (Water Mountain), the largest, is developed with steps, a lift, caves, and pagodas. It is what almost everyone means by visiting the Marble Mountains. The other four (Kim, Moc, Hoa, and Tho) are mostly bare hillside with a few small shrines at their bases and no trail network, so plan around Thuy Son.",
  },
];

const SOURCES = [
  { label: "Wikipedia — Ngu Hanh Son", url: "https://en.wikipedia.org/wiki/Ng%C5%A9_H%C3%A0nh_S%C6%A1n", note: "the five element peaks, the 156 steps, only Thuy Son being open, and the 2019 National Special Relic status" },
  { label: "VietnamNet — Five Element Mountains", url: "https://vietnamnet.vn/en/five-element-mountains-amaze-visitors-E90045.html", note: "the element names and Emperor Minh Mang's early-19th-century naming of the cluster" },
  { label: "Vietnam Law Magazine — Ngu Hanh Son", url: "https://vietnamlawmagazine.vn/ngu-hanh-son-a-timeless-spiritual-symbol-of-da-nang-city-79664.html", note: "Thuy Son's dimensions and summit points, and the site's Cham heritage" },
  { label: "Official Ngu Hanh Son tourist-area site", url: "http://english.nguhanhson.org/index.php/culture-art/1010-overvier-of-ngu-hanh-son-tourist-area", note: "the site operator's own overview and cave descriptions" },
  { label: "VinWonders — Huyen Khong and Am Phu caves", url: "https://vinwonders.com/en/wonderpedia/news/huyen-khong-cave-da-nang/", note: "the skylights, the 1960 Sakyamuni statue, the 1968 field-hospital history, and Am Phu Cave detail" },
  { label: "Da Nang Government Portal — Non Nuoc heritage", url: "https://danang.gov.vn/web/en/detail?id=16205&_c=16407387", note: "the 2014 National Intangible Cultural Heritage recognition of the Non Nuoc stone-carving village" },
  { label: "Jungle Boss Tours — Marble Mountains 2026 guide", url: "https://junglebosstours.com/explorer/tourism-blog/vietnam-marble-mountains-danang", note: "current 2026 ticket prices, opening hours, and elevator times" },
  { label: "Hoi An Day Trip — Marble Mountains tickets", url: "https://hoiandaytrip.com/marble-mountain-da-nang-tickets/", note: "the 2026 ticket breakdown and the Am Phu Cave separate fee" },
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
        title="Marble Mountains (Ngu Hanh Son) Guide"
        subhead="Five limestone-and-marble hills named for the five elements, one of them full of caves and pagodas, in the same district as Stow. Here is what is actually there, cave by cave, and what to pay in 2026."
        related={[
          { title: "Da Nang Layover Guide", href: "/guides/da-nang-layover-guide", blurb: "The best short-layover sight, about 20 minutes from the airport." },
          { title: "Da Nang to Hoi An Day Trip", href: "/guides/da-nang-to-hoi-an-day-trip", blurb: "The mountains sit right on the road to Hoi An, so combine them." },
        ]}
      >
        <GuideLead>
          Ngu Hanh Son means &ldquo;five element mountains.&rdquo; The name promises more than the visit delivers if
          you take it literally, because only one of the five is developed. But that one mountain, full of caves and
          Buddhist shrines, is one of Da Nang&apos;s best half-days, and one of its cheapest. This is the complete
          version: what is in each cave, what you pay, and the details most guides skip.
        </GuideLead>

        <GuideTLDR>
          The Marble Mountains are worth a half-day, and at <strong>40,000 VND to enter</strong> they are a bargain.
          Only one of the five peaks, <strong>Thuy Son (Water Mountain)</strong>, is developed for visitors. You
          reach its cave-and-pagoda top by <strong>156 stone steps</strong> or a{" "}
          <strong>15,000 VND one-way / 30,000 VND round-trip elevator</strong>. The highlights are the huge, skylit{" "}
          <strong>Huyen Khong cave</strong>, the hell-and-heaven <strong>Am Phu cave</strong> (a separate 20,000 VND
          ticket), two clifftop viewpoints, and the 1825 Linh Ung pagoda. Go <strong>early, 7:00 to 8:30 AM</strong>,
          to beat the heat and the tour buses. Allow <strong>2 to 3 hours</strong>, dress modestly for the temples,
          and wear real shoes — the steps are steep and slippery when wet.
        </GuideTLDR>

        <GuideTOC
          sections={[
            { id: "what", label: "What the Marble Mountains are" },
            { id: "five", label: "The five mountains, and why you climb one" },
            { id: "history", label: "History: Cham, emperors, and war" },
            { id: "caves", label: "The caves (the real reason to come)" },
            { id: "pagodas", label: "Pagodas and the Xa Loi tower" },
            { id: "viewpoints", label: "The two viewpoints" },
            { id: "up", label: "Elevator or the 156 steps" },
            { id: "tickets", label: "Tickets, hours, and dress code" },
            { id: "village", label: "Non Nuoc marble village" },
            { id: "plan", label: "Planning the visit" },
            { id: "faq", label: "Questions people ask" },
          ]}
        />

        <GuideFacts
          items={[
            { label: "Main entrance", value: "40,000 VND" },
            { label: "Elevator", value: "15,000 one-way / 30,000 return" },
            { label: "Am Phu Cave (separate)", value: "20,000 VND" },
            { label: "Steps to the top", value: "156, uneven stone" },
            { label: "Hours", value: "~7:00 AM - 5:30 PM" },
            { label: "Time to allow", value: "2 - 3 hours" },
          ]}
        />

        <div id="what" className="flex flex-col gap-3 scroll-mt-24">
          <GuideH2 id="what">What the Marble Mountains are</GuideH2>
          <p>
            The Marble Mountains are five marble-and-limestone hills that rise out of the flat coastal plain south of
            central Da Nang, in the district that shares their Vietnamese name, Ngu Hanh Son. They were sacred to the
            Cham long before they were Buddhist. Today the developed one is a maze of natural caves turned into
            shrines, linked by stone staircases, with two clifftop platforms over the coast. In 2019 the whole site
            became a National Special Relic.
          </p>
          <p>
            It is compact — a couple of hours of climbing and ducking into caves, not a sprawling park — and it sits
            about ten minutes from the airport. That is why it turns up on so many arrival-day and layover plans.
          </p>
        </div>

        <div id="five" className="flex flex-col gap-3 scroll-mt-24">
          <GuideH2 id="five">The five mountains, and why you climb only one</GuideH2>
          <p>
            Emperor Minh Mang named the cluster in the early 1800s, giving each hill one of the five elements:{" "}
            <strong>Kim Son</strong> (metal), <strong>Moc Son</strong> (wood), <strong>Thuy Son</strong> (water),{" "}
            <strong>Hoa Son</strong> (fire), and <strong>Tho Son</strong> (earth). It is a tidy piece of
            five-element cosmology, and a source of confusion, because visitors often arrive expecting to explore all
            five.
          </p>
          <p>
            In practice, <strong>only Thuy Son is developed</strong>. It is the largest and tallest of the five
            (about 106 metres, with three summit points), and it holds everything people mean by visiting the Marble
            Mountains: the caves, the pagodas, the lift, the ticket booth, and the viewpoints. The other four are
            mostly bare hillside with a few small shrines at their bases and no trail network. So there is no need to
            plan around all five. Everything below is Thuy Son.
          </p>
        </div>

        <div id="history" className="flex flex-col gap-3 scroll-mt-24">
          <GuideH2 id="history">History: Cham shrines, Nguyen emperors, and a wartime hospital</GuideH2>
          <p>
            The caves were places of worship for the Cham centuries before they became Buddhist temples. Cham and
            Hindu carvings survive in some of the grottoes, and a statue of the Cham goddess Thien Y A Na still sits
            in Hoa Nghiem cave. Under the Nguyen dynasty in the 1820s and 30s, Emperor Minh Mang named the mountains,
            had pagodas built and rebuilt, and gave several caves the names they still carry.
          </p>
          <p>
            The most striking history is recent. During the war, the largest cave, Huyen Khong, was a secret base and
            field hospital for liberation fighters, and it was bombed in 1968. That layered past — Cham shrine,
            imperial Buddhist site, wartime refuge — is part of what makes the place more than a photo stop. It is
            also why the marble-carving tradition at the foot of the mountains, brought here in the late 1600s, is
            treated as living heritage rather than a souvenir gimmick.
          </p>
        </div>

        <div id="caves" className="flex flex-col gap-5 scroll-mt-24">
          <GuideH2 id="caves">The caves, the real reason to come</GuideH2>
          <p>
            The pagodas are pleasant; the caves are the point. Thuy Son holds around nine of them, from a
            cathedral-sized chamber to squeezes you climb through single file. These are the ones worth knowing.
          </p>

          <GuideH3>Huyen Khong: the one to prioritise</GuideH3>
          <p>
            The largest and most atmospheric cavern on the mountain, and the one repeat visitors call the highlight.
            Five openings in the roof, said locally to stand for the five fingers of Buddha&apos;s hand, let sunlight
            fall about 30 metres down onto the altar and a roughly four-metre white Sakyamuni Buddha, carved by a Non
            Nuoc craftsman in 1960. The light beams are strongest late morning to midday, when the sun is overhead
            and the shafts catch the incense smoke; under heavy cloud the effect disappears. It is cool and naturally
            ventilated inside, and it is the cave that served as a field hospital during the war.
          </p>

          <GuideImage
            src="https://upload.wikimedia.org/wikipedia/commons/6/64/Da_Nang_-_%C3%90%E1%BB%99ng_Huy%E1%BB%81n_Kh%C3%B4ng_%282024%29_-_img_09.jpg"
            alt="Inside Huyen Khong cave at the Marble Mountains, the largest cavern on Thuy Son, lit from openings in the roof"
            width={4032}
            height={3024}
            credit="Chainwit."
            creditUrl="https://commons.wikimedia.org/wiki/File:Da_Nang_-_%C3%90%E1%BB%99ng_Huy%E1%BB%81n_Kh%C3%B4ng_(2024)_-_img_09.jpg"
            license="CC BY 4.0"
          />

          <GuideH3>Am Phu (Hell) Cave: the theatrical one, separate ticket</GuideH3>
          <p>
            A separate, ground-level cave near the base, on its own 20,000 VND ticket. A corridor of about 300 to 350
            metres recreates the 18 levels of Buddhist hell in stone. A descending path to hell passes scenes of
            punishment, with Dia Tang, the Earth-Store Bodhisattva, at the centre. A steep path to heaven climbs to a
            skylight and a view over Non Nuoc Beach. It is theatrical rather than frightening, stays cool year-round,
            and was built as the dark counterpart to the mountain&apos;s pagodas.
          </p>

          <GuideH3>Tang Chon, Van Thong, and Linh Nham: the smaller caves</GuideH3>
          <p>
            <strong>Tang Chon</strong>, behind Linh Ung pagoda, is easy to miss — you duck under a low arch into a
            quiet temple grotto where the mountain&apos;s first monks are said to have lived.{" "}
            <strong>Van Thong</strong> is the &ldquo;stairway to heaven&rdquo;: a narrow tunnel, single file in
            places, that you climb through a tight opening to reach the summit rock. Skip it if you are claustrophobic
            or unsteady. <strong>Linh Nham</strong> is a tiny grotto behind Tam Thai&apos;s yard, a quick
            single-altar stop. Worth a look with time to spare, skippable without.
          </p>
        </div>

        <div id="pagodas" className="flex flex-col gap-4 scroll-mt-24">
          <GuideH2 id="pagodas">Pagodas and the Xa Loi tower</GuideH2>

          <GuideH3>Tam Thai Pagoda</GuideH3>
          <p>
            The main temple on Thuy Son. A stele records an original build date of 1630, with a rebuild under Minh
            Mang in the 1820s and 30s. It has blue walls and a dragon roof, set in a garden over the coast. Visitors
            pair this and Huyen Khong cave as the two stops to prioritise if time is short.
          </p>

          <GuideH3>Linh Ung Pagoda</GuideH3>
          <p>
            Built in 1825, and the oldest of Da Nang&apos;s three Linh Ung pagodas (more on that mix-up below). Small
            and quiet, and often overlooked in favour of the caves right beside it.
          </p>

          <GuideH3>Xa Loi (Bao Thap) Tower</GuideH3>
          <p>
            The tallest structure on the mountain: a seven-storey hexagonal tower about 28 metres high, built in 1997
            near the top of the elevator. Its seven levels echo the seven steps the Buddha is said to have taken at
            birth, and it holds around 200 stone statues, reportedly the most of any tower in Vietnam.
          </p>

          <GuideImage
            src="https://upload.wikimedia.org/wikipedia/commons/9/92/Bao_Thap_Xa_Loi_Marble_Mtns.jpg"
            alt="Xa Loi Tower, a seven-story hexagonal tower on Thuy Son at the Marble Mountains"
            width={1536}
            height={2048}
            credit="Dragfyre"
            creditUrl="https://commons.wikimedia.org/wiki/File:Bao_Thap_Xa_Loi_Marble_Mtns.jpg"
            license="CC BY-SA 3.0"
          />
        </div>

        <div id="viewpoints" className="flex flex-col gap-3 scroll-mt-24">
          <GuideH2 id="viewpoints">The two viewpoints</GuideH2>
          <p>
            Two clifftop platforms face opposite directions, and they are easy to confuse, since both are just
            &ldquo;the viewpoint&rdquo; in casual talk. <strong>Vong Hai Dai</strong> (the sea-watching tower) looks
            out over Non Nuoc Beach and the sea. <strong>Vong Giang Dai</strong> (the river-watching tower) faces
            inland over the rivers, the marble village, and the city. Between them you get both the coast and the
            countryside — worth the few extra steps on a clear morning.
          </p>
        </div>

        <div id="up" className="flex flex-col gap-4 scroll-mt-24">
          <GuideH2 id="up">Elevator or the 156 steps?</GuideH2>
          <p>
            The free stone staircase is 156 steps, worn smooth and uneven in places, about 5 to 10 minutes of
            climbing. The elevator (15,000 VND one-way, 30,000 VND round-trip) takes you to the main pagoda level in
            about a minute. But it only removes the first climb. From there, the caves, viewpoints, and inner temples
            are still reached on foot up more stairs. The lift can also close in storms.
          </p>
          <GuideTable
            columns={["Elevator", "156 steps"]}
            rows={[
              { label: "Price", values: ["15,000 VND one-way / 30,000 return", "Free (in the 40,000 VND entry)"] },
              { label: "Effort", values: ["Minimal", "Steep, uneven, slippery when wet"] },
              { label: "Reaches", values: ["Main pagoda level only", "The whole developed area on foot"] },
              { label: "Best for", values: ["Heat, limited mobility, midday", "Cooler hours, able walkers, the full experience"] },
            ]}
          />
          <p className="text-[13.5px] text-[#6B7280]">
            The common compromise: <strong>lift up, stairs down</strong>. You climb in one direction only, and still
            pass the temples and caves on the way down.
          </p>
        </div>

        <div id="tickets" className="flex flex-col gap-4 scroll-mt-24">
          <GuideH2 id="tickets">Tickets, hours, and the dress code</GuideH2>
          <p>
            There is no combined ticket. It is a few separate purchases, and the total per person is usually about
            55,000 to 90,000 VND, depending on whether you add the elevator and Am Phu Cave.
          </p>
          <GuideTable
            columns={["Price (2026)", "Notes"]}
            rows={[
              { label: "Main entrance (Thuy Son)", values: ["40,000 VND", "The core ticket; consistent across 2026 sources"] },
              { label: "Elevator, one-way", values: ["15,000 VND", "Optional"] },
              { label: "Elevator, round-trip", values: ["30,000 VND", "Optional"] },
              { label: "Am Phu (Hell) Cave", values: ["20,000 VND", "Separate ticket, at the base"] },
              { label: "Opening hours", values: ["~7:00 AM - 5:30 PM", "Last entry ~4:30 PM; elevator stops ~5:00 PM"] },
            ]}
          />
          <p className="text-[13px] text-[#9CA3AF]">
            Cash is the safe assumption at the booths, and the site operator can change prices by season. Official
            child, student, and senior rates are not reliably published online, so check at the booth rather than
            trusting a figure from a blog.
          </p>

          <GuideCallout label="Dress code, worth knowing before you go">
            This is an active Buddhist site with working temples, so cover your <strong>shoulders and knees</strong>{" "}
            at the shrines. You will not be stopped at the gate for beach clothes, but you will feel out of place at
            the altars, and covering up also helps with the sun on the exposed top. Wear closed shoes with grip.
            Flip-flops on wet marble steps are a real way to get hurt.
          </GuideCallout>
        </div>

        <GuideCallout label="Do not mix this up: the Lady Buddha">
          There are three pagodas named Linh Ung in Da Nang, and the Marble Mountains have the oldest, smallest, and
          quietest of them (1825). The famous one — the 67-metre Lady Buddha statue most people picture — is a
          separate, much larger site on the Son Tra Peninsula (Monkey Mountain), about 20 minutes away on the coast.
          If a photo of a giant white Buddha is why you are coming, you want Son Tra, not here.
        </GuideCallout>

        <div id="village" className="flex flex-col gap-3 scroll-mt-24">
          <GuideH2 id="village">Non Nuoc marble-carving village</GuideH2>
          <p>
            At the foot of the mountains sits the village the whole site is named for. Around 500 stone-carving
            workshops line its lanes. The craft was brought here from Thanh Hoa in the late 1600s, and in 2014 it
            became the first thing in Da Nang recognised as National Intangible Cultural Heritage. You can hear the
            chisels before you see the showrooms, which sell everything from palm-sized Buddhas to full statues. It
            is free to walk through and pairs naturally with the mountain rather than being a separate trip. Two
            honest notes: much of the raw marble is now imported, because quarrying the mountains is restricted to
            protect them, and the shop staff can be pushy about a sale, more so later in the day than at opening.
          </p>
        </div>

        <div id="plan" className="flex flex-col gap-4 scroll-mt-24">
          <GuideH2 id="plan">Planning the visit</GuideH2>
          <p>
            The mountains are compact and easy to fold into a bigger day. They sit right on the road to{" "}
            <Link href="/guides/da-nang-to-hoi-an-day-trip" className="text-[#E8742C] underline underline-offset-2">
              Hoi An
            </Link>{" "}
            and about ten minutes from the airport, so they pair naturally with an arrival day, a{" "}
            <Link href="/guides/da-nang-layover-guide" className="text-[#E8742C] underline underline-offset-2">
              long layover
            </Link>
            , or a Hoi An day trip rather than a trip of their own.
          </p>
          <GuideList
            items={[
              "Arrive by 7:30 to 8 AM if you can. Tour buses cluster from about 9:30 AM, and mornings are cooler for the climb.",
              "Dress modestly for the temples (shoulders and knees), and wear closed shoes with grip, not sandals.",
              "Bring small cash for the separate ticket booths.",
              "Give Huyen Khong cave time. It is the highlight, and the light beams peak late morning.",
              "It is about 10 minutes from Da Nang airport, 15 to 20 from the city centre, and right on the road to Hoi An.",
            ]}
          />

          <GuideStowCallout
            eyebrow="Before you climb"
            heading="You cannot do 156 steps with a suitcase. Leave it in the city first."
            facts={[
              { label: "In the same district", value: "Ngu Hanh Son" },
              { label: "By the hour", value: "15,000 VND/hr" },
              { label: "Full day", value: "60,000 VND (up to 24h)" },
            ]}
          >
            There are no visitor lockers on the mountain, and between the 156 steps, the tight Van Thong squeeze, and
            the heat, the last thing you want is a bag on your back. Stow is a luggage-storage shop at 55 Ba Bang
            Nhan, <strong>in the Ngu Hanh Son district itself</strong> — minutes from the entrance and about ten from
            the airport. So it is the natural first or last stop, whether you climb on your arrival day, wait out a
            few hours before a late flight, or pass through on the way to Hoi An. We are open 7am to 10pm, drop-off
            takes under three minutes, and every bag gets a photo-and-tag receipt.
          </GuideStowCallout>
        </div>

        <div id="faq" className="flex flex-col gap-3 scroll-mt-24">
          <GuideH2 id="faq">Questions people ask</GuideH2>
          <GuideFAQ items={FAQ_ITEMS} />
        </div>

        <GuideSources items={SOURCES} />

        <p className="text-[13px] text-[#9CA3AF]">
          The site operator sets hours and ticket prices, and they can change by season. Worth a quick check on the
          day if you are planning tightly around them.
        </p>
      </GuideLayout>
    </>
  );
}
