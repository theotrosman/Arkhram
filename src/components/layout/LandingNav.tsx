"use client";

import Link from "next/link";
import { useScramble } from "@/hooks/useScramble";
import { useState, useEffect } from "react";

export function LandingNav() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const name = useScramble("Arkhram", { delay: 0, speed: 60, trigger: mounted });

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${
      scrolled ? "border-b border-zinc-900/80 bg-[#050505]/90 backdrop-blur-md" : "bg-transparent"
    }`}>
      <Link href="/" className="text-sm font-bold text-white tracking-tight font-mono">
        {mounted ? name : "Arkhram"}
      </Link>

      <div className="flex items-center gap-4">
        <Link href="#como-funciona" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors hidden sm:block">
          Cómo funciona
        </Link>
        <Link
          href="/login"
          className="px-4 py-2 rounded-full border border-zinc-800 hover:border-violet-500/50 hover:bg-violet-500/10 text-zinc-400 hover:text-white text-xs font-medium transition-all duration-200"
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
