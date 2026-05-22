"use client";

import { useState } from "react";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { AutomationsSidebar } from "@/components/automations/AutomationsSidebar";
import { ProjectsSidebar } from "@/components/automations/ProjectsSidebar";
import { ChatHeader } from "@/components/layout/ChatHeader";
import { cn } from "@/lib/utils";
import { Zap, Folder } from "lucide-react";

type SidebarTab = "automations" | "projects";

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<SidebarTab>("automations");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  function handleAutomationCreated() {
    setRefreshTrigger((n) => n + 1);
    setSidebarOpen(true);
    setActiveTab("automations");
  }

  return (
    <div className="h-screen flex flex-col bg-[#050505]">
      {/* Background orb */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-[800px] h-[400px] bg-violet-900/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <ChatHeader
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((s) => !s)}
      />

      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 overflow-hidden">
          <ChatInterface onAutomationCreated={handleAutomationCreated} />
        </main>

        <aside
          className={cn(
            "shrink-0 overflow-hidden transition-all duration-300 border-l border-zinc-800/60 flex flex-col",
            sidebarOpen ? "w-80" : "w-0 border-l-0"
          )}
        >
          {sidebarOpen && (
            <>
              {/* Tabs */}
              <div className="flex border-b border-zinc-800/60 bg-zinc-900/30">
                <button
                  onClick={() => setActiveTab("automations")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-colors border-b-2",
                    activeTab === "automations"
                      ? "text-violet-400 border-violet-500"
                      : "text-zinc-500 hover:text-zinc-300 border-transparent"
                  )}
                >
                  <Zap className="w-3 h-3" />
                  Flujos
                </button>
                <button
                  onClick={() => setActiveTab("projects")}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-colors border-b-2",
                    activeTab === "projects"
                      ? "text-violet-400 border-violet-500"
                      : "text-zinc-500 hover:text-zinc-300 border-transparent"
                  )}
                >
                  <Folder className="w-3 h-3" />
                  Proyectos
                </button>
              </div>

              <div className="flex-1 overflow-hidden">
                {activeTab === "automations" ? (
                  <AutomationsSidebar refreshTrigger={refreshTrigger} />
                ) : (
                  <ProjectsSidebar />
                )}
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}
