'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface Option {
  value: string
  label: string
}

interface CustomDropdownProps {
  name: string
  id: string
  value: string
  onChange: (name: string, value: string) => void
  options: Option[]
  placeholder: string
  required?: boolean
  className?: string
}

export default function CustomDropdown({
  name,
  id,
  value,
  onChange,
  options,
  placeholder,
  required = false,
  className = ''
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setFocusedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (isOpen && focusedIndex >= 0) {
          handleSelect(options[focusedIndex].value)
        } else {
          setIsOpen(!isOpen)
        }
        break
      case 'Escape':
        setIsOpen(false)
        setFocusedIndex(-1)
        break
      case 'ArrowDown':
        event.preventDefault()
        if (!isOpen) {
          setIsOpen(true)
        } else {
          setFocusedIndex(prev => 
            prev < options.length - 1 ? prev + 1 : 0
          )
        }
        break
      case 'ArrowUp':
        event.preventDefault()
        if (isOpen) {
          setFocusedIndex(prev => 
            prev > 0 ? prev - 1 : options.length - 1
          )
        }
        break
    }
  }

  const handleSelect = (optionValue: string) => {
    onChange(name, optionValue)
    setIsOpen(false)
    setFocusedIndex(-1)
  }

  const selectedOption = options.find(option => option.value === value)
  const displayText = selectedOption ? selectedOption.label : placeholder

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Hidden input for form submission */}
      <input
        type="hidden"
        name={name}
        id={id}
        value={value}
        required={required}
      />
      
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 
                   rounded-xl focus:outline-none focus:border-fintech-accent transition-all duration-300
                   text-white text-left flex items-center justify-between group
                   hover:bg-white/10 hover:border-white/20"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={`${id}-label`}
      >
        <span className={selectedOption ? 'text-white' : 'text-white/60'}>
          {displayText}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-white/60 group-hover:text-white/80"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      {/* Dropdown Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <div 
              className="bg-ice-950/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden"
              role="listbox"
              aria-labelledby={`${id}-label`}
            >
              {options.map((option, index) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  className={`w-full px-4 py-3 text-left transition-all duration-200 
                             hover:bg-fintech-accent/20 hover:text-white
                             ${focusedIndex === index ? 'bg-fintech-accent/20 text-white' : 'text-white/80'}
                             ${index === 0 ? 'border-t-0' : 'border-t border-white/10'}
                             focus:outline-none focus:bg-fintech-accent/20`}
                  role="option"
                  aria-selected={value === option.value}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}