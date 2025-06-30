import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { email, name, referralCode, password } = await request.json();

    if (!email || !name || !referralCode || !password) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if user already exists in database
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
      // First, create Supabase Auth user
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: false, // Set to true if you want to require email confirmation
        user_metadata: {
          name: name,
          referral_code: referralCode,
        }
      });

      if (authError || !authData.user) {
        console.error("Supabase Auth user creation error:", authError);
        return NextResponse.json(
          { success: false, error: "Failed to create auth user" },
          { status: 500 }
        );
      }

      // Hash the password for database storage (optional - you might not need this if using Supabase Auth)
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create user in database using the Supabase Auth user ID
      const { data: newUser, error: userError } = await supabaseAdmin
        .from("users")
        .insert({
          id: authData.user.id, // Use Supabase Auth user ID
          email,
          name,
          password: hashedPassword, // Optional
          email_verified: authData.user.email_confirmed_at,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (userError) {
        console.error("Database user creation error:", userError);
        // Clean up: delete the auth user if database creation fails
        await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
        throw new Error("Failed to create user record");
      }

      // Create user referral record
      // const { error: referralCreationError } = await supabaseAdmin
      //   .from("user_referrals")
      //   .insert({
      //     referred_user_id: newUser.id,
      //     referrer_user_id: referralData.created_by,
      //     referral_code_id: referralData.id,
      //     referral_code: referralCode.toUpperCase(),
      //   });

      // if (referralCreationError) {
      //   console.error("Referral creation error:", referralCreationError);
      //   // Clean up: delete the user and auth user if referral creation fails
      //   await supabaseAdmin.from("users").delete().eq("id", newUser.id);
      //   await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      //   throw new Error("Failed to create referral record");
      // }

      // Update referral code usage count
      const { error: updateError } = await supabaseAdmin
        .from("referral_codes")
        .update({ used_count: referralData.used_count + 1 })
        .eq("id", referralData.id);

      if (updateError) {
        console.error("Referral count update error:", updateError);
        // This is less critical, so we won't rollback for this
      }

      return NextResponse.json({
        success: true,
        message: "Account created successfully",
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
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