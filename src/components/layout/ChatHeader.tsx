"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Menu, X, LogOut, ChevronDown } from "lucide-react";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import Link from "next/link";

interface ChatHeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function ChatHeader({ sidebarOpen, onToggleSidebar }: ChatHeaderProps) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  const avatar = user?.user_metadata?.avatar_url;
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Operador";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <header
      className="h-11 flex items-center justify-between px-5 shrink-0 relative z-10"
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        background: "rgba(5,2,2,0.95)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Left — logo */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 group">
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "13px",
              fontWeight: 900,
              color: "#d4c9b8",
              letterSpacing: "0.12em",
            }}
          >
            ARKHRAM
          </span>
          <div
            className="w-1 h-1 rounded-full animate-pulse"
            style={{ background: "#8b1a1a", boxShadow: "0 0 4px rgba(139,26,26,0.8)" }}
          />
        </Link>
        <div className="h-3 w-px" style={{ background: "rgba(255,255,255,0.08)" }} />
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: "#3a3530" }}>
          SISTEMA ACTIVO
        </span>
      </div>

      {/* Right — actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleSidebar}
          className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] tracking-[0.1em] transition-all duration-200"
          style={{
            border: "1px solid rgba(255,255,255,0.06)",
            color: sidebarOpen ? "#8a7060" : "#3a3530",
            background: sidebarOpen ? "rgba(139,26,26,0.06)" : "transparent",
          }}
          onMouseEnter={(e) => {
            if (!sidebarOpen) {
              (e.currentTarget as HTMLButtonElement).style.color = "#6a5a50";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
            }
          }}
          onMouseLeave={(e) => {
            if (!sidebarOpen) {
              (e.currentTarget as HTMLButtonElement).style.color = "#3a3530";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.06)";
            }
          }}
        >
          {sidebarOpen ? <X className="w-3 h-3" /> : <Menu className="w-3 h-3" />}
          <span className="hidden sm:inline">PANEL</span>
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 px-2.5 py-1.5 transition-all duration-200"
            style={{
              border: "1px solid rgba(255,255,255,0.06)",
              background: menuOpen ? "rgba(139,26,26,0.06)" : "transparent",
            }}
            onMouseEnter={(e) => {
              if (!menuOpen) (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(139,26,26,0.3)";
            }}
            onMouseLeave={(e) => {
              if (!menuOpen) (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.06)";
            }}
          >
            <div
              className="w-5 h-5 overflow-hidden flex items-center justify-center"
              style={{ border: "1px solid rgba(139,26,26,0.3)" }}
            >
              {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatar} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <span className="font-mono text-[8px]" style={{ color: "#8a7060" }}>{initials}</span>
              )}
            </div>
            <ChevronDown className="w-2.5 h-2.5" style={{ color: "#3a3530" }} />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <div
                className="absolute right-0 top-10 w-52 z-50"
                style={{
                  border: "1px solid rgba(139,26,26,0.2)",
                  background: "#080404",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.8)",
                }}
              >
                <div
                  className="px-4 py-3"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <p className="font-mono text-[11px]" style={{ color: "#8a7060" }}>{displayName}</p>
                  <p className="font-mono text-[9px] mt-0.5" style={{ color: "#3a3530" }}>{user?.email}</p>
                </div>
                <div className="p-1">
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 font-mono text-[10px] tracking-[0.1em] transition-colors duration-200"
                    style={{ color: "#5a3030" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "#cc4444";
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(139,26,26,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "#5a3030";
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    }}
                  >
                    <LogOut className="w-3 h-3" />
                    CERRAR SESIÓN
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
