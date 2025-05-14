
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Wallet } from "lucide-react";

const walletAddresses = [
  "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
];

const Header = () => {
  const { toast } = useToast();
  
  // Randomly select a wallet address to simulate connection
  const connectWallet = () => {
    const randomWallet = walletAddresses[Math.floor(Math.random() * walletAddresses.length)];
    const shortAddress = `${randomWallet.slice(0, 6)}...${randomWallet.slice(-4)}`;
    
    toast({
      title: "Wallet connected",
      description: `Connected to ${shortAddress}`,
    });
  };
  
  return (
    <header className="border-b px-6 py-3">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold">BasePay Recurring</h1>
          <p className="text-sm text-muted-foreground">One-click blockchain subscription payments on Base</p>
        </div>
        
        <Button onClick={connectWallet} className="flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </Button>
      </div>
    </header>
  );
};

export default Header;
