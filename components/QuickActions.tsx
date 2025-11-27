"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PenSquare, Rocket, BookOpen, ShoppingCart, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

const quickActions = [
  {
    icon: PenSquare,
    label: "Write Article",
    description: "Share your knowledge",
    href: "/new/publication",
    color: "from-purple-500 to-blue-500",
  },
  {
    icon: Rocket,
    label: "Create NFT",
    description: "Mint digital asset",
    href: "/new/asset",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: BookOpen,
    label: "Browse Library",
    description: "Discover content",
    href: "/explore",
    color: "from-green-500 to-teal-500",
  },
  {
    icon: ShoppingCart,
    label: "Visit Store",
    description: "Shop digital goods",
    href: "/store",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Users,
    label: "Join Community",
    description: "Connect with others",
    href: "/profile",
    color: "from-pink-500 to-purple-500",
  },
  {
    icon: TrendingUp,
    label: "View Analytics",
    description: "Track your growth",
    href: "/rewards",
    color: "from-yellow-500 to-orange-500",
  },
]

export function QuickActions() {
  return (
    <Card className="glass-card border-0 p-6">
      <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {quickActions.map((action, index) => (
          <Link key={action.label} href={action.href}>
            <Button
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 group hover-glow animate-scale-in touch-card bg-transparent"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${action.color} opacity-10 group-hover:opacity-20 transition-opacity`}
              >
                <action.icon className="h-6 w-6 text-foreground" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-sm">{action.label}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </Button>
          </Link>
        ))}
      </div>
    </Card>
  )
}
