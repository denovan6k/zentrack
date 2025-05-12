"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

// Payment frequency data
const FREQUENCY_DATA = [
  { name: "Daily", count: 1, color: "#4C2A85" },
  { name: "Weekly", count: 2, color: "#9333EA" },
  { name: "Monthly", count: 7, color: "#C084FC" },
  { name: "Quarterly", count: 2, color: "#E879F9" },
]

// Recipient payment frequency
const RECIPIENT_FREQUENCY = [
  { name: "Content Creator", frequency: "Monthly", lastPayment: "May 1, 2023", nextPayment: "Jun 1, 2023" },
  { name: "NFT Marketplace", frequency: "Monthly", lastPayment: "Apr 20, 2023", nextPayment: "May 20, 2023" },
  { name: "DeFi Protocol", frequency: "Monthly", lastPayment: "Apr 1, 2023", nextPayment: "Jun 1, 2023" },
  { name: "Gaming Platform", frequency: "Weekly", lastPayment: "May 7, 2023", nextPayment: "May 14, 2023" },
  { name: "Education Service", frequency: "Monthly", lastPayment: "Apr 15, 2023", nextPayment: "May 15, 2023" },
  { name: "Podcast Subscription", frequency: "Monthly", lastPayment: "Apr 10, 2023", nextPayment: "May 10, 2023" },
  { name: "News Service", frequency: "Monthly", lastPayment: "Apr 5, 2023", nextPayment: "May 5, 2023" },
  { name: "Crypto Analytics", frequency: "Quarterly", lastPayment: "Mar 1, 2023", nextPayment: "Jun 1, 2023" },
  { name: "Trading Bot", frequency: "Weekly", lastPayment: "May 5, 2023", nextPayment: "May 12, 2023" },
  { name: "Metaverse Land", frequency: "Quarterly", lastPayment: "Feb 15, 2023", nextPayment: "May 15, 2023" },
  { name: "AI Assistant", frequency: "Daily", lastPayment: "May 8, 2023", nextPayment: "May 9, 2023" },
  { name: "Blockchain Storage", frequency: "Monthly", lastPayment: "Apr 25, 2023", nextPayment: "May 25, 2023" },
]

export function RecipientPaymentFrequency() {
  const { theme } = useTheme()
  const { toast } = useToast()
  const [selectedFrequency, setSelectedFrequency] = useState<string | null>(null)

  const handlePieClick = (data: any) => {
    if (data && data.name) {
      setSelectedFrequency(selectedFrequency === data.name ? null : data.name)

      toast({
        title: `${data.name} Payments`,
        description: `${data.count} recipients with ${data.name.toLowerCase()} payment frequency`,
      })
    }
  }

  // Filter recipients based on selected frequency
  const filteredRecipients = selectedFrequency
    ? RECIPIENT_FREQUENCY.filter((r) => r.frequency === selectedFrequency)
    : RECIPIENT_FREQUENCY

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
      <div className="flex flex-col justify-center items-center">
        <div className="text-center mb-4">
          <h3 className="text-lg font-medium">Payment Frequency Distribution</h3>
          <p className="text-sm text-muted-foreground">Click on segments to filter</p>
        </div>

        <div className="w-full h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={FREQUENCY_DATA}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="count"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                onClick={handlePieClick}
              >
                {FREQUENCY_DATA.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke={selectedFrequency === entry.name ? "#fff" : "none"}
                    strokeWidth={selectedFrequency === entry.name ? 2 : 0}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any) => [`${value} recipients`, ""]}
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
                  borderColor: theme === "dark" ? "#374151" : "#e5e7eb",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {FREQUENCY_DATA.map((item, index) => (
            <Badge
              key={index}
              variant="outline"
              className={`cursor-pointer ${
                selectedFrequency === item.name ? "bg-primary text-primary-foreground" : ""
              }`}
              style={{
                borderColor: item.color,
                backgroundColor: selectedFrequency === item.name ? item.color : "transparent",
              }}
              onClick={() => setSelectedFrequency(selectedFrequency === item.name ? null : item.name)}
            >
              {item.name} ({item.count})
            </Badge>
          ))}
          {selectedFrequency && (
            <Badge
              variant="outline"
              className="cursor-pointer bg-destructive text-destructive-foreground"
              onClick={() => setSelectedFrequency(null)}
            >
              Clear Filter
            </Badge>
          )}
        </div>
      </div>

      <div className="md:col-span-2 overflow-auto max-h-[350px] border rounded-md">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-muted/50 sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Recipient
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Frequency
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Last Payment
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Next Payment
              </th>
            </tr>
          </thead>
          <tbody className="bg-background divide-y divide-border">
            {filteredRecipients.map((recipient, index) => {
              // Find the color for this frequency
              const frequencyData = FREQUENCY_DATA.find((f) => f.name === recipient.frequency)

              return (
                <tr key={index} className="hover:bg-muted/50">
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{recipient.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <Badge
                      variant="outline"
                      style={{
                        borderColor: frequencyData?.color,
                        color: frequencyData?.color,
                      }}
                    >
                      {recipient.frequency}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">{recipient.lastPayment}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">{recipient.nextPayment}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
