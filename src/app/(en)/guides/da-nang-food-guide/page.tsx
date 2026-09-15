import type { Metadata } from "next";
import GuideLayout from "@/components/guides/GuideLayout";
import {
  GuideH2,
  GuideH3,
  GuideLead,
  GuideTLDR,
  GuideFacts,
  GuideList,
  GuideTable,
  GuideStowCallout,
  GuideFAQ,
  GuideImage,
  GuideSources,
} from "@/components/guides/GuideElements";
import { breadcrumbJsonLd, guideFaqJsonLd } from "@/lib/structured-data";
import { getDictionary } from "@/content/dictionary";

const pageTitle = "Da Nang Food Guide: 15 Dishes and Where to Eat Them";
const pageDescription =
  "What to eat in Da Nang: mi quang, bun cha ca, banh xeo, seafood and the coffee scene, with named local spots (several Michelin-listed), honest prices, the best markets, and how to eat street food without getting sick.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides/da-nang-food-guide" },
  openGraph: { title: `${pageTitle} | Stow`, description: pageDescription, url: "https://www.stowdanang.com/guides/da-nang-food-guide" },
  twitter: { title: `${pageTitle} | Stow`, description: pageDescription },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Da Nang Food Guide", path: "/guides/da-nang-food-guide" },
]);

const FAQ_ITEMS = [
  {
    q: "What is Da Nang famous for, food-wise?",
    a: "Above all, mi quang: turmeric-yellow noodles with just a splash of intense broth, peanuts, and a crisp rice cracker. Beyond that, the city is known for bun cha ca (fish cake noodle soup, with a couple of Michelin-listed shops), banh trang cuon thit heo pork-and-rice-paper rolls, fresh My Khe seafood, and a strong coffee culture, including the salt coffee that spread nationwide from nearby Hue.",
  },
  {
    q: "What is the best Vietnamese food to try in Da Nang?",
    a: "If you only eat three things: mi quang, bun cha ca, and banh xeo with nem lui (grilled pork skewers). All three are cheap, distinctly Central Vietnamese, and have well-loved local specialists, several of which appear in the Michelin Guide.",
  },
  {
    q: "How do I avoid a stomach bug in Vietnam?",
    a: "Eat where the queue is, because high turnover means fresh food. Stick to freshly and fully cooked dishes, be cautious with raw seafood and raw vegetables, sanitize your hands before eating (many stalls have no soap), and carry a small stomach kit. If symptoms last beyond two or three days, or come with a high fever, see a doctor.",
  },
  {
    q: "Where is the best street food in Da Nang?",
    a: "Con Market is the city's biggest street-food hub, and its outdoor area is busiest from mid-afternoon. Han Market has plenty of stalls too but is more touristy and pricier, so it is better for first-timers and souvenirs. Both are mostly cash-only, so bring small notes.",
  },
  {
    q: "What is mi quang, and how is it different from pho?",
    a: "Mi quang uses thick, turmeric-yellow noodles with only a small amount of concentrated broth, topped with shrimp or pork, peanuts, herbs, and a crispy sesame rice cracker. Unlike pho, it is not a soup; you toss it rather than sip it.",
  },
  {
    q: "What is salt coffee (ca phe muoi)?",
    a: "Iced coffee where a pinch of salt over the condensed milk balances the bitterness of dark robusta. It reportedly originated in Hue, about an hour north, around 2010, and is now on almost every Da Nang menu, alongside egg coffee and coconut coffee.",
  },
  {
    q: "Where should I eat seafood in Da Nang?",
    a: "The My Khe, Man Thai, and Son Tra strip (along Vo Nguyen Giap, Vo Van Kiet, and Hoang Sa). Tank-to-table spots like Be Man (Michelin-listed) let you pick live seafood and choose how it is cooked, at roughly 200,000 to 350,000 VND per person. Always ask the price per kilogram before ordering.",
  },
  {
    q: "Is Da Nang food spicy?",
    a: "Central Vietnamese cooking is bolder, spicier, and saltier than the sweeter South or the subtler North, and it leans on fermented-fish sauces like mam nem. It is not fiery by default, but expect more chili and stronger dips than elsewhere in Vietnam.",
  },
  {
    q: "How much does a cheap local meal cost in Da Nang?",
    a: "Most signature street plates land around 30,000 to 70,000 VND, and snacks like banh trang kep are about 10,000 to 15,000 VND. A tank-to-table seafood dinner is the splurge, roughly 200,000 to 350,000 VND per person.",
  },
  {
    q: "How much does a Da Nang food tour cost?",
    a: "Roughly US$29 to US$49. A typical 2.5-hour walking tour covers about 3 km with around eight tastings in a small group, and includes an English-speaking guide and water. You can also DIY a crawl through Con Market for far less.",
  },
];

