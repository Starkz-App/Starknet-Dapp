'use client'

import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const GradientCircle = ({ colors, size }: { colors: string[]; size: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      width: size,
      height: size,
      background: `radial-gradient(circle, ${colors[0]} 0%, ${colors[1]} 100%)`,
      opacity: 0.5,
      filter: 'blur(80px)',
    }}
    initial={{
      x: `${Math.random() * 140 - 20}%`,
      y: `${Math.random() * 140 - 20}%`,
      scale: Math.random() * 0.5 + 0.5,
    }}
    animate={{
      x: `${Math.random() * 140 - 20}%`,
      y: `${Math.random() * 140 - 20}%`,
      scale: [Math.random() * 0.5 + 0.5, Math.random() * 0.7 + 0.3, Math.random() * 0.5 + 0.5],
    }}
    transition={{
      duration: (Math.random() * 24 + 16) * 0.67,
      repeat: Infinity,
      repeatType: 'reverse',
    }}
  />
)

export const AnimatedBackground = () => {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = theme === 'system' ? systemTheme : theme

  const gradients = [
    ['rgba(0, 0, 255, 0.2)', 'rgba(0, 0, 255, 0.1)'],
    ['rgba(236, 121, 107, 0.2)', 'rgba(236, 121, 107, 0.1)'],
    ['rgba(225, 117, 177, 0.2)', 'rgba(225, 117, 177, 0.1)'],
  ]

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div 
        className={`absolute inset-0 transition-colors duration-500 ${
          currentTheme === 'dark' ? 'bg-primary-900' : 'bg-primary-50'
        }`} 
      />
      {mounted && Array.from({ length: 20 }).map((_, i) => (
        <GradientCircle key={i} colors={gradients[i % gradients.length]} size={Math.random() * 600 + 300} />
      ))}
    </div>
  )
}

