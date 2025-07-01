'use client'

import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'CEO, TechStartup Inc.',
    image: '/api/placeholder/80/80',
    quote: 'Glacier Web Design transformed our outdated site into a conversion machine. Our online sales increased by 200% within three months!',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Owner, Chen\'s Restaurant',
    image: '/api/placeholder/80/80',
    quote: 'The new booking system they implemented is incredible. We\'ve seen a 150% increase in online reservations. Best investment we\'ve made!',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    title: 'Marketing Director, E-Shop Pro',
    image: '/api/placeholder/80/80',
    quote: 'Not only did they make our site beautiful, but the performance improvements were game-changing. Page load times decreased by 70%!',
    rating: 5
  }
]

export default function TestimonialsSection() {
  return (
    <section className="py-mobile-section relative">
      <div className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-mobile-section"
        >
          <h2 className="text-mobile-section-heading font-bold mb-4 md:mb-6">
            <span className="text-white drop-shadow-lg">What Our</span>
            <br />
            <span className="text-gradient drop-shadow-lg">Clients Say</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="glass-dark rounded-2xl p-6 h-full backdrop-blur-xl hover:bg-white/10 transition-all duration-300">
                <Quote className="w-6 h-6 text-glacier-400 mb-4" />
                
                <p className="text-white/80 mb-6 text-sm italic">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-glacier-400 to-glacier-600 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-white/60">
                      {testimonial.title}
                    </p>
                  </div>
                </div>

                {/* Minimalist Rating */}
                <div className="flex gap-0.5 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-glacier-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 