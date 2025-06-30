'use client'

import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import ServicesSection from '@/components/ServicesSection'
import ProcessSection from '@/components/ProcessSection'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import ParallaxBackground from '@/components/ParallaxBackground'

export default function Home() {
  // Ensure page always loads at top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
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