'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { BookOpen, Users, Lock, Plus, Search } from 'lucide-react'

// Mock data for collections
const mockCollections = [
  { id: '1', title: 'Web Development Basics', description: 'Fundamental concepts of web development', visibility: 'public', collaborative: false, articlesCount: 15 },
  { id: '2', title: 'Machine Learning Algorithms', description: 'Exploring various ML algorithms', visibility: 'private', collaborative: true, articlesCount: 8 },
  { id: '3', title: 'Blockchain Technology', description: 'Understanding blockchain and its applications', visibility: 'public', collaborative: true, articlesCount: 12 },
  { id: '4', title: 'UI/UX Design Principles', description: 'Best practices in user interface and experience design', visibility: 'public', collaborative: false, articlesCount: 20 },
]

export default function CollectionsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCollections = mockCollections.filter(collection =>
    collection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collection.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Knowledge Collections</h1>
        <Button asChild>
          <Link href="/collections/new">
            <Plus className="mr-2 h-4 w-4" /> Create Collection
          </Link>
        </Button>
      </div>

      <div className="flex space-x-4">
        <Input
          placeholder="Search collections..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="secondary">
          <Search className="mr-2 h-4 w-4" /> Search
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCollections.map((collection) => (
          <Card key={collection.id} className="glass-card">
            <CardHeader>
              <CardTitle>{collection.title}</CardTitle>
              <CardDescription>{collection.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Badge variant={collection.visibility === 'public' ? 'default' : 'secondary'}>
                  {collection.visibility === 'public' ? (
                    <BookOpen className="mr-2 h-4 w-4" />
                  ) : (
                    <Lock className="mr-2 h-4 w-4" />
                  )}
                  {collection.visibility}
                </Badge>
                {collection.collaborative && (
                  <Badge variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Collaborative
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {collection.articlesCount} articles
              </p>
              <Button asChild className="w-full">
                <Link href={`/collections/${collection.id}`}>
                  View Collection
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

