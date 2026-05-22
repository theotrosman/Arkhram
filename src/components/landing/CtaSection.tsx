"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function CtaSection() {
  const [email, setEmail] = useState("");
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/login");
  }

  return (
    <section className="border-b border-zinc-800 py-0">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr]">

        {/* Left — manifest text */}
        <div className="border-b lg:border-b-0 lg:border-r border-zinc-800 p-8 lg:p-14 bg-[#040404]">
          <div className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest mb-8">
            / conectar
          </div>
          <div className="space-y-6 font-mono text-xs text-zinc-600 leading-loose">
            <p>Cada workflow parado es tiempo perdido.</p>
            <p>Cada proceso manual es un error esperando pasar.</p>
            <p>Cada tarea repetitiva es deuda operacional.</p>
            <div className="border-t border-zinc-800 pt-6">
              <p className="text-zinc-500">Arkhram los elimina.</p>
              <p className="text-zinc-500">Sin código. Sin reuniones. Sin consultoras.</p>
            </div>
            <div className="border-t border-zinc-800 pt-6 space-y-1">
              <p className="text-[10px] text-zinc-700">Tiempo para el primer flujo: {"< 5 min"}</p>
              <p className="text-[10px] text-zinc-700">Curva de aprendizaje: ninguna</p>
              <p className="text-[10px] text-zinc-700">Precio de entrada: gratis</p>
            </div>
          </div>
        </div>

        {/* Right — terminal CTA */}
        <div className="p-8 lg:p-14 flex flex-col justify-center">
          <div className="font-mono text-sm text-zinc-500 mb-6">
            <span className="text-violet-400">❯</span>{" "}
            <span className="text-zinc-300">arkhram</span>{" "}
            <span className="text-zinc-700">--init --mode=production</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className={`border transition-colors duration-150 ${focused ? "border-violet-500/60" : "border-zinc-800"}`}>
              <div className="px-4 py-1 border-b border-zinc-900 font-mono text-[9px] text-zinc-700 uppercase tracking-widest">
                EMAIL
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="vos@empresa.com"
                className="w-full bg-transparent font-mono text-sm text-zinc-200 placeholder:text-zinc-700 px-4 py-3.5 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full border border-zinc-700 hover:border-violet-500 font-mono text-xs text-zinc-300 hover:text-white py-3.5 transition-all duration-150 hover:bg-zinc-900 text-left px-4"
            >
              CONECTAR AL SISTEMA →
            </button>
          </form>

          <div className="mt-6 font-mono text-[10px] text-zinc-800 space-y-1">
            <p>Sin tarjeta de crédito requerida</p>
            <p>Cancelá cuando quieras</p>
          </div>
        </div>
      </div>
    </section>
  );
}
