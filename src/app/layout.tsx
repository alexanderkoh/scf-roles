import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Navbar } from "@/components/navbar"
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
        <Navbar />
        <main className="container mx-auto px-4">{children}</main>
      </body>
    </html>
  )
}

