'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const { toast } = useToast()
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    bio: 'Blockchain enthusiast and IP innovator',
    avatar: 'https://github.com/shadcn.png',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the updated user data to your backend
    console.log('Updated user:', user)
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Your Information</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button>Change Avatar</Button>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={user.bio}
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
      
    </div>
  )
}

