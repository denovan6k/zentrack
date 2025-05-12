"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export function ConnectWalletButton() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleConnect = async (walletType: string) => {
    setIsConnecting(true)

    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false)
      setIsOpen(false)

      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${walletType}`,
      })

      // Redirect to login page
      router.push("/login")
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#4C2A85] hover:bg-[#3b2064] gap-2">
          <Wallet className="h-4 w-4" />
          <span>Connect</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect your wallet</DialogTitle>
          <DialogDescription>Choose your preferred wallet to connect to ZenPay</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            variant="outline"
            className="flex justify-between items-center"
            disabled={isConnecting}
            onClick={() => handleConnect("MetaMask")}
          >
            <span>MetaMask</span>
            <img src="/placeholder.svg?height=24&width=24" alt="MetaMask logo" className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            className="flex justify-between items-center"
            disabled={isConnecting}
            onClick={() => handleConnect("Coinbase Wallet")}
          >
            <span>Coinbase Wallet</span>
            <img src="/placeholder.svg?height=24&width=24" alt="Coinbase Wallet logo" className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            className="flex justify-between items-center"
            disabled={isConnecting}
            onClick={() => handleConnect("WalletConnect")}
          >
            <span>WalletConnect</span>
            <img src="/placeholder.svg?height=24&width=24" alt="WalletConnect logo" className="h-6 w-6" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
