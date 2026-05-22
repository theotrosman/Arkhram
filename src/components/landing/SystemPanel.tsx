const DEFINITIONS = [
  {
    term: "Compilador de flujos.",
    def: "Describís en lenguaje natural. Arkhram extrae la estructura, genera el flujo, lo activa.",
  },
  {
    term: "Capa de orquestación.",
    def: "El input es lenguaje. El output es infraestructura corriendo en producción.",
  },
  {
    term: "Middleware entre intención y ejecución.",
    def: "Conecta lo que querés que pase con el sistema que lo hace pasar. Sin intermediarios.",
  },
];

const TECH = [
  ["Runtime", "n8n self-hosted"],
  ["LLM", "Llama 3.3 / 70B"],
  ["Latencia prom", "4.2s"],
  ["Triggers", "18 tipos"],
  ["Acciones", "40+ conectores"],
  ["Auth", "Supabase / OAuth2"],
];

const INTEGRATIONS = [
  "gmail", "shopify", "whatsapp", "slack", "notion",
  "google_sheets", "mercadolibre", "instagram", "airtable",
  "telegram", "hubspot", "trello", "typeform", "webhook",
  "outlook", "drive", "calendar", "asana",
];

export function SystemPanel() {
  return (
    <section className="border-b border-zinc-800">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr]">

        {/* ── LEFT ── */}
        <div className="border-b lg:border-b-0 lg:border-r border-zinc-800 p-8 lg:p-14 flex flex-col gap-10">
          <p className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest">/ qué es</p>

          <div className="space-y-7">
            {DEFINITIONS.map(({ term, def }) => (
              <div key={term} className="space-y-1.5">
                <p className="font-mono text-sm text-white">{term}</p>
                <p className="font-mono text-[12px] text-zinc-600 leading-relaxed">{def}</p>
              </div>
            ))}
          </div>

          {/* Tech spec table */}
          <div className="border-t border-zinc-900 pt-8">
            <p className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest mb-4">especificaciones técnicas</p>
            <div className="space-y-0">
              {TECH.map(([label, val]) => (
                <div key={label} className="flex justify-between items-baseline py-2 border-b border-zinc-900/60 font-mono text-[11px]">
                  <span className="text-zinc-600">{label}</span>
                  <span className="text-zinc-300">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="p-8 lg:p-14 flex flex-col gap-10">
          <p className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest">/ arquitectura</p>

          {/* ASCII diagram */}
          <pre className="font-mono text-[11px] text-zinc-500 leading-relaxed whitespace-pre select-none">
{`  input                  core              output
  ─────                  ────              ──────

  lenguaje natural  ───→ ┌────────────┐
                         │            │  ───→  whatsapp.send
  evento externo    ───→ │ arkhram OS │  ───→  sheets.append
                         │            │  ───→  slack.notify
  schedule / cron   ───→ │ compiler   │  ───→  notion.create
                         │            │  ───→  email.send
  webhook POST      ───→ └────────────┘
                               │
                          n8n runtime
                          (infraestructura)`}
          </pre>

          {/* Integrations */}
          <div>
            <p className="font-mono text-[10px] text-zinc-700 uppercase tracking-widest mb-4">conectores</p>
            <div className="flex flex-wrap gap-1.5">
              {INTEGRATIONS.map((name) => (
                <span
                  key={name}
                  className="font-mono text-[10px] text-zinc-600 border border-zinc-800/80 px-2 py-1 hover:border-zinc-700 hover:text-zinc-400 transition-colors cursor-default"
                >
                  {name}
                </span>
              ))}
              <span className="font-mono text-[10px] text-zinc-700 px-2 py-1">+22 más</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
