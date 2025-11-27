"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { products, type CartItem } from "@/lib/store-mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { ShoppingCart, ArrowLeft, Package, Shield, Zap, Star } from "lucide-react"

export default function ProductPage() {
  const params = useParams()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)

  const product = products.find((p) => p.id === params.id)

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Package className="h-16 w-16 text-muted-foreground" />
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Button asChild>
          <Link href="/store">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Store
          </Link>
        </Button>
      </div>
    )
  }

  const addToCart = () => {
    const cartItem: CartItem = { ...product, quantity }
    console.log("Added to cart:", cartItem)
    toast({
      title: "Added to Cart",
      description: `${quantity} ${quantity > 1 ? "items" : "item"} of ${product.name} added to your cart.`,
    })
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/store" className="hover:text-foreground transition-colors">
          Store
        </Link>
        <span>/</span>
        <Link href="/store" className="hover:text-foreground transition-colors">
          {product.type}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="glass-card border-0 rounded-3xl overflow-hidden p-8">
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-4">
              {product.type}
            </Badge>
            <h1 className="text-4xl font-bold mb-4 text-balance">{product.name}</h1>

            {/* Author Info */}
            <div className="flex items-center gap-3 mb-6">
              <Avatar className="h-12 w-12">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${product.author}`} />
                <AvatarFallback>{product.author[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Created by</p>
                <p className="text-sm text-muted-foreground">{product.author}</p>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          <Separator />

          {/* Pricing */}
          <div className="glass-card border-0 p-6 rounded-2xl space-y-4">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold">{product.price} ETH</span>
              <span className="text-muted-foreground">or {product.priceInStarks} Starks</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <label htmlFor="quantity" className="font-medium">
                Quantity:
              </label>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  -
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="w-20 text-center"
                />
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  +
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={addToCart} size="lg" className="flex-1">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/store/cart">View Cart</Link>
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="glass-card border-0 text-center p-4">
              <Shield className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <p className="text-sm font-medium">Secure</p>
              <p className="text-xs text-muted-foreground">Blockchain verified</p>
            </Card>
            <Card className="glass-card border-0 text-center p-4">
              <Zap className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
              <p className="text-sm font-medium">Instant</p>
              <p className="text-xs text-muted-foreground">Immediate access</p>
            </Card>
            <Card className="glass-card border-0 text-center p-4">
              <Star className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <p className="text-sm font-medium">Quality</p>
              <p className="text-xs text-muted-foreground">Verified content</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <Card className="glass-card border-0 rounded-3xl">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">What's Included</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Full access to {product.type.toLowerCase()} content
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Lifetime updates and support
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Certificate of authenticity
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  Commercial usage rights
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Specifications</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex justify-between">
                  <span>Type:</span>
                  <span className="font-medium text-foreground">{product.type}</span>
                </li>
                <li className="flex justify-between">
                  <span>Creator:</span>
                  <span className="font-medium text-foreground">{product.author}</span>
                </li>
                <li className="flex justify-between">
                  <span>Format:</span>
                  <span className="font-medium text-foreground">Digital</span>
                </li>
                <li className="flex justify-between">
                  <span>Blockchain:</span>
                  <span className="font-medium text-foreground">Starknet</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Back Button */}
      <div className="flex justify-center">
        <Button variant="outline" size="lg" asChild>
          <Link href="/store">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Store
          </Link>
        </Button>
      </div>
    </div>
  )
}
