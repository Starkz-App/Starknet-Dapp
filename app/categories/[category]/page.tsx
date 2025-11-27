'use client'

import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ipListings, IPListing } from '@/lib/mockData'
import Link from 'next/link'

export default function CategoryArchivePage() {
  const params = useParams()
  const category = params.category as string

  const filteredListings = ipListings.filter(listing => listing.category === category)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Category: {category}</h1>

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
                <span className="font-bold">${listing.price.toLocaleString()}</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {listing.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{listing.views} views</span>
                <span>{listing.likes} likes</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
