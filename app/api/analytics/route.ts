import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const sql = neon(process.env.DATABASE_URL!)

export async function GET() {
  try {
    // Check authentication
    const cookieStore = await cookies()
    const authCookie = cookieStore.get("analytics-auth")

    if (!authCookie || authCookie.value !== "authenticated") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get overall stats
    const totalClicks = await sql`SELECT COUNT(*) as count FROM link_clicks`
    const uniqueVisitors = await sql`SELECT COUNT(DISTINCT session_id) as count FROM link_clicks`

    // Get top links
    const topLinks = await sql`
      SELECT 
        link_title,
        link_group,
        COUNT(*) as total_clicks,
        COUNT(DISTINCT session_id) as unique_clicks
      FROM link_clicks 
      GROUP BY link_title, link_group
      ORDER BY total_clicks DESC
      LIMIT 10
    `

    // Get recent activity (last 7 days)
    const recentActivity = await sql`
      SELECT 
        DATE_TRUNC('day', clicked_at) as date,
        COUNT(*) as clicks
      FROM link_clicks 
      WHERE clicked_at >= NOW() - INTERVAL '7 days'
      GROUP BY DATE_TRUNC('day', clicked_at)
      ORDER BY date DESC
    `

    // Get country breakdown
    const countryBreakdown = await sql`
      SELECT country, COUNT(*) as clicks
      FROM link_clicks
      WHERE country IS NOT NULL
      GROUP BY country
      ORDER BY clicks DESC
      LIMIT 10
    `

    // Get region breakdown
    const regionBreakdown = await sql`
      SELECT region, COUNT(*) as clicks
      FROM link_clicks
      WHERE region IS NOT NULL
      GROUP BY region
      ORDER BY clicks DESC
      LIMIT 10
    `

    // Get device type breakdown
    const deviceTypeBreakdown = await sql`
      SELECT device_type, COUNT(*) as clicks
      FROM link_clicks
      WHERE device_type IS NOT NULL
      GROUP BY device_type
      ORDER BY clicks DESC
    `

    // Get referrer breakdown
    const referrerBreakdown = await sql`
      SELECT referrer, COUNT(*) as clicks
      FROM link_clicks
      WHERE referrer IS NOT NULL AND referrer != ''
      GROUP BY referrer
      ORDER BY clicks DESC
      LIMIT 10
    `

    return NextResponse.json({
      totalClicks: totalClicks[0]?.count || 0,
      uniqueVisitors: uniqueVisitors[0]?.count || 0,
      topLinks,
      recentActivity,
      countryBreakdown,
      regionBreakdown,
      deviceTypeBreakdown,
      referrerBreakdown,
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
