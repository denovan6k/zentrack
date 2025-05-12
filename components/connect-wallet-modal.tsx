"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface ConnectWalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ConnectWalletModal({ isOpen, onClose }: ConnectWalletModalProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const { toast } = useToast()

  const handleConnect = async (walletType: string) => {
    setIsConnecting(true)

    // Simulate wallet connection
    setTimeout(() => {
      setIsConnecting(false)

      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${walletType}`,
      })

      onClose()
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
