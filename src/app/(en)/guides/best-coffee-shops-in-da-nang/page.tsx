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
  GuideImage,
  GuideSources,
} from "@/components/guides/GuideElements";
import { breadcrumbJsonLd, guideFaqJsonLd, itemListJsonLd } from "@/lib/structured-data";
import { getDictionary } from "@/content/dictionary";

const pageTitle = "The Best Coffee Shops in Da Nang: Specialty Roasters and Vietnamese Classics";
const pageDescription =
  "The best coffee shops in Da Nang, from specialty roasters like 43 Factory to vintage spots for salt coffee and egg coffee. What the signature drinks are, real prices, and where to find a view.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/guides/best-coffee-shops-in-da-nang" },
  openGraph: { title: `${pageTitle} | Stow`, description: pageDescription, url: "https://www.stowdanang.com/guides/best-coffee-shops-in-da-nang" },
  twitter: { title: `${pageTitle} | Stow`, description: pageDescription },
};

const breadcrumb = breadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Guides", path: "/guides" },
  { name: "Best Coffee Shops in Da Nang", path: "/guides/best-coffee-shops-in-da-nang" },
]);

const RANKED = [
  {
    name: "43 Factory Coffee Roaster (XLIII)",
    area: "My An, Ngu Hanh Son",
    meta: "specialty cups ~60,000 - 120,000 VND · 6:30am - 10:30pm",
    blurb:
      "Da Nang's flagship specialty roaster. It imports green beans from Ethiopia, Colombia, Panama, and Peru, roasts on site, and serves every cup origin-first with tasting notes, in a glass-and-steel building with koi ponds. Rare single-origin lots cost far more, but a standard cup is worth the splurge. It also trades as XLIII.",
    schema: "Flagship specialty roaster with imported single-origin beans and on-site roasting.",
  },
  {
    name: "Nam House Cafe",
    area: "Hai Chau",
    meta: "specialty drinks ~30,000 - 55,000 VND · 6am - 11pm",
    blurb:
      "The vintage favorite. A 1970s and 80s time capsule packed with antiques, best known for a top-tier salt coffee and egg coffee. It is the pick for atmosphere and the Vietnamese classics in a characterful room, and one of the most photographed cafes in the city.",
    schema: "Vintage antique-filled cafe famous for salt coffee and egg coffee.",
  },
  {
    name: "Ala Cafe",
    area: "Hai Chau",
    meta: "specialty cups ~55,000 - 85,000 VND",
    blurb:
      "An award-winning specialty cafe up an alley, with a rooftop tropical garden under a glass roof. It pours light-to-dark single origins from Ethiopia, Honduras, and Brazil, plus Vietnamese arabica, and every cup comes with tasting notes. The pick for geisha and single-origin explorers.",
    schema: "Award-winning specialty cafe with a rooftop garden and single-origin flights.",
  },
  {
    name: "Son Tra Marina",
    area: "Son Tra hillside",
    meta: "salt coffee ~35,000 - 65,000 VND",
    blurb:
      "The view pick. A Santorini-style cafe of white walls and blue domes on the Son Tra hillside, looking over the bay, and one of the most photographed spots in Da Nang. Come for golden hour, order the salt coffee, and pair it with a Son Tra trip.",
    schema: "Santorini-style hillside cafe with a bay view and salt coffee.",
  },
  {
    name: "Cong Caphe",
    area: "Han River / Bach Dang",
    meta: "coconut coffee ~35,000 - 65,000 VND",
    blurb:
      "The iconic Vietnamese chain, done in retro military-kitsch style with worn wood and enamel mugs, and famous for its blended coconut-milk coffee. It is reliable and atmospheric, with several branches, and the riverfront one near Bach Dang is the easiest to pair with a Dragon Bridge evening.",
    schema: "Retro Vietnamese chain famous for blended coconut-milk coffee.",
  },
  {
    name: "Puna Coffee",
    area: "An Thuong area",
    meta: "cups ~25,000 - 50,000 VND",
    blurb:
      "A Vietnamese-owned micro-roaster that punches above its price. It roasts in house, imports Colombian, Ethiopian, and Kenyan beans alongside local ones, and serves egg coffee in cute mini egg cups with dipping biscuits. The pick for value-minded specialty drinkers. Check the current address, as listings vary.",
    schema: "Vietnamese-owned micro-roaster with in-house roasting at low prices.",
  },
  {
    name: "Trinh Ca Phe",
    area: "Hai Chau, near the Dragon Bridge",
    meta: "6:30am - 10:30pm",
    blurb:
      "A vintage, plant-filled cafe a short walk from the Dragon Bridge, best known for a house avocado coffee alongside a good salt coffee. The pick for sightseers who want a characterful coffee near the riverfront.",
    schema: "Vintage garden cafe near the Dragon Bridge, known for avocado coffee.",
  },
  {
    name: "Roost Roasters",
    area: "Ngu Hanh Son",
    meta: "cups ~35,000 - 65,000 VND",
    blurb:
      "A farm-to-cup roaster with its own farm and a big garden setting, strong on Vietnamese flavors like properly made salt coffee and phin filter coffee, plus imported Ethiopian beans. Good value in a relaxed outdoor space, near the Marble Mountains end of the beach.",
    schema: "Farm-to-cup roaster with its own farm and a large garden.",
  },
  {
    name: "Lighthouse Coffee Roaster",
    area: "Son Tra",
    meta: "cups ~55,000 - 85,000 VND",
    blurb:
      "A brick, two-level roastery on the Son Tra side where you can watch the roasting from the upper floor. It blends Vietnamese beans with Australian selections, pours single-origin espresso and pour-over, and runs coffee workshops. The pick for people who want to see how the cup is made.",
    schema: "Two-level roastery where you can watch the roasting and take workshops.",
  },
  {
    name: "Wonderlust Bakery and Coffee",
    area: "Hai Chau (Tran Phu)",
    meta: "7:30am - 11pm",
    blurb:
      "A three-floor cafe-bakery as much about the experience as the coffee, known for a coconut latte, coconut milkshakes, cold brew, and a big dessert case. The pick for coconut-coffee and dessert lovers, or a long group sit-down. It is a nomad favorite too, though for wifi see our work-from list.",
    schema: "Three-floor cafe-bakery known for coconut latte and desserts.",
  },
];

