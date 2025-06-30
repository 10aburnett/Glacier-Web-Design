import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Glacier Web Design - Premium Web Design Agency',
  description: 'Transform your outdated website into a modern, high-performance digital experience. Specializing in web redesign, mobile optimization, and brand refresh.',
  keywords: 'web design, website redesign, mobile optimization, SEO, brand refresh, premium web agency',
  openGraph: {
    title: 'Glacier Web Design - Premium Web Design Agency',
    description: 'Transform your outdated website into a modern, high-performance digital experience.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
} 