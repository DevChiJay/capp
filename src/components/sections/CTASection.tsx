import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="bg-gradient-to-r from-navyblue-500 to-indigo-700 py-16 text-white md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="mb-4 text-3xl font-heading font-bold md:text-4xl">Ready to get started?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
          Join thousands of users who trust our platform for their link shortening needs.
        </p>
        <div className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button size="lg" variant="secondary" asChild className="font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
            <Link href="/signup">Create Free Account</Link>
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent text-white hover:bg-blue-700 border-2 font-semibold transition-all duration-200" asChild>
            <Link href="/pricing">View Pricing</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
