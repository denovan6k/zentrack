"use client"

import { useTheme } from "next-themes"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useToast } from "@/hooks/use-toast"

// Recipient growth data
const GROWTH_DATA = [
  { month: "Jan", total: 3, new: 3 },
  { month: "Feb", total: 5, new: 2 },
  { month: "Mar", total: 7, new: 2 },
  { month: "Apr", total: 8, new: 1 },
  { month: "May", total: 10, new: 2 },
  { month: "Jun", total: 12, new: 2 },
]

export function RecipientGrowthChart() {
  const { theme } = useTheme()
  const { toast } = useToast()

  const handleDataPointClick = (data: any) => {
    if (data) {
      toast({
        title: `${data.month} Recipient Growth`,
        description: `${data.new} new recipients added, total of ${data.total} recipients`,
      })
    }
  }

  const gridColor = theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
  const textColor = theme === "dark" ? "#e0e0e0" : "#333333"

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={GROWTH_DATA}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        onClick={(data) => data && handleDataPointClick(data.activePayload?.[0]?.payload)}
      >
        <defs>
          <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4C2A85" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#4C2A85" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="newGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#9333EA" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#9333EA" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis dataKey="month" stroke={textColor} />
        <YAxis stroke={textColor} />
        <Tooltip
          contentStyle={{
            backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
            borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
          }}
        />
        <Area
          type="monotone"
          dataKey="total"
          name="Total Recipients"
          stroke="#4C2A85"
          fillOpacity={1}
          fill="url(#totalGradient)"
          activeDot={{ r: 8, onClick: (_, event) => event && handleDataPointClick(event.payload) }}
        />
        <Area
          type="monotone"
          dataKey="new"
          name="New Recipients"
          stroke="#9333EA"
          fillOpacity={1}
          fill="url(#newGradient)"
          activeDot={{ r: 8, onClick: (_, event) => event && handleDataPointClick(event.payload) }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
