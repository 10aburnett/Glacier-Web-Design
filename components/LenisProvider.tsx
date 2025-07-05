'use client'

import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

// Custom hook for navigation with scroll to top - now uses native scroll only
export const useScrollToTop = () => {
  const router = useRouter()

  const navigateAndScrollToTop = (href: string) => {
    // Set flag for internal navigation to home page
    if (href === '/') {
      sessionStorage.setItem('isInternalNavigation', 'true')
    }
    window.scrollTo(0, 0)
    router.push(href)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return { navigateAndScrollToTop, scrollToTop }
}

interface LenisProviderProps {
  children: ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  // No longer using Lenis - just pass through children
  return <>{children}</>
} 