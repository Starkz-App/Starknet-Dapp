import React from 'react'
import { Search, LayoutDashboard, Bell, Wallet, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './ThemeToggle'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { mockNotifications } from '@/lib/mockNotifications'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { WalletPanel } from './WalletPanel'

// Mock user data
const mockUser = {
  name: 'Your Name',
  email: 'name@example.com',
  walletAddress: '0x1234...5678',
}

export function BottomNav() {
  const [isConnected, setIsConnected] = React.useState(false)
  const [notifications, setNotifications] = React.useState(mockNotifications)

  const unreadNotifications = notifications.filter(n => !n.read).length

  const handleConnect = () => {
    setIsConnected(true)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  return (
    <nav className="glass-effect fixed bottom-0 left-0 right-0 p-2 flex justify-around lg:hidden bg-background/10 backdrop-blur-lg">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="glass-button no-border">
            <Search className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Search</SheetTitle>
            <SheetDescription>
              Search for listings, users, or categories
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <Input type="search" placeholder="Search..." className="w-full" />
          </div>
        </SheetContent>
      </Sheet>

      <Button variant="ghost" size="icon" className="glass-button no-border">
        <LayoutDashboard className="h-6 w-6" />
      </Button>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="glass-button no-border relative">
            <Bell className="h-6 w-6" />
            {unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Notifications</SheetTitle>
            <SheetDescription>
              You have {unreadNotifications} unread notifications
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-10rem)] mt-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="mb-4 p-4 rounded-lg bg-background/50">
                <div className="flex items-start">
                  <div className="ml-2 flex-1">
                    <h3 className="text-sm font-medium">{notification.title}</h3>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                  </div>
                  {!notification.read && (
                    <Badge variant="secondary">New</Badge>
                  )}
                </div>
              </div>
            ))}
          </ScrollArea>
        </SheetContent>
      </Sheet>

      <ThemeToggle />

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="glass-button no-border">
            {isConnected ? <User className="h-6 w-6" /> : <Wallet className="h-6 w-6" />}
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>{isConnected ? 'Wallet Connected' : 'Connect Wallet'}</SheetTitle>
            <SheetDescription>
              {isConnected ? 'Manage your wallet and account' : 'Connect your blockchain wallet to access features'}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4">
            <WalletPanel
              isConnected={isConnected}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
            />
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  )
}

<style jsx>{`
  @media (max-width: 1024px) {
    nav {
      background-color: rgba(var(--background), 0.3);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
  }
`}</style>
