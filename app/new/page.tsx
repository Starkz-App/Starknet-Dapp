"use client"
import { useRouter } from "next/navigation"
import { BookOpen, FolderPlus, ImageIcon, Sparkles } from "lucide-react"
import { useEffect } from "react"

export default function NewContentPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/new/publication")
  }, [router])

  const contentTypes = [
    {
      id: "publication",
      name: "Publication",
      description: "Write & share articles",
      icon: BookOpen,
      route: "/new/publication",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      emoji: "📝",
    },
    {
      id: "collection",
      name: "Collection",
      description: "Organize content",
      icon: FolderPlus,
      route: "/collections/new",
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      emoji: "📚",
    },
    {
      id: "asset",
      name: "NFT Asset",
      description: "Mint programmable IP",
      icon: Sparkles,
      route: "/new/asset",
      gradient: "from-orange-500 via-amber-500 to-yellow-500",
      emoji: "✨",
    },
    {
      id: "media",
      name: "Media",
      description: "Upload files",
      icon: ImageIcon,
      route: "/new/media",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      emoji: "🎨",
    },
  ]

  return null
}
