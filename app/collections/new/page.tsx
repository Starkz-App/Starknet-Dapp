"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { FileUpload } from "@/components/FileUpload"
import { TagInput } from "@/components/TagInput"
import { ArrowLeft, FolderPlus, Lock, Globe, ImageIcon } from "lucide-react"
import { useRouter } from "next/navigation"

const DEFAULT_COLLECTION = {
  title: "",
  description: "",
  visibility: "public",
  tags: ["blockchain", "web3"],
  coverImage: "",
}

export default function NewCollectionPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [collection, setCollection] = useState(DEFAULT_COLLECTION)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCollection({ ...collection, [e.target.name]: e.target.value })
  }

  const handleFileSelect = (file: File) => {
    setCoverImage(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleClearImage = () => {
    setCoverImage(null)
    setImagePreview(null)
    setCollection((prev) => ({ ...prev, coverImage: "" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast({
        title: "Collection Created!",
        description: "Your collection is ready to organize your publications.",
      })
      router.push("/collections")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create collection. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen pb-32 px-4">
      <div className="max-w-3xl mx-auto pt-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">New Collection</h1>
            <p className="text-sm text-muted-foreground">Organize your content in one place</p>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="glass-card border-2 p-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  <Label className="text-base font-semibold">Cover Image</Label>
                </div>
                <FileUpload
                  onFileSelect={handleFileSelect}
                  accept="image/*"
                  maxSize={5}
                  preview={imagePreview}
                  onClear={handleClearImage}
                  label=""
                  description="Choose a cover that represents your collection"
                />
              </div>

              <div>
                <Label htmlFor="title" className="text-base font-semibold">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={collection.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Web3 Development Essentials"
                  className="h-12 text-lg mt-2 border-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-base font-semibold">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={collection.description}
                  onChange={handleInputChange}
                  placeholder="What is this collection about?"
                  rows={4}
                  className="mt-2 border-2 resize-none"
                  required
                />
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Visibility</Label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setCollection({ ...collection, visibility: "public" })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      collection.visibility === "public"
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Globe className="h-6 w-6 mb-2 mx-auto text-primary" />
                    <div className="font-semibold">Public</div>
                    <div className="text-xs text-muted-foreground mt-1">Anyone can view</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCollection({ ...collection, visibility: "private" })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      collection.visibility === "private"
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Lock className="h-6 w-6 mb-2 mx-auto text-primary" />
                    <div className="font-semibold">Private</div>
                    <div className="text-xs text-muted-foreground mt-1">Only you</div>
                  </button>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Tags</Label>
                <div className="mt-2">
                  <TagInput
                    tags={collection.tags}
                    setTags={(newTags) => setCollection((prev) => ({ ...prev, tags: newTags }))}
                  />
                </div>
              </div>
            </Card>
          </motion.div>

          <div className="sticky bottom-20 sm:bottom-24 z-10">
            <Button
              type="submit"
              disabled={isSubmitting || !collection.title || !collection.description}
              className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 shadow-xl shadow-primary/25 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <FolderPlus className="mr-2 h-5 w-5 animate-pulse" />
                  Creating...
                </>
              ) : (
                <>
                  <FolderPlus className="mr-2 h-5 w-5" />
                  Create Collection
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
