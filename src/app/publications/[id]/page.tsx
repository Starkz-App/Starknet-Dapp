'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft, Clock, Eye, Tag } from 'lucide-react'
import Image from 'next/image'
import { useToast } from "@/components/ui/use-toast"
import { getPublicationById, getCommentsByPublicationId, Publication, Comment } from '@/lib/data'
import { PublicationActions } from '@/components/PublicationActions'
import { ReactionSystem } from '@/components/ReactionSystem'

export default function PublicationPage() {
  const params = useParams()
  const router = useRouter()
  const [publication, setPublication] = useState<Publication | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const { toast } = useToast()

  useEffect(() => {
    if (params.id) {
      const fetchedPublication = getPublicationById(params.id as string)
      if (fetchedPublication) {
        setPublication(fetchedPublication)
        setComments(getCommentsByPublicationId(fetchedPublication.id))
      } else {
        router.push('/404')
      }
    }
  }, [params.id, router])

  if (!publication) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/publications" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Publications
      </Link>

      <article className="space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold">{publication.title}</h1>
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={publication.author.avatar} alt={publication.author.name} />
              <AvatarFallback>{publication.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <Link href={`/authors/${publication.author.id}`} className="font-medium text-lg hover:underline">
                {publication.author.name}
              </Link>
              <p className="text-sm text-muted-foreground">{publication.author.bio}</p>
            </div>
          </div>
          <div className="flex items-center text-sm text-muted-foreground space-x-4">
            <span className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {new Date(publication.date).toLocaleDateString()}
            </span>
            <span className="flex items-center">
              <Eye className="mr-1 h-4 w-4" />
              {publication.views} views
            </span>
            <Link href={`/categories/${encodeURIComponent(publication.category)}`} className="hover:underline">
              {publication.category}
            </Link>
          </div>
        </header>

        <div className="aspect-video relative rounded-lg overflow-hidden shadow-lg">
          <Image
            src={`/background.jpg`}
            alt={publication.title}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <div className="prose max-w-none bg-background p-6 rounded-lg shadow-lg">
          <p>{publication.content}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {publication.tags.map((tag) => (
            <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
              <Badge variant="secondary" className="text-xs py-1 px-2">
                <Tag className="mr-1 h-3 w-3" />
                {tag}
              </Badge>
            </Link>
          ))}
        </div>

        <div className="flex justify-between items-center py-4">
          <PublicationActions
            publicationId={publication.id}
            authorName={publication.author.name}
            authorAddress="0x1234...5678"
          />
          <ReactionSystem
            publicationId={publication.id}
            authorName={publication.author.name}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Comments</CardTitle>
            <CardDescription>Join the discussion</CardDescription>
          </CardHeader>
          <CardContent>
            {comments.map((comment) => (
              <div key={comment.id} className="mb-4 pb-4 border-b last:border-b-0">
                <div className="flex items-center space-x-2 mb-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{comment.author}</span>
                  <span className="text-sm text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <p>{comment.content}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </article>
    </div>
  )
}

