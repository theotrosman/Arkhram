"use client";

import { useScramble } from "@/hooks/useScramble";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const line1 = useScramble("Automatizá tu negocio", { delay: 200, speed: 45, trigger: mounted });
  const line2 = useScramble("con inteligencia artificial", { delay: 850, speed: 40, trigger: mounted });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-20">
      {/* Background orbs — more vivid */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-[20%] w-[700px] h-[700px] bg-violet-600/30 rounded-full blur-[140px]" />
        <div className="absolute top-[35%] right-[15%] w-[500px] h-[500px] bg-indigo-600/25 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] left-[45%] w-[400px] h-[400px] bg-violet-800/20 rounded-full blur-[100px] -translate-x-1/2" />
        <div className="absolute top-[10%] right-[30%] w-[250px] h-[250px] bg-purple-500/15 rounded-full blur-[80px]" />
      </div>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Pill badge */}
      <div className="mb-8 flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium tracking-wide">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse shrink-0" />
        Automatizaciones con IA · Sin conocimientos técnicos
      </div>

      {/* Main heading — sans-serif for readability */}
      <h1 className="text-center font-bold tracking-tight text-white max-w-5xl">
        <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.0] text-white">
          {mounted ? line1 : "Automatizá tu negocio"}
        </span>
        <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[1.0] mt-3 bg-gradient-to-r from-violet-400 via-violet-300 to-indigo-400 bg-clip-text text-transparent">
          {mounted ? line2 : "con inteligencia artificial"}
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-8 max-w-lg text-center text-zinc-400 text-lg leading-relaxed">
        Describí en lenguaje natural lo que querés automatizar.
        Automatis lo entiende, hace las preguntas necesarias y genera tu flujo en segundos.
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <Link
          href="/login"
          className="px-8 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all duration-200 hover:shadow-[0_0_40px_rgba(124,58,237,0.45)] text-center"
        >
          Empezar gratis
        </Link>
        <Link
          href="/chat"
          className="px-8 py-3.5 rounded-full border border-zinc-700/80 hover:border-violet-500/50 text-zinc-300 hover:text-white font-semibold text-sm transition-all duration-200 text-center bg-zinc-900/40 hover:bg-zinc-900/70 backdrop-blur-sm"
        >
          Ver demo →
        </Link>
      </div>

      {/* Trusted services strip */}
      <div className="mt-20 flex flex-col items-center gap-4">
        <p className="text-xs text-zinc-600 uppercase tracking-[0.2em]">Conecta con tus herramientas</p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-zinc-600 text-sm font-medium">
          {["Gmail", "WhatsApp", "Notion", "Slack", "Google Sheets", "Shopify", "Telegram", "Airtable"].map((s) => (
            <span key={s} className="hover:text-zinc-400 transition-colors cursor-default">{s}</span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-600 animate-bounce">
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
}
