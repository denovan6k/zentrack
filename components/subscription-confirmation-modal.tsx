"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

interface SubscriptionConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  plan: any
  billingCycle: "monthly" | "yearly"
}

export function SubscriptionConfirmationModal({
  isOpen,
  onClose,
  plan,
  billingCycle,
}: SubscriptionConfirmationModalProps) {
  const totalAmount = billingCycle === "yearly" ? plan.yearlyPrice || plan.price * 12 : plan.price
  const nextBillingDate = new Date()

  if (billingCycle === "monthly") {
    nextBillingDate.setMonth(nextBillingDate.getMonth() + 1)
  } else {
    nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1)
  }

  const formattedNextBillingDate = nextBillingDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-300" />
          </div>
          <DialogTitle className="text-center">Subscription Confirmed!</DialogTitle>
          <DialogDescription className="text-center">
            Your subscription to the {plan.name} plan has been successfully processed.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Subscription Details */}
          <div className="rounded-lg border p-4 bg-muted/50 space-y-3">
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">Plan</div>
              <div className="font-medium">{plan.name}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">Billing Cycle</div>
              <div className="font-medium capitalize">{billingCycle}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">Amount</div>
              <div className="font-medium">
                ${totalAmount}/{billingCycle === "monthly" ? "month" : "year"}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">Next Billing Date</div>
              <div className="font-medium">{formattedNextBillingDate}</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">Transaction ID</div>
              <div className="font-mono text-xs">txn_{Math.random().toString(36).substring(2, 10)}</div>
            </div>
          </div>

          {/* What's Next */}
          <div className="space-y-2">
            <h4 className="font-medium">What's Next?</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Your subscription is now active and ready to use</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>You'll receive a confirmation email with your subscription details</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>You can manage your subscription anytime from your account settings</span>
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="w-full bg-[#4C2A85] hover:bg-[#3b2064]">
            Continue to Dashboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
