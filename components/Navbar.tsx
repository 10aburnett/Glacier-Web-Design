'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Mountain } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useScrollToTop } from './LenisProvider'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Why Glacier', href: '/why-glacier' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' }
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()
  const { navigateAndScrollToTop } = useScrollToTop()
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Always show navbar at the top of the page
      if (currentScrollY < 50) {
        setIsVisible(true)
      } else {
        // Show when scrolling up, hide when scrolling down
        if (currentScrollY < lastScrollY) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 py-4"
    >
      <div className="section-padding">
        <div className="glass-dark rounded-2xl px-4 md:px-6 lg:px-10 py-3 transition-all duration-300 border border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            {/* Logo - Text and Icon Only */}
            <button 
              onClick={() => navigateAndScrollToTop('/')} 
              className="flex items-center gap-3 group"
            >
              <Mountain className="w-8 h-8 text-white group-hover:text-white/80 transition-colors duration-300" />
              <span className="text-2xl font-bold text-white group-hover:text-white/80 transition-colors duration-300">GLACIER</span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href
                const isHome = item.href === '/'
                const shouldHide = isHome && pathname === '/'
                
                if (shouldHide) return null
                
                return (
                  <button
                    key={item.name}
                    onClick={() => navigateAndScrollToTop(item.href)}
                    className={`${
                      isActive 
                        ? 'text-glacier-500' 
                        : 'text-white hover:text-white/80'
                    } transition-colors font-medium text-sm uppercase tracking-wide ${
                      index === 0 ? 'md:ml-6 lg:ml-0' : ''
                    }`}
                  >
                    {item.name}
                  </button>
                )
              })}
              <button 
                onClick={() => navigateAndScrollToTop('/quote')} 
                className="btn-primary text-sm px-5 py-2"
              >
                Get Quote
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <motion.div
            initial={false}
            animate={{
              height: isMobileMenuOpen ? 'auto' : 0,
              opacity: isMobileMenuOpen ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <nav className="flex flex-col gap-4 py-6 mt-4 border-t border-white/20">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const isHome = item.href === '/'
                const shouldHide = isHome && pathname === '/'
                
                if (shouldHide) return null
                
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      navigateAndScrollToTop(item.href)
                    }}
                    className={`${
                      isActive 
                        ? 'text-glacier-500' 
                        : 'text-white hover:text-white/80'
                    } transition-colors font-medium px-2 text-left`}
                  >
                    {item.name}
                  </button>
                )
              })}
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  navigateAndScrollToTop('/quote')
                }}
                className="btn-primary w-full mt-2 text-center block"
              >
                Get Quote
              </button>
            </nav>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
} 