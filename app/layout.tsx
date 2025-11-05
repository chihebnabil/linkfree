import type { Metadata } from 'next'
import './globals.css'
import profileData from '@/data/profile.json'
import { ThemeProvider } from '@/components/theme-provider'
import { StructuredData } from '@/components/structured-data'

// Generate comprehensive keywords from profile data
const allKeywords = [
  ...profileData.profile.badges,
  'developer',
  'full stack',
  'indie maker',
  'mentor',
  'software engineer',
  'web development',
  'SaaS',
  'open source',
  // Add project names
  ...profileData.linkGroups.flatMap(group => 
    group.links.map(link => link.title)
  )
].join(', ')

// Enhanced metadata for better SEO
export const metadata: Metadata = {
  title: {
    default: `${profileData.profile.name} - Full Stack Developer & Indie Maker`,
    template: `%s | ${profileData.profile.name}`
  },
  description: profileData.profile.bio,
  keywords: allKeywords,
  authors: [{ name: profileData.profile.name, url: 'https://github.com/chihebnabil' }],
  creator: profileData.profile.name,
  publisher: profileData.profile.name,
  
  // Robots & indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Open Graph for social sharing
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: 'https://chihebnabil.com',
    siteName: `${profileData.profile.name} - Developer Portfolio`,
    title: `${profileData.profile.name} - Full Stack Developer & Indie Maker`,
    description: profileData.profile.bio,
    images: profileData.profile.avatar ? [
      {
        url: profileData.profile.avatar,
        width: 400,
        height: 400,
        alt: `${profileData.profile.name} profile picture`,
      }
    ] : undefined,
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    site: '@NabilChiheb',
    creator: '@NabilChiheb',
    title: `${profileData.profile.name} - Full Stack Developer & Indie Maker`,
    description: profileData.profile.bio,
    images: profileData.profile.avatar ? [profileData.profile.avatar] : undefined,
  },
  
  // Additional metadata
  alternates: {
    canonical: 'https://chihebnabil.com',
  },
  
  // Verification (add your verification codes if you have them)
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
