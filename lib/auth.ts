import { cookies } from "next/headers"

export async function checkAnalyticsAuth(): Promise<boolean> {
  const cookieStore = cookies()
  const authCookie = cookieStore.get("analytics-auth")
  return authCookie?.value === "authenticated"
}
