"use client"
import { useState } from "react"
import {
  Calendar,
  CreditCard,
  DollarSign,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Eye,
  EyeOff,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { NewPaymentDialog } from "@/components/new-payment-dialog"
import { PaymentTrendsChart } from "@/components/payment-trends-chart"
import { SubscriptionCard } from "@/components/subscription-card"
import { StatsCard } from "@/components/stats-card"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/use-auth"

export default function Dashboard() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [showActivePayments, setShowActivePayments] = useState(false)
  const [showMonthlySpending, setShowMonthlySpending] = useState(false)
  const [showUsdcBalance, setShowUsdcBalance] = useState(false)

  // Mock data for active subscriptions
  const activeSubscriptions = [
    {
      id: "sub_1",
      name: "Content Creator Subscription",
      recipient: "0x1a2b...3c4d",
      amount: 20,
      frequency: "Monthly",
      nextPaymentDate: "May 15, 2023",
      status: "active",
    },
    {
      id: "sub_2",
      name: "NFT Membership",
      recipient: "0x5e6f...7g8h",
      amount: 50,
      frequency: "Monthly",
      nextPaymentDate: "May 20, 2023",
      status: "active",
    },
    {
      id: "sub_3",
      name: "DeFi Savings Plan",
      recipient: "0x9i0j...1k2l",
      amount: 50,
      frequency: "Monthly",
      nextPaymentDate: "June 1, 2023",
      status: "active",
    },
  ]

  // Mock data for recent transactions
  const recentTransactions = [
    {
      id: "tx_1",
      type: "outgoing",
      name: "Content Creator Subscription",
      amount: 20,
      date: "May 1, 2023",
      status: "completed",
    },
    {
      id: "tx_2",
      type: "outgoing",
      name: "NFT Membership",
      amount: 50,
      date: "April 20, 2023",
      status: "completed",
    },
    {
      id: "tx_3",
      type: "incoming",
      name: "Refund from Service XYZ",
      amount: 15,
      date: "April 15, 2023",
      status: "completed",
    },
  ]

  const handleViewSubscription = (subscriptionId: string) => {
    toast({
      title: "Viewing Subscription",
      description: `Opening details for subscription ${subscriptionId}`,
    })
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || user?.walletAddress.substring(0, 8)}! Here's your payment overview.
          </p>
        </div>
        <NewPaymentDialog />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Active Payments"
          value={showActivePayments ? "3" : "•••"}
          description="+1 from last month"
          icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
          action={
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 text-muted-foreground"
              onClick={() => setShowActivePayments(!showActivePayments)}
            >
              {showActivePayments ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              <span className="sr-only">{showActivePayments ? "Hide" : "Show"} active payments</span>
            </Button>
          }
        />
        <StatsCard
          title="Monthly Spending"
          value={showMonthlySpending ? "$120.00" : "••••••"}
          description="+$20.00 from last month"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          action={
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 text-muted-foreground"
              onClick={() => setShowMonthlySpending(!showMonthlySpending)}
            >
              {showMonthlySpending ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              <span className="sr-only">{showMonthlySpending ? "Hide" : "Show"} monthly spending</span>
            </Button>
          }
        />
        <StatsCard
          title="USDC Balance"
          value={showUsdcBalance ? "$450.00" : "••••••"}
          description="Updated just now"
          icon={<Wallet className="h-4 w-4 text-muted-foreground" />}
          action={
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 text-muted-foreground"
              onClick={() => setShowUsdcBalance(!showUsdcBalance)}
            >
              {showUsdcBalance ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              <span className="sr-only">{showUsdcBalance ? "Hide" : "Show"} USDC balance</span>
            </Button>
          }
        />
        <StatsCard
          title="Next Payment"
          value="May 15, 2023"
          description="Content Creator Subscription"
          icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        {/* Payment Trends Chart */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Payment Trends</CardTitle>
            <CardDescription>Your payment activity over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <PaymentTrendsChart />
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="md:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest payment activities</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => toast({ title: "Viewing all transactions" })}
            >
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center gap-4">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      transaction.type === "outgoing" ? "bg-red-100 dark:bg-red-900" : "bg-green-100 dark:bg-green-900"
                    }`}
                  >
                    {transaction.type === "outgoing" ? (
                      <ArrowUpRight
                        className={`h-5 w-5 ${
                          transaction.type === "outgoing"
                            ? "text-red-600 dark:text-red-400"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      />
                    ) : (
                      <ArrowDownRight
                        className={`h-5 w-5 ${
                          transaction.type === "outgoing"
                            ? "text-red-600 dark:text-red-400"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{transaction.name}</p>
                    <p className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {transaction.date}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <p
                      className={`text-sm font-medium ${
                        transaction.type === "outgoing"
                          ? "text-red-600 dark:text-red-400"
                          : "text-green-600 dark:text-green-400"
                      }`}
                    >
                      {transaction.type === "outgoing" ? "-" : "+"}${transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">USDC</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Subscriptions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <CardTitle>Active Subscriptions</CardTitle>
            <CardDescription>Your current recurring payment agreements</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => toast({ title: "Managing all subscriptions" })}>
            Manage All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeSubscriptions.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                onView={() => handleViewSubscription(subscription.id)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
