import { Product } from '@/src/lib/store-mock-data'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/src/components/ui/card'
import { Button } from '@/src/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="w-full h-48 object-cover rounded-md"
        />
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
        <p className="font-semibold">Price: {product.price} ETH</p>
        <p className="text-sm text-gray-600">By: {product.author}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" asChild>
          <Link href={`/store/product/${product.id}`}>View Details</Link>
        </Button>
        <Button onClick={() => onAddToCart(product)}>Add to Cart</Button>
      </CardFooter>
    </Card>
  )
}
