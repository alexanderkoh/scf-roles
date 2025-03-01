"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts"
import { Users, UserCheck, Vote, UserPlus, Calendar, ChevronDown, ChevronUp, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Footer } from "@/components/footer"

// Extended dataset with more months
const allUserJoinData = [
  { date: "2023-01", total: 1200, verified: 800, pilots: 50, newMembers: 200 },
  { date: "2023-02", total: 1500, verified: 1000, pilots: 60, newMembers: 300 },
  { date: "2023-03", total: 2000, verified: 1400, pilots: 75, newMembers: 500 },
  { date: "2023-04", total: 2400, verified: 1800, pilots: 90, newMembers: 400 },
  { date: "2023-05", total: 2800, verified: 2200, pilots: 110, newMembers: 400 },
  { date: "2023-06", total: 3200, verified: 2600, pilots: 130, newMembers: 400 },
  { date: "2023-07", total: 3600, verified: 2900, pilots: 145, newMembers: 400 },
  { date: "2023-08", total: 4000, verified: 3200, pilots: 160, newMembers: 400 },
  { date: "2023-09", total: 4300, verified: 3500, pilots: 175, newMembers: 300 },
  { date: "2023-10", total: 4600, verified: 3800, pilots: 190, newMembers: 300 },
  { date: "2023-11", total: 4900, verified: 4000, pilots: 205, newMembers: 300 },
  { date: "2023-12", total: 5200, verified: 4300, pilots: 220, newMembers: 300 },
]

// Extended dataset for pilot voting
const allPilotVotingData = [
  { date: "2023-01", votingRate: 60, proposalsCount: 5 },
  { date: "2023-02", votingRate: 65, proposalsCount: 7 },
  { date: "2023-03", votingRate: 70, proposalsCount: 8 },
  { date: "2023-04", votingRate: 75, proposalsCount: 10 },
  { date: "2023-05", votingRate: 80, proposalsCount: 12 },
  { date: "2023-06", votingRate: 85, proposalsCount: 15 },
  { date: "2023-07", votingRate: 82, proposalsCount: 14 },
  { date: "2023-08", votingRate: 84, proposalsCount: 16 },
  { date: "2023-09", votingRate: 86, proposalsCount: 18 },
  { date: "2023-10", votingRate: 88, proposalsCount: 20 },
  { date: "2023-11", votingRate: 90, proposalsCount: 22 },
  { date: "2023-12", votingRate: 92, proposalsCount: 25 },
]

// Predefined date ranges
const dateRanges = [
  { label: "Last 3 Months", value: "3m" },
  { label: "Last 6 Months", value: "6m" },
  { label: "Year to Date", value: "ytd" },
  { label: "Full Year", value: "1y" },
  { label: "All Time", value: "all" },
]

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  change?: string;
  trend?: "up" | "down" | "neutral";
}

const StatCard = ({ title, value, icon: Icon, change, trend }: StatCardProps) => (
  <Card className="bg-[#1a1d29]/80 border-gray-800/60 transition-all hover:bg-[#1e2235]/80 hover:shadow-lg">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-white font-schabo tracking-wide">{title}</CardTitle>
      <Icon className="h-4 w-4 text-gray-300" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-white">{value}</div>
      {change && (
        <div className={`flex items-center mt-2 text-xs ${
          trend === "up" ? "text-emerald-400" : 
          trend === "down" ? "text-red-400" : 
          "text-gray-300"
        }`}>
          {trend === "up" ? <ChevronUp className="h-3 w-3 mr-1" /> : 
           trend === "down" ? <ChevronDown className="h-3 w-3 mr-1" /> : 
           <span className="h-3 w-3 mr-1">-</span>}
          {change} from previous period
        </div>
      )}
    </CardContent>
  </Card>
)

