"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Bookmark, Share2, Zap, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import type { Publication } from "@/lib/data"

interface DynamicPostCardProps {
  post: Publication
  index?: number
}

export function DynamicPostCard({ post, index = 0 }: DynamicPostCardProps) {
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likes, setLikes] = useState(post.starkz)

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)
  }

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.share?.({
      title: post.title,
      text: post.excerpt,
      url: `/publications/${post.id}`,
    })
  }

  const handleCardClick = () => {
    router.push(`/publications/${post.id}`)
  }

  return (
    <Card
      className="glass-card border-0 overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500 animate-scale-in"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={handleCardClick}
    >
      {/* Cover Image with Overlay */}
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-purple-500/20 to-blue-500/20">
        <Image
          src={post.featuredMediaUrl || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />

        {/* Floating Starkz Badge */}
        <div className="absolute top-4 right-4 animate-float">
          <Badge className="bg-yellow-500/90 backdrop-blur-sm text-black border-0 shadow-lg">
            <Zap className="h-3 w-3 mr-1 fill-current" />
            {likes} STZ
          </Badge>
        </div>

        {/* Author Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
          <Link
            href={`/authors/${post.author.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <Avatar className="h-10 w-10 ring-2 ring-white/50 shadow-lg">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-white font-semibold text-sm drop-shadow-lg">{post.author.name}</p>
              <p className="text-white/80 text-xs drop-shadow-lg">{post.readTime}</p>
            </div>
          </Link>
        </div>
      </div>

      <CardHeader className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {post.categories.slice(0, 2).map((category) => (
            <Badge key={category} variant="secondary" className="text-xs hover:scale-105 transition-transform">
              {category}
            </Badge>
          ))}
        </div>
        <CardTitle className="line-clamp-2 text-balance group-hover:text-primary transition-colors">
          {post.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2 text-pretty">{post.excerpt}</p>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs hover:bg-primary/10 transition-colors">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4 text-blue-500" />
            {post.comments}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-green-500" />
            {post.readTime}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8 hover:scale-110 transition-all", isLiked && "text-red-500")}
            onClick={handleLike}
          >
            <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn("h-8 w-8 hover:scale-110 transition-all", isBookmarked && "text-yellow-500")}
            onClick={handleBookmark}
          >
            <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:scale-110 transition-all" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
