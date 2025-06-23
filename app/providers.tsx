"use client";

import { SessionProvider } from "next-auth/react";
import { LoadingProvider, useLoading } from "@/contexts/loading-context";
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
    <SessionProvider>
      <LoadingProvider>
        {children}
        <LoadingScreenWrapper />
      </LoadingProvider>
    </SessionProvider>
  );
}
