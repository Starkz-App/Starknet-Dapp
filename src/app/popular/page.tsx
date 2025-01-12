'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { exploreMockData, ExploreItem } from '@/lib/explore-mock-data'
import Link from 'next/link'
import { ThumbsUp, Eye, Clock, Tag, FileText, Video, Book, ImageIcon, Heart } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export default function PopularPostsPage() {
  const [sortBy, setSortBy] = useState('hearts')
  const [timeFrame, setTimeFrame] = useState('all')

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Article':
        return <FileText className="h-4 w-4" />;
      case 'Media':
        return <Video className="h-4 w-4" />;
      case 'Topic':
        return <Book className="h-4 w-4" />;
      case 'NFT':
        return <ImageIcon className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const filterByTimeFrame = (items: ExploreItem[]) => {
    const now = new Date();
    switch (timeFrame) {
      case 'day':
        return items.filter(item => {
          const publishDate = new Date(item.publishedAt);
          return (now.getTime() - publishDate.getTime()) / (1000 * 3600 * 24) <= 1;
        });
      case 'week':
        return items.filter(item => {
          const publishDate = new Date(item.publishedAt);
          return (now.getTime() - publishDate.getTime()) / (1000 * 3600 * 24 * 7) <= 1;
        });
      case 'month':
        return items.filter(item => {
          const publishDate = new Date(item.publishedAt);
          return (now.getTime() - publishDate.getTime()) / (1000 * 3600 * 24 * 30) <= 1;
        });
      default:
        return items;
    }
  };

  const sortedListings = filterByTimeFrame([...exploreMockData]).sort((a, b) => {
    if (sortBy === 'hearts') return b.hearts - a.hearts;
    if (sortBy === 'likes') return b.likes - a.likes;
    return 0;
  }).slice(0, 10); // Get top 10

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Popular Posts</h1>
        <div className="flex gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hearts">Most Viewed</SelectItem>
              <SelectItem value="likes">Most Liked</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="day">Last 24 Hours</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedListings.map((listing) => (
          
          <Card key={listing.id} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
            
            <CardHeader>
              <CardTitle className="line-clamp-1 flex items-center gap-2">
                {getTypeIcon(listing.type)}
                <span>{listing.title}</span>
              </CardTitle>
              <CardDescription>{listing.author} • {new Date(listing.publishedAt).toLocaleDateString()}</CardDescription>
            </CardHeader>

            <CardContent className="flex-grow">
              <img src={listing.imageUrl} alt={listing.title} className="w-full h-auto mb-4" />
              
              <div className="flex justify-between items-center mb-4">
                
                <Badge>{listing.category}</Badge>
                
                <div className="flex justify-between items-center">
                <Clock className="h-4 w-4 text-muted-foreground mr-2" />
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(listing.publishedAt), { addSuffix: true })}
                </span>
                </div>

              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{listing.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {listing.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
              
            </CardContent>
            
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link href={`/publications/${listing.id}`}>View Publication</Link>
              </Button>
            </CardFooter>

            <CardFooter className="flex justify-between items-center">
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <ThumbsUp className="h-4 w-4" />
                <span>{listing.likes}</span>
                <Heart className="h-4 w-4 ml-2" />
                <span>{listing.hearts}</span>
              </div>
              
              <div className="flex items-center space-x-2">
              
              <span className="font-bold">{listing.price} STRKZ</span>
              </div>

            </CardFooter>

          </Card>
        ))}
      </div>
    </div>
  )
}

