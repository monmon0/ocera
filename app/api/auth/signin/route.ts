
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const { data: user, error: userError } = await supabaseAdmin
      .from("users")
      .select("id, email, name, is_approved")
      .eq("email", email)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { success: false, needsSignup: true, error: "No account found" },
        { status: 404 }
      );
    }

    // Check if user is approved
    if (!user.is_approved) {
      return NextResponse.json(
        { success: false, error: "Account pending approval" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Sign in successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        is_approved: user.is_approved,
      },
    });
  } catch (error) {
    console.error("Error signing in:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
