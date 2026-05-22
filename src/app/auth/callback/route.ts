import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/chat";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
    // Expose the actual error so we can debug it
    const msg = encodeURIComponent(error.message ?? "exchange_failed");
    return NextResponse.redirect(`${origin}/login?error=${msg}`);
  }

  return NextResponse.redirect(`${origin}/login?error=no_code`);
}
