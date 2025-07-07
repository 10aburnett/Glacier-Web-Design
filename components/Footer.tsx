'use client'

import { Mountain, Mail, Phone, Calendar } from 'lucide-react'
import Link from 'next/link'
import { useScrollToTop } from '@/components/LenisProvider'

const footerLinks = {
  company: [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Why Glacier', href: '/why-glacier' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' }
  ]
}

const socialLinks = [
  { icon: Mail, href: '/contact', label: 'Email' },
  { icon: Phone, href: '/contact', label: 'Phone' },
  { icon: Calendar, href: '/contact', label: 'Schedule' }
]

export default function Footer() {
  const { navigateAndScrollToTop } = useScrollToTop()
  
  return (
    <footer className="relative pt-20 pb-8">
      <div className="section-padding relative z-10">
        <div className="glass-dark rounded-3xl p-8 md:p-12 backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Mountain className="w-10 h-10 text-glacier-400" />
                <div>
                  <span className="text-2xl font-bold text-white">Glacier</span>
                  <span className="block text-xs text-white/60 -mt-1">Premium Web Design</span>
                </div>
              </div>
              <p className="text-white/70 mb-6 leading-relaxed text-sm">
                Elevate your digital presence with cutting-edge design and exceptional performance. 
                Transform your business with websites that convert.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm
                               flex items-center justify-center transition-all duration-300 
                               hover:scale-110 border border-white/20 hover:border-white/30"
                    >
                      <Icon className="w-4 h-4 text-white/80 hover:text-white transition-colors" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-white mb-4 text-sm">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <button 
                      onClick={() => navigateAndScrollToTop(link.href)}
                      className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-2 group text-sm"
                    >
                      <span className="w-1 h-1 bg-glacier-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold text-white mb-4 text-sm">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <button 
                      onClick={() => navigateAndScrollToTop(link.href)}
                      className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-2 group text-sm"
                    >
                      <span className="w-1 h-1 bg-glacier-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/50 text-sm">
                © 2025 Glacier Web Design. Elevating digital experiences.
              </p>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Mail className="w-4 h-4" />
                <a href="mailto:Infoglacierdesign@gmail.com" className="hover:text-white/80 transition-colors">
                  Infoglacierdesign@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 