import type { AuthTokens } from "./types"
import Cookies from 'js-cookie'

// Token storage functions
export const setAuthTokens = (tokens: AuthTokens): void => {
  // Store in localStorage for client-side access
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_tokens", JSON.stringify(tokens))
  }
  
  // Store in cookies for server-side (middleware) access
  Cookies.set("auth_tokens", JSON.stringify(tokens), { 
    expires: 7, // 7 days
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  })
}

export const getAuthTokens = (): AuthTokens | null => {
  if (typeof window !== "undefined") {
    // Try to get from cookies first
    const cookieData = Cookies.get("auth_tokens")
    if (cookieData) {
      try {
        return JSON.parse(cookieData)
      } catch (e) {
        // Invalid JSON in cookie, continue to localStorage
      }
    }
    
    // Fall back to localStorage
    const tokens = localStorage.getItem("auth_tokens")
    return tokens ? JSON.parse(tokens) : null
  }
  return null
}

export const clearAuthTokens = (): void => {
  if (typeof window !== "undefined") {
    // Clear from localStorage
    localStorage.removeItem("auth_tokens")
  }
  
  // Clear from cookies
  Cookies.remove("auth_tokens", { path: '/' })
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const tokens = getAuthTokens()
  return !!tokens?.accessToken
}

// Parse JWT token (without validation)
export const parseJwt = (token: string): any => {
  try {
    return JSON.parse(atob(token.split(".")[1]))
  } catch (e) {
    return null
  }
}

// Get user ID from token
export const getUserIdFromToken = (): string | null => {
  const tokens = getAuthTokens()
  if (!tokens?.accessToken) return null

  const decoded = parseJwt(tokens.accessToken)
  return decoded?.userId || null
}
