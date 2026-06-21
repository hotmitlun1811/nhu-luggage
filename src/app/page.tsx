import PrimaryNav from "@/components/layout/PrimaryNav";
import HeroSplit from "@/components/sections/HeroSplit";
import HowItWorks from "@/components/sections/HowItWorks";
import ServicesSection from "@/components/sections/ServicesSection";
import PricingSection from "@/components/sections/PricingSection";
import WhyStow from "@/components/sections/WhyStow";
import TrustSafety from "@/components/sections/TrustSafety";
import SocialProof from "@/components/sections/SocialProof";
import LocationSection from "@/components/sections/LocationSection";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main>
      <PrimaryNav />
      <HeroSplit />
      <HowItWorks />
      <ServicesSection />
      <PricingSection />
      <WhyStow />
      <TrustSafety />
      <SocialProof />
      <LocationSection />
      <Footer />
    </main>
  );
}
