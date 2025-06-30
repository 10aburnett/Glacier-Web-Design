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
        relative transition-all duration-300 text-left
        backdrop-blur-[12px] border border-white/12
        hover:border-white/20 hover:backdrop-blur-[16px]
        bg-white/15 rounded-full pl-2 pr-3 py-2 sm:py-3
        inline-block animate-gentle-float cursor-pointer
        opacity-100
      "
      transition={{ duration: 0.3, ease: "easeInOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      style={{ 
        width: 'max-content',
        animationDelay: `${animationDelay * 0.6}s`,
        opacity: 1
      }}
    >
      {/* Title Area */}
      <div className="flex items-center gap-1.5">
        {/* Icon */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 bg-white/10">
          <Icon className="w-4 h-4 text-cyan-400 animate-color-shift" />
        </div>
        
        {/* Title */}
        <span className="text-white font-medium text-sm">
          {title}
        </span>
      </div>


    </motion.button>
  )
} 