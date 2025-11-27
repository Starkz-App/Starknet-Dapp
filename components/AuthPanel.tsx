"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, Mail, Chrome, LogOut, UserIcon, Settings, BookMarked, Award } from "lucide-react"
import Link from "next/link"

interface AuthPanelProps {
  isLoggedIn: boolean
  onLogin: () => void
  onLogout: () => void
}

export function AuthPanel({ isLoggedIn, onLogin, onLogout }: AuthPanelProps) {
  const [isSignUp, setIsSignUp] = useState(false)

  if (isLoggedIn) {
    // Logged in view
    return (
      <div className="space-y-6">
        {/* User Profile */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-border/50">
          <Avatar className="h-16 w-16 ring-2 ring-purple-500/50">
            <AvatarImage src="/placeholder.svg?height=64&width=64" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">John Doe</h3>
            <p className="text-sm text-muted-foreground">john.doe@example.com</p>
            <div className="flex items-center gap-2 mt-1">
              <Award className="h-4 w-4 text-yellow-500" />
              <span className="text-xs font-medium">1,250 STARKZ</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <Link href="/profile">
            <Button variant="ghost" className="w-full justify-start" size="lg">
              <UserIcon className="h-5 w-5 mr-3" />
              View Profile
            </Button>
          </Link>
          <Link href="/collections">
            <Button variant="ghost" className="w-full justify-start" size="lg">
              <BookMarked className="h-5 w-5 mr-3" />
              My Collections
            </Button>
          </Link>
          <Link href="/settings">
            <Button variant="ghost" className="w-full justify-start" size="lg">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Button>
          </Link>
        </div>

        <Separator />

        {/* Logout Button */}
        <Button variant="destructive" className="w-full" size="lg" onClick={onLogout}>
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      </div>
    )
  }

  // Login/Sign Up view
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold">{isSignUp ? "Create Account" : "Welcome Back"}</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {isSignUp ? "Join Starkz Knowledge Hub today" : "Sign in to your account"}
        </p>
      </div>

      {/* Social Login Buttons */}
      <div className="space-y-3">
        <Button variant="outline" className="w-full h-12 text-base bg-transparent" onClick={onLogin}>
          <Chrome className="h-5 w-5 mr-2" />
          Continue with Google
        </Button>
        <Button variant="outline" className="w-full h-12 text-base bg-transparent" onClick={onLogin}>
          <Github className="h-5 w-5 mr-2" />
          Continue with GitHub
        </Button>
        <Button variant="outline" className="w-full h-12 text-base bg-transparent" onClick={onLogin}>
          <Mail className="h-5 w-5 mr-2" />
          Continue with Email
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      {/* Email/Password Form */}
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          onLogin()
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" required />
        </div>
        {isSignUp && (
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="confirm-password" type="password" placeholder="••••••••" required />
          </div>
        )}
        <Button
          type="submit"
          className="w-full h-12 text-base bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
      </form>

      {/* Toggle Sign Up/Sign In */}
      <div className="text-center text-sm">
        <span className="text-muted-foreground">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
        </span>{" "}
        <Button variant="link" className="p-0 h-auto font-semibold" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "Sign In" : "Sign Up"}
        </Button>
      </div>

      {/* Terms */}
      <p className="text-xs text-center text-muted-foreground">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-foreground">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline hover:text-foreground">
          Privacy Policy
        </Link>
      </p>
    </div>
  )
}
