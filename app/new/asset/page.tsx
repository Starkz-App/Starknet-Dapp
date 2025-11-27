"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { TagInput } from "@/components/TagInput"
import { FileUpload } from "@/components/FileUpload"
import { ArrowLeft, Sparkles, ImageIcon, Music, Video, FileText, Box } from "lucide-react"
import { useRouter } from "next/navigation"

const assetTypes = [
  { id: "1", name: "Digital Art", icon: ImageIcon, accept: "image/*" },
  { id: "2", name: "Music", icon: Music, accept: "audio/*" },
  { id: "3", name: "Video", icon: Video, accept: "video/*" },
  { id: "4", name: "Document", icon: FileText, accept: ".pdf,.doc,.docx" },
  { id: "5", name: "3D Model", icon: Box, accept: ".glb,.gltf,.obj" },
]

const licenses = [
  { id: "1", name: "All Rights Reserved" },
  { id: "2", name: "Creative Commons CC0" },
  { id: "3", name: "Creative Commons BY" },
  { id: "4", name: "MIT License" },
]

const DEFAULT_ASSET = {
  title: "",
  description: "",
  assetType: "1",
  tags: ["nft", "starknet"],
  license: "1",
  isLimited: true,
  totalSupply: 100,
  royaltyPercentage: 10,
  ipVersion: "1.0",
}

export default function NewAssetPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [asset, setAsset] = useState(DEFAULT_ASSET)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [assetFile, setAssetFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAsset((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileSelect = (file: File) => {
    setAssetFile(file)
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFilePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setFilePreview(null)
    }
  }

  const handleClearFile = () => {
    setAssetFile(null)
    setFilePreview(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast({
        title: "NFT Minted Successfully!",
        description: "Your programmable IP asset has been created on Starknet.",
      })
      router.push("/assets")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mint NFT. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedType = assetTypes.find((t) => t.id === asset.assetType)

  return (
    <div className="min-h-screen pb-32 px-4">
      <div className="max-w-3xl mx-auto pt-6 space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Mint NFT Asset</h1>
            <p className="text-sm text-muted-foreground">Create programmable IP on Starknet</p>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="glass-card border-2 p-6 space-y-6">
              <div>
                <Label className="text-base font-semibold mb-3 block">Asset Type</Label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {assetTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setAsset({ ...asset, assetType: type.id })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          asset.assetType === type.id
                            ? "border-primary bg-primary/10 shadow-lg"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <Icon className="h-6 w-6 mb-2 mx-auto text-primary" />
                        <div className="text-xs font-semibold">{type.name}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  <Label className="text-base font-semibold">Upload File</Label>
                </div>
                <FileUpload
                  onFileSelect={handleFileSelect}
                  accept={selectedType?.accept || "*"}
                  maxSize={50}
                  preview={filePreview}
                  onClear={handleClearFile}
                  label=""
                  description={`${selectedType?.name || "File"} (max 50MB)`}
                />
              </div>

              <div>
                <Label htmlFor="title" className="text-base font-semibold">
                  Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={asset.title}
                  onChange={handleInputChange}
                  placeholder="Give your NFT a unique name..."
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
                  value={asset.description}
                  onChange={handleInputChange}
                  placeholder="Tell the story behind your asset..."
                  rows={4}
                  className="mt-2 border-2 resize-none"
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="license" className="text-sm font-medium">
                    License
                  </Label>
                  <Select value={asset.license} onValueChange={(value) => setAsset({ ...asset, license: value })}>
                    <SelectTrigger className="mt-2 h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {licenses.map((license) => (
                        <SelectItem key={license.id} value={license.id}>
                          {license.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="ipVersion" className="text-sm font-medium">
                    IP Version
                  </Label>
                  <Input
                    id="ipVersion"
                    name="ipVersion"
                    value={asset.ipVersion}
                    onChange={handleInputChange}
                    placeholder="e.g., 1.0"
                    className="mt-2 h-11"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Tags</Label>
                <div className="mt-2">
                  <TagInput tags={asset.tags} setTags={(newTags) => setAsset((prev) => ({ ...prev, tags: newTags }))} />
                </div>
              </div>

              {asset.isLimited && (
                <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-xl border-2 bg-accent/5">
                  <div>
                    <Label htmlFor="totalSupply" className="text-sm font-medium">
                      Total Supply
                    </Label>
                    <Input
                      id="totalSupply"
                      name="totalSupply"
                      type="number"
                      min="1"
                      value={asset.totalSupply}
                      onChange={handleInputChange}
                      className="mt-2 h-11"
                    />
                  </div>
                  <div>
                    <Label htmlFor="royaltyPercentage" className="text-sm font-medium">
                      Royalty %
                    </Label>
                    <Input
                      id="royaltyPercentage"
                      name="royaltyPercentage"
                      type="number"
                      min="0"
                      max="50"
                      value={asset.royaltyPercentage}
                      onChange={handleInputChange}
                      className="mt-2 h-11"
                    />
                  </div>
                </div>
              )}
            </Card>
          </motion.div>

          <div className="sticky bottom-20 sm:bottom-24 z-10">
            <Button
              type="submit"
              disabled={isSubmitting || !asset.title || !asset.description}
              className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-primary/80 shadow-xl shadow-primary/25 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                  Minting NFT...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Mint NFT Asset
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
