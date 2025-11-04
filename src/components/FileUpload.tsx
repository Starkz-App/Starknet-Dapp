"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, X, ImageIcon, FileText, Film, Music } from "lucide-react"
import { Button } from "@/src/components/ui/button"

interface FileUploadProps {
  onFileSelect: (file: File) => void
  accept?: string
  maxSize?: number // in MB
  preview?: string | null
  onClear?: () => void
  label?: string
  description?: string
}

export function FileUpload({
  onFileSelect,
  accept = "image/*",
  maxSize = 10,
  preview,
  onClear,
  label = "Upload File",
  description = "Drag and drop or click to browse",
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true)
    } else if (e.type === "dragleave") {
      setIsDragging(false)
    }
  }, [])

  const validateFile = (file: File): boolean => {
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`)
      return false
    }
    setError(null)
    return true
  }

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)

      const files = e.dataTransfer.files
      if (files && files[0]) {
        if (validateFile(files[0])) {
          onFileSelect(files[0])
        }
      }
    },
    [onFileSelect, maxSize],
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      if (validateFile(files[0])) {
        onFileSelect(files[0])
      }
    }
  }

  const getFileIcon = () => {
    if (accept.includes("image")) return <ImageIcon className="h-12 w-12" />
    if (accept.includes("video")) return <Film className="h-12 w-12" />
    if (accept.includes("audio")) return <Music className="h-12 w-12" />
    return <FileText className="h-12 w-12" />
  }

  return (
    <div className="space-y-2">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl transition-all ${
          isDragging
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border hover:border-primary/50 hover:bg-accent/5"
        } ${preview ? "p-4" : "p-8"}`}
      >
        <input
          type="file"
          onChange={handleChange}
          accept={accept}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />

        {preview ? (
          <div className="relative group">
            <img src={preview || "/placeholder.svg"} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
            {onClear && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation()
                  onClear()
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ) : (
          <div className="text-center pointer-events-none">
            <div className="mx-auto mb-4 text-muted-foreground">{getFileIcon()}</div>
            <div className="text-sm font-medium mb-1">{label}</div>
            <div className="text-xs text-muted-foreground mb-3">{description}</div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-xs font-medium">
              <Upload className="h-3 w-3" />
              Choose File
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  )
}
