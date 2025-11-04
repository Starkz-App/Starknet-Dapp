"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { products, type Product } from "@/src/lib/store-mock-data"
import { publications } from "@/src/lib/data"
import {
  ArrowUpRight,
  TrendingUp,
  Users,
  DollarSign,
  BookOpen,
  Award,
  MessageSquare,
  Tag,
  Bookmark,
  Gift,
  ShoppingCart,
  PlusCircle,
  ChevronRight,
  Zap,
} from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Badge } from "@/src/components/ui/badge"
import { Input } from "@/src/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import Link from "next/link"
import Image from "next/image"

// Mock data for featured collections
const featuredCollections = [
  { id: "1", title: "Web Development Essentials", articlesCount: 15 },
  { id: "2", title: "Machine Learning Fundamentals", articlesCount: 12 },
  { id: "3", title: "Blockchain Technology", articlesCount: 10 },
  { id: "4", title: "Data Science Techniques", articlesCount: 18 },
]

// Mock data for recent store activity
const recentStoreActivity = [
  { id: "1", user: "Alice", action: "purchased", product: "Cosmic Voyage NFT", timestamp: "2 minutes ago" },
  { id: "2", user: "Bob", action: "added to cart", product: "Advanced ML Techniques", timestamp: "15 minutes ago" },
  { id: "3", user: "Charlie", action: "reviewed", product: "Blockchain Fundamentals Course", timestamp: "1 hour ago" },
  { id: "4", user: "David", action: "purchased", product: "Quantum Computing Simulator", timestamp: "3 hours ago" },
]

