'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface ServicePillProps {
  title: string
  icon: LucideIcon
  serviceId: string
  animationDelay: number
  onClick: (serviceId: string) => void
}

export default function ServicePill({ title, icon: Icon, serviceId, animationDelay, onClick }: ServicePillProps) {
    return (
    <motion.button
      layout
      onClick={() => onClick(serviceId)}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      className="
        relative text-left
        backdrop-blur-[12px] border border-white/12
        hover:border-white/20 hover:backdrop-blur-[16px]
        bg-white/15 rounded-xl pl-2 pr-3 py-2 sm:py-3
        inline-block animate-gentle-float cursor-pointer
        opacity-100 transition-colors duration-300
      "
      transition={{ 
        duration: 0.2, 
        ease: "easeOut",
        layout: { duration: 0.2 }
      }}
      whileHover={{ 
        scale: 1.02, // Reduced scale for subtlety
        transition: { duration: 0.15, ease: "easeOut" }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1, ease: "easeOut" }
      }}
      style={{ 
        width: 'max-content',
        animationDelay: `${animationDelay * 0.6}s`,
        opacity: 1,
        willChange: 'transform', // Optimize for transform changes
        transform: 'translateZ(0)' // Force hardware acceleration
      }}
    >
      {/* Title Area */}
      <div className="flex items-center gap-1.5">
        {/* Icon */}
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-ice-950 border-2 border-glacier-400 transition-colors duration-300">
          <Icon 
            className="w-4 h-4 text-white" 
            key={`service-icon-${serviceId}`}
          />
        </div>
        
        {/* Title */}
        <span className="text-white font-medium text-sm">
          {title}
        </span>
      </div>


    </motion.button>
  )
} 