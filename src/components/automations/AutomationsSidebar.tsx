"use client";

import { useState, useEffect, useCallback } from "react";
import { Automation, AutomationStatus } from "@/lib/types";
import { AutomationCard } from "./AutomationCard";
import { AutomationDetail } from "./AutomationDetail";
import { getUserId } from "@/lib/supabase";
import { createClient } from "@/lib/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Loader2, Zap } from "lucide-react";

interface AutomationsSidebarProps {
  refreshTrigger?: number;
}

export function AutomationsSidebar({ refreshTrigger }: AutomationsSidebarProps) {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [selectedAutomation, setSelectedAutomation] = useState<Automation | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAutomations = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id ?? getUserId();
    if (!userId) return;

    try {
      const res = await fetch(`/api/automations?userId=${userId}`);
      const data = await res.json();
      setAutomations(data.automations ?? []);
    } catch {
      console.error("Error fetching automations");
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
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-zinc-700/60">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-violet-400" />
          <h2 className="text-sm font-semibold text-zinc-200">Mis automatizaciones</h2>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin text-zinc-500" />
        </div>
      ) : automations.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 gap-3">
          <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
            <Zap className="w-5 h-5 text-zinc-600" />
          </div>
          <p className="text-sm text-zinc-500">Todavía no tenés automatizaciones.</p>
          <p className="text-xs text-zinc-600">Describí qué querés automatizar en el chat para empezar.</p>
        </div>
      ) : (
        <ScrollArea className="flex-1">
          <div className="p-3 space-y-2">
            {automations.filter((a) => a.status === "active").length > 0 && (
              <>
                <p className="text-xs text-zinc-600 px-1 pt-1">Activas</p>
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
                <Separator className="bg-zinc-700/40 my-2" />
              </>
            )}
            {automations.filter((a) => a.status !== "active").length > 0 && (
              <>
                <p className="text-xs text-zinc-600 px-1">Inactivas</p>
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
