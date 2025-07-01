'use client'

import { useRouter } from 'next/navigation'
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

const services = [
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

export default function ServicesMenu() {
  const router = useRouter()
  const lenis = useLenis()

  const handlePillClick = (serviceId: string) => {
    // Store current scroll position before navigating
    const currentScrollY = lenis ? lenis.scroll : window.scrollY
    sessionStorage.setItem('pillButtonScrollPosition', currentScrollY.toString())
    sessionStorage.setItem('cameFromPillButton', 'true')
    
    router.push(`/services#${serviceId}`)
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 max-w-3xl mx-auto">
      {services.map((service, index) => (
        <ServicePill
          key={index}
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