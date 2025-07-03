"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { SupabaseAuthProvider } from "@/contexts/supabase-auth-context";
import { useAppData } from "@/hooks/use-app-data";

function AppDataInitializer({ children }: { children: React.ReactNode }) {
  useAppData(); // This will sync auth state with the store
  return <>{children}</>;
}

import { LoadingProvider } from "@/contexts/loading-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <LoadingProvider>
        {/* <SupabaseAuthProvider> */}
            {children}
        {/* </SupabaseAuthProvider> */}
      </LoadingProvider>
    </ThemeProvider>
  );
}
