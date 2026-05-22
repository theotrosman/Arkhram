"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 1847, suffix: "", label: "ejecuciones hoy", mono: true },
  { value: 27,   suffix: "",  label: "flows activos ahora", mono: false },
  { value: 4.2,  suffix: "s", label: "tiempo prom / ejecución", mono: false },
  { value: 99.97, suffix: "%", label: "uptime · 30 días", mono: false },
  { value: 12,   suffix: "",  label: "rubros soportados", mono: false },
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
    <section className="border-b border-zinc-800">
      <div className="grid grid-cols-2 md:grid-cols-5">
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`px-7 py-8 ${i < STATS.length - 1 ? "border-b md:border-b-0 md:border-r border-zinc-800" : ""} ${i % 2 === 1 && i < 4 ? "border-l md:border-l-0 border-zinc-800" : ""}`}
          >
            <div className="font-mono font-black text-white" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", letterSpacing: "-0.02em" }}>
              <AnimatedNumber target={stat.value} suffix={stat.suffix} />
            </div>
            <p className="font-mono text-[10px] text-zinc-700 mt-1.5 uppercase tracking-widest leading-tight">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
