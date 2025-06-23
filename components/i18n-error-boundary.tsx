"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface I18nErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function I18nErrorBoundary({
  children,
  fallback,
}: I18nErrorBoundaryProps) {
  const router = useRouter();

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (
        event.error?.message?.includes("useTranslations") ||
        event.error?.message?.includes("NextIntlClientProvider")
      ) {
        // Redirect to proper locale route
        router.push("/en");
      }
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, [router]);

  if (fallback) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
