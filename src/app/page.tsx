import { LandingNav } from "@/components/layout/LandingNav";
import { HeroSection } from "@/components/landing/HeroSection";
import { SystemTicker } from "@/components/landing/SystemTicker";
import { StatsRow } from "@/components/landing/StatsRow";
import { SystemPanel } from "@/components/landing/SystemPanel";
import { AgentsSection } from "@/components/landing/AgentsSection";
import { TerminalDemo } from "@/components/landing/TerminalDemo";
import { DirectorySection } from "@/components/landing/DirectorySection";
import { CtaSection } from "@/components/landing/CtaSection";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#050505", color: "#e8e0d5" }}>
      <LandingNav />

      <div className="pt-12">
        <HeroSection />
        <SystemTicker />
        <StatsRow />
        <SystemPanel />
        <AgentsSection />
        <TerminalDemo />
        <DirectorySection />
        <CtaSection />
        <Footer />
      </div>
    </div>
  );
}
