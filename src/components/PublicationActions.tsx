"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog"
import { Label } from "@/src/components/ui/label"
import { useToast } from "@/src/components/ui/use-toast"
import { Heart, Share2, Zap } from "lucide-react"

interface PublicationActionsProps {
  publicationId: string
  authorName: string
  authorAddress: string
}

export function PublicationActions({ publicationId, authorName, authorAddress }: PublicationActionsProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isStarkDialogOpen, setIsStarkDialogOpen] = useState(false)
  const [tipAmount, setTipAmount] = useState("")
  const { toast } = useToast()

  const handleLike = () => {
    setIsLiked(!isLiked)
    toast({
      title: isLiked ? "Like Removed" : "Publication Liked",
      description: isLiked ? "You've unliked this publication." : "You've liked this publication.",
    })
  }

  const handleShare = () => {
    // In a real app, this would open a share dialog or copy a link to clipboard
    toast({
      title: "Share Link Copied",
      description: "The link to this publication has been copied to your clipboard.",
    })
  }

  const handleStarkTip = async () => {
    // In a real application, this would interact with a smart contract
    console.log(`Tipping ${tipAmount} Starks to ${authorAddress}`)

    // Simulating a blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Tip Sent!",
      description: `You've successfully sent ${tipAmount} Starks to ${authorName}.`,
    })

    setIsStarkDialogOpen(false)
    setTipAmount("")
  }

  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="icon" onClick={handleLike}>
        <Heart className={`h-4 w-4 ${isLiked ? "fill-current text-red-500" : ""}`} />
      </Button>
      <Button variant="outline" size="icon" onClick={handleShare}>
        <Share2 className="h-4 w-4" />
      </Button>
      <Dialog open={isStarkDialogOpen} onOpenChange={setIsStarkDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Zap className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send Starks to {authorName}</DialogTitle>
            <DialogDescription>
              Show your appreciation by sending Starks tokens. Don't have any? You can buy them in our store.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tipAmount" className="text-right">
                Amount (Starks)
              </Label>
              <Input
                id="tipAmount"
                type="number"
                value={tipAmount}
                onChange={(e) => setTipAmount(e.target.value)}
                className="col-span-3"
                placeholder="10"
                step="1"
                min="1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleStarkTip}>
              Send Starks
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PublicationActions
