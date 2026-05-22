import { LandingNav } from "@/components/layout/LandingNav";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ChatPreview } from "@/components/landing/ChatPreview";
import { Features } from "@/components/landing/Features";
import Link from "next/link";
import { Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100">
      <LandingNav />

      <main className="pt-16">
        <Hero />

        <div id="como-funciona">
          <HowItWorks />
        </div>

        <ChatPreview />
        <Features />

        {/* Final CTA */}
        <section className="py-32 px-4 border-t border-zinc-900">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Empezá a automatizar <br />
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                en minutos
              </span>
            </h2>
            <p className="text-zinc-400">
              Sin tarjeta de crédito. Sin configuración técnica. Solo describí qué querés.
            </p>
            <Link
              href="/login"
              className="inline-block px-10 py-4 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all duration-200 hover:shadow-[0_0_40px_rgba(124,58,237,0.45)]"
            >
              Crear cuenta gratis
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-900 px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-violet-600/80 flex items-center justify-center">
              <Zap className="w-2.5 h-2.5 text-white" />
            </div>
            <span className="font-mono font-bold text-zinc-500">Arkhram</span>
          </div>
          <p>© {new Date().getFullYear()} Arkhram. Automatizaciones inteligentes.</p>
        </footer>
      </main>
    </div>
  );
}
