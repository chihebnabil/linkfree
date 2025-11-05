import { Github, Twitter, Linkedin, Mail, Globe, FileText, Code2, BookOpen, Coffee, ExternalLink, Check, Users, GraduationCap, Zap, Bot, Package, Calendar, Keyboard , GitFork } from "lucide-react"

export const iconMap = {
  Github,
  Twitter,
  Linkedin,
  GitFork,
  Mail,
  Globe,
  FileText,
  Code2,
  BookOpen,
  Coffee,
  ExternalLink,
  Check,
  Users,
  GraduationCap,
  Zap,
  Bot,
  Package,
  Calendar,
  Keyboard,
}

export function getIcon(iconName: string, className?: string) {
  const IconComponent = iconMap[iconName as keyof typeof iconMap]
  return IconComponent ? <IconComponent className={className} /> : null
}
