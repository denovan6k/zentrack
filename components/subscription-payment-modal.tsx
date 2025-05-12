"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Wallet, CreditCard, AlertCircle, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface SubscriptionPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  plan: any
  billingCycle: "monthly" | "yearly"
  onSuccess: () => void
}

export function SubscriptionPaymentModal({
  isOpen,
  onClose,
  plan,
  billingCycle,
  onSuccess,
}: SubscriptionPaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>("wallet")
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [walletAddress, setWalletAddress] = useState<string>("0x1a2b...3c4d") // In a real app, this would come from the connected wallet
  const { toast } = useToast()

  const handlePayment = async () => {
    if (plan.price === 0) {
      onSuccess()
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    try {
      // In a real app, this would call your payment processing API or smart contract
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate successful payment
      onSuccess()
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const totalAmount = billingCycle === "yearly" ? plan.yearlyPrice || plan.price * 12 : plan.price
  const billingText = billingCycle === "yearly" ? "year" : "month"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Subscribe to {plan.name} Plan</DialogTitle>
          <DialogDescription>
            {billingCycle === "yearly"
              ? "You'll be billed annually for your subscription."
              : "You'll be billed monthly for your subscription."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Plan Summary */}
          <div className="rounded-lg border p-4 bg-muted/50">
            <div className="flex justify-between items-center mb-4">
              <div className="font-medium">{plan.name} Plan</div>
              <div className="font-bold">
                ${plan.price}/{billingText}
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Billing cycle</span>
                <span className="capitalize">{billingCycle}</span>
              </div>
              {billingCycle === "yearly" && plan.saveAmount && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">You save</span>
                  <span className="text-green-600">${plan.saveAmount}/year</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total amount</span>
                <span>${totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-4">
            <Label>Select Payment Method</Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
              <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="wallet" id="wallet" />
                <Label htmlFor="wallet" className="flex items-center cursor-pointer">
                  <Wallet className="h-5 w-5 mr-2 text-[#4C2A85]" />
                  <div>
                    <div>Crypto Wallet</div>
                    <div className="text-sm text-muted-foreground">Pay with USDC from your connected wallet</div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="card" id="card" disabled />
                <Label htmlFor="card" className="flex items-center cursor-pointer opacity-50">
                  <CreditCard className="h-5 w-5 mr-2 text-muted-foreground" />
                  <div>
                    <div>Credit Card</div>
                    <div className="text-sm text-muted-foreground">Coming soon</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Connected Wallet Info */}
          {paymentMethod === "wallet" && (
            <div className="rounded-md border p-3 bg-muted/30">
              <div className="flex justify-between items-center">
                <div className="text-sm">Connected Wallet</div>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  Change
                </Button>
              </div>
              <div className="font-mono text-sm mt-1">{walletAddress}</div>
            </div>
          )}

          <Separator />

          {/* Payment Terms */}
          <Alert variant="outline">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              By proceeding, you agree to authorize recurring payments. You can cancel your subscription at any time
              from your account settings.
            </AlertDescription>
          </Alert>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onClose} className="sm:flex-1" disabled={isProcessing}>
            Cancel
          </Button>
          <Button onClick={handlePayment} className="sm:flex-1 bg-[#4C2A85] hover:bg-[#3b2064]" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>Confirm Payment</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
