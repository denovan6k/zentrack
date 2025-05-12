"use client"

import { Calendar, CreditCard, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SubscriptionCardProps {
  subscription: {
    id: string
    name: string
    recipient: string
    amount: number
    frequency: string
    nextPaymentDate: string
    status: string
  }
  onView: () => void
}

export function SubscriptionCard({ subscription, onView }: SubscriptionCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4C2A85]/10">
                <CreditCard className="h-5 w-5 text-[#4C2A85]" />
              </div>
              <div>
                <h3 className="font-medium">{subscription.name}</h3>
                <p className="text-sm text-muted-foreground">{subscription.recipient}</p>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={onView}>View details</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Edit payment</DropdownMenuItem>
                <DropdownMenuItem>Pause payment</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Cancel payment</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="font-medium">${subscription.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Frequency</span>
              <span>{subscription.frequency}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Next Payment</span>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <span>{subscription.nextPaymentDate}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between px-6 py-3 bg-muted/50">
          <Badge
            variant={subscription.status === "active" ? "default" : "secondary"}
            className={
              subscription.status === "active"
                ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300"
                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300"
            }
          >
            {subscription.status === "active" ? "Active" : "Paused"}
          </Badge>
          <Button variant="ghost" size="sm" onClick={onView}>
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
