import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'

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
  icons: {
    icon: [
      { url: '/mountain.svg?v=3', type: 'image/svg+xml' },
      { url: '/mountain.svg?v=3', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/mountain.svg?v=3', sizes: '16x16', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/mountain.svg?v=3', sizes: '180x180', type: 'image/svg+xml' },
    ],
    shortcut: '/mountain.svg?v=3',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="icon" href="/mountain.svg?v=3" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/mountain.svg?v=3" />
        <link rel="shortcut icon" href="/mountain.svg?v=3" />
        <meta name="msapplication-TileImage" content="/mountain.svg?v=3" />
      </head>
      <body className="antialiased">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
} 