"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, PlusCircle, FileText, Users, Settings, Zap, Gift, Search, TrendingUp, Briefcase, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const navItems = [
  { icon: Home, href: '/', label: 'Dashboard' },
  { icon: PlusCircle, href: '/new', label: 'New' },
  { icon: Search, href: '/explore', label: 'Explore' },
  { icon: TrendingUp, href: '/popular', label: 'Popular' },
  { icon: Users, href: '/profile', label: 'Profile' },
  { icon: Gift, href: '/rewards', label: 'Rewards' },
  { icon: Settings, href: '/settings', label: 'Settings' },]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <TooltipProvider>
      <div className="glass-effect flex flex-col w-14 overflow-y-auto border-r-0">
        <div className="p-2 flex justify-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/">
                <Image
                          src="/Starkz-Symbol.svg"
                          alt="Starkz"
                          width={40}
                          height={40}
                        />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Home</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <nav className="flex-1 px-1 py-2 space-y-2">
          {navItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "w-full no-border",
                    pathname === item.href && "bg-muted"
                  )}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={10} className="bg-primary text-primary-foreground">
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </div>
    </TooltipProvider>
  )
}

