import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from "@/components/ui/use-toast"
import { Heart, ThumbsUp, Crown, Zap } from 'lucide-react'

interface ReactionSystemProps {
  publicationId: string;
  authorName: string;
}

const reactions = [
  { name: 'Like', icon: ThumbsUp, price: 1 },
  { name: 'Heart', icon: Heart, price: 2 },
  { name: 'Starkz', icon: Zap, price: 5 },
  { name: 'Crown', icon: Crown, price: 10 },
]

export function ReactionSystem({ publicationId, authorName }: ReactionSystemProps) {
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const { toast } = useToast()

  const handleReactionPurchase = () => {
    // In a real application, this would interact with a smart contract
    console.log(`Purchased ${quantity} ${selectedReaction} reaction(s) for publication ${publicationId}`)
    
    toast({
      title: "Reaction Purchased!",
      description: `You've gifted ${quantity} ${selectedReaction} reaction(s) to ${authorName}.`,
    })

    setSelectedReaction(null)
    setQuantity(1)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Gift a Reaction</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Gift a Reaction to {authorName}</DialogTitle>
          <DialogDescription>
            Choose a reaction to gift. This will use your Starkz credits.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            {reactions.map((reaction) => (
              <Button
                key={reaction.name}
                variant={selectedReaction === reaction.name ? "default" : "outline"}
                className="flex flex-col items-center p-4"
                onClick={() => setSelectedReaction(reaction.name)}
              >
                <reaction.icon className="mb-2 h-6 w-6" />
                <span>{reaction.name}</span>
                <span className="text-sm text-muted-foreground">{reaction.price} Starkz</span>
              </Button>
            ))}
          </div>
          {selectedReaction && (
            <div className="flex items-center gap-4">
              <Label htmlFor="quantity">Quantity:</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                min={1}
                max={100}
                className="w-20"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleReactionPurchase} disabled={!selectedReaction}>
            Purchase Reaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

