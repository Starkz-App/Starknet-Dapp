import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

interface SponsorDrawerProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function SponsorDrawer({ isOpen, setIsOpen }: SponsorDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>About Our Sponsor</DrawerTitle>
            <DrawerDescription>Learn more about the company supporting this content</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex flex-col items-center space-y-4">
              <Image
                src="/placeholder.svg?height=100&width=100"
                alt="Sponsor logo"
                width={100}
                height={100}
                className="rounded-full"
              />
              <p className="text-center text-sm text-muted-foreground">
                Our sponsor is a leading company in the industry, committed to innovation and supporting quality content creation.
              </p>
              <Button className="w-full" asChild>
                <a href="https://example-sponsor.com" target="_blank" rel="noopener noreferrer">
                  Visit Sponsor Website
                </a>
              </Button>
            </div>
          </div>
          <DrawerFooter>
            <Button variant="outline" asChild>
              <a href="/become-sponsor" className="w-full">
                Become a Sponsor
              </a>
            </Button>
            <DrawerClose asChild>
              <Button variant="ghost">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

