
import MainLayout from "@/components/layout/MainLayout";
import PlanCard from "@/components/merchant/PlanCard";
import { mockPlans } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useToast } from "@/components/ui/use-toast";

const MerchantPlans = () => {
  const router = useRouter();
  const { toast } = useToast();

  const handleViewDetails = (plan: any) => {
    // Navigate to plan details
    router.push(`/merchant/plans/${plan.id}`);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Subscription Plans</h1>
          <Button onClick={() => router.push("/merchant/plans/new")}>
            Create New Plan
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockPlans.map((plan) => (
            <PlanCard 
              key={plan.id} 
              plan={plan} 
              onViewDetails={handleViewDetails} 
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default MerchantPlans;
