"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export function LandingNav() {
  const [time, setTime] = useState("--:--:--");
  const [flows, setFlows] = useState(27);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime([d.getHours(), d.getMinutes(), d.getSeconds()].map((n) => String(n).padStart(2, "0")).join(":"));
    };
    tick();
    const id = setInterval(() => {
      tick();
      if (Math.random() > 0.85) setFlows((f) => Math.max(20, f + (Math.random() > 0.5 ? 1 : -1)));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-11 border-b border-zinc-800 bg-[#080808] flex items-center justify-between px-5">
      <Link href="/" className="font-mono text-sm font-black text-white tracking-[0.18em]">
        ARKHRAM
      </Link>
      <div className="hidden md:flex items-center gap-4 font-mono text-[10px] text-zinc-600">
        <span>SYS/2.1</span>
        <span className="text-zinc-800">|</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-green-600">{flows} flows active</span>
        </span>
        <span className="text-zinc-800">|</span>
        <span>{time} UTC-3</span>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/login" className="font-mono text-[11px] text-zinc-600 hover:text-zinc-300 transition-colors">
          /login
        </Link>
        <Link
          href="/login"
          className="font-mono text-[11px] border border-zinc-700 hover:border-violet-500/60 text-zinc-300 hover:text-white px-3 py-1.5 transition-all duration-150"
        >
          init →
        </Link>
      </div>
    </nav>
  );
}
