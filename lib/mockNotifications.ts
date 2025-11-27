export interface Notification {
  id: number
  title: string
  description: string
  time: string
  read: boolean
  type: "info" | "success" | "warning" | "error"
}

export const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "New Publication",
    description: 'Sarah Chen published "Understanding Zero-Knowledge Proofs in StarkNet"',
    time: "2 minutes ago",
    read: false,
    type: "info",
  },
  {
    id: 2,
    title: "Starkz Earned",
    description: "You earned 150 STZ from your article engagement this week!",
    time: "1 hour ago",
    read: false,
    type: "success",
  },
  {
    id: 3,
    title: "Comment on Your Article",
    description: 'Alex Rivera commented on "Blockchain Fundamentals for Developers"',
    time: "3 hours ago",
    read: false,
    type: "info",
  },
  {
    id: 4,
    title: "Your Article is Trending",
    description: 'Your article "StarkNet Deep Dive" is now trending with 500+ views!',
    time: "5 hours ago",
    read: true,
    type: "success",
  },
  {
    id: 5,
    title: "New Follower",
    description: "David Kim started following you. Check out their profile!",
    time: "8 hours ago",
    read: true,
    type: "info",
  },
  {
    id: 6,
    title: "Weekly Rewards",
    description: "You're in the top 10 contributors this week! Keep it up to earn bonus Starkz.",
    time: "1 day ago",
    read: true,
    type: "success",
  },
  {
    id: 7,
    title: "Collection Updated",
    description: 'Your collection "Web Development Essentials" reached 1000 saves!',
    time: "2 days ago",
    read: true,
    type: "success",
  },
  {
    id: 8,
    title: "Platform Update",
    description: "New features added: Enhanced markdown editor and real-time collaboration!",
    time: "3 days ago",
    read: true,
    type: "info",
  },
]
