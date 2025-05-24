import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Protected routes that require authentication
const protectedRoutes = ["/dashboard", "/settings"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for system paths
  if (pathname.startsWith('/_next') || 
      pathname === '/favicon.ico') {
    return NextResponse.next();
  }

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`))

  if (isProtectedRoute) {
    // Check for auth token in cookies
    const authTokensStr = request.cookies.get("auth_tokens")?.value

    if (!authTokensStr) {
      // No auth tokens in cookies - redirect to login
      const url = new URL("/login", request.url)
      url.searchParams.set("callbackUrl", encodeURI(pathname))
      return NextResponse.redirect(url)
    }
    
    try {
      // Optionally validate the token here if needed
      const authTokens = JSON.parse(authTokensStr)
      if (!authTokens.accessToken) {
        throw new Error("Invalid token")
      }
    } catch (e) {
      // Invalid token format, redirect to login
      const url = new URL("/login", request.url)
      url.searchParams.set("callbackUrl", encodeURI(pathname))
      return NextResponse.redirect(url)
    }
    
    return NextResponse.next()
  }

  // Skip middleware for auth-related pages and protected routes (already handled)
  if (pathname.startsWith('/login') || 
      pathname.startsWith('/signup')) {
    return NextResponse.next();
  }

  // Handle short URL redirects
  const shortCode = pathname.slice(1);
  
  // Skip if no shortCode
  if (!shortCode) {
    return NextResponse.next();
  }
  
  try {
    // Check if shortCode exists in your backend
    const response = await fetch(`http://localhost:4000/${shortCode}`, {
      redirect: 'manual',
    });
    
    if (response.status === 301 || response.status === 302) {
      const redirectUrl = response.headers.get('location');
      
      if (redirectUrl) {
        // Redirect to the original URL
        return NextResponse.redirect(redirectUrl);
      }
    }
  } catch (error) {
    console.error('Error in middleware:', error);
  }
  
  // Continue to the actual page if no redirect happens
  return NextResponse.next()
}

// Updated matcher to run on all routes
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
}
