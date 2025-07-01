'use client'

import { useEffect } from 'react'
import { useLenis } from '@/components/LenisProvider'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import ProcessSection from '@/components/ProcessSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import ParallaxBackground from '@/components/ParallaxBackground'

export default function Home() {
  const lenis = useLenis()
  
  // Handle scroll position restoration for pill button navigation
  useEffect(() => {
    const cameFromPillButton = sessionStorage.getItem('cameFromPillButton')
    const savedScrollPosition = sessionStorage.getItem('pillButtonScrollPosition')
    
    if (cameFromPillButton === 'true' && savedScrollPosition) {
      // User came back from pill button navigation, restore scroll position
      const scrollY = parseInt(savedScrollPosition, 10)
      
      // Small delay to ensure page is fully loaded
      setTimeout(() => {
        if (lenis) {
          lenis.scrollTo(scrollY, { duration: 0.8 })
        } else {
          window.scrollTo({ top: scrollY, behavior: 'smooth' })
        }
      }, 100)
      
      // Clear the flags
      sessionStorage.removeItem('cameFromPillButton')
      sessionStorage.removeItem('pillButtonScrollPosition')
    } else {
      // Normal page load, go to top
      window.scrollTo(0, 0)
    }
  }, [lenis])
  
  return (
    <>
      {/* Fixed Parallax Iceberg Background - Extended to cover full page */}
      <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
        <div className="iceberg-background w-full h-[600vh] bg-no-repeat state-top" />
      </div>

      {/* Parallax Effect Handler */}
      <ParallaxBackground />

      {/* Main Content - positioned above background */}
      <main className="relative z-10 min-h-screen">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ProcessSection />
        <CTASection />
  
        <Footer />
      </main>
    </>
  )
} 