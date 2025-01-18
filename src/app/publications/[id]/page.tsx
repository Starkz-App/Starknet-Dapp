'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { MessageCircle, Share2, ArrowLeft, Bookmark, ThumbsUp, Gift, Zap, Award, Clock, Eye } from 'lucide-react'
import Image from 'next/image'
import { useToast } from "@/components/ui/use-toast"
import { getPublicationById, getCommentsByPublicationId, Publication, Comment } from '@/lib/data'
import { PublicationActions } from '@/components/PublicationActions'
import { ReactionSystem } from '@/components/ReactionSystem'
import { ReactionBar } from '@/components/ReactionBar'
import { CommunityNotes } from '@/components/CommunityNotes'

export default function PublicationPage() {
  const params = useParams()
  const [publication, setPublication] = useState<Publication | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [isConnected, setIsConnected] = useState(false) // Simulating connection state
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
    if (!isConnected) {
      toast({
        title: "Connection Required",
        description: "Please connect your wallet to comment.",
        variant: "destructive"
      })
      return
    }
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
      description: "Your comment has been added successfully.",
    })
  }

  if (!publication) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          <CardTitle className="mb-4">Loading publication</CardTitle>
          <Button asChild>
            <Link href="/">Back to Start</Link>
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-4 max-w-8xl">
      <Link href="/publications" className="flex items-center text-sm mb-6 hover:underline">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Publications
      </Link>

      <article className="space-y-8 bg-background/80 round-lg p-6 md:p-8 shadow-lg">
        <header className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">{publication.title}</h1>
          <div className="flex items-center text-sm text-muted-foreground space-x-4">
            <span className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {new Date(publication.publishedAt).toLocaleDateString()}
            </span>
            <span className="flex items-center">
              <Eye className="mr-1 h-4 w-4" />
              {publication.readTime} read
            </span>
            <span>{publication.views} hearts</span>
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

        

        <div className="prose max-w-none">
          <p>{publication.content}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {publication.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs py-1 px-2">
              {tag}
            </Badge>
          ))}
        </div>

        <ReactionBar
          publicationId={publication.id}
          initialReactions={{
            likes: publication.likes,
            hearts: publication.hearts,
            starkz: publication.starkz,
            crowns: publication.crowns,
          }}
        />

        


        <Separator />

        <div className="flex items-center text-sm text-muted-foreground space-x-4">
            <span className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              {new Date(publication.publishedAt).toLocaleDateString()}
            </span>
            <span className="flex items-center">
              <Eye className="mr-1 h-4 w-4" />
              {publication.readTime} read
            </span>
            <span>{publication.views} views</span>
          </div>

        

        <div className="flex items-center space-x-4 p-4 rounded-lg">
          <Avatar className="h-16 w-16">
            <AvatarImage src={publication.author.avatar} alt={publication.author.name} />
            <AvatarFallback>{publication.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-lg">{publication.author.name}</p>
            <p className="text-sm text-muted-foreground">{publication.author.bio}</p>
          </div>
        </div>



        <div className="flex justify-between items-center py-4">
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

        <Separator />

        <Tabs defaultValue="comments" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="comments">
              Comments ({comments.length})
            </TabsTrigger>
            <TabsTrigger value="community-notes">
              Community Notes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="comments">
            <Card>
              <CardHeader>
                <CardTitle>Discussion</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <Textarea
                    placeholder={isConnected ? "Add a comment..." : "Connect wallet to comment"}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                    disabled={!isConnected}
                  />
                  <div className="flex justify-between items-center">
                    <Button type="submit" disabled={!isConnected}>
                      {isConnected ? "Post Comment" : "Connect Wallet"}
                    </Button>
                  </div>
                </form>
                <div className="mt-6 space-y-4">
                  {comments.map(comment => (
                    <Card key={comment.id}>
                      <CardHeader>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback>{comment.author[0]}</AvatarFallback>
                          </Avatar>
                          <CardTitle className="text-sm font-medium">{comment.author}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{comment.content}</p>
                      </CardContent>
                      <CardFooter>
                        <p className="text-xs text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleString()}
                        </p>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="community-notes">
            <CommunityNotes publicationId={publication.id} />
          </TabsContent>
        </Tabs>

        <Separator />
      </article>


      <section className="rounded-lg p-6 space-y-6 mt-20">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="bg-background/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5" /> Earn Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Get rewarded for your valuable contributions and engagement.</p>
              </CardContent>
            </Card>
            <Card className="bg-background/10 backdrop-blur-sm ">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gift className="mr-2 h-5 w-5" /> Receive Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Readers can show appreciation by tipping your content with Starkz.</p>
              </CardContent>
            </Card>
            <Card className="bg-background/10 backdrop-blur-sm ">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" /> Build Reputation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Gain recognition and build your reputation in the community.</p>
              </CardContent>
            </Card>
          </div>
          <div className="flex justify-center mt-6">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">Connect, Publish and Start Earning</Link>
            </Button>
          </div>
        </section>



    </div>
  )
}