const FAQ_ITEMS = [
  {
    q: "What is the best coffee shop in Da Nang?",
    a: "For serious specialty coffee, 43 Factory Coffee Roaster (now also trading as XLIII) is the most consistent top pick, praised across guides and ranked near the top of the city's cafes on Tripadvisor. For atmosphere and the Vietnamese classics, Nam House is the favorite for its salt and egg coffee.",
  },
  {
    q: "What coffee is Da Nang famous for?",
    a: "Strong robusta brewed in a phin filter over sweetened condensed milk and ice, known as ca phe sua da. Vietnam is the world's second-largest coffee producer, and over 90 percent of its crop is robusta, which gives the coffee its bold, bittersweet punch.",
  },
  {
    q: "What is salt coffee (ca phe muoi)?",
    a: "Salt coffee is phin-filter coffee topped with a lightly salted whipped-cream foam, where the salt lifts the sweetness of the condensed milk underneath. It was created in Hue around 2010 and spread across Vietnam after the pandemic, and it is now on nearly every Da Nang menu.",
  },
  {
    q: "What is egg coffee (ca phe trung)?",
    a: "Egg coffee is strong coffee under a whipped, custard-like foam of egg yolk, sugar, and condensed milk. It was invented at Giang Cafe in Hanoi in the 1940s when fresh milk was scarce, and it tastes more like a warm dessert than a regular coffee.",
  },
  {
    q: "What is coconut coffee?",
    a: "Coconut coffee, ca phe cot dua, is iced Vietnamese coffee topped with a blended coconut-cream slushy of coconut milk and condensed milk. The chain Cong Caphe helped make it famous, and it is a sweet, refreshing option in the Da Nang heat.",
  },
  {
    q: "How much does coffee cost in Da Nang?",
    a: "A local iced milk coffee runs about 20,000 to 35,000 VND. Specialty and view cafes charge roughly 45,000 to 85,000 VND, and rare single-origin cups at a roaster like 43 Factory cost more. Coffee is cheap here, so a great cup rarely dents the budget.",
  },
  {
    q: "Where can I get the best salt coffee in Da Nang?",
    a: "Nam House and Roost Roasters are both named for well-made salt coffee, and there are dedicated salt-coffee specialists in the city too. Since salt coffee is now on almost every menu, it is easy to try a few and pick your favorite.",
  },
  {
    q: "Which Da Nang cafe has the best view?",
    a: "Son Tra Marina, a Santorini-style cafe on the Son Tra hillside, has the best-known view, looking out over the bay. It pairs well with a wider Son Tra peninsula trip, so you can combine the coffee with the Lady Buddha and the coastal road.",
  },
  {
    q: "Where do I try egg, coconut, and salt coffee in one place?",
    a: "Several neighborhood cafes near My Khe serve all three Vietnamese specialty coffees side by side, so you can taste-test them in one sitting. Ask for ca phe trung (egg), ca phe cot dua (coconut), and ca phe muoi (salt), and compare.",
  },
  {
    q: "Do Da Nang cafes have specialty roasters, not just Vietnamese drip?",
    a: "Yes. 43 Factory, Lighthouse, Roost, Puna, and Ala all roast on site and pour single-origin espresso, pour-over, and cold brew. Da Nang has a serious third-wave scene alongside the traditional phin filter coffee, so both worlds are easy to find.",
  },
];

