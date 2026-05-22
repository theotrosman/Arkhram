"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  { delay: 0,    type: "prompt",   text: "arkhram --new-workflow" },
  { delay: 600,  type: "system",   text: "> describí qué querés automatizar:" },
  { delay: 1200, type: "user",     text: "cuando me llega una venta nueva de shopify quiero que me avisen por whatsapp al equipo" },
  { delay: 2400, type: "ai",       text: "¿Qué cuenta de Shopify? (ej: mitienda.myshopify.com)" },
  { delay: 3400, type: "user",     text: "mitienda.myshopify.com" },
  { delay: 4400, type: "ai",       text: "¿A qué número enviamos el WhatsApp?" },
  { delay: 5200, type: "user",     text: "+5491187654321" },
  { delay: 6000, type: "ai",       text: "¿Incluir monto y producto en el mensaje?" },
  { delay: 6800, type: "user",     text: "sí, con el total" },
  { delay: 7800, type: "divider",  text: "" },
  { delay: 7900, type: "summary",  text: "◆ shopify.orders [mitienda] → whatsapp.send → +5491187654321" },
  { delay: 8200, type: "summary",  text: '  msg: "Venta #{order}: {product} — ${total}"' },
  { delay: 8600, type: "confirm",  text: "¿Activamos? [Y/n]" },
  { delay: 9600, type: "user",     text: "y" },
  { delay: 10400, type: "divider", text: "" },
  { delay: 10600, type: "deploy",  text: "Compilando flujo·····" },
  { delay: 11800, type: "deploy",  text: "Conectando shopify·····" },
  { delay: 12600, type: "deploy",  text: "Conectando whatsapp·····" },
  { delay: 13400, type: "done",    text: "FLW-2910 activo — primera ejecución pendiente" },
];

export function TerminalDemo() {
  const [visibleLines, setVisibleLines] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          LINES.forEach((line, i) => {
            setTimeout(() => setVisibleLines(i + 1), line.delay);
          });
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  function lineStyle(type: string) {
    switch (type) {
      case "prompt":  return "text-violet-400";
      case "system":  return "text-zinc-600";
      case "user":    return "text-zinc-300";
      case "ai":      return "text-zinc-400";
      case "summary": return "text-amber-500";
      case "confirm": return "text-zinc-300";
      case "deploy":  return "text-zinc-600";
      case "done":    return "text-green-400";
      case "divider": return "border-t border-zinc-800 my-2";
      default: return "text-zinc-500";
    }
  }

  function linePrefix(type: string) {
    switch (type) {
      case "prompt":  return "❯ ";
      case "user":    return "  você: ";
      case "ai":      return "  arkhram: ";
      case "summary": return "  ";
      case "confirm": return "  arkhram: ";
      case "deploy":  return "  [ sys ] ";
      case "done":    return "  ✓ ";
      default:        return "  ";
    }
  }

  return (
    <section id="demo" className="border-b border-zinc-800 py-0">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">

        {/* Left label */}
        <div className="border-b lg:border-b-0 lg:border-r border-zinc-800 p-8 lg:p-14 flex flex-col gap-6 bg-[#040404]">
          <div className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest">
            / cómo funciona
          </div>
          <div className="space-y-5">
            {[
              ["01", "describís", "En lenguaje natural, sin tecnicismos."],
              ["02", "la IA pregunta", "Una cosa por vez. Sin formularios."],
              ["03", "flujo activo", "Se genera y activa solo. En segundos."],
            ].map(([n, title, desc]) => (
              <div key={n} className="space-y-0.5">
                <p className="font-mono text-[10px] text-zinc-700">{n}</p>
                <p className="font-mono text-sm text-zinc-300">{title}</p>
                <p className="font-mono text-[11px] text-zinc-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal window */}
        <div ref={ref} className="overflow-hidden">
          {/* Terminal chrome */}
          <div className="border-b border-zinc-800 bg-[#060606] px-5 py-2.5 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
            </div>
            <span className="font-mono text-[10px] text-zinc-700 ml-2">arkhram ~ session/demo</span>
            <span className="ml-auto font-mono text-[10px] text-green-700 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
              interactive
            </span>
          </div>

          {/* Terminal body */}
          <div className="bg-[#030303] p-6 min-h-[420px] overflow-hidden scanlines">
            <div className="space-y-1">
              {LINES.slice(0, visibleLines).map((line, i) => (
                <div key={i}>
                  {line.type === "divider" ? (
                    <div className="border-t border-zinc-900 my-3" />
                  ) : (
                    <p className={`font-mono text-[12px] leading-relaxed ${lineStyle(line.type)}`}>
                      <span className="opacity-60">{linePrefix(line.type)}</span>
                      {line.text}
                      {i === visibleLines - 1 && line.type !== "done" && line.type !== "divider" && (
                        <span className="inline-block w-[8px] h-[13px] bg-current ml-0.5 cursor-blink align-middle opacity-80" />
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
