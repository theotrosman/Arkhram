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
    <div className="h-screen flex flex-col" style={{ background: "#050202" }}>
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
            "shrink-0 overflow-hidden transition-all duration-300 flex flex-col",
            sidebarOpen ? "w-80" : "w-0"
          )}
          style={{
            borderLeft: sidebarOpen ? "1px solid rgba(255,255,255,0.05)" : "none",
            background: "rgba(5,2,2,0.95)",
          }}
        >
          {sidebarOpen && (
            <>
              {/* Gothic tabs */}
              <div
                className="flex shrink-0"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                <button
                  onClick={() => setActiveTab("automations")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 font-mono text-[10px] tracking-[0.1em] transition-colors duration-200"
                  style={{
                    color: activeTab === "automations" ? "#8b1a1a" : "#2a2520",
                    borderBottom: activeTab === "automations"
                      ? "1px solid rgba(139,26,26,0.6)"
                      : "1px solid transparent",
                    background: activeTab === "automations"
                      ? "rgba(139,26,26,0.04)"
                      : "transparent",
                  }}
                >
                  <Zap className="w-3 h-3" />
                  FLUJOS
                </button>
                <button
                  onClick={() => setActiveTab("projects")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 font-mono text-[10px] tracking-[0.1em] transition-colors duration-200"
                  style={{
                    color: activeTab === "projects" ? "#8b1a1a" : "#2a2520",
                    borderBottom: activeTab === "projects"
                      ? "1px solid rgba(139,26,26,0.6)"
                      : "1px solid transparent",
                    background: activeTab === "projects"
                      ? "rgba(139,26,26,0.04)"
                      : "transparent",
                  }}
                >
                  <Folder className="w-3 h-3" />
                  PROYECTOS
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
