'use client'

import { motion } from 'framer-motion'
import ServicesMenu from './ServicesMenu'

export default function ServicesSection() {
  return (
    <section className="py-mobile-section-large relative">
      <div className="section-padding">
        <div className="text-center mb-mobile-section">
          <h2 className="text-mobile-section-heading font-bold mb-4 md:mb-6 overflow-hidden">
            <motion.span 
              initial={{ x: -200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.2
              }}
              viewport={{ once: true }}
              className="text-white drop-shadow-lg inline-block"
            >
              Services That
            </motion.span>
            <br />
            <motion.span 
              initial={{ x: 200, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.6
              }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <span className="text-white drop-shadow-lg animate-pulse-glow">
                Drive <span className="italic font-black underline decoration-white decoration-4 underline-offset-4">Results</span>.
              </span>
            </motion.span>
          </h2>
        </div>
                      
        {/* Interactive Pill Menu */}
        <div>
          <ServicesMenu />
        </div>
      </div>
    </section>
  )
} 