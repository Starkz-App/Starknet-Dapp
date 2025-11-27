"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Filter,
  Tag,
  X,
  BookOpen,
  Sparkles,
  Grid3x3,
  List,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { publications, type Publication, categoryNames, allTags } from "@/lib/data"
import { StarkzPostCard } from "@/components/StarkzPostCard"
import { LiveEngagementFeed } from "@/components/LiveEngagementFeed"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const POSTS_PER_PAGE = 12

export default function PublicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [readingTime, setReadingTime] = useState([0, 30])
  const [minStarkz, setMinStarkz] = useState(0)
  const [filteredPublications, setFilteredPublications] = useState<Publication[]>(publications)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "starkz">("recent")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    let filtered = publications.filter((pub) => {
      const matchesSearch =
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.author.name.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === "All" || pub.categories.includes(selectedCategory)

      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => pub.tags.includes(tag))

      const readTimeMinutes = Number.parseInt(pub.readTime)
      const matchesReadingTime = readTimeMinutes >= readingTime[0] && readTimeMinutes <= readingTime[1]

      const matchesStarkz = pub.starkz >= minStarkz

      return matchesSearch && matchesCategory && matchesTags && matchesReadingTime && matchesStarkz
    })

    filtered = filtered.sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      }
      if (sortBy === "popular") {
        return b.comments - a.comments
      }
      if (sortBy === "starkz") {
        return b.starkz - a.starkz
      }
      return 0
    })

    setFilteredPublications(filtered)
  }, [searchTerm, selectedCategory, selectedTags, readingTime, minStarkz, sortBy])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("All")
    setSelectedTags([])
    setReadingTime([0, 30])
    setMinStarkz(0)
    setCurrentPage(1)
  }

  const activeFiltersCount =
    (selectedCategory !== "All" ? 1 : 0) +
    selectedTags.length +
    (minStarkz > 0 ? 1 : 0) +
    (readingTime[0] !== 0 || readingTime[1] !== 30 ? 1 : 0)

  const totalPages = Math.ceil(filteredPublications.length / POSTS_PER_PAGE)
  const paginatedPublications = filteredPublications.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE,
  )

  return (
    <div className="mx-auto px-4 py-8 pb-32 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8 space-y-3"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
        >
          <Sparkles className="h-4 w-4" />
          Discover Knowledge
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent"
        >
          All Publications
        </motion.h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col md:flex-row gap-4 mb-8"
      >
        <div className="flex-1 relative group">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search by title, content, or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-11 h-12 glass-input hover-glow transition-all"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive transition-all"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={(value: "recent" | "popular" | "starkz") => setSortBy(value)}>
            <SelectTrigger className="h-12 w-[180px] glass-input">
              <TrendingUp className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="starkz">Most Starkz</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-1 glass-card p-1">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-10 w-10 rounded-lg transition-all hover:scale-105",
                viewMode === "grid" && "bg-primary text-primary-foreground",
              )}
              onClick={() => setViewMode("grid")}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-10 w-10 rounded-lg transition-all hover:scale-105",
                viewMode === "list" && "bg-primary text-primary-foreground",
              )}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="h-12 glass-input relative hover-glow transition-all bg-transparent">
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full animate-bounce-in">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="glass-card">
              <SheetHeader>
                <SheetTitle className="flex items-center justify-between">
                  Filter Publications
                  {activeFiltersCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="hover:text-destructive">
                      Clear all
                    </Button>
                  )}
                </SheetTitle>
              </SheetHeader>

              <ScrollArea className="h-[calc(100vh-8rem)] pr-4">
                <div className="py-6 space-y-6">
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Category</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="glass-input">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Categories</SelectItem>
                        {categoryNames.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Tags</Label>
                    <ScrollArea className="h-[200px] border rounded-lg p-3 glass-card">
                      <div className="flex flex-wrap gap-2">
                        {allTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant={selectedTags.includes(tag) ? "default" : "outline"}
                            className="cursor-pointer transition-all hover:scale-105 touch-card"
                            onClick={() => {
                              setSelectedTags((prev) =>
                                prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
                              )
                            }}
                          >
                            <Tag className="mr-1 h-3 w-3" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </ScrollArea>
                    {selectedTags.length > 0 && (
                      <p className="text-xs text-muted-foreground animate-fade-in">
                        {selectedTags.length} tag{selectedTags.length > 1 ? "s" : ""} selected
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Reading Time</Label>
                    <div className="pt-2">
                      <Slider
                        min={0}
                        max={30}
                        step={5}
                        value={readingTime}
                        onValueChange={setReadingTime}
                        className="mb-4"
                      />
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{readingTime[0]} min</span>
                        <span className="text-muted-foreground">{readingTime[1]} min</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Minimum Starkz</Label>
                    <div className="pt-2">
                      <Slider
                        min={0}
                        max={250}
                        step={25}
                        value={[minStarkz]}
                        onValueChange={(value) => setMinStarkz(value[0])}
                        className="mb-4"
                      />
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        At least {minStarkz} Starkz
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </motion.div>

      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-6 animate-slide-up">
          {selectedCategory !== "All" && (
            <Badge variant="secondary" className="gap-2 animate-scale-in hover:scale-105 transition-transform">
              Category: {selectedCategory}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors"
                onClick={() => setSelectedCategory("All")}
              />
            </Badge>
          )}
          {selectedTags.map((tag, index) => (
            <Badge
              key={tag}
              variant="secondary"
              className="gap-2 animate-scale-in hover:scale-105 transition-transform"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {tag}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors"
                onClick={() => setSelectedTags((prev) => prev.filter((t) => t !== tag))}
              />
            </Badge>
          ))}
        </div>
      )}

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-muted-foreground"
          >
            Showing {paginatedPublications.length} of {filteredPublications.length} publications
          </motion.div>

          <div className={cn("grid gap-6", viewMode === "grid" ? "md:grid-cols-2" : "grid-cols-1")}>
            {paginatedPublications.map((publication, index) => (
              <StarkzPostCard key={publication.id} post={publication} index={index} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-9 w-9"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="icon"
                      onClick={() => setCurrentPage(pageNum)}
                      className="h-9 w-9"
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="h-9 w-9"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {filteredPublications.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-semibold mb-2">No publications found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">Try adjusting your filters or search term</p>
              <Button onClick={clearFilters} size="lg">
                Clear all filters
              </Button>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="hidden lg:block space-y-6"
        >
          <LiveEngagementFeed />
        </motion.div>
      </div>
    </div>
  )
}
