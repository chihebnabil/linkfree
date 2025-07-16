import { Github, Twitter, Linkedin, Mail, Globe, FileText, Code2, BookOpen, Coffee, ExternalLink } from "lucide-react"

export const iconMap = {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Globe,
  FileText,
  Code2,
  BookOpen,
  Coffee,
  ExternalLink,
}

export function getIcon(iconName: string, className?: string) {
  const IconComponent = iconMap[iconName as keyof typeof iconMap]
  return IconComponent ? <IconComponent className={className} /> : null
}
