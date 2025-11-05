import type { Metadata } from 'next'
import './globals.css'
import profileData from '@/data/profile.json'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: profileData.profile.name,
  description: profileData.profile.bio,
  keywords: profileData.profile.badges,
  authors: [{ name: profileData.profile.name }],
  creator: profileData.profile.name,
  openGraph: {
    title: profileData.profile.name,
    description: profileData.profile.bio,
    type: 'profile',
    images: profileData.profile.avatar ? [profileData.profile.avatar] : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title: profileData.profile.name,
    description: profileData.profile.bio,
    images: profileData.profile.avatar ? [profileData.profile.avatar] : undefined,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
