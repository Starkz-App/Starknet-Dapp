import React from 'react'
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { CheckCircle2, XCircle } from 'lucide-react'

interface SubmissionResultDrawerProps {
  isOpen: boolean
  onClose: () => void
  result: {
    success: boolean
    message: string
    data?: any
  } | null
}

export function SubmissionResultDrawer({ isOpen, onClose, result }: SubmissionResultDrawerProps) {
  if (!result) return null

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="flex items-center">
            {result.success ? (
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="mr-2 h-5 w-5 text-red-500" />
            )}
            {result.success ? 'Submission Successful' : 'Submission Failed'}
          </DrawerTitle>
          <DrawerDescription>{result.message}</DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          {result.data && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Submitted Data:</h4>
              <pre className="bg-muted p-2 rounded-md overflow-x-auto">
                {JSON.stringify(result.data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}

