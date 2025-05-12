"use client"

import { useState } from "react"
import { Filter, Search, ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { NewPaymentDialog } from "@/components/new-payment-dialog"
import { PaymentDetailsModal } from "@/components/payment-details-modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  // Mock data for active payments
  const activePayments = [
    {
      id: "pay_1",
      name: "Content Creator Subscription",
      recipient: "0x1a2b...3c4d",
      amount: 20,
      frequency: "Monthly",
      nextPaymentDate: "May 15, 2023",
      status: "active",
      startDate: "Jan 15, 2023",
      description: "Monthly subscription to premium content",
      totalPaid: 80,
      paymentsMade: 4,
    },
    {
      id: "pay_2",
      name: "NFT Membership",
      recipient: "0x5e6f...7g8h",
      amount: 50,
      frequency: "Monthly",
      nextPaymentDate: "May 20, 2023",
      status: "active",
      startDate: "Feb 20, 2023",
      description: "Access to exclusive NFT collection",
      totalPaid: 150,
      paymentsMade: 3,
    },
    {
      id: "pay_3",
      name: "DeFi Savings Plan",
      recipient: "0x9i0j...1k2l",
      amount: 50,
      frequency: "Monthly",
      nextPaymentDate: "June 1, 2023",
      status: "active",
      startDate: "Mar 1, 2023",
      description: "Automated savings into DeFi protocol",
      totalPaid: 100,
      paymentsMade: 2,
    },
    {
      id: "pay_4",
      name: "Gaming Subscription",
      recipient: "0xabcd...efgh",
      amount: 15,
      frequency: "Monthly",
      nextPaymentDate: "May 25, 2023",
      status: "paused",
      startDate: "Jan 25, 2023",
      description: "Monthly gaming platform subscription",
      totalPaid: 45,
      paymentsMade: 3,
    },
  ]

  // Mock data for payment history
  const paymentHistory = [
    {
      id: "tx_1",
      name: "Content Creator Subscription",
      recipient: "0x1a2b...3c4d",
      amount: 20,
      date: "May 1, 2023",
      status: "completed",
      txHash: "0xabc...123",
    },
    {
      id: "tx_2",
      name: "NFT Membership",
      recipient: "0x5e6f...7g8h",
      amount: 50,
      date: "April 20, 2023",
      status: "completed",
      txHash: "0xdef...456",
    },
    {
      id: "tx_3",
      name: "DeFi Savings Plan",
      recipient: "0x9i0j...1k2l",
      amount: 50,
      date: "April 1, 2023",
      status: "completed",
      txHash: "0xghi...789",
    },
    {
      id: "tx_4",
      name: "Gaming Subscription",
      recipient: "0xabcd...efgh",
      amount: 15,
      date: "April 25, 2023",
      status: "failed",
      txHash: "0xjkl...012",
    },
    {
      id: "tx_5",
      name: "Content Creator Subscription",
      recipient: "0x1a2b...3c4d",
      amount: 20,
      date: "April 1, 2023",
      status: "completed",
      txHash: "0xmno...345",
    },
    {
      id: "tx_6",
      name: "NFT Membership",
      recipient: "0x5e6f...7g8h",
      amount: 50,
      date: "March 20, 2023",
      status: "completed",
      txHash: "0xpqr...678",
    },
  ]

  const filteredActivePayments = activePayments.filter((payment) => {
    const matchesSearch =
      payment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.recipient.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleViewPaymentDetails = (payment: any) => {
    setSelectedPayment(payment)
    setIsDetailsModalOpen(true)
  }

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
              <p className="text-muted-foreground">Manage your recurring payments and view transaction history</p>
            </div>
            <NewPaymentDialog />
          </div>

          <Tabs defaultValue="active" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="active">Active Payments</TabsTrigger>
              <TabsTrigger value="history">Payment History</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-1">
                      <CardTitle>Active Recurring Payments</CardTitle>
                      <CardDescription>Manage your current recurring payment agreements</CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Search payments..."
                          className="pl-8 w-full sm:w-[200px] md:w-[250px]"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-[150px]">
                          <div className="flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            <SelectValue placeholder="Filter" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Statuses</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="paused">Paused</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Recipient</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Frequency</TableHead>
                          <TableHead>Next Payment</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredActivePayments.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="h-24 text-center">
                              No payments found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredActivePayments.map((payment) => (
                            <TableRow key={payment.id}>
                              <TableCell className="font-medium">{payment.name}</TableCell>
                              <TableCell>{payment.recipient}</TableCell>
                              <TableCell>${payment.amount.toFixed(2)}</TableCell>
                              <TableCell>{payment.frequency}</TableCell>
                              <TableCell>{payment.nextPaymentDate}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={payment.status === "active" ? "default" : "secondary"}
                                  className={
                                    payment.status === "active"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300"
                                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300"
                                  }
                                >
                                  {payment.status === "active" ? "Active" : "Paused"}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                      <span className="sr-only">Open menu</span>
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => handleViewPaymentDetails(payment)}>
                                      View details
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      {payment.status === "active" ? "Pause payment" : "Resume payment"}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                      Cancel payment
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="space-y-1">
                      <CardTitle>Payment History</CardTitle>
                      <CardDescription>View all your past payment transactions</CardDescription>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search transactions..."
                        className="pl-8 w-full sm:w-[250px] md:w-[300px]"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Recipient</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Transaction Hash</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paymentHistory.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-medium">{transaction.name}</TableCell>
                            <TableCell>{transaction.recipient}</TableCell>
                            <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell>
                              <Badge
                                variant={transaction.status === "completed" ? "default" : "destructive"}
                                className={
                                  transaction.status === "completed"
                                    ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300"
                                    : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-300"
                                }
                              >
                                {transaction.status === "completed" ? "Completed" : "Failed"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className="font-mono text-xs">{transaction.txHash}</span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">View transaction</span>
                                <ArrowUpDown className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <PaymentDetailsModal payment={selectedPayment} isOpen={isDetailsModalOpen} onClose={handleCloseDetailsModal} />
      )}
    </div>
  )
}
