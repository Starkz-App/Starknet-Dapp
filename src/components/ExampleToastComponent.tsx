"use client"

import { Button } from "@/src/components/ui/button"
import { useToast } from "@/src/components/ui/use-toast"

export function ExampleToastComponent() {
  const { toast } = useToast()

  return (
    <Button
      onClick={() => {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        })
      }}
    >
      Show Toast
    </Button>
  )
}
