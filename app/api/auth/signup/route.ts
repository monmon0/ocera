import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "@/lib/email"; // you implement this

export async function POST(request: NextRequest) {
  try {
    const { email, name, referralCode, password } = await request.json();

    if (!email || !name || !referralCode || !password) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
    }

    // Check if already exists
    const { data: existingUser } = await supabaseAdmin
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (existingUser) {
      return NextResponse.json({ success: false, error: "User already exists" }, { status: 400 });
    }

    // Validate referral code
    const { data: referralData, error: referralError } = await supabaseAdmin
      .from("referral_codes")
      .select("id, used_count, max_uses")
      .eq("code", referralCode.toUpperCase())
      .eq("is_active", true)
      .single();

    if (referralError || !referralData || referralData.used_count >= referralData.max_uses) {
      return NextResponse.json({ success: false, error: "Invalid or exhausted referral code" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const { data: newUser, error: insertError } = await supabaseAdmin
      .from("users")
      .insert({ email, name, password: hashedPassword, is_verified: false })
      .select()
      .single();

    if (insertError) throw new Error("Failed to create user");

    // Update referral count
    await supabaseAdmin
      .from("referral_codes")
      .update({ used_count: referralData.used_count + 1 })
      .eq("id", referralData.id);

    // Generate token
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24h

    await supabaseAdmin.from("email_verification_tokens").insert({
      user_id: newUser.id,
      token,
      expires_at: expiresAt.toISOString(),
    });

    // Send email (you implement sendVerificationEmail)
    await sendVerificationEmail(email, token);

    return NextResponse.json({ success: true, message: "Check your email to verify account." });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import { supabaseAdmin } from "@/lib/supabase";
// import bcrypt from "bcryptjs";

// export async function POST(request: NextRequest) {
//   try {
//     const { email, name, referralCode, password } = await request.json();

//     if (!email || !name || !referralCode || !password) {
//       return NextResponse.json(
//         { success: false, error: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     // Check if user already exists in custom DB
//     const { data: existingUser } = await supabaseAdmin
//       .from("users")
//       .select("id")
//       .eq("email", email)
//       .maybeSingle();

//     if (existingUser) {
//       return NextResponse.json(
//         { success: false, error: "User already exists" },
//         { status: 400 }
//       );
//     }

//     // Check referral code validity
//     const { data: referralData, error: referralError } = await supabaseAdmin
//       .from("referral_codes")
//       .select("id, created_by, max_uses, used_count")
//       .eq("code", referralCode.toUpperCase())
//       .eq("is_active", true)
//       .single();

//     if (referralError || !referralData) {
//       return NextResponse.json(
//         { success: false, error: "Invalid referral code" },
//         { status: 400 }
//       );
//     }

//     if (referralData.max_uses && referralData.used_count >= referralData.max_uses) {
//       return NextResponse.json(
//         { success: false, error: "Referral code usage limit reached" },
//         { status: 400 }
//       );
//     }

//     // Create user in Supabase Auth for email verification
//     const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
//       email,
//       password,
//       email_confirm: false, // Force verification email
//     });

//     if (authError) {
//       console.error("Auth creation error:", authError);
//       return NextResponse.json(
//         { success: false, error: "Failed to create auth user" },
//         { status: 500 }
//       );
//     }

//     // Hash password for your custom users table
//     const hashedPassword = await bcrypt.hash(password, 12);

//     const { data: newUser, error: insertError } = await supabaseAdmin
//       .from("users")
//       .insert({
//         id: authUser.user.id, // Link to Supabase Auth ID
//         email,
//         name,
//         password: hashedPassword,
//       })
//       .select()
//       .single();

//     if (insertError) {
//       console.error("Insert error:", insertError);
//       return NextResponse.json(
//         { success: false, error: "Failed to create user in DB" },
//         { status: 500 }
//       );
//     }

//     // Update referral code usage
//     await supabaseAdmin
//       .from("referral_codes")
//       .update({ used_count: referralData.used_count + 1 })
//       .eq("id", referralData.id);

//     return NextResponse.json({
//       success: true,
//       message: "Account created. Please verify your email to sign in.",
//       user: {
//         id: newUser.id,
//         email: newUser.email,
//         name: newUser.name,
//       },
//     });
//   } catch (err) {
//     console.error("Signup error:", err);
//     return NextResponse.json(
//       { success: false, error: "Server error" },
//       { status: 500 }
//     );
//   }
// }
