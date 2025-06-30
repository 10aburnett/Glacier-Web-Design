'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Calendar, CheckCircle } from 'lucide-react'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Contact message sent successfully:', result)
        setIsSubmitted(true)
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          message: ''
        })
        // Reset success state after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false)
        }, 3000)
      } else {
        const error = await response.json()
        console.error('Failed to send contact message:', error)
        alert('Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Error sending contact message:', error)
      alert('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-32 relative">
      <div className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white drop-shadow-lg">Let's Start Your</span>
            <br />
            <span className="text-gradient drop-shadow-lg">Transformation</span>
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="glass-dark rounded-3xl p-8 md:p-12 backdrop-blur-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 
                               rounded-full text-white placeholder-white/50 focus:outline-none 
                               focus:border-white/40 transition-colors"
                      placeholder="Your Name"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 
                               rounded-full text-white placeholder-white/50 focus:outline-none 
                               focus:border-white/40 transition-colors"
                      placeholder="Email Address"
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 
                               rounded-full text-white placeholder-white/50 focus:outline-none 
                               focus:border-white/40 transition-colors"
                      placeholder="Company (Optional)"
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 
                               rounded-2xl text-white placeholder-white/50 focus:outline-none 
                               focus:border-white/40 transition-colors resize-none"
                      placeholder="Tell us about your project"
                      required
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-8 py-3 font-semibold rounded-full 
                             transition-all duration-300 shadow-lg hover:shadow-xl
                             flex items-center justify-center gap-2 ${
                               isSubmitted 
                                 ? 'bg-green-500 text-white'
                                 : isSubmitting 
                                 ? 'bg-white/50 text-glacier-700 cursor-not-allowed'
                                 : 'bg-white/90 text-glacier-700 hover:bg-white'
                             }`}
                  >
                    {isSubmitted ? (
                      'Message Sent!'
                    ) : isSubmitting ? (
                      'Sending...'
                    ) : (
                      'Send Message'
                    )}
                    {isSubmitted ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                    <Send className="w-4 h-4" />
                    )}
                  </motion.button>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6 lg:pl-8"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-glacier-400/20 to-glacier-600/20 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">Email</h4>
                      <a href="mailto:Infoglacierdesign@gmail.com" className="text-glacier-400 hover:text-glacier-300 text-sm transition-colors">
                        Infoglacierdesign@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-glacier-400/20 to-glacier-600/20 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">Phone</h4>
                      <p className="text-glacier-400 text-sm">Access granted to clients</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-glacier-400/20 to-glacier-600/20 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">Schedule</h4>
                      <p className="text-glacier-400 text-sm">
                        Book a free consultation
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10">
                  <p className="text-white/70 text-sm leading-relaxed">
                    We're here to help transform your digital presence. 
                    Whether you need a complete redesign or performance optimization, 
                    let's discuss how we can elevate your website to the next level.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 