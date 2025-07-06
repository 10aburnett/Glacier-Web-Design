'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useScrollToTop } from '@/components/LenisProvider'
import { 
  Layout, 
  Smartphone, 
  Search, 
  Cloud, 
  Palette,
  Zap,
  Shield,
  Code,
  BarChart,
  Headphones,
  Plus
} from 'lucide-react'

const services = [
  {
    id: 1,
    serviceId: 'website-redesign',
    title: 'Web Design & Redesign',
    description: 'Convert visitors into customers with cutting-edge design.',
    icon: Layout,
    features: [
      'Modern, responsive design',
      'User experience optimization',
      'Conversion-focused layouts',
      'Brand identity integration'
    ],
    gradient: 'from-glacier-500 to-fintech-primary'
  },
  {
    id: 2,
    serviceId: 'mobile-optimization',
    title: 'Mobile Optimization',
    description: 'Ensure flawless performance across all devices with our mobile-first approach.',
    icon: Smartphone,
    features: [
      'Responsive design',
      'Touch-optimized interfaces',
      'Progressive web apps',
      'Mobile speed optimization'
    ],
    gradient: 'from-fintech-accent to-glacier-400'
  },
  {
    id: 3,
    serviceId: 'seo-performance',
    title: 'Performance & SEO',
    description: 'Boost your visibility and speed with technical optimization that drives results.',
    icon: Search,
    features: [
      'Technical SEO audit',
      'Core Web Vitals optimization',
      'Schema markup implementation',
      'Content optimization'
    ],
    gradient: 'from-glacier-600 to-fintech-accent'
  },
  {
    id: 4,
    serviceId: 'hosting-solutions',
    title: 'Cloud & Hosting',
    description: 'Enterprise-grade hosting solutions with 99.9% uptime and bulletproof security.',
    icon: Cloud,
    features: [
      'Managed hosting',
      'CDN implementation',
      'SSL certificates',
      'Automated backups'
    ],
    gradient: 'from-glacier-700 to-fintech-primary'
  },
  {
    id: 5,
    serviceId: 'brand-refresh',
    title: 'Brand Strategy',
    description: 'Develop a cohesive digital brand identity that resonates with your audience.',
    icon: Palette,
    features: [
      'Brand identity design',
      'Visual consistency',
      'Logo optimization',
      'Color palette development'
    ],
    gradient: 'from-fintech-primary to-glacier-500'
  },
  {
    id: 6,
    serviceId: 'speed-optimization',
    title: 'Speed Optimization',
    description: 'Lightning-fast load times that improve user experience and search rankings.',
    icon: Zap,
    features: [
      'Performance auditing',
      'Image optimization',
      'Code minification',
      'CDN implementation'
    ],
    gradient: 'from-fintech-accent to-glacier-600'
  }
]


export default function ServicesPage() {
  const [highlightedService, setHighlightedService] = useState<string | null>(null)
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({})
  const [hasInteracted, setHasInteracted] = useState(false)
  const { navigateAndScrollToTop } = useScrollToTop()

  const toggleCard = (serviceId: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }))
    // Hide the expand hint after first interaction
    if (!hasInteracted) {
      setHasInteracted(true)
    }
  }

  useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash.substring(1)
    if (hash) {
      // Find the service element and scroll to it using native scroll
      const serviceElement = document.getElementById(hash)
      if (serviceElement) {
        // Delay to ensure the page has rendered
        setTimeout(() => {
          // Get the element's bounding rectangle for accurate positioning
          const elementRect = serviceElement.getBoundingClientRect()
          const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop
          
          // Calculate the actual position of the element in the document
          const elementTop = elementRect.top + currentScrollTop
          
          // Account for navbar height and add buffer for clean spacing
          const navbarHeight = 100 // Fixed navbar height
          const buffer = 40 // Buffer for visual spacing
          
          // Calculate final scroll position
          const targetScrollPosition = elementTop - navbarHeight - buffer
          
          // Use native smooth scroll
          window.scrollTo({
            top: targetScrollPosition,
            behavior: 'smooth'
          })
          
          // Highlight the service
          setHighlightedService(hash)
          // Remove highlight after 3 seconds
          setTimeout(() => setHighlightedService(null), 3000)
        }, 300)
      }
    }
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-ice-950 via-glacier-950 to-ice-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div 
            animate={{ 
              background: [
                'radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute inset-0"
          />
        </div>

        <div className="section-padding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-mobile-section-heading lg:text-7xl font-bold mb-4 md:mb-6">
              <span className="text-white">Premium</span>
              <br />
              <span className="text-gradient">Web Services</span>
            </h1>
            <p className="text-mobile-body-large text-glacier-200 leading-relaxed">
              Comprehensive solutions designed to elevate your digital presence 
              and drive measurable business growth
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-mobile-section">
        <div className="section-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <motion.div
                  key={service.id}
                  id={service.serviceId}
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className={`glass-dark rounded-2xl p-8 backdrop-blur-xl transition-all duration-300 relative ${
                    highlightedService === service.serviceId 
                      ? 'border-2 border-fintech-accent shadow-lg shadow-fintech-accent/20 bg-fintech-accent/5' 
                      : 'border border-white/10 hover:border-white/20 hover:bg-white/5'
                  }`}>
                    {/* Toggle Button - Bottom Center */}
                    <button
                      onClick={() => toggleCard(service.serviceId)}
                      className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-8 h-8 flex items-center justify-center hover:bg-fintech-accent/10 rounded-full transition-all duration-300 text-fintech-accent hover:text-fintech-accent/80"
                    >
                      <Plus 
                        className={`w-5 h-5 transition-transform duration-300 ${
                          expandedCards[service.serviceId] ? 'rotate-45' : ''
                        }`}
                      />
                    </button>
                    
                    {/* Show EXPAND hint only on first card, when collapsed, and before first interaction */}
                    {service.id === 1 && !expandedCards[service.serviceId] && !hasInteracted && (
                      <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-medium tracking-wide opacity-75 animate-pulse pointer-events-none text-fintech-accent z-10">
                        CLICK TO EXPAND
                      </span>
                    )}

                    {/* Icon */}
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5 mb-6`}>
                      <div className="w-full h-full rounded-2xl bg-ice-950 flex items-center justify-center group-hover:bg-ice-900 transition-colors">
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-mobile-card-heading font-bold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-glacier-200 mb-6">
                      {service.description}
                    </p>

                    {/* Features - Collapsible */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedCards[service.serviceId] ? 'auto' : 0,
                        opacity: expandedCards[service.serviceId] ? 1 : 0
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <ul className="space-y-3 pb-8">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-fintech-accent rounded-full mt-2 flex-shrink-0" />
                            <span className="text-glacier-200 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>


                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20">
        <div className="section-padding">
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-dark rounded-2xl p-8 text-center max-w-3xl mx-auto backdrop-blur-xl border border-white/10 bg-gradient-to-r from-fintech-primary/10 to-fintech-accent/10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Elevate Your Digital Presence?
            </h2>
            <p className="text-xl text-glacier-200 mb-8">
              Let's discuss your project and create something extraordinary together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => navigateAndScrollToTop('/quote')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary inline-flex items-center justify-center"
              >
                Get Started
                <span className="inline-block ml-2">→</span>
              </motion.button>
              <motion.button
                onClick={() => navigateAndScrollToTop('/contact')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border border-white/30 transition-all duration-300 hover:bg-white/20 hover:border-white/50 inline-flex items-center justify-center"
              >
                Contact Us
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 