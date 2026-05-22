"use client";

import { useRef, useEffect } from "react";
import { Paperclip, ArrowUp } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  placeholder?: string;
}

const ALLOWED_EXTENSIONS = [
  ".txt", ".md", ".csv", ".json",
  ".pdf", ".doc", ".docx",
  ".xls", ".xlsx",
  ".png", ".jpg", ".jpeg", ".webp",
];

const TEXT_EXTENSIONS = [".txt", ".md", ".csv", ".json"];

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

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 200) + "px";
  }, [value]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) onSubmit();
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = ("." + file.name.split(".").pop()?.toLowerCase()) as string;
    const isText = TEXT_EXTENSIONS.includes(ext);
    const isImage = file.type.startsWith("image/");

    if (isText) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const content = ev.target?.result as string;
        const header = `[Archivo adjunto: ${file.name}]\n\`\`\`\n${content.slice(0, 4000)}\n\`\`\`\n\n`;
        onChange(header + value);
        textareaRef.current?.focus();
      };
      reader.readAsText(file);
    } else if (isImage) {
      onChange(`[Imagen adjunta: ${file.name}] — analizá esta imagen para el contexto de la automatización.\n\n` + value);
      textareaRef.current?.focus();
    } else {
      // Binary: PDF, Word, Excel — reference by name
      onChange(`[Archivo adjunto: ${file.name}] — procesá este documento para extraer la información relevante.\n\n` + value);
      textareaRef.current?.focus();
    }
    e.target.value = "";
  }

  const canSend = !!value.trim() && !disabled;

  return (
    <div
      className="relative transition-all duration-200"
      style={{
        background: "rgba(8,4,4,0.9)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <input
        ref={fileRef}
        type="file"
        accept={ALLOWED_EXTENSIONS.join(",")}
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className="w-full bg-transparent font-mono text-[12px] px-4 pt-3.5 pb-11 resize-none focus:outline-none disabled:opacity-50"
        style={{
          color: "#c4b8a8",
          caretColor: "#8b1a1a",
          minHeight: "52px",
          maxHeight: "200px",
          overflowY: "auto",
          lineHeight: "1.6",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ["--placeholder-color" as any]: "#3a3530",
        }}
      />

      {/* Bottom toolbar */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 py-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        {/* Attach button */}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={disabled}
          className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest px-2 py-1 transition-all duration-200 disabled:opacity-30"
          style={{
            color: "#3a3530",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
          title="Adjuntar PDF, imagen, Word, Excel, CSV, JSON..."
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#8a7060";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(139,26,26,0.3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#3a3530";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.05)";
          }}
        >
          <Paperclip className="w-3 h-3" />
          <span className="hidden sm:inline">ADJUNTAR</span>
        </button>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] hidden sm:block" style={{ color: "#1a1a1a" }}>
            SHIFT+ENTER nueva línea
          </span>
          <button
            onClick={onSubmit}
            disabled={!canSend}
            className="flex items-center justify-center w-7 h-7 transition-all duration-200"
            style={{
              background: canSend ? "rgba(139,26,26,0.85)" : "rgba(20,10,10,0.5)",
              border: `1px solid ${canSend ? "rgba(139,26,26,0.5)" : "rgba(255,255,255,0.05)"}`,
              opacity: canSend ? 1 : 0.25,
            }}
            onMouseEnter={(e) => {
              if (canSend) (e.currentTarget as HTMLButtonElement).style.background = "#8b1a1a";
            }}
            onMouseLeave={(e) => {
              if (canSend) (e.currentTarget as HTMLButtonElement).style.background = "rgba(139,26,26,0.85)";
            }}
          >
            <ArrowUp className="w-3.5 h-3.5" style={{ color: "#d4c9b8" }} />
          </button>
        </div>
      </div>
    </div>
  );
}
