"use client"

import { ArrowUpRight } from "lucide-react"
import profileData from "@/data/profile.json"
import { useClickTracking } from "@/hooks/use-click-tracking"

export default function ProfilePage() {
  const { profile, linkGroups, socialLinks, footer } = profileData
  const { trackClick } = useClickTracking()

  const handleLinkClick = (title: string, url: string, category: string) => {
    trackClick(title, url, category)
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="min-h-screen bg-white text-neutral-950 selection:bg-red-600 selection:text-white">
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Header */}
        <header className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-16 md:mb-24 animate-fade-in">
          <div className="md:col-span-8">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[0.95]">
              {profile.name}
            </h1>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-6">
              {profile.badges.map((badge, index) => (
                <span
                  key={index}
                  className="font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-400"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
          <div className="md:col-span-4 md:text-right flex md:flex-col md:items-end justify-between md:justify-start gap-4">
            <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">
              {profile.bio}
            </p>
          </div>
        </header>

        {/* Link Groups */}
        <main className="space-y-0">
          {linkGroups.map((group, groupIndex) => (
            <section
              key={groupIndex}
              className="border-t border-neutral-200 py-10 md:py-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12">
                {/* Group Label */}
                <div className="md:col-span-3">
                  <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400 sticky top-8">
                    {group.title}
                  </h2>
                </div>

                {/* Links */}
                <div className="md:col-span-9 space-y-6">
                  {group.links.map((link, linkIndex) => (
                    <div
                      key={linkIndex}
                      onClick={() =>
                        handleLinkClick(link.title, link.url, group.title)
                      }
                      className="group grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-6 cursor-pointer"
                    >
                      <div className="md:col-span-4 flex items-center gap-2">
                        {link.featured && (
                          <span className="w-1.5 h-1.5 bg-red-600 shrink-0" />
                        )}
                        <h3 className="text-[15px] font-medium leading-snug group-hover:text-red-600 transition-colors duration-200">
                          {link.title}
                        </h3>
                      </div>
                      <div className="md:col-span-6">
                        <p className="text-sm text-neutral-500 leading-snug group-hover:text-neutral-700 transition-colors duration-200">
                          {link.description}
                        </p>
                      </div>
                      <div className="md:col-span-2 flex justify-start md:justify-end items-start">
                        <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:text-red-600 transition-all duration-200 opacity-0 group-hover:opacity-100 -translate-y-0.5 translate-x-0.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </main>

        {/* Footer */}
        <footer className="border-t border-neutral-200 pt-10 mt-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {socialLinks.map((social, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleLinkClick(social.name, social.url, "Social")
                  }
                  className="font-mono text-xs uppercase tracking-[0.1em] text-neutral-400 hover:text-red-600 transition-colors duration-200"
                >
                  {social.name}
                </button>
              ))}
            </div>
            <p className="font-mono text-[10px] text-neutral-300 tracking-wider">
              {footer.text}
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
