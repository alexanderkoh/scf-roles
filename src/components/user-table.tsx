"use client"

import React, { useState } from "react"
import { Search, ChevronDown, MoreVertical, Bell, UserPlus, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Helper function to get role dot color
function getRoleDotColor(roleName: string) {
  switch (roleName) {
    case "Navigator":
      return "text-indigo-400"
    case "Pilot":
      return "text-purple-400"
    case "Pathfinder":
      return "text-blue-400"
    case "Verified":
      return "text-emerald-400"
    default:
      return "text-gray-400"
  }
}

// Enhance mock data with additional profile information
const users = [
  {
    id: "maxoliver2298",
    name: "maxoliver",
    avatar: "/placeholder.svg?height=40&width=40",
    memberSince: "Feb 28, 2025, 7:00 PM",
    joinedDiscord: "Jul 28, 2020, 2:39 PM",
    roles: [{ name: "Verified", count: null, obtained: "Jan 15, 2023" }],
    joinedStellarDevelopers: "Mar 10, 2023",
    profileDescription: "Enthusiastic developer and community member."
  },
  {
    id: "mercyloveth1",
    name: "MercyLoveth1",
    avatar: "/placeholder.svg?height=40&width=40",
    memberSince: "Feb 28, 2025, 6:55 PM",
    joinedDiscord: "Dec 27, 2023, 1:12 PM",
    roles: [{ name: "Pathfinder", count: null, obtained: "Feb 20, 2023" }],
    joinedStellarDevelopers: "Apr 15, 2023",
    profileDescription: "Passionate about exploring new paths."
  },
  {
    id: "lukeg",
    name: "LukeG",
    avatar: "/placeholder.svg?height=40&width=40",
    memberSince: "Feb 28, 2025, 6:06 PM",
    joinedDiscord: "Feb 28, 2025, 1:05 PM",
    roles: [{ name: "Navigator", count: null, obtained: "Mar 5, 2023" }],
    joinedStellarDevelopers: "May 10, 2023",
    profileDescription: "Guiding the way with precision."
  },
  {
    id: "victormf",
    name: "Victor MF",
    avatar: "/placeholder.svg?height=40&width=40",
    memberSince: "Feb 28, 2025, 5:44 PM",
    joinedDiscord: "Feb 25, 2025, 10:24 PM",
    roles: [{ name: "Pilot", count: null, obtained: "Apr 1, 2023" }],
    joinedStellarDevelopers: "Jun 20, 2023",
    profileDescription: "Flying high with innovation."
  },
  {
    id: "njaysk",
    name: "N'jay SK",
    avatar: "/placeholder.svg?height=40&width=40",
    memberSince: "Feb 28, 2025, 5:38 PM",
    joinedDiscord: "Apr 20, 2024, 9:01 AM",
    roles: [{ name: "Pathfinder", count: null, obtained: "May 15, 2023" }],
    joinedStellarDevelopers: "Jul 25, 2023",
    profileDescription: "Charting new territories with enthusiasm."
  },
  {
    id: "joanncruz",
    name: "Joann Cruz",
    avatar: "/placeholder.svg?height=40&width=40",
    memberSince: "Feb 28, 2025, 5:29 PM",
    joinedDiscord: "Jun 14, 2023, 6:52 PM",
    roles: [{ name: "Verified", count: null, obtained: "Jun 1, 2023" }],
    joinedStellarDevelopers: "Aug 30, 2023",
    profileDescription: "Verified and ready to contribute."
  },
  {
    id: "eileen",
    name: "Eileen Craig",
    avatar: "/placeholder.svg?height=40&width=40",
    memberSince: "Feb 28, 2025, 5:28 PM",
    joinedDiscord: "Mar 15, 2020, 10:38 PM",
    roles: [{ name: "Navigator", count: null, obtained: "Jul 10, 2023" }],
    joinedStellarDevelopers: "Sep 5, 2023",
    profileDescription: "Navigating the stars with expertise."
  },
  {
    id: "fred713",
    name: "fred713",
    avatar: "/placeholder.svg?height=40&width=40",
    memberSince: "Feb 28, 2025, 5:28 PM",
    joinedDiscord: "Jun 29, 2022, 9:30 AM",
    roles: [{ name: "Pilot", count: null, obtained: "Aug 20, 2023" }],
    joinedStellarDevelopers: "Oct 10, 2023",
    profileDescription: "Piloting through challenges with ease."
  },
  {
    id: "biggestzee",
    name: "Biggest Zee sk",
    avatar: "/placeholder.svg?height=40&width=40",
    memberSince: "Feb 28, 2025, 5:21 PM",
    joinedDiscord: "Feb 20, 2025, 11:31 AM",
    roles: [{ name: "Pathfinder", count: null, obtained: "Sep 15, 2023" }],
    joinedStellarDevelopers: "Nov 20, 2023",
    profileDescription: "Exploring the vastness of the universe."
  },
  {
    id: "kayla_lewis",
    name: "kayla_lewis",
    avatar: "/placeholder.svg?height=40&width=40",
    memberSince: "Feb 28, 2025, 4:59 PM",
    joinedDiscord: "Feb 28, 2025, 4:54 PM",
    roles: [{ name: "Navigator", count: null, obtained: "Oct 5, 2023" }],
    joinedStellarDevelopers: "Dec 15, 2023",
    profileDescription: "Leading the way with confidence."
  },
  {
    id: "cryptor",
    name: "Cryptor",
    avatar: "/placeholder.svg?height=40&width=40",
    memberSince: "Feb 28, 2025, 3:30 PM",
    joinedDiscord: "Feb 8, 2022, 12:59 PM",
    roles: [{ name: "Pilot", count: null, obtained: "Nov 10, 2023" }],
    joinedStellarDevelopers: "Jan 5, 2024",
    profileDescription: "Cryptography enthusiast and pilot."
  },
  {
    id: "jumpship",
    name: "Jumpship",
    avatar: "/placeholder.svg?height=40&width=40",
    memberSince: "Feb 28, 2025, 3:25 PM",
    joinedDiscord: "Feb 28, 2025, 2:51 PM",
    roles: [{ name: "Pathfinder", count: null, obtained: "Dec 1, 2023" }],
    joinedStellarDevelopers: "Feb 10, 2024",
    profileDescription: "Jumping into new adventures."
  },
]

interface UserTableProps {
  activeFilters: string[]
  onFilterToggle: (role: string) => void
}

type SortField = "name" | "memberSince" | "joinedDiscord" | "role"
type SortOrder = "asc" | "desc"

export function UserTable({ activeFilters, onFilterToggle }: UserTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [perPage, setPerPage] = useState("12")
  const [sortField, setSortField] = useState<SortField>("memberSince")
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc")
  // Add state to track expanded rows
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  // Function to toggle row expansion
  const toggleRowExpansion = (userId: string) => {
    setExpandedRows(prev => 
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  // Filter users based on activeFilters
  const filteredUsers = users.filter(user => 
    activeFilters.length === 0 || 
    user.roles.some(role => activeFilters.includes(role.name))
  )

  // Sort users based on current sort field and order
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const multiplier = sortOrder === "asc" ? 1 : -1
    
    switch (sortField) {
      case "name":
        return multiplier * a.name.localeCompare(b.name)
      case "memberSince":
        return multiplier * new Date(a.memberSince).getTime() - new Date(b.memberSince).getTime()
      case "joinedDiscord":
        return multiplier * new Date(a.joinedDiscord).getTime() - new Date(b.joinedDiscord).getTime()
      case "role":
        return multiplier * a.roles[0].name.localeCompare(b.roles[0].name)
      default:
        return 0
    }
  })

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(current => current === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("desc")
    }
  }

  return (
    <div className="bg-[#1a1d29]/80 backdrop-blur-sm border border-gray-800/60 rounded-xl overflow-hidden shadow-lg">
      <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-800/60">
        <h2 className="text-lg font-schabo tracking-wide text-white/90">Recent Members</h2>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by username or id"
              className="pl-8 w-full sm:w-64 bg-[#0c0e14]/80 border-gray-700/50 focus-visible:border-gray-600 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 border-gray-700/50 bg-[#0c0e14]/80 hover:bg-[#1e2235]/80 hover:text-white"
              >
                <span>Sort</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-[#1a1d29] border-gray-800/60 text-white shadow-lg">
              <DropdownMenuItem 
                className="hover:bg-[#1e2235]/80 focus:bg-[#1e2235]/80 cursor-pointer text-gray-300 focus:text-white"
                onClick={() => handleSort("name")}
              >
                Name {sortField === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-[#1e2235]/80 focus:bg-[#1e2235]/80 cursor-pointer text-gray-300 focus:text-white"
                onClick={() => handleSort("memberSince")}
              >
                Member Since {sortField === "memberSince" && (sortOrder === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-[#1e2235]/80 focus:bg-[#1e2235]/80 cursor-pointer text-gray-300 focus:text-white"
                onClick={() => handleSort("joinedDiscord")}
              >
                Joined Discord {sortField === "joinedDiscord" && (sortOrder === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-[#1e2235]/80 focus:bg-[#1e2235]/80 cursor-pointer text-gray-300 focus:text-white"
                onClick={() => handleSort("role")}
              >
                Role {sortField === "role" && (sortOrder === "asc" ? "↑" : "↓")}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800/60 text-xs text-gray-400 bg-[#12141e]/40">
              <th className="text-left p-4 font-medium">NAME</th>
              <th className="text-left p-4 font-medium hidden md:table-cell">MEMBER SINCE</th>
              <th className="text-left p-4 font-medium hidden lg:table-cell">JOINED DISCORD</th>
              <th className="text-left p-4 font-medium">
                <div className="flex items-center gap-1">
                  ROLES
                  <ChevronDown className="h-3 w-3" />
                </div>
              </th>
              <th className="text-left p-4 font-medium">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <React.Fragment key={user.id}>
                <tr 
                  className="border-b border-gray-800/40 hover:bg-[#1e2235]/40 transition-colors cursor-pointer" 
                  onClick={() => toggleRowExpansion(user.id)}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-white/90">{user.name}</div>
                        <div className="text-xs text-gray-400">{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-300 hidden md:table-cell">{user.memberSince}</td>
                  <td className="p-4 text-sm text-gray-300 hidden lg:table-cell">{user.joinedDiscord}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap items-center gap-2">
                      {user.roles.map((role, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-[#12141e]/80 text-xs py-0.5 border-gray-700/50 hover:border-gray-600 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            onFilterToggle(role.name);
                          }}
                        >
                          <span className={`mr-1 ${getRoleDotColor(role.name)}`}>●</span> {role.name}
                        </Badge>
                      ))}
                      {user.roles.length < 2 && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6 hover:bg-gray-700/50 hover:text-white"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 hover:bg-gray-700/50 hover:text-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Bell className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 hover:bg-gray-700/50 hover:text-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:bg-gray-700/50 hover:text-white"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#1a1d29] border-gray-800/60 text-white shadow-lg">
                          <DropdownMenuItem className="hover:bg-[#1e2235]/80 focus:bg-[#1e2235]/80 text-gray-300 focus:text-white">
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-[#1e2235]/80 focus:bg-[#1e2235]/80 text-gray-300 focus:text-white">
                            Manage Roles
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-[#1e2235]/80 focus:bg-[#1e2235]/80 text-gray-300 focus:text-white">
                            Send Message
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
                {expandedRows.includes(user.id) && (
                  <tr className="bg-[#1a1d29]/60">
                    <td colSpan={5} className="p-4">
                      <div className="text-sm text-gray-300 space-y-3">
                        <div className="bg-[#12141e]/40 p-3 rounded-lg border border-gray-800/40">
                          <h3 className="text-white font-medium mb-2">Profile Description</h3>
                          <p>{user.profileDescription}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="bg-[#12141e]/40 p-3 rounded-lg border border-gray-800/40">
                            <h3 className="text-white font-medium mb-2">Community Information</h3>
                            <p><span className="text-gray-400">Joined Stellar Developers:</span> {user.joinedStellarDevelopers}</p>
                            <p><span className="text-gray-400">Member Since:</span> {user.memberSince}</p>
                            <p><span className="text-gray-400">Joined Discord:</span> {user.joinedDiscord}</p>
                          </div>
                          
                          <div className="bg-[#12141e]/40 p-3 rounded-lg border border-gray-800/40">
                            <h3 className="text-white font-medium mb-2">Role History</h3>
                            <ul className="space-y-1">
                              {user.roles.map((role, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <span className={`${getRoleDotColor(role.name)}`}>●</span>
                                  <span>{role.name}:</span>
                                  <span className="text-gray-400">Obtained on {role.obtained}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-800/60 bg-[#12141e]/40">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <span>Showing</span>
          <Select value={perPage} onValueChange={setPerPage}>
            <SelectTrigger className="w-16 h-8 bg-[#0c0e14]/80 border-gray-700/50 focus:border-gray-600 text-white">
              <SelectValue placeholder="12" />
            </SelectTrigger>
            <SelectContent className="bg-[#1a1d29] border-gray-800/60 text-white shadow-lg">
              <SelectItem value="12" className="hover:bg-[#1e2235]/80 focus:bg-[#1e2235]/80 text-gray-300 focus:text-white">
                12
              </SelectItem>
              <SelectItem value="24" className="hover:bg-[#1e2235]/80 focus:bg-[#1e2235]/80 text-gray-300 focus:text-white">
                24
              </SelectItem>
              <SelectItem value="36" className="hover:bg-[#1e2235]/80 focus:bg-[#1e2235]/80 text-gray-300 focus:text-white">
                36
              </SelectItem>
              <SelectItem value="48" className="hover:bg-[#1e2235]/80 focus:bg-[#1e2235]/80 text-gray-300 focus:text-white">
                48
              </SelectItem>
            </SelectContent>
          </Select>
          <span>members of 18,770</span>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" className="hover:bg-gray-700/50 hover:text-white border-gray-700/50" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive className="bg-gray-700 border-gray-600 text-white">
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className="hover:bg-gray-700/50 hover:text-white border-gray-700/50">
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className="hover:bg-gray-700/50 hover:text-white border-gray-700/50">
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className="hover:bg-gray-700/50 hover:text-white border-gray-700/50">
                4
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" className="hover:bg-gray-700/50 hover:text-white border-gray-700/50">
                5
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis className="text-gray-400" />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" className="hover:bg-gray-700/50 hover:text-white border-gray-700/50" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

