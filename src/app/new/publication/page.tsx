"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { authors, categoryNames, collections } from "@/src/lib/data"
import { useToast } from "@/src/components/ui/use-toast"
import { TagInput } from "@/src/components/TagInput"
import { FileUpload } from "@/src/components/FileUpload"
import { ArrowLeft, Sparkles, BookOpen, User, Tag, FolderOpen, ImageIcon, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

const DEFAULT_PUBLICATION = {
  title: "",
  author: authors[0]?.id || "",
  urlSlug: "",
  categories: ["Blockchain"],
  tags: ["starknet", "web3"],
  content: "",
  excerpt: "",
  collection: collections[0] || "",
  featuredMediaUrl: "",
  readTime: "5 min read",
}

export default function NewPublicationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [publication, setPublication] = useState(DEFAULT_PUBLICATION)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPublication((prev) => ({ ...prev, [name]: value }))

    if (name === "title") {
      setPublication((prev) => ({
        ...prev,
        urlSlug: value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      }))
    }

    if (name === "content") {
      const wordCount = value.trim().split(/\s+/).length
      const readTime = Math.max(1, Math.ceil(wordCount / 200))
      setPublication((prev) => ({ ...prev, readTime: `${readTime} min read` }))
    }
  }

  const handleFileSelect = (file: File) => {
    setFeaturedImage(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleClearImage = () => {
    setFeaturedImage(null)
    setImagePreview(null)
    setPublication((prev) => ({ ...prev, featuredMediaUrl: "" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast({
        title: "Publication Created!",
        description: "Your article has been successfully published to the community.",
      })
      router.push("/publications")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create publication. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-accent/5">
      <div className="max-w-4xl mx-auto pt-6 sm:pt-8 space-y-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Create Publication
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">
              Share your knowledge with the Starkz community
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="glass-card border-2 overflow-hidden">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="h-5 w-5 text-primary" />
                <Label className="text-base font-semibold">Featured Image</Label>
              </div>
              <FileUpload
                onFileSelect={handleFileSelect}
                accept="image/*"
                maxSize={5}
                preview={imagePreview}
                onClear={handleClearImage}
                label="Upload cover image"
                description="PNG, JPG or WebP (max 5MB)"
              />
            </CardContent>
          </Card>

          <Card className="glass-card border-2">
            <CardContent className="p-4 sm:p-6 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <Label htmlFor="title" className="text-sm font-semibold">
                    Title *
                  </Label>
                </div>
                <Input
                  id="title"
                  name="title"
                  value={publication.title}
                  onChange={handleInputChange}
                  placeholder="Enter a compelling title that captures attention..."
                  className="h-12 text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt" className="text-sm font-semibold">
                  Excerpt *
                </Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={publication.excerpt}
                  onChange={handleInputChange}
                  placeholder="Write a brief, engaging summary (2-3 sentences)..."
                  rows={3}
                  className="resize-none"
                  required
                />
                <p className="text-xs text-muted-foreground">{publication.excerpt.length}/300 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-sm font-semibold">
                  Content *
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  value={publication.content}
                  onChange={handleInputChange}
                  placeholder="Write your article content here. Share your insights, knowledge, and expertise..."
                  rows={16}
                  className="resize-y min-h-[300px] font-serif text-base leading-relaxed"
                  required
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{publication.content.trim().split(/\s+/).filter(Boolean).length} words</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{publication.readTime}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-2">
            <CardContent className="p-4 sm:p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    <Label htmlFor="author" className="text-sm font-semibold">
                      Author *
                    </Label>
                  </div>
                  <Select
                    value={publication.author}
                    onValueChange={(value) => setPublication((prev) => ({ ...prev, author: value }))}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {authors.map((author) => (
                        <SelectItem key={author.id} value={author.id}>
                          <div className="flex items-center gap-2">
                            <img src={author.avatar || "/placeholder.svg"} alt="" className="h-5 w-5 rounded-full" />
                            {author.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="h-4 w-4 text-primary" />
                    <Label htmlFor="collection" className="text-sm font-semibold">
                      Collection
                    </Label>
                  </div>
                  <Select
                    value={publication.collection}
                    onValueChange={(value) => setPublication((prev) => ({ ...prev, collection: value }))}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select collection" />
                    </SelectTrigger>
                    <SelectContent>
                      {collections.map((col) => (
                        <SelectItem key={col} value={col}>
                          {col}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-primary" />
                  <Label className="text-sm font-semibold">Categories *</Label>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categoryNames.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setPublication((prev) => ({
                          ...prev,
                          categories: prev.categories.includes(cat)
                            ? prev.categories.filter((c) => c !== cat)
                            : [...prev.categories, cat],
                        }))
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        publication.categories.includes(cat)
                          ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25"
                          : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Tags</Label>
                <TagInput
                  tags={publication.tags}
                  setTags={(newTags) => setPublication((prev) => ({ ...prev, tags: newTags }))}
                />
                <p className="text-xs text-muted-foreground">Add relevant tags to help others discover your content</p>
              </div>
            </CardContent>
          </Card>

          <div className="sticky bottom-20 sm:bottom-24 z-10">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25"
            >
              {isSubmitting ? (
                <>
                  <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Publish Publication
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
