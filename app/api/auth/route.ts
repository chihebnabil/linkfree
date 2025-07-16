import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    const correctPassword = process.env.ANALYTICS_PASSWORD

    if (!correctPassword) {
      return NextResponse.json({ error: "Analytics password not configured" }, { status: 500 })
    }

    if (password === correctPassword) {
      // Set authentication cookie (expires in 24 hours)
      const response = NextResponse.json({ success: true })
      response.cookies.set("analytics-auth", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60, // 24 hours
      })
      return response
    } else {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

export async function DELETE() {
  // Logout endpoint
  const response = NextResponse.json({ success: true })
  response.cookies.delete("analytics-auth")
  return response
}
