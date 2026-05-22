"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const OPERATIONAL_FACTS = [
  ["Time to first flow",        "< 5 min"],
  ["Technical knowledge",       "none required"],
  ["Lines of code",             "0"],
  ["Infrastructure setup",      "none"],
  ["Entry price",               "free"],
];

export function CtaSection() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);

    const tick = () => {
      const d = new Date();
      setTime([d.getHours(), d.getMinutes(), d.getSeconds()].map((n) => String(n).padStart(2, "0")).join(":"));
    };
    tick();
    const id = setInterval(tick, 1000);

    return () => {
      obs.disconnect();
      clearInterval(id);
    };
  }, []);

  return (
    <section
      ref={ref}
      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Left — operational facts */}
        <div
          className="p-10 lg:p-16 flex flex-col gap-8"
          style={{
            borderRight: "1px solid rgba(255,255,255,0.04)",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
            background: "rgba(3,2,2,0.5)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "#8b1a1a" }}>
            / CONNECT
          </p>

          <div>
            {OPERATIONAL_FACTS.map(([label, val]) => (
              <div
                key={label}
                className="flex justify-between items-baseline py-3.5 font-mono text-[11px]"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
              >
                <span style={{ color: "#3a3530" }}>{label}</span>
                <span style={{ color: "#8a7060" }}>{val}</span>
              </div>
            ))}
          </div>

          <div className="font-mono text-[10px] space-y-1.5" style={{ color: "#1a1a1a" }}>
            <p>No credit card. No meetings. No consultants.</p>
            <p>Describe. ARKHRAM executes.</p>
          </div>
        </div>

        {/* Right — terminal CTA */}
        <div
          className="p-10 lg:p-16 flex flex-col justify-center gap-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}
        >
          {/* System status */}
          <div className="space-y-2">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "#2a2520" }}>
              SYSTEM STATUS
            </p>
            <div className="flex items-center gap-3 pt-1">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#8b1a1a", boxShadow: "0 0 8px rgba(139,26,26,0.8)" }}
              />
              <span className="font-mono text-sm" style={{ color: "#8b1a1a" }}>
                OPERATIONAL · ACCEPTING CONNECTIONS
              </span>
            </div>
            <p className="font-mono text-[10px]" style={{ color: "#2a2520" }}>
              {time} UTC-3 · 27 agents active
            </p>
          </div>

          {/* CTA buttons */}
          <div className="space-y-3">
            <button
              onClick={() => router.push("/login")}
              className="btn-gothic w-full py-4 px-6 text-left flex items-center justify-between group"
              style={{ fontFamily: "monospace", fontSize: "12px", letterSpacing: "0.15em" }}
            >
              <span>
                <span style={{ color: "#8b1a1a" }}>❯ </span>
                arkhram --connect --user=new
              </span>
              <span
                className="transition-colors duration-200"
                style={{ color: "#3a2a2a", fontSize: "10px" }}
              >
                ENTER →
              </span>
            </button>

            <button
              onClick={() => router.push("/login")}
              className="btn-ghost w-full py-3 px-6 text-left font-mono text-[11px]"
              style={{ letterSpacing: "0.1em" }}
            >
              <span style={{ color: "#2a2020" }}>❯ </span>
              arkhram --connect --user=existing
            </button>
          </div>

          <p className="font-mono text-[9px]" style={{ color: "#1a1a1a" }}>
            SYS:2.1 / NODE:CENTRAL / UPTIME:99.97% / BUILD:STABLE
          </p>
        </div>
      </div>
    </section>
  );
}
