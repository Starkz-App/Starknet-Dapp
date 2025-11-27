"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { BookOpen, Lock, Plus, Search, Sparkles, Tag, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { mockCollections } from "@/lib/collections-mock-data"
import { motion } from "framer-motion"

const COLLECTIONS_PER_PAGE = 9

export default function CollectionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  const allTags = Array.from(new Set(mockCollections.flatMap((c) => c.tags)))

  const filteredCollections = mockCollections.filter((collection) => {
    const matchesSearch =
      collection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collection.curator.name.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTag = !selectedTag || collection.tags.includes(selectedTag)

    return matchesSearch && matchesTag
  })

  const totalPages = Math.ceil(filteredCollections.length / COLLECTIONS_PER_PAGE)
  const paginatedCollections = filteredCollections.slice(
    (currentPage - 1) * COLLECTIONS_PER_PAGE,
    currentPage * COLLECTIONS_PER_PAGE,
  )

  return (
    <div className="space-y-6 pb-24 px-4 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-8 space-y-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
        >
          <BookOpen className="h-4 w-4" />
          {mockCollections.length} Collections
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
        >
          Knowledge Collections
        </motion.h1>
        <Button asChild size="lg" className="mt-4">
          <Link href="/collections/new">
            <Plus className="mr-2 h-5 w-5" /> Create Collection
          </Link>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search collections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11 glass-input"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedTag === null ? "default" : "outline"}
            size="sm"
            onClick={() => {
              setSelectedTag(null)
              setCurrentPage(1)
            }}
          >
            All
          </Button>
          {allTags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedTag(tag)
                setCurrentPage(1)
              }}
            >
              <Tag className="mr-1 h-3 w-3" />
              {tag}
            </Button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          Showing {paginatedCollections.length} of {filteredCollections.length} collections
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedCollections.map((collection, index) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={`/collections/${collection.id}`}>
              <Card className="glass-card overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group h-full">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={collection.coverImage || "/placeholder.svg"}
                    alt={collection.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge
                      variant={collection.visibility === "public" ? "default" : "secondary"}
                      className="backdrop-blur-sm"
                    >
                      {collection.visibility === "public" ? (
                        <BookOpen className="mr-1 h-3 w-3" />
                      ) : (
                        <Lock className="mr-1 h-3 w-3" />
                      )}
                      {collection.visibility}
                    </Badge>
                  </div>

                  <div className="absolute bottom-3 right-3 flex items-center gap-2 text-white text-sm font-medium">
                    <div className="flex items-center gap-1 backdrop-blur-sm bg-black/30 px-2 py-1 rounded-full">
                      <Sparkles className="h-4 w-4 text-yellow-400" />
                      <span>{collection.starkz}</span>
                    </div>
                  </div>
                </div>

                <CardHeader className="space-y-3">
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {collection.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">{collection.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={collection.curator.avatar || "/placeholder.svg"}
                        alt={collection.curator.name}
                      />
                      <AvatarFallback>{collection.curator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{collection.curator.name}</p>
                      <p className="text-xs text-muted-foreground truncate">@{collection.curator.username}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <p className="text-sm text-muted-foreground">{collection.articlesCount} publications</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="h-9 w-9"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentPage(pageNum)}
                  className="h-9 w-9"
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="h-9 w-9"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {filteredCollections.length === 0 && (
        <Card className="glass-card p-12">
          <div className="text-center space-y-3">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
            <h3 className="text-lg font-semibold">No collections found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </div>
        </Card>
      )}
    </div>
  )
}
