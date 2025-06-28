"use client";

import { LoadingProvider, useLoading } from "@/contexts/loading-context";
import { SupabaseAuthProvider } from "@/contexts/supabase-auth-context";
import LoadingScreen from "@/components/loading-screen";

function LoadingScreenWrapper() {
  const { isLoading, loadingMessage } = useLoading();
  return (
    <LoadingScreen
      isLoading={isLoading}
      message={loadingMessage || "Loading..."}
    />
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SupabaseAuthProvider>
      <LoadingProvider>
        {children}
        <LoadingScreenWrapper />
      </LoadingProvider>
    </SupabaseAuthProvider>
  );
}
