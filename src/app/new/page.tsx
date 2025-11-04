"use client"

import { Card } from "@/src/components/ui/card"
import { useRouter } from "next/navigation"
import { BookOpen, FolderPlus, ImageIcon, Sparkles } from "lucide-react"

export default function NewContentPage() {
  const router = useRouter()

  const contentTypes = [
    {
      id: "publication",
      name: "Publication",
      description: "Write and share articles",
      icon: BookOpen,
      route: "/new/publication",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "collection",
      name: "Collection",
      description: "Organize your content",
      icon: FolderPlus,
      route: "/collections/new",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "asset",
      name: "NFT Asset",
      description: "Mint programmable IP",
      icon: Sparkles,
      route: "/new/asset",
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: "media",
      name: "Media",
      description: "Upload images & files",
      icon: ImageIcon,
      route: "/new/media",
      gradient: "from-green-500 to-emerald-500",
    },
  ]

  return (
    <div className="min-h-screen pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto pt-8 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Create</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Choose what you want to create</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contentTypes.map((type) => (
            <Card
              key={type.id}
              className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border-2 hover:border-primary/50"
              onClick={() => router.push(type.route)}
            >
              <div className="p-6 space-y-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.gradient} flex items-center justify-center transition-transform group-hover:scale-110`}
                >
                  <type.icon className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">{type.name}</h3>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </div>
              </div>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
