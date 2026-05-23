"use client";

import { useState, useEffect, Suspense } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
    if (searchParams.get("error")) setError("Error de autenticación. Intentá de nuevo.");
  }, [searchParams]);

  async function handleGoogle() {
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: { access_type: "offline", prompt: "consent" },
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError("Email o contraseña incorrectos.");
        setLoading(false);
        return;
      }
      router.push("/chat");
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
      });
      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setSuccess("Revisá tu email para confirmar tu cuenta. Puede estar en spam.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex overflow-hidden relative" style={{ background: "#050505" }}>

      {/* Atmospheric bg */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{
            background: "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(139,26,26,0.05) 0%, transparent 70%)",
          }} />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 3px)",
            }}
          />
        </div>
      )}

      {/* Left — gothic hero */}
      <div
        className="hidden lg:flex flex-col justify-between w-[44%] relative overflow-hidden p-14"
        style={{ borderRight: "1px solid rgba(255,255,255,0.04)" }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "16px",
              fontWeight: 900,
              color: "#d4c9b8",
              letterSpacing: "0.15em",
            }}
          >
            AUTOMATIS
          </span>
          <div
            className="w-1 h-1 rounded-full animate-pulse"
            style={{ background: "#8b1a1a", boxShadow: "0 0 6px rgba(139,26,26,0.8)" }}
          />
        </Link>

        {/* Center content */}
        <div className="space-y-8">
          <div
            className="h-px"
            style={{ background: "linear-gradient(90deg, rgba(139,26,26,0.6), rgba(192,160,96,0.2), transparent)" }}
          />
          <div className="space-y-4">
            <p
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(20px, 2.5vw, 28px)",
                color: "#d4c9b8",
                letterSpacing: "0.05em",
                lineHeight: 1.3,
              }}
            >
              Describe el proceso.<br />AUTOMATIS lo automatiza.
            </p>
            <p className="font-mono text-[11px] leading-relaxed" style={{ color: "#4a4540" }}>
              Convierte lenguaje natural en flujos operativos reales. Sin código, sin configuración, sin consultores.
            </p>
          </div>
          <div
            className="h-px"
            style={{ background: "linear-gradient(90deg, rgba(139,26,26,0.3), transparent)" }}
          />
        </div>

        {/* Bottom specs */}
        <div className="space-y-0">
          {[
            ["Motor de IA", "Llama 3.3 / 70B vía Groq"],
            ["Ejecución", "n8n self-hosted"],
            ["Conectores", "40+ sistemas nativos"],
          ].map(([label, val]) => (
            <div
              key={label}
              className="flex justify-between items-baseline font-mono text-[10px] py-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}
            >
              <span style={{ color: "#3a3530" }}>{label}</span>
              <span style={{ color: "#6a5a50" }}>{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        <div className="w-full max-w-[340px] space-y-7">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2">
            <Link
              href="/"
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "14px",
                color: "#d4c9b8",
                letterSpacing: "0.15em",
              }}
            >
              AUTOMATIS
            </Link>
          </div>

          {/* Header */}
          <div className="space-y-1.5">
            <p
              className="font-mono text-[9px] tracking-[0.35em] uppercase"
              style={{ color: "#8b1a1a" }}
            >
              {mode === "login" ? "/ ACCESO AL SISTEMA" : "/ NUEVO OPERADOR"}
            </p>
            <h1
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "20px",
                color: "#d4c9b8",
                letterSpacing: "0.05em",
                fontWeight: 600,
              }}
            >
              {mode === "login" ? "Bienvenido de vuelta." : "Crear acceso."}
            </h1>
          </div>

          {/* Error/Success */}
          {error && (
            <div
              className="font-mono text-[11px] px-4 py-3 flex items-start gap-2"
              style={{
                color: "#cc4444",
                borderLeft: "2px solid #8b1a1a",
                background: "rgba(139,26,26,0.06)",
              }}
            >
              <span style={{ color: "#8b1a1a", flexShrink: 0 }}>✗</span>
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div
              className="font-mono text-[11px] px-4 py-3 flex items-start gap-2"
              style={{
                color: "#7aaa6a",
                borderLeft: "2px solid #4a7a3a",
                background: "rgba(74,122,58,0.06)",
              }}
            >
              <span style={{ color: "#6a8a5a", flexShrink: 0 }}>✓</span>
              <span>{success}</span>
            </div>
          )}

          {/* Google OAuth */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3.5 font-mono text-[10px] tracking-[0.15em] transition-all duration-300 disabled:opacity-40 group"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.02)",
              color: "#6a6060",
              letterSpacing: "0.12em",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(139,26,26,0.4)";
              (e.currentTarget as HTMLButtonElement).style.color = "#d4c9b8";
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(139,26,26,0.04)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLButtonElement).style.color = "#6a6060";
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.02)";
            }}
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {loading ? "CONECTANDO..." : "CONTINUAR CON GOOGLE"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
            <span className="font-mono text-[10px]" style={{ color: "#2a2520" }}>—</span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
          </div>

          {/* Email form */}
          <form onSubmit={handleEmail} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="email@empresa.com"
              className="w-full px-4 py-3 font-mono text-[12px] bg-transparent transition-colors duration-200 focus:outline-none placeholder:text-[#2a2520]"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#d4c9b8",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(139,26,26,0.5)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="contraseña"
              className="w-full px-4 py-3 font-mono text-[12px] bg-transparent transition-colors duration-200 focus:outline-none placeholder:text-[#2a2520]"
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#d4c9b8",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(139,26,26,0.5)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 font-mono text-[10px] tracking-[0.2em] transition-all duration-300 disabled:opacity-40 btn-gothic"
            >
              {loading
                ? "PROCESANDO..."
                : mode === "login"
                ? "INICIAR SESIÓN →"
                : "CREAR ACCESO →"}
            </button>
          </form>

          {/* Toggle */}
          <p className="font-mono text-[10px] text-center" style={{ color: "#2a2520" }}>
            {mode === "login" ? "¿Sin acceso? " : "¿Ya tenés cuenta? "}
            <button
              onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); setSuccess(""); }}
              className="transition-colors duration-200"
              style={{ color: "#5a4040" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#8b1a1a")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#5a4040")}
            >
              {mode === "login" ? "Crear acceso" : "Iniciar sesión"}
            </button>
          </p>

          <p className="font-mono text-[9px] text-center" style={{ color: "#1a1a1a" }}>
            Al continuar aceptás los Términos de uso y Política de privacidad.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
