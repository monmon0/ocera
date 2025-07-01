import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json({ success: false, error: "Token required" }, { status: 400 });
  }

  const { data: tokenRow } = await supabaseAdmin
    .from("email_verification_tokens")
    .select("user_id, expires_at")
    .eq("token", token)
    .single();

  if (!tokenRow || new Date(tokenRow.expires_at) < new Date()) {
    return NextResponse.json({ success: false, error: "Token expired or invalid" }, { status: 400 });
  }

  // Mark user as verified
  await supabaseAdmin
    .from("users")
    .update({ is_verified: true })
    .eq("id", tokenRow.user_id);

  // Delete token
  await supabaseAdmin
    .from("email_verification_tokens")
    .delete()
    .eq("token", token);

  return NextResponse.redirect("/dashboard"); // or /login
}
