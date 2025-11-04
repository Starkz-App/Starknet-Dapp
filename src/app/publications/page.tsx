"use client"

import { useState, useEffect } from "react"
import { Input } from "@/src/components/ui/input"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/src/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Slider } from "@/src/components/ui/slider"
import { Label } from "@/src/components/ui/label"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { Search, Filter, Tag, X, BookOpen, Sparkles } from "lucide-react"
import { publications, type Publication, categoryNames, allTags } from "@/src/lib/data"
import { PostCard } from "@/src/components/PostCard"

export default function PublicationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [readingTime, setReadingTime] = useState([0, 30])
  const [minStarkz, setMinStarkz] = useState(0)
  const [filteredPublications, setFilteredPublications] = useState<Publication[]>(publications)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    const filtered = publications.filter((pub) => {
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

    setFilteredPublications(filtered)
  }, [searchTerm, selectedCategory, selectedTags, readingTime, minStarkz])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCategory("All")
    setSelectedTags([])
    setReadingTime([0, 30])
    setMinStarkz(0)
  }

  const activeFiltersCount =
    (selectedCategory !== "All" ? 1 : 0) +
    selectedTags.length +
    (minStarkz > 0 ? 1 : 0) +
    (readingTime[0] !== 0 || readingTime[1] !== 30 ? 1 : 0)

  return (
    <div className="container mx-auto px-4 py-8 pb-32">
      <div className="text-center mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          Discover Knowledge
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Explore Publications
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Dive into cutting-edge research, tutorials, and insights from the community
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search by title, content, or author..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-11 h-12 bg-card/50 backdrop-blur-sm border-border/50"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="h-12 bg-card/50 backdrop-blur-sm border-border/50 relative">
              <Filter className="mr-2 h-4 w-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle className="flex items-center justify-between">
                Filter Publications
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
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
                    <SelectTrigger className="bg-card/50">
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
                  <ScrollArea className="h-[200px] border rounded-lg p-3 bg-card/50">
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer transition-all hover:scale-105"
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
                    <p className="text-xs text-muted-foreground">
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

      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedCategory !== "All" && (
            <Badge variant="secondary" className="gap-2">
              Category: {selectedCategory}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("All")} />
            </Badge>
          )}
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-2">
              {tag}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => setSelectedTags((prev) => prev.filter((t) => t !== tag))}
              />
            </Badge>
          ))}
        </div>
      )}

      <div className="mb-6 text-sm text-muted-foreground">
        Showing <span className="font-semibold text-foreground">{filteredPublications.length}</span> of{" "}
        <span className="font-semibold text-foreground">{publications.length}</span> publications
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPublications.map((publication) => (
          <PostCard key={publication.id} post={publication} />
        ))}
      </div>

      {filteredPublications.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No publications found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your filters or search term to find what you're looking for
          </p>
          <Button onClick={clearFilters} variant="outline">
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  )
}
