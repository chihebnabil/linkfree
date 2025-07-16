"use client"

import { useCallback, useEffect, useState } from "react"

export function useClickTracking() {
  const [sessionId, setSessionId] = useState<string>("")

  useEffect(() => {
    // Generate or get session ID
    let storedSessionId = localStorage.getItem("profile-session-id")
    if (!storedSessionId) {
      storedSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem("profile-session-id", storedSessionId)
    }
    setSessionId(storedSessionId)
  }, [])

  const trackClick = useCallback(
    async (linkTitle: string, linkUrl: string, linkGroup: string) => {
      if (!sessionId) return

      try {
        await fetch("/api/track-click", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            linkTitle,
            linkUrl,
            linkGroup,
            sessionId,
          }),
        })
      } catch (error) {
        console.error("Failed to track click:", error)
      }
    },
    [sessionId],
  )

  return { trackClick, sessionId }
}
