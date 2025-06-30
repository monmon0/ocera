// // lib/auth.ts
// import { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import FacebookProvider from "next-auth/providers/facebook";
// import { SupabaseAdapter } from "@auth/supabase-adapter";
// import { supabaseAdmin } from "./supabase";

// export const authOptions: NextAuthOptions = {
//   adapter: SupabaseAdapter({
//     url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
//   }),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_CLIENT_ID || "",
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
//     }),
//   ],
//   session: {
//     strategy: "database",
//   },
//   callbacks: {
//     async signIn({ user, account, profile, email }) {
//       try {
//         // Check if this is a sign-in attempt (user already exists)
//         const { data: existingUser } = await supabaseAdmin
//           .from("users")
//           .select("id, is_approved")
//           .eq("email", user.email)
//           .single();

//         // If user exists, check if they're approved
//         if (existingUser) {
//           if (!existingUser.is_approved) {
//             console.log("User not approved:", user.email);
//             return false; // Prevent sign-in for unapproved users
//           }
//           return true; // Allow sign-in for approved users
//         }

//         // For new users, check if we have a referral code in the redirect URL
//         // We'll handle the actual user creation in the events callback
//         return true;
//       } catch (error) {
//         console.error("Error in signIn callback:", error);
//         return false;
//       }
//     },
//     async session({ session, user }) {
//       // Send properties to the client, like an access_token and user id from a provider.
//       if (session.user) {
//         session.user.id = user.id;
//       }
//       return session;
//     },
//     async redirect({ url, baseUrl }) {
//       // Handle referral code in redirect
//       if (url.includes("referral=")) {
//         const urlObj = new URL(url, baseUrl);
//         const referralCode = urlObj.searchParams.get("referral");

//         // Store referral code in URL for processing
//         return `${baseUrl}/dashboard?welcome=true&referral=${referralCode}`;
//       }

//       // Allows relative callback URLs
//       if (url.startsWith("/")) return `${baseUrl}${url}`;
//       // Allows callback URLs on the same origin
//       else if (new URL(url).origin === baseUrl) return url;
//       return baseUrl;
//     },
//   },
//   pages: {
//     signIn: "/",
//     error: "/auth/error",
//   },
//   events: {
//     async signIn({ user, account, profile, isNewUser }) {
//       if (isNewUser) {
//         try {
//           console.log("New user signed up:", user.email);

//           // Get referral code from localStorage or URL
//           // Note: This is a limitation - we'll need to handle referral codes differently
//           // For now, we'll create the user and handle referral separately

//           // Create user with default approval status
//           const { data: createdUser, error: userError } = await supabaseAdmin
//             .from("users")
//             .update({
//               is_approved: false, // New users need approval by default
//             })
//             .eq("email", user.email)
//             .select()
//             .single();

//           if (userError) {
//             console.error("Error updating user:", userError);
//           } else {
//             console.log("User created successfully:", createdUser);
//           }
//         } catch (error) {
//           console.error("Error in signIn event:", error);
//         }
//       }
//     },
//   },
//   debug: process.env.NODE_ENV === "development",
// };
