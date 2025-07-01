'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Mountain } from 'lucide-react'

export default function HeroSection() {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(-1)
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [cursorState, setCursorState] = useState('typing') // 'typing', 'blinking', 'hidden'
  const fullText = 'Reimagined.'
  
  useEffect(() => {
    // Highly variable typing delays for natural human feel
    const typingDelays = [
      65,   // R - very quick confident start
      220,  // e - longer pause
      45,   // i - super quick
      180,  // m - thinking pause
      75,   // a - quick burst
      320,  // g - long hesitation
      40,   // i - lightning fast
      55,   // n - quick continuation
      160,  // e - normal pace
      280,  // d - long pause before punctuation
      95    // . - final punctuation
    ]
    
    // Delay before starting typing effect
    const startDelay = setTimeout(() => {
      let currentIndex = 0
      
      const typeNextLetter = () => {
        if (currentIndex < fullText.length) {
          setCurrentLetterIndex(currentIndex)
          currentIndex++
          
          if (currentIndex < fullText.length) {
            // Schedule next letter with variable delay
            setTimeout(typeNextLetter, typingDelays[currentIndex - 1] || 120)
          } else {
            // Typing complete
            setIsTypingComplete(true)
            setCursorState('blinking')
          }
        }
      }
      
      typeNextLetter()
    }, 800) // Start typing after 800ms
    
    return () => clearTimeout(startDelay)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Content overlay for better readability over iceberg background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent" />

      {/* Main content */}
      <div className="section-padding relative z-10 -mt-64 landscape:max-md:mt-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 md:mb-6 leading-tight"
          >
            <div className="text-left -ml-4 md:-ml-8 lg:-ml-12">
            <span className="text-gradient">Web Design</span>
            </div>
            <div className="text-right -mr-4 md:-mr-8 lg:-mr-12">
              <span className="text-white drop-shadow-lg relative inline-block">
                {fullText.split('').map((letter, index) => (
                  <span key={index} className="relative">
                    <span className={index <= currentLetterIndex ? 'opacity-100' : 'opacity-0'}>
                      {letter}
                    </span>
                    {cursorState !== 'hidden' && (
                      (!isTypingComplete && index === currentLetterIndex) ||
                      (isTypingComplete && index === fullText.length - 1)
                    ) && (
                      <span className={`typing-cursor absolute ${cursorState === 'blinking' ? 'cursor-final-blink' : ''}`}></span>
                    )}
                  </span>
                ))}
              </span>
            </div>
          </motion.h1>
          
        </motion.div>
      </div>


    </section>
  )
} 