import { neon } from "@neondatabase/serverless"
import { type NextRequest, NextResponse } from "next/server"
import fetch from "node-fetch"

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


    // Get geolocation info
    let country = null
    let region = null
    try {
      const geoRes = await fetch(`https://ipapi.co/${ipAddress}/json/`)
      if (geoRes.ok) {
        const geo = await geoRes.json()
        country = geo.country_name || null
        region = geo.region || null
      }
    } catch {}

    // Device type detection
    let deviceType = "desktop"
    if (/Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(userAgent)) {
      deviceType = "mobile"
    }

    // Insert click record with new fields
    await sql`
      INSERT INTO link_clicks (
        link_title, 
        link_url, 
        link_group, 
        user_agent, 
        ip_address, 
        referrer, 
        country,
        region,
        device_type,
        session_id
      ) VALUES (
        ${linkTitle}, 
        ${linkUrl}, 
        ${linkGroup}, 
        ${userAgent}, 
        ${ipAddress}, 
        ${referrer}, 
        ${country},
        ${region},
        ${deviceType},
        ${sessionId}
      )
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error tracking click:", error)
    return NextResponse.json({ error: "Failed to track click" }, { status: 500 })
  }
}