const SOURCES = [
  { label: "Will Fly For Food: Da Nang cafes", url: "https://www.willflyforfood.net/danang-cafes/", note: "the first-person cafe guide with addresses, hours, and top picks" },
  { label: "The Way To Coffee: Da Nang", url: "https://thewaytocoffee.com/da-nang/", note: "the specialty-roaster detail, brew methods, and beans" },
  { label: "Sprudge: guide to coffee in Da Nang", url: "https://sprudge.com/the-sprudge-guide-to-coffee-in-da-nang-vietnam-308055.html", note: "industry coverage of the specialty scene and 43 Factory" },
  { label: "Origin Vietnam: Da Nang coffee guide", url: "https://www.originvietnam.com/da-nang-coffee-guide/", note: "the drink glossary, price bands, and view cafes" },
  { label: "Hostelgeeks: best coffee shops in Da Nang", url: "https://hostelgeeks.com/best-coffee-shops-da-nang-vietnam/", note: "the design-led cafe picks and pricing tiers" },
  { label: "Chowhound: Vietnamese salted coffee history", url: "https://www.chowhound.com/1568102/vietnamese-salted-coffee-history/", note: "the origin of salt coffee in Hue around 2010" },
  { label: "Nguyen Coffee Supply: Vietnamese egg coffee", url: "https://nguyencoffeesupply.com/blogs/culture/vietnamese-egg-coffee-ca-phe-trung", note: "the history of egg coffee at Giang Cafe in the 1940s" },
  { label: "Michelin Guide: Vietnamese coffee", url: "https://guide.michelin.com/vn/en/article/features/iconic-dishes-a-guide-to-vietnamese-coffee", note: "the authoritative overview of Vietnamese coffee styles" },
];

