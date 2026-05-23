"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero",      label: "INIT" },
  { id: "stats",     label: "SPECS" },
  { id: "system",    label: "SYSTEM" },
  { id: "agents",    label: "AGENTS" },
  { id: "demo",      label: "DEMO" },
  { id: "domains",   label: "DOMAINS" },
  { id: "connect",   label: "CONNECT" },
];

export function SectionNav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.35, rootMargin: "-20% 0px -20% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div
      className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3"
    >
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          title={label}
          className="group flex items-center gap-2"
          style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 0" }}
        >
          {/* Label — visible on hover */}
          <span
            className="font-mono text-[8px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{
              color: active === id ? "#8b1a1a" : "#3a3530",
              letterSpacing: "0.2em",
            }}
          >
            {label}
          </span>

          {/* Dot */}
          <div
            style={{
              width: active === id ? 6 : 4,
              height: active === id ? 6 : 4,
              borderRadius: "50%",
              background: active === id ? "#8b1a1a" : "rgba(255,255,255,0.12)",
              boxShadow: active === id ? "0 0 8px rgba(139,26,26,0.8)" : "none",
              transition: "all 0.3s ease",
              flexShrink: 0,
            }}
          />
        </button>
      ))}
    </div>
  );
}
