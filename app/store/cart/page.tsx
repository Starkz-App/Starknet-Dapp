'use client'

import { useState } from 'react'
import { CartItem } from '@/lib/store-mock-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"

// Mock cart data (in a real app, this would come from a global state or API)
const initialCart: CartItem[] = [
  {
    id: '1',
    name: 'Cosmic Voyage NFT',
    description: 'A unique digital artwork exploring the wonders of space.',
    price: 0.5,
    priceInStarks: 500,
    image: '/placeholder.svg?height=100&width=100',
    author: 'Stella Nova',
    type: 'NFT',
    quantity: 1,
  },
  {
    id: '2',
    name: 'Advanced Machine Learning Techniques',
    description: 'Comprehensive eBook on cutting-edge ML algorithms.',
    price: 0.1,
    priceInStarks: 100,
    image: '/placeholder.svg?height=100&width=100',
    author: 'Dr. Alan Turing',
    type: 'eBook',
    quantity: 2,
  },
]

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>(initialCart)
  const { toast } = useToast()

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id))
    toast({
      title: "Item Removed",
      description: "The item has been removed from your cart.",
    })
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalStarks = cart.reduce((sum, item) => sum + item.priceInStarks * item.quantity, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">Your cart is empty.</p>
            <Button asChild className="mt-4 w-full">
              <Link href="/store">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Cart Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4 py-2 border-b">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">By: {item.author}</p>
                    <p className="text-sm text-gray-600">Type: {item.type}</p>
                    <p className="font-medium">{item.price} ETH</p>
                    <p className="text-sm text-gray-600">{item.priceInStarks} Starks</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-16 text-center"
                    />
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{total.toFixed(3)} ETH</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal (Starks):</span>
                  <span>{totalStarks} Starks</span>
                </div>
                <div className="flex justify-between">
                  <span>Fees:</span>
                  <span>0.001 ETH</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>{(total + 0.001).toFixed(3)} ETH</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Total (Starks):</span>
                  <span>{totalStarks + 1} Starks</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/store/checkout">Proceed to Checkout</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
      <div className="mt-8">
        <Button variant="outline" asChild>
          <Link href="/store">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  )
}
