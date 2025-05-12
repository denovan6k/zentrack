"use client"

import { useState } from "react"
import { Plus, Search, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface Recipient {
  id: string
  name: string
  walletAddress: string
  totalPaid: number
  activePayments: number
  lastPayment: string
}

export default function RecipientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  // Mock data for recipients
  const recipients: Recipient[] = [
    {
      id: "rec_1",
      name: "Content Creator",
      walletAddress: "0x1a2b...3c4d",
      totalPaid: 80,
      activePayments: 1,
      lastPayment: "May 1, 2023",
    },
    {
      id: "rec_2",
      name: "NFT Marketplace",
      walletAddress: "0x5e6f...7g8h",
      totalPaid: 150,
      activePayments: 1,
      lastPayment: "April 20, 2023",
    },
    {
      id: "rec_3",
      name: "DeFi Protocol",
      walletAddress: "0x9i0j...1k2l",
      totalPaid: 100,
      activePayments: 1,
      lastPayment: "April 1, 2023",
    },
    {
      id: "rec_4",
      name: "Gaming Platform",
      walletAddress: "0xabcd...efgh",
      totalPaid: 45,
      activePayments: 0,
      lastPayment: "April 25, 2023",
    },
  ]

  const filteredRecipients = recipients.filter((recipient) => {
    return (
      recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipient.walletAddress.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const handleAddRecipient = () => {
    toast({
      title: "Add Recipient",
      description: "This feature will be available soon.",
    })
  }

  const handleViewRecipient = (id: string) => {
    toast({
      title: "View Recipient",
      description: `Viewing details for recipient ${id}`,
    })
  }

  const handleEditRecipient = (id: string) => {
    toast({
      title: "Edit Recipient",
      description: `Editing recipient ${id}`,
    })
  }

  const handleDeleteRecipient = (id: string) => {
    toast({
      title: "Delete Recipient",
      description: `Recipient ${id} has been deleted`,
    })
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Recipients</h1>
          <p className="text-muted-foreground">Manage your payment recipients</p>
        </div>
        <Button className="bg-[#4C2A85] hover:bg-[#3b2064]" onClick={handleAddRecipient}>
          <Plus className="mr-2 h-4 w-4" />
          Add Recipient
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <CardTitle>Your Recipients</CardTitle>
            <CardDescription>Manage and view your payment recipients</CardDescription>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search recipients..."
              className="pl-8 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Wallet Address</TableHead>
                  <TableHead>Total Paid</TableHead>
                  <TableHead>Active Payments</TableHead>
                  <TableHead>Last Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecipients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No recipients found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRecipients.map((recipient) => (
                    <TableRow key={recipient.id}>
                      <TableCell className="font-medium">{recipient.name}</TableCell>
                      <TableCell>{recipient.walletAddress}</TableCell>
                      <TableCell>${recipient.totalPaid.toFixed(2)}</TableCell>
                      <TableCell>{recipient.activePayments}</TableCell>
                      <TableCell>{recipient.lastPayment}</TableCell>
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
                            <DropdownMenuItem onClick={() => handleViewRecipient(recipient.id)}>
                              View details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditRecipient(recipient.id)}>
                              Edit recipient
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteRecipient(recipient.id)}
                            >
                              Delete recipient
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
    </div>
  )
}
