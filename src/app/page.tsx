import { LandingNav } from "@/components/layout/LandingNav";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ChatPreview } from "@/components/landing/ChatPreview";
import { Features } from "@/components/landing/Features";
import { Industries } from "@/components/landing/Industries";
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
        <Industries />
        <Features />

        {/* Final CTA */}
        <section className="py-32 px-4 border-t border-zinc-900/80 relative overflow-hidden">
          {/* Glow behind CTA */}
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-violet-700/15 rounded-full blur-[100px]" />
          </div>

          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.4)]">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
              Empezá a automatizar <br />
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                en minutos
              </span>
            </h2>
            <p className="text-zinc-400 text-sm">
              Sin tarjeta de crédito. Sin configuración técnica. Solo describí qué querés.
            </p>
            <Link
              href="/login"
              className="inline-block px-10 py-4 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all duration-200 hover:shadow-[0_0_50px_rgba(124,58,237,0.5)]"
            >
              Crear cuenta gratis
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-900 px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-lg bg-violet-600 flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-zinc-500 tracking-tight">Arkhram</span>
          </div>
          <p>© {new Date().getFullYear()} Arkhram. Automatizaciones inteligentes.</p>
          <div className="flex gap-4 text-zinc-700">
            <span className="hover:text-zinc-500 cursor-pointer transition-colors">Términos</span>
            <span className="hover:text-zinc-500 cursor-pointer transition-colors">Privacidad</span>
            <Link href="/login" className="hover:text-zinc-500 transition-colors">Ingresar</Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
