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
import { SectionNav } from "@/components/landing/SectionNav";

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#050505", color: "#e8e0d5" }}>
      <LandingNav />
      <SectionNav />

      <div className="pt-12">
        <div id="hero"><HeroSection /></div>
        <SystemTicker />
        <div id="stats"><StatsRow /></div>
        <div id="system"><SystemPanel /></div>
        <div id="agents"><AgentsSection /></div>
        <div id="demo"><TerminalDemo /></div>
        <div id="domains"><DirectorySection /></div>
        <div id="connect"><CtaSection /></div>
        <Footer />
      </div>
    </div>
  );
}
