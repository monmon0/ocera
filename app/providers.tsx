
"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { SupabaseAuthProvider } from "@/contexts/supabase-auth-context";
import { useAppData } from "@/hooks/use-app-data";

function AppDataInitializer({ children }: { children: React.ReactNode }) {
  useAppData(); // This will sync auth state with the store
  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <SupabaseAuthProvider>
        <AppDataInitializer>
          {children}
        </AppDataInitializer>
      </SupabaseAuthProvider>
    </ThemeProvider>
  );
}
