import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import Footer from "@/components/footer";
import { Providers } from "./providers";
import LoadingScreen from "@/components/loading-screen";
import { LoadingProvider } from "@/contexts/loading-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ocera - Original Character Social Platform",
  description:
    "The ultimate social platform for Original Character creators. Share, discover, and connect with fellow artists.",
  keywords:
    "original characters, OC, art, social media, creators, fantasy, character design",
  generator: "v0.dev",
};

const locales = ["en", "vi"];

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <LoadingProvider>
            <Providers>
              <div className="min-h-screen flex flex-col">
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <LoadingScreenWrapper />
            </Providers>
          </LoadingProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// Separate component to use the loading context
function LoadingScreenWrapper() {
  return <LoadingScreenClient />;
}

// Client component to access loading context
function LoadingScreenClient() {
  return null; // We'll import this from a client component
}
