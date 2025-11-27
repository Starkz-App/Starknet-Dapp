"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Flame } from "lucide-react"
import Link from "next/link"

const trendingTopics = [
  { tag: "ZK-Proofs", count: 1247, trend: "+15%" },
  { tag: "StarkNet", count: 892, trend: "+23%" },
  { tag: "Layer 2", count: 756, trend: "+8%" },
  { tag: "Cryptography", count: 643, trend: "+12%" },
  { tag: "DeFi", count: 521, trend: "+5%" },
]

export function TrendingTopics() {
  return (
    <Card className="glass-card border-0 p-6">
      <h3 className="text-xl font-bold flex items-center gap-2 mb-6">
        <Flame className="h-5 w-5 text-orange-500" />
        Trending Topics
      </h3>

      <div className="space-y-3">
        {trendingTopics.map((topic, index) => (
          <Link
            key={topic.tag}
            href={`/tags/${topic.tag.toLowerCase()}`}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 dark:hover:bg-black/20 transition-all group animate-slide-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-muted-foreground/30 group-hover:text-muted-foreground/50 transition-colors">
                {index + 1}
              </span>
              <div>
                <p className="font-semibold group-hover:text-primary transition-colors">#{topic.tag}</p>
                <p className="text-xs text-muted-foreground">{topic.count.toLocaleString()} mentions</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-500/20 text-green-600 dark:text-green-400 border-0">
              <TrendingUp className="h-3 w-3 mr-1" />
              {topic.trend}
            </Badge>
          </Link>
        ))}
      </div>
    </Card>
  )
}
