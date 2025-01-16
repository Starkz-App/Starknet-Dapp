'use client'

import { useParams } from 'next/navigation'
import { ipListings, authors } from '@/lib/mockData'
import { PostCard } from '@/components/PostCard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function AuthorArchivePage() {
  const params = useParams()
  const authorId = params.id as string

  const author = authors.find(a => a.id === authorId)
  const authorListings = ipListings.filter(listing => listing.author.id === authorId)

  if (!author) {
    return <div className="container mx-auto px-4 py-8">Author not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{author.name}</h1>
          <p className="text-muted-foreground">{author.bio}</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Publications</h2>
      {authorListings.length === 0 ? (
        <p className="text-center text-muted-foreground">No publications found for this author.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {authorListings.map((listing) => (
            <PostCard key={listing.id} post={listing} />
          ))}
        </div>
      )}
    </div>
  )
}

