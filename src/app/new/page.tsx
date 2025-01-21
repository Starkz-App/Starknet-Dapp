'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { BookOpen, FolderPlus, Image } from 'lucide-react'

export default function NewContentPage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const contentTypes = [
    { id: 'publication', name: 'New Publication', icon: BookOpen, route: '/new/publication' },
    { id: 'collection', name: 'New Collection', icon: FolderPlus, route: '/new/collection' },
    { id: 'media', name: 'New Media', icon: Image, route: '/new/media' },
  ]

  const handleSelection = (type: string) => {
    setSelectedType(type)
  }

  const handleContinue = () => {
    if (selectedType) {
      const selectedRoute = contentTypes.find(type => type.id === selectedType)?.route
      if (selectedRoute) {
        router.push(selectedRoute)
      }
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Create New Content</h1>
      <Card className='bg-background/60'>
        <CardHeader>
          <CardTitle>Select Content Type</CardTitle>
          <CardDescription>Choose the type of content you want to create</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {contentTypes.map((type) => (
              <Button
                key={type.id}
                variant={selectedType === type.id ? "default" : "outline"}
                className="h-24 flex flex-col items-center justify-center"
                onClick={() => handleSelection(type.id)}
              >
                <type.icon className="h-8 w-8 mb-2" />
                {type.name}
              </Button>
            ))}
          </div>
          <Button
            className="w-full mt-6"
            disabled={!selectedType}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

