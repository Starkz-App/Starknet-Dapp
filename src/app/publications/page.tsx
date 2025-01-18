'use client'

import { useState } from 'react'
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

// Simplified mock data directly in component for reliability
const mockPublications = [
  {
    id: '1',
    title: 'Understanding zk-STARKs: A Comprehensive Guide',
    description: 'An in-depth look at zk-STARKs and their applications in blockchain technology.',
    author: {
      name: 'Dr. Eli Ben-Sasson',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    category: 'Cryptography',
    publishedAt: '2023-06-15T10:00:00Z',
    likes: 120,
    comments: 25,
    views: 1500,
    tags: ['zk-STARKs', 'Blockchain'],
    readTime: '10 min'
  },
  {
    id: '2',
    title: 'Implementing Zero-Knowledge Proofs in Rust',
    description: 'A practical guide to implementing ZKPs using the Rust programming language.',
    author: {
      name: 'Alice Johnson',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    category: 'Programming',
    publishedAt: '2023-06-20T14:30:00Z',
    likes: 95,
    comments: 18,
    views: 1200,
    tags: ['Rust', 'ZKP'],
    readTime: '15 min'
  },
  {
    id: '3',
    title: 'The Future of Privacy in Blockchain',
    description: 'Exploring the role of advanced cryptographic techniques in blockchain privacy.',
    author: {
      name: 'Bob Smith',
      avatar: '/placeholder.svg?height=40&width=40'
    },
    category: 'Blockchain',
    publishedAt: '2023-06-25T09:15:00Z',
    likes: 150,
    comments: 30,
    views: 2000,
    tags: ['Privacy', 'Blockchain'],
    readTime: '8 min'
  }
]

const categories = ['All', 'Cryptography', 'Programming', 'Blockchain', 'Privacy']
const allTags = Array.from(new Set(mockPublications.flatMap(pub => pub.tags)))

export default function PublicationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [readingTime, setReadingTime] = useState([0, 30]) // 0-30 minutes
  const [minLikes, setMinLikes] = useState(0)
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false)

  // Enhanced filtering logic
  const filteredPublications = mockPublications.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || pub.category === selectedCategory
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => pub.tags.includes(tag))
    const matchesReadingTime = parseInt(pub.readTime) >= readingTime[0] && parseInt(pub.readTime) <= readingTime[1]
    const matchesLikes = pub.likes >= minLikes

    return matchesSearch && matchesCategory && matchesTags && matchesReadingTime && matchesLikes
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Starkz Knowledge</h1>

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
                <Label>Reading Time (minutes)</Label>
                <Slider
                  min={0}
                  max={30}
                  step={5}
                  value={readingTime}
                  onValueChange={setReadingTime}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{readingTime[0]} min</span>
                  <span>{readingTime[1]} min</span>
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
          <Card key={publication.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={publication.author.avatar} alt={publication.author.name} />
                  <AvatarFallback>{publication.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{publication.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">by {publication.author.name}</p>
                </div>
              </div>
              {/* Feature Image */}
              <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                <Image
                  src={`/placeholder.svg?height=400&width=600&text=${encodeURIComponent(publication.category)}`}
                  alt={publication.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform hover:scale-105"
                />
              </div>
              <p className="text-sm text-muted-foreground">{publication.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {publication.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <ThumbsUp className="mr-1 h-4 w-4" /> {publication.likes}
                  </span>
                  <span className="flex items-center">
                    <MessageSquare className="mr-1 h-4 w-4" /> {publication.comments}
                  </span>
                  <span className="flex items-center">
                    <Eye className="mr-1 h-4 w-4" /> {publication.views}
                  </span>
                </div>
                <span className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  {publication.readTime}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/publications/${publication.id}`}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredPublications.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No publications found. Try adjusting your filters or search term.</p>
        </div>
      )}
    </div>
  )
}

