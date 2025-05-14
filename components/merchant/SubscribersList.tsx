
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Subscriber , Plan} from "@/lib/mock-data";
interface SubscribersListProps {
  subscribers: Subscriber[];
  plans: Plan[];
}

const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const formatDate = (dateString: string) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const SubscribersList = ({ subscribers, plans }: SubscribersListProps) => {
  const getPlanName = (planId: string) => {
    const plan = plans.find((p) => p.id === planId);
    return plan ? plan.name : "Unknown Plan";
  };

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Address</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Subscription Date</TableHead>
            <TableHead>Next Payment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total Paid</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscribers.map((subscriber) => (
            <TableRow key={subscriber.id}>
              <TableCell className="font-mono">{formatAddress(subscriber.address)}</TableCell>
              <TableCell>{getPlanName(subscriber.planId)}</TableCell>
              <TableCell>{formatDate(subscriber.subscriptionDate)}</TableCell>
              <TableCell>{formatDate(subscriber.nextPaymentDate)}</TableCell>
              <TableCell>
                {subscriber.status === "active" && (
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    Active
                  </Badge>
                )}
                {subscriber.status === "paused" && (
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                    Paused
                  </Badge>
                )}
                {subscriber.status === "cancelled" && (
                  <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                    Cancelled
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right">${subscriber.totalPaid.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubscribersList;
