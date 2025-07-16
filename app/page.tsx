"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { getIcon } from "@/lib/icons"
import profileData from "@/data/profile.json"
import { useClickTracking } from "@/hooks/use-click-tracking"

export default function ProfilePage() {
  const { profile, linkGroups, socialLinks, footer } = profileData
  const { trackClick } = useClickTracking()

  // Generate initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container max-w-md mx-auto px-4 py-8">
        {/* Profile Section */}
        <div className="text-center mb-8">
          <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-white dark:ring-slate-800 shadow-lg">
            <AvatarImage src={profile.avatar || "/placeholder.svg"} alt="Profile" />
            <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              {getInitials(profile.name)}
            </AvatarFallback>
          </Avatar>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">{profile.name}</h1>

          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {profile.badges.map((badge, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {badge}
              </Badge>
            ))}
          </div>

          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">{profile.bio}</p>
        </div>

        {/* Links Section */}
        <div className="space-y-6 mb-8">
          {linkGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 px-1 uppercase tracking-wide">
                {group.title}
              </h2>
              <div className="space-y-3">
                {group.links.map((link, linkIndex) => (
                  <div key={linkIndex}>
                    <Card
                      className={`transition-all duration-200 hover:scale-[1.02] hover:shadow-md cursor-pointer ${
                        link.featured
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                      onClick={async (e) => {
                        e.preventDefault()
                        trackClick(link.title, link.url, group.title)
                        window.open(link.url, "_blank", "noopener,noreferrer")
                      }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`flex-shrink-0 ${
                              link.featured ? "text-white" : "text-slate-600 dark:text-slate-400"
                            }`}
                          >
                            {getIcon(link.icon, "w-5 h-5")}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3
                                className={`font-semibold text-sm ${
                                  link.featured ? "text-white" : "text-slate-900 dark:text-slate-100"
                                }`}
                              >
                                {link.title}
                              </h3>
                              <ExternalLink
                                className={`w-4 h-4 flex-shrink-0 ml-2 ${
                                  link.featured ? "text-white" : "text-slate-400"
                                }`}
                              />
                            </div>
                            <p
                              className={`text-xs mt-1 ${
                                link.featured ? "text-blue-100" : "text-slate-500 dark:text-slate-400"
                              }`}
                            >
                              {link.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4 mb-8">
          {socialLinks.map((social, index) => (
            <Button
              key={index}
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full hover:scale-110 transition-transform duration-200 bg-transparent"
              onClick={async (e) => {
                e.preventDefault()
                // Fire tracking async without awaiting
                trackClick(social.name, social.url, "Social")
                window.open(social.url, "_blank", "noopener,noreferrer")
              }}
            >
              {getIcon(social.icon, "w-5 h-5")}
              <span className="sr-only">{social.name}</span>
            </Button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">{footer.text}</p>
        </div>
      </div>
    </div>
  )
}
