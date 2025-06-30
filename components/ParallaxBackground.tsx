'use client'

import { useEffect } from 'react'

export default function ParallaxBackground() {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5 // Parallax speed
      const maxScroll = document.body.scrollHeight - window.innerHeight
      const scrollPercent = scrolled / maxScroll
      
      const parallaxElement = document.querySelector('.iceberg-background') as HTMLElement
      
      if (parallaxElement) {
        // Apply parallax transform
        parallaxElement.style.transform = `translateY(${rate}px)`
        
        // Progressive reveal effects based on scroll position
        if (scrollPercent < 0.1) {
          // Top section - Aurora/Sky area
          parallaxElement.style.filter = 'brightness(1.1) contrast(0.95) saturate(1.1)'
          parallaxElement.style.backgroundPosition = 'center -150px'
        } else if (scrollPercent < 0.3) {
          // Upper iceberg area
          parallaxElement.style.filter = 'brightness(1.05) contrast(1) saturate(1.05)'
          parallaxElement.style.backgroundPosition = 'center calc(20% - 150px)'
        } else if (scrollPercent < 0.6) {
          // Waterline area
          parallaxElement.style.filter = 'brightness(1) contrast(1.05) saturate(1)'
          parallaxElement.style.backgroundPosition = 'center calc(40% - 150px)'
        } else if (scrollPercent < 0.8) {
          // Upper underwater area
          parallaxElement.style.filter = 'brightness(0.95) contrast(1.1) saturate(0.95) hue-rotate(5deg)'
          parallaxElement.style.backgroundPosition = 'center calc(60% - 150px)'
        } else {
          // Deep underwater area
          parallaxElement.style.filter = 'brightness(0.85) contrast(1.15) saturate(0.9) hue-rotate(10deg)'
          parallaxElement.style.backgroundPosition = 'center calc(80% - 150px)'
        }
      }

      // Add subtle water particles effect in deep areas
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

    // Optimized scroll listener with requestAnimationFrame
    let ticking = false
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    // Ensure page loads at top
    window.scrollTo(0, 0)
    
    // Use passive listener for better performance
    window.addEventListener('scroll', requestTick, { passive: true })
    
    // Initial call
    handleScroll()

    // Cleanup
    return () => {
      window.removeEventListener('scroll', requestTick)
      removeWaterParticles()
    }
  }, [])

  return null // This component doesn't render anything, just handles scroll effects
} 