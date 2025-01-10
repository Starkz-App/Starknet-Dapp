'use client'

import { useState } from 'react'
import { CartItem, mockUser } from '@/lib/store-mock-data'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useToast } from "@/components/ui/use-toast"
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

// Mock cart data (in a real app, this would come from a global state or API)
const mockCart: CartItem[] = [
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

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('eth')
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const total = mockCart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalStarks = mockCart.reduce((sum, item) => sum + item.priceInStarks * item.quantity, 0)

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsProcessing(false)
    toast({
      title: "Order Placed",
      description: `Your order has been successfully placed and paid with ${paymentMethod.toUpperCase()}. Thank you for your purchase!`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Billing Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCheckout} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue={mockUser.name.split(' ')[0]} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue={mockUser.name.split(' ')[1]} required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={mockUser.email} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="walletAddress">Wallet Address</Label>
                <Input id="walletAddress" defaultValue={mockUser.walletAddress} required />
              </div>
              <div className="space-y-2">
                <Label>Payment Method</Label>
                <RadioGroup defaultValue="eth" onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="eth" id="eth" />
                    <Label htmlFor="eth">Ethereum (ETH)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="starks" id="starks" />
                    <Label htmlFor="starks">Starks Tokens</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button type="submit" className="w-full" disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing
                  </>
                ) : (
                  'Place Order'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockCart.map(item => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>
                  {paymentMethod === 'eth'
                    ? `${(item.price * item.quantity).toFixed(3)} ETH`
                    : `${item.priceInStarks * item.quantity} Starks`
                  }
                </span>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>
                  {paymentMethod === 'eth'
                    ? `${total.toFixed(3)} ETH`
                    : `${totalStarks} Starks`
                  }
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" asChild className="w-full">
              <Link href="/store/cart">Back to Cart</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

