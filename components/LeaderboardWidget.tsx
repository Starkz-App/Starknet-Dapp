"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, TrendingUp } from "lucide-react"
import Link from "next/link"
import { publications } from "@/lib/data"

export function LeaderboardWidget() {
  // Get top authors by total starkz
  const topAuthors = publications
    .reduce((acc, pub) => {
      const existing = acc.find((a) => a.slug === pub.author.slug)
      if (existing) {
        existing.starkz += pub.starkz
        existing.articles += 1
      } else {
        acc.push({
          ...pub.author,
          starkz: pub.starkz,
          articles: 1,
        })
      }
      return acc
    }, [] as any[])
    .sort((a, b) => b.starkz - a.starkz)
    .slice(0, 5)

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-5 w-5 text-yellow-500" />
    if (index === 1) return <Medal className="h-5 w-5 text-slate-400" />
    if (index === 2) return <Medal className="h-5 w-5 text-amber-700" />
    return <Award className="h-5 w-5 text-muted-foreground" />
  }

  return (
    <Card className="glass-card border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-orange-500" />
          Top Contributors
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {topAuthors.map((author, index) => (
          <Link
            key={author.slug}
            href={`/authors/${author.slug}`}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 dark:hover:bg-black/20 transition-all group animate-slide-up touch-card"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div className="flex-shrink-0">{getRankIcon(index)}</div>
            <Avatar className="h-10 w-10 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
              <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
              <AvatarFallback>{author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate group-hover:text-primary transition-colors">{author.name}</p>
              <p className="text-xs text-muted-foreground">
                {author.articles} article{author.articles !== 1 ? "s" : ""}
              </p>
            </div>
            <Badge variant="secondary" className="flex-shrink-0">
              {author.starkz} STZ
            </Badge>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
