"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { PricingPlan, formatPrice } from "@/lib/pricing"
import { Check } from "lucide-react"

interface PriceProps {
  plan: PricingPlan
  currency: string
  symbol: string
  isAnnual: boolean
}

export function Price({ plan, currency, symbol, isAnnual }: PriceProps) {
  const price = isAnnual ? plan.lifetimePrice : plan.monthlyPrice
  const priceValue = currency === "USD" ? price.usd : price.ngn

  return (
    <Card className={`flex flex-col ${plan.popular ? "border-blue-600 shadow-lg" : ""}`}>
      {plan.popular && (
        <div className="absolute inset-x-0 -top-5 mx-auto w-32 rounded-full bg-blue-600 py-1 text-center text-xs font-medium text-white">
          Popular
        </div>
      )}
      <CardHeader className={plan.popular ? "pt-8" : ""}>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mb-6 mt-2">
          <span className="text-4xl font-bold">{formatPrice(priceValue, currency)}</span>
          {priceValue > 0 && (
            <span className="ml-2 text-gray-500">
              {isAnnual ? "lifetime" : "/month"}
            </span>
          )}
        </div>
        <ul className="mb-6 space-y-2">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-center">
              <Check className="mr-2 h-4 w-4 text-green-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          variant={plan.popular ? "default" : "outline"}
          className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
        >
          {plan.cta}
        </Button>
      </CardFooter>
    </Card>
  )
}
