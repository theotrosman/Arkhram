"use client";

import { useEffect, useRef, useState } from "react";

const BASE_EVENTS = [
  "FLW-2910: shopify.orders → whatsapp.send — 812ms",
  "FLW-2911: gmail.trigger [URGENTE] → slack.notify — OK",
  "FLW-2912: RETRY 1/3 — parser_0: campo faltante",
  "FLW-2913: mercadolibre #MP-89001 → sheets.append — 201",
  "FLW-2914: schedule.cron triggered — 0 9 * * 1",
  "FLW-2915: notion.create — 3 páginas — 1.4s",
  "FLW-2916: instagram.dm → classifier_0: intent:consulta",
  "FLW-2917: webhook POST /hook/c9d2 — payload:312B",
  "FLW-2918: gmail.fetch — 8 mensajes — filter:2 passed",
  "FLW-2919: typeform → hubspot.contact.create — 200",
  "FLW-2920: FAILED — max retries — owner:notified",
  "FLW-2921: drive.upload — factura-284.pdf — 1.2MB — 201",
  "FLW-2922: airtable.append — row:1204 — OK",
  "FLW-2923: telegram.send → @equipo_ventas — delivered",
];

export function SystemTicker() {
  const [events, setEvents] = useState(BASE_EVENTS);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Occasionally inject a "new" event to feel live
    const extraEvents = [
      "FLW-2924: shopify.refund #4512 detected — notifying",
      "FLW-2925: gmail.trigger — match: 'URGENTE' — firing",
      "FLW-2926: schedule — daily report queued",
      "FLW-2927: mercadolibre → sheets — OK — 744ms",
    ];
    let i = 0;
    intervalRef.current = setInterval(() => {
      if (i < extraEvents.length) {
        setEvents((prev) => [extraEvents[i], ...prev.slice(0, -1)]);
        i++;
      } else {
        clearInterval(intervalRef.current!);
      }
    }, 8000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const doubled = [...events, ...events];

  return (
    <div className="border-b border-zinc-900/80 bg-[#050505] overflow-hidden relative py-2">
      {/* Fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

      <div className="flex gap-0 animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
        {doubled.map((event, i) => (
          <span key={i} className="inline-flex items-center gap-2 font-mono text-[10px] text-zinc-700 px-6">
            <span className={`w-1 h-1 rounded-full shrink-0 ${
              event.includes("FAILED") ? "bg-red-700" :
              event.includes("RETRY") ? "bg-amber-700" :
              "bg-green-800"
            }`} />
            {event}
          </span>
        ))}
      </div>
    </div>
  );
}
