
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Mail, Phone, MapPin, Send, Calendar } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: '',
          budget: '',
          message: ''
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'Infoglacierdesign@gmail.com',
      action: 'mailto:Infoglacierdesign@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: 'Access granted to clients',
      action: 'tel:+15551234567'
    },
    {
      icon: Calendar,
      title: 'Schedule a Meeting',
      value: 'Book a free consultation',
      action: '#'
    }
  ]



  return (
    <main className="min-h-screen bg-gradient-to-b from-ice-950 via-glacier-950 to-ice-950">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg className="absolute bottom-0 w-full h-64" viewBox="0 0 1440 320" preserveAspectRatio="none">
              <path 
                d="M0,320 L0,200 L360,150 L720,200 L1080,120 L1440,180 L1440,320 Z" 
                fill="rgba(255,255,255,0.02)"
              />
            </svg>
          </div>
        </div>

        <div className="section-padding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-white">Contact Us To</span>
              <br />
              <span className="text-gradient">Get Started</span>
            </h1>
            <p className="text-xl md:text-2xl text-glacier-200 leading-relaxed">
              Ready to transform your digital presence? We're here to help 
              bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-12">
        <div className="section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-8"
            >
              <div className="glass-dark rounded-2xl p-6 backdrop-blur-xl border border-white/10 h-full">
                <h2 className="text-2xl font-bold text-white mb-4">Send Us a Message</h2>
                                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="peer w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 
                                 rounded-xl focus:outline-none focus:border-fintech-accent transition-colors
                                 placeholder-transparent text-white"
                        placeholder="Your Name"
                        required
                      />
                      <label 
                        htmlFor="name"
                        className="absolute left-4 -top-2.5 bg-ice-950 px-2 text-sm text-glacier-300
                                 peer-placeholder-shown:text-base peer-placeholder-shown:top-3
                                 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 
                                 peer-focus:text-sm peer-focus:bg-ice-950 peer-focus:text-fintech-accent 
                                 transition-all"
                      >
                        Your Name
                      </label>
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="peer w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 
                                 rounded-xl focus:outline-none focus:border-fintech-accent transition-colors
                                 placeholder-transparent text-white"
                        placeholder="Email"
                        required
                      />
                      <label 
                        htmlFor="email"
                        className="absolute left-4 -top-2.5 bg-ice-950 px-2 text-sm text-glacier-300
                                 peer-placeholder-shown:text-base peer-placeholder-shown:top-3
                                 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 
                                 peer-focus:text-sm peer-focus:bg-ice-950 peer-focus:text-fintech-accent 
                                 transition-all"
                      >
                        Email Address
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Company */}
                    <div className="relative">
                      <input
                        type="text"
                        name="company"
                        id="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="peer w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 
                                 rounded-xl focus:outline-none focus:border-fintech-accent transition-colors
                                 placeholder-transparent text-white"
                        placeholder="Company"
                      />
                      <label 
                        htmlFor="company"
                        className="absolute left-4 -top-2.5 bg-ice-950 px-2 text-sm text-glacier-300
                                 peer-placeholder-shown:text-base peer-placeholder-shown:top-3
                                 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 
                                 peer-focus:text-sm peer-focus:bg-ice-950 peer-focus:text-fintech-accent 
                                 transition-all"
                      >
                        Company (Optional)
                      </label>
                    </div>

                    {/* Project Type */}
                    <div className="relative">
                      <select
                        name="projectType"
                        id="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 
                                 rounded-xl focus:outline-none focus:border-fintech-accent transition-colors
                                 text-white"
                        required
                      >
                        <option value="" className="bg-ice-950">Select Project Type</option>
                        <option value="redesign" className="bg-ice-950">Website Redesign</option>
                        <option value="new-site" className="bg-ice-950">New Website</option>
                        <option value="optimization" className="bg-ice-950">Performance Optimization</option>
                        <option value="consultation" className="bg-ice-950">Consultation</option>
                      </select>
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div className="relative">
                    <select
                      name="budget"
                      id="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 
                               rounded-xl focus:outline-none focus:border-fintech-accent transition-colors
                               text-white"
                    >
                      <option value="" className="bg-ice-950">Select Budget Range</option>
                      <option value="5-10k" className="bg-ice-950">$5,000 - $10,000</option>
                      <option value="10-25k" className="bg-ice-950">$10,000 - $25,000</option>
                      <option value="25-50k" className="bg-ice-950">$25,000 - $50,000</option>
                      <option value="50k+" className="bg-ice-950">$50,000+</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="relative">
                    <textarea
                      name="message"
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      className="peer w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 
                               rounded-xl focus:outline-none focus:border-fintech-accent transition-colors
                               placeholder-transparent resize-none text-white"
                      placeholder="Message"
                      required
                    />
                    <label 
                      htmlFor="message"
                      className="absolute left-4 -top-2.5 bg-ice-950 px-2 text-sm text-glacier-300
                               peer-placeholder-shown:text-base peer-placeholder-shown:top-3
                               peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 
                               peer-focus:text-sm peer-focus:bg-ice-950 peer-focus:text-fintech-accent 
                               transition-all"
                    >
                      Tell us about your project
                    </label>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <Send className="w-4 h-4" />
                  </motion.button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-300 text-center"
                    >
                      ✅ Message sent successfully! We'll get back to you soon.
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-300 text-center"
                    >
                      ❌ Failed to send message. Please try again or email us directly.
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-4"
            >
              {/* Contact Information */}
              <div className="glass-dark rounded-2xl p-7 backdrop-blur-xl border border-white/10 h-full">
                <h3 className="text-2xl font-bold text-white mb-9">Get in Touch</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon
                    const isScheduleCall = info.title === 'Schedule a Meeting'
                    const isPhone = info.title === 'Phone'
                    const isLast = index === contactInfo.length - 1
                    
                    const itemContent = isScheduleCall || isPhone ? (
                      <div className="flex items-center gap-5 p-4 rounded-xl bg-white/5">
                        <div className="w-14 h-14 bg-fintech-accent/20 rounded-xl flex items-center justify-center">
                          <Icon className="w-7 h-7 text-fintech-accent" />
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-white mb-1">{info.title}</h4>
                          <p className="text-sm text-glacier-300">{info.value}</p>
                        </div>
                      </div>
                    ) : (
                      <a
                        href={info.action}
                        className="flex items-center gap-5 p-4 rounded-xl hover:bg-white/10 transition-all duration-300 group bg-white/5"
                      >
                        <div className="w-14 h-14 bg-fintech-accent/20 rounded-xl flex items-center justify-center group-hover:bg-fintech-accent/30 transition-colors">
                          <Icon className="w-7 h-7 text-fintech-accent" />
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-white mb-1 group-hover:text-fintech-accent transition-colors">{info.title}</h4>
                          <p className="text-sm text-glacier-300">{info.value}</p>
                        </div>
                      </a>
                    )
                    
                    return (
                      <div key={index}>
                        {itemContent}
                        {!isLast && <div className="border-b border-white/10 mt-6"></div>}
                      </div>
                    )
                  })}
                </div>
              </div>


            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
} 