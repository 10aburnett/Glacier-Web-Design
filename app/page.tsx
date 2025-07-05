'use client'

import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import ProcessSection from '@/components/ProcessSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'

export default function Home() {
  // Handle scroll position restoration for pill button navigation
  useEffect(() => {
    const cameFromPillButton = sessionStorage.getItem('cameFromPillButton')
    const savedScrollPosition = sessionStorage.getItem('pillButtonScrollPosition')
    
    if (cameFromPillButton === 'true' && savedScrollPosition) {
      // User came back from pill button navigation, restore scroll position
      const scrollY = parseInt(savedScrollPosition, 10)
      
      // Small delay to ensure page is fully loaded
      setTimeout(() => {
        window.scrollTo({ top: scrollY, behavior: 'smooth' })
      }, 100)
      
      // Clear the flags
      sessionStorage.removeItem('cameFromPillButton')
      sessionStorage.removeItem('pillButtonScrollPosition')
    } else {
      // Normal page load, go to top
      window.scrollTo(0, 0)
    }
  }, [])

  
  return (
    <div data-page="home" className="homepage-bg">
      <div className="homepage-content">
        <main className="relative z-10 min-h-screen">
          <Navbar />
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <ProcessSection />
          <CTASection />
    
          <Footer />
        </main>
      </div>
    </div>
  )
} 