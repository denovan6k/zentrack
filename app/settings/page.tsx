"use client"

import type React from "react"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select, SelectItem as SelectItemComponent } from "@/components/ui/select"

import { useRef, useState } from "react"
import { Wallet, Moon, Sun, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { ConnectWalletModal } from "@/components/connect-wallet-modal"
import { DeleteAccountDialog } from "@/components/delete-account-dialog"

export default function SettingsPage() {
  const [isConnectWalletModalOpen, setIsConnectWalletModalOpen] = useState(false)
  const [isDeleteAccountDialogOpen, setIsDeleteAccountDialogOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const { toast } = useToast()

  const [avatarUrl, setAvatarUrl] = useState("/placeholder.svg?height=96&width=96")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatarUrl(e.target.result as string)
          toast({
            title: "Avatar Updated",
            description: "Your profile avatar has been updated successfully.",
          })
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Mock connected wallets data
  const connectedWallets = [
    {
      id: "wallet_1",
      name: "MetaMask",
      address: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
      isPrimary: true,
    },
    {
      id: "wallet_2",
      name: "Coinbase Wallet",
      address: "0x9i0j1k2l3m4n5o6p7q8r9s0t1a2b3c4d5e6f7g8h",
      isPrimary: false,
    },
  ]

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    })
  }

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved.",
    })
  }

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode)
    toast({
      title: `${!darkMode ? "Dark" : "Light"} Mode Activated`,
      description: `Switched to ${!darkMode ? "dark" : "light"} mode.`,
    })
  }

  const handleDisconnectWallet = (walletId: string) => {
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected successfully.",
    })
  }

  const handleSetPrimaryWallet = (walletId: string) => {
    toast({
      title: "Primary Wallet Updated",
      description: "Your primary wallet has been updated successfully.",
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-6 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-5xl space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and settings</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="wallets">Wallets</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information and profile settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex flex-col items-center gap-2">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={avatarUrl || "/placeholder.svg"} alt="Profile" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <input
                        type="file"
                        id="avatar-upload"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                        ref={fileInputRef}
                      />
                      <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                        Change Avatar
                      </Button>
                    </div>
                    <div className="grid gap-4 flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="John" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Doe" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue="johndoe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input id="bio" defaultValue="Crypto enthusiast and early adopter of blockchain technology." />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button className="bg-[#4C2A85] hover:bg-[#3b2064]" onClick={handleSaveProfile}>
                    Save Changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Wallets Tab */}
            <TabsContent value="wallets" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Connected Wallets</CardTitle>
                  <CardDescription>Manage your connected Web3 wallets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-end">
                    <Button
                      className="bg-[#4C2A85] hover:bg-[#3b2064]"
                      onClick={() => setIsConnectWalletModalOpen(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Connect New Wallet
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {connectedWallets.map((wallet) => (
                      <div
                        key={wallet.id}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4 mb-4 md:mb-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4C2A85]/10">
                            <Wallet className="h-5 w-5 text-[#4C2A85]" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{wallet.name}</p>
                              {wallet.isPrimary && <Badge className="bg-[#4C2A85] text-white">Primary</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground font-mono">
                              {wallet.address.substring(0, 6)}...{wallet.address.substring(wallet.address.length - 4)}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!wallet.isPrimary && (
                            <Button variant="outline" size="sm" onClick={() => handleSetPrimaryWallet(wallet.id)}>
                              Set as Primary
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                            onClick={() => handleDisconnectWallet(wallet.id)}
                          >
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security and authentication options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input id="newPassword" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input id="confirmPassword" type="password" />
                      </div>
                    </div>
                    <Button className="bg-[#4C2A85] hover:bg-[#3b2064]">Update Password</Button>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-2">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add an extra layer of security to your account by enabling two-factor authentication.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Enable 2FA</div>
                        <div className="text-sm text-muted-foreground">
                          Protect your account with an authentication app
                        </div>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-lg font-medium mb-2">Account Deletion</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Permanently delete your account and all associated data.
                    </p>
                    <Button variant="destructive" onClick={() => setIsDeleteAccountDialogOpen(true)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Manage how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Payment Confirmations</div>
                        <div className="text-sm text-muted-foreground">
                          Receive notifications when payments are processed
                        </div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Payment Reminders</div>
                        <div className="text-sm text-muted-foreground">Get notified before scheduled payments</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Failed Transactions</div>
                        <div className="text-sm text-muted-foreground">Receive alerts when payments fail</div>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="font-medium">Marketing Updates</div>
                        <div className="text-sm text-muted-foreground">Receive news and promotional content</div>
                      </div>
                      <Switch />
                    </div>
                  </div>

                  <Button className="bg-[#4C2A85] hover:bg-[#3b2064]" onClick={handleSaveNotifications}>
                    Save Notification Settings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize how ZenPay looks and feels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Dark Mode</div>
                      <div className="text-sm text-muted-foreground">Switch between light and dark themes</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4 text-muted-foreground" />
                      <Switch checked={darkMode} onCheckedChange={handleToggleDarkMode} />
                      <Moon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItemComponent value="en">English</SelectItemComponent>
                        <SelectItemComponent value="es">Spanish</SelectItemComponent>
                        <SelectItemComponent value="fr">French</SelectItemComponent>
                        <SelectItemComponent value="de">German</SelectItemComponent>
                        <SelectItemComponent value="ja">Japanese</SelectItemComponent>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Connect Wallet Modal */}
      <ConnectWalletModal isOpen={isConnectWalletModalOpen} onClose={() => setIsConnectWalletModalOpen(false)} />

      {/* Delete Account Dialog */}
      <DeleteAccountDialog isOpen={isDeleteAccountDialogOpen} onClose={() => setIsDeleteAccountDialogOpen(false)} />
    </div>
  )
}

// Badge component for the wallet section
function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {children}
    </span>
  )
}
