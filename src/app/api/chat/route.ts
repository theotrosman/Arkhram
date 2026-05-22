import { NextRequest, NextResponse } from "next/server";
import { groq, GROQ_MODEL, buildSystemPrompt } from "@/lib/groq";
import { ChatMessage } from "@/lib/types";
import { z } from "zod";

const requestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string(),
    })
  ),
  userProfile: z.object({
    name: z.string().nullable().optional(),
    business_type: z.string().nullable().optional(),
    business_description: z.string().nullable().optional(),
    industry: z.string().nullable().optional(),
    ai_notes: z.string().nullable().optional(),
  }).optional().nullable(),
});

export async function POST(req: NextRequest) {
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

    const content = completion.choices[0]?.message?.content ?? "";

    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
    let automationConfig = null;

    if (jsonMatch) {
      try {
        automationConfig = JSON.parse(jsonMatch[1]);
      } catch {
        // continue without config
      }
    }

    // Extract AI notes to save to profile (simple heuristic: look for [NOTA:] tags)
    const noteMatch = content.match(/\[NOTA:([\s\S]*?)\]/);
    const profileNote = noteMatch ? noteMatch[1].trim() : null;

    return NextResponse.json({ content: content.replace(/\[NOTA:[\s\S]*?\]/g, "").trim(), automationConfig, profileNote });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Error procesando el mensaje" },
      { status: 500 }
    );
  }
}
