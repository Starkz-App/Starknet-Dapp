'use client'

import { useParams } from 'next/navigation'
import { ipListings } from '@/lib/mockData'
import { PostCard } from '@/components/PostCard'

export default function TagArchivePage() {
  const params = useParams()
  const tag = params.tag as string

  const filteredListings = ipListings.filter(listing => listing.tags.includes(tag))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Tag: {tag}</h1>

      {filteredListings.length === 0 ? (
        <p className="text-center text-muted-foreground">No publications found for this tag.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((listing) => (
            <PostCard key={listing.id} post={listing} />
          ))}
        </div>
      )}
    </div>
  )
}

