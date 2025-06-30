'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Zap, TrendingUp, Shield } from 'lucide-react'

const portfolioItems = [
  {
    id: 1,
    title: 'New Rice Purity Test 2025',
    category: 'Online Tool/Quiz',
    description: 'Modern interactive quiz platform with engaging user experience',
    before: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop&fm=jpg&q=80',
    after: '/assets/newricepurity.com%20screenshot.png?v=2',
    websiteUrl: 'https://newricepurity.com/',
    metrics: [
      { icon: Zap, label: 'Load Time', value: '0.9s' },
      { icon: TrendingUp, label: 'Engagement', value: '+180%' },
      { icon: Shield, label: 'Mobile Score', value: '100/100' }
    ],
    color: 'from-glacier-500 to-glacier-600'
  },
  {
    id: 2,
    title: 'TechVentures Inc.',
    category: 'Technology Platform',
    description: 'Complete redesign resulting in 200% performance increase',
    before: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=500&fit=crop&fm=jpg&q=80',
    after: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop&fm=jpg&q=80',
    metrics: [
      { icon: Zap, label: '3x Faster', value: '0.8s Load' },
      { icon: TrendingUp, label: 'Conversions', value: '+200%' },
      { icon: Shield, label: 'Security', value: 'A+ Rating' }
    ],
    color: 'from-glacier-500 to-glacier-600'
  },
  {
    id: 3,
    title: 'Alpine Restaurant Group',
    category: 'Hospitality',
    description: 'Modern booking system with seamless user experience',
    before: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800&h=500&fit=crop&fm=jpg&q=80',
    after: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=500&fit=crop&fm=jpg&q=80',
    metrics: [
      { icon: Zap, label: 'Page Speed', value: '98/100' },
      { icon: TrendingUp, label: 'Bookings', value: '+150%' },
      { icon: Shield, label: 'Mobile', value: 'Perfect' }
    ],
    color: 'from-glacier-400 to-glacier-500'
  },
  {
    id: 4,
    title: 'Summit Commerce',
    category: 'E-commerce',
    description: 'Enterprise redesign with enhanced user experience',
    before: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop&fm=jpg&q=80',
    after: 'https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=800&h=500&fit=crop&fm=jpg&q=80',
    metrics: [
      { icon: Zap, label: 'Speed', value: '45ms' },
      { icon: TrendingUp, label: 'Sales', value: '+85%' },
      { icon: Shield, label: 'Security', value: 'Premium' }
    ],
    color: 'from-glacier-600 to-glacier-700'
  }
]

export default function PortfolioSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-advance through portfolio items
  useEffect(() => {
    if (isPaused) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % portfolioItems.length)
    }, 5000) // Change portfolio item every 5 seconds

    return () => clearInterval(interval)
  }, [isPaused])

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % portfolioItems.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 5000) // Resume auto-scroll after 5 seconds
  }

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 5000) // Resume auto-scroll after 5 seconds
  }

  const currentItem = portfolioItems[currentIndex]

  return (
    <section id="portfolio" className="py-32 relative">
      <div className="section-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-gradient drop-shadow-lg">Some of Our</span>
            <br />
            <span className="text-white drop-shadow-lg">Happy Customers</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          {/* Client showcase header */}
          <div className="text-center mb-8">
            <motion.h3 
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold text-white mb-2"
            >
              {currentItem.title}
            </motion.h3>
            <motion.p 
              key={`desc-${currentIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/70"
            >
              {currentItem.description}
            </motion.p>
          </div>

          {/* Automatic Portfolio Gallery */}
          <div className="relative">
            <div 
              className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                className="absolute inset-0"
                >
                  {currentItem.websiteUrl ? (
                    <a 
                      href={currentItem.websiteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block w-full h-full cursor-pointer group"
              >
                <img 
                  src={currentItem.after} 
                        alt={`${currentItem.title} - Website Design`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/30 transition-all duration-300" />
                      
                      {/* Click indicator */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                          <span className="text-white font-medium text-sm">Visit Website →</span>
                </div>
              </div>
                    </a>
                  ) : (
                    <>
                      <img 
                        src={currentItem.after} 
                        alt={`${currentItem.title} - Website Design`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </>
                  )}
                  
                  {/* Client label */}
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-4 left-4 bg-glacier-500/90 backdrop-blur-sm px-4 py-2 rounded-full pointer-events-none z-10"
                  >
                    <span className="text-white text-sm font-medium">
                      {currentItem.title}
                    </span>
                  </motion.div>

                  {/* Category badge */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full pointer-events-none z-10"
                  >
                    <span className="text-white text-xs font-medium">
                      {currentItem.category}
                    </span>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              <button
                onClick={prevItem}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full p-3 transition-all duration-300 z-20 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={nextItem}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-full p-3 transition-all duration-300 z-20 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Portfolio navigation dots */}
            <div className="flex justify-center items-center mt-8 gap-2">
              {portfolioItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    setIsPaused(true)
                    setTimeout(() => setIsPaused(false), 5000) // Resume auto-scroll after 5 seconds
                  }}
                  className={`h-2 rounded-full transition-all duration-500 hover:scale-125 ${
                    index === currentIndex 
                      ? 'w-8 bg-white/80' 
                      : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>


          </div>

          {/* Metrics - Minimal style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center gap-8 mt-8"
          >
            {currentItem.metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-white">{metric.value}</div>
                <div className="text-sm text-white/60">{metric.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 