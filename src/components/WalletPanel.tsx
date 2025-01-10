import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Zap, Wallet, User, Settings, LogOut, Gift, FileText } from 'lucide-react'

interface WalletPanelProps {
  isConnected: boolean
  onConnect: () => void
  onDisconnect: () => void
}

const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  walletAddress: '0x1234...5678',
  avatar: 'https://github.com/shadcn.png',
  rewards: {
    total: 1000,
    available: 750,
  }
}

const features = [
  { icon: Zap, title: 'Fast Transactions', description: 'Lightning-quick blockchain transactions' },
  { icon: Wallet, title: 'Secure Wallet', description: 'Your assets, protected by cutting-edge security' },
  { icon: User, title: 'User-Friendly', description: 'Intuitive interface for seamless experience' },
]

export function WalletPanel({ isConnected, onConnect, onDisconnect }: WalletPanelProps) {
  if (!isConnected) {
    return (
      <div className="space-y-4">
        <Button onClick={onConnect} className="w-full">Connect Wallet</Button>
        <p className="text-sm text-muted-foreground text-center">New to blockchain? <a href="#" className="text-primary">Learn more</a></p>
        <div className="grid gap-4 mt-6">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center gap-4">
                <feature.icon className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
          <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold">{mockUser.name}</h2>
          <p className="text-sm text-muted-foreground">{mockUser.walletAddress}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-bold">{mockUser.rewards.total}</p>
              <p className="text-sm text-muted-foreground">Total Rewards</p>
            </div>
            <div>
              <p className="text-2xl font-bold">{mockUser.rewards.available}</p>
              <p className="text-sm text-muted-foreground">Available to Claim</p>
            </div>
          </div>
          <Button className="w-full mt-4" asChild>
            <Link href="/rewards">View Rewards</Link>
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href="/profile">
            <User className="mr-2 h-4 w-4" /> Profile
          </Link>
        </Button>
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href="/transactions">
            <FileText className="mr-2 h-4 w-4" /> Transactions
          </Link>
        </Button>
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Link>
        </Button>
        <Button variant="outline" className="w-full justify-start text-destructive" onClick={onDisconnect}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>
    </div>
  )
}

