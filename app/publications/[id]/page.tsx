"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { MessageCircle, ArrowLeft, Clock, BookOpen, Heart, Bookmark, Share2, Eye } from "lucide-react"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { getPublicationById, getCommentsByPublicationId, type Publication, type Comment } from "@/lib/data"
import { PublicationMonetization } from "@/components/PublicationMonetization"
import { CommunityNotes } from "@/components/CommunityNotes"

export default function PublicationPage() {
  const params = useParams()
  const [publication, setPublication] = useState<Publication | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
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

  const handleLike = () => {
    setLiked(!liked)
    toast({
      description: liked ? "Removed from liked" : "Added to liked",
    })
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
    toast({
      description: bookmarked ? "Removed from bookmarks" : "Added to bookmarks",
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: publication?.title,
        text: publication?.excerpt,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        description: "Link copied to clipboard",
      })
    }
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
    <div className="min-h-screen mb-24">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-3 max-w-4xl flex items-center justify-between">
          <Link href="/publications" className="inline-flex items-center text-sm hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Back</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleLike} className={liked ? "text-red-500" : ""}>
              <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
              <span className="ml-1 hidden sm:inline">{publication.starkz}</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleBookmark} className={bookmarked ? "text-primary" : ""}>
              <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-4 max-w-3xl">
        <header className="py-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {publication.categories.map((category) => (
              <Badge key={category} variant="secondary" className="text-xs rounded-full">
                {category}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance leading-tight">{publication.title}</h1>

          <p className="text-lg sm:text-xl text-muted-foreground text-pretty leading-relaxed">{publication.excerpt}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {new Date(publication.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              {publication.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5" />
              {Math.floor(Math.random() * 5000 + 1000)} views
            </span>
          </div>
        </header>

        {publication.featuredMediaUrl && (
          <div className="aspect-video sm:aspect-[2/1] relative rounded-xl overflow-hidden my-6">
            <Image
              src={publication.featuredMediaUrl || "/placeholder.svg"}
              alt={publication.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none py-6 sm:py-8">
          <p className="text-lg leading-relaxed">{publication.content}</p>

          <h2>Key Takeaways</h2>
          <ul>
            <li>Understanding the fundamental concepts and their practical applications</li>
            <li>Best practices for implementation in real-world scenarios</li>
            <li>Common pitfalls to avoid and optimization strategies</li>
          </ul>

          <h2>Deep Dive</h2>
          <p>
            This publication explores advanced techniques and methodologies that have been proven effective in the
            field. Through careful analysis and practical examples, we demonstrate how these concepts can be applied to
            solve complex problems.
          </p>

          <h2>Conclusion</h2>
          <p>
            By understanding and implementing these principles, you'll be better equipped to tackle challenges in your
            own projects. The knowledge shared here represents years of research and practical experience in the field.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 py-6">
          {publication.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="text-sm px-3 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="py-6">
          <h3 className="text-lg font-semibold mb-4">About the Author</h3>
          <Link
            href={`/authors/${publication.author.slug}`}
            className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
          >
            <Avatar className="h-16 w-16 ring-2 ring-primary/20">
              <AvatarImage src={publication.author.avatar || "/placeholder.svg"} alt={publication.author.name} />
              <AvatarFallback>{publication.author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold text-lg group-hover:text-primary transition-colors">
                {publication.author.name}
              </p>
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{publication.author.bio}</p>
            </div>
          </Link>
        </div>

        <Separator className="my-8" />

        <div className="py-6">
          <PublicationMonetization
            publicationId={publication.id}
            authorName={publication.author.name}
            authorAddress="0x1234...5678"
            publicationTitle={publication.title}
          />
        </div>

        <Separator className="my-8" />

        <div className="py-6">
          <Tabs defaultValue="comments" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="comments" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Comments</span> ({comments.length})
              </TabsTrigger>
              <TabsTrigger value="community-notes">
                <span className="hidden sm:inline">Community Notes</span>
                <span className="sm:hidden">Notes</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="comments" className="space-y-6">
              <form onSubmit={handleCommentSubmit} className="space-y-3">
                <Textarea
                  placeholder={isConnected ? "Share your thoughts..." : "Connect your wallet to join the discussion"}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  disabled={!isConnected}
                  className="resize-none"
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={!isConnected} size="sm">
                    {isConnected ? "Post Comment" : "Connect Wallet"}
                  </Button>
                </div>
              </form>

              <div className="space-y-4">
                {comments.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">No comments yet. Be the first to share your thoughts!</p>
                  </div>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="p-4 rounded-lg bg-muted/30">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{comment.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold">{comment.author}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(comment.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed pl-11">{comment.content}</p>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="community-notes">
              <CommunityNotes publicationId={publication.id} />
            </TabsContent>
          </Tabs>
        </div>
      </article>
    </div>
  )
}
