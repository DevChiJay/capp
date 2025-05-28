"use client"

import { useState, useEffect } from "react"

interface CountryData {
  country: string | null
  loading: boolean
  error: Error | null
}

export const useCountryDetection = (): CountryData => {
  const [countryData, setCountryData] = useState<CountryData>({
    country: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const detectCountry = async () => {
      try {
        // Using ipinfo.io as it provides country information without requiring API keys
        const response = await fetch("https://ipinfo.io/json")
        if (!response.ok) {
          throw new Error("Failed to fetch country information")
        }
        
        const data = await response.json()
        setCountryData({
          country: data.country || null,
          loading: false,
          error: null,
        })
      } catch (error) {
        setCountryData({
          country: null,
          loading: false,
          error: error instanceof Error ? error : new Error("Unknown error occurred"),
        })
      }
    }

    detectCountry()
  }, [])

  return countryData
}
