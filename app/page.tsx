"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { publications } from "@/lib/data"
import { StarkzPostCard } from "@/components/StarkzPostCard"
import { LiveEngagementFeed } from "@/components/LiveEngagementFeed"
import { ArrowRight, Sparkles, Rocket, Flame, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6
  const totalPages = Math.ceil(publications.length / postsPerPage)

  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const currentPosts = publications.slice(startIndex, endIndex)

  return (
    <div className="space-y-12 max-w-7xl mx-auto pb-24">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 dark:from-purple-500 dark:via-blue-500 dark:to-cyan-500 p-8 md:p-12"
      >
        <div className="absolute inset-0 bg-grid-white/10" />
        <div className="absolute top-5 right-5 w-24 h-24 bg-white/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-5 left-5 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-float-delayed" />

        <div className="relative z-10 text-center text-white">
          <Badge className="mb-4 bg-white/20 backdrop-blur-sm border-white/30 text-white">
            <Sparkles className="h-3 w-3 mr-1" />
            Knowledge Platform
          </Badge>

          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            Share Knowledge,
            <br />
            Earn Rewards
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl mx-auto">
            Create articles, build your reputation, and get rewarded with Starkz tokens
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 group" asChild>
              <Link href="/explore">
                <Rocket className="mr-2 h-5 w-5" />
                Explore Content
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
              asChild
            >
              <Link href="/new/publication">
                <Sparkles className="mr-2 h-5 w-5" />
                Start Creating
              </Link>
            </Button>
          </div>
        </div>
      </motion.section>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <motion.h2
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-3xl md:text-4xl font-bold flex items-center gap-3"
            >
              <div className="p-2 md:p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex-shrink-0">
                <Flame className="h-5 w-5 md:h-7 md:w-7 text-orange-500" />
              </div>
              <span className="text-2xl md:text-4xl">Latest</span>
              <Button variant="ghost" className="group self-start sm:self-center" asChild>
              <Link href="/explore">
                View All
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            </motion.h2>
            
          </div>

          <StarkzPostCard post={currentPosts[0]} variant="featured" />

          <div className="grid md:grid-cols-2 gap-6">
            {currentPosts.slice(1).map((post, index) => (
              <StarkzPostCard key={post.id} post={post} index={index + 1} />
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 pt-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="h-10 w-10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentPage(page)}
                  className={`h-10 w-10 ${currentPage === page ? "bg-gradient-to-r from-purple-600 to-blue-600" : ""}`}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="h-10 w-10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <LiveEngagementFeed />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <h3 className="text-lg font-bold">Quick Actions</h3>
            <div className="grid gap-3">
              <Button
                variant="outline"
                className="justify-start h-auto p-4 group hover:bg-purple-500/10 bg-card"
                asChild
              >
                <Link href="/new/publication">
                  <div className="flex items-center gap-3 w-full">
                    <div className="p-2 rounded-lg bg-purple-500/20 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold">Write Article</p>
                      <p className="text-xs text-muted-foreground">Share your knowledge</p>
                    </div>
                  </div>
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
