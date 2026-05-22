"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
import { useScramble } from "@/hooks/useScramble";
import { useState, useEffect } from "react";

export function LandingNav() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const name = useScramble("Arkhram", { delay: 0, speed: 60, trigger: mounted });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-zinc-900/80 bg-zinc-950/80 backdrop-blur-md">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-md bg-violet-600 flex items-center justify-center">
          <Zap className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-sm font-bold text-white font-mono tracking-tight">
          {mounted ? name : "Arkhram"}
        </span>
      </Link>

      <div className="flex items-center gap-4">
        <Link href="#como-funciona" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors hidden sm:block">
          Cómo funciona
        </Link>
        <Link
          href="/login"
          className="px-4 py-2 rounded-full border border-zinc-700 hover:border-violet-500/60 hover:bg-violet-500/10 text-zinc-300 hover:text-white text-xs font-medium transition-all duration-200"
        >
          Entrar
        </Link>
        <Link
          href="/login"
          className="px-4 py-2 rounded-full bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-all duration-200 hover:shadow-[0_0_20px_rgba(124,58,237,0.35)]"
        >
          Empezar gratis
        </Link>
      </div>
    </nav>
  );
}
