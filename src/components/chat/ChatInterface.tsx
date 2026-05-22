"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage, TypingIndicator } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { SkillChips } from "./SkillChips";
import { OnboardingModal } from "./OnboardingModal";
import { AutomationConfig, ChatMessage as ChatMessageType } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { getUserId } from "@/lib/supabase";
import { CheckCircle2, Loader2 } from "lucide-react";

interface UserProfile {
  id?: string;
  name?: string | null;
  business_type?: string | null;
  business_description?: string | null;
  industry?: string | null;
  ai_notes?: string | null;
  onboarding_done?: boolean;
}

interface ChatInterfaceProps {
  onAutomationCreated?: () => void;
}

export function ChatInterface({ onAutomationCreated }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const hasMessages = messages.length > 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Load user profile on mount
  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/user-profile");
        if (res.status === 401) {
          setProfileLoaded(true);
          return;
        }
        const data = await res.json();
        if (data.profile) {
          setUserProfile(data.profile);
          if (!data.profile.onboarding_done) {
            setShowOnboarding(true);
          }
        } else {
          // No profile yet — show onboarding
          setShowOnboarding(true);
        }
      } catch {
        // silently fail
      } finally {
        setProfileLoaded(true);
      }
    }
    loadProfile();
  }, []);

  async function handleOnboardingComplete(data: { name: string; business_description: string; industry: string }) {
    setShowOnboarding(false);
    const updated = { ...userProfile, ...data, onboarding_done: true };
    setUserProfile(updated);
    try {
      const res = await fetch("/api/user-profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      const json = await res.json();
      if (json.profile) setUserProfile(json.profile);
    } catch {}
  }

  async function saveProfileNote(note: string) {
    if (!note || !userProfile) return;
    const existing = userProfile.ai_notes || "";
    const combined = existing ? `${existing}. ${note}` : note;
    try {
      await fetch("/api/user-profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ai_notes: combined }),
      });
      setUserProfile((prev) => prev ? { ...prev, ai_notes: combined } : prev);
    } catch {}
  }

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const userMessage: ChatMessageType = { role: "user", content };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setInput("");
      setIsLoading(true);
      setSuccessMessage(null);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
            userProfile: userProfile ? {
              name: userProfile.name,
              business_type: userProfile.business_type,
              business_description: userProfile.business_description,
              industry: userProfile.industry,
              ai_notes: userProfile.ai_notes,
            } : null,
          }),
        });

        const data = await response.json();

        setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);

        if (data.profileNote) {
          saveProfileNote(data.profileNote);
        }

        if (data.automationConfig) {
          await generateFlow(data.automationConfig);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Hubo un error procesando tu mensaje. ¿Podés intentarlo de nuevo?" },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, userProfile]
  );

  async function generateFlow(config: AutomationConfig) {
    setIsGenerating(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const userId = user?.id ?? getUserId();

    try {
      const response = await fetch("/api/generate-flow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ config, userId }),
      });

      const data = await response.json();

      if (data.automation) {
        setSuccessMessage(
          `Automatización "${data.automation.name}" creada ${data.n8nWorkflowId ? "y activada" : "como borrador"} exitosamente.`
        );
        onAutomationCreated?.();
      }
    } catch (error) {
      console.error("Error generating flow:", error);
    } finally {
      setIsGenerating(false);
    }
  }

  const greeting = userProfile?.name
    ? `Hola ${userProfile.name} 👋`
    : "Hola 👋";

  const subgreeting = userProfile?.business_description || userProfile?.industry
    ? `¿Qué querés automatizar hoy en ${userProfile.business_description || userProfile.industry}?`
    : "Describí en palabras simples qué querés automatizar. La IA se encarga del resto.";

  return (
    <>
      {showOnboarding && profileLoaded && (
        <OnboardingModal onComplete={handleOnboardingComplete} />
      )}

      <div className="flex flex-col h-full">
        {!hasMessages ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-8 px-4 py-12">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-white tracking-tight">
                {greeting}
              </div>
              <p className="text-zinc-400 max-w-md">
                {subgreeting}
              </p>
            </div>

            <div className="w-full max-w-2xl space-y-4">
              <ChatInput
                value={input}
                onChange={setInput}
                onSubmit={() => sendMessage(input)}
                disabled={isLoading}
                placeholder="Describí qué querés automatizar..."
              />
              <SkillChips onSelect={(prompt) => sendMessage(prompt)} />
            </div>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-4 py-4">
              <div className="max-w-2xl mx-auto space-y-4">
                {messages.map((msg, i) => (
                  <ChatMessage key={i} message={msg} />
                ))}
                {isLoading && <TypingIndicator />}
                {isGenerating && (
                  <div className="flex items-center gap-2 text-violet-400 text-sm justify-center py-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Generando tu automatización en n8n...</span>
                  </div>
                )}
                {successMessage && (
                  <div className="flex items-center gap-2 text-emerald-400 text-sm justify-center py-2 bg-emerald-500/10 rounded-xl border border-emerald-500/20 px-4">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{successMessage}</span>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </ScrollArea>

            <div className="px-4 pb-4 pt-2 max-w-2xl mx-auto w-full">
              <ChatInput
                value={input}
                onChange={setInput}
                onSubmit={() => sendMessage(input)}
                disabled={isLoading || isGenerating}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
