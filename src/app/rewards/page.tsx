'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Gift, Zap, Trophy, ChevronRight, BookOpen, Award, ThumbsUp } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

export default function RewardsPage() {
  const { toast } = useToast()
  const [claimingRewards, setClaimingRewards] = useState(false)

  const handleClaimRewards = () => {
    setClaimingRewards(true)
    setTimeout(() => {
      setClaimingRewards(false)
      toast({
        title: "Rewards Claimed!",
        description: "Your rewards have been successfully added to your account.",
      })
    }, 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Knowledge Sharing Rewards</h1>
      <p className="text-lg text-muted-foreground">
        Earn rewards for your valuable contributions to our knowledge-sharing community.
      </p>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Rewards</CardTitle>
              <CardDescription>Your current reward balance and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">1,250 <span className="text-xl text-muted-foreground">STZ</span></div>
              <Progress value={65} className="mt-2" />
              <p className="text-sm text-muted-foreground mt-2">65% to next level</p>
              <Button className="mt-4" onClick={handleClaimRewards} disabled={claimingRewards}>
                {claimingRewards ? "Claiming..." : "Claim Rewards"}
              </Button>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Article Contributions
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">350 STZ</div>
                <p className="text-xs text-muted-foreground">
                  Earned from your articles
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Engagement
                </CardTitle>
                <ThumbsUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">280 STZ</div>
                <p className="text-xs text-muted-foreground">
                  Earned from likes and comments
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Community Building
                </CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">620 STZ</div>
                <p className="text-xs text-muted-foreground">
                  Earned from referrals and collaborations
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Reward History</CardTitle>
              <CardDescription>Your recent reward activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'Article Published', points: 100, date: '2025-01-15' },
                  { action: 'Comment Upvotes', points: 25, date: '2025-01-14' },
                  { action: 'Referral Bonus', points: 200, date: '2025-01-12' },
                  { action: 'Article Featured', points: 50, date: '2025-01-10' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.action}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                    <div className="font-bold">+{item.points} STZ</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="leaderboard">
          <Card>
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
              <CardDescription>Top contributors this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Alice', points: 2500, rank: 1 },
                  { name: 'Bob', points: 2350, rank: 2 },
                  { name: 'Charlie', points: 2200, rank: 3 },
                  { name: 'David', points: 2100, rank: 4 },
                  { name: 'Eve', points: 2000, rank: 5 },
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="font-bold w-6">{user.rank}</div>
                      <div>{user.name}</div>
                    </div>
                    <div className="font-bold">{user.points} STZ</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="mr-2 h-4 w-4" />
            How to Earn More Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Maximize your rewards by actively participating in our knowledge-sharing community.
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Write and publish high-quality articles</li>
            <li>Engage with other users' content through likes and comments</li>
            <li>Refer new users to join our platform</li>
            <li>Collaborate on projects and share your expertise</li>
            <li>Participate in community challenges and events</li>
          </ul>
          <Button className="w-full mt-4">
            Start Contributing
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

