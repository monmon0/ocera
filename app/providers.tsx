"use client";

import { ThemeProvider } from "@/components/theme-provider";

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
          {/* <UserProvider> */}
            {children}

          {/* </UserProvider> */}
        {/* </SupabaseAuthProvider> */}
      </LoadingProvider>
    </ThemeProvider>
  );
}
