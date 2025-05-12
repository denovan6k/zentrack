"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Package2, Wallet, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [walletAddress, setWalletAddress] = useState("")
  const [password, setPassword] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!walletAddress) {
      toast({
        title: "Error",
        description: "Please enter a wallet address",
        variant: "destructive",
      })
      return
    }

    setIsConnecting(true)

    try {
      const success = await login(walletAddress)
      if (success) {
        router.push("/dashboard")
      }
    } finally {
      setIsConnecting(false)
    }
  }

  const handleConnectWallet = async () => {
    setIsConnecting(true)

    // Simulate wallet connection
    setTimeout(async () => {
      const mockWalletAddress = "0x" + Math.random().toString(36).substring(2, 10) + "..."
      setWalletAddress(mockWalletAddress)
      setIsConnecting(false)

      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${mockWalletAddress}`,
      })
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 font-semibold">
        <Package2 className="h-6 w-6" />
        <span className="font-bold text-xl bg-gradient-to-r from-[#4C2A85] to-purple-400 bg-clip-text text-transparent">
          ZenPay
        </span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Connect to ZenPay</CardTitle>
          <CardDescription>
            Connect your wallet to access your dashboard and manage your recurring payments
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="walletAddress">Wallet Address</Label>
              <div className="flex gap-2">
                <Input
                  id="walletAddress"
                  placeholder="0x..."
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleConnectWallet}
                  disabled={isConnecting}
                  className="gap-2"
                >
                  <Wallet className="h-4 w-4" />
                  Connect
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                For demo purposes, you can enter any wallet address or click Connect to generate one
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password (Optional)</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">For demo purposes, password is optional</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-[#4C2A85] hover:bg-[#3b2064]"
              disabled={isConnecting || !walletAddress}
            >
              {isConnecting ? "Connecting..." : "Continue to Dashboard"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </form>
      </Card>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Don&apos;t have a wallet?{" "}
        <Link href="/" className="font-medium text-[#4C2A85] hover:underline">
          Learn how to get started
        </Link>
      </p>
    </div>
  )
}
