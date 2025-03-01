"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Settings, LogOut, User, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"

export function Navbar() {
  // Mock user state - in a real app, this would come from authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const mockUser = {
    name: "John Doe",
    discordUsername: "johndoe#1234",
    avatar: "/placeholder.svg?height=40&width=40"
  }

  const handleLogin = () => setIsLoggedIn(true)
  const handleLogout = () => setIsLoggedIn(false)

  return (
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
          
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8 border border-gray-700/50">
                      <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                      <AvatarFallback className="bg-[#1e2235] text-white">{mockUser.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start text-sm">
                      <span className="font-medium text-white">{mockUser.name}</span>
                      <span className="text-xs text-gray-300">{mockUser.discordUsername}</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-300 ml-1" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-[#1a1d29] border-gray-800/60 text-white shadow-lg">
                <div className="px-2 py-1.5 text-sm font-medium text-gray-300 border-b border-gray-800/60">
                  Signed in as <span className="text-white">{mockUser.discordUsername}</span>
                </div>
                <DropdownMenuItem className="hover:bg-[#1e2235]/80 focus:bg-[#1e2235]/80 text-gray-300 focus:text-white cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-[#1e2235]/80 focus:bg-[#1e2235]/80 text-gray-300 focus:text-white cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-800/60" />
                <DropdownMenuItem 
                  className="hover:bg-[#1e2235]/80 focus:bg-[#1e2235]/80 text-gray-300 focus:text-white cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              className="bg-yellow-400 hover:bg-yellow-300 text-black"
              onClick={handleLogin}
            >
              Login
            </Button>
          )}
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
              
              {isLoggedIn ? (
                <div className="border-t border-gray-800/60 pt-4 mt-2">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-10 w-10 border border-gray-700/50">
                      <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                      <AvatarFallback className="bg-[#1e2235] text-white">{mockUser.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-white">{mockUser.name}</span>
                      <span className="text-xs text-gray-300">{mockUser.discordUsername}</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2 border-gray-700/50 bg-[#0c0e14]/80 hover:bg-[#1e2235]/80 hover:text-white"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2 mt-2 border-gray-700/50 bg-[#0c0e14]/80 hover:bg-[#1e2235]/80 hover:text-white"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2 mt-2 border-gray-700/50 bg-[#0c0e14]/80 hover:bg-[#1e2235]/80 hover:text-white"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button 
                  className="bg-yellow-400 hover:bg-yellow-300 text-black w-full"
                  onClick={handleLogin}
                >
                  Login
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
} 