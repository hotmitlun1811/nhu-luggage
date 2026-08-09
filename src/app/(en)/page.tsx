import PrimaryNav from "@/components/layout/PrimaryNav";
import HeroSplit from "@/components/sections/HeroSplit";
import HowItWorks from "@/components/sections/HowItWorks";
import ServicesSection from "@/components/sections/ServicesSection";
import PricingSection from "@/components/sections/PricingSection";
import ForExpats from "@/components/sections/ForExpats";
import WhyStow from "@/components/sections/WhyStow";
import FAQSection from "@/components/sections/FAQSection";
import TrustSafety from "@/components/sections/TrustSafety";
import SocialProof from "@/components/sections/SocialProof";
import LocationSection from "@/components/sections/LocationSection";
import Footer from "@/components/layout/Footer";
import { faqPageJsonLd } from "@/lib/structured-data";
import { getDictionary } from "@/content/dictionary";

export default async function Home() {
  const dict = await getDictionary("en");

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(dict)) }}
      />
      <PrimaryNav dict={dict.nav} locale="en" currentPath="/" />
      <HeroSplit dict={dict.hero} bookingDict={dict.booking} locale="en" />
      <HowItWorks dict={dict.howItWorks} />
      <ServicesSection dict={dict.services} />
      <PricingSection dict={dict.pricing} />
      <ForExpats dict={dict.expats} />
      <WhyStow dict={dict.why} />
      <FAQSection dict={dict.faq} />
      <TrustSafety dict={dict.trust} />
      <SocialProof dict={dict.social} />
      <LocationSection dict={dict.location} />
      <Footer dict={dict.footer} locale="en" currentPath="/" />
    </main>
  );
}
