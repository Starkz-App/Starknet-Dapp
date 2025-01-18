'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight, TrendingUp, Users, DollarSign, BookOpen, Award, ThumbsUp, MessageSquare, Eye, Tag, Bookmark, Gift, ShoppingCart, PlusCircle, ChevronRight, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import Image from 'next/image'

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