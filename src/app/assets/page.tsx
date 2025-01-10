'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { products, Product } from '@/lib/store-mock-data'
import Image from 'next/image'
import Link from 'next/link'

const AssetCard = ({ asset }: { asset: Product }) => (
  <Card>
    <CardHeader>
      <div className="relative h-48 w-full">
        <Image
          src={asset.image}
          alt={asset.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
    </CardHeader>
    <CardContent>
      <CardTitle className="mb-2">{asset.name}</CardTitle>
      <CardDescription>{asset.description}</CardDescription>
    </CardContent>
    <CardFooter>
      <Button asChild>
        <Link href={`/assets/${asset.id}`}>View Details</Link>
      </Button>
    </CardFooter>
  </Card>
)

export default function AssetsPage() {
  const [ownedAssets] = useState(products.slice(0, 3)) // Mock owned assets
  const [createdAssets] = useState(products.slice(3, 6)) // Mock created assets

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Assets</h1>
      <Tabs defaultValue="owned">
        <TabsList className="mb-4">
          <TabsTrigger value="owned">Owned Assets</TabsTrigger>
          <TabsTrigger value="created">Created Assets</TabsTrigger>
        </TabsList>
        <TabsContent value="owned">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ownedAssets.map(asset =>
              <AssetCard key={asset.id} asset={asset} />
            )}
          </div>
        </TabsContent>
        <TabsContent value="created">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {createdAssets.map(asset =>
              <AssetCard key={asset.id} asset={asset} />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

