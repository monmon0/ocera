"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLoading } from "@/contexts/loading-context";
import { useTranslations } from "next-intl";

export function usePageLoading() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setLoading } = useLoading();
  const t = useTranslations("Loading");

  useEffect(() => {
    // Show loading when route changes
    setLoading(true, t("default"));

    // Hide loading after a short delay to simulate page loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname, searchParams, setLoading, t]);

  return { setLoading };
}

// Custom hook for specific loading messages
export function useCustomLoading() {
  const { setLoading } = useLoading();
  const t = useTranslations("Loading");

  const showLoading = (messageKey: string) => {
    setLoading(true, t(messageKey as any));
  };

  const hideLoading = () => {
    setLoading(false);
  };

  return {
    showLoading,
    hideLoading,
    showDefaultLoading: () => showLoading("default"),
    showSignInLoading: () => showLoading("signingIn"),
    showProfileLoading: () => showLoading("loadingProfile"),
    showSavingLoading: () => showLoading("savingChanges"),
    showCreatingOCLoading: () => showLoading("creatingOC"),
    showUploadingLoading: () => showLoading("uploading"),
  };
}
