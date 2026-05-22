"use client";

const SPECS = [
  { value: "Llama 3.3", sub: "70B", label: "modelo de inteligencia",  accent: false },
  { value: "n8n",        sub: "self-hosted", label: "runtime de ejecución", accent: true },
  { value: "40+",        sub: "",    label: "conectores nativos",     accent: false },
  { value: "18",         sub: "",    label: "tipos de trigger",       accent: false },
  { value: "Groq",       sub: "API", label: "inferencia ultrarrápida",accent: false },
];

export function StatsRow() {
  return (
    <section style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <div className="grid grid-cols-2 md:grid-cols-5">
        {SPECS.map((spec, i) => (
          <div
            key={spec.label}
            className="px-8 py-10 relative group"
            style={{
              borderRight: i < SPECS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
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
            {spec.accent && (
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(139,26,26,0.5), transparent)",
                }}
              />
            )}

            {/* Value */}
            <div className="flex items-baseline gap-1.5">
              <span
                className="font-mono font-black"
                style={{
                  fontSize: "clamp(22px, 2.5vw, 34px)",
                  letterSpacing: "-0.02em",
                  color: spec.accent ? "#8b1a1a" : "#d4c9b8",
                  textShadow: spec.accent ? "0 0 20px rgba(139,26,26,0.3)" : "none",
                }}
              >
                {spec.value}
              </span>
              {spec.sub && (
                <span
                  className="font-mono text-[10px]"
                  style={{ color: spec.accent ? "#5a1a1a" : "#4a4540" }}
                >
                  {spec.sub}
                </span>
              )}
            </div>

            <p
              className="font-mono text-[10px] mt-2 uppercase tracking-widest leading-tight"
              style={{ color: "#3a3530" }}
            >
              {spec.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
