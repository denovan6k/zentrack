"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Check, Copy, Save, Wallet } from "lucide-react";

const MerchantSettings = () => {
  const { toast } = useToast();
  const [saveLoading, setSaveLoading] = useState(false);
  
  // Mock business settings
  const [businessSettings, setBusinessSettings] = useState({
    businessName: "My Business",
    websiteUrl: "https://mybusiness.com",
    supportEmail: "support@mybusiness.com",
    description: "We provide premium digital services and subscription products."
  });
  
  // Mock wallet settings
  const [walletAddress, setWalletAddress] = useState("0x71C7656EC7ab88b098defB751B7401B5f6d8976F");
  
  // Mock notification settings
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    paymentAlerts: true,
    marketingEmails: false,
    newSubscribers: true
  });
  
  // Mock integration settings
  const [apiKey, setApiKey] = useState("bp_32fda77c8e9c4ec384f9b2e92d57a");
  
  const handleSaveBusinessSettings = () => {
    setSaveLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaveLoading(false);
      toast({
        title: "Settings Saved",
        description: "Your business settings have been updated successfully.",
      });
    }, 1000);
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification Preferences Updated",
      description: "Your notification settings have been saved.",
    });
  };
  
  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast({
      title: "API Key Copied",
      description: "API key has been copied to clipboard.",
    });
  };
  
  const regenerateApiKey = () => {
    // Simulate generating a new API key
    const newKey = "bp_" + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
    toast({
      title: "API Key Regenerated",
      description: "Your API key has been regenerated. Make sure to update your integrations.",
    });
  };
  
  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        
        <Tabs defaultValue="business">
          <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 md:grid-cols-none">
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="integration">API & Integration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="business" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>
                  Manage your business details that will be displayed to your customers.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input 
                      id="businessName" 
                      value={businessSettings.businessName}
                      onChange={(e) => setBusinessSettings({...businessSettings, businessName: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="websiteUrl">Website URL</Label>
                    <Input 
                      id="websiteUrl" 
                      type="url"
                      value={businessSettings.websiteUrl}
                      onChange={(e) => setBusinessSettings({...businessSettings, websiteUrl: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="supportEmail">Support Email</Label>
                    <Input 
                      id="supportEmail" 
                      type="email"
                      value={businessSettings.supportEmail}
                      onChange={(e) => setBusinessSettings({...businessSettings, supportEmail: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="description">Business Description</Label>
                    <Textarea 
                      id="description" 
                      rows={4}
                      value={businessSettings.description}
                      onChange={(e) => setBusinessSettings({...businessSettings, description: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveBusinessSettings} disabled={saveLoading}>
                  {saveLoading ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="wallet" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Wallet Settings</CardTitle>
                <CardDescription>
                  Configure your wallet settings for receiving subscription payments.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="walletAddress">Payment Receipt Address</Label>
                  <div className="flex mt-2">
                    <div className="relative flex-1">
                      <Input 
                        id="walletAddress" 
                        value={walletAddress}
                        onChange={(e) => setWalletAddress(e.target.value)}
                        className="pr-10"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => {
                          navigator.clipboard.writeText(walletAddress);
                          toast({
                            title: "Address Copied",
                            description: "Wallet address copied to clipboard.",
                          });
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="outline" className="ml-2">
                      <Wallet className="mr-2 h-4 w-4" />
                      Connect New Wallet
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    This is the address where all subscription payments will be sent.
                  </p>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-2">Connected Wallets</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center">
                        <Wallet className="h-5 w-5 text-muted-foreground mr-2" />
                        <div>
                          <p className="font-medium">Metamask</p>
                          <p className="text-sm text-muted-foreground">0x71C7...976F</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                        <Check className="h-3 w-3" /> Primary
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => {
                  toast({
                    title: "Wallet Settings Saved",
                    description: "Your wallet settings have been updated successfully.",
                  });
                }}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how and when you receive notifications about your subscriptions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications for important updates.
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, emailNotifications: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Payment Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when payments are processed or fail.
                      </p>
                    </div>
                    <Switch
                      checked={notifications.paymentAlerts}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, paymentAlerts: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about new features and promotions.
                      </p>
                    </div>
                    <Switch
                      checked={notifications.marketingEmails}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, marketingEmails: checked})
                      }
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">New Subscriber Alerts</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when someone subscribes to your plans.
                      </p>
                    </div>
                    <Switch
                      checked={notifications.newSubscribers}
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, newSubscribers: checked})
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveNotifications}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="integration" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>API & Integration</CardTitle>
                <CardDescription>
                  Manage your API keys and integration settings for external applications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">API Key</h3>
                  <div className="flex">
                    <div className="relative flex-1">
                      <Input 
                        value={apiKey}
                        readOnly
                        className="pr-10 font-mono"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={handleCopyApiKey}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="outline" className="ml-2" onClick={regenerateApiKey}>
                      Regenerate
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Use this key to authenticate API requests from your applications.
                  </p>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium mb-3">Webhook Settings</h3>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="webhookUrl">Webhook URL</Label>
                      <Input id="webhookUrl" placeholder="https://yourapp.com/webhooks/basepay" />
                      <p className="text-sm text-muted-foreground">
                        We'll send subscription events to this URL.
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch id="testMode" />
                      <Label htmlFor="testMode">Enable Test Mode</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => {
                  toast({
                    title: "Integration Settings Saved",
                    description: "Your API and webhook settings have been updated.",
                  });
                }}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Integration Settings
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Embed Widgets</CardTitle>
                <CardDescription>
                  Get code snippets to embed subscription buttons on your website.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="embedPlan">Select Plan to Embed</Label>
                    <select id="embedPlan" className="border rounded-md p-2">
                      <option value="plan-1">Basic Plan - $9.99/month</option>
                      <option value="plan-2">Pro Plan - $29.99/month</option>
                      <option value="plan-3">Enterprise Plan - $99.99/month</option>
                    </select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="embedCode">Embed Code</Label>
                    <div className="relative">
                      <Textarea
                        id="embedCode"
                        readOnly
                        rows={4}
                        className="font-mono"
                        value={`<script src="https://basepay.network/embed.js"></script>
<div class="basepay-button" data-plan-id="plan-1" data-theme="light"></div>`}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-2"
                        onClick={() => {
                          navigator.clipboard.writeText(`<script src="https://basepay.network/embed.js"></script>
<div class="basepay-button" data-plan-id="plan-1" data-theme="light"></div>`);
                          toast({
                            title: "Code Copied",
                            description: "Embed code copied to clipboard.",
                          });
                        }}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

// Add a Badge component
const Badge = ({ className, children }: { className?: string, children: React.ReactNode }) => {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {children}
    </span>
  );
};

export default MerchantSettings;
