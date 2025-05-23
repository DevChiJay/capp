import type { ShortLink, LinkStats, User } from "./types"

// Mock user data
export const mockUser: User = {
  id: "user-1",
  email: "demo@example.com",
  name: "Demo User",
  createdAt: new Date().toISOString(),
}

// Mock links data
export const mockLinks: ShortLink[] = [
  {
    id: "link-1",
    originalUrl: "https://example.com/very/long/url/that/needs/to/be/shortened/for/better/sharing",
    shortCode: "abc123",
    customSlug: "example",
    domain: "short.ly",
    createdAt: new Date().toISOString(),
    userId: "user-1",
    clicks: 42,
    description: "Example website homepage",
  },
  {
    id: "link-2",
    originalUrl: "https://docs.google.com/document/d/1234567890abcdefghijklmnopqrstuvwxyz",
    shortCode: "def456",
    domain: "short.ly",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    userId: "user-1",
    clicks: 17,
  },
  {
    id: "link-3",
    originalUrl: "https://github.com/vercel/next.js",
    shortCode: "ghi789",
    domain: "s.id",
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    userId: "user-1",
    clicks: 128,
    description: "Next.js GitHub repository",
  },
  {
    id: "link-4",
    originalUrl: "https://tailwindcss.com/docs/installation",
    shortCode: "jkl012",
    domain: "short.ly",
    createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    userId: "user-1",
    clicks: 5,
    description: "Tailwind CSS installation guide",
  },
  {
    id: "link-5",
    originalUrl: "https://react-query.tanstack.com/overview",
    shortCode: "mno345",
    domain: "s.id",
    createdAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
    userId: "user-1",
    clicks: 73,
  },
]

// Mock link stats
export const mockLinkStats: Record<string, LinkStats> = {
  "link-1": {
    totalClicks: 42,
    clicksByDay: [
      { date: "2023-05-01", clicks: 10 },
      { date: "2023-05-02", clicks: 15 },
      { date: "2023-05-03", clicks: 7 },
      { date: "2023-05-04", clicks: 10 },
    ],
    referrers: [
      { source: "Direct", count: 20 },
      { source: "Twitter", count: 12 },
      { source: "Facebook", count: 8 },
      { source: "LinkedIn", count: 2 },
    ],
    browsers: [
      { name: "Chrome", count: 25 },
      { name: "Firefox", count: 10 },
      { name: "Safari", count: 5 },
      { name: "Edge", count: 2 },
    ],
    countries: [
      { name: "United States", count: 20 },
      { name: "United Kingdom", count: 8 },
      { name: "Germany", count: 7 },
      { name: "Canada", count: 5 },
      { name: "Other", count: 2 },
    ],
  },
  "link-2": {
    totalClicks: 17,
    clicksByDay: [
      { date: "2023-05-01", clicks: 5 },
      { date: "2023-05-02", clicks: 3 },
      { date: "2023-05-03", clicks: 4 },
      { date: "2023-05-04", clicks: 5 },
    ],
    referrers: [
      { source: "Direct", count: 10 },
      { source: "Google", count: 7 },
    ],
    browsers: [
      { name: "Chrome", count: 12 },
      { name: "Firefox", count: 3 },
      { name: "Safari", count: 2 },
    ],
    countries: [
      { name: "United States", count: 8 },
      { name: "Canada", count: 5 },
      { name: "France", count: 4 },
    ],
  },
  "link-3": {
    totalClicks: 128,
    clicksByDay: [
      { date: "2023-05-01", clicks: 30 },
      { date: "2023-05-02", clicks: 42 },
      { date: "2023-05-03", clicks: 28 },
      { date: "2023-05-04", clicks: 28 },
    ],
    referrers: [
      { source: "GitHub", count: 50 },
      { source: "Twitter", count: 30 },
      { source: "Direct", count: 28 },
      { source: "Reddit", count: 20 },
    ],
    browsers: [
      { name: "Chrome", count: 80 },
      { name: "Firefox", count: 30 },
      { name: "Safari", count: 15 },
      { name: "Edge", count: 3 },
    ],
    countries: [
      { name: "United States", count: 45 },
      { name: "India", count: 25 },
      { name: "Germany", count: 20 },
      { name: "United Kingdom", count: 18 },
      { name: "Other", count: 20 },
    ],
  },
}

// Mock available domains
export const mockDomains = ["short.ly", "s.id", "link.me"]
