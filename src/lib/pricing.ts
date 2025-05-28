export interface PricingPlan {
  name: string
  description: string
  features: string[]
  monthlyPrice: {
    usd: number
    ngn: number
  }
  lifetimePrice: {
    usd: number
    ngn: number
  }
  cta: string
  popular?: boolean
}

export interface PricingDisplay {
  currency: string
  symbol: string
  monthlyPrice: number
  lifetimePrice: number
}

export const FREE_PLAN: PricingPlan = {
  name: "Free",
  description: "For individuals and small projects",
  features: [
    "Up to 10 shortened URLs",
    "Basic analytics",
    "Standard support",
    "No custom domains"
  ],
  monthlyPrice: {
    usd: 0,
    ngn: 0
  },
  lifetimePrice: {
    usd: 0,
    ngn: 0
  },
  cta: "Get Started"
}

export const PRO_PLAN: PricingPlan = {
  name: "Pro",
  description: "For professionals and businesses",
  features: [
    "Up to 50 shortened URLs",
    "Advanced analytics",
    "Priority support",
    "Custom branded domains",
    "QR code generation",
    "Regular updates"
  ],
  monthlyPrice: {
    usd: 7,
    ngn: 5000
  },
  lifetimePrice: {
    usd: 50,
    ngn: 45000
  },
  cta: "Upgrade to Pro",
  popular: true
}

export const formatPrice = (
  price: number, 
  currency: string
): string => {
  if (currency === "USD") {
    return `$${price}`
  } else if (currency === "NGN") {
    return `₦${price.toLocaleString()}`
  }
  return `$${price}` // Default to USD
}

export const getPricingForCountry = (
  countryCode: string | null
): { 
  currency: string, 
  symbol: string,
  plans: PricingPlan[] 
} => {
  // Default to USD
  let currency = "USD"
  let symbol = "$"
  
  // If country is Nigeria, use NGN
  if (countryCode === "NG") {
    currency = "NGN"
    symbol = "₦"
  }
  
  return {
    currency,
    symbol,
    plans: [FREE_PLAN, PRO_PLAN]
  }
}
