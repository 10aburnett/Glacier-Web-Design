'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import Lenis from 'lenis'

interface LenisContextType {
  lenis: Lenis | null
}

const LenisContext = createContext<LenisContextType>({ lenis: null })

export const useLenis = () => {
  const context = useContext(LenisContext)
  return context.lenis
}

interface LenisProviderProps {
  children: ReactNode
}

export default function LenisProvider({ children }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    // Create a Lenis instance with ultra-smooth settings
    const lenisInstance = new Lenis({
      duration: 1.8,            // Increased for more smoothness
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing curve
      direction: 'vertical',    // Vertical scrolling only
      smooth: true,             // Enable smooth scrolling
      mouseMultiplier: 0.8,     // Slightly reduced for smoother feel
      smoothTouch: false,       // Disable on touch for better mobile performance
      touchMultiplier: 2,       // Touch scroll speed
      infinite: false,          // No infinite scroll
      syncTouch: false,         // Better touch handling
      syncTouchLerp: 0.1,       // Smooth touch interpolation
      touchInertiaMultiplier: 35, // Smooth touch inertia
    })

    setLenis(lenisInstance)

    // Animation loop using requestAnimationFrame with better performance
    let animationId: number
    function raf(time: number) {
      lenisInstance.raf(time)
      animationId = requestAnimationFrame(raf)
    }
    animationId = requestAnimationFrame(raf)

    // Cleanup function
    return () => {
      lenisInstance.destroy()
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      setLenis(null)
    }
  }, [])

  return (
    <LenisContext.Provider value={{ lenis }}>
      {children}
    </LenisContext.Provider>
  )
} 