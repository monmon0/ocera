// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
// import { SupabaseAdapter } from "@auth/supabase-adapter"

export const authOptions: NextAuthOptions = {
  // Temporarily disable Supabase adapter for development
  // adapter: SupabaseAdapter({
  //   url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  // }),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // You can add custom logic here for handling referral codes
      // For example, check if it's a new user and if referral code is provided
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.provider = token.provider as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Handle referral code in redirect
      if (url.includes("referral=")) {
        const urlObj = new URL(url, baseUrl);
        const referralCode = urlObj.searchParams.get("referral");

        // Here you can save the referral code to your database
        // or handle it according to your business logic
        console.log("Referral code:", referralCode);

        // Redirect to dashboard or wherever you want after signup
        return `${baseUrl}/dashboard?welcome=true`;
      }

      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      if (isNewUser) {
        console.log("New user signed up:", user.email);
        // Handle new user signup logic here
        // You can save referral information, send welcome emails, etc.
      }
    },
  },
  debug: process.env.NODE_ENV === "development",
};
