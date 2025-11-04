"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
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
import { RadioGroup, RadioGroupItem } from "@/src/components/ui/radio-group"
import { Separator } from "@/src/components/ui/separator"
import { useToast } from "@/src/components/ui/use-toast"
import { Heart, Sparkles, UserPlus, Coins, FileText, Zap } from "lucide-react"

interface PublicationMonetizationProps {
  publicationId: string
  authorName: string
  authorAddress: string
  publicationTitle: string
}

export function PublicationMonetization({
  publicationId,
  authorName,
  authorAddress,
  publicationTitle,
}: PublicationMonetizationProps) {
  const [tipDialogOpen, setTipDialogOpen] = useState(false)
  const [licenseDialogOpen, setLicenseDialogOpen] = useState(false)
  const [sponsorDialogOpen, setSponsorDialogOpen] = useState(false)
  const [tipAmount, setTipAmount] = useState("")
  const [licenseType, setLicenseType] = useState("personal")
  const [sponsorTier, setSponsorTier] = useState("bronze")
  const { toast } = useToast()

  const handleTip = async () => {
    if (!tipAmount || Number.parseFloat(tipAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid tip amount.",
        variant: "destructive",
      })
      return
    }

    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Tip Sent Successfully!",
      description: `You've sent ${tipAmount} STRK to ${authorName}. Thank you for supporting quality content!`,
    })

    setTipDialogOpen(false)
    setTipAmount("")
  }

  const handleLicense = async () => {
    const prices = {
      personal: "50",
      commercial: "200",
      enterprise: "500",
    }

    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "License Purchased!",
      description: `You've acquired a ${licenseType} license for ${prices[licenseType as keyof typeof prices]} STRK. Check your wallet for the NFT license.`,
    })

    setLicenseDialogOpen(false)
  }

  const handleSponsor = async () => {
    const amounts = {
      bronze: "100",
      silver: "250",
      gold: "500",
    }

    // Simulate blockchain transaction
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Sponsorship Activated!",
      description: `You're now a ${sponsorTier} sponsor of ${authorName} with ${amounts[sponsorTier as keyof typeof amounts]} STRK/month. Thank you for your support!`,
    })

    setSponsorDialogOpen(false)
  }

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-background via-background to-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Sparkles className="h-6 w-6 text-primary" />
          Support This Publication
        </CardTitle>
        <CardDescription>Show your appreciation and help creators continue producing quality content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-3">
          {/* Tip the Publication */}
          <Dialog open={tipDialogOpen} onOpenChange={setTipDialogOpen}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-primary/50">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-500">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Tip Publication</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Send a one-time tip to show appreciation for this content
                  </p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-rose-500" />
                  Tip {authorName}
                </DialogTitle>
                <DialogDescription>
                  Your tip goes directly to the author as a token of appreciation for their work.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="tip-amount">Amount (STRK)</Label>
                  <Input
                    id="tip-amount"
                    type="number"
                    value={tipAmount}
                    onChange={(e) => setTipAmount(e.target.value)}
                    placeholder="10"
                    step="1"
                    min="1"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setTipAmount("5")}>
                    5 STRK
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setTipAmount("10")}>
                    10 STRK
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setTipAmount("25")}>
                    25 STRK
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setTipAmount("50")}>
                    50 STRK
                  </Button>
                </div>
                <div className="rounded-lg bg-muted p-4 text-sm">
                  <p className="font-medium">Recipient: {authorName}</p>
                  <p className="text-muted-foreground text-xs mt-1">{authorAddress}</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setTipDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleTip} className="bg-gradient-to-r from-pink-500 to-rose-500">
                  <Coins className="mr-2 h-4 w-4" />
                  Send Tip
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* License or Remix */}
          <Dialog open={licenseDialogOpen} onOpenChange={setLicenseDialogOpen}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-primary/50">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">License & Remix</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Purchase a license to use or remix this content commercially
                  </p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  License Publication
                </DialogTitle>
                <DialogDescription>
                  Choose a license type that fits your needs. All licenses are issued as NFTs on Starknet.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <RadioGroup value={licenseType} onValueChange={setLicenseType}>
                  <div className="space-y-3">
                    <Label
                      htmlFor="personal"
                      className="flex items-center justify-between rounded-lg border-2 border-muted p-4 cursor-pointer hover:border-primary [&:has(:checked)]:border-primary"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="personal" id="personal" />
                        <div>
                          <p className="font-medium">Personal Use</p>
                          <p className="text-sm text-muted-foreground">For personal projects and learning</p>
                        </div>
                      </div>
                      <span className="font-bold">50 STRK</span>
                    </Label>

                    <Label
                      htmlFor="commercial"
                      className="flex items-center justify-between rounded-lg border-2 border-muted p-4 cursor-pointer hover:border-primary [&:has(:checked)]:border-primary"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="commercial" id="commercial" />
                        <div>
                          <p className="font-medium">Commercial Use</p>
                          <p className="text-sm text-muted-foreground">For commercial projects and products</p>
                        </div>
                      </div>
                      <span className="font-bold">200 STRK</span>
                    </Label>

                    <Label
                      htmlFor="enterprise"
                      className="flex items-center justify-between rounded-lg border-2 border-muted p-4 cursor-pointer hover:border-primary [&:has(:checked)]:border-primary"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="enterprise" id="enterprise" />
                        <div>
                          <p className="font-medium">Enterprise License</p>
                          <p className="text-sm text-muted-foreground">Unlimited use with full rights</p>
                        </div>
                      </div>
                      <span className="font-bold">500 STRK</span>
                    </Label>
                  </div>
                </RadioGroup>
                <div className="rounded-lg bg-muted p-4 text-sm space-y-2">
                  <p className="font-medium">What's included:</p>
                  <ul className="text-muted-foreground text-xs space-y-1 ml-4 list-disc">
                    <li>NFT license certificate on Starknet</li>
                    <li>Full access to source materials</li>
                    <li>Remix and derivative rights</li>
                    <li>Lifetime validity</li>
                  </ul>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setLicenseDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleLicense} className="bg-gradient-to-r from-blue-500 to-cyan-500">
                  <Zap className="mr-2 h-4 w-4" />
                  Purchase License
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Sponsor the Author */}
          <Dialog open={sponsorDialogOpen} onOpenChange={setSponsorDialogOpen}>
            <DialogTrigger asChild>
              <Card className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-primary/50">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-500">
                    <UserPlus className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">Sponsor Author</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Become a monthly sponsor and support ongoing content creation
                  </p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-amber-500" />
                  Sponsor {authorName}
                </DialogTitle>
                <DialogDescription>
                  Choose a sponsorship tier and support {authorName}'s ongoing work with recurring monthly
                  contributions.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <RadioGroup value={sponsorTier} onValueChange={setSponsorTier}>
                  <div className="space-y-3">
                    <Label
                      htmlFor="bronze"
                      className="flex items-center justify-between rounded-lg border-2 border-muted p-4 cursor-pointer hover:border-primary [&:has(:checked)]:border-primary"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="bronze" id="bronze" />
                        <div>
                          <p className="font-medium flex items-center gap-2">
                            <span className="text-amber-700">🥉</span> Bronze Sponsor
                          </p>
                          <p className="text-sm text-muted-foreground">Early access to content</p>
                        </div>
                      </div>
                      <span className="font-bold">100 STRK/mo</span>
                    </Label>

                    <Label
                      htmlFor="silver"
                      className="flex items-center justify-between rounded-lg border-2 border-muted p-4 cursor-pointer hover:border-primary [&:has(:checked)]:border-primary"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="silver" id="silver" />
                        <div>
                          <p className="font-medium flex items-center gap-2">
                            <span className="text-gray-400">🥈</span> Silver Sponsor
                          </p>
                          <p className="text-sm text-muted-foreground">+ Exclusive content & Discord access</p>
                        </div>
                      </div>
                      <span className="font-bold">250 STRK/mo</span>
                    </Label>

                    <Label
                      htmlFor="gold"
                      className="flex items-center justify-between rounded-lg border-2 border-muted p-4 cursor-pointer hover:border-primary [&:has(:checked)]:border-primary"
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="gold" id="gold" />
                        <div>
                          <p className="font-medium flex items-center gap-2">
                            <span className="text-yellow-500">🥇</span> Gold Sponsor
                          </p>
                          <p className="text-sm text-muted-foreground">+ 1-on-1 mentorship & priority support</p>
                        </div>
                      </div>
                      <span className="font-bold">500 STRK/mo</span>
                    </Label>
                  </div>
                </RadioGroup>
                <div className="rounded-lg bg-muted p-4 text-sm space-y-2">
                  <p className="font-medium">Sponsorship Benefits:</p>
                  <ul className="text-muted-foreground text-xs space-y-1 ml-4 list-disc">
                    <li>Sponsor badge on your profile</li>
                    <li>Listed on author's sponsor page</li>
                    <li>Cancel anytime, no commitment</li>
                    <li>Direct impact on content creation</li>
                  </ul>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setSponsorDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSponsor} className="bg-gradient-to-r from-amber-500 to-orange-500">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Become a Sponsor
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Separator />

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>All transactions are secured on Starknet</p>
          <p className="flex items-center gap-1">
            <Zap className="h-4 w-4 text-primary" />
            Instant & Low Fees
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
