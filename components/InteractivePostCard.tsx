"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, MessageSquare, Zap, Calendar, Bookmark, Share2, Heart, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { Publication } from "@/lib/data"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface InteractivePostCardProps {
  post: Publication
}

export function InteractivePostCard({ post }: InteractivePostCardProps) {
  const router = useRouter()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100) + 20)

  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("a") || (e.target as HTMLElement).closest("button")) {
      return
    }
    router.push(`/publications/${post.id}`)
  }

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)
  }

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: `/publications/${post.id}`,
      })
    }
  }

  return (
    <Card
      onClick={handleCardClick}
      className="flex flex-col h-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-border/50 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm cursor-pointer group relative"
    >
      {/* Interactive Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image Section with Parallax Effect */}
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={post.featuredMediaUrl || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Category Badge with Animation */}
        <div className="absolute top-4 left-4 transform transition-all duration-300 group-hover:scale-110">
          <Badge className="bg-primary/90 backdrop-blur-md text-primary-foreground border-0 shadow-lg">
            {post.categories[0]}
          </Badge>
        </div>

        {/* Starkz Badge with Pulse Animation */}
        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg transform transition-all duration-300 group-hover:scale-110 animate-pulse">
          <Zap className="h-4 w-4 fill-current" />
          {post.starkz}
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-4 group-hover:translate-y-0">
          <Button
            size="icon"
            variant="secondary"
            className="h-10 w-10 rounded-full backdrop-blur-md bg-white/90 dark:bg-black/90 shadow-lg hover:scale-110 transition-transform"
            onClick={handleBookmark}
          >
            <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current text-amber-500")} />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="h-10 w-10 rounded-full backdrop-blur-md bg-white/90 dark:bg-black/90 shadow-lg hover:scale-110 transition-transform"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Trending Indicator */}
        {post.starkz > 100 && (
          <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-red-500/90 backdrop-blur-md text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
            <TrendingUp className="h-3 w-3" />
            Trending
          </div>
        )}
      </div>

      <CardHeader className="space-y-3 pb-3">
        {/* Author Info with Hover Effect */}
        <div className="flex items-center gap-3">
          <Link
            href={`/authors/${post.author.slug}`}
            className="flex items-center gap-3 hover:opacity-80 transition-all group/author"
          >
            <Avatar className="h-10 w-10 ring-2 ring-border transition-all group-hover/author:ring-primary group-hover/author:scale-110">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback className="text-xs">{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate group-hover/author:text-primary transition-colors">
                {post.author.name}
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {publishedDate}
              </div>
            </div>
          </Link>
        </div>

        {/* Title with Gradient on Hover */}
        <CardTitle className="text-xl font-bold leading-tight line-clamp-2 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {post.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-grow space-y-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{post.excerpt}</p>

        {/* Tags with Hover Animation */}
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag, index) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs font-normal transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-primary-foreground"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {tag}
            </Badge>
          ))}
          {post.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs font-normal">
              +{post.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-4 border-t border-border/50">
        {/* Engagement Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <button
            onClick={handleLike}
            className="flex items-center gap-1.5 transition-all hover:text-red-500 hover:scale-110 group/like"
          >
            <Heart className={cn("h-4 w-4 transition-all", isLiked && "fill-current text-red-500")} />
            <span className="group-hover/like:font-semibold">{likeCount}</span>
          </button>
          <span className="flex items-center gap-1.5 transition-all hover:text-primary hover:scale-110">
            <MessageSquare className="h-4 w-4" />
            {post.comments}
          </span>
          <span className="flex items-center gap-1.5 transition-all hover:text-primary hover:scale-110">
            <Clock className="h-4 w-4" />
            {post.readTime}
          </span>
        </div>

        {/* Read More Button with Arrow Animation */}
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-primary hover:bg-primary/10 font-semibold group/btn"
        >
          Read
          <span className="inline-block transition-transform group-hover/btn:translate-x-1">→</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
