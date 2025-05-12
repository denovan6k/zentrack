"use client"

import { useTheme } from "next-themes"
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useToast } from "@/hooks/use-toast"

// Top recipients by payment volume
const RECIPIENTS = [
  { name: "Content Creator", volume: 240, transactions: 12 },
  { name: "NFT Marketplace", volume: 200, transactions: 4 },
  { name: "DeFi Protocol", volume: 180, transactions: 6 },
  { name: "Gaming Platform", volume: 120, transactions: 8 },
  { name: "Education Service", volume: 70, transactions: 7 },
]

export function RecipientPaymentVolumeChart() {
  const { theme } = useTheme()
  const { toast } = useToast()

  const handleBarClick = (data: any) => {
    if (data && data.payload) {
      toast({
        title: data.payload.name,
        description: `Total: $${data.payload.volume} across ${data.payload.transactions} transactions`,
      })
    }
  }

  const gridColor = theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
  const textColor = theme === "dark" ? "#e0e0e0" : "#333333"

  // Sort recipients by volume in descending order
  const sortedRecipients = [...RECIPIENTS].sort((a, b) => b.volume - a.volume)

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={sortedRecipients} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} horizontal={false} />
        <XAxis type="number" stroke={textColor} tickFormatter={(value) => `$${value}`} />
        <YAxis type="category" dataKey="name" stroke={textColor} tickLine={false} axisLine={false} />
        <Tooltip
          formatter={(value: any) => [`$${value}`, "Payment Volume"]}
          contentStyle={{
            backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
            borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
          }}
          cursor={{ fill: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}
        />
        <Bar dataKey="volume" radius={[0, 4, 4, 0]} onClick={handleBarClick}>
          {sortedRecipients.map((entry, index) => {
            // Create a gradient from primary color to lighter shades
            const color = index === 0 ? "#4C2A85" : `rgba(76, 42, 133, ${1 - index * 0.15})`

            return <Cell key={`cell-${index}`} fill={color} />
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
