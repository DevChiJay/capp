import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { UrlForm } from "@/components/UrlForm"
import { BarChart, Link2, Globe, QrCode, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-4xl">
                Cut your long links
              </h1>

              <div className="mx-auto max-w-3xl rounded-xl border bg-white p-6 shadow-sm">
                <UrlForm />
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">Powerful analytics at your fingertips</h2>
                <p className="mb-6 text-lg text-gray-600">
                  Everything you need to manage, track, and optimize your shortened URLs.
                </p>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 rounded-full bg-green-100 p-1 text-green-600">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Create, edit, and organize your links</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 rounded-full bg-green-100 p-1 text-green-600">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Use your own branded domain</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 rounded-full bg-green-100 p-1 text-green-600">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Track clicks and browsers referrers</span>
                  </li>
                </ul>
                <Button asChild size="lg">
                  <Link href="/signup">
                    Get started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="rounded-lg shadow-lg">
                <Image
                  src="/images/dashboard-preview.png"
                  alt="Analytics Dashboard"
                  width={600}
                  height={400}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mobile App Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="flex justify-center">
                <div className="relative h-[500px] w-[250px] rounded-3xl border-8 border-gray-800 bg-gray-800 shadow-xl">
                  <div className="absolute inset-x-0 top-0 z-10 h-6 rounded-t-xl bg-gray-800"></div>
                  <div className="absolute inset-0 overflow-hidden rounded-xl">
                    <Image
                      src="/placeholder.svg?height=500&width=250"
                      alt="Mobile App"
                      width={250}
                      height={500}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h2 className="mb-4 text-3xl font-bold md:text-4xl">Shorten URLs on the go</h2>
                <p className="mb-6 text-lg text-gray-600">
                  Download our mobile app to create and manage shortened links from anywhere. Track analytics and
                  generate QR codes directly from your phone.
                </p>
                <div className="mb-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Button variant="outline" size="lg" className="flex items-center justify-center">
                    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.9 19.9l-5.4-5.4 5.4-5.4c.39-.39.39-1.02 0-1.41s-1.02-.39-1.41 0l-5.4 5.4-5.4-5.4c-.39-.39-1.02-.39-1.41 0s-.39 1.02 0 1.41l5.4 5.4-5.4 5.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l5.4-5.4 5.4 5.4c.39.39 1.02.39 1.41 0 .38-.39.39-1.03 0-1.42z" />
                    </svg>
                    Download for Android
                  </Button>
                  <div className="flex items-center justify-center rounded-lg border border-gray-300 p-4">
                    <QrCode className="h-24 w-24 text-gray-800" />
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Scan the QR code or click the button to download our mobile app.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-600 py-16 text-white md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to get started?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
              Join thousands of users who trust our platform for their link shortening needs.
            </p>
            <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/signup">Create Free Account</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white hover:bg-blue-700" asChild>
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
