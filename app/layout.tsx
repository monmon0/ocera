import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ocera - Original Character Social Platform",
  description:
    "The ultimate social platform for Original Character creators. Share, discover, and connect with fellow artists.",
  keywords:
    "original characters, OC, art, social media, creators, fantasy, character design",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
