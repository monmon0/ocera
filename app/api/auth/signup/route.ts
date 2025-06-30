
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { email, name, referralCode, password } = await request.json();

    if (!email || !name || !referralCode) {
      return NextResponse.json(
        { success: false, error: "Email, name, and referral code are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from("users")
      .select("id, email")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 400 }
      );
    }

    // Validate referral code
    const { data: referralData, error: referralError } = await supabaseAdmin
      .from("referral_codes")
      .select("id, created_by, max_uses, used_count")
      .eq("code", referralCode.toUpperCase())
      .eq("is_active", true)
      .single();

    if (referralError || !referralData) {
      return NextResponse.json(
        { success: false, error: "Invalid referral code" },
        { status: 400 }
      );
    }

    // Check if referral code has reached max uses
    if (referralData.max_uses && referralData.used_count >= referralData.max_uses) {
      return NextResponse.json(
        { success: false, error: "Referral code has reached maximum uses" },
        { status: 400 }
      );
    }

    try {
      // Hash the password before storing
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create new user
      const { data: newUser, error: userError } = await supabaseAdmin
        .from("users")
        .insert({
          email,
          name,
          password: hashedPassword,
          // is_approved: true, // Auto-approve users with valid referral codes
          // referred_by: referralData.created_by,
        })
        .select()
        .single();

      if (userError) {
        console.error("User creation error:", userError);
        throw new Error("Failed to create user");
      }

      // Create user referral record
      const { error: referralCreationError } = await supabaseAdmin
        .from("user_referrals")
        .insert({
          referred_user_id: newUser.id,
          referrer_user_id: referralData.created_by,
          referral_code_id: referralData.id,
          referral_code: referralCode.toUpperCase(),
        });

      if (referralCreationError) {
        throw new Error("Failed to create referral record");
      }

      // Update referral code usage count
      const { error: updateError } = await supabaseAdmin
        .from("referral_codes")
        .update({ used_count: referralData.used_count + 1 })
        .eq("id", referralData.id);

      if (updateError) {
        throw new Error("Failed to update referral code usage");
      }

      return NextResponse.json({
        success: true,
        message: "Account created successfully",
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          // is_approved: newUser.is_approved,
        },
      });
    } catch (transactionError) {
      console.error("Transaction error:", transactionError);
      return NextResponse.json(
        { success: false, error: "Failed to create account" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error creating account:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
