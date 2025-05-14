
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plan } from "@/lib/mock-data";
import { Eye, Users } from "lucide-react";

interface PlanCardProps {
  plan: Plan;
  onViewDetails: (plan: Plan) => void;
}

const PlanCard = ({ plan, onViewDetails }: PlanCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">{plan.name}</h3>
            {plan.active ? (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
            ) : (
              <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Draft</Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-xl">${plan.price}</p>
          <p className="text-sm text-muted-foreground">{plan.token} / {plan.frequency}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{plan.subscribersCount} subscribers</span>
          </div>
          <div>Created on {new Date(plan.createdAt).toLocaleDateString()}</div>
        </div>
      </div>

      <div className="mt-4">
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => onViewDetails(plan)}
        >
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default PlanCard;
