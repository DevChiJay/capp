"use client"

import { Suspense } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { UrlForm } from "@/components/UrlForm"
import { LinksTable } from "@/components/LinksTable"
import { Skeleton } from "@/components/ui/skeleton"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

          <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Shorten a URL</h2>
            <UrlForm />
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Your Links</h2>
            <Suspense fallback={<Skeleton className="h-64 w-full" />}>
              <LinksTable />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
