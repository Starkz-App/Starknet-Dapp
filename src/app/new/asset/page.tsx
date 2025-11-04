"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Textarea } from "@/src/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Switch } from "@/src/components/ui/switch"
import { useToast } from "@/src/components/ui/use-toast"
import { TagInput } from "@/src/components/TagInput"
import { FileUpload } from "@/src/components/FileUpload"
import { ArrowLeft, Sparkles, ImageIcon, Music, Video, FileText, Box, Shield } from "lucide-react"
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
    <div className="min-h-screen pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-background to-accent/5">
      <div className="max-w-4xl mx-auto pt-6 sm:pt-8 space-y-6">
        <div className="flex items-center gap-3 sm:gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="shrink-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Mint NFT Asset
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Create programmable IP on Starknet</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="glass-card border-2">
            <CardContent className="p-4 sm:p-6">
              <Label className="text-base font-semibold mb-4 block">Asset Type *</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {assetTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setAsset({ ...asset, assetType: type.id })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        asset.assetType === type.id
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
              <Label className="text-base font-semibold mb-4 block">Upload Asset File *</Label>
              <FileUpload
                onFileSelect={handleFileSelect}
                accept={selectedType?.accept || "*"}
                maxSize={50}
                preview={filePreview}
                onClear={handleClearFile}
                label={`Upload ${selectedType?.name || "file"}`}
                description={`${selectedType?.accept || "Any file type"} (max 50MB)`}
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
                  value={asset.title}
                  onChange={handleInputChange}
                  placeholder="Enter a unique title for your NFT..."
                  className="h-12 text-base"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-semibold">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={asset.description}
                  onChange={handleInputChange}
                  placeholder="Describe your asset, its story, and what makes it unique..."
                  rows={5}
                  className="resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <Label htmlFor="license" className="text-sm font-semibold">
                      License *
                    </Label>
                  </div>
                  <Select value={asset.license} onValueChange={(value) => setAsset({ ...asset, license: value })}>
                    <SelectTrigger className="h-11">
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

                <div className="space-y-2">
                  <Label htmlFor="ipVersion" className="text-sm font-semibold">
                    IP Version *
                  </Label>
                  <Input
                    id="ipVersion"
                    name="ipVersion"
                    value={asset.ipVersion}
                    onChange={handleInputChange}
                    placeholder="e.g., 1.0"
                    className="h-11"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Tags</Label>
                <TagInput tags={asset.tags} setTags={(newTags) => setAsset((prev) => ({ ...prev, tags: newTags }))} />
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-2">
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl border-2 bg-gradient-to-r from-accent/5 to-transparent">
                <div>
                  <div className="text-sm font-semibold">Limited Edition</div>
                  <div className="text-xs text-muted-foreground">Set a maximum supply for scarcity</div>
                </div>
                <Switch
                  id="isLimited"
                  checked={asset.isLimited}
                  onCheckedChange={(checked) => setAsset((prev) => ({ ...prev, isLimited: checked }))}
                />
              </div>

              {asset.isLimited && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalSupply" className="text-sm font-semibold">
                      Total Supply
                    </Label>
                    <Input
                      id="totalSupply"
                      name="totalSupply"
                      type="number"
                      min="1"
                      value={asset.totalSupply}
                      onChange={handleInputChange}
                      className="h-11"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="royaltyPercentage" className="text-sm font-semibold">
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
                      className="h-11"
                      required
                    />
                  </div>
                </div>
              )}
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
