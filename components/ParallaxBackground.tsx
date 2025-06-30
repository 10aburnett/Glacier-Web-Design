'use client'

import { useEffect } from 'react'
import { useLenis } from './LenisProvider'

export default function ParallaxBackground() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    const onScroll = (lenisData: any) => {
      // Access scroll position from the event callback
      const y = lenisData.scroll || 0
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const scrollPercent = y / Math.max(maxScroll, 1) // Prevent division by zero

      // Apply GPU-only parallax transform
      const parallaxElement = document.querySelector('.iceberg-background') as HTMLElement
      if (parallaxElement) {
        parallaxElement.style.transform = `translate3d(0, ${y * -0.5}px, 0)`
        
        // Determine state based on scroll percentage
        let state = 'state-top'
        if (scrollPercent < 0.1) state = 'state-top'
        else if (scrollPercent < 0.3) state = 'state-upper'
        else if (scrollPercent < 0.6) state = 'state-waterline'
        else if (scrollPercent < 0.8) state = 'state-upper-deep'
        else state = 'state-deep'
        
        // Preserve original classes and add state class
        const baseClasses = 'iceberg-background w-full h-[600vh] bg-no-repeat'
        parallaxElement.className = `${baseClasses} ${state}`
      }

      // Handle water particles effect for deep areas
      if (scrollPercent > 0.7) {
        addWaterParticles()
      } else {
        removeWaterParticles()
      }
    }

    // Water particle effect for deep underwater sections
    const addWaterParticles = () => {
      let particleContainer = document.querySelector('.water-particles')
      if (!particleContainer) {
        particleContainer = document.createElement('div')
        particleContainer.className = 'water-particles fixed inset-0 pointer-events-none z-5'
        particleContainer.innerHTML = Array.from({ length: 8 }, (_, i) => 
          `<div class="absolute w-1 h-1 bg-blue-300/20 rounded-full animate-bounce" 
                style="left: ${Math.random() * 100}%; 
                       top: ${Math.random() * 100}%; 
                       animation-delay: ${Math.random() * 2}s;
                       animation-duration: ${2 + Math.random() * 2}s;"></div>`
        ).join('')
        document.body.appendChild(particleContainer)
      }
    }

    const removeWaterParticles = () => {
      const particleContainer = document.querySelector('.water-particles')
      if (particleContainer) {
        particleContainer.remove()
      }
    }

    // Subscribe to Lenis scroll events
    lenis.on('scroll', onScroll)
    
    // Initial call with fallback data
    onScroll({ scroll: lenis.scroll || 0 })

    // Cleanup
    return () => {
      lenis.off('scroll', onScroll)
      removeWaterParticles()
    }
  }, [lenis])

  return null // This component doesn't render anything, just handles scroll effects
} 