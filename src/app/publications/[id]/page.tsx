"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import { Separator } from "@/src/components/ui/separator"
import { Textarea } from "@/src/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import Link from "next/link"
import { MessageCircle, ArrowLeft, Clock, BookOpen } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/src/components/ui/use-toast"
import { getPublicationById, getCommentsByPublicationId, type Publication, type Comment } from "@/src/lib/data"
import { PublicationMonetization } from "@/src/components/PublicationMonetization"
import { ReactionBar } from "@/src/components/ReactionBar"
import { CommunityNotes } from "@/src/components/CommunityNotes"

export default function PublicationPage() {
  const params = useParams()
  const [publication, setPublication] = useState<Publication | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isConnected, setIsConnected] = useState(false)
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
        variant: "destructive",
      })
      return
    }
    if (newComment.trim() === "") return

    const newCommentObj: Comment = {
      id: (comments.length + 1).toString(),
      author: "Current User",
      content: newComment,
      createdAt: new Date().toISOString(),
    }

    setComments([...comments, newCommentObj])
    setNewComment("")

    toast({
      title: "Comment Posted",
      description: "Your comment has been added successfully.",
    })
  }

  if (!publication) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          <CardTitle className="mb-4">Publication not found</CardTitle>
          <Button asChild>
            <Link href="/publications">Back to Publications</Link>
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl mb-24">
      <Link href="/publications" className="inline-flex items-center text-sm mb-6 hover:underline group">
        <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
        Back to Publications
      </Link>

      <article className="space-y-8">
        {/* Header Section */}
        <header className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {publication.categories.map((category) => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-balance leading-tight">{publication.title}</h1>
            <p className="text-xl text-muted-foreground text-pretty">{publication.excerpt}</p>
          </div>

          {/* Author Info & Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 rounded-2xl bg-gradient-to-br from-muted/50 to-muted/30 border">
            <Link
              href={`/authors/${publication.author.slug}`}
              className="flex items-center gap-4 hover:opacity-80 transition-opacity group"
            >
              <Avatar className="h-14 w-14 ring-2 ring-primary/20">
                <AvatarImage src={publication.author.avatar || "/placeholder.svg"} alt={publication.author.name} />
                <AvatarFallback>{publication.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-lg group-hover:text-primary transition-colors">
                  {publication.author.name}
                </p>
                <p className="text-sm text-muted-foreground">{publication.author.bio}</p>
              </div>
            </Link>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {new Date(publication.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {publication.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="aspect-[21/9] relative rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={publication.featuredMediaUrl || "/placeholder.svg"}
            alt={publication.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Reaction Bar */}
        <div className="sticky top-4 z-10">
          <ReactionBar
            publicationId={publication.id}
            initialReactions={{
              starkz: publication.starkz,
              comments: publication.comments,
            }}
          />
        </div>

        {/* Content */}
        <Card className="border-2">
          <CardContent className="prose prose-lg dark:prose-invert max-w-none p-8 md:p-12">
            <p className="text-lg leading-relaxed">{publication.content}</p>

            {/* Additional content sections for better UX */}
            <h2>Key Takeaways</h2>
            <ul>
              <li>Understanding the fundamental concepts and their practical applications</li>
              <li>Best practices for implementation in real-world scenarios</li>
              <li>Common pitfalls to avoid and optimization strategies</li>
            </ul>

            <h2>Deep Dive</h2>
            <p>
              This publication explores advanced techniques and methodologies that have been proven effective in the
              field. Through careful analysis and practical examples, we demonstrate how these concepts can be applied
              to solve complex problems.
            </p>

            <h2>Conclusion</h2>
            <p>
              By understanding and implementing these principles, you'll be better equipped to tackle challenges in your
              own projects. The knowledge shared here represents years of research and practical experience in the
              field.
            </p>
          </CardContent>
        </Card>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {publication.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs px-3 py-1">
              #{tag}
            </Badge>
          ))}
        </div>

        <Separator className="my-8" />

        <PublicationMonetization
          publicationId={publication.id}
          authorName={publication.author.name}
          authorAddress="0x1234...5678"
          publicationTitle={publication.title}
        />

        <Separator className="my-8" />

        {/* Comments & Community Notes */}
        <Tabs defaultValue="comments" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="comments" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              Comments ({comments.length})
            </TabsTrigger>
            <TabsTrigger value="community-notes">Community Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="comments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Join the Discussion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <Textarea
                    placeholder={isConnected ? "Share your thoughts..." : "Connect your wallet to join the discussion"}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={4}
                    disabled={!isConnected}
                    className="resize-none"
                  />
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      {isConnected ? "Your comment will be posted publicly" : "Wallet connection required"}
                    </p>
                    <Button type="submit" disabled={!isConnected}>
                      {isConnected ? "Post Comment" : "Connect Wallet"}
                    </Button>
                  </div>
                </form>

                <Separator />

                <div className="space-y-4">
                  {comments.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No comments yet. Be the first to share your thoughts!</p>
                    </div>
                  ) : (
                    comments.map((comment) => (
                      <Card key={comment.id} className="border">
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{comment.author[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-sm font-semibold">{comment.author}</CardTitle>
                              <p className="text-xs text-muted-foreground">
                                {new Date(comment.createdAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm leading-relaxed">{comment.content}</p>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community-notes" className="mt-6">
            <CommunityNotes publicationId={publication.id} />
          </TabsContent>
        </Tabs>
      </article>
    </div>
  )
}
