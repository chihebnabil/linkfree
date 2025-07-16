import { neon } from "@neondatabase/serverless"
import { type NextRequest, NextResponse } from "next/server"

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { linkTitle, linkUrl, linkGroup, sessionId } = body

    // Get client info
    const userAgent = request.headers.get("user-agent") || ""
    const referrer = request.headers.get("referer") || ""
    const forwardedFor = request.headers.get("x-forwarded-for")
    const realIp = request.headers.get("x-real-ip")
    const ipAddress = forwardedFor?.split(",")[0] || realIp || "127.0.0.1"

    // Insert click record
    await sql`
      INSERT INTO link_clicks (
        link_title, 
        link_url, 
        link_group, 
        user_agent, 
        ip_address, 
        referrer, 
        session_id
      ) VALUES (
        ${linkTitle}, 
        ${linkUrl}, 
        ${linkGroup}, 
        ${userAgent}, 
        ${ipAddress}, 
        ${referrer}, 
        ${sessionId}
      )
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error tracking click:", error)
    return NextResponse.json({ error: "Failed to track click" }, { status: 500 })
  }
}
