"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export function LandingNav() {
  const [time, setTime] = useState("--:--:--");
  const [flows, setFlows] = useState(27);
  const [scrolled, setScrolled] = useState(false);

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

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearInterval(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-12 flex items-center justify-between px-6 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(5,5,5,0.95)"
          : "rgba(5,5,5,0.7)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled
          ? "1px solid rgba(139,26,26,0.2)"
          : "1px solid rgba(255,255,255,0.04)",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.8)" : "none",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="font-gothic text-sm font-black tracking-[0.3em] transition-all duration-300 hover:opacity-80"
        style={{
          fontFamily: "'Cinzel', serif",
          color: "#d4c9b8",
          textShadow: "0 0 20px rgba(212,201,184,0.15)",
        }}
      >
        ARKHRAM
      </Link>

      {/* Center status */}
      <div className="hidden md:flex items-center gap-5 font-mono text-[10px]" style={{ color: "#3a3530" }}>
        <span style={{ color: "#4a4540" }}>SYS/2.1</span>
        <span style={{ color: "#2a2520" }}>│</span>
        <span className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#8b1a1a", boxShadow: "0 0 6px rgba(139,26,26,0.8)" }}
          />
          <span style={{ color: "#8b1a1a" }}>{flows} agents active</span>
        </span>
        <span style={{ color: "#2a2520" }}>│</span>
        <span style={{ color: "#3a3530" }}>{time} UTC-3</span>
      </div>

      {/* Right CTAs */}
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="font-mono text-[10px] transition-colors duration-200"
          style={{ color: "#4a4540", letterSpacing: "0.1em" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#8a8070")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#4a4540")}
        >
          /login
        </Link>
        <Link
          href="/login"
          className="btn-gothic font-mono text-[10px] px-4 py-2"
          style={{ fontFamily: "monospace", letterSpacing: "0.15em" }}
        >
          INIT →
        </Link>
      </div>
    </nav>
  );
}
