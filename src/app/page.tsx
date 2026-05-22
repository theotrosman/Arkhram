"use client";

import { useState } from "react";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { AutomationsSidebar } from "@/components/automations/AutomationsSidebar";
import { Zap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  function handleAutomationCreated() {
    setRefreshTrigger((n) => n + 1);
    setSidebarOpen(true);
  }

  return (
    <div className="h-screen flex flex-col bg-zinc-950">
      <header className="h-12 border-b border-zinc-800 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-violet-600 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-zinc-100 tracking-tight">Arkham</span>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSidebarOpen((s) => !s)}
          className="h-8 gap-2 text-xs text-zinc-400 hover:text-white"
        >
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span className="hidden sm:inline">Mis automatizaciones</span>
        </Button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-hidden">
          <ChatInterface onAutomationCreated={handleAutomationCreated} />
        </main>

        <aside
          className={cn(
            "w-80 border-l border-zinc-800 shrink-0 overflow-hidden transition-all duration-300",
            sidebarOpen ? "w-80" : "w-0 border-l-0"
          )}
        >
          {sidebarOpen && (
            <AutomationsSidebar refreshTrigger={refreshTrigger} />
          )}
        </aside>
      </div>
    </div>
  );
}
