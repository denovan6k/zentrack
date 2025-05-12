"use client"

import { useState } from "react"
import { CheckCircle, X, CreditCard, Zap, Shield, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { SubscriptionPaymentModal } from "@/components/subscription-payment-modal"
import { SubscriptionConfirmationModal } from "@/components/subscription-confirmation-modal"
import { useAuth } from "@/hooks/use-auth"

// Subscription plan data
const plans = {
  monthly: [
    {
      id: "free",
      name: "Free",
      description: "Basic features for small businesses getting started",
      price: 0,
      features: ["Up to 5 active subscriptions", "Basic analytics", "Standard payment notifications", "Email support"],
      limitations: ["Limited transaction volume", "No custom branding", "Basic reporting"],
    },
    {
      id: "pro",
      name: "Pro",
      description: "Everything you need for growing businesses",
      price: 49,
      features: [
        "Up to 100 active subscriptions",
        "Advanced analytics",
        "Custom payment notifications",
        "Priority support",
        "Webhook integrations",
        "Custom branding",
      ],
      limitations: [],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Advanced features for large-scale operations",
      price: 199,
      features: [
        "Unlimited active subscriptions",
        "Enterprise analytics",
        "Dedicated account manager",
        "Custom integration support",
        "SLA guarantees",
        "Multi-user access",
        "Advanced security features",
      ],
      limitations: [],
    },
  ],
  yearly: [
    {
      id: "free",
      name: "Free",
      description: "Basic features for small businesses getting started",
      price: 0,
      features: ["Up to 5 active subscriptions", "Basic analytics", "Standard payment notifications", "Email support"],
      limitations: ["Limited transaction volume", "No custom branding", "Basic reporting"],
    },
    {
      id: "pro",
      name: "Pro",
      description: "Everything you need for growing businesses",
      price: 39,
      yearlyPrice: 468,
      saveAmount: 120,
      features: [
        "Up to 100 active subscriptions",
        "Advanced analytics",
        "Custom payment notifications",
        "Priority support",
        "Webhook integrations",
        "Custom branding",
      ],
      limitations: [],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "Advanced features for large-scale operations",
      price: 159,
      yearlyPrice: 1908,
      saveAmount: 480,
      features: [
        "Unlimited active subscriptions",
        "Enterprise analytics",
        "Dedicated account manager",
        "Custom integration support",
        "SLA guarantees",
        "Multi-user access",
        "Advanced security features",
      ],
      limitations: [],
    },
  ],
}

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()

  // Mock current subscription - in a real app, this would come from your backend
  const currentSubscription = {
    plan: "free",
    status: "active",
    nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  }

  const handleSelectPlan = (plan: any) => {
    if (plan.id === currentSubscription.plan) {
      toast({
        title: "Already subscribed",
        description: `You are already on the ${plan.name} plan.`,
      })
      return
    }

    if (plan.id === "free" && currentSubscription.plan !== "free") {
      toast({
        title: "Downgrade to Free",
        description: "Please contact support to downgrade to the Free plan.",
      })
      return
    }

    setSelectedPlan(plan)
    setIsPaymentModalOpen(true)
  }

  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false)
    setIsConfirmationModalOpen(true)
  }

  const handleConfirmationClose = () => {
    setIsConfirmationModalOpen(false)
    toast({
      title: "Subscription Updated",
      description: `You have successfully subscribed to the ${selectedPlan.name} plan.`,
    })
  }

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case "free":
        return <CreditCard className="h-6 w-6 text-blue-500" />
      case "pro":
        return <Zap className="h-6 w-6 text-[#4C2A85]" />
      case "enterprise":
        return <Shield className="h-6 w-6 text-indigo-500" />
      default:
        return <CreditCard className="h-6 w-6" />
    }
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Subscription Plans</h1>
        <p className="text-muted-foreground">Choose the right plan for your business needs</p>
      </div>

      {/* Current Subscription Card */}
      <Card>
        <CardHeader>
          <CardTitle>Current Subscription</CardTitle>
          <CardDescription>Your active ZenPay subscription details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  {getPlanIcon(currentSubscription.plan)}
                </div>
                <div>
                  <div className="font-medium">
                    {plans.monthly.find((p) => p.id === currentSubscription.plan)?.name} Plan
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {currentSubscription.plan === "free"
                      ? "Free forever"
                      : `$${plans.monthly.find((p) => p.id === currentSubscription.plan)?.price}/month`}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground">Status</div>
                <div className="font-medium">
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  >
                    {currentSubscription.status}
                  </Badge>
                </div>
              </div>
              <div>
                <div className="text-muted-foreground">Start Date</div>
                <div className="font-medium">{currentSubscription.startDate}</div>
              </div>
              <div>
                <div className="text-muted-foreground">Next Billing</div>
                <div className="font-medium">{currentSubscription.nextBillingDate}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing Cycle Tabs */}
      <div className="flex justify-center">
        <Tabs
          defaultValue="monthly"
          value={billingCycle}
          onValueChange={(value) => setBillingCycle(value as "monthly" | "yearly")}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">
              Yearly <span className="ml-1.5 text-xs font-normal text-emerald-600">Save 20%</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Subscription Plans */}
      <div className="grid gap-6 md:grid-cols-3">
        {plans[billingCycle].map((plan) => (
          <Card
            key={plan.id}
            className={`overflow-hidden ${
              plan.popular ? "border-[#4C2A85] dark:border-[#4C2A85]" : "border-border"
            } relative`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-[#4C2A85] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                POPULAR
              </div>
            )}
            <CardHeader className={plan.popular ? "bg-[#4C2A85]/5" : ""}>
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    plan.id === "free"
                      ? "bg-blue-100 dark:bg-blue-900"
                      : plan.id === "pro"
                        ? "bg-[#4C2A85]/10"
                        : "bg-indigo-100 dark:bg-indigo-900"
                  }`}
                >
                  {getPlanIcon(plan.id)}
                </div>
                <div>
                  <CardTitle>{plan.name}</CardTitle>
                </div>
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="ml-1 text-muted-foreground">/{billingCycle === "monthly" ? "month" : "month"}</span>
              </div>
              {billingCycle === "yearly" && plan.yearlyPrice && (
                <div className="flex items-center text-sm">
                  <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-0">
                    Save ${plan.saveAmount}/year
                  </Badge>
                  <span className="ml-2 text-muted-foreground line-through">
                    ${plan.yearlyPrice + plan.saveAmount}/year
                  </span>
                  <span className="ml-1 font-medium">${plan.yearlyPrice}/year</span>
                </div>
              )}
              <div className="space-y-2">
                <div className="font-medium">Features</div>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {plan.limitations && plan.limitations.length > 0 && (
                <div className="space-y-2">
                  <div className="font-medium">Limitations</div>
                  <ul className="space-y-2">
                    {plan.limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start">
                        <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className={`w-full ${
                  plan.id === currentSubscription.plan
                    ? "bg-gray-200 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-700 cursor-default"
                    : plan.popular
                      ? "bg-[#4C2A85] hover:bg-[#3b2064]"
                      : ""
                }`}
                onClick={() => handleSelectPlan(plan)}
                disabled={plan.id === currentSubscription.plan}
              >
                {plan.id === currentSubscription.plan
                  ? "Current Plan"
                  : plan.id === "free"
                    ? "Downgrade to Free"
                    : currentSubscription.plan === "free"
                      ? "Upgrade"
                      : plan.id === "pro" && currentSubscription.plan === "enterprise"
                        ? "Downgrade"
                        : "Upgrade"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Enterprise Contact Card */}
      <Card className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-none shadow-md">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-shrink-0">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#4C2A85]/10">
                <Users className="h-8 w-8 text-[#4C2A85]" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Need a custom plan?</h3>
              <p className="text-muted-foreground mb-4">
                Contact our sales team for a tailored solution that meets your specific business requirements.
              </p>
              <Button className="bg-[#4C2A85] hover:bg-[#3b2064]">
                Contact Sales
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Modal */}
      {selectedPlan && (
        <SubscriptionPaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          plan={selectedPlan}
          billingCycle={billingCycle}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Confirmation Modal */}
      {selectedPlan && (
        <SubscriptionConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={handleConfirmationClose}
          plan={selectedPlan}
          billingCycle={billingCycle}
        />
      )}
    </div>
  )
}