const SOURCES = [
  { label: "MICHELIN Guide: Da Nang", url: "https://guide.michelin.com/us/en/da-nang-region/da-nang_2984390", note: "the Michelin-recognised spots (Bun Cha Ca Hon, Be Man, Mi Quang 1A, Banh Xeo Ba Duong)" },
  { label: "Vietnam Tourism: Vietnamese coffee decoded", url: "https://www.vietnamtourism.com/en/vietnamese-coffee-decoded-ca-phe-sua-da-egg-coffee-coconut-salt-coffee", note: "the coffee variants and the salt-coffee origin story" },
  { label: "Vietnam.travel: foodie guide to Da Nang", url: "https://vietnam.travel/things-to-do/foodie-guide-da-nang", note: "the official national tourism take on banh mi, che, and rice-paper rolls" },
  { label: "Danang Fantasticity: eat and drink", url: "https://danangfantasticity.com/en/eat-drink/", note: "the city tourism authority's dish definitions (bun cha ca, banh trang cuon thit heo)" },
  { label: "VinWonders: best mi quang in Da Nang", url: "https://vinwonders.com/en/wonderpedia/news/best-mi-quang-in-da-nang/", note: "named mi quang spots and price ranges" },
  { label: "Eat Danang: 15 must-try street foods", url: "https://eatdanang.com/top-15-must-try-da-nang-street-food/", note: "the Central Vietnam flavour profile and the snack dishes" },
  { label: "Will Fly for Food: Da Nang restaurants and cafes", url: "https://www.willflyforfood.net/danang-cafes/", note: "independently photo-verified cafe and restaurant picks" },
  { label: "Threeland: eating Vietnam street food safely", url: "https://threeland.com/blogs/how-to-enjoy-vietnams-street-food-safely-essential-tips-for-travelers", note: "the food-safety guidance" },
];