export default async function BestCoffeeShopsInDaNang() {
  const dict = await getDictionary("en");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(guideFaqJsonLd(FAQ_ITEMS)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            itemListJsonLd(
              RANKED.map((r) => ({ name: r.name, description: r.schema })),
              "The Best Coffee Shops in Da Nang"
            )
          ),
        }}
      />
      <GuideLayout
        dict={dict}
        currentPath="/guides/best-coffee-shops-in-da-nang"
        eyebrow="Food & Drink"
        title="The Best Coffee Shops in Da Nang"
        subhead="Specialty roasters and Vietnamese classics, what the signature drinks are, and where to find a great cup with a view."
        readingTime="11 min read"
        toc={[
          { id: "signature", label: "Da Nang's signature coffees" },
          { id: "how-we-chose", label: "How we chose" },
          { id: "ranked", label: "The 10 best coffee shops" },
          { id: "compare", label: "Compared at a glance" },
          { id: "more", label: "More worth a try" },
          { id: "bags", label: "Cafe-hopping with luggage" },
          { id: "faq", label: "Questions people ask" },
        ]}
        related={[
          { title: "Da Nang Food Guide", href: "/guides/da-nang-food-guide", blurb: "What to eat with, or after, all that coffee: 15 dishes and where to find them." },
          { title: "Best Cafes to Work From in Da Nang", href: "/guides/best-cafes-to-work-from-in-da-nang", blurb: "Here for the wifi, not just the cup? The laptop-friendly cafes ranked." },
        ]}
      >
        <GuideLead>
          Coffee is not a side act in Da Nang, it is a reason to visit. The city runs on strong robusta and sweetened
          condensed milk, and it has grown a serious specialty scene on top of that, with roasters importing single-origin
          beans and pouring them like wine. This list covers both worlds: the roasteries worth a trip for the cup, and
          the vintage spots for the Vietnamese classics. First, what to actually order.
        </GuideLead>

        <GuideTLDR>
          Da Nang&apos;s best coffee shops mix serious specialty roasters with the Vietnamese classics.{" "}
          <strong>43 Factory Coffee Roaster</strong> (also XLIII) leads for imported single-origin beans, and{" "}
          <strong>Nam House</strong> is the vintage favorite for salt coffee and egg coffee. For a view,{" "}
          <strong>Son Tra Marina</strong> overlooks the bay. Try the local signatures: salt coffee, egg coffee, and
          coconut coffee. Expect about 20,000 to 85,000 VND a cup, with rare single-origin lots costing more.
        </GuideTLDR>

        <GuideImage
          src="https://upload.wikimedia.org/wikipedia/commons/9/92/Vietnamese_coffee_with_milk_and_ice.jpg"
          alt="A glass of Vietnamese iced coffee with condensed milk, the classic Da Nang order"
          width={3130}
          height={2075}
          credit="ePi.Longo"
          creditUrl="https://commons.wikimedia.org/wiki/File:Vietnamese_coffee_with_milk_and_ice.jpg"
          license="CC BY-SA 2.0"
        />

        <GuideFacts
          items={[
            { label: "Signature drinks", value: "Salt, egg, coconut coffee" },
            { label: "Specialty leader", value: "43 Factory (XLIII)" },
            { label: "Local cup", value: "20,000 - 35,000 VND" },
            { label: "Specialty cup", value: "45,000 - 85,000 VND" },
            { label: "Best view", value: "Son Tra Marina" },
            { label: "Coffee areas", value: "Hai Chau, An Thuong, Son Tra" },
          ]}
        />

        <div id="signature" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="signature">Da Nang&apos;s signature coffees, explained</GuideH2>
          <p>
            Vietnamese coffee starts with strong robusta brewed in a small metal drip filter called a phin, poured over
            sweetened condensed milk and ice. That is ca phe sua da, the everyday classic. From there, Da Nang menus
            branch into a few signatures worth trying at least once.
          </p>
          <GuideList
            items={[
              "Salt coffee (ca phe muoi): phin coffee under a lightly salted whipped-cream foam. The salt lifts the sweetness of the condensed milk. It was created in Hue around 2010 and is now everywhere.",
              "Egg coffee (ca phe trung): strong coffee under a whipped, custard-like foam of egg yolk, sugar, and condensed milk. Invented in Hanoi in the 1940s, it drinks more like a dessert.",
              "Coconut coffee (ca phe cot dua): iced coffee topped with a blended coconut-cream slushy. Sweet, cold, and perfect in the heat; the chain Cong Caphe made it famous.",
            ]}
          />
          <GuideImage
            src="https://upload.wikimedia.org/wikipedia/commons/d/dc/Pouring_hot_water_into_filter_for_Vietnamese_Coffee.jpg"
            alt="Hot water poured into a phin filter, the traditional Vietnamese coffee brewing method"
            width={1200}
            height={800}
            credit="HungryHuy"
            creditUrl="https://commons.wikimedia.org/wiki/File:Pouring_hot_water_into_filter_for_Vietnamese_Coffee.jpg"
            license="CC BY 2.0"
          />
        </div>

        <div id="how-we-chose" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="how-we-chose">How we chose these</GuideH2>
          <p>
            We cross-checked the cafes named most often across independent Da Nang coffee guides and Tripadvisor, then
            prioritized coffee quality, a distinct signature drink or roast, and the in-person experience. This is a
            coffee-and-atmosphere list; if you care most about wifi and power for a work session, that is a separate
            list.
          </p>
          <GuideCallout label="A note on ratings and prices">
            Where we cite a rating, it was current when checked in September 2026. For the rest we describe the coffee
            and the vibe rather than invent a star number, since ratings and prices shift. A couple of these cafes have
            more than one address in listings, so confirm the location before you set out.
          </GuideCallout>
        </div>

        <div id="ranked" className="flex flex-col gap-5 scroll-mt-[88px]">
          <GuideH2 id="ranked">The 10 best coffee shops in Da Nang</GuideH2>
          {RANKED.map((cafe, i) => (
            <div key={cafe.name} className="flex flex-col gap-1.5">
              <GuideH3>{`${i + 1}. ${cafe.name}`}</GuideH3>
              <p className="text-[13px] text-[#6B7280]">
                {cafe.area} · {cafe.meta}
              </p>
              <p>{cafe.blurb}</p>
            </div>
          ))}
        </div>

        <div id="compare" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="compare">The coffee shops compared</GuideH2>
          <GuideTable
            columns={["Signature drink", "Vibe", "Price band", "Area"]}
            rows={[
              { label: "43 Factory (XLIII)", values: ["Single-origin pour-over", "Industrial roastery, ponds", "60,000 - 120,000+ VND", "My An"] },
              { label: "Nam House", values: ["Salt coffee, egg coffee", "Vintage time capsule", "~30,000 - 55,000 VND", "Hai Chau"] },
              { label: "Ala Cafe", values: ["Geisha, single origins", "Rooftop garden", "~55,000 - 85,000 VND", "Hai Chau"] },
              { label: "Son Tra Marina", values: ["Salt coffee + a view", "Santorini-style, scenic", "35,000 - 65,000 VND", "Son Tra"] },
              { label: "Cong Caphe", values: ["Coconut-milk coffee", "Retro chain, riverfront", "35,000 - 65,000 VND", "Bach Dang"] },
              { label: "Puna Coffee", values: ["Egg coffee, house blend", "Cozy micro-roaster", "~25,000 - 50,000 VND", "An Thuong"] },
              { label: "Trinh Ca Phe", values: ["Avocado coffee", "Vintage, near Dragon Bridge", "mid-range", "Hai Chau"] },
              { label: "Roost Roasters", values: ["Salt coffee, phin", "Farm-to-cup, big garden", "35,000 - 65,000 VND", "Ngu Hanh Son"] },
              { label: "Lighthouse", values: ["Pour-over, single origin", "Brick roastery, workshops", "55,000 - 85,000 VND", "Son Tra"] },
              { label: "Wonderlust", values: ["Coconut latte, desserts", "Three-floor cafe-bakery", "mid-range", "Hai Chau"] },
            ]}
          />
        </div>

        <div id="more" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="more">More worth a try</GuideH2>
          <GuideList
            items={[
              "For the signature trio in one sitting: a few bright neighborhood cafes near My Khe serve egg, coconut, and salt coffee side by side, ideal for a taste test.",
              "For egg coffee: Cafe Cua Ngo is often singled out as one of the best in the city.",
              "For salt coffee: dedicated salt-coffee specialists on Tran Phu take the Hue original seriously.",
              "For a themed room: Ikigai Garden Cafe brings a Japanese garden and cheese coffee, with multiple outlets.",
              "For a hidden roaster: O2o First Roast is a speakeasy-style spot with rotating single origins.",
            ]}
          />
        </div>

        <div id="bags" className="flex flex-col gap-4 scroll-mt-[88px]">
          <GuideH2 id="bags">Cafe-hopping on an arrival or checkout day?</GuideH2>
          <p>
            Da Nang&apos;s cafes are made for lingering, which is exactly what you cannot do with a suitcase in tow. If
            you land in the morning before check-in, or check out with a late flight, a slow coffee crawl is a great way
            to spend the gap, but only once the bags are off your hands.
          </p>

          <GuideStowCallout
            eyebrow="With time to kill"
            heading="Store the bags, then cafe-hop hands-free until check-in or your flight."
            facts={[
              { label: "In the cafe district", value: "Ngu Hanh Son" },
              { label: "By the day", value: "60,000 VND (up to 24h)" },
              { label: "Open", value: "7am - 10pm daily" },
            ]}
          >
            Stow sits at 55 Ba Bang Nhan in Ngu Hanh Son, near the An Thuong cafe cluster and about ten minutes from the
            airport. Drop your bags from 15,000 VND an hour or 60,000 VND a day, open 7am to 10pm, then work your way
            from a riverfront Cong Caphe to a hillside Son Tra Marina without dragging a wheelie bag between tables. It
            pairs neatly with a{" "}
            <Link href="/guides/da-nang-layover-guide" className="text-[#E8742C] underline underline-offset-2">
              short layover
            </Link>{" "}
            too.
          </GuideStowCallout>
        </div>

        <div id="faq" className="flex flex-col gap-3 scroll-mt-[88px]">
          <GuideH2 id="faq">Questions people ask</GuideH2>
          <GuideFAQ items={FAQ_ITEMS} />
        </div>

        <GuideSources items={SOURCES} />

        <p className="text-[13px] text-[#9CA3AF]">
          This list was compiled from independent coffee guides and review platforms, and last reviewed in September
          2026. Cafe prices, hours, and even addresses change, and a few spots here trade under more than one name, so
          confirm the details before you go.
        </p>
      </GuideLayout>
    </>
  );
}
