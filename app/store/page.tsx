"use client"

import { useState } from "react"
import { products, type Product, type CartItem } from "@/lib/store-mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { ShoppingCart, Search, Filter, ChevronDown, Grid, List, Package } from "lucide-react"
import Image from "next/image"
import { FeaturedCollections } from "@/components/FeaturedCollections"

const ProductCard = ({
  product,
  onAddToCart,
  viewMode,
}: { product: Product; onAddToCart: (product: Product) => void; viewMode: "grid" | "list" }) => (
  <Card
    className={`glass-card border-0 flex ${viewMode === "list" ? "flex-row" : "flex-col"} overflow-hidden group hover:shadow-xl transition-all duration-300`}
  >
    <div
      className={`relative ${viewMode === "list" ? "w-1/3" : "w-full"} ${viewMode === "list" ? "h-full min-h-[200px]" : "h-48"} overflow-hidden`}
    >
      <Image
        src={product.image || "/placeholder.svg"}
        alt={product.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute top-3 right-3">
        <Badge variant="secondary" className="backdrop-blur-sm bg-background/80">
          {product.type}
        </Badge>
      </div>
    </div>
    <div className={`flex flex-col ${viewMode === "list" ? "w-2/3" : "w-full"}`}>
      <CardHeader>
        <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">{product.name}</CardTitle>
        <CardDescription>By {product.author}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div>
          <span className="text-2xl font-bold">{product.price} ETH</span>
          <p className="text-xs text-muted-foreground">{product.priceInStarks} Starks</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/store/product/${product.id}`}>View</Link>
          </Button>
          <Button onClick={() => onAddToCart(product)} size="sm">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
      </CardFooter>
    </div>
  </Card>
)

export default function StorePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 100])
  const [cart, setCart] = useState<CartItem[]>([])
  const { toast } = useToast()
  const [visibleProducts, setVisibleProducts] = useState(8)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "All" || product.type === filterType) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1],
  )

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
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
    setVisibleProducts((prevVisible) => prevVisible + 8)
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="glass-card border-0 p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-blue-500/10">
        <h1 className="text-4xl font-bold mb-4 text-balance">Digital Asset Marketplace</h1>
        <p className="text-muted-foreground text-lg">Discover and purchase unique digital assets, courses, and NFTs</p>
      </div>

      {/* Featured Collections */}
      <FeaturedCollections />

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="w-full md:w-1/2 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 glass-input h-12"
          />
        </div>
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-12 bg-transparent">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 glass-card">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Product Type</h4>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="glass-input">
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
                  <h4 className="font-medium leading-none">Price Range (ETH)</h4>
                  <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="my-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{priceRange[0]} ETH</span>
                    <span>{priceRange[1]} ETH</span>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 bg-transparent"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          >
            {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
          </Button>
          <Button className="h-12" asChild>
            <Link href="/store/cart">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </Link>
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">{Math.min(visibleProducts, filteredProducts.length)}</span> of{" "}
          <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
        </p>
      </div>

      {/* Products Grid */}
      <div
        className={`grid gap-6 ${viewMode === "grid" ? "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
      >
        {filteredProducts.slice(0, visibleProducts).map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} viewMode={viewMode} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-16 glass-card border-0 rounded-3xl">
          <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
          <Button
            onClick={() => {
              setSearchTerm("")
              setFilterType("All")
              setPriceRange([0, 100])
            }}
          >
            Clear filters
          </Button>
        </div>
      )}

      {visibleProducts < filteredProducts.length && (
        <div className="flex justify-center">
          <Button onClick={loadMore} variant="outline" size="lg">
            Show More <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
