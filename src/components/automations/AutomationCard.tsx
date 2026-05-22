"use client";

import { Automation, AutomationStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Pause, Trash2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig: Record<AutomationStatus, { label: string; color: string }> = {
  active: { label: "Activa", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  paused: { label: "Pausada", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  draft: { label: "Borrador", color: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30" },
};

const triggerIcons: Record<string, string> = {
  gmail: "📧",
  outlook: "📧",
  schedule: "⏰",
  webhook: "🔗",
  google_forms: "📋",
  shopify: "🛒",
  typeform: "📝",
  mercadolibre: "🛍️",
  whatsapp_incoming: "💬",
  instagram: "📸",
  default: "⚡",
};

interface AutomationCardProps {
  automation: Automation;
  onToggleStatus: (id: string, status: AutomationStatus) => void;
  onDelete: (id: string) => void;
  onClick: (automation: Automation) => void;
}

export function AutomationCard({
  automation,
  onToggleStatus,
  onDelete,
  onClick,
}: AutomationCardProps) {
  const status = statusConfig[automation.status];
  const triggerIcon = triggerIcons[automation.config.trigger.tipo] ?? triggerIcons.default;

  const nextStatus: AutomationStatus = automation.status === "active" ? "paused" : "active";

  return (
    <div
      className="bg-zinc-800/60 border border-zinc-700 rounded-xl p-4 hover:border-zinc-600 transition-all cursor-pointer group"
      onClick={() => onClick(automation)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <span className="text-2xl shrink-0 mt-0.5">{triggerIcon}</span>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-zinc-100 truncate group-hover:text-white transition-colors">
              {automation.name}
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5 line-clamp-2">{automation.description}</p>
            <p className="text-xs text-zinc-600 mt-1">
              {new Date(automation.created_at).toLocaleDateString("es-AR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Badge
            className={cn(
              "text-xs border",
              status.color
            )}
          >
            {status.label}
          </Badge>
          <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
        </div>
      </div>

      <div className="flex gap-2 mt-3 pt-3 border-t border-zinc-700/60">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 h-8 text-xs text-zinc-400 hover:text-white hover:bg-zinc-700"
          onClick={(e) => {
            e.stopPropagation();
            onToggleStatus(automation.id, nextStatus);
          }}
        >
          {automation.status === "active" ? (
            <><Pause className="w-3 h-3 mr-1" /> Pausar</>
          ) : (
            <><Play className="w-3 h-3 mr-1" /> Activar</>
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-xs text-red-500/70 hover:text-red-400 hover:bg-red-500/10"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(automation.id);
          }}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}
