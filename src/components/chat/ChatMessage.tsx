"use client";

import { ChatMessage as ChatMessageType } from "@/lib/types";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
  message: ChatMessageType;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === "user";
  const displayContent = message.content.replace(/```json[\s\S]*?```/g, "").replace(/\[NOTA:[\s\S]*?\]/g, "").trim();

  return (
    <div className={cn("flex gap-3 group", isUser ? "justify-end" : "justify-start")}>
      {/* AI avatar */}
      {!isUser && (
        <div
          className="w-6 h-6 shrink-0 mt-0.5 flex items-center justify-center font-mono text-[9px] font-bold"
          style={{
            border: "1px solid rgba(139,26,26,0.4)",
            color: "#8b1a1a",
            background: "rgba(139,26,26,0.06)",
            letterSpacing: "0.05em",
          }}
        >
          A
        </div>
      )}

      {/* Message bubble */}
      <div
        className={cn("max-w-[82%] px-4 py-3 text-sm leading-relaxed relative")}
        style={
          isUser
            ? {
                background: "rgba(20,5,5,0.8)",
                border: "1px solid rgba(139,26,26,0.25)",
                color: "#c4b8a8",
              }
            : {
                background: "rgba(10,6,6,0.7)",
                border: "1px solid rgba(255,255,255,0.05)",
                color: "#b8b0a4",
              }
        }
      >
        {isUser ? (
          <span className="font-mono text-[12px] leading-relaxed whitespace-pre-wrap" style={{ color: "#c4b8a8" }}>
            {displayContent}
          </span>
        ) : (
          <div className="font-mono text-[12px] leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => (
                  <p className="mb-2.5 last:mb-0 leading-relaxed" style={{ color: "#b8b0a4" }}>
                    {children}
                  </p>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold" style={{ color: "#d4c9b8" }}>
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="italic" style={{ color: "#8a8070" }}>
                    {children}
                  </em>
                ),
                ul: ({ children }) => (
                  <ul className="mt-1.5 mb-2.5 space-y-1.5 pl-0 list-none">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="mt-1.5 mb-2.5 space-y-1.5 pl-4 list-decimal" style={{ color: "#5a5550" }}>
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="flex items-start gap-2" style={{ color: "#b8b0a4" }}>
                    <span style={{ color: "#8b1a1a", flexShrink: 0, marginTop: "1px" }}>›</span>
                    <span>{children}</span>
                  </li>
                ),
                code: ({ children, className }) => {
                  const isBlock = className?.includes("language-");
                  if (isBlock) return (
                    <code
                      className="block text-[11px] font-mono p-3 my-2 overflow-x-auto leading-relaxed"
                      style={{
                        background: "rgba(3,2,2,0.9)",
                        border: "1px solid rgba(139,26,26,0.15)",
                        color: "#8a7060",
                      }}
                    >
                      {children}
                    </code>
                  );
                  return (
                    <code
                      className="text-[11px] font-mono px-1.5 py-0.5"
                      style={{
                        background: "rgba(3,2,2,0.7)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        color: "#8b1a1a",
                      }}
                    >
                      {children}
                    </code>
                  );
                },
                blockquote: ({ children }) => (
                  <blockquote
                    className="pl-3 my-2 italic"
                    style={{
                      borderLeft: "2px solid rgba(139,26,26,0.4)",
                      color: "#6a6060",
                    }}
                  >
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 transition-colors duration-200"
                    style={{ color: "#8b1a1a" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#cc4444")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#8b1a1a")}
                  >
                    {children}
                  </a>
                ),
                h1: ({ children }) => (
                  <h1 className="font-bold mb-2 mt-1" style={{ fontFamily: "'Cinzel', serif", fontSize: "14px", color: "#d4c9b8", letterSpacing: "0.05em" }}>
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="font-bold mb-1.5 mt-1" style={{ fontFamily: "'Cinzel', serif", fontSize: "12px", color: "#c4b8a8", letterSpacing: "0.05em" }}>
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="font-semibold mb-1 mt-1 text-[12px]" style={{ color: "#a09080" }}>
                    {children}
                  </h3>
                ),
                hr: () => (
                  <hr className="my-3" style={{ borderColor: "rgba(255,255,255,0.06)" }} />
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-2">
                    <table className="w-full text-[11px] border-collapse" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="px-3 py-1.5 text-left font-mono font-semibold" style={{ borderBottom: "1px solid rgba(139,26,26,0.2)", color: "#8a7060" }}>
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-3 py-1.5 font-mono" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", color: "#7a7070" }}>
                    {children}
                  </td>
                ),
              }}
            >
              {displayContent || "Generando..."}
            </ReactMarkdown>
            {isStreaming && (
              <span
                className="inline-block align-middle ml-0.5"
                style={{
                  width: 6,
                  height: 12,
                  background: "#8b1a1a",
                  opacity: 0.8,
                  animation: "cursor-blink 1s step-end infinite",
                }}
              />
            )}
          </div>
        )}
      </div>

      {/* User avatar */}
      {isUser && (
        <div
          className="w-6 h-6 shrink-0 mt-0.5 flex items-center justify-center font-mono text-[9px]"
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#5a5550",
            background: "rgba(255,255,255,0.02)",
          }}
        >
          OP
        </div>
      )}
    </div>
  );
}

export function ThinkingIndicator() {
  return (
    <div className="flex gap-3 justify-start">
      <div
        className="w-6 h-6 shrink-0 mt-0.5 flex items-center justify-center font-mono text-[9px] font-bold"
        style={{
          border: "1px solid rgba(139,26,26,0.4)",
          color: "#8b1a1a",
          background: "rgba(139,26,26,0.06)",
        }}
      >
        A
      </div>
      <div
        className="px-4 py-3 font-mono text-[11px]"
        style={{
          background: "rgba(10,6,6,0.7)",
          border: "1px solid rgba(255,255,255,0.05)",
          color: "#3a3530",
        }}
      >
        <span className="flex items-center gap-3">
          <span style={{ color: "#5a3030" }}>pensando</span>
          <span className="flex gap-1 items-center">
            <span
              className="inline-block w-1 h-1 rounded-full"
              style={{ background: "#8b1a1a", animation: "cursor-blink 1.2s ease-in-out infinite" }}
            />
            <span
              className="inline-block w-1 h-1 rounded-full"
              style={{ background: "#8b1a1a", animation: "cursor-blink 1.2s ease-in-out 0.4s infinite" }}
            />
            <span
              className="inline-block w-1 h-1 rounded-full"
              style={{ background: "#8b1a1a", animation: "cursor-blink 1.2s ease-in-out 0.8s infinite" }}
            />
          </span>
        </span>
      </div>
    </div>
  );
}

// Keep legacy export for any remaining references
export function TypingIndicator() {
  return <ThinkingIndicator />;
}
