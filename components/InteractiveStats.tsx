"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Zap, TrendingUp, Users, Award, BookOpen } from "lucide-react"

interface Stat {
  label: string
  value: number
  suffix?: string
  prefix?: string
  icon: any
  color: string
  gradient: string
  trend?: string
}

const stats: Stat[] = [
  {
    label: "Total Starkz",
    value: 45678,
    icon: Zap,
    color: "text-yellow-500",
    gradient: "from-yellow-500/20 to-orange-500/20",
    trend: "+23.5%",
  },
  {
    label: "Active Users",
    value: 12543,
    icon: Users,
    color: "text-blue-500",
    gradient: "from-blue-500/20 to-cyan-500/20",
    trend: "+18.2%",
  },
  {
    label: "Publications",
    value: 3892,
    icon: BookOpen,
    color: "text-green-500",
    gradient: "from-green-500/20 to-emerald-500/20",
    trend: "+34.1%",
  },
  {
    label: "Rewards Paid",
    value: 89234,
    prefix: "$",
    icon: Award,
    color: "text-purple-500",
    gradient: "from-purple-500/20 to-pink-500/20",
    trend: "+41.7%",
  },
]

export function InteractiveStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={stat.label} stat={stat} index={index} />
      ))}
    </div>
  )
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const [count, setCount] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Animate counter
    let current = 0
    const increment = stat.value / 60
    const timer = setInterval(() => {
      current += increment
      if (current >= stat.value) {
        setCount(stat.value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 20)

    return () => clearInterval(timer)
  }, [stat.value])

  const Icon = stat.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        className={`border-0 bg-gradient-to-br ${stat.gradient} backdrop-blur-xl relative overflow-hidden group cursor-pointer transition-all duration-300 ${
          isHovered ? "scale-105 shadow-2xl" : "scale-100"
        }`}
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Floating icon background */}
        <div className="absolute -right-4 -top-4 opacity-10">
          <Icon className="h-24 w-24 rotate-12 group-hover:rotate-[30deg] transition-transform duration-700" />
        </div>

        <CardContent className="p-6 relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div
              className={`p-3 rounded-xl bg-white/50 dark:bg-black/20 ${stat.color} group-hover:scale-110 transition-transform duration-300`}
            >
              <Icon className="h-5 w-5" />
            </div>
            {stat.trend && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/20 text-green-700 dark:text-green-300 text-xs font-semibold">
                <TrendingUp className="h-3 w-3" />
                {stat.trend}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <motion.div
              className="text-3xl font-bold"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
            >
              {stat.prefix}
              {count.toLocaleString()}
              {stat.suffix}
            </motion.div>
            <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
