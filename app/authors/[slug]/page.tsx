"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import {
  MapPin,
  Globe,
  Calendar,
  BookOpen,
  Zap,
  Users,
  ArrowLeft,
  Twitter,
  Github,
  UserPlus,
  Share2,
  MessageSquare,
  Clock,
} from "lucide-react"
import Image from "next/image"
import { getAuthorBySlug, getPublicationsByAuthor, type Author, type Publication } from "@/lib/data"

export default function AuthorPage() {
  const params = useParams()
  const [author, setAuthor] = useState<Author | null>(null)
  const [publications, setPublications] = useState<Publication[]>([])
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    if (params.slug) {
      const fetchedAuthor = getAuthorBySlug(params.slug as string)
      if (fetchedAuthor) {
        setAuthor(fetchedAuthor)
        setPublications(getPublicationsByAuthor(fetchedAuthor.id))
      }
    }
  }, [params.slug])

  if (!author) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center glass-card">
          <CardTitle className="mb-4">Author not found</CardTitle>
          <Button asChild>
            <Link href="/explore">Back to Explore</Link>
          </Button>
        </Card>
      </div>
    )
  }

  const joinedDate = new Date(author.joinedAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  })

  return (
    <div className="space-y-8 pb-20">
      {/* Back Button */}
      <Link href="/explore" className="inline-flex items-center text-sm hover:underline group">
        <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
        Back to Explore
      </Link>

      {/* Hero Header */}
      <div className="relative h-[300px] md:h-[400px] -mx-4 md:mx-0 md:rounded-3xl overflow-hidden">
        <Image
          src={author.coverImage || "/placeholder.svg?height=400&width=1200"}
          alt={`${author.name} cover`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

        {/* Author Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
              <Avatar className="h-32 w-32 ring-4 ring-background shadow-2xl">
                <AvatarImage src={author.avatar || "/placeholder.svg"} alt={author.name} />
                <AvatarFallback className="text-4xl">{author.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-3">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-balance">{author.name}</h1>
                  <p className="text-lg text-muted-foreground">@{author.username}</p>
                </div>

                <div className="flex flex-wrap gap-3 text-sm">
                  {author.location && (
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {author.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Joined {joinedDate}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  size="lg"
                  variant={isFollowing ? "outline" : "default"}
                  onClick={() => setIsFollowing(!isFollowing)}
                  className="gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <Button size="lg" variant="outline">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Bio and Stats Section */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Bio and Links */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">{author.bio}</p>

                <Separator />

                {/* Social Links */}
                <div className="flex flex-wrap gap-3">
                  {author.website && (
                    <Button variant="outline" size="sm" asChild className="gap-2 bg-transparent">
                      <a href={author.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4" />
                        Website
                      </a>
                    </Button>
                  )}
                  {author.twitter && (
                    <Button variant="outline" size="sm" asChild className="gap-2 bg-transparent">
                      <a
                        href={`https://twitter.com/${author.twitter.replace("@", "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter className="h-4 w-4" />
                        Twitter
                      </a>
                    </Button>
                  )}
                  {author.github && (
                    <Button variant="outline" size="sm" asChild className="gap-2 bg-transparent">
                      <a href={`https://github.com/${author.github}`} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats Card */}
          <div className="lg:col-span-1">
            <Card className="glass-card sticky top-24">
              <CardHeader>
                <CardTitle>Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-blue-500" />
                      <span className="text-sm font-medium">Publications</span>
                    </div>
                    <span className="text-2xl font-bold">{author.totalPublications}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm font-medium">Total Starkz</span>
                    </div>
                    <span className="text-2xl font-bold">{author.totalStarkz}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-500" />
                      <span className="text-sm font-medium">Followers</span>
                    </div>
                    <span className="text-2xl font-bold">{author.followers}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        {/* Publications Section */}
        <Tabs defaultValue="publications" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="publications" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Publications ({publications.length})
            </TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="publications" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              {publications.map((publication) => (
                <Link key={publication.id} href={`/publications/${publication.id}`}>
                  <Card className="glass-card overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={publication.featuredMediaUrl || "/placeholder.svg"}
                        alt={publication.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground border-0">
                          {publication.categories[0]}
                        </Badge>
                      </div>

                      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-amber-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-semibold">
                        <Zap className="h-4 w-4 fill-current" />
                        {publication.starkz}
                      </div>
                    </div>

                    <CardHeader className="space-y-3">
                      <CardTitle className="text-xl font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {publication.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {publication.excerpt}
                      </p>
                    </CardHeader>

                    <CardContent className="flex items-center justify-between pt-0 border-t border-border/50">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <MessageSquare className="h-4 w-4" />
                          {publication.comments}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          {publication.readTime}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(publication.publishedAt).toLocaleDateString()}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {publications.length === 0 && (
              <Card className="glass-card p-12">
                <div className="text-center space-y-3">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                  <h3 className="text-lg font-semibold">No publications yet</h3>
                  <p className="text-muted-foreground">This author hasn't published any content yet.</p>
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <Card className="glass-card">
              <CardContent className="p-8 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Biography</h3>
                  <p className="text-muted-foreground leading-relaxed">{author.bio}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {publications
                      .flatMap((pub) => pub.categories)
                      .filter((cat, index, self) => self.indexOf(cat) === index)
                      .map((category) => (
                        <Badge key={category} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-3">Activity</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Member since</span>
                      <span className="font-medium">{joinedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total publications</span>
                      <span className="font-medium">{author.totalPublications}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total rewards earned</span>
                      <span className="font-medium">{author.totalStarkz} STZ</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
