"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { useToast } from "@/hooks/use-toast"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function PaymentTrendsChart() {
  const { theme } = useTheme()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("line")

  // Mock data for the chart
  const data = [
    { month: "Jan", outgoing: 80, incoming: 20 },
    { month: "Feb", outgoing: 120, incoming: 40 },
    { month: "Mar", outgoing: 140, incoming: 30 },
    { month: "Apr", outgoing: 160, incoming: 50 },
    { month: "May", outgoing: 180, incoming: 60 },
    { month: "Jun", outgoing: 120, incoming: 15 },
  ]

  const handleDataPointClick = (data: any) => {
    toast({
      title: `${data.month} Payments`,
      description: `Outgoing: $${data.outgoing}, Incoming: $${data.incoming}`,
    })
  }

  // Colors based on theme
  const primaryColor = "#4C2A85"
  const secondaryColor = "#9333EA"
  const gridColor = theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
  const textColor = theme === "dark" ? "#e0e0e0" : "#333333"

  return (
    <div className="w-full h-[300px] relative">
      <Tabs defaultValue="line" value={activeTab} onValueChange={setActiveTab} className="absolute top-0 right-0 z-10">
        <TabsList className="grid w-[180px] grid-cols-3">
          <TabsTrigger value="line">Line</TabsTrigger>
          <TabsTrigger value="area">Area</TabsTrigger>
          <TabsTrigger value="bar">Bar</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="w-full h-full">
        {activeTab === "line" && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="month" stroke={textColor} />
              <YAxis stroke={textColor} tickFormatter={(value) => `$${value}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                  borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                }}
                formatter={(value: any) => [`$${value}`, ""]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="outgoing"
                name="Outgoing Payments"
                stroke={primaryColor}
                strokeWidth={3}
                dot={{ r: 6, fill: "#fff", stroke: primaryColor, strokeWidth: 2 }}
                activeDot={{
                  r: 8,
                  onClick: (_, event) => {
                    if (event && event.payload) {
                      handleDataPointClick(event.payload)
                    }
                  },
                }}
              />
              <Line
                type="monotone"
                dataKey="incoming"
                name="Incoming Payments"
                stroke={secondaryColor}
                strokeWidth={3}
                dot={{ r: 6, fill: "#fff", stroke: secondaryColor, strokeWidth: 2 }}
                activeDot={{
                  r: 8,
                  onClick: (_, event) => {
                    if (event && event.payload) {
                      handleDataPointClick(event.payload)
                    }
                  },
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        {activeTab === "area" && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="month" stroke={textColor} />
              <YAxis stroke={textColor} tickFormatter={(value) => `$${value}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                  borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                }}
                formatter={(value: any) => [`$${value}`, ""]}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="outgoing"
                name="Outgoing Payments"
                stroke={primaryColor}
                fill={`${primaryColor}40`}
                strokeWidth={2}
                activeDot={{
                  r: 8,
                  onClick: (_, event) => {
                    if (event && event.payload) {
                      handleDataPointClick(event.payload)
                    }
                  },
                }}
              />
              <Area
                type="monotone"
                dataKey="incoming"
                name="Incoming Payments"
                stroke={secondaryColor}
                fill={`${secondaryColor}40`}
                strokeWidth={2}
                activeDot={{
                  r: 8,
                  onClick: (_, event) => {
                    if (event && event.payload) {
                      handleDataPointClick(event.payload)
                    }
                  },
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {activeTab === "bar" && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="month" stroke={textColor} />
              <YAxis stroke={textColor} tickFormatter={(value) => `$${value}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                  borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                }}
                formatter={(value: any) => [`$${value}`, ""]}
              />
              <Legend />
              <Bar
                dataKey="outgoing"
                name="Outgoing Payments"
                fill={primaryColor}
                radius={[4, 4, 0, 0]}
                onClick={(data) => data && handleDataPointClick(data)}
              />
              <Bar
                dataKey="incoming"
                name="Incoming Payments"
                fill={secondaryColor}
                radius={[4, 4, 0, 0]}
                onClick={(data) => data && handleDataPointClick(data)}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}
