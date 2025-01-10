'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Search, Grid, List, ThumbsUp, MessageSquare, Eye, Tag } from 'lucide-react'
import Image from 'next/image'
import { Breadcrumb } from '@/components/Breadcrumb'
import { publications, Publication } from '@/lib/data'

export default function PublicationsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredPublications = publications.filter((pub: Publication) =>
    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pub.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: 'Publications', href: '/publications' }]} />
      <h1 className="text-3xl font-bold mb-8">Publications</h1>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <div className="flex w-full sm:w-auto space-x-4">
          <Input
            placeholder="Search publications..."
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

      <div className={`grid gap-6 ${viewMode === 'grid' ? 'sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {filteredPublications.map((publication) => (
          <Card key={publication.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="line-clamp-2">{publication.title}</CardTitle>
              <CardDescription>By {publication.author.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{publication.content.replace(/<[^>]*>?/gm, '').slice(0, 150)}...</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {publication.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    <Tag className="mr-1 h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center mt-auto">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <ThumbsUp className="h-4 w-4" />
                <span>{publication.likes}</span>
                <MessageSquare className="h-4 w-4 ml-2" />
                <span>{publication.comments}</span>
                <Eye className="h-4 w-4 ml-2" />
                <span>{publication.views}</span>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/publications/${publication.id}`}>Read More</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

