'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { products, Product } from '@/lib/store-mock-data'
import { publications } from '@/lib/data'
import { ArrowUpRight, TrendingUp, Users, DollarSign, BookOpen, Award, ThumbsUp, MessageSquare, Eye, Tag, Bookmark, Gift, ShoppingCart, PlusCircle, ChevronRight, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import Image from 'next/image'







// Mock data for featured collections
const featuredCollections = [
  { id: '1', title: 'zk-STARKs', articlesCount: 15, followers: 120 },
  { id: '2', title: 'Quantum Resistance', articlesCount: 12, followers: 280 },
  { id: '3', title: 'Blockchain', articlesCount: 10, followers: 85 },
  { id: '4', title: 'Validity Rollup', articlesCount: 18, followers: 150 },
]

// Mock data for recent store activity
const recentStoreActivity = [
  { id: '1', user: 'Eli', action: 'purchased', product: 'Cosmic Voyage NFT', timestamp: '2 minutes ago' },
  { id: '2', user: 'Pedro', action: 'added to cart', product: 'Advanced ML Techniques', timestamp: '15 minutes ago' },
  { id: '3', user: 'Robert', action: 'reviewed', product: 'Blockchain Fundamentals Course', timestamp: '1 hour ago' },
  { id: '4', user: 'David', action: 'purchased', product: 'Quantum Computing Simulator', timestamp: '3 hours ago' },
]











export default function Home() {




  const [popularProducts, setPopularProducts] = useState<Product[]>([])

  useEffect(() => {
    const sortedProducts = [...products].sort((a, b) => b.price - a.price)
    setPopularProducts(sortedProducts.slice(0, 3))
  }, [])




  return (
    <div className="space-y-10">











      {/* Hero Section */}
      <section className="relative h-[500px] rounded-lg overflow-hidden">
        <Image
          src="/Starkz-from-ai-to-zk-banner-box.jpg"
          alt="Starkz"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center">Starkz Knowledge Hub</h1>
          <p className="text-lg md:text-xl mb-8 text-center max-w-2xl">Discover, share, and earn rewards for your knowledge in a decentralized ecosystem</p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/explore">Start Exploring</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-transparent text-white border-white hover:bg-white hover:text-black">
              <Link href="/new">Create Content</Link>
            </Button>
          </div>
        </div>
      </section>














      {/* Quick Stats Section */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-4">Platform Overview</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-card text-card-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{publications.length}</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-card text-card-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rewards Distributed</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${publications.reduce((sum, listing) => sum + listing.price, 0).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+10.5% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-card text-card-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(publications.reduce((sum, listing) => sum + listing.views, 0) / 10).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+5.2% from last month</p>
            </CardContent>
          </Card>
          <Card className="bg-card text-card-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Engagement Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.5%</div>
              <p className="text-xs text-muted-foreground">+2.5% from last month</p>
            </CardContent>
          </Card>
        </div>
      </section>











      {/* Featured Articles Section */}
      <section className="py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Featured Articles</h2>
          <Button variant="ghost" asChild>
            <Link href="/publications">View All <ArrowUpRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {publications.slice(0, 3).map((article) => (
            <Card key={article.id} className="flex flex-col">
              <div className="relative h-48">
                <Image
                  src={`/background.jpg`}
                  alt={article.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{article.title}</CardTitle>
                <CardDescription>By {article.author.name}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{article.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="secondary">
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardContent className="flex justify-between items-center pt-0">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{article.likes}</span>
                  <Eye className="h-4 w-4 ml-2" />
                  <span>{article.views}</span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/publications/${article.id}`}>Read More</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>






















               {/* Trending Topics Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Trending Topics</h2>
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(publications.flatMap(pub => pub.tags))).slice(0, 10).map((tag, index) => (
            <Button key={tag} variant="outline" size="sm" asChild>
              <Link href={`/tags/${tag}`}>
                <Tag className="mr-1 h-3 w-3" />
                {tag}
                <Badge variant="secondary" className="ml-2">{index + 1}</Badge>
              </Link>
            </Button>
          ))}
        </div>
      </section>















      {/* Featured Collections Section */}
      <section className="py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Featured Topics</h2>
          <Button variant="ghost" asChild>
            <Link href="/collections">View All <ArrowUpRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredCollections.map((collection) => (
            <Card className='bg-background/60' key={collection.id}>
              <CardHeader>
                <CardTitle>{collection.title}</CardTitle>
                <CardDescription>{collection.articlesCount} publications</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{collection.title} description.</p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  
                  <span>{collection.followers} followers</span>

                  <Button variant="ghost" size="sm">
                    <Bookmark className="mr-1 h-4 w-4" /> Share
                  </Button>
                </div>
              </CardContent>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/collections/${collection.id}`}>View</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>













      {/* Recent Articles Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Recent Articles</h2>
          <Button variant="ghost" asChild>
            <Link href="/publications">View All <ArrowUpRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <Card className="glass-card">
          <CardContent className="p-0">
            <ul className="divide-y divide-gray-200">
              {publications.slice(0, 5).map((article) => (
                <li key={article.id} className="p-4 flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={article.author.avatar} alt={article.author.name} />
                    <AvatarFallback>{article.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{article.title}</p>
                    <p className="text-sm text-gray-500">By {article.author.name} • {article.category}</p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{article.likes}</span>
                    <MessageSquare className="h-4 w-4" />
                    <span>{article.views}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>















      {/* Rewards Section */}
      <section className="py-20">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Earn Rewards</h2>
            <Button variant="secondary" asChild>
              <Link href="/rewards">View All Rewards</Link>
            </Button>
          </div>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-background/60">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gift className="mr-2 h-5 w-5" /> Content Creation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Earn rewards for publishing high-quality articles and tutorials.</p>
                <Badge variant="secondary">Up to 500 STZ per article</Badge>
              </CardContent>
            </Card>
            <Card className="bg-background/60">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ThumbsUp className="mr-2 h-5 w-5" /> Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Get rewarded for liking, commenting, and sharing valuable content.</p>
                <Badge variant="secondary">1-10 STZ per interaction</Badge>
              </CardContent>
            </Card>
            <Card className="bg-background/60">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" /> Referrals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Invite friends and earn rewards when they join and contribute.</p>
                <Badge variant="secondary">100 STZ per active referral</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>




















      {/* Top Contributors Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Top Contributors</h2>
          <Button variant="ghost" asChild>
            <Link href="/contributors">View All <ArrowUpRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {publications.slice(0, 5).map((publication, index) => (
            <Card key={publication.id} className="glass-card">
              <CardContent className="flex items-center p-6">
                <Avatar className="h-16 w-16 mr-4">
                  <AvatarImage src={publication.author.avatar} alt={publication.author.name} />
                  <AvatarFallback>{publication.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{publication.author.name}</h3>
                  <p className="text-sm text-muted-foreground">{publication.category} Expert</p>
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



















      {/* Featured Content Creator Section */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-4">Featured Content Creator</h2>
        <Card className="flex flex-col md:flex-row items-center p-6 glass-card">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4 md:mb-0 md:mr-6">
            <AvatarImage src="https://github.com/shadcn.png" alt="Featured Creator" />
            <AvatarFallback>FC</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <h3 className="text-xl font-semibold mb-2">John Doe</h3>
            <p className="text-muted-foreground mb-4">Blockchain Expert | 500+ Articles | 10k+ Followers</p>
            <p className="mb-4">John is a leading voice in blockchain technology, known for his insightful articles and innovative research.</p>
            <Button asChild>
              <Link href="/profile/johndoe">View Profile</Link>
            </Button>
          </div>
        </Card>
      </section>

















      {/* Recent Activity */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="p-0">
            <ul className="divide-y divide-border">
              {recentStoreActivity.map((activity) => (
                <li key={activity.id} className="p-4 flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={`https://avatar.vercel.sh/${activity.user}.png`} alt={activity.user} />
                    <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {activity.user} {activity.action} {activity.product}
                    </p>
                    <p className="text-sm text-muted-foreground">{activity.timestamp}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>














      <section className="py-8">
          <div className='flex items-center'>
            <Image src="/background.jpg" alt="Starkz" width={2000} height={600} />
          </div>
      </section>
















      {/* Quick Start Guide Section */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className='bg-background/60'>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" /> 1. Explore
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Browse through a vast collection of articles, courses, and digital assets.</p>
            </CardContent>
          </Card>
          <Card className='bg-background/60'>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PlusCircle className="mr-2 h-5 w-5" /> 2. Create
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Share your knowledge by publishing articles, courses, or listing digital assets.</p>
            </CardContent>
          </Card>
          <Card className='bg-background/60'>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Gift className="mr-2 h-5 w-5" /> 3. Earn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Get rewarded for your contributions and engagement on the platform.</p>
            </CardContent>
          </Card>
        </div>
      </section>















      {/* Discover Tabs Section */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="mr-2 h-4 w-4" />
            Discover Starkz
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="learn">Learn</TabsTrigger>
              <TabsTrigger value="creage">Create</TabsTrigger>
              <TabsTrigger value="explore">Earn</TabsTrigger>
            </TabsList>
            <TabsContent value="learn">
              <div className="space-y-4 mt-4">
                <Input placeholder="Learn about Starknet" />
                <Button className="w-full">Start</Button>
              </div>
            </TabsContent>
            <TabsContent value="create">
              <div className="space-y-4 mt-4">
                <Input placeholder="Create your content..." />
                <Button className="w-full">Publish</Button>
              </div>
            </TabsContent>
            <TabsContent value="explore">
              <div className="space-y-4 mt-4">
                <Input placeholder="Start earning" />
                <Button className="w-full">Discover</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>














      {/* Latest News Section */}
      <section className="py-8">
        <h2 className="text-2xl font-bold mb-4">Starkz Updates</h2>
        <div className="space-y-4">
          <Card className='glass-card'>
            <CardHeader>
              <CardTitle>New Tipping Feature</CardTitle>
              <CardDescription>2 days ago</CardDescription>
            </CardHeader>
            <CardContent>
              <p>We've introduced a new tipping feature using Starks tokens. Now you can easily reward your favorite content creators!</p>
            </CardContent>
          </Card>
          <Card className='glass-card'>
            <CardHeader>
              <CardTitle>Enhanced Search Functionality</CardTitle>
              <CardDescription>1 week ago</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our search engine has been upgraded to provide more accurate and relevant results. Finding the content you need is now easier than ever!</p>
            </CardContent>
          </Card>
        </div>
      </section>







      {/* Upcoming Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Upcoming Updates</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { id: 1, title: "New mint feature", date: "2025-01-15", type: "Feature" },
            { id: 2, title: "View page update", date: "2025-01-22", type: "Updates" },
            { id: 3, title: "Airdrop to users", date: "2026-01-01", type: "Airdrop" },
          ].map((event) => (
            <Card key={event.id} className="glass-card">
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <CardDescription>{new Date(event.date).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge>{event.type}</Badge>
              </CardContent>
              <CardContent>
                <Button variant="outline" className="w-full">Register</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>








           {/* Newsletter Signup Section */}
      <section className="bg-background/60 rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
        <p className="mb-4">Subscribe to our newsletter for the latest articles, events, and rewards.</p>
        <form className="flex gap-2">
          <Input type="email" placeholder="Enter your email" className="flex-grow" />
          <Button type="submit">Subscribe</Button>
        </form>
      </section>














    </div>
  )
}

