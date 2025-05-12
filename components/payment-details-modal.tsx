"use client"

import { Calendar, CreditCard, DollarSign, Clock, CheckCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface PaymentDetailsModalProps {
  payment: any
  isOpen: boolean
  onClose: () => void
}

export function PaymentDetailsModal({ payment, isOpen, onClose }: PaymentDetailsModalProps) {
  const { toast } = useToast()

  const handlePausePayment = () => {
    toast({
      title: "Payment Paused",
      description: `${payment.name} has been paused successfully.`,
    })
    onClose()
  }

  const handleCancelPayment = () => {
    toast({
      title: "Payment Cancelled",
      description: `${payment.name} has been cancelled successfully.`,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Payment Details</DialogTitle>
          <DialogDescription>View and manage your recurring payment details</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4C2A85]/10">
              <CreditCard className="h-6 w-6 text-[#4C2A85]" />
            </div>
            <div>
              <h3 className="text-lg font-medium">{payment.name}</h3>
              <p className="text-sm text-muted-foreground">{payment.description}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Recipient</p>
              <p className="font-medium">{payment.recipient}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Status</p>
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
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Amount</p>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">{payment.amount.toFixed(2)} USDC</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Frequency</p>
              <p className="font-medium">{payment.frequency}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Start Date</p>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">{payment.startDate}</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Next Payment</p>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <p className="font-medium">{payment.nextPaymentDate}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <h4 className="font-medium">Payment History</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-md border p-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{payment.startDate}</span>
                </div>
                <span className="font-medium">${payment.amount.toFixed(2)}</span>
              </div>
              {payment.paymentsMade > 1 && (
                <div className="flex items-center justify-between rounded-md border p-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">
                      {new Date(
                        new Date(payment.startDate).setMonth(new Date(payment.startDate).getMonth() + 1),
                      ).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <span className="font-medium">${payment.amount.toFixed(2)}</span>
                </div>
              )}
              {payment.paymentsMade > 2 && (
                <div className="flex items-center justify-between rounded-md border p-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">
                      {new Date(
                        new Date(payment.startDate).setMonth(new Date(payment.startDate).getMonth() + 2),
                      ).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <span className="font-medium">${payment.amount.toFixed(2)}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="sm:flex-1">
            Close
          </Button>
          <Button variant="outline" onClick={handlePausePayment} className="sm:flex-1">
            {payment.status === "active" ? "Pause Payment" : "Resume Payment"}
          </Button>
          <Button variant="destructive" onClick={handleCancelPayment} className="sm:flex-1">
            Cancel Payment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
