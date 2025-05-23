"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import type { User, LoginCredentials, SignupCredentials } from "./types"
import apiClient from "./api-client"
import { setAuthTokens, getAuthTokens, clearAuthTokens } from "./auth"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<boolean>
  signup: (credentials: SignupCredentials) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      const tokens = getAuthTokens()
      if (tokens?.accessToken) {
        try {
          // Fetch user profile using mock API
          const userData = await apiClient.getUser()
          setUser(userData)
        } catch (error) {
          console.error("Failed to fetch user profile:", error)
          clearAuthTokens()
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setIsLoading(true)

      // Call mock login API
      const tokens = await apiClient.login(credentials)

      // Store tokens
      setAuthTokens(tokens)

      // Fetch user profile
      const userData = await apiClient.getUser()
      setUser(userData)

      return true
    } catch (error) {
      console.error("Login failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (credentials: SignupCredentials): Promise<boolean> => {
    try {
      setIsLoading(true)

      // Call mock signup API
      const tokens = await apiClient.signup(credentials)

      // Store tokens
      setAuthTokens(tokens)

      // Fetch user profile
      const userData = await apiClient.getUser()
      setUser(userData)

      return true
    } catch (error) {
      console.error("Signup failed:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    clearAuthTokens()
    setUser(null)
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

/*
 * IMPORTANT: When connecting to your real backend:
 * 1. Replace the mock API calls with real API calls
 * 2. Ensure proper error handling for API responses
 * 3. Update the token refresh logic if needed
 */