export default async function DaNangFoodGuide() {
  const dict = await getDictionary("en");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideFaqJsonLd(FAQ_ITEMS)) }} />
      <GuideLayout
        dict={dict}
        currentPath="/guides/da-nang-food-guide"
        eyebrow="Eat & Drink"
        title="Da Nang Food Guide"
        subhead="Central Vietnam's food capital, dish by dish, with the named local spots to eat each one, honest prices, and how to eat street food without getting sick."
        readingTime="12 min read"
        toc={[
          { id: "different", label: "What makes Da Nang food different" },
          { id: "noodles", label: "The signature noodle dishes" },
          { id: "rolls", label: "Rolls, pancakes and rice-paper plates" },
          { id: "rice-bread", label: "Rice, bread and quick eats" },
          { id: "seafood", label: "Da Nang seafood" },
          { id: "coffee", label: "Coffee and sweets" },
          { id: "markets", label: "Con Market vs Han Market" },
          { id: "food-tours", label: "Food tours and crawls" },
          { id: "safety", label: "Eating street food safely" },
          { id: "table", label: "The dish cheat-sheet" },
          { id: "faq", label: "Questions people ask" },
        ]}
        related={[
          { title: "The Perfect Da Nang Itinerary", href: "/guides/da-nang-itinerary", blurb: "Where these meals fit into a 3-day plan, day by day." },
          { title: "Da Nang Layover Guide", href: "/guides/da-nang-layover-guide", blurb: "Hours between flights? Eat your way through them instead of sitting airside." },
        ]}
      >
        <GuideLead>
          Da Nang is Central Vietnam&apos;s food capital, and Central Vietnamese cooking is its own thing: bolder,
          spicier, and saltier than the sweet South or the subtle North. The real depth is not in fancy restaurants
          but in the everyday street plates. Here is what to eat, the named spots locals actually send you to
          (several of them Michelin-listed), and roughly what it costs.
        </GuideLead>

        <GuideTLDR>
          Da Nang&apos;s signature dish is <strong>mi quang</strong>, turmeric noodles with a splash of intense
          broth. Beyond it, eat <strong>bun cha ca</strong> (fish cake noodle soup), <strong>banh xeo</strong> with
          nem lui, <strong>banh trang cuon thit heo</strong> (pork rice-paper rolls), and <strong>My Khe
          seafood</strong> you pick from the tank. Coffee is a second reason to come: <strong>salt coffee</strong>,
          egg coffee, and coconut coffee are everywhere. <strong>Con Market</strong> is the street-food engine
          (busiest mid-afternoon); Han Market is more touristy. Most signature plates cost{" "}
          <strong>around 30,000 to 70,000 VND</strong>. The one rule for not getting sick: eat where the queue is.
        </GuideTLDR>

        <GuideImage
          src="https://upload.wikimedia.org/wikipedia/commons/e/e5/B%C3%A1nh_x%C3%A8o_1.jpg"
          alt="Banh xeo, a crispy turmeric pancake and one of Central Vietnam's signature street foods"
          width={2289}
          height={1584}
          credit="Kent Wang"
          creditUrl="https://commons.wikimedia.org/wiki/File:B%C3%A1nh_x%C3%A8o_1.jpg"
          license="CC BY-SA 2.0"
        />

        <GuideFacts
          items={[
            { label: "Signature dish", value: "Mi quang" },
            { label: "Street plate price", value: "~30,000-70,000 VND" },
            { label: "Snacks", value: "~10,000-15,000 VND" },
            { label: "Seafood dinner", value: "~200,000-350,000 VND pp" },
            { label: "Best market", value: "Con Market (after 3pm)" },
            { label: "Food tour", value: "~US$29-49" },
          ]}
        />

        <div id="different" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="different">What makes Da Nang food different</GuideH2>
          <p>
            Central Vietnamese cooking has a strong personality: more chili, more salt, and a love of fermented
            anchovy sauce (mam nem), the dip that ties together the region&apos;s rolled and grilled plates.
            Turmeric shows up in the noodles and pancakes, giving them their yellow colour. It is not fiery by
            default, but it is punchier and less sweet than food in Ho Chi Minh City or Hanoi, and that is exactly
            why people travel for it.
          </p>
        </div>

        <div id="noodles" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="noodles">The signature noodle dishes</GuideH2>
          <GuideH3>Mi quang</GuideH3>
          <p>
            The defining dish of Da Nang: thick, turmeric-yellow noodles with only a small amount of concentrated
            broth, topped with shrimp or pork, quail eggs, peanuts, herbs, and a crispy sesame rice cracker. You
            toss it, you do not sip it. Try <strong>Mi Quang Ba Mua</strong> (a well-known local chain, main branch
            at 44 Le Dinh Duong) or <strong>Mi Quang 1A</strong> (1A Hai Phong, in the Michelin Guide). Around
            30,000 to 70,000 VND.
          </p>
          <GuideH3>Bun cha ca</GuideH3>
          <p>
            Fish cake noodle soup, with a clear broth that is naturally sweet from simmered fish bones and tomato,
            and chewy handmade fish cakes. Two shops carry Michelin recognition: <strong>Bun Cha Ca Hon</strong>{" "}
            (open 30-plus years) and <strong>Bun Cha Ca 109</strong> (109 Nguyen Chi Thanh). A comforting, cheap
            first bowl.
          </p>
        </div>

        <div id="rolls" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="rolls">Rolls, pancakes, and rice-paper plates</GuideH2>
          <GuideH3>Banh xeo and nem lui</GuideH3>
          <p>
            A crispy turmeric pancake and grilled pork skewers, which you roll yourself in rice paper with herbs and
            a rich peanut dipping sauce. The famous spot is <strong>Banh Xeo Ba Duong</strong>, down an alley at
            K280/23 Hoang Dieu (also a Michelin selection). Expect roughly 40,000 VND for a few banh xeo and about
            50,000 VND for ten skewers.
          </p>
          <GuideH3>Banh trang cuon thit heo</GuideH3>
          <p>
            Slices of boiled pork belly with rice paper, raw vegetables and herbs, rolled by hand and dipped in
            fermented anchovy sauce. It is a hands-on, shared plate, and a Da Nang specialty. Look for{" "}
            <strong>Quan Ba Mua</strong> or the <strong>Dac San Tran</strong> group. For a cheap snack version,
            grilled banh trang kep (a rice-paper &ldquo;pizza&rdquo; with egg, dried beef, and chili) runs about
            10,000 to 15,000 VND at market stalls.
          </p>
        </div>

        <div id="rice-bread" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="rice-bread">Rice, bread, and quick eats</GuideH2>
          <p>
            <strong>Com ga</strong> (chicken rice, with the rice cooked in chicken broth) is a reliable cheap meal;{" "}
            <strong>Com Ga A Hai</strong> is the best-known specialist, around 30,000 to 60,000 VND. A warm{" "}
            <strong>banh mi</strong> on the sidewalk is a classic, and Da Nang has a local twist worth seeking out,
            banh mi bot loc, stuffed with chewy tapioca shrimp-and-pork dumplings. And do not miss{" "}
            <strong>mit tron</strong>, a young-jackfruit salad with peanuts and herbs that is a Da Nang invention.
          </p>
        </div>

        <div id="seafood" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="seafood">Da Nang seafood</GuideH2>
          <p>
            Da Nang is a coastal city, and the seafood strip runs along Vo Nguyen Giap, Vo Van Kiet, and Hoang Sa
            near My Khe and Man Thai. The move is tank-to-table: pick your crab, lobster, clams, or fish live, and
            choose how it is cooked. <strong>Be Man</strong> (Lot 8 Vo Nguyen Giap, Man Thai) is one of the most
            famous and is Michelin-listed, at roughly 200,000 to 350,000 VND per person. One rule that saves
            money and arguments: <strong>ask the price per kilogram before you order</strong>. For the adventurous,
            goi ca Nam O is a raw-herring salad from a fishing village northwest of the city; treat it as a
            raw-fish dish and eat it only where it is busy and fresh.
          </p>
        </div>

        <div id="coffee" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="coffee">Coffee and sweets</GuideH2>
          <p>
            Coffee is a second reason to visit. The baseline is <strong>ca phe sua da</strong>, strong iced coffee
            with condensed milk. From there, try <strong>salt coffee</strong> (ca phe muoi), which reportedly
            started in nearby Hue around 2010 and is now everywhere; <strong>egg coffee</strong> (ca phe trung),
            with a custard-like whipped topping; and <strong>coconut coffee</strong> (ca phe dua). For dessert,{" "}
            <strong>che</strong> (sweet soups, from durian to sweet corn) and <strong>kem bo</strong> (avocado ice
            cream) are the local street sweets. Specialty cafes like 43 Factory and Brewman are worth a slow hour.
          </p>
        </div>

        <div id="markets" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="markets">Con Market vs Han Market</GuideH2>
          <p>
            For eating, go to <strong>Con Market</strong>: it is the city&apos;s biggest street-food hub, with an
            indoor food court and an outdoor area that gets busy from mid-afternoon, and it is cheap and local
            (bring cash). <strong>Han Market</strong> has plenty of food stalls too and is more central, but it is
            touristy and pricier, so it is better for a first look and for souvenirs. Either way, choose the busy
            stalls with high turnover.
          </p>
        </div>

        <div id="food-tours" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="food-tours">Food tours and self-guided crawls</GuideH2>
          <p>
            A guided walking food tour (roughly US$29 to US$49 for about 2.5 hours and eight tastings) is a good way
            to try a lot fast with someone who orders for you. You can also DIY it: a Con Market crawl at
            mid-afternoon costs a fraction of that. Either way, it is three-plus hours on your feet, weaving between
            stalls and perching on plastic stools.
          </p>

          <GuideStowCallout
            eyebrow="Before the food crawl"
            heading="Eat with both hands free, not one on a suitcase."
            facts={[
              { label: "By the hour", value: "15,000 VND/hr" },
              { label: "Full day", value: "60,000 VND (up to 24h)" },
              { label: "Open", value: "7am - 10pm daily" },
            ]}
          >
            A market crawl or a walking food tour is miserable with a suitcase, and no guide wants to babysit your
            bags. If you have just landed or you are between checkout and a night flight, drop your luggage first.
            Stow is at 55 Ba Bang Nhan in Ngu Hanh Son, about ten minutes from the airport, at 15,000 VND an hour
            or 60,000 VND a day (an hourly stay is capped at the daily rate after four hours, so a long food day
            just becomes 60,000 VND). Open 7am to 10pm, which covers the after-3pm Con Market window and a late
            seafood dinner.
          </GuideStowCallout>
        </div>

        <div id="safety" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="safety">How to eat street food without getting sick</GuideH2>
          <GuideList
            items={[
              "Eat where the queue is: high turnover means the food is fresh and the ingredients do not sit.",
              "Stick to freshly and fully cooked dishes; be cautious with raw seafood and raw vegetables.",
              "Sanitize your hands before eating, since many stalls have no soap; carry a small bottle.",
              "Drink bottled or filtered water, and go easy on ice from unknown sources at first.",
              "Pack a small stomach kit (rehydration salts, basic meds); see a doctor if it lasts beyond 2 to 3 days or comes with a high fever.",
            ]}
          />
        </div>

        <div id="table" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="table">The dish cheat-sheet</GuideH2>
          <GuideTable
            columns={["What it is", "Where to try", "Approx price"]}
            rows={[
              { label: "Mi quang", values: ["Turmeric noodles, little broth", "Mi Quang Ba Mua; Mi Quang 1A", "30,000-70,000 VND"] },
              { label: "Bun cha ca", values: ["Fish cake noodle soup", "Bun Cha Ca Hon; Bun Cha Ca 109", "~30,000-50,000 VND"] },
              { label: "Banh xeo + nem lui", values: ["Crispy pancake + pork skewers", "Banh Xeo Ba Duong", "~40,000-90,000 VND"] },
              { label: "Banh trang cuon thit heo", values: ["Pork and rice-paper rolls", "Quan Ba Mua; Dac San Tran", "~70,000-90,000 VND/set"] },
              { label: "Com ga", values: ["Chicken rice", "Com Ga A Hai", "30,000-60,000 VND"] },
              { label: "Seafood (tank-to-table)", values: ["Pick live, choose the cooking", "Be Man; the My Khe strip", "~200,000-350,000 VND pp"] },
              { label: "Salt / egg / coconut coffee", values: ["Da Nang's coffee trio", "Cafes citywide; 43 Factory, Brewman", "~30,000-60,000 VND"] },
            ]}
          />
          <p className="text-[13px] text-[#9CA3AF]">
            Prices are approximate 2026 ranges and drift, and named spots can move or close, so treat these as leads
            and check current details before you make a special trip.
          </p>
        </div>

        <div id="faq" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="faq">Questions people ask</GuideH2>
          <GuideFAQ items={FAQ_ITEMS} />
        </div>

        <GuideSources items={SOURCES} />

        <p className="text-[13px] text-[#9CA3AF]">
          Restaurant addresses, prices, and opening hours change, and US dollar figures are approximate. This guide
          reflects the situation at the time of writing; confirm a spot is still open before you go out of your way.
        </p>
      </GuideLayout>
    </>
  );
}
