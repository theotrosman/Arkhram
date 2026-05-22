"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  { delay: 0,     type: "prompt",  text: "arkhram --new" },
  { delay: 500,   type: "system",  text: "sesión iniciada. describí tu automatización." },
  { delay: 1100,  type: "blank",   text: "" },
  { delay: 1200,  type: "user",    text: "cuando shopify registra una venta nueva quiero aviso por whatsapp al equipo" },
  { delay: 2600,  type: "ai",      text: "¿Qué tienda de Shopify?" },
  { delay: 3400,  type: "user",    text: "mitienda.myshopify.com" },
  { delay: 4300,  type: "ai",      text: "¿A qué número de WhatsApp va el aviso?" },
  { delay: 5000,  type: "user",    text: "+5491187654321" },
  { delay: 5900,  type: "ai",      text: "¿Incluir monto y producto en el mensaje?" },
  { delay: 6600,  type: "user",    text: "sí, con el total" },
  { delay: 7400,  type: "blank",   text: "" },
  { delay: 7600,  type: "schema",  text: "trigger:  shopify.orders [mitienda.myshopify.com]" },
  { delay: 7900,  type: "schema",  text: "action:   whatsapp.send → +5491187654321" },
  { delay: 8200,  type: "schema",  text: "msg:      \"Venta #{id}: {producto} — ${total}\"" },
  { delay: 8700,  type: "blank",   text: "" },
  { delay: 8900,  type: "confirm", text: "¿Activamos?" },
  { delay: 9800,  type: "user",    text: "sí" },
  { delay: 10500, type: "blank",   text: "" },
  { delay: 10700, type: "deploy",  text: "[    ] compilando flujo" },
  { delay: 11200, type: "deploy",  text: "[██  ] conectando shopify" },
  { delay: 11700, type: "deploy",  text: "[████] conectando whatsapp" },
  { delay: 12200, type: "done",    text: "✓  FLW-2910 activo — listo para la primera venta" },
];

export function TerminalDemo() {
  const [visibleCount, setVisibleCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          LINES.forEach((line, i) => {
            setTimeout(() => setVisibleCount(i + 1), line.delay);
          });
        }
      },
      { threshold: 0.25 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  function lineClass(type: string) {
    switch (type) {
      case "prompt":  return "text-violet-400";
      case "system":  return "text-zinc-600 italic";
      case "user":    return "text-zinc-200";
      case "ai":      return "text-zinc-400";
      case "schema":  return "text-amber-500/80";
      case "confirm": return "text-zinc-300";
      case "deploy":  return "text-zinc-600";
      case "done":    return "text-green-400 font-medium";
      default:        return "";
    }
  }

  function linePrefix(type: string) {
    switch (type) {
      case "prompt":  return "❯ ";
      case "user":    return "  $ ";
      case "ai":      return "  → ";
      case "schema":  return "    ";
      case "confirm": return "  → ";
      case "deploy":  return "    ";
      case "done":    return "    ";
      default:        return "";
    }
  }

  return (
    <section id="demo" className="border-b border-zinc-800">
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr]">

        {/* Label column */}
        <div className="border-b lg:border-b-0 lg:border-r border-zinc-800 p-8 lg:p-12 bg-[#040404] flex flex-col gap-8">
          <p className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest">/ demo</p>

          <div className="space-y-6">
            {[
              ["01 / describís", "Sin tecnicismos. Sin formularios. En castellano."],
              ["02 / arkhram pregunta", "Una cosa por vez. Directo al punto."],
              ["03 / flujo en producción", "Generado y activado en segundos."],
            ].map(([title, desc]) => (
              <div key={title} className="space-y-1">
                <p className="font-mono text-[11px] text-zinc-400">{title}</p>
                <p className="font-mono text-[10px] text-zinc-700 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-zinc-900">
            <p className="font-mono text-[10px] text-zinc-800">tiempo real: ~12s</p>
            <p className="font-mono text-[10px] text-zinc-800">sin código requerido</p>
          </div>
        </div>

        {/* Terminal */}
        <div ref={ref}>
          <div className="border-b border-zinc-800 bg-[#060606] px-5 py-2.5 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-zinc-800" />
              <div className="w-2 h-2 rounded-full bg-zinc-800" />
              <div className="w-2 h-2 rounded-full bg-zinc-800" />
            </div>
            <span className="ml-2 font-mono text-[10px] text-zinc-700">arkhram / nueva automatización</span>
            <span className="ml-auto font-mono text-[10px] text-green-700 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
              live session
            </span>
          </div>

          <div className="bg-[#030303] p-6 min-h-[400px] scanlines">
            <div className="space-y-[3px]">
              {LINES.slice(0, visibleCount).map((line, i) => (
                <div key={i}>
                  {line.type === "blank" ? (
                    <div className="h-3" />
                  ) : (
                    <p className={`font-mono text-[12px] leading-relaxed ${lineClass(line.type)}`}>
                      <span className="opacity-50">{linePrefix(line.type)}</span>
                      {line.text}
                      {i === visibleCount - 1 && line.type !== "done" && line.type !== "blank" && (
                        <span className="inline-block w-[8px] h-[12px] bg-current ml-0.5 cursor-blink align-middle opacity-70" />
                      )}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
