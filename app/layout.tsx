import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import { AnimatedBackground } from "@/components/AnimatedBackground"
import { Toaster } from "@/components/ui/toaster"
import { FloatingNavbar } from "@/components/FloatingNavbar"
import { ChatBox } from "@/components/ChatBox"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Starkz",
  description: "From AI to ZK. Kowledge hub and AI assistant for Starknet.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AnimatedBackground />
          <main className="min-h-screen overflow-x-hidden overflow-y-auto p-4 md:p-6 pb-24 md:pb-32">{children}</main>
          <FloatingNavbar />
          <ChatBox />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
