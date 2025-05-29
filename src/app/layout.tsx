import type React from "react"
import type { Metadata } from "next"
import { Outfit, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "./providers"

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-outfit",
})

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
})

export const metadata: Metadata = {
  title: "Free URL Shortener with QR Code | Capp",
  description: "Shorten URLs, generate QR codes, and unlock detailed insights with capp—the all-in-one solution for smarter link sharing.",
  keywords: "URL shortener, link shortening, short links, QR codes, link analytics, URL management, link tracking, custom URLs",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakarta.variable}`}>
      <body className="font-sans">
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  )
}
