"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Calendar, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"

interface SubscriptionManagementCardProps {
  subscription: {
    plan: string
    planName: string
    status: string
    price: number
    billingCycle: "monthly" | "yearly"
    nextBillingDate: string
    startDate: string
  }
}

export function SubscriptionManagementCard({ subscription }: SubscriptionManagementCardProps) {
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleCancelSubscription = () => {
    // In a real app, this would call your API to cancel the subscription
    setIsCancelDialogOpen(false)
    toast({
      title: "Subscription Cancelled",
      description: "Your subscription has been cancelled successfully.",
    })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Subscription Management</CardTitle>
              <CardDescription>Manage your ZenPay subscription</CardDescription>
            </div>
            <Badge
              variant="outline"
              className={
                subscription.status === "active"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
              }
            >
              {subscription.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4C2A85]/10">
              <CreditCard className="h-6 w-6 text-[#4C2A85]" />
            </div>
            <div>
              <div className="font-medium">{subscription.planName} Plan</div>
              <div className="text-sm text-muted-foreground">
                ${subscription.price}/{subscription.billingCycle === "monthly" ? "month" : "year"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Billing Cycle</div>
              <div className="font-medium capitalize">{subscription.billingCycle}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Start Date</div>
              <div className="font-medium">{subscription.startDate}</div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Next Billing Date</div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="font-medium">{subscription.nextBillingDate}</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">Payment Method</div>
              <div className="font-medium">Crypto Wallet (USDC)</div>
            </div>
          </div>

          {subscription.plan !== "free" && (
            <Alert variant="outline" className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
              <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertTitle>Auto-renewal</AlertTitle>
              <AlertDescription>
                Your subscription will automatically renew on {subscription.nextBillingDate}. You can cancel anytime
                before this date.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="sm:flex-1">
            Update Payment Method
          </Button>
          {subscription.plan !== "free" && (
            <Button
              variant="outline"
              className="sm:flex-1 text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-800 dark:hover:bg-red-950"
              onClick={() => setIsCancelDialogOpen(true)}
            >
              Cancel Subscription
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Cancel Subscription Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cancel Subscription</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of
              your current billing period.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Your subscription will remain active until {subscription.nextBillingDate}, after which you'll be
                downgraded to the Free plan.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsCancelDialogOpen(false)} className="sm:flex-1">
              Keep Subscription
            </Button>
            <Button variant="destructive" onClick={handleCancelSubscription} className="sm:flex-1">
              Cancel Subscription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
