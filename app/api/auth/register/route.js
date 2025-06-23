import { NextResponse } from "next/server"
import { getDB } from "@/lib/db"
import { hashPassword, generateToken } from "@/lib/auth"

export async function POST(request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const db = await getDB()
    const users = db.collection("users")

    // Check if user already exists
    const existingUser = await users.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(password)
    const result = await users.insertOne({
      email,
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
    })

    // Generate token
    const token = generateToken(result.insertedId)

    return NextResponse.json({
      message: "User created successfully",
      token,
      user: {
        id: result.insertedId,
        email,
        role: "user",
      },
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
