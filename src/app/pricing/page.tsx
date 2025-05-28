"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Price } from "@/components/Price"
import { useCountryDetection } from "@/lib/country-detection"
import { getPricingForCountry } from "@/lib/pricing"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const { country, loading } = useCountryDetection()
  const { currency, symbol, plans } = getPricingForCountry(country)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Choose Your Plan
              </h1>
              <p className="mb-10 text-lg text-gray-600">
                Get started for free or upgrade to Pro for advanced features and priority support.
              </p>

              <div className="mb-10 flex items-center justify-center space-x-4">
                <span className={`text-sm font-medium ${!isAnnual ? "text-navyblue-500" : "text-gray-600"}`}>
                  Monthly
                </span>
                <Switch
                  checked={isAnnual}
                  onCheckedChange={setIsAnnual}
                  className="data-[state=checked]:bg-navyblue-500"
                />
                <span className={`text-sm font-medium ${isAnnual ? "text-navyblue-500" : "text-gray-600"}`}>
                  Lifetime
                  <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                    Save 40%+
                  </span>
                </span>
              </div>

              {loading ? (
                <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="h-[400px] animate-pulse rounded-lg bg-gray-200"></div>
                  ))}
                </div>
              ) : (
                <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
                  {plans.map((plan) => (
                    <Price
                      key={plan.name}
                      plan={plan}
                      currency={currency}
                      symbol={symbol}
                      isAnnual={isAnnual}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold">Frequently Asked Questions</h2>
              <div className="space-y-6 text-left">
                <div>
                  <h3 className="mb-2 text-xl font-medium">What happens when I reach my URL limit?</h3>
                  <p className="text-gray-600">
                    Free accounts are limited to 10 URLs. Pro accounts can manage up to 50 URLs. You'll receive a notification when you're approaching your limit.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-medium">Can I switch between plans?</h3>
                  <p className="text-gray-600">
                    Yes! You can upgrade from Free to Pro at any time. You can also switch between monthly and lifetime subscriptions.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-medium">What payment methods do you accept?</h3>
                  <p className="text-gray-600">
                    We accept all major credit cards, PayPal, and in some regions, local payment methods.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-medium">Is there a refund policy?</h3>
                  <p className="text-gray-600">
                    We offer a 14-day money-back guarantee for all Pro subscriptions. If you're not satisfied, contact our support team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-navyblue-500 py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to supercharge your links?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-navyblue-100">
              Join thousands of users who trust our platform for their link shortening needs.
            </p>
            <div className="inline-flex items-center rounded-md bg-white px-6 py-3 font-medium text-navyblue-500 shadow-lg hover:bg-gray-100">
              Get started for free
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
