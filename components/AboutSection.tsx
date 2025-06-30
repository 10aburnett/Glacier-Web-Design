'use client'

import { motion } from 'framer-motion'
import { Award, Users, TrendingUp, Shield } from 'lucide-react'

const stats = [
  { icon: Award, value: '50+', label: 'Sites Transformed' },
  { icon: Users, value: '98%', label: 'Client Satisfaction' },
  { icon: TrendingUp, value: '200%', label: 'Avg. Conversion Boost' },
  { icon: Shield, value: '24/7', label: 'Support & Security' }
]

export default function AboutSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-cloud-white to-frost-blue/5">
      <div className="section-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >


          </motion.div>


        </div>
      </div>
    </section>
  )
} 