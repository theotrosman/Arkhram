"use client";

import { Automation } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, ArrowRight, Zap, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const triggerLabels: Record<string, string> = {
  gmail: "Gmail",
  outlook: "Outlook",
  schedule: "Horario programado",
  webhook: "Webhook",
  google_forms: "Google Forms",
  shopify: "Shopify",
  typeform: "Typeform",
  mercadolibre: "Mercado Libre",
};

const actionLabels: Record<string, string> = {
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  slack: "Slack",
  email: "Email",
  notion: "Notion",
  google_sheets: "Google Sheets",
  airtable: "Airtable",
  hubspot: "HubSpot",
  trello: "Trello",
};

const frecuenciaLabels: Record<string, string> = {
  tiempo_real: "Tiempo real",
  cada_hora: "Cada hora",
  diaria: "Diaria",
  semanal: "Semanal",
};

interface AutomationDetailProps {
  automation: Automation;
  onClose: () => void;
}

export function AutomationDetail({ automation, onClose }: AutomationDetailProps) {
  const { config } = automation;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-zinc-700">
        <h2 className="text-sm font-semibold text-zinc-100 truncate pr-4">{automation.name}</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="shrink-0 h-8 w-8 text-zinc-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5">
        <div className="flex items-center gap-2 text-xs text-zinc-500">
          <Clock className="w-3 h-3" />
          <span>{frecuenciaLabels[config.frecuencia] ?? config.frecuencia}</span>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Flujo</p>

          <div className="space-y-2">
            <StepCard
              label="Disparador"
              type={triggerLabels[config.trigger.tipo] ?? config.trigger.tipo}
              details={Object.entries(config.trigger)
                .filter(([k]) => k !== "tipo")
                .slice(0, 3)}
              color="violet"
            />

            {config.acciones.map((action, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-zinc-600" />
                </div>
                <StepCard
                  label={`Acción ${i + 1}`}
                  type={actionLabels[action.tipo] ?? action.tipo}
                  details={Object.entries(action)
                    .filter(([k]) => k !== "tipo")
                    .slice(0, 3)}
                  color="emerald"
                />
              </div>
            ))}
          </div>
        </div>

        {automation.n8n_workflow_id && (
          <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2 text-violet-400 text-xs">
              <Zap className="w-3 h-3" />
              <span className="font-medium">Workflow n8n activo</span>
            </div>
            <p className="text-zinc-500 text-xs mt-1">ID: {automation.n8n_workflow_id}</p>
          </div>
        )}

        <div className="text-xs text-zinc-600 space-y-0.5">
          <p>Creada el {new Date(automation.created_at).toLocaleDateString("es-AR", { day: "2-digit", month: "long", year: "numeric" })}</p>
          <p>Última actualización {new Date(automation.updated_at).toLocaleDateString("es-AR", { day: "2-digit", month: "long", year: "numeric" })}</p>
        </div>
      </div>
    </div>
  );
}

function StepCard({
  label,
  type,
  details,
  color,
}: {
  label: string;
  type: string;
  details: [string, unknown][];
  color: "violet" | "emerald";
}) {
  const colorMap = {
    violet: "border-violet-500/30 bg-violet-500/5",
    emerald: "border-emerald-500/30 bg-emerald-500/5",
  };

  return (
    <div className={cn("rounded-lg border p-3 space-y-2", colorMap[color])}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-zinc-500">{label}</span>
        <Badge
          className={cn(
            "text-xs border",
            color === "violet"
              ? "bg-violet-500/20 text-violet-300 border-violet-500/30"
              : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
          )}
        >
          {type}
        </Badge>
      </div>
      {details.length > 0 && (
        <div className="space-y-1">
          {details.map(([key, value]) => (
            <div key={key} className="flex gap-2 text-xs">
              <span className="text-zinc-600 capitalize shrink-0">{key.replace(/_/g, " ")}:</span>
              <span className="text-zinc-400 truncate">{String(value)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
