"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Zap, MessageCircle, Heart, Trophy, Sparkles, Award, BookOpen, UserPlus, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Activity {
  id: string
  type: "starkz" | "comment" | "like" | "award" | "publish" | "follow" | "achievement"
  user: {
    name: string
    avatar: string
  }
  content: string
  timestamp: string
  meta?: {
    amount?: number
    title?: string
    badge?: string
  }
}

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "starkz",
    user: {
      name: "Alice Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    },
    content: "earned 50 Starkz for her insightful article",
    timestamp: "2m ago",
    meta: { amount: 50, title: "DeFi Protocol Analysis" },
  },
  {
    id: "2",
    type: "achievement",
    user: {
      name: "Bob Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    },
    content: "unlocked the Pioneer badge",
    timestamp: "5m ago",
    meta: { badge: "Pioneer" },
  },
  {
    id: "3",
    type: "publish",
    user: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    content: "published a new article",
    timestamp: "12m ago",
    meta: { title: "Smart Contract Security 101" },
  },
  {
    id: "4",
    type: "comment",
    user: {
      name: "Marcus Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    },
    content: "commented on Zero-Knowledge Proofs",
    timestamp: "18m ago",
  },
  {
    id: "5",
    type: "like",
    user: {
      name: "Elena Petrova",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    },
    content: "and 23 others liked your article",
    timestamp: "25m ago",
  },
]

const activityIcons = {
  starkz: Zap,
  comment: MessageCircle,
  like: Heart,
  award: Trophy,
  publish: BookOpen,
  follow: UserPlus,
  achievement: Award,
}

const activityColors = {
  starkz: "text-yellow-500",
  comment: "text-blue-500",
  like: "text-red-500",
  award: "text-purple-500",
  publish: "text-green-500",
  follow: "text-cyan-500",
  achievement: "text-orange-500",
}

export function CommunityPulse() {
  const [activities, setActivities] = useState<Activity[]>(mockActivities)
  const [newActivity, setNewActivity] = useState<Activity | null>(null)

  useEffect(() => {
    // Simulate real-time activities
    const interval = setInterval(() => {
      const randomActivity: Activity = {
        id: Date.now().toString(),
        type: ["starkz", "comment", "like", "achievement", "publish"][
          Math.floor(Math.random() * 5)
        ] as Activity["type"],
        user: {
          name:
            ["Alex", "Jordan", "Taylor", "Morgan", "Casey"][Math.floor(Math.random() * 5)] +
            " " +
            ["Smith", "Johnson", "Williams", "Brown", "Jones"][Math.floor(Math.random() * 5)],
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
        },
        content: "just took an action in the community",
        timestamp: "Just now",
      }

      setNewActivity(randomActivity)
      setTimeout(() => {
        setActivities((prev) => [randomActivity, ...prev.slice(0, 9)])
        setNewActivity(null)
      }, 500)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10">
        <CardTitle className="flex items-center gap-2">
          <div className="relative">
            <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
            </span>
          </div>
          Community Pulse
          <Badge variant="secondary" className="ml-auto bg-purple-500/20 text-purple-700 dark:text-purple-300">
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px]">
          <AnimatePresence mode="popLayout">
            {newActivity && (
              <motion.div
                key={newActivity.id}
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20"
              >
                <ActivityItem activity={newActivity} isNew />
              </motion.div>
            )}
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-border/50 last:border-0"
              >
                <ActivityItem activity={activity} />
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function ActivityItem({ activity, isNew = false }: { activity: Activity; isNew?: boolean }) {
  const Icon = activityIcons[activity.type]
  const colorClass = activityColors[activity.type]

  return (
    <div
      className={`p-4 flex items-start gap-3 hover:bg-accent/50 transition-colors ${isNew ? "animate-pulse-slow" : ""}`}
    >
      <Avatar className="h-10 w-10 ring-2 ring-purple-500/20">
        <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
        <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <p className="text-sm">
          <span className="font-semibold">{activity.user.name}</span>{" "}
          <span className="text-muted-foreground">{activity.content}</span>
        </p>

        {activity.meta && (
          <div className="mt-1 flex items-center gap-2 flex-wrap">
            {activity.meta.amount && (
              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-300">
                <Zap className="h-3 w-3 mr-1" />+{activity.meta.amount}
              </Badge>
            )}
            {activity.meta.title && (
              <span className="text-xs text-muted-foreground italic">"{activity.meta.title}"</span>
            )}
            {activity.meta.badge && (
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-700 dark:text-purple-300">
                <Star className="h-3 w-3 mr-1" />
                {activity.meta.badge}
              </Badge>
            )}
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
      </div>

      <Icon className={`h-5 w-5 ${colorClass} flex-shrink-0`} />
    </div>
  )
}
