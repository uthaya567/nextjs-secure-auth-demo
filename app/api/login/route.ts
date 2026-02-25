import { NextResponse } from "next/server"
import { cookies } from "next/headers"

interface User {
  id: string
  name: string
  email: string
  password: string
}

/*
  ⚠️ It is demo purpose only.
  In real project you can use database (MongoDB / PostgreSQL)
*/
let users: User[] = [{
  id: "1",
  name: "Dev",
  email:"test@gmail.com",
  password: "111111"
}]

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    // Here i do Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      )
    }

    // Find user
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    )

    if (!foundUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      )
    }

    //I  Check password from demo
    if (foundUser.password !== password) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      )
    }

    // Create secure session cookie
    const cookieStore = await cookies()

    cookieStore.set({
      name: "session",
      value: JSON.stringify({
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
      }),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}