import type { AuthTokens } from "./types"

// Token storage functions
export const setAuthTokens = (tokens: AuthTokens): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_tokens", JSON.stringify(tokens))
  }
}

export const getAuthTokens = (): AuthTokens | null => {
  if (typeof window !== "undefined") {
    const tokens = localStorage.getItem("auth_tokens")
    return tokens ? JSON.parse(tokens) : null
  }
  return null
}

export const clearAuthTokens = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_tokens")
  }
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
