"use client";

import Navigation from "./navigation";
import { usePathname } from "next/navigation";

export default function NavigationWrapper() {
  const pathname = usePathname();

  // Only render navigation if we're in a locale route
  if (!pathname.startsWith("/en") && !pathname.startsWith("/vi")) {
    return null;
  }

  return <Navigation />;
}
