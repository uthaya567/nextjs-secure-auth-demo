import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value
  const { pathname } = request.nextUrl

  const isLoginPage = pathname.startsWith("/LoginPage")
  const isHomePage = pathname.startsWith("/homePage")

  // 🔐 If NOT logged in → protect homePage
  if (!session && isHomePage) {
    return NextResponse.redirect(new URL("/LoginPage", request.url))
  }

  // 🚫 If logged in → prevent visiting login page
  if (session && isLoginPage) {
    return NextResponse.redirect(new URL("/homePage", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/homePage/:path*",
    "/LoginPage",
  ],
}