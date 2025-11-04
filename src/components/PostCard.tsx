"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Clock, MessageSquare, Zap, Calendar } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { Publication } from "@/src/lib/data"
import Image from "next/image"

interface PostCardProps {
  post: Publication
}

export function PostCard({ post }: PostCardProps) {
  const router = useRouter()

  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on a link or button
    if ((e.target as HTMLElement).closest("a") || (e.target as HTMLElement).closest("button")) {
      return
    }
    router.push(`/publications/${post.id}`)
  }

  return (
    <Card
      onClick={handleCardClick}
      className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur-sm cursor-pointer group"
    >
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={post.featuredMediaUrl || "/placeholder.svg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="absolute top-4 left-4">
          <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground border-0">
            {post.categories[0]}
          </Badge>
        </div>

        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-amber-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-semibold">
          <Zap className="h-4 w-4 fill-current" />
          {post.starkz}
        </div>
      </div>

      <CardHeader className="space-y-3 pb-3">
        <div className="flex items-center gap-3">
          <Link
            href={`/authors/${post.author.slug}`}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Avatar className="h-10 w-10 ring-2 ring-border">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback className="text-xs">{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate hover:text-primary transition-colors">{post.author.name}</p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {publishedDate}
              </div>
            </div>
          </Link>
        </div>

        <CardTitle className="text-xl font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-grow space-y-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">{post.excerpt}</p>

        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs font-normal">
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
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4" />
            {post.comments}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {post.readTime}
          </span>
        </div>

        <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 font-semibold">
          Read →
        </Button>
      </CardFooter>
    </Card>
  )
}
