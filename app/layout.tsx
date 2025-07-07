import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
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
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/mountain.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="msapplication-TileImage" content="/favicon-32x32.png" />
      </head>
      <body className="antialiased">
        {/* Google Analytics */}
        {/*
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E7BSZ0EXBV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E7BSZ0EXBV', {
              page_location: window.location.href.replace(window.location.hostname, 'glacierwebdesign.com'),
              page_title: document.title,
              custom_map: {
                'custom_parameter_1': 'original_domain'
              }
            });
            // Track the original domain as a custom dimension for reference
            gtag('event', 'page_view', {
              'custom_parameter_1': window.location.hostname
            });
          `}
        </Script>
        */}
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
} 