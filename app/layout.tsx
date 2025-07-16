import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LinkFree',
  description: 'An Minimalist Open Source Alternative to Linktree',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
