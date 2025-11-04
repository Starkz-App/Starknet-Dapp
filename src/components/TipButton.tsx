'use client'

import { useState } from 'react'
import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/src/components/ui/dialog'
import { Label } from '@/src/components/ui/label'
import { useToast } from "@/src/components/ui/use-toast"
import { Gift } from 'lucide-react'

interface TipButtonProps {
  recipientName: string;
  recipientAddress: string;
}

export function TipButton({ recipientName, recipientAddress }: TipButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [tipAmount, setTipAmount] = useState('')
  const { toast } = useToast()

  const handleTip = async () => {
    // In a real application, this would interact with a smart contract
    console.log(`Tipping ${tipAmount} ETH to ${recipientAddress}`)
    
    // Simulating a blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000))

    toast({
      title: "Tip Sent!",
      description: `You've successfully sent ${tipAmount} ETH to ${recipientName}.`,
    })

    setIsOpen(false)
    setTipAmount('')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Gift className="mr-2 h-4 w-4" />
          Tip Creator
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send a tip to {recipientName}</DialogTitle>
          <DialogDescription>
            Show your appreciation by sending a tip. This transaction is powered by account abstraction for a seamless experience.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tipAmount" className="text-right">
              Amount (ETH)
            </Label>
            <Input
              id="tipAmount"
              type="number"
              value={tipAmount}
              onChange={(e) => setTipAmount(e.target.value)}
              className="col-span-3"
              placeholder="0.01"
              step="0.01"
              min="0"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleTip}>Send Tip</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
