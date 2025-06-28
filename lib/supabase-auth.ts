import { useSession } from "next-auth/react";
import { supabase, supabaseAdmin } from "./supabase";
import { Session } from "next-auth";

export function useSupabaseAuth() {
  const { data: session, status } = useSession();

  return {
    supabase,
    user: session?.user,
    isAuthenticated: !!session?.user,
    isLoading: status === "loading",
    session,
  };
}

export async function getServerSupabaseClient(session: Session | null) {
  if (!session) {
    return supabase;
  }

  // For server-side operations, you can use the admin client
  // or create a client with the user's session token
  return supabaseAdmin;
}

export { supabase, supabaseAdmin };
