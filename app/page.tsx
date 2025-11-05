"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ExternalLink, ChevronDown, ChevronRight, Sparkles } from "lucide-react"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500 dark:bg-violet-600 rounded-full mix-blend-screen dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-fuchsia-500 dark:bg-fuchsia-600 rounded-full mix-blend-screen dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500 dark:bg-cyan-600 rounded-full mix-blend-screen dark:mix-blend-soft-light filter blur-3xl opacity-15 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container max-w-2xl mx-auto px-4 py-12 relative z-10">
        {/* Profile Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="relative inline-block mb-6">
            <Avatar className="w-32 h-32 mx-auto ring-4 ring-violet-500/30 dark:ring-fuchsia-500/30 shadow-2xl shadow-violet-500/20 transition-transform hover:scale-105 duration-300">
              <AvatarImage src={profile.avatar || "/placeholder.svg"} alt="Profile" />
              <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 text-white">
                {getInitials(profile.name)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full p-2 shadow-lg shadow-fuchsia-500/50">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent mb-4 tracking-tight">
            {profile.name}
          </h1>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {profile.badges.map((badge, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs px-3 py-1 bg-slate-800/60 dark:bg-slate-800/60 backdrop-blur-sm border border-violet-500/30 dark:border-violet-500/30 hover:scale-105 transition-transform duration-200 text-slate-200"
              >
                {badge}
              </Badge>
            ))}
          </div>

          <p className="text-slate-300 dark:text-slate-300 text-base leading-relaxed max-w-2xl mx-auto font-medium">
            {profile.bio}
          </p>
        </div>

        {/* Links Section */}
        <div className="mb-12">
          {/* Toggle All Button */}
          <div className="flex justify-end mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleAllGroups}
              className="text-sm text-slate-400 hover:text-violet-400 dark:text-slate-400 dark:hover:text-violet-400 font-medium transition-colors duration-200"
            >
              {Object.values(openGroups).every(Boolean) ? "Collapse All" : "Expand All"}
            </Button>
          </div>
          
          <div className="space-y-6">
            {linkGroups.map((group, groupIndex) => (
              <Collapsible
                key={groupIndex}
                open={openGroups[groupIndex]}
                onOpenChange={() => toggleGroup(groupIndex)}
                className="group"
              >
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 bg-slate-800/40 dark:bg-slate-900/40 backdrop-blur-md border-slate-700/50 dark:border-slate-700/50">
                  <CollapsibleTrigger className="w-full">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-fuchsia-500/30 group-hover:scale-110 group-hover:shadow-fuchsia-500/50 transition-all duration-300">
                            <span className="text-white text-base font-bold">
                              {group.links.length}
                            </span>
                          </div>
                          <div className="text-left">
                            <h2 className="text-lg font-bold text-slate-100 dark:text-slate-100 mb-1">
                              {group.title}
                            </h2>
                            <p className="text-sm text-slate-400 dark:text-slate-400">
                              {group.links.length} {group.links.length === 1 ? 'link' : 'links'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {/* Show featured badge if group has featured links */}
                          {group.links.some(link => link.featured) && (
                            <Badge className="text-xs bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-0 shadow-lg shadow-fuchsia-500/30">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                          {openGroups[groupIndex] ? (
                            <ChevronDown className="w-5 h-5 text-slate-400 transition-transform duration-300 group-hover:text-violet-400 dark:group-hover:text-violet-400" />
                          ) : (
                            <ChevronRight className="w-5 h-5 text-slate-400 transition-transform duration-300 group-hover:text-violet-400 dark:group-hover:text-violet-400" />
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="transition-all duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                    <div className="px-5 pb-5 space-y-3">
                      {group.links.map((link, linkIndex) => (
                        <Card
                          key={linkIndex}
                          className={`group/link transition-all duration-300 hover:scale-[1.02] cursor-pointer border ${
                            link.featured
                              ? "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white border-0 shadow-lg shadow-fuchsia-500/30 hover:shadow-2xl hover:shadow-fuchsia-500/50"
                              : "bg-slate-800/40 dark:bg-slate-800/40 backdrop-blur-sm hover:bg-slate-800/60 dark:hover:bg-slate-800/60 border-slate-700/50 dark:border-slate-700/50 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10"
                          }`}
                          onClick={async (e) => {
                            e.preventDefault()
                            trackClick(link.title, link.url, group.title)
                            window.open(link.url, "_blank", "noopener,noreferrer")
                          }}
                        >
                          <CardContent className="p-5">
                            <div className="flex items-center space-x-4">
                              <div
                                className={`flex-shrink-0 p-3 rounded-lg transition-all duration-300 ${
                                  link.featured 
                                    ? "bg-white/20 text-white group-hover/link:bg-white/30" 
                                    : "bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 dark:from-violet-500/20 dark:to-fuchsia-500/20 text-violet-400 dark:text-violet-400 group-hover/link:scale-110 group-hover/link:from-violet-500/30 group-hover/link:to-fuchsia-500/30"
                                }`}
                              >
                                {getIcon(link.icon, "w-6 h-6")}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-3">
                                  <h3
                                    className={`font-bold text-base ${
                                      link.featured ? "text-white" : "text-slate-100 dark:text-slate-100"
                                    }`}
                                  >
                                    {link.title}
                                  </h3>
                                  <ExternalLink
                                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 ${
                                      link.featured ? "text-white/80" : "text-slate-400 dark:text-slate-500 group-hover/link:text-violet-400"
                                    }`}
                                  />
                                </div>
                                <p
                                  className={`text-sm mt-1.5 leading-relaxed ${
                                    link.featured ? "text-white/90" : "text-slate-300 dark:text-slate-400"
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
        <div className="flex justify-center gap-4 mb-10">
          {socialLinks.map((social, index) => (
            <Button
              key={index}
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full hover:scale-110 transition-all duration-300 bg-slate-800/40 dark:bg-slate-900/40 backdrop-blur-md border-slate-700/50 dark:border-slate-700/50 hover:shadow-xl hover:shadow-violet-500/20 hover:bg-slate-800/60 dark:hover:bg-slate-900/60 hover:border-violet-500/50 dark:hover:border-violet-500/50 group"
              onClick={async (e) => {
                e.preventDefault()
                // Fire tracking async without awaiting
                trackClick(social.name, social.url, "Social")
                window.open(social.url, "_blank", "noopener,noreferrer")
              }}
            >
              <div className="text-slate-400 dark:text-slate-400 group-hover:text-violet-400 dark:group-hover:text-violet-400 transition-colors duration-300">
                {getIcon(social.icon, "w-6 h-6")}
              </div>
              <span className="sr-only">{social.name}</span>
            </Button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-slate-400 dark:text-slate-400 font-medium">{footer.text}</p>
        </div>
      </div>
    </div>
  )
}
