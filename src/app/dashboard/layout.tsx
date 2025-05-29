import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard | Capp URL Shortener",
  description: "Manage your shortened URLs, track analytics, and create new short links.",
  keywords: "URL dashboard, link management, analytics, URL tracking, short links",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
}
