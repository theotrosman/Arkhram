import { NextRequest, NextResponse } from "next/server";
import { groq, GROQ_MODEL, SYSTEM_PROMPT } from "@/lib/groq";
import { ChatMessage } from "@/lib/types";
import { z } from "zod";

const requestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant"]),
      content: z.string(),
    })
  ),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = requestSchema.parse(body);

    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
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
        // JSON parse failed — continue without config
      }
    }

    return NextResponse.json({ content, automationConfig });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Error procesando el mensaje" },
      { status: 500 }
    );
  }
}
