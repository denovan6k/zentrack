"use client";
import { useState } from "react";

import { mockSubscribers, mockPlans } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, UserPlus, User, Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const MerchantCustomers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter subscribers based on search term
  const filteredSubscribers = mockSubscribers.filter(subscriber => 
    subscriber.address.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Count subscribers by status
  const activeCount = mockSubscribers.filter(sub => sub.status === "active").length;
  const pausedCount = mockSubscribers.filter(sub => sub.status === "paused").length;
  const cancelledCount = mockSubscribers.filter(sub => sub.status === "cancelled").length;
  
  const totalRevenue = mockSubscribers.reduce((sum, sub) => sum + sub.totalPaid, 0);
  
  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address Copied",
      description: "Customer address copied to clipboard.",
    });
  };
  
  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Customers</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Customer
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogDescription>
                  Add a customer by providing their wallet address and assigning them a plan.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="address">Customer Wallet Address</Label>
                  <Input id="address" placeholder="0x..." />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="plan">Subscription Plan</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockPlans.map(plan => (
                        <SelectItem key={plan.id} value={plan.id}>
                          {plan.name} - ${plan.price}/{plan.frequency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => {
                  toast({
                    title: "Customer Added",
                    description: "New customer has been added successfully.",
                  });
                }}>Add Customer</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockSubscribers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Subscribers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Cancelled Subscriptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{cancelledCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-md shadow">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search customers by wallet address..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <div className="px-4">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="all">All ({mockSubscribers.length})</TabsTrigger>
                <TabsTrigger value="active">Active ({activeCount})</TabsTrigger>
                <TabsTrigger value="paused">Paused ({pausedCount})</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled ({cancelledCount})</TabsTrigger>
              </TabsList>
            </div>
            
            {["all", "active", "paused", "cancelled"].map((status) => (
              <TabsContent key={status} value={status} className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Address</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Since</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Payment</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Paid</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredSubscribers
                        .filter(sub => status === "all" || sub.status === status)
                        .map((subscriber) => {
                          const plan = mockPlans.find(p => p.id === subscriber.planId);
                          return (
                            <tr key={subscriber.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <User className="h-5 w-5 text-gray-400 mr-3" />
                                  <div className="flex items-center">
                                    <span className="font-medium">
                                      {subscriber.address.substring(0, 6)}...
                                      {subscriber.address.substring(subscriber.address.length - 4)}
                                    </span>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="ml-1 h-6 w-6"
                                      onClick={() => copyAddress(subscriber.address)}
                                    >
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {plan?.name || "Unknown Plan"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Badge className={
                                  subscriber.status === "active" ? "bg-green-100 text-green-800" : 
                                  subscriber.status === "paused" ? "bg-yellow-100 text-yellow-800" : 
                                  "bg-red-100 text-red-800"
                                }>
                                  {subscriber.status}
                                </Badge>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {new Date(subscriber.subscriptionDate).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {subscriber.nextPaymentDate ? 
                                  new Date(subscriber.nextPaymentDate).toLocaleDateString() : 
                                  "N/A"}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                ${subscriber.totalPaid.toFixed(2)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    toast({
                                      title: "View Customer",
                                      description: "Customer details view not implemented yet.",
                                    });
                                  }}
                                >
                                  View
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  
                  {filteredSubscribers.filter(sub => status === "all" || sub.status === status).length === 0 && (
                    <div className="text-center py-10">
                      <User className="mx-auto h-10 w-10 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No customers found</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {searchTerm ? 
                          "No customers match your search." : 
                          `No customers with ${status} status.`}
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </>
  );
};

// Add a Label component for the dialog
const Label = ({ htmlFor, children }: { htmlFor: string, children: React.ReactNode }) => {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {children}
    </label>
  );
};

export default MerchantCustomers;