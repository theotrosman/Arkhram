"use client";

import { ChatMessage as ChatMessageType } from "@/lib/types";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const displayContent = message.content.replace(/```json[\s\S]*?```/g, "").trim();

  return (
    <div className={cn("flex gap-3 group", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5 shadow-[0_0_12px_rgba(124,58,237,0.4)]">
          A
        </div>
      )}
      <div
        className={cn(
          "max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser
            ? "bg-violet-600 text-white rounded-tr-sm shadow-[0_0_20px_rgba(124,58,237,0.2)]"
            : "bg-zinc-800/80 text-zinc-100 rounded-tl-sm border border-zinc-700/60 backdrop-blur-sm"
        )}
      >
        {isUser ? (
          <span className="whitespace-pre-wrap">{displayContent}</span>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
              strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
              em: ({ children }) => <em className="text-zinc-300 italic">{children}</em>,
              ul: ({ children }) => <ul className="mt-1 mb-2 space-y-1 pl-4 list-disc marker:text-violet-400">{children}</ul>,
              ol: ({ children }) => <ol className="mt-1 mb-2 space-y-1 pl-4 list-decimal marker:text-violet-400">{children}</ol>,
              li: ({ children }) => <li className="text-zinc-200">{children}</li>,
              code: ({ children, className }) => {
                const isBlock = className?.includes("language-");
                if (isBlock) return (
                  <code className="block bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-xs font-mono text-violet-300 my-2 overflow-x-auto">
                    {children}
                  </code>
                );
                return <code className="bg-zinc-900 border border-zinc-700/50 rounded px-1.5 py-0.5 text-xs font-mono text-violet-300">{children}</code>;
              },
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-violet-500 pl-3 my-2 text-zinc-400 italic">
                  {children}
                </blockquote>
              ),
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">
                  {children}
                </a>
              ),
              hr: () => <hr className="border-zinc-700 my-3" />,
            }}
          >
            {displayContent || "Generando..."}
          </ReactMarkdown>
        )}
      </div>
      {isUser && (
        <div className="w-7 h-7 rounded-full bg-zinc-700 flex items-center justify-center text-zinc-300 text-[10px] font-bold shrink-0 mt-0.5">
          Tú
        </div>
      )}
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white text-[10px] font-bold shrink-0 shadow-[0_0_12px_rgba(124,58,237,0.4)]">
        A
      </div>
      <div className="bg-zinc-800/80 border border-zinc-700/60 backdrop-blur-sm rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:0ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:150ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}
