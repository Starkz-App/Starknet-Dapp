import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { AnimatedBackground } from '@/components/AnimatedBackground'
import { Toaster } from "@/components/ui/toaster"
import { Sidebar } from '@/components/Sidebar'
import { Header } from '@/components/Header'
import { BottomNav } from '@/components/BottomNav'
import { StarknetProvider } from "@/components/starknet-provider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Starkz - From AI to ZK',
  description: 'A decentralized public knowledge hub powered on Starknet',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen overflow-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StarknetProvider>
          <AnimatedBackground />
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 pb-16 lg:pb-24">
                {children}
              </main>
              <BottomNav />
            </div>
          </div>
          <Toaster />
          </StarknetProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

