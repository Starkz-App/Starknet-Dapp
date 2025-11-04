import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { useToast } from "@/src/components/ui/use-toast"

export function BuyStarkzModal() {export function BuyStarkzModal() {
  const [amount, setAmount] = useState('')
  const { toast } = useToast()

  const handleBuyStarkz = () => {
    // Simulating a purchase process
    toast({
      title: "Purchase Successful",
      description: `You have successfully purchased ${amount} Starkz tokens.`,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Buy Starkz</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buy Starkz Tokens</DialogTitle>
          <DialogDescription>
            Enter the amount of Starkz tokens you want to purchase.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              className="col-span-3"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleBuyStarkz}>Buy Starkz</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
