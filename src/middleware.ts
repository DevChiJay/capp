import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Protected routes that require authentication
const protectedRoutes = ["/dashboard", "/settings"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  if (isProtectedRoute) {
    // Check for auth token in cookies
    const authTokens = request.cookies.get("auth_tokens")

    if (!authTokens) {
      // Redirect to login if no auth token is found
      const url = new URL("/login", request.url)
      url.searchParams.set("callbackUrl", encodeURI(pathname))
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*"],
}
