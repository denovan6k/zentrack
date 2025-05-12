"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentTrendsChart } from "@/components/payment-trends-chart"
import { SpendingBreakdownChart } from "@/components/spending-breakdown-chart"
import { SpendingTrendsChart } from "@/components/spending-trends-chart"
import { TopSpendingCategories } from "@/components/top-spending-categories"
import { RecipientPaymentVolumeChart } from "@/components/recipient-payment-volume-chart"
import { RecipientGrowthChart } from "@/components/recipient-growth-chart"
import { RecipientPaymentFrequency } from "@/components/recipient-payment-frequency"
import { Button } from "@/components/ui/button"
import { Calendar, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function AnalyticsPage() {
  const { toast } = useToast()
  const [timeRange, setTimeRange] = useState("6months")

  const handleExportData = () => {
    toast({
      title: "Exporting Data",
      description: "Your analytics data is being prepared for download.",
    })

    // Prepare data for export based on the current tab and time range
    const exportData = {
      overview: {
        totalSpent: 1240,
        activeSubscriptions: 3,
        averagePayment: 40,
        paymentTrends: [
          { month: "Jan", outgoing: 80, incoming: 20 },
          { month: "Feb", outgoing: 120, incoming: 40 },
          { month: "Mar", outgoing: 140, incoming: 30 },
          { month: "Apr", outgoing: 160, incoming: 50 },
          { month: "May", outgoing: 180, incoming: 60 },
          { month: "Jun", outgoing: 120, incoming: 15 },
        ],
      },
      spending: {
        breakdown: [
          { name: "Content Subscriptions", value: 420 },
          { name: "NFT Memberships", value: 350 },
          { name: "DeFi Services", value: 280 },
          { name: "Gaming", value: 120 },
          { name: "Education", value: 70 },
        ],
        trends: [
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
        ],
      },
      recipients: {
        topRecipients: [
          { name: "Content Creator", volume: 240, transactions: 12 },
          { name: "NFT Marketplace", volume: 200, transactions: 4 },
          { name: "DeFi Protocol", volume: 180, transactions: 6 },
          { name: "Gaming Platform", volume: 120, transactions: 8 },
          { name: "Education Service", volume: 70, transactions: 7 },
        ],
        growth: [
          { month: "Jan", total: 3, new: 3 },
          { month: "Feb", total: 5, new: 2 },
          { month: "Mar", total: 7, new: 2 },
          { month: "Apr", total: 8, new: 1 },
          { month: "May", total: 10, new: 2 },
          { month: "Jun", total: 12, new: 2 },
        ],
      },
    }

    // Convert to JSON string
    const jsonString = JSON.stringify(exportData, null, 2)

    // Create a blob from the JSON string
    const blob = new Blob([jsonString], { type: "application/json" })

    // Create a URL for the blob
    const url = URL.createObjectURL(blob)

    // Create a temporary anchor element to trigger the download
    const a = document.createElement("a")
    a.href = url
    a.download = `zenpay-analytics-${timeRange}-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()

    // Clean up
    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      toast({
        title: "Export Complete",
        description: "Your analytics data has been downloaded successfully.",
      })
    }, 100)
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Track and analyze your payment activities</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" onClick={handleExportData}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="spending">Spending</TabsTrigger>
          <TabsTrigger value="recipients">Recipients</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Total Spent</CardTitle>
                <CardDescription>All time payment volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$1,240.00</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Active Subscriptions</CardTitle>
                <CardDescription>Current recurring payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">+1 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Average Payment</CardTitle>
                <CardDescription>Per subscription</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">$40.00</div>
                <p className="text-xs text-muted-foreground">-5% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payment Trends</CardTitle>
              <CardDescription>Your payment activity over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentTrendsChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="spending" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Spending Breakdown</CardTitle>
                <CardDescription>Your spending by category</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <SpendingBreakdownChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Spending Categories</CardTitle>
                <CardDescription>Where your money is going</CardDescription>
              </CardHeader>
              <CardContent>
                <TopSpendingCategories />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Spending Trends</CardTitle>
              <CardDescription>Monthly spending patterns by category</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <SpendingTrendsChart />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recipients" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Recipients</CardTitle>
                <CardDescription>By payment volume</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <RecipientPaymentVolumeChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recipient Growth</CardTitle>
                <CardDescription>New recipients over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <RecipientGrowthChart />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payment Frequency</CardTitle>
              <CardDescription>How often you pay each recipient</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <RecipientPaymentFrequency />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
