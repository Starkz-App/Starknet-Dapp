"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { categoryNames } from "@/lib/data"
import { useToast } from "@/components/ui/use-toast"
import {
  ArrowLeft,
  Sparkles,
  ImageIcon,
  Upload,
  X,
  Plus,
  CheckCircle2,
  Smile,
  Type,
  ImageIcon as ImageIconAlt,
  FileText,
  Video,
  Mic,
  StickyNote,
  Calendar,
  Film,
  User,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function NewPublicationPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [publication, setPublication] = useState({
    title: "",
    author: "",
    authorAddress: "",
    excerpt: "",
    content: "",
    postType: "publication",
    categories: [] as string[],
    tags: [] as string[],
    featuredMediaUrl: "",
    licenseType: "all-rights-reserved",
    commercialUse: false,
    modifications: false,
    requireAttribution: true,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [showCategories, setShowCategories] = useState(true)
  const [showTags, setShowTags] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [showLicense, setShowLicense] = useState(false)
  const [titleFocused, setTitleFocused] = useState(false)
  const [contentFocused, setContentFocused] = useState(false)

  const postTypes = [
    { value: "publication", label: "Publication", icon: FileText },
    { value: "video", label: "Video", icon: Video },
    { value: "short", label: "Short", icon: Film },
    { value: "podcast", label: "Podcast", icon: Mic },
    { value: "notes", label: "Notes", icon: StickyNote },
    { value: "event", label: "Event", icon: Calendar },
    { value: "media", label: "Media", icon: ImageIcon },
  ]

  const licenseTypes = [
    { value: "all-rights-reserved", label: "All Rights Reserved" },
    { value: "cc-by", label: "Creative Commons BY" },
    { value: "cc-by-sa", label: "Creative Commons BY-SA" },
    { value: "cc-by-nd", label: "Creative Commons BY-ND" },
    { value: "cc-by-nc", label: "Creative Commons BY-NC" },
    { value: "public-domain", label: "Public Domain" },
  ]

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (publication.title || publication.content) {
        setLastSaved(new Date())
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [publication.title, publication.content, publication.excerpt])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPublication((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setPublication((prev) => ({ ...prev, featuredMediaUrl: reader.result as string }))
      }
      reader.readAsDataURL(file)
      setShowImageUpload(false)
    }
  }

  const handleCategoryToggle = (category: string) => {
    setPublication((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }))
  }

  const handleAddTag = (tag: string) => {
    if (!publication.tags.includes(tag)) {
      setPublication((prev) => ({ ...prev, tags: [...prev.tags, tag] }))
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setPublication((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast({
        title: "Published Successfully!",
        description: "Your knowledge is now shared with the community.",
      })
      router.push("/publications")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish. Try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const wordCount = publication.content.split(/\s+/).filter(Boolean).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))
  const canPublish = publication.title && publication.content && publication.author && wordCount >= 50

  const suggestedTopics = [
    "StarkNet",
    "Zero-Knowledge",
    "Cairo",
    "zkSTARKs",
    "Layer2",
    "DeFi",
    "Smart Contracts",
    "Blockchain",
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="shrink-0 hover:bg-accent">
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex items-center gap-4">
            {/* Auto-save indicator */}
            <AnimatePresence mode="wait">
              {lastSaved && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-xs text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="hidden sm:inline">Saved</span>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              onClick={handleSubmit}
              disabled={!canPublish || isSubmitting}
              size="default"
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 font-semibold shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <Upload className="h-4 w-4 mr-2 animate-bounce" />
                  Publishing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Publish
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-32">
        <form onSubmit={handleSubmit} className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <ImageIconAlt className="h-4 w-4" />
                Cover Image
              </h3>
              {imagePreview && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setImagePreview(null)
                    setPublication((prev) => ({ ...prev, featuredMediaUrl: "" }))
                  }}
                  className="text-destructive hover:text-destructive/80"
                >
                  <X className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              )}
            </div>

            <AnimatePresence mode="wait">
              {imagePreview ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative rounded-2xl overflow-hidden group shadow-lg"
                >
                  <img
                    src={imagePreview || "/placeholder.svg"}
                    alt="Cover"
                    className="w-full h-72 sm:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ) : (
                <motion.label
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="block w-full h-72 sm:h-96 border-2 border-dashed border-border/50 rounded-2xl cursor-pointer hover:border-primary/50 hover:bg-accent/5 transition-all relative overflow-hidden group"
                >
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ImageIcon className="h-10 w-10 text-primary" />
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-base font-semibold text-foreground">Upload Cover Image</p>
                      <p className="text-sm text-muted-foreground">
                        Drag and drop or click to browse
                        <br />
                        <span className="text-xs">Recommended: 1200x630px</span>
                      </p>
                    </div>
                  </div>
                </motion.label>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Title Input */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <textarea
              name="title"
              value={publication.title}
              onChange={handleInputChange}
              onFocus={() => setTitleFocused(true)}
              onBlur={() => setTitleFocused(false)}
              placeholder="Title"
              rows={1}
              className="w-full text-4xl sm:text-5xl lg:text-6xl font-bold bg-transparent border-none outline-none resize-none placeholder:text-muted-foreground/30 focus:placeholder:text-muted-foreground/50 transition-all leading-tight"
              style={{
                height: "auto",
                minHeight: "1.2em",
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement
                target.style.height = "auto"
                target.style.height = target.scrollHeight + "px"
              }}
              required
              autoFocus
            />
          </motion.div>

          {/* Excerpt */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <textarea
              name="excerpt"
              value={publication.excerpt}
              onChange={handleInputChange}
              placeholder="Write a subtitle or summary..."
              rows={2}
              className="w-full text-lg sm:text-xl text-muted-foreground bg-transparent border-none outline-none resize-none placeholder:text-muted-foreground/30 leading-relaxed"
              style={{
                height: "auto",
                minHeight: "2.4em",
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement
                target.style.height = "auto"
                target.style.height = target.scrollHeight + "px"
              }}
            />
          </motion.div>

          {/* Content Editor */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="relative">
              <textarea
                name="content"
                value={publication.content}
                onChange={handleInputChange}
                onFocus={() => setContentFocused(true)}
                onBlur={() => setContentFocused(false)}
                placeholder="Tell your story... Share insights about AI, Zero-Knowledge, StarkNet, or blockchain technology."
                rows={20}
                className="w-full text-lg leading-relaxed bg-transparent border-none outline-none resize-none placeholder:text-muted-foreground/30 font-serif min-h-[400px]"
                required
              />
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-4">
                <span className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {wordCount} words
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  {readTime} min read
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">Post Type</h3>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {postTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setPublication((prev) => ({ ...prev, postType: type.value }))}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                        publication.postType === type.value
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                          : "bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {type.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <User className="h-4 w-4" />
                Author
              </h3>
              <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-xl border border-border/50">
                <input
                  type="text"
                  name="author"
                  value={publication.author}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-muted-foreground/50 font-medium"
                  required
                />
                <span className="text-xs text-muted-foreground hidden sm:block shrink-0 px-2 py-1 bg-background/50 rounded">
                  + wallet
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setShowCategories(!showCategories)}
                className="flex items-center justify-between w-full text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Categories
                  {publication.categories.length > 0 && (
                    <span className="px-2 py-0.5 bg-primary/20 text-primary rounded-full text-xs font-bold">
                      {publication.categories.length}
                    </span>
                  )}
                </span>
                {showCategories ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              <AnimatePresence>
                {showCategories && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2 p-4 bg-secondary/20 rounded-xl border border-border/50">
                      {categoryNames.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => handleCategoryToggle(cat)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            publication.categories.includes(cat)
                              ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                              : "bg-background/50 hover:bg-background text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setShowTags(!showTags)}
                className="flex items-center justify-between w-full text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Smile className="h-4 w-4" />
                  Tags
                  {publication.tags.length > 0 && (
                    <span className="px-2 py-0.5 bg-primary/20 text-primary rounded-full text-xs font-bold">
                      {publication.tags.length}
                    </span>
                  )}
                </span>
                {showTags ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              <AnimatePresence>
                {showTags && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden space-y-4"
                  >
                    <div className="p-4 bg-secondary/20 rounded-xl border border-border/50 space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-3">Suggested Topics</p>
                        <div className="flex flex-wrap gap-2">
                          {suggestedTopics
                            .filter((topic) => !publication.tags.includes(topic.toLowerCase()))
                            .map((topic) => (
                              <button
                                key={topic}
                                type="button"
                                onClick={() => handleAddTag(topic.toLowerCase())}
                                className="px-3 py-2 bg-background/50 hover:bg-background rounded-lg text-sm transition-colors flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
                              >
                                <Plus className="h-3.5 w-3.5" />
                                {topic}
                              </button>
                            ))}
                        </div>
                      </div>

                      {publication.tags.length > 0 && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-3">Your Tags</p>
                          <div className="flex flex-wrap gap-2">
                            {publication.tags.map((tag) => (
                              <motion.div
                                key={tag}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                              >
                                #{tag}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveTag(tag)}
                                  className="hover:text-destructive transition-colors"
                                >
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setShowLicense(!showLicense)}
                className="flex items-center justify-between w-full text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  License & Rights
                </span>
                {showLicense ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              <AnimatePresence>
                {showLicense && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-6 p-4 bg-secondary/20 rounded-xl border border-border/50">
                      {/* License Type */}
                      <div>
                        <p className="text-xs font-medium text-muted-foreground mb-2">License Type</p>
                        <select
                          value={publication.licenseType}
                          onChange={(e) => setPublication((prev) => ({ ...prev, licenseType: e.target.value }))}
                          className="w-full px-4 py-3 bg-background border border-border/50 rounded-lg text-sm outline-none focus:border-primary transition-colors"
                        >
                          {licenseTypes.map((license) => (
                            <option key={license.value} value={license.value}>
                              {license.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Rights Options */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium">Commercial Use</p>
                            <p className="text-xs text-muted-foreground">Allow commercial usage of this work</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setPublication((prev) => ({ ...prev, commercialUse: !prev.commercialUse }))}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              publication.commercialUse ? "bg-primary" : "bg-border"
                            }`}
                          >
                            <div
                              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                publication.commercialUse ? "translate-x-6" : ""
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium">Modifications</p>
                            <p className="text-xs text-muted-foreground">Allow others to modify this work</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setPublication((prev) => ({ ...prev, modifications: !prev.modifications }))}
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              publication.modifications ? "bg-primary" : "bg-border"
                            }`}
                          >
                            <div
                              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                publication.modifications ? "translate-x-6" : ""
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium">Require Attribution</p>
                            <p className="text-xs text-muted-foreground">Users must credit you when using</p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setPublication((prev) => ({ ...prev, requireAttribution: !prev.requireAttribution }))
                            }
                            className={`relative w-12 h-6 rounded-full transition-colors ${
                              publication.requireAttribution ? "bg-primary" : "bg-border"
                            }`}
                          >
                            <div
                              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                publication.requireAttribution ? "translate-x-6" : ""
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </form>
      </main>

      {/* Fixed Mobile Publish Button */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center px-4 sm:hidden z-40">
        <Button
          onClick={handleSubmit}
          disabled={!canPublish || isSubmitting}
          size="lg"
          className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 font-semibold shadow-2xl w-full max-w-md"
        >
          {isSubmitting ? (
            <>
              <Upload className="h-5 w-5 mr-2 animate-bounce" />
              Publishing...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5 mr-2" />
              Publish to Starkz
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
