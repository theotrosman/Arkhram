"use client";

import { useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendHorizontal, Paperclip } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
}

const ALLOWED_TYPES = ["text/plain", "text/markdown", "text/csv", "application/json"];
const ALLOWED_EXTENSIONS = [".txt", ".md", ".csv", ".json"];

export function ChatInput({
  value,
  onChange,
  onSubmit,
  disabled,
  placeholder = "Describí qué querés automatizar...",
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [disabled]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSubmit();
      }
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ALLOWED_TYPES.includes(file.type) && !ALLOWED_EXTENSIONS.includes(ext)) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result as string;
      const header = `[Archivo adjunto: ${file.name}]\n\`\`\`\n${content.slice(0, 4000)}\n\`\`\`\n\n`;
      onChange(header + value);
      textareaRef.current?.focus();
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <div className="flex gap-2 items-end bg-zinc-800 border border-zinc-700 rounded-2xl p-2 focus-within:border-violet-500/60 transition-colors">
      <input
        ref={fileRef}
        type="file"
        accept=".txt,.md,.csv,.json"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => fileRef.current?.click()}
        disabled={disabled}
        className="shrink-0 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-700/50 rounded-xl h-10 w-10"
        title="Adjuntar archivo (.txt, .md, .csv, .json)"
      >
        <Paperclip className="w-4 h-4" />
      </Button>
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className="resize-none border-0 bg-transparent text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[40px] max-h-[200px] py-2 px-2 text-sm"
        style={{ overflowY: "auto" }}
      />
      <Button
        onClick={onSubmit}
        disabled={!value.trim() || disabled}
        size="icon"
        className="shrink-0 bg-violet-600 hover:bg-violet-500 disabled:opacity-30 rounded-xl h-10 w-10"
      >
        <SendHorizontal className="w-4 h-4" />
      </Button>
    </div>
  );
}
