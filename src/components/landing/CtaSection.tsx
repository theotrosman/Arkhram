"use client";

import { useRouter } from "next/navigation";

const OPERATIONAL_FACTS = [
  ["Tiempo al primer flujo", "< 5 min"],
  ["Conocimiento técnico requerido", "ninguno"],
  ["Código necesario", "0 líneas"],
  ["Precio de entrada", "gratis"],
  ["Setup de infraestructura", "ninguno"],
];

export function CtaSection() {
  const router = useRouter();

  return (
    <section className="border-b border-zinc-800">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr]">

        {/* Left — operational facts, no manifesto */}
        <div className="border-b lg:border-b-0 lg:border-r border-zinc-800 p-8 lg:p-14 bg-[#040404] flex flex-col gap-8">
          <p className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest">/ conectar</p>

          <div className="space-y-0">
            {OPERATIONAL_FACTS.map(([label, val]) => (
              <div
                key={label}
                className="flex justify-between items-baseline py-3 border-b border-zinc-900/60 font-mono text-[11px]"
              >
                <span className="text-zinc-600">{label}</span>
                <span className="text-zinc-200">{val}</span>
              </div>
            ))}
          </div>

          <div className="font-mono text-[10px] text-zinc-800 space-y-1 mt-2">
            <p>Sin tarjeta de crédito.</p>
            <p>Sin reuniones. Sin consultoras.</p>
            <p>Solo describís. El sistema hace el resto.</p>
          </div>
        </div>

        {/* Right — terminal-style CTA */}
        <div className="p-8 lg:p-14 flex flex-col justify-center gap-8">
          <div className="space-y-1">
            <p className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest">status del sistema</p>
            <div className="flex items-center gap-3 pt-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="font-mono text-sm text-green-400">operacional · aceptando nuevas conexiones</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push("/login")}
              className="w-full font-mono text-sm border border-zinc-600 hover:border-violet-500/70 text-zinc-300 hover:text-white py-4 px-5 text-left transition-all duration-150 hover:bg-zinc-900/40 flex items-center justify-between group"
            >
              <span>
                <span className="text-violet-400">❯ </span>
                arkhram --connect --user=nuevo
              </span>
              <span className="text-zinc-600 group-hover:text-zinc-400 transition-colors text-xs">ENTER →</span>
            </button>

            <button
              onClick={() => router.push("/login")}
              className="w-full font-mono text-xs border border-zinc-800 hover:border-zinc-700 text-zinc-600 hover:text-zinc-400 py-3 px-5 text-left transition-all duration-150"
            >
              <span className="text-zinc-800">❯ </span>
              arkhram --connect --user=existente
            </button>
          </div>

          <p className="font-mono text-[10px] text-zinc-800">
            SYS:2.1 / NODE:CENTRAL / UPTIME:99.97%
          </p>
        </div>
      </div>
    </section>
  );
}
