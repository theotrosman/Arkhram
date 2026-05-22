"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 1847,  suffix: "",  label: "executions today",       accent: false },
  { value: 27,    suffix: "",  label: "agents active now",      accent: true  },
  { value: 4.2,   suffix: "s", label: "avg execution time",     accent: false },
  { value: 99.97, suffix: "%", label: "uptime · 30 days",       accent: false },
  { value: 40,    suffix: "+", label: "connected systems",      accent: false },
];

function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        const isDecimal = target % 1 !== 0;
        const steps = 60;
        let i = 0;
        const interval = setInterval(() => {
          i++;
          const progress = i / steps;
          const eased = 1 - Math.pow(1 - progress, 3);
          setVal(parseFloat((eased * target).toFixed(isDecimal ? 2 : 0)));
          if (i >= steps) clearInterval(interval);
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  const display = target % 1 !== 0 ? val.toFixed(1) : val.toLocaleString("es-AR");

  return <span ref={ref}>{display}{suffix}</span>;
}

export function StatsRow() {
  return (
    <section style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="grid grid-cols-2 md:grid-cols-5">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className="px-8 py-10 relative group"
            style={{
              borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none",
              background: "transparent",
              transition: "background 0.4s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "rgba(139,26,26,0.03)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.background = "transparent";
            }}
          >
            {/* Accent line top */}
            {stat.accent && (
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(139,26,26,0.5), transparent)" }}
              />
            )}

            <div
              className="font-mono font-black"
              style={{
                fontSize: "clamp(28px, 3.5vw, 44px)",
                letterSpacing: "-0.02em",
                color: stat.accent ? "#8b1a1a" : "#d4c9b8",
                textShadow: stat.accent ? "0 0 20px rgba(139,26,26,0.3)" : "none",
              }}
            >
              <AnimatedNumber target={stat.value} suffix={stat.suffix} />
            </div>
            <p
              className="font-mono text-[10px] mt-2 uppercase tracking-widest leading-tight"
              style={{ color: "#3a3530" }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
