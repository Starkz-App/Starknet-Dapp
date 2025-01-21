'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import Link from 'next/link'
import Image from 'next/image'
import { Search, ThumbsUp, MessageSquare, Eye, Clock, Filter, Tag } from 'lucide-react'
import { publications, Publication, categories, allTags } from '@/lib/data'
import { PostCard } from '@/components/PostCard'





export default function PublicationsPage() {


  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [minHearts, setMinHearts] = useState(0)
  const [minLikes, setMinLikes] = useState(0)
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)
  const [filteredPublications, setFilteredPublications] = useState<Publication[]>(publications)


  useEffect(() => {
    const filtered = publications.filter(pub => {
      const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'All' || pub.categories === selectedCategory
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => pub.tags.includes(tag))
      const matchesHearts = pub.hearts >= minHearts
      const matchesLikes = pub.likes >= minLikes
      const matchesVerified = !showVerifiedOnly || pub.author.verified

      return matchesSearch && matchesCategory && matchesTags && matchesHearts && matchesLikes && matchesVerified
    })


    setFilteredPublications(filtered)
  }, [searchTerm, selectedCategory, selectedTags, minHearts, minLikes, showVerifiedOnly])




  return (

    <>

    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center">Starkz</h1> 
      <h3 className="text-2xl mb-8 text-center">Discover Knowledge</h3> 
      



      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search publications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Filter Publications</SheetTitle>
            </SheetHeader>
            <div className="py-4 space-y-6">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <ScrollArea className="h-[120px] border rounded-md p-2">
                  <div className="flex flex-wrap gap-2">
                    {allTags.map(tag => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedTags(prev =>
                            prev.includes(tag)
                              ? prev.filter(t => t !== tag)
                              : [...prev, tag]
                          )
                        }}
                      >
                        <Tag className="mr-1 h-3 w-3" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="space-y-2">
                <Label>Minimum Hearts</Label>
                <Slider
                  min={0}
                  max={200}
                  step={10}
                  value={[minHearts]}
                  onValueChange={(value) => setMinHearts(value[0])}
                />
                <div className="text-xs text-muted-foreground">
                  At least {minLikes} likes
                </div>
              </div>

              <div className="space-y-2">
                <Label>Minimum Likes</Label>
                <Slider
                  min={0}
                  max={200}
                  step={10}
                  value={[minLikes]}
                  onValueChange={(value) => setMinLikes(value[0])}
                />
                <div className="text-xs text-muted-foreground">
                  At least {minLikes} likes
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="verified"
                  checked={showVerifiedOnly}
                  onCheckedChange={setShowVerifiedOnly}
                />
                <Label htmlFor="verified">Show verified authors only</Label>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Publications Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPublications.map((publication) => (
          <PostCard key={publication.id} post={publication} />
        ))}
      </div>

      {filteredPublications.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No publications found. Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>


    </>
  )
}

