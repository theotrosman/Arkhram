"use client";

import { useState, useEffect, useCallback } from "react";
import { Automation, AutomationStatus } from "@/lib/types";
import { AutomationCard } from "./AutomationCard";
import { AutomationDetail } from "./AutomationDetail";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Zap } from "lucide-react";

interface AutomationsSidebarProps {
  refreshTrigger?: number;
}

export function AutomationsSidebar({ refreshTrigger }: AutomationsSidebarProps) {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAutomations = useCallback(async () => {
    try {
      const res = await fetch("/api/automations");
      if (!res.ok) { setIsLoading(false); return; }
      const data = await res.json();
      setAutomations(data.automations ?? []);
    } catch {
      // silently fail
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAutomations();
  }, [fetchAutomations, refreshTrigger]);

  async function handleToggleStatus(id: string, status: AutomationStatus) {
    await fetch("/api/automations", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status, updated_at: new Date().toISOString() } : a))
    );
    if (selectedAutomation?.id === id) {
      setSelectedAutomation((prev) => prev ? { ...prev, status } : null);
    }
  }

  async function handleDelete(id: string) {
    await fetch(`/api/automations?id=${id}`, { method: "DELETE" });
    setAutomations((prev) => prev.filter((a) => a.id !== id));
    if (selectedAutomation?.id === id) setSelectedAutomation(null);
  }

  if (selectedAutomation) {
    return (
      <AutomationDetail
        automation={selectedAutomation}
        onClose={() => setSelectedAutomation(null)}
      />
    );
  }

  return (
    <div className="h-full flex flex-col" style={{ background: "rgba(5,2,2,0.95)" }}>
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center gap-2 shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <Zap className="w-3.5 h-3.5" style={{ color: "#8b1a1a" }} />
        <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "#5a5050" }}>
          Mis flujos
        </span>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-4 h-4 animate-spin" style={{ color: "#3a3530" }} />
        </div>
      ) : automations.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-3">
          <Zap className="w-6 h-6" style={{ color: "#1a1a1a" }} />
          <p className="font-mono text-[11px]" style={{ color: "#2a2520" }}>
            Sin automatizaciones todavía.
          </p>
          <p className="font-mono text-[10px] max-w-[180px] leading-relaxed" style={{ color: "#1a1a1a" }}>
            Describí qué querés automatizar en el chat para empezar.
          </p>
        </div>
      ) : (
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-1">
            {automations.filter((a) => a.status === "active").length > 0 && (
              <>
                <p
                  className="font-mono text-[9px] tracking-widest uppercase px-1 py-1"
                  style={{ color: "#2a2520" }}
                >
                  Activas
                </p>
                {automations
                  .filter((a) => a.status === "active")
                  .map((automation) => (
                    <AutomationCard
                      key={automation.id}
                      automation={automation}
                      onToggleStatus={handleToggleStatus}
                      onDelete={handleDelete}
                      onClick={setSelectedAutomation}
                    />
                  ))}
                <div
                  className="my-2"
                  style={{ height: "1px", background: "rgba(255,255,255,0.04)" }}
                />
              </>
            )}
            {automations.filter((a) => a.status !== "active").length > 0 && (
              <>
                <p
                  className="font-mono text-[9px] tracking-widest uppercase px-1 py-1"
                  style={{ color: "#2a2520" }}
                >
                  Inactivas
                </p>
                {automations
                  .filter((a) => a.status !== "active")
                  .map((automation) => (
                    <AutomationCard
                      key={automation.id}
                      automation={automation}
                      onToggleStatus={handleToggleStatus}
                      onDelete={handleDelete}
                      onClick={setSelectedAutomation}
                    />
                  ))}
              </>
            )}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
