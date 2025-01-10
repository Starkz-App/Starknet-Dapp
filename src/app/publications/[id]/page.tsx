'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import Link from 'next/link'
import { Calendar, MessageSquare, Eye, BookOpen, Tag } from 'lucide-react'
import { PublicationActions } from '@/components/PublicationActions'
import { ReactionSystem } from '@/components/ReactionSystem'
import { ReactionBar } from '@/components/ReactionBar'
import { CommunityNotes } from '@/components/CommunityNotes'
import { useToast } from "@/components/ui/use-toast"
import { getPublicationById, getCommentsByPublicationId, Publication, Comment, publications } from '@/lib/data'

export default function PublicationPage() {
  const params = useParams()
  const [publication, setPublication] = useState<Publication | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    if (params.id) {
      const fetchedPublication = getPublicationById(params.id as string)
      if (fetchedPublication) {
        setPublication(fetchedPublication)
        setComments(getCommentsByPublicationId(fetchedPublication.id))
      }
    }
  }, [params.id])

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim() === '') return

    const newCommentObj: Comment = {
      id: (comments.length + 1).toString(),
      author: 'Current User',
      content: newComment,
      createdAt: new Date().toISOString(),
    }

    setComments([...comments, newCommentObj])
    setNewComment('')

    toast({
      title: "Comment Posted",
      description: "Your comment has been successfully added to the discussion.",
    })
  }

  if (!publication) {
    return <div className="container mx-auto px-4 py-8">Publication not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="mb-8 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-primary-foreground text-white">
          <CardTitle className="text-3xl md:text-4xl font-bold mb-4">{publication.title}</CardTitle>
          <CardDescription className="text-white/80">
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
              <Avatar className="h-12 w-12 border-2 border-white">
                <AvatarImage src={publication.author.avatar} alt={publication.author.name} />
                <AvatarFallback>{publication.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-lg">{publication.author.name}</div>
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{new Date(publication.publishedAt).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>{publication.readTime}</span>
                </div>
              </div>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: publication.content }}></div>
        </CardContent>
        <CardFooter className="flex flex-wrap justify-between items-center gap-4 bg-muted/50 p-6">
          <div className="flex flex-wrap gap-2">
            {publication.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="text-sm py-1 px-3">
                <Tag className="mr-1 h-4 w-4" />
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span className="flex items-center">
              <Eye className="mr-1 h-5 w-5" /> {publication.views.toLocaleString()}
            </span>
            <span className="flex items-center">
              <MessageSquare className="mr-1 h-5 w-5" /> {publication.comments}
            </span>
          </div>
        </CardFooter>
      </Card>

      <ReactionBar
        publicationId={publication.id}
        initialReactions={{
          likes: publication.likes,
          hearts: publication.hearts,
          starkz: publication.starkz,
          crowns: publication.crowns,
        }}
      />

      <div className="flex flex-wrap justify-center gap-4 my-8">
        <PublicationActions
          publicationId={publication.id}
          authorName={publication.author.name}
          authorAddress="0x1234...5678" // This should be replaced with the actual author's address
        />
        <ReactionSystem
          publicationId={publication.id}
          authorName={publication.author.name}
        />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="md:col-span-2">
          <Tabs defaultValue="comments">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="comments" className="text-lg py-3">Comments</TabsTrigger>
              <TabsTrigger value="community-notes" className="text-lg py-3">Community Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="comments">
              <CardHeader>
                <CardTitle className="text-2xl">Comments</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCommentSubmit} className="mb-6">
                  <Textarea
                    placeholder="Leave a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-2 min-h-[100px]"
                  />
                  <Button type="submit" size="lg">Post Comment</Button>
                </form>
                <div className="space-y-6">
                  {comments.map(comment => (
                    <div key={comment.id} className="flex space-x-4 bg-muted/30 p-4 rounded-lg">
                      <Avatar>
                        <AvatarFallback>{comment.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold text-lg">{comment.author}</p>
                        <p className="text-sm text-muted-foreground mb-2">
                          {new Date(comment.createdAt).toLocaleString()}
                        </p>
                        <p className="text-base">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </TabsContent>
            <TabsContent value="community-notes">
              <CommunityNotes publicationId={publication.id} />
            </TabsContent>
          </Tabs>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">About the Author</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={publication.author.avatar} alt={publication.author.name} />
                  <AvatarFallback>{publication.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-xl">{publication.author.name}</p>
                  <p className="text-sm text-muted-foreground">{publication.author.bio}</p>
                </div>
              </div>
              <Button className="w-full" size="lg">Follow Author</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Related Publications</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {publications
                  .filter(pub => pub.id !== publication.id)
                  .slice(0, 3)
                  .map(pub => (
                    <li key={pub.id} className="border-b border-muted pb-4 last:border-b-0 last:pb-0">
                      <Link href={`/publications/${pub.id}`} className="text-primary hover:underline text-lg font-medium">
                        {pub.title}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">by {pub.author.name}</p>
                    </li>
                  ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

