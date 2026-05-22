"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type LogStatus = "OK" | "200" | "201" | "SENT" | "FIRE" | "PROC" | "WAIT" | "RETRY" | "500" | "ERR" | "FAILED" | "DONE";

interface LogEntry {
  time: string;
  flow: string;
  node: string;
  msg: string;
  status: LogStatus;
  ms?: number | null;
}

const LOGS: LogEntry[] = [
  { time: "03:14:22.140", flow: "FLW-2847", node: "gmail.trigger",   msg: '"URGENTE" match found',           status: "OK",    ms: null },
  { time: "03:14:22.143", flow: "FLW-2847", node: "router_0",        msg: "evaluating 3 conditions",        status: "PROC",  ms: null },
  { time: "03:14:22.891", flow: "FLW-2847", node: "whatsapp.send",   msg: "queued → +54911···4321",         status: "SENT",  ms: 748  },
  { time: "03:14:23.012", flow: "FLW-2847", node: "FLOW",            msg: "completed — 872ms",              status: "200",   ms: 872  },
  { time: "03:14:31.004", flow: "FLW-2901", node: "shopify.orders",  msg: "new order #4421 — $12.900",      status: "OK",    ms: null },
  { time: "03:14:31.008", flow: "FLW-2901", node: "sheets.append",   msg: "writing to row 848",             status: "PROC",  ms: null },
  { time: "03:14:31.892", flow: "FLW-2901", node: "sheets.append",   msg: "row appended — id:a2f9",        status: "201",   ms: 884  },
  { time: "03:14:32.010", flow: "FLW-2901", node: "slack.notify",    msg: "posting to #ventas",             status: "PROC",  ms: null },
  { time: "03:14:32.680", flow: "FLW-2901", node: "slack.notify",    msg: "delivered — ts:1748013272",     status: "200",   ms: 670  },
  { time: "03:14:45.301", flow: "FLW-2903", node: "schedule.cron",   msg: "triggered — 0 3 * * *",          status: "FIRE",  ms: null },
  { time: "03:14:45.305", flow: "FLW-2903", node: "gmail.fetch",     msg: "fetching unread (max:50)",       status: "PROC",  ms: null },
  { time: "03:14:46.201", flow: "FLW-2903", node: "gmail.fetch",     msg: "returned 12 messages",           status: "200",   ms: 896  },
  { time: "03:14:46.211", flow: "FLW-2903", node: "filter_0",        msg: "passed:3 / dropped:9",           status: "OK",    ms: null },
  { time: "03:14:47.441", flow: "FLW-2903", node: "notion.create",   msg: "created 3 pages — a2f,b3c,d4e", status: "201",   ms: 1230 },
  { time: "03:15:01.004", flow: "FLW-2904", node: "webhook.in",      msg: "POST /hook/a8f2b1 — 200B",       status: "OK",    ms: null },
  { time: "03:15:01.010", flow: "FLW-2904", node: "parser_0",        msg: "ERR: missing field 'email'",     status: "500",   ms: null },
  { time: "03:15:01.011", flow: "FLW-2904", node: "RETRY",           msg: "attempt 1/3 — backoff 5s",       status: "WAIT",  ms: null },
  { time: "03:15:06.014", flow: "FLW-2904", node: "parser_0",        msg: "ERR: missing field 'email'",     status: "500",   ms: null },
  { time: "03:15:06.015", flow: "FLW-2904", node: "RETRY",           msg: "attempt 2/3 — backoff 10s",      status: "WAIT",  ms: null },
  { time: "03:15:16.020", flow: "FLW-2904", node: "parser_0",        msg: "ERR: missing field 'email'",     status: "500",   ms: null },
  { time: "03:15:16.021", flow: "FLW-2904", node: "FAILED",          msg: "max retries — owner notified",   status: "ERR",   ms: null },
  { time: "03:15:22.104", flow: "FLW-2905", node: "mercadolibre",    msg: "sale #MP-88923 — $45.000",       status: "OK",    ms: null },
  { time: "03:15:22.904", flow: "FLW-2905", node: "slack.notify",    msg: "delivered to #ventas-ml",        status: "200",   ms: 800  },
  { time: "03:15:30.001", flow: "FLW-2906", node: "instagram.dm",    msg: "new DM — @usuario_ba",           status: "OK",    ms: null },
  { time: "03:15:30.005", flow: "FLW-2906", node: "classifier_0",    msg: "intent: consulta_precio",        status: "PROC",  ms: null },
  { time: "03:15:30.890", flow: "FLW-2906", node: "whatsapp.send",   msg: "auto-reply sent",                status: "SENT",  ms: 885  },
  { time: "03:15:31.010", flow: "FLW-2906", node: "FLOW",            msg: "completed — 1009ms",             status: "200",   ms: 1009 },
  { time: "03:15:44.002", flow: "FLW-2907", node: "gmail.trigger",   msg: '"Factura" match — re: #4901',    status: "OK",    ms: null },
  { time: "03:15:44.420", flow: "FLW-2907", node: "drive.upload",    msg: "uploading attachment 284KB",     status: "PROC",  ms: null },
  { time: "03:15:45.001", flow: "FLW-2907", node: "drive.upload",    msg: "stored — /facturas/2025/may/",   status: "201",   ms: 581  },
  { time: "03:15:45.010", flow: "FLW-2907", node: "notion.append",   msg: "logging to DB facturas",         status: "PROC",  ms: null },
  { time: "03:15:45.620", flow: "FLW-2907", node: "notion.append",   msg: "row created — id:c9d1",         status: "201",   ms: 610  },
  { time: "03:15:45.630", flow: "FLW-2907", node: "FLOW",            msg: "completed — 1628ms",             status: "200",   ms: 1628 },
];

