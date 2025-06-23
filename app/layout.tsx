import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Footer from "@/components/footer"
import { Providers } from './providers'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ocera - Original Character Social Platform",
  description:
    "The ultimate social platform for Original Character creators. Share, discover, and connect with fellow artists.",
  keywords: "original characters, OC, art, social media, creators, fantasy, character design",
    generator: 'v0.dev'
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        </Providers>
      </body>
    </html>
  )
}