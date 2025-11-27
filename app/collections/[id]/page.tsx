"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import {
  BookOpen,
  Users,
  Lock,
  Search,
  Grid,
  List,
  MessageSquare,
  Clock,
  Tag,
  Sparkles,
  UserCircle,
  Calendar,
  Share2,
  UserPlus,
} from "lucide-react"
import Image from "next/image"
import { getCollectionById } from "@/lib/collections-mock-data"

export default function CollectionPage() {
  const params = useParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isFollowing, setIsFollowing] = useState(false)

  const collection = getCollectionById(params.id as string)

  if (!collection) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="glass-card p-12">
          <div className="text-center space-y-3">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="text-lg font-semibold">Collection not found</h3>
            <p className="text-muted-foreground">The collection you're looking for doesn't exist</p>
            <Button asChild>
              <Link href="/collections">Browse Collections</Link>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const filteredArticles =
    collection.articles?.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
    ) || []

  return (
    <div className="space-y-8 pb-20">
      <div className="relative h-[300px] md:h-[400px] -mx-4 md:mx-0 md:rounded-3xl overflow-hidden">
        <Image
          src={collection.coverImage || "/placeholder.svg"}
          alt={collection.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />

        <div className="absolute inset-0 flex items-end">
          <div className="w-full p-4 md:p-12">
            <div className="max-w-5xl mx-auto space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={collection.visibility === "public" ? "default" : "secondary"}
                  className="backdrop-blur-md bg-background/50"
                >
                  {collection.visibility === "public" ? (
                    <BookOpen className="mr-1 h-3 w-3" />
                  ) : (
                    <Lock className="mr-1 h-3 w-3" />
                  )}
                  {collection.visibility}
                </Badge>
                {collection.collaborative && (
                  <Badge variant="outline" className="backdrop-blur-md bg-background/50 border-white/20">
                    <Users className="mr-1 h-3 w-3" />
                    Collaborative
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
                {collection.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Description and Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl">About this Collection</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">{collection.description}</p>

                <Separator />

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                    <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{collection.articlesCount}</p>
                    <p className="text-xs text-muted-foreground">Publications</p>
                  </div>

                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border border-yellow-500/20">
                    <Sparkles className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
                    <p className="text-2xl font-bold">{collection.starkz}</p>
                    <p className="text-xs text-muted-foreground">Starkz</p>
                  </div>

                  <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                    <UserCircle className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                    <p className="text-2xl font-bold">{collection.followers}</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                </div>

                <Separator />

                {/* Tags */}
                <div>
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    Topics
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {collection.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Curator Card */}
          <div className="lg:col-span-1">
            <Card className="glass-card sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Curated by</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                    <AvatarImage src={collection.curator.avatar || "/placeholder.svg"} alt={collection.curator.name} />
                    <AvatarFallback className="text-2xl">{collection.curator.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="space-y-1">
                    <p className="font-bold text-lg">{collection.curator.name}</p>
                    <p className="text-sm text-muted-foreground">@{collection.curator.username}</p>
                  </div>

                  <Button
                    className="w-full"
                    variant={isFollowing ? "outline" : "default"}
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    <UserPlus className="mr-2 h-4 w-4" />
                    {isFollowing ? "Following" : "Follow"}
                  </Button>

                  <div className="flex gap-2 w-full">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Created</span>
                    <span className="font-medium">{new Date(collection.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Updated</span>
                    <span className="font-medium">{new Date(collection.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Publications Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold">Publications</h2>
              <p className="text-muted-foreground">{filteredArticles.length} articles in this collection</p>
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search publications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {viewMode === "grid" ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <Link key={article.id} href={`/publications/${article.id}`}>
                  <Card className="glass-card overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      <div className="absolute bottom-3 right-3 flex items-center gap-2 text-white text-sm font-medium">
                        <div className="flex items-center gap-1 backdrop-blur-sm bg-black/30 px-2 py-1 rounded-full">
                          <Sparkles className="h-3 w-3 text-yellow-400" />
                          <span>{article.starkz}</span>
                        </div>
                        <div className="flex items-center gap-1 backdrop-blur-sm bg-black/30 px-2 py-1 rounded-full">
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime}m</span>
                        </div>
                      </div>
                    </div>

                    <CardHeader>
                      <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{article.excerpt}</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <Link
                        href={`/authors/${article.author.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
                          <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate hover:text-primary transition-colors">
                            {article.author.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">@{article.author.username}</p>
                        </div>
                      </Link>

                      <div className="flex flex-wrap gap-1">
                        {article.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2 border-t">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{article.comments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card className="glass-card">
              <CardContent className="p-0">
                <div className="divide-y">
                  {filteredArticles.map((article) => (
                    <Link key={article.id} href={`/publications/${article.id}`}>
                      <div className="p-6 hover:bg-accent/50 transition-colors group">
                        <div className="flex gap-6">
                          <div className="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                            <Image
                              src={article.image || "/placeholder.svg"}
                              alt={article.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          <div className="flex-1 min-w-0 space-y-3">
                            <div>
                              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
                                {article.title}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{article.excerpt}</p>
                            </div>

                            <Link
                              href={`/authors/${article.author.slug}`}
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                            >
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={article.author.avatar || "/placeholder.svg"}
                                  alt={article.author.name}
                                />
                                <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium hover:text-primary transition-colors">
                                {article.author.name}
                              </span>
                            </Link>

                            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Sparkles className="h-4 w-4 text-yellow-500" />
                                <span>{article.starkz}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                <span>{article.comments}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{article.readTime} min read</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1">
                              {article.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {filteredArticles.length === 0 && (
            <Card className="glass-card p-12">
              <div className="text-center space-y-3">
                <Search className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="text-lg font-semibold">No publications found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
