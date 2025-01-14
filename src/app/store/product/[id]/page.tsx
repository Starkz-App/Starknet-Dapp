'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { products, CartItem } from '@/lib/store-mock-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { TipButton } from '@/components/TipButton'
import Image from 'next/image'
import Link from 'next/link'
import { useToast } from "@/components/ui/use-toast"
import PublicationActions from "@/components/PublicationActions";

export default function ProductPage() {
  const params = useParams()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)

  const product = products.find(p => p.id === params.id)

  if (!product) {
    return <div>Product not found</div>
  }

  const addToCart = () => {
    // In a real application, this would update a global cart state or send a request to an API
    const cartItem: CartItem = { ...product, quantity }
    console.log('Added to cart:', cartItem)
    toast({
      title: "Added to Cart",
      description: `${quantity} ${quantity > 1 ? 'items' : 'item'} of ${product.name} added to your cart.`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-auto object-cover rounded-md"
          />
          <div>
            <p className="text-lg mb-4">{product.description}</p>
            <p className="font-semibold text-xl mb-2">Price: {product.price} STRK</p>
            <p className="text-gray-600 mb-4">or {product.priceInStarks} Starks</p>
            <p className="text-gray-600 mb-4">By: {product.author}</p>
            <p className="text-gray-600 mb-4">Type: {product.type}</p>
            <div className="flex items-center gap-4 mb-4">
              <label htmlFor="quantity" className="font-medium">Quantity:</label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-20"
              />
            </div>
            <Button onClick={addToCart} className="w-full mb-4">Add to Cart</Button>
            <PublicationActions
              publicationId={product.id}
              authorName={product.author}
              authorAddress="0x1234...5678" // This should be replaced with the actual author's address
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/store">Back to Store</Link>
          </Button>
          <Button asChild>
            <Link href="/store/cart">View Cart</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

