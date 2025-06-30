'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScrolling() {
  useEffect(() => {
    // Create a Lenis instance with ultra-smooth settings
    const lenis = new Lenis({
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

    // Animation loop using requestAnimationFrame with better performance
    let animationId: number
    function raf(time: number) {
      lenis.raf(time)
      animationId = requestAnimationFrame(raf)
    }
    animationId = requestAnimationFrame(raf)

    // Cleanup function
    return () => {
      lenis.destroy()
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return null // This component doesn't render anything visual
} 