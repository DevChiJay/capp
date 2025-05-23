import { mockLinks, mockLinkStats, mockDomains, mockUser } from "./mock-data"
import type { ShortLink, UrlFormData, LinkStats, User, LoginCredentials, SignupCredentials, AuthTokens } from "./types"

// Mock API client that uses the mock data instead of real API calls
// IMPORTANT: Replace this with the real API client when connecting to your backend

class MockApiClient {
  // Auth methods
  async login(credentials: LoginCredentials): Promise<AuthTokens> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Simple validation
    if (credentials.email === "demo@example.com" && credentials.password === "password") {
      return {
        accessToken: "mock-access-token",
        refreshToken: "mock-refresh-token",
      }
    }

    throw new Error("Invalid credentials")
  }

  async signup(credentials: SignupCredentials): Promise<AuthTokens> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
    }
  }

  async getUser(): Promise<User> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    return mockUser
  }

  // Links methods
  async getLinks(page = 1, limit = 10): Promise<{ links: ShortLink[]; total: number }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    const start = (page - 1) * limit
    const end = start + limit
    const paginatedLinks = mockLinks.slice(start, end)

    return {
      links: paginatedLinks,
      total: mockLinks.length,
    }
  }

  async createLink(data: UrlFormData): Promise<ShortLink> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Generate a random short code
    const shortCode = Math.random().toString(36).substring(2, 8)

    const newLink: ShortLink = {
      id: `link-${Date.now()}`,
      originalUrl: data.originalUrl,
      shortCode: data.customSlug || shortCode,
      customSlug: data.customSlug,
      domain: data.domain || mockDomains[0],
      description: data.description,
      expiresAt: data.expiresAt,
      createdAt: new Date().toISOString(),
      userId: mockUser.id,
      clicks: 0,
    }

    // In a real implementation, this would add to the database
    // For mock purposes, we're not actually updating the mockLinks array

    return newLink
  }

  async updateLink(id: string, data: Partial<UrlFormData>): Promise<ShortLink> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const link = mockLinks.find((link) => link.id === id)

    if (!link) {
      throw new Error("Link not found")
    }

    // Create an updated version of the link
    const updatedLink: ShortLink = {
      ...link,
      customSlug: data.customSlug !== undefined ? data.customSlug : link.customSlug,
      domain: data.domain || link.domain,
      description: data.description !== undefined ? data.description : link.description,
      expiresAt: data.expiresAt !== undefined ? data.expiresAt : link.expiresAt,
    }

    // In a real implementation, this would update the database
    // For mock purposes, we're returning the updated link without modifying the original

    return updatedLink
  }

  async deleteLink(id: string): Promise<boolean> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const linkIndex = mockLinks.findIndex((link) => link.id === id)

    if (linkIndex === -1) {
      throw new Error("Link not found")
    }

    // In a real implementation, this would delete from the database
    // For mock purposes, we're not actually removing from the mockLinks array

    return true
  }

  async getLinkStats(id: string): Promise<LinkStats> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const stats = mockLinkStats[id]

    if (!stats) {
      // If no specific stats exist for this ID, return generic stats
      return {
        totalClicks: Math.floor(Math.random() * 100),
        clicksByDay: [
          { date: "2023-05-01", clicks: Math.floor(Math.random() * 20) },
          { date: "2023-05-02", clicks: Math.floor(Math.random() * 20) },
          { date: "2023-05-03", clicks: Math.floor(Math.random() * 20) },
          { date: "2023-05-04", clicks: Math.floor(Math.random() * 20) },
        ],
        referrers: [
          { source: "Direct", count: Math.floor(Math.random() * 50) },
          { source: "Google", count: Math.floor(Math.random() * 30) },
        ],
        browsers: [
          { name: "Chrome", count: Math.floor(Math.random() * 60) },
          { name: "Firefox", count: Math.floor(Math.random() * 20) },
          { name: "Safari", count: Math.floor(Math.random() * 15) },
        ],
        countries: [
          { name: "United States", count: Math.floor(Math.random() * 40) },
          { name: "Germany", count: Math.floor(Math.random() * 20) },
          { name: "United Kingdom", count: Math.floor(Math.random() * 15) },
        ],
      }
    }

    return stats
  }

  async getDomains(): Promise<string[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200))

    return mockDomains
  }
}

// Create and export an instance of the mock API client
const apiClient = new MockApiClient()

export default apiClient

/*
 * IMPORTANT: RESTORE REAL API CLIENT WHEN CONNECTING TO YOUR BACKEND
 *
 * To restore the real API client:
 * 1. Uncomment the original axios-based implementation
 * 2. Set the NEXT_PUBLIC_API_URL environment variable
 * 3. Remove or comment out the mock implementation above
 *
 * Original implementation:
 *
 * import axios, { type AxiosError, type AxiosInstance } from "axios"
 * import { getAuthTokens, setAuthTokens, clearAuthTokens } from "./auth"
 * import type { ApiResponse, AuthTokens } from "./types"
 *
 * // Create axios instance
 * const apiClient: AxiosInstance = axios.create({
 *   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api",
 *   headers: {
 *     "Content-Type": "application/json",
 *   },
 * })
 *
 * // Add request interceptor for authentication
 * apiClient.interceptors.request.use(
 *   (config) => {
 *     const tokens = getAuthTokens()
 *     if (tokens?.accessToken) {
 *       config.headers.Authorization = `Bearer ${tokens.accessToken}`
 *     }
 *     return config
 *   },
 *   (error) => Promise.reject(error),
 * )
 *
 * // Add response interceptor for token refresh
 * apiClient.interceptors.response.use(
 *   (response) => response,
 *   async (error: AxiosError) => {
 *     const originalRequest = error.config
 *
 *     // If error is 401 and we have a refresh token, try to refresh
 *     if (error.response?.status === 401 && !originalRequest?.headers?.["X-Retry"]) {
 *       const tokens = getAuthTokens()
 *
 *       if (tokens?.refreshToken) {
 *         try {
 *           // Set retry flag to prevent infinite loops
 *           if (originalRequest) {
 *             originalRequest.headers = originalRequest.headers || {}
 *             originalRequest.headers["X-Retry"] = "true"
 *           }
 *
 *           // Call refresh token endpoint
 *           const response = await axios.post<ApiResponse<AuthTokens>>(
 *             `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
 *             { refreshToken: tokens.refreshToken },
 *           )
 *
 *           if (response.data.success && response.data.data) {
 *             // Update tokens in storage
 *             setAuthTokens(response.data.data)
 *
 *             // Retry original request with new token
 *             if (originalRequest) {
 *               originalRequest.headers.Authorization = `Bearer ${response.data.data.accessToken}`
 *               return axios(originalRequest)
 *             }
 *           }
 *         } catch (refreshError) {
 *           // If refresh fails, clear tokens and redirect to login
 *           clearAuthTokens()
 *           window.location.href = "/login"
 *           return Promise.reject(refreshError)
 *         }
 *       }
 *     }
 *
 *     return Promise.reject(error)
 *   },
 * )
 *
 * export default apiClient
 */
