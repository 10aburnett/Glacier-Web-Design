'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { useScrollToTop } from '@/components/LenisProvider'
import { Search, Palette, Microscope, Rocket, ArrowRight } from 'lucide-react'

const processSteps = [
  {
    id: 1,
    phase: 'Phase 01',
    title: 'Discovery & Analysis',
    description: 'Deep dive into your business goals, user needs, and competitive landscape',
    icon: Search,
    details: [
      'Comprehensive site audit',
      'User journey mapping', 
      'Competitor analysis',
      'Technical assessment'
    ]
  },
  {
    id: 2,
    phase: 'Phase 02',
    title: 'Design & Strategy',
    description: 'Create stunning visuals that balance aesthetics with conversion optimization',
    icon: Palette,
    details: [
      'Wireframe development',
      'High-fidelity mockups',
      'Interactive prototypes',
      'Design system creation'
    ]
  },
  {
    id: 3,
    phase: 'Phase 03',
    title: 'Development & Testing',
    description: 'Build your site with clean code, optimized performance, and bulletproof security',
    icon: Microscope,
    details: [
      'Frontend development',
      'Backend integration',
      'Performance optimization',
      'Cross-browser testing'
    ]
  },
  {
    id: 4,
    phase: 'Phase 04',
    title: 'Launch & Scale',
    description: 'Deploy with confidence and continue optimizing based on real user data',
    icon: Rocket,
    details: [
      'Seamless deployment',
      'DNS configuration',
      'Analytics setup',
      'Ongoing optimization'
    ]
  }
]

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  const { navigateAndScrollToTop } = useScrollToTop()

  return (
    <section ref={containerRef} className="py-32 relative">
      <div className="section-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-mobile-section-heading font-bold mb-4 md:mb-6">
            <span className="text-white drop-shadow-lg">Our Proven</span>
            <br />
            <span className="text-gradient drop-shadow-lg">4-Phase Process</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            From concept to completion with precision and excellence
          </p>
        </motion.div>

        {/* Mobile: Simple Vertical Stack, Desktop: Elegant Timeline */}
        <div className="max-w-4xl mx-auto">
          {/* Timeline Line - Desktop Only */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />

          {/* Mobile Layout */}
          <div className="md:hidden space-y-6 relative">
            {/* Mobile Timeline Line - connects icons on left */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            
            {processSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 1, rotate: 0 }}
                    animate={{ scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.1, rotate: 180 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="flex-shrink-0"
                    key={`mobile-process-icon-${step.id}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-glacier-400 to-glacier-600 p-0.5">
                      <div className="w-full h-full rounded-full bg-ice-900/90 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="glass-dark rounded-2xl p-4 backdrop-blur-xl w-full">
                      <span className="text-xs text-glacier-400 font-semibold">{step.phase}</span>
                      <h3 className="text-lg font-bold text-white mt-1 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Desktop Layout - Unchanged */}
          <div className="hidden md:block space-y-12">
            {processSteps.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isEven ? 'text-right' : 'text-left'}`}>
                    <div className="glass-dark rounded-2xl p-6 backdrop-blur-xl inline-block">
                      <span className="text-sm text-glacier-400 font-semibold">{step.phase}</span>
                      <h3 className="text-2xl font-bold text-white mt-1 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-white/70 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 1, rotate: 0 }}
                    animate={{ scale: 1, rotate: 0 }}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="relative z-10"
                    key={`desktop-process-icon-${step.id}`}
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-glacier-400 to-glacier-600 p-0.5">
                      <div className="w-full h-full rounded-full bg-ice-900/90 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Empty space for other side */}
                  <div className="flex-1" />
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Elegant CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button 
            onClick={() => navigateAndScrollToTop('/quote')}
            className="inline-block px-8 py-3 bg-gradient-to-r from-glacier-500/20 to-glacier-600/20 backdrop-blur-md 
                       text-white font-semibold rounded-full border border-glacier-400/30 
                       transition-all duration-300 hover:bg-glacier-500/30 hover:border-glacier-400/50 hover:scale-105"
          >
            Start Your Journey →
          </button>
        </motion.div>
      </div>
    </section>
  )
} 