'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { TrendingUp, Shield, Mountain, Sparkles } from 'lucide-react'



const values = [
  {
    title: 'Excellence',
    description: 'We pursue perfection in every pixel, every line of code, and every client interaction.',
    icon: Sparkles
  },
  {
    title: 'Innovation',
    description: 'Staying ahead of digital trends to deliver cutting-edge solutions that give you a competitive edge.',
    icon: Mountain
  },
  {
    title: 'Transparency',
    description: 'Clear communication, honest timelines, and no hidden fees. You always know where your project stands.',
    icon: Shield
  },
  {
    title: 'Results',
    description: 'We measure our success by your success. Every design decision is driven by performance and customer feedback.',
    icon: TrendingUp
  }
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-ice-950 via-glacier-950 to-ice-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-fintech-accent rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-fintech-primary rounded-full blur-3xl" />
        </div>

        <div className="section-padding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-gradient">About</span>
              <span className="text-white"> Glacier</span>
            </h1>
            <p className="text-xl md:text-2xl text-glacier-200 leading-relaxed">
              We're not just another web agency. We're digital architects crafting 
              high-performance experiences that transform businesses.
            </p>
          </motion.div>
        </div>
      </section>



      {/* Story Section */}
      <section className="py-20">
        <div className="section-padding">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Our Story
              </h2>
              <p className="text-lg text-glacier-200 mb-6 leading-relaxed">
                Founded on the belief that exceptional web design should be accessible to all businesses, 
                Glacier Web Design emerged from a simple observation: too many companies were stuck with 
                outdated, underperforming websites that held them back.
              </p>
              <p className="text-lg text-glacier-200 mb-6 leading-relaxed">
                We set out to change that by combining cutting-edge design principles with 
                fintech-grade performance standards. Our approach creates digital experiences that don't 
                just look beautiful—they deliver measurable results and authentic brand representation.
              </p>
              <p className="text-lg text-glacier-200 leading-relaxed">
                Our vision extends beyond individual projects: we're building a future where thoughtful 
                design and strategic thinking help businesses connect with their audiences in more 
                meaningful ways, fostering genuine growth and lasting success.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-dark rounded-2xl p-8 backdrop-blur-xl border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">Our Values</h3>
                <div className="space-y-6">
                  {values.map((value, index) => {
                    const Icon = value.icon
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex gap-4"
                      >
                        <div className="flex-shrink-0">
                          <Icon className="w-6 h-6 text-fintech-accent" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-1">{value.title}</h4>
                          <p className="text-glacier-300 text-sm">{value.description}</p>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="section-padding">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass-dark rounded-2xl p-8 text-center max-w-3xl mx-auto backdrop-blur-xl border border-white/10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="text-xl text-glacier-200 mb-8">
              Let's discuss how we can help you achieve your business goals
            </p>
            <Link href="/quote" className="btn-primary inline-block">
              Start Your Journey
              <span className="inline-block ml-2">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 