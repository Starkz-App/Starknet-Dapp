export interface User {
  id: string
  name: string
  email: string
  avatar: string
  walletAddress: string
  bio: string
  starkzBalance: number
  articlesPublished: number
  collectionsCreated: number
  totalEarnings: number
  joinedDate: string
  verified: boolean
  followers: number
  following: number
  badges: Badge[]
  socialLinks?: {
    twitter?: string
    github?: string
    linkedin?: string
    website?: string
  }
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedDate: string
}

export const mockUser: User = {
  id: "user-1",
  name: "Alex Thompson",
  email: "alex.thompson@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  walletAddress: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  bio: "Blockchain enthusiast, Web3 developer, and knowledge sharing advocate. Passionate about decentralized technologies and building the future of the internet.",
  starkzBalance: 12450,
  articlesPublished: 24,
  collectionsCreated: 5,
  totalEarnings: 45600,
  joinedDate: "2023-01-15",
  verified: true,
  followers: 1234,
  following: 567,
  badges: [
    {
      id: "badge-1",
      name: "Early Adopter",
      description: "Joined in the first month",
      icon: "🌟",
      earnedDate: "2023-01-15",
    },
    {
      id: "badge-2",
      name: "Prolific Writer",
      description: "Published 20+ articles",
      icon: "✍️",
      earnedDate: "2023-06-20",
    },
    {
      id: "badge-3",
      name: "Community Leader",
      description: "1000+ followers",
      icon: "👑",
      earnedDate: "2023-09-10",
    },
    {
      id: "badge-4",
      name: "Top Contributor",
      description: "Earned 10,000+ STZ",
      icon: "🏆",
      earnedDate: "2023-11-05",
    },
  ],
  socialLinks: {
    twitter: "https://twitter.com/alexthompson",
    github: "https://github.com/alexthompson",
    linkedin: "https://linkedin.com/in/alexthompson",
    website: "https://alexthompson.dev",
  },
}

export interface RewardActivity {
  id: string
  action: string
  points: number
  date: string
  description: string
}

export const rewardActivities: RewardActivity[] = [
  {
    id: "reward-1",
    action: "Article Published",
    points: 500,
    date: "2024-01-28",
    description: "Published 'Advanced Smart Contract Patterns'",
  },
  {
    id: "reward-2",
    action: "Comment Engagement",
    points: 50,
    date: "2024-01-27",
    description: "Received 10 upvotes on comments",
  },
  {
    id: "reward-3",
    action: "Collection Created",
    points: 200,
    date: "2024-01-25",
    description: "Created 'Web3 Development Guide' collection",
  },
  {
    id: "reward-4",
    action: "Referral Bonus",
    points: 300,
    date: "2024-01-23",
    description: "3 new users joined through your referral",
  },
  {
    id: "reward-5",
    action: "Article Featured",
    points: 150,
    date: "2024-01-20",
    description: "Article featured on homepage",
  },
  {
    id: "reward-6",
    action: "Daily Login Streak",
    points: 25,
    date: "2024-01-19",
    description: "7-day login streak bonus",
  },
]

export interface Leaderboard {
  rank: number
  user: {
    name: string
    avatar: string
  }
  points: number
  articlesPublished: number
}

export const leaderboardData: Leaderboard[] = [
  {
    rank: 1,
    user: {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    points: 15600,
    articlesPublished: 32,
  },
  {
    rank: 2,
    user: {
      name: "Marcus Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    },
    points: 14200,
    articlesPublished: 28,
  },
  {
    rank: 3,
    user: {
      name: "Alex Thompson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    points: 12450,
    articlesPublished: 24,
  },
  {
    rank: 4,
    user: {
      name: "Emily Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
    points: 11800,
    articlesPublished: 22,
  },
  {
    rank: 5,
    user: {
      name: "David Kim",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    points: 10500,
    articlesPublished: 19,
  },
]
