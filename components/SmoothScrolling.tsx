'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScrolling() {
  useEffect(() => {
    // Create a Lenis instance with optimized settings
    const lenis = new Lenis({
      duration: 1.2,            // bigger = more inertia
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // custom easing curve
      direction: 'vertical',    // vertical scrolling only
      smooth: true,             // enable smooth scrolling
      mouseMultiplier: 1.0,     // scroll speed multiplier
      smoothTouch: false,       // disable smooth scrolling on touch devices for better performance
      touchMultiplier: 2,       // touch scroll speed
    })

    // Animation loop using requestAnimationFrame
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Cleanup function
    return () => {
      lenis.destroy()
    }
  }, [])

  return null // This component doesn't render anything visual
} 