'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import SponsorDrawer from './sponsor-drawer'

export default function SponsorShowcase() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src="/placeholder.svg?height=50&width=50"
              alt="Sponsor logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <h3 className="font-semibold text-lg">Our Sponsor</h3>
              <p className="text-sm text-muted-foreground">Supporting great content</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => setIsDrawerOpen(true)}>
            Learn More
          </Button>
        </div>
      </CardContent>
      <SponsorDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
    </Card>
  )
}

