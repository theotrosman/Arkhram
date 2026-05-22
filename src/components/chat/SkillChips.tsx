"use client";

import { SKILL_CHIPS } from "@/lib/types";

interface SkillChipsProps {
  onSelect: (prompt: string) => void;
}

export function SkillChips({ onSelect }: SkillChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {SKILL_CHIPS.map((chip) => (
        <button
          key={chip.label}
          onClick={() => onSelect(chip.prompt)}
          className="font-mono text-[10px] tracking-widest px-3 py-1.5 transition-all duration-200"
          style={{
            border: "1px solid rgba(255,255,255,0.07)",
            color: "#4a4540",
            background: "rgba(5,2,2,0.6)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(139,26,26,0.4)";
            (e.currentTarget as HTMLButtonElement).style.color = "#8a7060";
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(139,26,26,0.05)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.07)";
            (e.currentTarget as HTMLButtonElement).style.color = "#4a4540";
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(5,2,2,0.6)";
          }}
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}
