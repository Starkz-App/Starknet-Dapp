"use client"

import React, { useState } from 'react'
import { Bell, Search, Wallet, User, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from './ThemeToggle'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { mockNotifications, Notification } from '@/lib/mockNotifications'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { WalletPanel } from './WalletPanel'

// Mock user data
const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  walletAddress: '0x1234...5678',
}

export function Header() {
  const [isConnected, setIsConnected] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  const handleConnect = () => {
    // Simulating wallet connection
    setIsConnected(true)
  }

  const handleDisconnect = () => {
    // Simulating wallet disconnection
    setIsConnected(false)
  }

  const unreadNotifications = notifications.filter(n => !n.read).length

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  return (
    <TooltipProvider>
      <header className="glass-effect fixed bottom-0 left-0 right-0 z-10 hidden lg:flex items-center justify-between p-4 bg-background/10 backdrop-blur-lg">
        <div className="flex items-center w-full max-w-md">
          <Input
            type="text"
            placeholder="Search..."
            className="glass-input mr-2 flex-grow no-border"
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="glass-button no-border">
                <Search className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Search</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex items-center space-x-4">
          <Sheet>
            <Tooltip>
              <TooltipTrigger asChild>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="glass-button no-border relative">
                    <Bell className="h-4 w-4" />
                    {unreadNotifications > 0 && (
                      <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                    )}
                  </Button>
                </SheetTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
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
                      {getNotificationIcon(notification.type)}
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
          <Sheet>
            <Tooltip>
              <TooltipTrigger asChild>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="glass-button no-border">
                    {isConnected ? <User className="h-4 w-4" /> : <Wallet className="h-4 w-4" />}
                  </Button>
                </SheetTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isConnected ? 'User Account' : 'Connect Wallet'}</p>
              </TooltipContent>
            </Tooltip>
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
          <ThemeToggle />
        </div>
      </header>
    </TooltipProvider>
  )
}

