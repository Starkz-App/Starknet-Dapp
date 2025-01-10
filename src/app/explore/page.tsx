'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { publications, categories, allTags } from '@/lib/data'
import Link from 'next/link'
import { BookOpen, ThumbsUp, MessageSquare } from 'lucide-react'

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTag, setSelectedTag] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  const filteredListings = publications.filter(listing =>
    listing.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'all' || listing.category === selectedCategory) &&
    (selectedTag === 'all' || listing.tags.includes(selectedTag))
  ).sort((a, b) => {
    if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime()
    if (sortBy === 'views') return b.views - a.views
    if (sortBy === 'likes') return b.likes - a.likes
    return 0
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Explore Knowledge</h1>

      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <Input
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/3"
        />
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="md:w-1/4">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedTag} onValueChange={setSelectedTag}>
          <SelectTrigger className="md:w-1/4">
            <SelectValue placeholder="Select tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tags</SelectItem>
            {allTags.map(tag => (
              <SelectItem key={tag} value={tag}>{tag}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="md:w-1/4">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Latest</SelectItem>
            <SelectItem value="views">Most Viewed</SelectItem>
            <SelectItem value="likes">Most Liked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredListings.map((listing) => (
          <Card key={listing.id} className="glass-card">
            <CardHeader>
              <CardTitle>{listing.title}</CardTitle>
              <CardDescription>{listing.author} • {new Date(listing.date).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{listing.description}</p>
              <div className="flex justify-between items-center mb-4">
                <Badge>{listing.type}</Badge>
                <div className="flex items-center space-x-2">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{listing.likes}</span>
                  <MessageSquare className="h-4 w-4 ml-2" />
                  <span>{Math.floor(listing.views / 10)}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {listing.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <Button className="w-full">
                <BookOpen className="mr-2 h-4 w-4" />
                Read Article
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

