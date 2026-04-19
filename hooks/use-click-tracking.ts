"use client"

import { useCallback } from "react"
import { usePostHog } from "posthog-js/react"

export function useClickTracking() {
  const posthog = usePostHog()

  const trackClick = useCallback(
    (linkTitle: string, linkUrl: string, linkGroup: string) => {
      posthog?.capture("link_clicked", {
        link_title: linkTitle,
        link_url: linkUrl,
        link_group: linkGroup,
      })
    },
    [posthog]
  )

  return { trackClick }
}
