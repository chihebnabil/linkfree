"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronRight, ArrowUpRight } from "lucide-react"
import { getIcon } from "@/lib/icons"
import profileData from "@/data/profile.json"
import { useClickTracking } from "@/hooks/use-click-tracking"

export default function ProfilePage() {
  const { profile, linkGroups, socialLinks, footer } = profileData
  const { trackClick } = useClickTracking()

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
    const newState = linkGroups.reduce(
      (acc, _, index) => ({ ...acc, [index]: !allOpen }),
      {}
    )
    setOpenGroups(newState)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
  }

  const handleLinkClick = (title: string, url: string, category: string) => {
    trackClick(title, url, category)
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative selection:bg-[#c9a96e]/30 selection:text-white">
      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient top glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#c9a96e]/[0.025] rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-xl mx-auto px-6 py-16 md:py-24">
        {/* Profile Header */}
        <section className="text-center mb-16 animate-fade-in">
          <Avatar className="w-24 h-24 mx-auto mb-8 ring-1 ring-white/[0.08] shadow-2xl">
            <AvatarImage
              src={profile.avatar || "/placeholder.svg"}
              alt={`${profile.name} profile picture`}
            />
            <AvatarFallback className="text-2xl font-medium bg-[#141414] text-white/60">
              {getInitials(profile.name)}
            </AvatarFallback>
          </Avatar>

          <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight mb-5 text-white">
            {profile.name}
          </h1>

          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {profile.badges.map((badge, index) => (
              <span
                key={index}
                className="text-[10px] uppercase tracking-[0.15em] text-white/35 px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02]"
              >
                {badge}
              </span>
            ))}
          </div>

          <p className="text-white/40 text-sm leading-relaxed max-w-sm mx-auto font-light">
            {profile.bio}
          </p>
        </section>

        {/* Link Groups */}
        <section className="mb-16">
          <div className="flex justify-end mb-6">
            <button
              onClick={toggleAllGroups}
              className="text-[10px] uppercase tracking-[0.2em] text-white/25 hover:text-white/50 transition-colors duration-300"
            >
              {Object.values(openGroups).every(Boolean) ? "Collapse" : "Expand"}
            </button>
          </div>

          <div className="space-y-6">
            {linkGroups.map((group, groupIndex) => (
              <Collapsible
                key={groupIndex}
                open={openGroups[groupIndex]}
                onOpenChange={() => toggleGroup(groupIndex)}
              >
                <div className="rounded-2xl bg-[#0f0f0f] border border-white/[0.05] overflow-hidden">
                  <CollapsibleTrigger className="w-full">
                    <div className="px-6 py-5 flex items-center justify-between">
                      <div className="text-left">
                        <h2 className="text-sm font-medium text-white/80 tracking-wide">
                          {group.title}
                        </h2>
                        <p className="text-[11px] text-white/25 mt-1 tracking-wide">
                          {group.links.length} {group.links.length === 1 ? "link" : "links"}
                        </p>
                      </div>
                      {openGroups[groupIndex] ? (
                        <ChevronDown className="w-4 h-4 text-white/15" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-white/15" />
                      )}
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="px-2 pb-2 space-y-1">
                      {group.links.map((link, linkIndex) => (
                        <div
                          key={linkIndex}
                          onClick={() =>
                            handleLinkClick(link.title, link.url, group.title)
                          }
                          className={`group relative flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                            link.featured
                              ? "bg-gradient-to-br from-[#c9a96e]/[0.06] to-[#c9a96e]/[0.02] border border-[#c9a96e]/10 hover:border-[#c9a96e]/25"
                              : "hover:bg-white/[0.02] border border-transparent hover:border-white/[0.04]"
                          }`}
                        >
                          <div
                            className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                              link.featured
                                ? "bg-[#c9a96e]/10 text-[#c9a96e]"
                                : "bg-white/[0.03] text-white/25 group-hover:text-white/50"
                            }`}
                          >
                            {getIcon(link.icon, "w-5 h-5")}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-3">
                              <h3
                                className={`text-sm font-medium truncate ${
                                  link.featured
                                    ? "text-[#c9a96e]"
                                    : "text-white/70 group-hover:text-white/90"
                                }`}
                              >
                                {link.title}
                              </h3>
                              <ArrowUpRight
                                className={`w-4 h-4 flex-shrink-0 transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-y-0.5 translate-x-0.5 ${
                                  link.featured
                                    ? "text-[#c9a96e]/50"
                                    : "text-white/20"
                                }`}
                              />
                            </div>
                            <p className="text-xs text-white/30 mt-0.5 leading-relaxed truncate">
                              {link.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))}
          </div>
        </section>

        {/* Social Links */}
        <section className="flex justify-center gap-3 mb-12">
          {socialLinks.map((social, index) => (
            <button
              key={index}
              onClick={() =>
                handleLinkClick(social.name, social.url, "Social")
              }
              className="w-10 h-10 rounded-full flex items-center justify-center border border-white/[0.06] bg-white/[0.02] text-white/30 hover:text-white/60 hover:border-white/[0.10] hover:bg-white/[0.04] transition-all duration-300"
            >
              {getIcon(social.icon, "w-4 h-4")}
              <span className="sr-only">{social.name}</span>
            </button>
          ))}
        </section>

        {/* Footer */}
        <footer className="text-center">
          <p className="text-[10px] text-white/15 tracking-[0.15em] uppercase">
            {footer.text}
          </p>
        </footer>
      </div>
    </div>
  )
}
