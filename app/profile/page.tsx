"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockUser } from "@/lib/user-mock-data"
import { publications } from "@/lib/data"
import { mockCollections } from "@/lib/collections-mock-data"
import { BookOpen, Bookmark, Award, Twitter, Github, Linkedin, Globe, MessageSquare, Clock, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("articles")

  // Filter user's content
  const userArticles = publications.filter((pub) => pub.author.name === mockUser.name)
  const userCollections = mockCollections.filter((col) => col.curator.name === mockUser.name)

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Profile Header */}
      <Card className="glass-card border-0 overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        <CardContent className="relative pt-0 pb-8">
          <div className="flex flex-col md:flex-row gap-6 -mt-16 md:-mt-20">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
              <AvatarFallback className="text-4xl">{mockUser.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-3xl font-bold">{mockUser.name}</h1>
                    {mockUser.verified && (
                      <Badge className="bg-blue-500">
                        <Award className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground max-w-2xl">{mockUser.bio}</p>
                </div>
                <Button asChild>
                  <Link href="/settings">Edit Profile</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass-card p-4 rounded-xl">
                  <div className="text-2xl font-bold text-blue-500">{mockUser.starkzBalance.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">STZ Balance</div>
                </div>
                <div className="glass-card p-4 rounded-xl">
                  <div className="text-2xl font-bold text-purple-500">{mockUser.articlesPublished}</div>
                  <div className="text-sm text-muted-foreground">Articles</div>
                </div>
                <div className="glass-card p-4 rounded-xl">
                  <div className="text-2xl font-bold text-green-500">{mockUser.followers.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Followers</div>
                </div>
                <div className="glass-card p-4 rounded-xl">
                  <div className="text-2xl font-bold text-orange-500">{mockUser.collectionsCreated}</div>
                  <div className="text-sm text-muted-foreground">Collections</div>
                </div>
              </div>

              {/* Social Links */}
              {mockUser.socialLinks && (
                <div className="flex gap-3">
                  {mockUser.socialLinks.twitter && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={mockUser.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {mockUser.socialLinks.github && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={mockUser.socialLinks.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {mockUser.socialLinks.linkedin && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={mockUser.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {mockUser.socialLinks.website && (
                    <Button variant="outline" size="icon" asChild>
                      <a href={mockUser.socialLinks.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges Section */}
      <Card className="glass-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockUser.badges.map((badge) => (
              <div
                key={badge.id}
                className="glass-card p-4 rounded-xl text-center hover:scale-105 transition-transform"
              >
                <div className="text-4xl mb-2">{badge.icon}</div>
                <div className="font-semibold text-sm">{badge.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{badge.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="glass-card">
          <TabsTrigger value="articles" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Articles ({userArticles.length})
          </TabsTrigger>
          <TabsTrigger value="collections" className="gap-2">
            <Bookmark className="h-4 w-4" />
            Collections ({userCollections.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userArticles.map((article) => (
              <Card
                key={article.id}
                className="glass-card border-0 overflow-hidden group hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.featuredMediaUrl || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold line-clamp-2 text-balance">{article.title}</h3>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Zap className="h-4 w-4 text-blue-500" />
                        {article.starkz}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {article.comments}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-4" asChild>
                    <Link href={`/publications/${article.id}`}>View Article</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="collections" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userCollections.map((collection) => (
              <Card
                key={collection.id}
                className="glass-card border-0 overflow-hidden group hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={collection.coverImage || "/placeholder.svg"}
                    alt={collection.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold line-clamp-2 text-balance">{collection.title}</h3>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{collection.description}</p>
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-muted-foreground">{collection.publicationIds.length} articles</span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Zap className="h-4 w-4 text-blue-500" />
                      {collection.starkz}
                    </span>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full" asChild>
                    <Link href={`/collections/${collection.id}`}>View Collection</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
