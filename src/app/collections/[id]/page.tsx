'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { BookOpen, Users, Lock, Search, Grid, List, ThumbsUp, MessageSquare, Eye, Clock, Tag } from 'lucide-react'
import Image from 'next/image'

// Mock data for a single collection
const mockCollection = {
  id: '1',
  title: 'Web Development Basics',
  description: 'Fundamental concepts of web development',
  visibility: 'public',
  collaborative: false,
  articlesCount: 15,
  articles: [
    { id: '1', title: 'Introduction to HTML', author: 'John Doe', likes: 24, comments: 5, views: 100, excerpt: 'Learn the basics of HTML, the backbone of web development.', tags: ['HTML', 'Web Development'], createdAt: '2025-01-15T10:00:00Z' },
    { id: '2', title: 'CSS Fundamentals', author: 'Jane Smith', likes: 18, comments: 3, views: 80, excerpt: 'Dive into CSS and learn how to style your web pages effectively.', tags: ['CSS', 'Web Design'], createdAt: '2025-01-14T14:30:00Z' },
    { id: '3', title: 'JavaScript Basics', author: 'Bob Johnson', likes: 32, comments: 7, views: 150, excerpt: 'Get started with JavaScript and add interactivity to your websites.', tags: ['JavaScript', 'Programming'], createdAt: '2025-01-13T09:15:00Z' },
    { id: '4', title: 'Responsive Design', author: 'Alice Brown', likes: 15, comments: 2, views: 70, excerpt: 'Learn how to create responsive layouts that work on all devices.', tags: ['Responsive', 'CSS'], createdAt: '2025-01-12T16:45:00Z' },
    { id: '5', title: 'Introduction to React', author: 'Charlie Davis', likes: 40, comments: 10, views: 200, excerpt: 'Discover React and start building modern web applications.', tags: ['React', 'JavaScript'], createdAt: '2025-01-11T11:20:00Z' },
  ]
}

export default function CollectionPage() {
  const params = useParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // In a real application, you would fetch the collection data based on the id
  console.log('Collection ID:', params.id)

  const filteredArticles = mockCollection.articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">{mockCollection.title}</h1>
        <Button>Add New Article</Button>
      </div>

      <Card className="glass-card">
        <CardContent className="pt-6">
          <p className="text-muted-foreground mb-4">{mockCollection.description}</p>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <Badge variant={mockCollection.visibility === 'public' ? 'default' : 'secondary'}>
                {mockCollection.visibility === 'public' ? (
                  <BookOpen className="mr-2 h-4 w-4" />
                ) : (
                  <Lock className="mr-2 h-4 w-4" />
                )}
                {mockCollection.visibility}
              </Badge>
              {mockCollection.collaborative && (
                <Badge variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Collaborative
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {mockCollection.articlesCount} articles
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <div className="flex space-x-4 flex-1">
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Button variant="secondary">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant={viewMode === 'grid' ? 'default' : 'outline'} onClick={() => setViewMode('grid')}>
            <Grid className="h-4 w-4" />
          </Button>
          <Button variant={viewMode === 'list' ? 'default' : 'outline'} onClick={() => setViewMode('list')}>
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="glass-card overflow-hidden">
              <Image
                src={`background.jpg`}
                alt={article.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>By {article.author}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{article.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{article.likes}</span>
                  <MessageSquare className="h-4 w-4 ml-2" />
                  <span>{article.comments}</span>
                  <Eye className="h-4 w-4 ml-2" />
                  <span>{article.views}</span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/articles/${article.id}`}>View</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="glass-card">
          <CardContent className="p-0">
            <ul className="divide-y divide-gray-200">
              {filteredArticles.map((article) => (
                <li key={article.id} className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`https://avatar.vercel.sh/${article.id}.png`} alt={article.author} />
                        <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{article.title}</p>
                      <p className="text-sm text-gray-500 truncate">By {article.author}</p>
                      <p className="text-sm text-muted-foreground mt-1">{article.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {article.tags.map(tag => (
                          <Badge key={tag} variant="secondary">
                            <Tag className="mr-1 h-3 w-3" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{article.likes}</span>
                        <MessageSquare className="h-4 w-4" />
                        <span>{article.comments}</span>
                        <Eye className="h-4 w-4" />
                        <span>{article.views}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/articles/${article.id}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

