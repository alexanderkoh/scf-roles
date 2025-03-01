"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function Sidebar() {
  const [searchTerm, setSearchTerm] = useState("")

  const roles = [
    { id: "verified", label: "Verified", color: "bg-emerald-500/20 text-emerald-400" },
    { id: "pathfinder", label: "Pathfinder", color: "bg-blue-500/20 text-blue-400" },
    { id: "navigator", label: "Navigator", color: "bg-indigo-500/20 text-indigo-400" },
    { id: "pilot", label: "Pilot", color: "bg-purple-500/20 text-purple-400" },
    { id: "stellar-protocol", label: "Stellar Protocol", color: "bg-amber-500/20 text-amber-400" },
    { id: "community-fund", label: "Community Fund", color: "bg-green-500/20 text-green-400" },
    { id: "stellar-developer", label: "Stellar Developer", color: "bg-pink-500/20 text-pink-400" },
  ]

  return (
    <aside className="w-64 bg-[#1a1d29]/80 border-r border-gray-800/60 p-4 hidden md:block">
      <h2 className="text-lg font-schabo tracking-wide text-white/90 mb-4">Filters</h2>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users..."
            className="pl-8 bg-[#0c0e14]/80 border-gray-700/50 focus-visible:border-gray-600 rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Roles</h3>
        <div className="space-y-3">
          {roles.map((role) => (
            <div key={role.id} className="flex items-center space-x-2">
              <Checkbox
                id={role.id}
                className="border-gray-700 data-[state=checked]:bg-gray-700 data-[state=checked]:text-white"
              />
              <Label htmlFor={role.id} className="text-sm cursor-pointer flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${role.color.split(" ")[0]}`}></span>
                {role.label}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