function statusColor(s: LogStatus): string {
  if (["OK", "200", "201", "SENT", "FIRE", "DONE"].includes(s)) return "text-green-500";
  if (["500", "ERR", "FAILED"].includes(s)) return "text-red-500";
  if (["PROC", "WAIT", "RETRY"].includes(s)) return "text-amber-500";
  return "text-zinc-500";
}

export function HeroSection() {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let n = 0;
    const target = 1847;
    const step = Math.ceil(target / 80);
    const id = setInterval(() => {
      n = Math.min(n + step + Math.floor(Math.random() * step), target);
      setCount(n);
      if (n >= target) clearInterval(id);
    }, 15);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] min-h-[calc(100vh-44px)] border-b border-zinc-800">
      {/* ── LEFT PANEL ── */}
      <div className="border-b lg:border-b-0 lg:border-r border-zinc-800 flex flex-col justify-between p-8 lg:p-14 relative">
        <div>
          {/* System label */}
          <p className="font-mono text-[10px] text-zinc-700 tracking-widest mb-10 uppercase">
            Arkhram.org / automatización operacional / v2.1.0
          </p>

          {/* Primary heading */}
          <h1
            className="font-mono font-black text-white leading-none tracking-tighter select-none"
            style={{ fontSize: "clamp(56px, 9vw, 148px)" }}
          >
            ARKHRAM
          </h1>

          {/* Taglines */}
          <div className="mt-7 font-mono">
            <p className="text-sm">
              <span className="text-zinc-500">Describís.</span>{" "}
              <span className="text-zinc-500">Arkhram estructura.</span>{" "}
              <span className="text-zinc-300">El flujo corre.</span>
            </p>
            <p className="text-[11px] text-zinc-700 mt-1.5 tracking-wide">
              sin código · sin builders · sin configuración
            </p>
          </div>

          {/* Live counter */}
          <div className="mt-12 border-t border-zinc-800 pt-6">
            <div className="font-mono font-black text-white" style={{ fontSize: "clamp(36px, 5vw, 60px)" }}>
              {mounted ? count.toLocaleString("es-AR") : "—"}
            </div>
            <p className="font-mono text-[10px] text-zinc-700 mt-1 tracking-widest uppercase">
              ejecuciones registradas
            </p>
          </div>
        </div>

        {/* CTA block */}
        <div className="mt-10">
          <div className="font-mono text-sm text-zinc-500 mb-5">
            <span className="text-violet-400">❯</span>{" "}
            <span className="text-zinc-300">arkhram</span>{" "}
            <span className="text-zinc-600">--init</span>
            <span className="inline-block w-[9px] h-[15px] bg-violet-400 ml-1.5 cursor-blink align-middle" />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-start">
            <Link
              href="/login"
              className="font-mono text-xs border border-zinc-600 hover:border-violet-500 text-zinc-300 hover:text-white px-5 py-3 transition-all duration-150 hover:bg-zinc-900"
            >
              CONECTAR AL SISTEMA →
            </Link>
            <Link
              href="#demo"
              className="font-mono text-xs text-zinc-600 hover:text-zinc-400 py-3 transition-colors"
            >
              ver demo ↓
            </Link>
          </div>
          <p className="mt-4 font-mono text-[10px] text-zinc-800 uppercase tracking-wider">
            Sin tarjeta · Sin configuración técnica
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL: LOG FEED ── */}
      <div className="overflow-hidden relative bg-[#030303] flex flex-col min-h-[60vh] lg:min-h-0">
        {/* Log header */}
        <div className="border-b border-zinc-800 px-5 py-2.5 font-mono text-[10px] text-zinc-600 flex justify-between items-center shrink-0 bg-[#060606]">
          <span className="tracking-widest uppercase">Execution Log</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green-700">streaming</span>
          </span>
        </div>

        {/* Column headers */}
        <div className="px-5 py-1.5 border-b border-zinc-900 font-mono text-[9px] text-zinc-800 flex gap-4 shrink-0 uppercase tracking-wider">
          <span className="w-28 shrink-0">time</span>
          <span className="w-20 shrink-0">flow</span>
          <span className="w-28 shrink-0">node</span>
          <span className="flex-1">event</span>
          <span className="w-10 shrink-0 text-right">st</span>
          <span className="w-12 shrink-0 text-right">ms</span>
        </div>

        {/* Scrolling log */}
        <div className="overflow-hidden flex-1 relative">
          {/* Top fade */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#030303] to-transparent z-10 pointer-events-none" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#030303] to-transparent z-10 pointer-events-none" />

          <div className="animate-log-scroll">
            {[...LOGS, ...LOGS].map((entry, i) => (
              <div
                key={i}
                className="flex gap-4 px-5 py-[5px] font-mono text-[11px] border-b border-zinc-900/40 hover:bg-zinc-900/20 transition-colors"
              >
                <span className="w-28 shrink-0 text-zinc-700">{entry.time}</span>
                <span className="w-20 shrink-0 text-zinc-600">{entry.flow}</span>
                <span className={`w-28 shrink-0 ${
                  entry.node === "FAILED" ? "text-red-600" :
                  entry.node === "FLOW" ? "text-violet-500" :
                  entry.node === "RETRY" ? "text-amber-600" :
                  "text-zinc-400"
                }`}>{entry.node}</span>
                <span className="flex-1 text-zinc-500 truncate">{entry.msg}</span>
                <span className={`w-10 shrink-0 text-right ${statusColor(entry.status)}`}>
                  {entry.status}
                </span>
                <span className="w-12 shrink-0 text-right text-zinc-700">
                  {entry.ms ? `${entry.ms}` : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
