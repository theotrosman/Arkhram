import { NextRequest, NextResponse } from "next/server";
import { groq, GROQ_MODEL, buildSystemPrompt } from "@/lib/groq";
import { ChatMessage } from "@/lib/types";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const profileSchema = z.object({
  name: z.string().max(100).nullable().optional(),
  business_type: z.string().max(200).nullable().optional(),
  business_description: z.string().max(500).nullable().optional(),
  industry: z.string().max(100).nullable().optional(),
  ai_notes: z.string().max(2000).nullable().optional(),
}).nullable().optional();

const requestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string().min(1).max(8000),
    })
  ).min(1).max(100),
  userProfile: profileSchema,
});

// Simple in-memory rate limiter (per-session, resets on restart)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30;      // max requests
const RATE_WINDOW = 60_000; // per 60 seconds

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  // Require authentication
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Rate limit by user ID
  if (!checkRateLimit(user.id)) {
    return NextResponse.json({ error: "Rate limit exceeded. Try again in a minute." }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { messages, userProfile } = requestSchema.parse(body);

    const systemPrompt = buildSystemPrompt(userProfile ?? null);

    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.map((m: ChatMessage) => ({
          role: m.role,
          content: m.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 1024,
    });

    const rawContent = completion.choices[0]?.message?.content ?? "";

    const jsonMatch = rawContent.match(/```json\s*([\s\S]*?)\s*```/);
    let automationConfig = null;
    if (jsonMatch) {
      try { automationConfig = JSON.parse(jsonMatch[1]); } catch {}
    }

    const noteMatch = rawContent.match(/\[NOTA:([\s\S]*?)\]/);
    const profileNote = noteMatch ? noteMatch[1].trim().slice(0, 500) : null;

    const content = rawContent.replace(/\[NOTA:[\s\S]*?\]/g, "").trim();

    return NextResponse.json({ content, automationConfig, profileNote });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    return NextResponse.json({ error: "Error processing message" }, { status: 500 });
  }
}
