"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLoading } from "@/contexts/loading-context";

export function usePageLoading() {
  const pathname = usePathname();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    // Only show loading for navigation between different routes
    // Don't show for initial page load or same route
    let timeoutId: NodeJS.Timeout;

    const handleRouteChange = () => {
      showLoading("Loading...");

      // Hide loading after a reasonable time
      timeoutId = setTimeout(() => {
        hideLoading();
      }, 800);
    };

    // Only trigger if this is a route change, not initial load
    if (pathname && pathname !== "/") {
      handleRouteChange();
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      hideLoading();
    };
  }, [pathname, showLoading, hideLoading]);

  return { showLoading, hideLoading };
}

// Custom hook for specific loading operations
export function useCustomLoading() {
  const { showLoading, hideLoading } = useLoading();

  const showSignInLoading = () => showLoading("Signing you in...");
  const showProfileLoading = () => showLoading("Loading profile...");
  const showSavingLoading = () => showLoading("Saving changes...");
  const showCreatingOCLoading = () => showLoading("Creating your OC...");
  const showUploadingLoading = () => showLoading("Uploading...");

  return {
    showLoading,
    hideLoading,
    showSignInLoading,
    showProfileLoading,
    showSavingLoading,
    showCreatingOCLoading,
    showUploadingLoading,
  };
}
