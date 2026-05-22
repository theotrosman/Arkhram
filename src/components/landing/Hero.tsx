"use client";

import { useScramble } from "@/hooks/useScramble";
import { useEffect, useState } from "react";
import Link from "next/link";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const line1 = useScramble("Automatizá tu negocio", { delay: 200, speed: 50, trigger: mounted });
  const line2 = useScramble("con inteligencia artificial", { delay: 900, speed: 45, trigger: mounted });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Background orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 left-1/2 w-[300px] h-[300px] bg-violet-800/10 rounded-full blur-[80px] -translate-x-1/2" />
      </div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />

      {/* Pill badge */}
      <div className="mb-8 flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-xs font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
        Automatizaciones con IA · Sin conocimientos técnicos
      </div>

      {/* Main heading */}
      <h1 className="text-center font-bold tracking-tight text-white">
        <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] font-mono">
          {mounted ? line1 : "Automatizá tu negocio"}
        </span>
        <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] mt-2 bg-gradient-to-r from-violet-400 via-violet-300 to-indigo-400 bg-clip-text text-transparent font-mono">
          {mounted ? line2 : "con inteligencia artificial"}
        </span>
      </h1>

      {/* Subtitle */}
      <p className="mt-8 max-w-xl text-center text-zinc-400 text-lg leading-relaxed">
        Describí en lenguaje natural lo que querés automatizar.
        Arkhram lo entiende, hace las preguntas necesarias y genera tu flujo en segundos.
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <Link
          href="/login"
          className="px-8 py-3.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-all duration-200 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] text-center"
        >
          Empezar gratis
        </Link>
        <Link
          href="/chat"
          className="px-8 py-3.5 rounded-full border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold text-sm transition-all duration-200 text-center"
        >
          Ver demo →
        </Link>
      </div>

      {/* Trusted services strip */}
      <div className="mt-20 flex flex-col items-center gap-4">
        <p className="text-xs text-zinc-600 uppercase tracking-widest">Conecta con tus herramientas</p>
        <div className="flex flex-wrap justify-center gap-6 text-zinc-600 text-sm font-medium">
          {["Gmail", "WhatsApp", "Notion", "Slack", "Google Sheets", "Shopify", "Telegram", "Airtable"].map((s) => (
            <span key={s} className="hover:text-zinc-400 transition-colors cursor-default">{s}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
