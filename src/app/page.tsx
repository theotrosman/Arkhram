import { LandingNav } from "@/components/layout/LandingNav";
import { HeroSection } from "@/components/landing/HeroSection";
import { SystemTicker } from "@/components/landing/SystemTicker";
import { StatsRow } from "@/components/landing/StatsRow";
import { Features } from "@/components/landing/Features";
import { SystemPanel } from "@/components/landing/SystemPanel";
import { TerminalDemo } from "@/components/landing/TerminalDemo";
import { DirectorySection } from "@/components/landing/DirectorySection";
import { CtaSection } from "@/components/landing/CtaSection";
import { GothicCursor } from "@/components/landing/GothicCursor";
import { AdUnit } from "@/components/landing/AdUnit";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#050505", color: "#e8e0d5" }}>
      <GothicCursor />
      <LandingNav />

      <div className="pt-12">
        <HeroSection />
        <SystemTicker />
        <StatsRow />

        {/* Strategic ad — between stats and features, non-invasive */}
        <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <AdUnit format="horizontal" className="max-w-4xl mx-auto" />
        </div>

        <Features />
        <SystemPanel />

        {/* Strategic ad — between system panel and terminal demo */}
        <div className="px-6 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <AdUnit format="horizontal" className="max-w-4xl mx-auto" />
        </div>

        <TerminalDemo />
        <DirectorySection />
        <CtaSection />
        <Footer />
      </div>
    </div>
  );
}
