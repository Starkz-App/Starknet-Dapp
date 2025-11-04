"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  PlusCircle,
  Search,
  ShoppingBag,
  Bell,
  LogIn,
  User,
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Menu,
  X,
  Gem,
  Stars,
  Coins,
} from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { ThemeToggle } from "./ThemeToggle"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/src/components/ui/sheet"
import { Badge } from "@/src/components/ui/badge"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { AuthPanel } from "./AuthPanel"
import { mockNotifications, type Notification } from "@/src/lib/mockNotifications"
import { cn } from "@/src/lib/utils"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const mainNavItems = [
  { icon: Stars, href: "/", label: "Starkz" },
  { icon: Search, href: "/explore", label: "Explore" },
  { icon: PlusCircle, href: "/new", label: "Create" },
  { icon: Coins, href: "/rewards", label: "Rewards" },
]

const moreNavItems = [
  { icon: Stars, href: "/", label: "Dashboard" },
  { icon: PlusCircle, href: "/new", label: "New" },
  { icon: Search, href: "/explore", label: "Explore" },
  { icon: Coins, href: "/rewards", label: "Rewards" },
]

export function FloatingNavbar() {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [moreMenuOpen, setMoreMenuOpen] = useState(false)

  const handleLogin = () => setIsLoggedIn(true)
  const handleLogout = () => setIsLoggedIn(false)

  const unreadNotifications = notifications.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  return (
    <>
      {/* Desktop Floating Navbar */}
      <nav className="hidden md:block fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="glass-navbar flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl">
          {/* Main Navigation */}
          <div className="flex items-center gap-1">
            {mainNavItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "rounded-full hover:bg-white/20 dark:hover:bg-black/20 transition-all",
                    pathname === item.href && "bg-white/30 dark:bg-black/30",
                  )}
                  title={item.label}
                >
                  <item.icon className="h-5 w-5" />
                </Button>
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-border/50 mx-1" />

          {/* Actions */}
          <div className="flex items-center gap-1">
            

            {/* Login/User */}
            <SignedOut>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-white/20 dark:hover:bg-black/20"
                  title={isLoggedIn ? "Account" : "Login"}
                >
                  {isLoggedIn ? <User className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
               
                <div className="mt-6">
                  <AuthPanel isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
                </div>
              </SheetContent>
            </Sheet>
            </SignedOut>

            <SignedIn>
              <UserButton />
            </SignedIn>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* More Menu */}
            <Sheet open={moreMenuOpen} onOpenChange={setMoreMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-white/20 dark:hover:bg-black/20"
                  title="More"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-auto rounded-t-3xl">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                  <SheetDescription>Quick access to all sections</SheetDescription>
                </SheetHeader>
                <div className="grid grid-cols-3 gap-4 mt-6 pb-6">
                  {moreNavItems.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setMoreMenuOpen(false)}>
                      <div
                        className={cn(
                          "flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-accent transition-colors",
                          pathname === item.href && "bg-accent",
                        )}
                      >
                        <item.icon className="h-6 w-6" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navbar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 pb-safe">
        <div className="glass-navbar-mobile border-t border-border/50 px-2 py-3">
          <div className="flex items-center justify-around max-w-lg mx-auto">
            {mainNavItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "rounded-full hover:bg-white/20 dark:hover:bg-black/20 transition-all",
                    pathname === item.href && "bg-white/30 dark:bg-black/30",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                </Button>
              </Link>
            ))}

            

            {/* More Menu for Mobile */}
            <Sheet open={moreMenuOpen} onOpenChange={setMoreMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/20 dark:hover:bg-black/20">
                  {moreMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-auto rounded-t-3xl">
                <SheetHeader>
                  <SheetTitle>More Options</SheetTitle>
                </SheetHeader>
                <div className="grid grid-cols-3 gap-4 mt-6 pb-6">
                  {/* Notifications */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <div className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-accent transition-colors cursor-pointer relative">
                        <Bell className="h-6 w-6" />
                        <span className="text-sm font-medium">Notifications</span>
                        {unreadNotifications > 0 && (
                          <Badge className="absolute top-2 right-2 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                            {unreadNotifications}
                          </Badge>
                        )}
                      </div>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Notifications</SheetTitle>
                        <SheetDescription>You have {unreadNotifications} unread notifications</SheetDescription>
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
                              {!notification.read && <Badge variant="secondary">New</Badge>}
                            </div>
                          </div>
                        ))}
                      </ScrollArea>
                    </SheetContent>
                  </Sheet>

                  {/* Login/Account */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <div className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-accent transition-colors cursor-pointer">
                        {isLoggedIn ? <User className="h-6 w-6" /> : <LogIn className="h-6 w-6" />}
                        <span className="text-sm font-medium">{isLoggedIn ? "Account" : "Login"}</span>
                      </div>
                    </SheetTrigger>
                    <SheetContent className="overflow-y-auto">
                      
                      <div className="mt-6">
                        <AuthPanel isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} />
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Theme */}
                  <div className="flex flex-col items-center gap-2 p-4 rounded-xl">
                    <ThemeToggle />
                    <span className="text-sm font-medium">Theme</span>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  )
}
