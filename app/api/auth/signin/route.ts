import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const { data: user } = await supabaseAdmin
      .from("users")
      .select("id, email, name, password, is_verified")
      .eq("email", email)
      .single();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
    }

    if (!user.is_verified) {
      return NextResponse.json({ success: false, error: "Please verify your email first." }, { status: 403 });
    }

    return NextResponse.json({ success: true, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import { supabaseAdmin } from "@/lib/supabase";
// import bcrypt from "bcryptjs";

// export async function POST(request: NextRequest) {
//   try {
//     const { email, password } = await request.json();

//     if (!email || !password) {
//       return NextResponse.json(
//         { success: false, error: "Email and password are required" },
//         { status: 400 }
//       );
//     }

//     // Check if user exists in custom users table
//     const { data: user, error } = await supabaseAdmin
//       .from("users")
//       .select("id, email, name, password")
//       .eq("email", email)
//       .single();

//     if (error || !user) {
//       return NextResponse.json(
//         { success: false, needsSignup: true, error: "No account found with this email" },
//         { status: 404 }
//       );
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return NextResponse.json(
//         { success: false, error: "Invalid password" },
//         { status: 401 }
//       );
//     }

//     // ✅ Custom auth only — return user manually (no Supabase session)
//     return NextResponse.json({
//       success: true,
//       user: {
//         id: user.id,
//         email: user.email,
//         name: user.name,
//       },
//     });
//   } catch (err) {
//     console.error("Signin error:", err);
//     return NextResponse.json(
//       { success: false, error: "Server error" },
//       { status: 500 }
//     );
//   }
// }