export default function Home() {
  const [popularProducts, setPopularProducts] = useState<Product[]>([])

  useEffect(() => {
    const sortedProducts = [...products].sort((a, b) => b.price - a.price)
    setPopularProducts(sortedProducts.slice(0, 3))
  }, [])

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative h-[500px] rounded-3xl overflow-hidden glass-card">
        <Image
          src="/knowledge-sharing-technology-hero.jpg"
          alt="Knowledge Sharing Hero"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent flex flex-col justify-center items-start text-white p-8 md:p-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">Welcome to Starkz Knowledge Hub</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl text-pretty">
            Discover, share, and earn rewards for your knowledge in a decentralized ecosystem
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="bg-white text-black hover:bg-white/90">
              <Link href="/explore">Start Exploring</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="bg-transparent text-white border-white hover:bg-white hover:text-black"
            >
              <Link href="/new">Create Content</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Platform Overview</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="glass-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
              <BookOpen className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{publications.length}</div>
              <p className="text-xs text-muted-foreground mt-1">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rewards</CardTitle>
              <DollarSign className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                ${publications.reduce((sum, listing) => sum + listing.starkz * 10, 0).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">+10.5% from last month</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2,543</div>
              <p className="text-xs text-muted-foreground mt-1">+5.2% from last month</p>
            </CardContent>
          </Card>
          <Card className="glass-card border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <TrendingUp className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8.5%</div>
              <p className="text-xs text-muted-foreground mt-1">+2.5% from last month</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Featured Articles</h2>
          <Button variant="ghost" asChild>
            <Link href="/publications" className="group">
              View All{" "}
              <ArrowUpRight className="ml-1 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {publications.slice(0, 3).map((article) => (
            <Card
              key={article.id}
              className="glass-card border-0 flex flex-col overflow-hidden group hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={article.featuredMediaUrl || "/placeholder.svg"}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2 text-balance">{article.title}</CardTitle>
                <CardDescription>
                  By{" "}
                  <Link
                    href={`/authors/${article.author.slug}`}
                    className="hover:text-primary transition-colors hover:underline"
                  >
                    {article.author.name}
                  </Link>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardContent className="flex justify-between items-center pt-0 border-t">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    {article.comments}
                  </span>
                  <span>{article.readTime}</span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/publications/${article.id}`}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular Products Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Popular Products</h2>
          <Button variant="ghost" asChild>
            <Link href="/store" className="group">
              View All <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {popularProducts.map((product) => (
            <Card
              key={product.id}
              className="glass-card border-0 flex flex-col overflow-hidden group hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                <CardDescription>By {product.author}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">{product.price} ETH</span>
                  <Button asChild size="sm">
                    <Link href={`/store/product/${product.id}`}>
                      <ShoppingCart className="mr-2 h-4 w-4" /> View
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recent Store Activity */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Recent Store Activity</h2>
        <Card className="glass-card border-0">
          <CardContent className="p-0">
            <ul className="divide-y divide-border/50">
              {recentStoreActivity.map((activity) => (
                <li key={activity.id} className="p-4 flex items-center hover:bg-white/5 transition-colors">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${activity.user}`}
                      alt={activity.user}
                    />
                    <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      <span className="font-semibold">{activity.user}</span> {activity.action}{" "}
                      <span className="font-semibold">{activity.product}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Featured Collections Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Featured Collections</h2>
          <Button variant="ghost" asChild>
            <Link href="/collections" className="group">
              View All <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredCollections.map((collection) => (
            <Card key={collection.id} className="glass-card border-0 hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{collection.title}</CardTitle>
                <CardDescription>{collection.articlesCount} articles</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href={`/collections/${collection.id}`}>
                    <Bookmark className="mr-2 h-4 w-4" /> View Collection
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Rewards Section */}
      <section className="glass-card border-0 p-8 md:p-12 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-3xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Earn Rewards</h2>
          <Button variant="secondary" asChild>
            <Link href="/rewards">View All Rewards</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="mr-2 h-5 w-5 text-purple-500" /> Content Creation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">Earn rewards for publishing high-quality articles and tutorials.</p>
              <Badge variant="secondary" className="text-sm">
                Up to 500 STZ per article
              </Badge>
            </CardContent>
          </Card>
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5 text-blue-500" /> Engagement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">Get rewarded for commenting and sharing valuable content.</p>
              <Badge variant="secondary" className="text-sm">
                1-10 STZ per interaction
              </Badge>
            </CardContent>
          </Card>
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-green-500" /> Referrals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">Invite friends and earn rewards when they join and contribute.</p>
              <Badge variant="secondary" className="text-sm">
                100 STZ per active referral
              </Badge>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Top Contributors Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Top Contributors</h2>
          <Button variant="ghost" asChild>
            <Link href="/contributors" className="group">
              View All{" "}
              <ArrowUpRight className="ml-1 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {publications.slice(0, 4).map((publication, index) => (
            <Card key={publication.id} className="glass-card border-0 hover:shadow-xl transition-shadow">
              <CardContent className="flex items-center p-6">
                <Avatar className="h-16 w-16 mr-4">
                  <AvatarImage src={publication.author.avatar || "/placeholder.svg"} alt={publication.author.name} />
                  <AvatarFallback>{publication.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{publication.author.name}</h3>
                  <p className="text-sm text-muted-foreground">{publication.categories[0]} Expert</p>
                  <div className="flex items-center mt-2">
                    <Award className="h-4 w-4 mr-1 text-yellow-500" />
                    <span className="text-sm font-medium">Rank #{index + 1}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Actions Section */}
      <Card className="glass-card border-0 rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Zap className="mr-2 h-5 w-5 text-yellow-500" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create">Create Content</TabsTrigger>
              <TabsTrigger value="explore">Explore Knowledge</TabsTrigger>
            </TabsList>
            <TabsContent value="create" className="space-y-4 mt-4">
              <Input placeholder="Enter article title..." className="glass-input" />
              <Button className="w-full" size="lg">
                <PlusCircle className="mr-2 h-5 w-5" />
                Start Writing
              </Button>
            </TabsContent>
            <TabsContent value="explore" className="space-y-4 mt-4">
              <Input placeholder="Search for topics..." className="glass-input" />
              <Button className="w-full" size="lg">
                <BookOpen className="mr-2 h-5 w-5" />
                Discover Articles
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="glass-card border-0 text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-blue-500" />
              </div>
              <CardTitle>1. Explore</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Browse through a vast collection of articles, courses, and digital assets.
              </p>
            </CardContent>
          </Card>
          <Card className="glass-card border-0 text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <PlusCircle className="h-6 w-6 text-purple-500" />
              </div>
              <CardTitle>2. Create</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Share your knowledge by publishing articles, courses, or listing digital assets.
              </p>
            </CardContent>
          </Card>
          <Card className="glass-card border-0 text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                <Gift className="h-6 w-6 text-green-500" />
              </div>
              <CardTitle>3. Earn</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get rewarded for your contributions and engagement on the platform.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="glass-card border-0 p-8 md:p-12 text-center bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="mb-6 text-muted-foreground max-w-2xl mx-auto">
          Subscribe to our newsletter for the latest articles, events, and rewards.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input type="email" placeholder="Enter your email" className="flex-grow glass-input" />
          <Button type="submit" size="lg">
            Subscribe
          </Button>
        </form>
      </section>
    </div>
  )
}
