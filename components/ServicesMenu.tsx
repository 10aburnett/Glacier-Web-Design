'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useLenis } from './LenisProvider'
import ServicePill from './ServicePill'
import { 
  Layout, 
  Smartphone, 
  Search, 
  Cloud, 
  Palette,
  Zap
} from 'lucide-react'

// Desktop order (original)
const servicesDesktop = [
  {
    title: 'Website Redesign',
    icon: Layout,
    id: 'website-redesign'
  },
  {
    title: 'Mobile Optimization',
    icon: Smartphone,
    id: 'mobile-optimization'
  },
  {
    title: 'SEO & Performance',
    icon: Search,
    id: 'seo-performance'
  },
  {
    title: 'Hosting Solutions',
    icon: Cloud,
    id: 'hosting-solutions'
  },
  {
    title: 'Brand Refresh',
    icon: Palette,
    id: 'brand-refresh'
  },
  {
    title: 'Speed Optimization',
    icon: Zap,
    id: 'speed-optimization'
  }
]

// Mobile order (rearranged per user request)
const servicesMobile = [
  {
    title: 'Website Redesign',
    icon: Layout,
    id: 'website-redesign'
  },
  {
    title: 'Mobile Optimization',
    icon: Smartphone,
    id: 'mobile-optimization'
  },
  {
    title: 'SEO & Performance',
    icon: Search,
    id: 'seo-performance'
  },
  {
    title: 'Speed Optimization',
    icon: Zap,
    id: 'speed-optimization'
  },
  {
    title: 'Hosting Solutions',
    icon: Cloud,
    id: 'hosting-solutions'
  },
  {
    title: 'Brand Refresh',
    icon: Palette,
    id: 'brand-refresh'
  }
]

export default function ServicesMenu() {
  const router = useRouter()
  const lenis = useLenis()
  const [isMobile, setIsMobile] = useState(false)

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640) // 640px is the sm breakpoint in Tailwind
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handlePillClick = (serviceId: string) => {
    // Store current scroll position before navigating
    const currentScrollY = lenis ? lenis.scroll : window.scrollY
    sessionStorage.setItem('pillButtonScrollPosition', currentScrollY.toString())
    sessionStorage.setItem('cameFromPillButton', 'true')
    
    router.push(`/services#${serviceId}`)
  }

  // Use mobile or desktop services array based on screen size
  const services = isMobile ? servicesMobile : servicesDesktop

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-3 max-w-3xl mx-auto">
      {services.map((service, index) => (
        <ServicePill
          key={`${isMobile ? 'mobile' : 'desktop'}-${service.id}`}
          title={service.title}
          icon={service.icon}
          serviceId={service.id}
          animationDelay={index}
          onClick={handlePillClick}
        />
      ))}
    </div>
  )
} 