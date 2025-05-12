"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

// Monthly spending data by category
const MONTHLY_DATA = [
  {
    month: "Jan",
    "Content Subscriptions": 60,
    "NFT Memberships": 40,
    "DeFi Services": 30,
    Gaming: 20,
    Education: 10,
  },
  {
    month: "Feb",
    "Content Subscriptions": 70,
    "NFT Memberships": 50,
    "DeFi Services": 40,
    Gaming: 15,
    Education: 10,
  },
  {
    month: "Mar",
    "Content Subscriptions": 65,
    "NFT Memberships": 60,
    "DeFi Services": 45,
    Gaming: 20,
    Education: 15,
  },
  {
    month: "Apr",
    "Content Subscriptions": 75,
    "NFT Memberships": 65,
    "DeFi Services": 55,
    Gaming: 25,
    Education: 10,
  },
  {
    month: "May",
    "Content Subscriptions": 80,
    "NFT Memberships": 70,
    "DeFi Services": 60,
    Gaming: 20,
    Education: 15,
  },
  {
    month: "Jun",
    "Content Subscriptions": 70,
    "NFT Memberships": 65,
    "DeFi Services": 50,
    Gaming: 20,
    Education: 10,
  },
]

// Category colors
const CATEGORY_COLORS = {
  "Content Subscriptions": "#4C2A85",
  "NFT Memberships": "#9333EA",
  "DeFi Services": "#C084FC",
  Gaming: "#E879F9",
  Education: "#F0ABFC",
}

// Chart view options
const VIEW_OPTIONS = [
  { id: "stacked", name: "Stacked" },
  { id: "grouped", name: "Grouped" },
]

export function SpendingTrendsChart() {
  const { theme } = useTheme()
  const { toast } = useToast()
  const [chartView, setChartView] = useState("stacked")

  const handleBarClick = (data: any) => {
    if (data && data.month) {
      const total = Object.keys(data)
        .filter((key) => key !== "month")
        .reduce((sum, key) => sum + (data[key] || 0), 0)

      toast({
        title: `${data.month} Spending`,
        description: `Total: $${total} across all categories`,
      })
    }
  }

  const gridColor = theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
  const textColor = theme === "dark" ? "#e0e0e0" : "#333333"

  return (
    <div className="w-full h-full">
      <div className="flex justify-end mb-4">
        <div className="inline-flex rounded-md shadow-sm">
          {VIEW_OPTIONS.map((option) => (
            <Button
              key={option.id}
              variant={chartView === option.id ? "default" : "outline"}
              className={`${chartView === option.id ? "bg-[#4C2A85] hover:bg-[#3b2064]" : ""} ${
                option.id === "grouped" ? "rounded-l-none" : "rounded-r-none"
              }`}
              onClick={() => setChartView(option.id)}
            >
              {option.name}
            </Button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={MONTHLY_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} onClick={handleBarClick}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis dataKey="month" stroke={textColor} />
          <YAxis stroke={textColor} tickFormatter={(value) => `$${value}`} />
          <Tooltip
            formatter={(value: any) => [`$${value}`, ""]}
            contentStyle={{
              backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
              borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
            }}
          />
          <Legend />
          {Object.keys(CATEGORY_COLORS).map((category, index) => (
            <Bar
              key={index}
              dataKey={category}
              stackId={chartView === "stacked" ? "a" : index}
              fill={CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
