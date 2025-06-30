import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 },
      );
    }

    const { referralCode } = await request.json();

    if (!referralCode) {
      return NextResponse.json(
        { success: false, error: "Referral code is required" },
        { status: 400 },
      );
    }

    // Get user from database
    const { data: user, error: userError } = await supabaseAdmin
      .from("users")
      .select("id, email")
      .eq("email", session.user.email)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );
    }

    // Get referral code details
    const { data: referralData, error: referralError } = await supabaseAdmin
      .from("referral_codes")
      .select("id, created_by, max_uses, used_count")
      .eq("code", referralCode.toUpperCase())
      .single();

    if (referralError || !referralData) {
      return NextResponse.json(
        { success: false, error: "Invalid referral code" },
        { status: 400 },
      );
    }

    // Check if user already used a referral code
    const { data: existingReferral } = await supabaseAdmin
      .from("user_referrals")
      .select("id")
      .eq("referred_user_id", user.id)
      .single();

    if (existingReferral) {
      return NextResponse.json(
        { success: false, error: "User has already used a referral code" },
        { status: 400 },
      );
    }

    // Start transaction-like operations
    try {
      // 1. Create user referral record
      const { error: referralCreationError } = await supabaseAdmin
        .from("user_referrals")
        .insert({
          referred_user_id: user.id,
          referrer_user_id: referralData.created_by,
          referral_code_id: referralData.id,
          referral_code: referralCode.toUpperCase(),
        });

      if (referralCreationError) {
        throw new Error("Failed to create referral record");
      }

      // 2. Update referral code usage count
      const { error: updateError } = await supabaseAdmin
        .from("referral_codes")
        .update({ used_count: referralData.used_count + 1 })
        .eq("id", referralData.id);

      if (updateError) {
        throw new Error("Failed to update referral code usage");
      }

      // 3. Update user with referral info and approve them
      const { error: userUpdateError } = await supabaseAdmin
        .from("users")
        .update({
          referred_by: referralData.created_by,
          is_approved: true, // Approve users who have valid referral codes
        })
        .eq("id", user.id);

      if (userUpdateError) {
        throw new Error("Failed to update user referral info");
      }

      return NextResponse.json({
        success: true,
        message: "Referral code processed successfully",
        approved: true,
      });
    } catch (transactionError) {
      console.error("Transaction error:", transactionError);
      return NextResponse.json(
        { success: false, error: "Failed to process referral code" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error processing referral code:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
