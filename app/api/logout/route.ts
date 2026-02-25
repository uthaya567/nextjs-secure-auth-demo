import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/LoginPage", request.url))

  response.cookies.set("session", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
  })

  return response
}