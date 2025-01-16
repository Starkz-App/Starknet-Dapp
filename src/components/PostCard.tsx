import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ThumbsUp, Eye, Clock } from 'lucide-react'
import Link from 'next/link'
import { IPListing } from '@/lib/mockData'

interface PostCardProps {
  post: IPListing;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center space-x-2 mb-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <Link href={`/authors/${post.author.id}`} className="text-sm font-medium hover:underline">
            {post.author.name}
          </Link>
        </div>
        <CardTitle className="line-clamp-1">{post.title}</CardTitle>
        <CardDescription>{new Date(post.date).toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.description}</p>
        <div className="flex justify-between items-center mb-4">
          <Badge>{post.type}</Badge>
          <span className="font-bold">${post.price.toLocaleString()}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <Badge key={tag} variant="secondary">
              <Link href={`/tags/${encodeURIComponent(tag)}`}>
                {tag}
              </Link>
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span className="flex items-center">
            <ThumbsUp className="mr-1 h-4 w-4" /> {post.likes}
          </span>
          <span className="flex items-center">
            <Eye className="mr-1 h-4 w-4" /> {post.views}
          </span>
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/publications/${post.id}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

