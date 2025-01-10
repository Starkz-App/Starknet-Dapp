'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { publications } from '@/lib/data'
import Link from 'next/link'

export default function PopularPostsPage() {
  const [sortBy, setSortBy] = useState('views')

  const sortedListings = [...publications].sort((a, b) => {
    if (sortBy === 'views') return (b.views || 0) - (a.views || 0)
    if (sortBy === 'likes') return (b.likes || 0) - (a.likes || 0)
    return 0
  }).slice(0, 10) // Get top 10

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Popular Posts</h1>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="views">Most Viewed</SelectItem>
            <SelectItem value="likes">Most Liked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedListings.map((listing) => (
          <Card key={listing.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="line-clamp-1">{listing.title}</CardTitle>
              <CardDescription>{listing.author.name} • {new Date(listing.publishedAt).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{listing.description}</p>
              <div className="flex justify-between items-center mb-4">
                <Badge>{listing.category}</Badge>
                <span className="font-bold">${listing.price.toFixed(2)}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {listing.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{listing.views?.toLocaleString() ?? 0} views</span>
                <span>{listing.likes?.toLocaleString() ?? 0} likes</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

