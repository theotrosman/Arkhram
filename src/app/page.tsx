import { LandingNav } from "@/components/layout/LandingNav";
import { HeroSection } from "@/components/landing/HeroSection";
import { StatsRow } from "@/components/landing/StatsRow";
import { SystemPanel } from "@/components/landing/SystemPanel";
import { TerminalDemo } from "@/components/landing/TerminalDemo";
import { DirectorySection } from "@/components/landing/DirectorySection";
import { CtaSection } from "@/components/landing/CtaSection";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-zinc-100">
      <LandingNav />

      {/* Offset for fixed nav */}
      <div className="pt-11">
        <HeroSection />
        <StatsRow />
        <SystemPanel />
        <TerminalDemo />
        <DirectorySection />
        <CtaSection />

        {/* Footer */}
        <footer className="px-5 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[10px] text-zinc-800 border-t border-zinc-900">
          <span className="tracking-widest">ARKHRAM / SYS:2.1 / BUILD:STABLE</span>
          <div className="flex gap-5">
            <span className="hover:text-zinc-600 cursor-pointer transition-colors">términos</span>
            <span className="hover:text-zinc-600 cursor-pointer transition-colors">privacidad</span>
            <Link href="/login" className="hover:text-zinc-600 transition-colors">/login</Link>
          </div>
          <span>© {new Date().getFullYear()} Arkhram</span>
        </footer>
      </div>
    </div>
  );
}
