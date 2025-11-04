import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/src/app/globals.css"
import { ThemeProvider } from "@/src/components/ThemeProvider"
import { AnimatedBackground } from "@/src/components/AnimatedBackground"
import { Toaster } from "@/src/components/ui/toaster"
import { FloatingNavbar } from "@/src/components/FloatingNavbar"
import { ChatBox } from "@/src/components/ChatBox"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { ChipiProvider } from "@chipi-stack/nextjs";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Starkz",
  description: "From AI to ZK",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!} signInFallbackRedirectUrl="/" signUpFallbackRedirectUrl="/" afterSignOutUrl="/">
            <Providers>
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className="min-h-screen overflow-x-hidden overflow-y-auto p-4 md:p-6 pb-24 md:pb-32">{children}</main>
          <FloatingNavbar />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
    </Providers>
  </ClerkProvider>

  )
}
