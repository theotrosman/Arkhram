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
          className="px-3 py-1.5 rounded-full text-sm border border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 hover:border-violet-500/60 transition-all duration-200 cursor-pointer"
        >
          {chip.label}
        </button>
      ))}
    </div>
  );
}
