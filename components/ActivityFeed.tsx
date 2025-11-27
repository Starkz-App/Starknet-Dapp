"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Zap, TrendingUp, BookOpen, UserPlus, Sparkles } from "lucide-react"

interface Activity {
  id: string
  type: "like" | "comment" | "publish" | "earn" | "follow" | "trending"
  user: {
    name: string
    avatar: string
  }
  content: string
  time: string
  value?: number
}

const mockActivities: Activity[] = [
  {
    id: "1",
    type: "publish",
    user: { name: "Sarah Chen", avatar: "/placeholder.svg?height=40&width=40" },
    content: "published a new article: Understanding Zero-Knowledge Proofs",
    time: "2 minutes ago",
  },
  {
    id: "2",
    type: "earn",
    user: { name: "Alex Rivera", avatar: "/placeholder.svg?height=40&width=40" },
    content: "earned 150 STZ from article engagement",
    time: "5 minutes ago",
    value: 150,
  },
  {
    id: "3",
    type: "like",
    user: { name: "Maya Johnson", avatar: "/placeholder.svg?height=40&width=40" },
    content: "liked Blockchain Fundamentals",
    time: "8 minutes ago",
  },
  {
    id: "4",
    type: "follow",
    user: { name: "David Kim", avatar: "/placeholder.svg?height=40&width=40" },
    content: "started following Eli Ben-Sasson",
    time: "12 minutes ago",
  },
  {
    id: "5",
    type: "trending",
    user: { name: "Emma Wilson", avatar: "/placeholder.svg?height=40&width=40" },
    content: "article is now trending: StarkNet Deep Dive",
    time: "15 minutes ago",
  },
]

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>(mockActivities)

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />
      case "comment":
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case "publish":
        return <BookOpen className="h-4 w-4 text-purple-500" />
      case "earn":
        return <Zap className="h-4 w-4 text-yellow-500" />
      case "follow":
        return <UserPlus className="h-4 w-4 text-green-500" />
      case "trending":
        return <TrendingUp className="h-4 w-4 text-orange-500" />
    }
  }

  return (
    <Card className="glass-card border-0 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          Live Activity
        </h3>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 dark:hover:bg-black/20 transition-colors cursor-pointer animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
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
              <div className="flex items-center gap-2 mt-1">
                {getActivityIcon(activity.type)}
                <span className="text-xs text-muted-foreground">{activity.time}</span>
                {activity.value && (
                  <Badge variant="secondary" className="text-xs">
                    +{activity.value} STZ
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
