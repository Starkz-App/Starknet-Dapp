'use client'

import { useState } from 'react'
import { products, Product, CartItem } from '@/lib/store-mock-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { useToast } from "@/components/ui/use-toast"
import { motion } from 'framer-motion'
import { ShoppingCart, Search, Filter, ChevronDown, Star, Grid, List } from 'lucide-react'
import Image from 'next/image'
import { FeaturedCollections } from '@/components/FeaturedCollections'

const ProductCard = ({ product, onAddToCart, viewMode }: { product: Product; onAddToCart: (product: Product) => void; viewMode: 'grid' | 'list' }) => (
  <Card className={`flex ${viewMode === 'list' ? 'flex-row' : 'flex-col'} h-full overflow-hidden transition-shadow hover:shadow-lg`}>
    <div className={`relative ${viewMode === 'list' ? 'w-1/3' : 'w-full'} ${viewMode === 'list' ? 'h-full' : 'h-48'}`}>
      <Image
        src={product.image}
        alt={product.name}
        layout="fill"
        objectFit="cover"
        className="rounded-t-lg"
      />
    </div>
    <div className={`flex flex-col ${viewMode === 'list' ? 'w-2/3' : 'w-full'}`}>
      <CardHeader>
        <CardTitle className="line-clamp-1">{product.name}</CardTitle>
        <CardDescription>By {product.author}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center mb-2">
          <Star className="h-4 w-4 text-yellow-400 mr-1" />
          <span className="text-sm">{(Math.random() * 2 + 3).toFixed(1)} ({Math.floor(Math.random() * 100 + 50)})</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
        <Badge variant="secondary" className="mb-2">{product.type}</Badge>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div>
          <span className="text-lg font-bold">{product.price} STRK</span>
          <p className="text-sm text-muted-foreground">{product.priceInStarks} Starks</p>
        </div>
        <Button onClick={() => onAddToCart(product)}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </div>
  </Card>
)

export default function StorePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 100])
  const [cart, setCart] = useState<CartItem[]>([])
  const { toast } = useToast()
  const [visibleProducts, setVisibleProducts] = useState(8)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === 'All' || product.type === filterType) &&
    product.price >= priceRange[0] && product.price <= priceRange[1]
  )

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const loadMore = () => {
    setVisibleProducts(prevVisible => prevVisible + 8)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Digital Asset Marketplace
      </motion.h1>
      
      {/* Featured Collections */}
      <FeaturedCollections />

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/3 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Product Type</h4>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Types</SelectItem>
                      <SelectItem value="NFT">NFTs</SelectItem>
                      <SelectItem value="eBook">eBooks</SelectItem>
                      <SelectItem value="Course">Courses</SelectItem>
                      <SelectItem value="Software">Software</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Price Range (STRK)</h4>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{priceRange[0]} STRK</span>
                    <span>{priceRange[1]} STRK</span>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="icon" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </Button>
          <Button asChild>
            <Link href="/store/cart">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </Link>
          </Button>
        </div>
      </div>
      <motion.div 
        className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {filteredProducts.slice(0, visibleProducts).map(product => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductCard product={product} onAddToCart={addToCart} viewMode={viewMode} />
          </motion.div>
        ))}
      </motion.div>
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No products found. Try adjusting your search or filters.</p>
      )}
      {visibleProducts < filteredProducts.length && (
        <div className="flex justify-center mt-8">
          <Button onClick={loadMore} variant="outline">
            Show More <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