// Custom tooltip component for charts
interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1d29] border border-gray-800/60 p-3 rounded-md shadow-lg">
        <p className="text-white font-medium mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span className="text-gray-200">{entry.name}:</span>
            <span className="text-white font-medium">
              {entry.name === "votingRate" ? `${entry.value}%` : entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function MetricsPage() {
  const [dateRange, setDateRange] = useState<string>("6m")
  const [userJoinData, setUserJoinData] = useState(allUserJoinData.slice(-6))
  const [pilotVotingData, setPilotVotingData] = useState(allPilotVotingData.slice(-6))
  const [activeUserDataKeys, setActiveUserDataKeys] = useState<string[]>(["total", "verified", "pilots", "newMembers"])
  
  // Update data when date range changes
  useEffect(() => {
    let filteredUserData;
    let filteredVotingData;
    
    switch(dateRange) {
      case "3m":
        filteredUserData = allUserJoinData.slice(-3);
        filteredVotingData = allPilotVotingData.slice(-3);
        break;
      case "6m":
        filteredUserData = allUserJoinData.slice(-6);
        filteredVotingData = allPilotVotingData.slice(-6);
        break;
      case "ytd":
        // Assuming current year data starts at index 0
        filteredUserData = allUserJoinData;
        filteredVotingData = allPilotVotingData;
        break;
      case "1y":
        filteredUserData = allUserJoinData.slice(-12);
        filteredVotingData = allPilotVotingData.slice(-12);
        break;
      case "all":
      default:
        filteredUserData = allUserJoinData;
        filteredVotingData = allPilotVotingData;
    }
    
    setUserJoinData(filteredUserData);
    setPilotVotingData(filteredVotingData);
  }, [dateRange]);

  // Calculate changes for stat cards
  const latestData = allUserJoinData[allUserJoinData.length - 1];
  const previousMonthData = allUserJoinData[allUserJoinData.length - 2];
  
  const totalChange = Math.round((latestData.total - previousMonthData.total) / previousMonthData.total * 100);
  const delegatesChange = Math.round((latestData.pilots - previousMonthData.pilots) / previousMonthData.pilots * 100);
  const votersChange = Math.round((latestData.verified - previousMonthData.verified) / previousMonthData.verified * 100);
  
  // Toggle data series visibility
  const toggleDataSeries = (key: string) => {
    setActiveUserDataKeys(prev => 
      prev.includes(key) 
        ? prev.filter(k => k !== key) 
        : [...prev, key]
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 flex-grow">
        <div className="space-y-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-2xl font-schabo tracking-wide text-white">Metrics Dashboard</h2>
            
            {/* Date Range Selector */}
            <div className="flex items-center gap-2 bg-[#1a1d29]/60 p-2 rounded-lg border border-gray-800/40">
              <Calendar className="h-4 w-4 text-gray-300" />
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[180px] bg-transparent border-0 focus:ring-0 shadow-none text-white">
                  <SelectValue placeholder="Select Range" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1d29] border-gray-800/60 text-white shadow-lg">
                  {dateRanges.map((range) => (
                    <SelectItem 
                      key={range.value} 
                      value={range.value}
                      className="hover:bg-[#1e2235]/80 focus:bg-[#1e2235]/80 text-gray-300 focus:text-white"
                    >
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Stat Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard 
              title="Total Members" 
              value={latestData.total.toLocaleString()} 
              icon={Users} 
              change={`${totalChange > 0 ? '+' : ''}${totalChange}%`}
              trend={totalChange > 0 ? "up" : totalChange < 0 ? "down" : "neutral"}
            />
            <StatCard 
              title="Delegates" 
              value={latestData.pilots.toLocaleString()} 
              icon={UserCheck} 
              change={`${delegatesChange > 0 ? '+' : ''}${delegatesChange}%`}
              trend={delegatesChange > 0 ? "up" : delegatesChange < 0 ? "down" : "neutral"}
            />
            <StatCard 
              title="Voters" 
              value={latestData.verified.toLocaleString()} 
              icon={Vote} 
              change={`${votersChange > 0 ? '+' : ''}${votersChange}%`}
              trend={votersChange > 0 ? "up" : votersChange < 0 ? "down" : "neutral"}
            />
            <StatCard 
              title="New Members" 
              value={latestData.newMembers.toLocaleString()} 
              icon={UserPlus} 
              change={`${latestData.newMembers > previousMonthData.newMembers ? '+' : ''}${latestData.newMembers - previousMonthData.newMembers}`}
              trend={latestData.newMembers > previousMonthData.newMembers ? "up" : latestData.newMembers < previousMonthData.newMembers ? "down" : "neutral"}
            />
          </div>
          
          {/* Charts */}
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-[#1a1d29]/80 border-gray-800/60">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white font-schabo tracking-wide">User Growth</CardTitle>
                  <CardDescription className="text-gray-300">
                    Member growth over time
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 border-gray-700/50 bg-[#0c0e14]/80 hover:bg-[#1e2235]/80 text-white">
                      <TrendingUp className="h-4 w-4 mr-2" /> Customize
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#1a1d29] border-gray-800/60 text-white shadow-lg">
                    <DropdownMenuItem 
                      className={`flex items-center gap-2 hover:bg-[#1e2235]/80 focus:bg-[#1e2235]/80 cursor-pointer ${activeUserDataKeys.includes("total") ? "text-white" : "text-gray-300"}`}
                      onClick={() => toggleDataSeries("total")}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#8884d8]"></div>
                      Total Members
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={`flex items-center gap-2 hover:bg-[#1e2235]/80 focus:bg-[#1e2235]/80 cursor-pointer ${activeUserDataKeys.includes("verified") ? "text-white" : "text-gray-300"}`}
                      onClick={() => toggleDataSeries("verified")}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#82ca9d]"></div>
                      Verified Users
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={`flex items-center gap-2 hover:bg-[#1e2235]/80 focus:bg-[#1e2235]/80 cursor-pointer ${activeUserDataKeys.includes("pilots") ? "text-white" : "text-gray-300"}`}
                      onClick={() => toggleDataSeries("pilots")}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#ffc658]"></div>
                      Pilots
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={`flex items-center gap-2 hover:bg-[#1e2235]/80 focus:bg-[#1e2235]/80 cursor-pointer ${activeUserDataKeys.includes("newMembers") ? "text-white" : "text-gray-300"}`}
                      onClick={() => toggleDataSeries("newMembers")}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#ff7300]"></div>
                      New Members
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userJoinData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <XAxis 
                      dataKey="date" 
                      stroke="#aaaaaa" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis
                      stroke="#aaaaaa"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      iconType="circle" 
                      iconSize={8}
                      wrapperStyle={{ paddingTop: "10px", color: "#ffffff" }}
                    />
                    {activeUserDataKeys.includes("total") && (
                      <Line 
                        name="Total Members" 
                        type="monotone" 
                        dataKey="total" 
                        stroke="#8884d8" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                        activeDot={{ r: 6, strokeWidth: 2 }}
                      />
                    )}
                    {activeUserDataKeys.includes("verified") && (
                      <Line 
                        name="Verified Users" 
                        type="monotone" 
                        dataKey="verified" 
                        stroke="#82ca9d" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                        activeDot={{ r: 6, strokeWidth: 2 }}
                      />
                    )}
                    {activeUserDataKeys.includes("pilots") && (
                      <Line 
                        name="Pilots" 
                        type="monotone" 
                        dataKey="pilots" 
                        stroke="#ffc658" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                        activeDot={{ r: 6, strokeWidth: 2 }}
                      />
                    )}
                    {activeUserDataKeys.includes("newMembers") && (
                      <Line 
                        name="New Members" 
                        type="monotone" 
                        dataKey="newMembers" 
                        stroke="#ff7300" 
                        strokeWidth={2} 
                        dot={{ r: 4 }}
                        activeDot={{ r: 6, strokeWidth: 2 }}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter className="text-xs text-gray-300 border-t border-gray-800/40 pt-3">
                Last updated: December 31, 2023
              </CardFooter>
            </Card>
            
            <Card className="bg-[#1a1d29]/80 border-gray-800/60">
              <CardHeader>
                <CardTitle className="text-white font-schabo tracking-wide">Pilot Voting Rate</CardTitle>
                <CardDescription className="text-gray-300">
                  Percentage of pilots participating in voting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={pilotVotingData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <XAxis 
                      dataKey="date" 
                      stroke="#aaaaaa" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis
                      stroke="#aaaaaa"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36} 
                      iconType="circle" 
                      iconSize={8}
                      wrapperStyle={{ paddingTop: "10px", color: "#ffffff" }}
                    />
                    <Line 
                      name="Voting Rate" 
                      type="monotone" 
                      dataKey="votingRate" 
                      stroke="#82ca9d" 
                      strokeWidth={2} 
                      dot={{ r: 4 }}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                    />
                    <Line 
                      name="Proposals" 
                      type="monotone" 
                      dataKey="proposalsCount" 
                      stroke="#8884d8" 
                      strokeWidth={2} 
                      dot={{ r: 4 }}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter className="text-xs text-gray-300 border-t border-gray-800/40 pt-3">
                Last updated: December 31, 2023
              </CardFooter>
            </Card>
          </div>
          
          {/* Additional Metrics Section */}
          <Card className="bg-[#1a1d29]/80 border-gray-800/60 mb-8">
            <CardHeader>
              <CardTitle className="text-white font-schabo tracking-wide">Key Performance Indicators</CardTitle>
              <CardDescription className="text-gray-300">
                Summary of important metrics for the current period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col space-y-2">
                  <span className="text-sm text-gray-300">Member Retention Rate</span>
                  <span className="text-2xl font-bold text-white">94.8%</span>
                  <div className="flex items-center text-xs text-emerald-400">
                    <ChevronUp className="h-3 w-3 mr-1" />
                    <span>+2.3% from previous period</span>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">Percentage of members who remain active after joining</p>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <span className="text-sm text-gray-300">Average Engagement Score</span>
                  <span className="text-2xl font-bold text-white">7.6/10</span>
                  <div className="flex items-center text-xs text-emerald-400">
                    <ChevronUp className="h-3 w-3 mr-1" />
                    <span>+0.4 from previous period</span>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">Based on participation in discussions and voting</p>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <span className="text-sm text-gray-300">Proposal Success Rate</span>
                  <span className="text-2xl font-bold text-white">68%</span>
                  <div className="flex items-center text-xs text-red-400">
                    <ChevronDown className="h-3 w-3 mr-1" />
                    <span>-3% from previous period</span>
                  </div>
                  <p className="text-xs text-gray-300 mt-1">Percentage of proposals that pass voting</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

