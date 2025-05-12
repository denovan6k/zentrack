"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from "recharts"
import { useToast } from "@/hooks/use-toast"

// Spending categories with colors
const CATEGORIES = [
  { name: "Content Subscriptions", value: 420, color: "#4C2A85" },
  { name: "NFT Memberships", value: 350, color: "#9333EA" },
  { name: "DeFi Services", value: 280, color: "#C084FC" },
  { name: "Gaming", value: 120, color: "#E879F9" },
  { name: "Education", value: 70, color: "#F0ABFC" },
]

// Custom active shape for the pie chart
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props

  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill={fill} className="text-lg font-medium">
        {payload.name}
      </text>
      <text x={cx} y={cy + 15} dy={8} textAnchor="middle" fill={fill} className="text-lg font-bold">
        ${value}
      </text>
      <text x={cx} y={cy + 35} dy={8} textAnchor="middle" fill={fill} className="text-sm">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius - 5}
        outerRadius={innerRadius - 2}
        fill={fill}
      />
    </g>
  )
}

export function SpendingBreakdownChart() {
  const { theme } = useTheme()
  const { toast } = useToast()
  const [activeIndex, setActiveIndex] = useState(0)

  const handlePieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const handlePieClick = (data: any) => {
    toast({
      title: data.name,
      description: `$${data.value} (${((data.value / CATEGORIES.reduce((sum, cat) => sum + cat.value, 0)) * 100).toFixed(0)}% of total spending)`,
    })
  }

  const textColor = theme === "dark" ? "#e0e0e0" : "#333333"
  const total = CATEGORIES.reduce((sum, category) => sum + category.value, 0)

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={CATEGORIES}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              dataKey="value"
              onMouseEnter={handlePieEnter}
              onClick={handlePieClick}
            >
              {CATEGORIES.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: any) => [`$${value}`, "Amount"]}
              contentStyle={{
                backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
              }}
            />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              formatter={(value, entry, index) => (
                <span style={{ color: textColor }}>
                  {value} (${CATEGORIES[index].value})
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Total Spending: <span className="font-bold">${total}</span>
        </p>
      </div>
    </div>
  )
}
