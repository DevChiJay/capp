"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import type { User, LoginCredentials, SignupCredentials, ApiResponse, AuthTokens } from "./types"
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
  const router = useRouter()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InnerAuthProvider router={router}>{children}</InnerAuthProvider>
    </Suspense>
  )
}

function InnerAuthProvider({ children, router }: { children: ReactNode; router: ReturnType<typeof useRouter> }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()

  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      const tokens = getAuthTokens()
      if (tokens?.accessToken) {
        try {
          // Fetch user profile
          const response = await apiClient.get<ApiResponse<User>>("/auth/profile")
          if (response.data.success && response.data.user) {
            setUser(response.data.user)
          } else {
            clearAuthTokens()
          }
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
      const response = await apiClient.post<ApiResponse<AuthTokens>>("/auth/login", credentials)

      if (response.data.success && response.data.data) {
        setAuthTokens(response.data.data)
        setUser(response.data.data.user)
        
        // Check for callback URL
        const callbackUrl = searchParams?.get("callbackUrl") || "/dashboard"
        router.push(callbackUrl)
        return true
      }
      return false
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
      const response = await apiClient.post<ApiResponse<AuthTokens>>("/auth/register", credentials)

      if (response.data.success && response.data.data) {
        setAuthTokens(response.data.data)
        setUser(response.data.data.user)
        router.push("/dashboard")
        return true
      }
      return false
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

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
