"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      style={{
        borderTop: "1px solid rgba(139,26,26,0.1)",
        background: "#030303",
      }}
    >
      <div className="flex flex-col gap-1">
        <span className="font-mono text-[10px] tracking-[0.3em]" style={{ color: "#2a2520" }}>
          AUTOMATIS / SYS:2.1 / BUILD:STABLE
        </span>
        <span className="font-mono text-[9px]" style={{ color: "#1a1a1a" }}>
          automatis.io
        </span>
      </div>

      <div className="flex gap-6">
        {["terms", "privacy", "docs"].map((item) => (
          <span
            key={item}
            className="font-mono text-[10px] transition-colors duration-200"
            style={{ color: "#2a2520" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLSpanElement).style.color = "#5a5050")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLSpanElement).style.color = "#2a2520")}
          >
            /{item}
          </span>
        ))}
        <Link
          href="/login"
          className="font-mono text-[10px] transition-colors duration-200"
          style={{ color: "#2a2520" }}
        >
          /login
        </Link>
      </div>

      <span className="font-mono text-[10px]" style={{ color: "#1a1a1a" }}>
        © {new Date().getFullYear()} AUTOMATIS
      </span>
    </footer>
  );
}
