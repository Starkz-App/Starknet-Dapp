"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Publication } from "@/lib/data"
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Zap,
  TrendingUp,
  Sparkles,
  Clock,
  ChevronRight,
  Eye,
  Users,
} from "lucide-react"
import { motion, useInView } from "framer-motion"

interface StarkzPostCardProps {
  post: Publication
  index?: number
  variant?: "default" | "compact" | "featured"
}

export function StarkzPostCard({ post, index = 0, variant = "default" }: StarkzPostCardProps) {
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100) + 20)
  const [liveViewers, setLiveViewers] = useState(Math.floor(Math.random() * 50) + 5)
  const [recentEngagement, setRecentEngagement] = useState<string[]>([])
  const [showEngagementPulse, setShowEngagementPulse] = useState(false)
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-100px" })

  useEffect(() => {
    const engagementInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setLikes((prev) => prev + 1)
        setShowEngagementPulse(true)
        setTimeout(() => setShowEngagementPulse(false), 1000)
      }

      setLiveViewers((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1
        return Math.max(1, prev + change)
      })

      const activities = [
        "🎉 Sarah just bookmarked this",
        "👏 Mike earned 50 Starkz",
        "💬 New comment by Alex",
        "⭐ Featured by editors",
      ]
      if (Math.random() > 0.8) {
        const activity = activities[Math.floor(Math.random() * activities.length)]
        setRecentEngagement((prev) => [activity, ...prev].slice(0, 3))
      }
    }, 5000)

    return () => clearInterval(engagementInterval)
  }, [])

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
      rotateX: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeInOut",
      },
    },
  }

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsSaved(!isSaved)
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

  if (variant === "featured") {
    return (
      <motion.div
        ref={cardRef}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="group cursor-pointer perspective-1000"
        onClick={handleCardClick}
      >
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 backdrop-blur-xl hover:shadow-2xl transition-all duration-500 h-full transform-gpu">
          {showEngagementPulse && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-xl pointer-events-none"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative p-4 md:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 animate-pulse-slow">
                <Sparkles className="h-3 w-3 mr-1" />
                Featured
              </Badge>

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/20 backdrop-blur-sm text-red-600 dark:text-red-400 text-xs font-medium"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <Eye className="h-3 w-3" />
                {liveViewers}
              </motion.div>
            </div>

            <div className="relative aspect-[16/9] md:aspect-video rounded-xl overflow-hidden">
              <motion.img
                src={
                  post.featuredMediaUrl ||
                  `/placeholder.svg?height=400&width=800&query=${encodeURIComponent(post.title)}`
                }
                alt={post.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium"
                >
                  <Zap className="h-3 w-3 text-yellow-400" />
                  {post.starkz}
                </motion.div>
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                  className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium"
                >
                  <TrendingUp className="h-3 w-3 text-green-400" />
                  Trending
                </motion.div>
              </div>

              {recentEngagement.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute top-3 right-3 space-y-1"
                >
                  {recentEngagement.slice(0, 2).map((activity, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.1 }}
                      className="px-2 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs whitespace-nowrap max-w-[200px] truncate"
                    >
                      {activity}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>

            <motion.h3
              whileHover={{ x: 5 }}
              className="text-2xl font-bold line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"
            >
              {post.title}
            </motion.h3>

            <Link
              href={`/authors/${post.author.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <Avatar className="h-10 w-10 ring-2 ring-purple-500/20">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-sm">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">{post.readTime}</p>
              </div>
            </Link>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-4">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={handleLike}
                  className={`flex items-center gap-1 transition-colors ${isLiked ? "text-red-500" : ""}`}
                >
                  <Heart className={`h-4 w-4 transition-all ${isLiked ? "fill-current scale-110" : ""}`} />
                  <span className="text-sm font-medium">{likes}</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="text-sm">{post.comments}</span>
                </motion.button>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.1 }}
                  onClick={handleSave}
                  className={isSaved ? "text-blue-500" : ""}
                >
                  <Bookmark className={`h-4 w-4 transition-all ${isSaved ? "fill-current" : ""}`} />
                </motion.button>
                <motion.button whileHover={{ scale: 1.1, rotate: 15 }} onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group cursor-pointer transform-gpu"
      onClick={handleCardClick}
    >
      <Card className="relative overflow-hidden border-0 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl hover:bg-white/80 dark:hover:bg-gray-900/80 transition-all duration-300 h-full group-hover:shadow-xl">
        {showEngagementPulse && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl pointer-events-none"
          />
        )}

        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ padding: "1px" }}
        >
          <div className="w-full h-full bg-white dark:bg-gray-900 rounded-xl" />
        </div>

        <div className="relative p-4 md:p-5 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            {post.categories.slice(0, 2).map((cat) => (
              <Badge
                key={cat}
                variant="secondary"
                className="text-xs bg-gradient-to-r from-purple-500/10 to-blue-500/10 hover:from-purple-500/20 hover:to-blue-500/20 transition-colors"
              >
                {cat}
              </Badge>
            ))}
            {liveViewers > 10 && (
              <Badge variant="secondary" className="text-xs bg-red-500/10 text-red-600 dark:text-red-400 animate-pulse">
                <Users className="h-3 w-3 mr-1" />
                {liveViewers} online
              </Badge>
            )}
          </div>

          <motion.h3
            whileHover={{ x: 3 }}
            className="text-xl font-bold line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"
          >
            {post.title}
          </motion.h3>

          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{post.excerpt}</p>

          {recentEngagement.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="text-xs text-muted-foreground bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-lg p-2"
            >
              {recentEngagement[0]}
            </motion.div>
          )}

          <div className="flex items-center justify-between">
            <Link
              href={`/authors/${post.author.slug}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{post.author.name}</span>
            </Link>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </div>
          </div>

          {post.featuredMediaUrl && (
            <div className="relative aspect-video rounded-lg overflow-hidden -mx-4 -mt-4 md:-mx-5 md:-mt-5 mb-4">
              <motion.img
                src={post.featuredMediaUrl}
                alt={post.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium">
                <Zap className="h-3 w-3 text-yellow-400" />
                {post.starkz}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                onClick={handleLike}
                className={`flex items-center gap-1 text-sm hover:scale-110 transition-transform ${
                  isLiked ? "text-red-500" : "text-muted-foreground"
                }`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                <span>{likes}</span>
              </motion.button>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments}</span>
              </div>
              <motion.div
                animate={{ scale: showEngagementPulse ? [1, 1.2, 1] : 1 }}
                className="flex items-center gap-1 text-sm text-yellow-600 dark:text-yellow-500 font-semibold"
              >
                <Zap className="h-4 w-4" />
                <span>{post.starkz}</span>
              </motion.div>
            </div>

            <div className="flex items-center gap-1">
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                onClick={handleSave}
                className="h-7 w-7 flex items-center justify-center"
              >
                <Bookmark className={`h-3.5 w-3.5 ${isSaved ? "fill-current text-blue-500" : ""}`} />
              </motion.button>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
