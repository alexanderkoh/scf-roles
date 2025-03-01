import Image from "next/image"
import { X } from "lucide-react"

interface RoleStatsProps {
  activeFilters: string[]
  onFilterToggle: (role: string) => void
}

export function RoleStats({ activeFilters, onFilterToggle }: RoleStatsProps) {
  const stats = [
    {
      name: "Verified",
      count: 600,
      iconSrc: "/verified.png",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30",
      countColor: "text-emerald-300",
    },
    {
      name: "Pathfinder",
      count: 24,
      iconSrc: "/pathfinder.png",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
      countColor: "text-blue-300",
    },
    {
      name: "Navigator",
      count: 18,
      iconSrc: "/navigator.png",
      color: "text-indigo-400",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/30",
      countColor: "text-indigo-300",
    },
    {
      name: "Pilot",
      count: 32,
      iconSrc: "/pilot.png",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
      countColor: "text-purple-300",
    },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => {
        const isActive = activeFilters.includes(stat.name)
        return (
          <div
            key={stat.name}
            onClick={() => onFilterToggle(stat.name)}
            className={`border rounded-xl p-4 flex items-center space-x-4 cursor-pointer transition-colors shadow-md
              ${isActive ? `${stat.bgColor} ${stat.borderColor} ${stat.color}` : 'border-gray-800/60 bg-[#1a1d29]/80 hover:bg-[#1e2235]/80'}`}
          >
            <div className="relative">
              <Image
                src={stat.iconSrc}
                alt={`${stat.name} icon`}
                width={32}
                height={32}
              />
              {isActive && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onFilterToggle(stat.name)
                  }}
                  className="absolute -top-2 -right-2 rounded-full bg-gray-800/60 p-0.5 hover:bg-gray-700/60"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
            <div>
              <p className={`text-sm font-medium ${isActive ? stat.color : 'text-white/90'}`}>{stat.name}</p>
              <p className={`text-xl font-bold ${isActive ? stat.countColor : 'text-gray-400'}`}>{stat.count}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

