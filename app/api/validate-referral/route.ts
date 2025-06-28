import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { referralCode } = await request.json();

    if (!referralCode) {
      return NextResponse.json(
        { valid: false, error: "Referral code is required" },
        { status: 400 },
      );
    }

    // Check if referral code exists and is valid
    const { data: referralData, error } = await supabaseAdmin
      .from("referral_codes")
      .select("id, max_uses, used_count, expires_at, is_active")
      .eq("code", referralCode.toUpperCase())
      .single();

    if (error || !referralData) {
      return NextResponse.json(
        { valid: false, error: "Referral code not found" },
        { status: 404 },
      );
    }

    // Check if referral code is active
    if (!referralData.is_active) {
      return NextResponse.json(
        { valid: false, error: "Referral code is no longer active" },
        { status: 400 },
      );
    }

    // Check if referral code has expired
    if (
      referralData.expires_at &&
      new Date(referralData.expires_at) < new Date()
    ) {
      return NextResponse.json(
        { valid: false, error: "Referral code has expired" },
        { status: 400 },
      );
    }

    // Check if referral code has reached max uses
    if (
      referralData.max_uses &&
      referralData.used_count >= referralData.max_uses
    ) {
      return NextResponse.json(
        { valid: false, error: "Referral code has reached maximum uses" },
        { status: 400 },
      );
    }

    return NextResponse.json({ valid: true, referralId: referralData.id });
  } catch (error) {
    console.error("Error validating referral code:", error);
    return NextResponse.json(
      { valid: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
