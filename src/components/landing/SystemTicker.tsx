"use client";

import { useEffect, useRef, useState } from "react";

const BASE_EVENTS = [
  "FLW-2910 · shopify.orders → whatsapp.send · 812ms · OK",
  "FLW-2911 · gmail.trigger [INVOICE] → drive.upload · 201",
  "FLW-2912 · RETRY 2/3 · parser_0: missing field · WAIT",
  "FLW-2913 · mercadolibre #MP-89001 → sheets.append · 201",
  "FLW-2914 · schedule.cron triggered · 0 9 * * 1 · FIRE",
  "FLW-2915 · notion.create · 3 pages · 1.4s · OK",
  "FLW-2916 · instagram.dm → classifier_0 · intent:consulta",
  "FLW-2917 · webhook POST /hook/c9d2 · payload:312B · OK",
  "FLW-2918 · gmail.fetch · 8 messages · filter:2 passed",
  "FLW-2919 · typeform → hubspot.contact.create · 200",
  "FLW-2920 · FAILED · max retries · owner:notified · ERR",
  "FLW-2921 · drive.upload · factura-284.pdf · 1.2MB · 201",
  "FLW-2922 · airtable.append · row:1204 · OK",
  "FLW-2923 · telegram.send → @equipo_ventas · delivered",
  "FLW-2924 · web.scrape · reuters.com · 47 articles · DONE",
  "FLW-2925 · pdf.generate · report_2025.pdf · 2.1MB · OK",
  "FLW-2926 · multiagent · 3 sub-agents · coordinated · DONE",
];

export function SystemTicker() {
  const [events, setEvents] = useState(BASE_EVENTS);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const extraEvents = [
      "FLW-2927 · shopify.refund #4512 detected · notifying",
      "FLW-2928 · gmail.trigger · match: URGENT · firing",
      "FLW-2929 · schedule · daily intelligence report queued",
      "FLW-2930 · mercadolibre → sheets · OK · 744ms",
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
    <div
      className="overflow-hidden relative py-2.5"
      style={{
        background: "#030303",
        borderTop: "1px solid rgba(139,26,26,0.1)",
        borderBottom: "1px solid rgba(139,26,26,0.1)",
      }}
    >
      {/* Fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none" style={{
        background: "linear-gradient(to right, #030303, transparent)",
        zIndex: 10,
      }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none" style={{
        background: "linear-gradient(to left, #030303, transparent)",
        zIndex: 10,
      }} />

      <div className="flex animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
        {doubled.map((event, i) => (
          <span key={i} className="inline-flex items-center gap-2 font-mono text-[10px] px-8" style={{ color: "#2a2520" }}>
            <span
              className="w-1 h-1 rounded-full shrink-0"
              style={{
                background: event.includes("FAILED") || event.includes("ERR")
                  ? "#8b1a1a"
                  : event.includes("RETRY") || event.includes("WAIT")
                  ? "#5a4010"
                  : "#1a3a1a",
              }}
            />
            {event}
          </span>
        ))}
      </div>
    </div>
  );
}
