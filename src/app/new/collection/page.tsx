"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Switch } from "@/src/components/ui/switch"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/src/components/ui/drawer"

export default function NewCollectionPage() {
  const [collection, setCollection] = useState({
    name: "",
    description: "",
    visibility: "public",
    collaborative: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionResult, setSubmissionResult] = useState<{ success: boolean; message: string } | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [hasExistingCollections, setHasExistingCollections] = useState(true)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCollection({ ...collection, [e.target.name]: e.target.value })
  }

  const handleVisibilityChange = (value: string) => {
    setCollection({ ...collection, visibility: value })
  }

  const handleCollaborativeChange = (checked: boolean) => {
    setCollection({ ...collection, collaborative: checked })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulating a successful submission
      setSubmissionResult({
        success: true,
        message: "Your new collection has been successfully created.",
      })
      setHasExistingCollections(true)
    } catch (error) {
      console.error("Submission error:", error)
      setSubmissionResult({
        success: false,
        message: "Failed to create collection. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
      setIsDrawerOpen(true)
    }
  }

  return (
    <div className="space-y-6">
      {!hasExistingCollections && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>No Existing Collections</CardTitle>
            <CardDescription>You don't have any collections yet. Create your first collection now!</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setIsDrawerOpen(true)}>Create New Collection</Button>
          </CardContent>
        </Card>
      )}
      <h1 className="text-3xl font-bold tracking-tight">Create New Collection</h1>
      <Card>
        <CardHeader>
          <CardTitle>Collection Details</CardTitle>
          <CardDescription>Enter the details of your new collection</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={collection.name} onChange={handleInputChange} required />
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
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="collaborative"
                checked={collection.collaborative}
                onCheckedChange={handleCollaborativeChange}
              />
              <Label htmlFor="collaborative">Collaborative Collection</Label>
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Collection"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{submissionResult?.success ? "Success!" : "Error"}</DrawerTitle>
            <DrawerDescription>{submissionResult?.message}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <Button onClick={() => setIsDrawerOpen(false)}>Close</Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
