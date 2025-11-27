"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { FileUpload } from "@/components/FileUpload"
import { ArrowLeft, Upload, ImageIcon, Video, Music, FileText } from "lucide-react"
import { useRouter } from "next/navigation"

const mediaTypes = [
  { id: "image", name: "Image", icon: ImageIcon, accept: "image/*" },
  { id: "video", name: "Video", icon: Video, accept: "video/*" },
  { id: "audio", name: "Audio", icon: Music, accept: "audio/*" },
  { id: "document", name: "Document", icon: FileText, accept: ".pdf,.doc,.docx" },
]

const DEFAULT_MEDIA = {
  title: "",
  description: "",
  mediaType: "image",
}

export default function NewMediaPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [media, setMedia] = useState(DEFAULT_MEDIA)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mediaFile, setMediaFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMedia({ ...media, [e.target.name]: e.target.value })
  }

  const handleFileSelect = (file: File) => {
    setMediaFile(file)
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  const handleClearFile = () => {
    setMediaFile(null)
    setPreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast({
        title: "Media Uploaded!",
        description: "Your media file has been successfully uploaded.",
      })
      router.push("/assets")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload media. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedType = mediaTypes.find((t) => t.id === media.mediaType)

  return (
    <div className="min-h-screen pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-accent/5">
      <div className="max-w-3xl mx-auto pt-6 sm:pt-8 space-y-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Upload Media
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Add images, videos, audio, or documents</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="glass-card border-2">
            <CardContent className="p-4 sm:p-6">
              <Label className="text-base font-semibold mb-4 block">Media Type *</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {mediaTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setMedia({ ...media, mediaType: type.id })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        media.mediaType === type.id
                          ? "border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/10"
                          : "border-border hover:border-primary/50 hover:bg-accent/5"
                      }`}
                    >
                      <Icon className="h-6 w-6 mb-2 mx-auto text-primary" />
                      <div className="text-xs font-semibold">{type.name}</div>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-2 overflow-hidden">
            <CardContent className="p-4 sm:p-6">
              <Label className="text-base font-semibold mb-4 block">Upload File *</Label>
              <FileUpload
                onFileSelect={handleFileSelect}
                accept={selectedType?.accept || "*"}
                maxSize={100}
                preview={preview}
                onClear={handleClearFile}
                label={`Upload ${selectedType?.name || "file"}`}
                description={`${selectedType?.accept || "Any file type"} (max 100MB)`}
              />
            </CardContent>
          </Card>

          <Card className="glass-card border-2">
            <CardContent className="p-4 sm:p-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-semibold">
                  Title *
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={media.title}
                  onChange={handleInputChange}
                  placeholder="Enter media title..."
                  className="h-12 text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-semibold">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={media.description}
                  onChange={handleInputChange}
                  placeholder="Describe your media file..."
                  rows={4}
                  className="resize-none"
                />
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
                  <Upload className="mr-2 h-5 w-5 animate-pulse" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Media
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
