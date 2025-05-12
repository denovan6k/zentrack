"use client"

import type React from "react"

import { useTheme } from "next-themes"
import { Progress } from "@/components/ui/progress"

// Spending categories with colors
const CATEGORIES = [
  { name: "Content Subscriptions", value: 420, color: "#4C2A85" },
  { name: "NFT Memberships", value: 350, color: "#9333EA" },
  { name: "DeFi Services", value: 280, color: "#C084FC" },
  { name: "Gaming", value: 120, color: "#E879F9" },
  { name: "Education", value: 70, color: "#F0ABFC" },
]

export function TopSpendingCategories() {
  const { theme } = useTheme()
  const total = CATEGORIES.reduce((sum, category) => sum + category.value, 0)

  // Sort categories by value in descending order
  const sortedCategories = [...CATEGORIES].sort((a, b) => b.value - a.value)

  return (
    <div className="space-y-6">
      {sortedCategories.map((category, index) => {
        const percentage = (category.value / total) * 100

        return (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.color }} />
                <span className="font-medium">{category.name}</span>
              </div>
              <div className="text-right">
                <span className="font-bold">${category.value}</span>
                <span className="text-muted-foreground text-sm ml-1">({percentage.toFixed(0)}%)</span>
              </div>
            </div>
            <Progress
              value={percentage}
              className="h-2"
              style={
                {
                  backgroundColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                  "--progress-background": category.color,
                } as React.CSSProperties
              }
            />
          </div>
        )
      })}

      <div className="pt-2 border-t">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total Spending</span>
          <span className="font-bold">${total}</span>
        </div>
      </div>
    </div>
  )
}
