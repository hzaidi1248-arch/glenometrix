import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { MetricSection } from "@/components/sections/MetricSection";
import { UploadSection } from "@/components/sections/UploadSection";
import { OutputPreview } from "@/components/sections/OutputPreview";
import { EarlyAccessSection } from "@/components/sections/EarlyAccessSection";
import { Footer } from "@/components/sections/Footer";

/**
 * Landing page — pure server component.
 * Composes all sections in order. No logic, no state here.
 */
export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <MetricSection />
      <UploadSection />
      <OutputPreview />
      <EarlyAccessSection />
      <Footer />
    </main>
  );
}
