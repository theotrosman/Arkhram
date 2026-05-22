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
import Link from "next/link";

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

        {/* Footer */}
        <footer
          className="px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{
            borderTop: "1px solid rgba(139,26,26,0.1)",
            background: "#030303",
          }}
        >
          <div className="flex flex-col gap-1">
            <span
              className="font-mono text-[10px] tracking-[0.3em]"
              style={{ color: "#2a2520" }}
            >
              ARKHRAM / SYS:2.1 / BUILD:STABLE
            </span>
            <span className="font-mono text-[9px]" style={{ color: "#1a1a1a" }}>
              arkhram.org
            </span>
          </div>

          <div className="flex gap-6">
            {["terms", "privacy", "docs"].map((item) => (
              <span
                key={item}
                className="font-mono text-[10px] transition-colors duration-200"
                style={{ color: "#2a2520" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLSpanElement).style.color = "#5a5050")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLSpanElement).style.color = "#2a2520")}
              >
                /{item}
              </span>
            ))}
            <Link
              href="/login"
              className="font-mono text-[10px] transition-colors duration-200"
              style={{ color: "#2a2520" }}
            >
              /login
            </Link>
          </div>

          <span className="font-mono text-[10px]" style={{ color: "#1a1a1a" }}>
            © {new Date().getFullYear()} ARKHRAM
          </span>
        </footer>
      </div>
    </div>
  );
}
