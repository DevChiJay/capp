// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  user?: T
  count?: number
  error?: string
}

export interface User {
  id: string
  email: string
  name?: string
  createdAt: string
}

export interface ShortLink {
  id: string
  originalUrl: string
  shortCode: string
  shortUrl: string
  customSlug?: string
  qrCode?: string
  expiresAt?: string
  description?: string
  createdAt: string
  userId: string
  clicks: number
}

export interface LinkStats {
  totalClicks: number
  clicksByDay: {
    date: string
    clicks: number
  }[]
  referrers: {
    source: string
    count: number
  }[]
  browsers: {
    name: string
    count: number
  }[]
  countries: {
    name: string
    count: number
  }[]
}

// Form Types
export interface UrlFormData {
  originalUrl: string
  customSlug?: string
  expirationDays?: number
  description?: string
}

// Auth Types
export interface AuthTokens {
  accessToken: string
  refreshToken: string
  user: User
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface SignupCredentials {
  email: string
  password: string
  name?: string
}
