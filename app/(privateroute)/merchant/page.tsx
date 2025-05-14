
"use client";

import StatCard from "@/components/merchant/StatCard";
import SubscriptionChart from "@/components/merchant/SubscriptionChart";
import SubscribersList from "@/components/merchant/SubscribersList";
import { mockSubscribers, mockPlans, mockRevenue, mockSubscribersGrowth } from "@/lib/mock-data";
import { CreditCard, DollarSign, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
const MerchantDashboard = () => {
  
  const router = useRouter();
  // Calculate total revenue
  const totalRevenue = mockSubscribers.reduce((sum, sub) => sum + sub.totalPaid, 0);
  
  // Calculate active subscribers
  const activeSubscribers = mockSubscribers.filter(sub => sub.status === "active").length;

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Merchant Dashboard</h1>
          <Button onClick={() => router.push("/merchant/plans/new")}>
            Create New Plan
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <StatCard
            title="Total Revenue"
            value={`$${totalRevenue.toFixed(2)}`}
            icon={<DollarSign className="h-5 w-5" />}
            trend={{ value: 12.5, positive: true }}
            description="vs. last month"
          />
          <StatCard
            title="Active Subscribers"
            value={String(activeSubscribers)}
            icon={<Users className="h-5 w-5" />}
            trend={{ value: 8.2, positive: true }}
            description="vs. last month"
          />
          <StatCard
            title="Active Plans"
            value={String(mockPlans.filter(plan => plan.active).length)}
            icon={<CreditCard className="h-5 w-5" />}
            description="Across all tokens"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <SubscriptionChart
            data={mockRevenue}
            dataKey="revenue"
            title="Monthly Revenue"
            description="Total revenue from all subscription plans"
          />
          <SubscriptionChart
            data={mockSubscribersGrowth}
            dataKey="subscribers"
            title="Subscribers Growth"
            description="Total number of subscribers over time"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Subscribers</h2>
          <SubscribersList subscribers={mockSubscribers} plans={mockPlans} />
        </div>
      </div>
    </>
  );
};

export default MerchantDashboard;
