"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

import { PostCard } from "@/components/PostCard"
import { TrendingUp, Clock, Filter } from "lucide-react"

import { publications, type Publication } from "@/lib/data"

export default function PopularPostsPage() {
  const [sortBy, setSortBy] = useState("views")
  const [timeFrame, setTimeFrame] = useState("all")
  const [displayCount, setDisplayCount] = useState(9)

  const filterByTimeFrame = (items: Publication[]) => {
    const now = new Date()
    switch (timeFrame) {
      case "day":
        return items.filter((item) => {
          const publishDate = new Date(item.publishedAt)
          return (now.getTime() - publishDate.getTime()) / (1000 * 3600 * 24) <= 1
        })
      case "week":
        return items.filter((item) => {
          const publishDate = new Date(item.publishedAt)
          return (now.getTime() - publishDate.getTime()) / (1000 * 3600 * 24 * 7) <= 1
        })
      case "month":
        return items.filter((item) => {
          const publishDate = new Date(item.publishedAt)
          return (now.getTime() - publishDate.getTime()) / (1000 * 3600 * 24 * 30) <= 1
        })
      default:
        return items
    }
  }

  const sortedPublications = filterByTimeFrame([...publications]).sort((a, b) => {
    if (sortBy === "views") return b.views - a.views
    if (sortBy === "likes") return b.likes - a.likes
    return 0
  })

  const displayedPublications = sortedPublications.slice(0, displayCount)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 md:mb-0">Popular Posts</h1>
        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="views">Most Viewed</SelectItem>
              <SelectItem value="likes">Most Liked</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="day">Last 24 Hours</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayedPublications.map((publication) => (
          <PostCard key={publication.id} post={publication} />
        ))}
      </div>

      {displayCount < sortedPublications.length && (
        <div className="flex justify-center mt-8">
          <Button onClick={() => setDisplayCount((prev) => prev + 9)} variant="outline" className="flex items-center">
            Load More <TrendingUp className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}

      <Card className="mt-12">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" /> Popular Categories
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(publications.map((p) => p.category))).map((category) => (
              <Button key={category} variant="outline" size="sm">
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5" /> Trending This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2">
            {sortedPublications.slice(0, 5).map((publication) => (
              <li key={publication.id} className="text-muted-foreground hover:text-foreground transition-colors">
                <a href={`/publications/${publication.id}`}>{publication.title}</a>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}

