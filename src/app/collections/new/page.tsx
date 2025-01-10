'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useToast } from "@/components/ui/use-toast"
import { BookOpen, Users, Lock } from 'lucide-react'

export default function NewCollectionPage() {
  const { toast } = useToast()
  const [collection, setCollection] = useState({
    title: '',
    description: '',
    visibility: 'public',
    collaborative: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCollection({ ...collection, [e.target.name]: e.target.value })
  }

  const handleVisibilityChange = (value: string) => {
    setCollection({ ...collection, visibility: value })
  }

  const handleCollaborativeChange = (checked: boolean) => {
    setCollection({ ...collection, collaborative: checked })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('New collection:', collection)
    toast({
      title: "Collection Created",
      description: "Your new collection has been successfully created.",
    })
    // Reset form or redirect to the new collection page
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Create New Collection</h1>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Collection Details</CardTitle>
          <CardDescription>Create a new collection to organize your knowledge</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={collection.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={collection.description}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visibility">Visibility</Label>
              <Select value={collection.visibility} onValueChange={handleVisibilityChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">
                    <div className="flex items-center">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Public
                    </div>
                  </SelectItem>
                  <SelectItem value="private">
                    <div className="flex items-center">
                      <Lock className="mr-2 h-4 w-4" />
                      Private
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="collaborative"
                checked={collection.collaborative}
                onCheckedChange={handleCollaborativeChange}
              />
              <Label htmlFor="collaborative" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Collaborative Collection
              </Label>
            </div>
            <Button type="submit" className="w-full">Create Collection</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

