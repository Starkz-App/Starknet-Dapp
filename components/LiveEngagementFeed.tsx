"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Bookmark, Zap, TrendingUp, Award, Users } from "lucide-react"
import { Card } from "@/components/ui/card"

interface EngagementActivity {
  id: string
  type: "like" | "comment" | "bookmark" | "starkz" | "trending" | "badge"
  user: {
    name: string
    avatar: string
  }
  action: string
  timestamp: Date
  icon: React.ReactNode
  color: string
}

export function LiveEngagementFeed() {
  const [activities, setActivities] = useState<EngagementActivity[]>([])

  useEffect(() => {
    const generateActivity = (): EngagementActivity => {
      const users = [
        { name: "Sarah Chen", avatar: "/placeholder.svg?height=32&width=32&text=SC" },
        { name: "Mike Johnson", avatar: "/placeholder.svg?height=32&width=32&text=MJ" },
        { name: "Alex Rivera", avatar: "/placeholder.svg?height=32&width=32&text=AR" },
        { name: "Emma Wilson", avatar: "/placeholder.svg?height=32&width=32&text=EW" },
        { name: "David Kim", avatar: "/placeholder.svg?height=32&width=32&text=DK" },
      ]

      const activityTypes = [
        {
          type: "like" as const,
          action: "liked an article",
          icon: <Heart className="h-3 w-3" />,
          color: "text-red-500",
        },
        {
          type: "comment" as const,
          action: "commented on a post",
          icon: <MessageCircle className="h-3 w-3" />,
          color: "text-blue-500",
        },
        {
          type: "bookmark" as const,
          action: "saved to reading list",
          icon: <Bookmark className="h-3 w-3" />,
          color: "text-purple-500",
        },
        {
          type: "starkz" as const,
          action: "earned 50 Starkz",
          icon: <Zap className="h-3 w-3" />,
          color: "text-yellow-500",
        },
        {
          type: "trending" as const,
          action: "article is trending",
          icon: <TrendingUp className="h-3 w-3" />,
          color: "text-green-500",
        },
        {
          type: "badge" as const,
          action: "unlocked new badge",
          icon: <Award className="h-3 w-3" />,
          color: "text-orange-500",
        },
      ]

      const user = users[Math.floor(Math.random() * users.length)]
      const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)]

      return {
        id: Math.random().toString(36).substr(2, 9),
        type: activityType.type,
        user,
        action: activityType.action,
        timestamp: new Date(),
        icon: activityType.icon,
        color: activityType.color,
      }
    }

    // Add initial activities
    const initialActivities = Array.from({ length: 3 }, generateActivity)
    setActivities(initialActivities)

    // Add new activity every 3-5 seconds
    const interval = setInterval(
      () => {
        const newActivity = generateActivity()
        setActivities((prev) => [newActivity, ...prev].slice(0, 5))
      },
      Math.random() * 2000 + 3000,
    )

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="p-4 space-y-3 glass-card border-0">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center gap-2">
          <div className="relative">
            <Users className="h-4 w-4" />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="absolute inset-0 bg-green-500/30 rounded-full blur-sm"
            />
          </div>
          Live Activity
        </h3>
        <Badge variant="secondary" className="bg-green-500/10 text-green-600 dark:text-green-400">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"
          />
          Live
        </Badge>
      </div>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: "auto" }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-purple-500/5 to-blue-500/5 hover:from-purple-500/10 hover:to-blue-500/10 transition-colors"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs">
                  <span className="font-semibold">{activity.user.name}</span>{" "}
                  <span className="text-muted-foreground">{activity.action}</span>
                </p>
                <p className="text-xs text-muted-foreground">Just now</p>
              </div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className={activity.color}
              >
                {activity.icon}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Card>
  )
}
