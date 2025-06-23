# Supabase + NextAuth Integration Setup Guide

## 🎯 Overview

This guide will help you complete the Supabase and NextAuth integration for the Ocera social platform.

## ✅ What's Already Done

- ✅ NextAuth API route fixed for App Router (`app/api/auth/[...nextauth]/route.ts`)
- ✅ Supabase adapter configured in NextAuth
- ✅ Supabase client setup (`lib/supabase.ts`)
- ✅ Auth utilities created (`lib/supabase-auth.ts`)
- ✅ Database schema provided (`supabase-schema.sql`)
- ✅ Environment variables template (`.env.example`)

## 🚀 Setup Steps

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your project URL and API keys

### 2. Set Up Database Schema

1. In your Supabase dashboard, go to the SQL Editor
2. Copy and paste the contents of `supabase-schema.sql`
3. Run the SQL to create the required NextAuth tables

### 3. Configure Environment Variables

1. Update `.env.local` with your real Supabase credentials:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-secret-key
   ```

### 4. Set Up OAuth Providers

#### Google OAuth:

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)

#### Facebook OAuth:

1. Go to [Facebook Developers](https://developers.facebook.com)
2. Create a new app
3. Add Facebook Login product
4. Configure valid OAuth redirect URIs:
   - `http://localhost:3000/api/auth/callback/facebook`

### 5. Update Environment Variables

```env
# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-random-32-character-string
```

### 6. Test the Integration

1. Restart your development server
2. Navigate to your app
3. Try signing in with Google or Facebook
4. Check Supabase dashboard to see if user data is being stored

## 🔧 Usage Examples

### Client-side auth check:

```tsx
import { useSession } from "next-auth/react";
import { useSupabaseAuth } from "@/lib/supabase-auth";

export function MyComponent() {
  const { data: session } = useSession();
  const { supabase, user, isAuthenticated } = useSupabaseAuth();

  if (!isAuthenticated) {
    return <div>Please sign in</div>;
  }

  // Use supabase client for database operations
  // User data is automatically synced with Supabase
}
```

### Server-side data fetching:

```tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getServerSupabaseClient } from "@/lib/supabase-auth";

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return { redirect: { destination: "/", permanent: false } };
  }

  const supabase = await getServerSupabaseClient(session);
  // Use supabase for server-side operations
}
```

## 🛠️ Troubleshooting

### Common Issues:

1. **CLIENT_FETCH_ERROR**: Make sure environment variables are correctly set
2. **Database connection errors**: Verify Supabase credentials and database schema
3. **OAuth redirect errors**: Check callback URLs in provider settings
4. **Session not persisting**: Ensure `NEXTAUTH_SECRET` is set

### Debug Mode:

The auth configuration includes debug mode for development. Check browser console and server logs for detailed error messages.

## 🔐 Security Notes

- Keep your `SUPABASE_SERVICE_ROLE_KEY` secure and never expose it client-side
- Use Row Level Security (RLS) in Supabase for additional data protection
- Consider enabling email verification in your auth flow
- Use HTTPS in production and update redirect URIs accordingly

## 📚 Additional Features to Implement

- Email verification
- Password reset functionality
- User profile management
- Social login account linking
- Referral system integration
