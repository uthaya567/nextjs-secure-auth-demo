import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

type User = {
  name: string
  email: string
  password: string
}

// Temporary in-memory database (you can replace with MongoDB later)
let users: User[] = [{
  name: "Dev",
  email:"test@gmail.com",
  password: "111111"
}]

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      )
    }

    const existingUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    )

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const username = email.split("@")[0]

    users.push({
      name: username,
      email,
      password: hashedPassword,
    })

    return NextResponse.json({ message: "Registered successfully" })
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}