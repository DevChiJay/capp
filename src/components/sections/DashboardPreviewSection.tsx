import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BarChart, Link2, Globe, ArrowRight } from "lucide-react"

export function DashboardPreviewSection() {
  return (
    <section className="bg-gray-50 py-16 md:py-24" id="features">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <h2 className="mb-4 font-heading text-3xl font-bold md:text-4xl">Powerful analytics at your fingertips</h2>
            <p className="mb-6 text-lg text-gray-600">
              Everything you need to manage, track, and optimize your shortened URLs.
            </p>
            <ul className="mb-8 space-y-4">
              <li className="flex items-start">
                <div className="mr-3 mt-1 rounded-full bg-navyblue-100 p-2 text-navyblue-500">
                  <Link2 className="h-4 w-4" />
                </div>
                <span className="mt-1">Create, edit, and organize your links</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1 rounded-full bg-indigo-100 p-2 text-indigo-600">
                  <Globe className="h-4 w-4" />
                </div>
                <span className="mt-1">Use your own branded domain</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1 rounded-full bg-purple-100 p-2 text-purple-600">
                  <BarChart className="h-4 w-4" />
                </div>
                <span className="mt-1">Track clicks and browser referrers</span>
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
  )
}
