
"use client";
import { useParams,useRouter } from "next/navigation";
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { mockPlans, mockSubscribers } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { User, Users, Calendar, DollarSign, Clock, Check, AlertTriangle, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

const MerchantPlanDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [isPlanActive, setIsPlanActive] = useState(true);

  // Find the plan based on the ID
  const plan = mockPlans.find(p => p.id === id);
  
  // Filter subscribers for this plan
  const planSubscribers = mockSubscribers.filter(sub => sub.planId === id);
  
  // Handle if the plan is not found
  if (!plan) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-2xl font-bold mb-4">Plan Not Found</h1>
          <Button onClick={() => router.push("/merchant/plans")}>Back to Plans</Button>
        </div>
      </MainLayout>
    );
  }

  const togglePlanStatus = () => {
    setIsPlanActive(prev => !prev);
    toast({
      title: isPlanActive ? "Plan Deactivated" : "Plan Activated",
      description: `${plan.name} has been ${isPlanActive ? "deactivated" : "activated"} successfully.`,
    });
  };

  const onEdit = () => {
    toast({
      title: "Edit Plan",
      description: "Plan edited successfully",
    });
  };

  const onDelete = () => {
    toast({
      title: "Plan Deleted",
      description: `${plan.name} has been deleted successfully.`,
    });
    router.push("/merchant/plans");
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => router.push("/merchant/plans")}>
              Back
            </Button>
            <h1 className="text-2xl font-bold">Plan Details</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Plan
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Plan</DialogTitle>
                  <DialogDescription>
                    Make changes to your subscription plan here.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    This would contain a form to edit the plan details.
                  </p>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => {}}>Cancel</Button>
                  <Button onClick={onEdit}>Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Delete Plan</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the 
                    "{plan.name}" plan and remove all related data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onDelete}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </div>
                <Badge className={isPlanActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                  {isPlanActive ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Price</p>
                    <p className="text-xl font-bold">${plan.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Frequency</p>
                    <p className="text-xl font-bold capitalize">{plan.frequency}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Trial Period</p>
                    <p className="text-xl font-bold">{plan.trialDays} days</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Subscribers</p>
                    <p className="text-xl font-bold">{plan.subscribersCount}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={togglePlanStatus}
                variant={isPlanActive ? "outline" : "default"}
                className="w-full"
              >
                {isPlanActive ? (
                  <>
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Deactivate Plan
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Activate Plan
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Plan Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Revenue</span>
                <span className="font-medium">${(plan.price * plan.subscribersCount).toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Subscribers</span>
                <span className="font-medium">{planSubscribers.filter(sub => sub.status === "active").length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Canceled Subscribers</span>
                <span className="font-medium">{planSubscribers.filter(sub => sub.status === "cancelled").length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Created On</span>
                <span className="font-medium">{new Date(plan.createdAt).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="subscribers">
          <TabsList>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="settings">Plan Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="subscribers" className="space-y-4 pt-4">
            <h2 className="text-xl font-semibold">Subscribers</h2>
            {planSubscribers.length > 0 ? (
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Paid</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {planSubscribers.map((subscriber) => (
                      <tr key={subscriber.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {subscriber.address.substring(0, 6)}...{subscriber.address.substring(subscriber.address.length - 4)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(subscriber.subscriptionDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <Badge className={
                            subscriber.status === "active" ? "bg-green-100 text-green-800" : 
                            subscriber.status === "paused" ? "bg-yellow-100 text-yellow-800" : 
                            "bg-red-100 text-red-800"
                          }>
                            {subscriber.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${subscriber.totalPaid.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-10 border rounded-md">
                <User className="mx-auto h-10 w-10 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No subscribers yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  This plan doesn't have any subscribers yet.
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="settings" className="space-y-4 pt-4">
            <h2 className="text-xl font-semibold">Plan Settings</h2>
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Customization Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Additional plan configuration options would be shown here.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default MerchantPlanDetails;
