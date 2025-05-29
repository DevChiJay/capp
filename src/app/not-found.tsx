"use client"

import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-navyblue-50 via-white to-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8">
              <h1 className="mb-4 text-8xl font-bold text-navyblue-500">404</h1>
              <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
                Page Not Found
              </h2>
              <p className="text-lg text-gray-600">
                Sorry, we couldn't find the page you're looking for. The link might be broken or the page may have been moved.
              </p>
            </div>

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go Home
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="#" onClick={() => window.history.back()}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Link>
              </Button>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold">What you can do:</h3>
              <ul className="space-y-2 text-left text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-navyblue-500">•</span>
                  Check the URL for typos
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-navyblue-500">•</span>
                  Use the navigation menu to find what you're looking for
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-navyblue-500">•</span>
                  Visit our <Link href="/" className="text-navyblue-500 hover:underline">homepage</Link> to start fresh
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-1 text-navyblue-500">•</span>
                  <Link href="/#contact" className="text-navyblue-500 hover:underline">Contact us</Link> if you think this is an error
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
