"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ExternalLink, ChevronDown, ChevronRight } from "lucide-react"
import { getIcon } from "@/lib/icons"
import profileData from "@/data/profile.json"
import { useClickTracking } from "@/hooks/use-click-tracking"

export default function ProfilePage() {
  const { profile, linkGroups, socialLinks, footer } = profileData
  const { trackClick } = useClickTracking()
  
  // State to manage which groups are open (by default, all are open)
  const [openGroups, setOpenGroups] = useState<{ [key: number]: boolean }>(
    linkGroups.reduce((acc, _, index) => ({ ...acc, [index]: true }), {})
  )

  const toggleGroup = (groupIndex: number) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupIndex]: !prev[groupIndex]
    }))
  }

  const toggleAllGroups = () => {
    const allOpen = Object.values(openGroups).every(Boolean)
    const newState = linkGroups.reduce((acc, _, index) => ({ ...acc, [index]: !allOpen }), {})
    setOpenGroups(newState)
  }

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
        <div className="mb-8">
          {/* Toggle All Button */}
          <div className="flex justify-end mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleAllGroups}
              className="text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              {Object.values(openGroups).every(Boolean) ? "Collapse All" : "Expand All"}
            </Button>
          </div>
          
          <div className="space-y-4">
            {linkGroups.map((group, groupIndex) => (
              <Collapsible
                key={groupIndex}
                open={openGroups[groupIndex]}
                onOpenChange={() => toggleGroup(groupIndex)}
              >
                <Card className="overflow-hidden transition-all duration-200 hover:shadow-sm">
                  <CollapsibleTrigger className="w-full">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white text-sm font-bold">
                              {group.links.length}
                            </span>
                          </div>
                          <div className="text-left">
                            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                              {group.title}
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {group.links.length} {group.links.length === 1 ? 'link' : 'links'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {/* Show featured badge if group has featured links */}
                          {group.links.some(link => link.featured) && (
                            <Badge variant="secondary" className="text-xs">
                              Featured
                            </Badge>
                          )}
                          {openGroups[groupIndex] ? (
                            <ChevronDown className="w-4 h-4 text-slate-400 transition-transform duration-200" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-400 transition-transform duration-200" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="transition-all duration-200 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                    <div className="px-4 pb-4 space-y-3">
                      {group.links.map((link, linkIndex) => (
                        <Card
                          key={linkIndex}
                          className={`transition-all duration-200 hover:scale-[1.02] hover:shadow-md cursor-pointer border-0 ${
                            link.featured
                              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                              : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
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
                      ))}
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            ))}
          </div>
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
