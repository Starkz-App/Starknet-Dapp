import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: number;
}

const featuredCollections: Collection[] = [
  {
    id: '1',
    name: 'Cosmic Voyagers',
    description: 'Explore the wonders of space through digital art',
    image: '/placeholder.svg?height=200&width=200',
    itemCount: 10,
  },
  {
    id: '2',
    name: 'Tech Innovators',
    description: 'Cutting-edge software and digital tools',
    image: '/placeholder.svg?height=200&width=200',
    itemCount: 15,
  },
  {
    id: '3',
    name: 'Knowledge Hub',
    description: 'Curated collection of educational eBooks and courses',
    image: '/placeholder.svg?height=200&width=200',
    itemCount: 20,
  },
]

export function FeaturedCollections() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-6 text-center">Featured Collections</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredCollections.map((collection) => (
          <Card key={collection.id} className="flex flex-col">
            <CardHeader>
              <div className="relative h-48 w-full mb-4">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <CardTitle>{collection.name}</CardTitle>
              <CardDescription>{collection.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {collection.itemCount} items in this collection
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/store/collections/${collection.id}`}>
                  View Collection
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}
