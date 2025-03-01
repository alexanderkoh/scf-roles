import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import localFont from "next/font/local"

const inter = Inter({ subsets: ["latin"] })

const schabo = localFont({
  src: [
    {
      path: '../fonts/SCHABO-Condensed.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-schabo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "SCF Roles",
  description: "Role management for SCF",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${schabo.variable}`}>
      <body className={cn("min-h-screen bg-gradient-to-b from-[#0c0e14] to-[#0f1218] text-white", inter.className)}>
        <nav className="bg-[#1a1d29]/80 backdrop-blur-sm border-b border-gray-800/60 py-4 px-6 mb-6">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-schabo tracking-wide text-white/90">SCF Roles</h1>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/" className="text-white/80 hover:text-white transition-colors">
                Members
              </Link>
              <Link href="/metrics" className="text-white/80 hover:text-white transition-colors">
                Metrics
              </Link>
              <Button className="bg-yellow-400 hover:bg-yellow-300 text-black">Login</Button>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-[#1a1d29]/95 border-gray-800/60">
                <SheetHeader>
                  <SheetTitle className="text-white font-schabo">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-4">
                  <Link href="/" className="text-white/80 hover:text-white transition-colors">
                    Members
                  </Link>
                  <Link href="/metrics" className="text-white/80 hover:text-white transition-colors">
                    Metrics
                  </Link>
                  <Button className="bg-yellow-400 hover:bg-yellow-300 text-black w-full">Login</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
        <main className="container mx-auto px-4">{children}</main>
      </body>
    </html>
  )
}

