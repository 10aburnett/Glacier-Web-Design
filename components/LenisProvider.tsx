'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface LenisContextType {
  lenis: any | null
}

const LenisContext = createContext<LenisContextType>({ lenis: null })

export const useLenis = () => {
  const context = useContext(LenisContext)
  return context.lenis
}

// Custom hook for navigation with scroll to top
export const useScrollToTop = () => {
  const lenis = useLenis()
  const router = useRouter()

  const navigateAndScrollToTop = (href: string) => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
    router.push(href)
  }

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return { navigateAndScrollToTop, scrollToTop }
}

interface LenisProviderProps {
  children: ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const [lenis, setLenis] = useState<any | null>(null)

  useEffect(() => {
    // Dynamically import Lenis to avoid SSR issues
    const loadLenis = async () => {
      try {
        const Lenis = (await import('lenis')).default
        
        // Create a Lenis instance with basic settings
        const lenisInstance = new Lenis({
          duration: 1.8,            // Increased for more smoothness
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing curve
        })

        setLenis(lenisInstance)

        // Animation loop using requestAnimationFrame with better performance
        let animationId: number
        const raf = (time: number) => {
          lenisInstance.raf(time)
          animationId = requestAnimationFrame(raf)
        }
        animationId = requestAnimationFrame(raf)

        // Return cleanup function
        return () => {
          lenisInstance.destroy()
          if (animationId) {
            cancelAnimationFrame(animationId)
          }
          setLenis(null)
        }
      } catch (error) {
        console.error('Failed to load Lenis:', error)
        return () => {}
      }
    }

    let cleanup: (() => void) | undefined

    // Only load Lenis on the client side
    if (typeof window !== 'undefined') {
      loadLenis().then((cleanupFn) => {
        cleanup = cleanupFn
      })
    }

    // Cleanup function
    return () => {
      if (cleanup) {
        cleanup()
      }
    }
  }, [])

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  )
} 