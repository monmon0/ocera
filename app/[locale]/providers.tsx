"use client";

import { SessionProvider } from "next-auth/react";
import { useLoading } from "@/contexts/loading-context";
import LoadingScreen from "@/components/loading-screen";
import { useTranslations } from "next-intl";

function LoadingScreenWrapper() {
  const { isLoading, loadingMessage } = useLoading();
  const t = useTranslations("Loading");

  return (
    <LoadingScreen
      isLoading={isLoading}
      message={loadingMessage || t("default")}
    />
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <LoadingScreenWrapper />
    </SessionProvider>
  );
}
