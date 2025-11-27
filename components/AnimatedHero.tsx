"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, TrendingUp, Users, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const stats = [
  { icon: Users, label: "Active Users", value: "2.5K+", color: "text-blue-500" },
  { icon: TrendingUp, label: "Publications", value: "10K+", color: "text-green-500" },
  { icon: Zap, label: "Total Starkz", value: "50K+", color: "text-amber-500" },
]

export function AnimatedHero() {
  const [currentStat, setCurrentStat] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-[600px] rounded-3xl overflow-hidden glass-card border-0">
      {/* Animated Background Image */}
      <Image
        src="/knowledge-sharing-technology-hero.jpg"
        alt="Knowledge Sharing Hero"
        fill
        className="object-cover animate-float-slow"
      />

      {/* Gradient Overlay with Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent animate-shimmer" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-start text-white p-8 md:p-16 max-w-4xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-6 animate-slide-up">
          <Sparkles className="h-4 w-4 animate-pulse-slow" />
          Welcome to Starkz Knowledge Hub
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance animate-slide-up stagger-1">
          Share Knowledge.
          <br />
          <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            Earn Rewards.
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl mb-8 max-w-2xl text-pretty text-gray-200 animate-slide-up stagger-2">
          Join a decentralized ecosystem where quality content is rewarded with Starkz tokens. Create, discover, and
          engage with cutting-edge knowledge.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-slide-up stagger-3">
          <Button
            size="lg"
            asChild
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-0 shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            <Link href="/explore">
              <Sparkles className="mr-2 h-5 w-5" />
              Start Exploring
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 hover:scale-105 transition-all"
          >
            <Link href="/new">Create Content</Link>
          </Button>
        </div>

        {/* Animated Stats */}
        <div className="flex flex-wrap gap-8 animate-slide-up stagger-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex items-center gap-3 transition-all duration-500 ${
                currentStat === index ? "scale-110 opacity-100" : "scale-100 opacity-70"
              }`}
            >
              <div className={`p-3 rounded-full bg-white/10 backdrop-blur-md ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-300">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-40 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float-delayed" />
    </section>
  )
}
