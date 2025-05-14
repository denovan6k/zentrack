
import { cn } from "@/lib/utils";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CreditCard, List, User, Users, Settings } from "lucide-react";

interface SidebarProps {
  className?: string;
}

const SidebarItem = ({ 
  to, 
  icon: Icon, 
  label, 
  active 
}: { 
  to: string; 
  icon: React.ElementType; 
  label: string; 
  active: boolean;
}) => {
  return (
    <Link href={to}>
      <Button
        variant="ghost"
        size="lg"
        className={cn(
          "w-full justify-start gap-2 font-normal",
          active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"
        )}
      >
        <Icon className="h-5 w-5" />
        {label}
      </Button>
    </Link>
  );
};

const Sidebar = ({ className }: SidebarProps) => {

  const pathname = usePathname();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  const merchantItems = [
    { to: "/merchant", icon: List, label: "Dashboard" },
    { to: "/merchant/plans", icon: CreditCard, label: "Subscription Plans" },
    { to: "/merchant/customers", icon: Users, label: "Customers" },
    { to: "/merchant/settings", icon: Settings, label: "Settings" }
  ];
  
  const customerItems = [
    { to: "/subscriptions", icon: CreditCard, label: "My Subscriptions" },
    { to: "/profile", icon: User, label: "Profile" },
    { to: "/settings", icon: Settings, label: "Settings" }
  ];

  // Determine if we're in the merchant section
  const isMerchant = pathname === "merchant";
  const navItems = isMerchant ? merchantItems : customerItems;

  return (
    <div className={cn("bg-sidebar h-full flex flex-col", className)}>
      <div className="p-6">
        <Link href="/">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="bg-white text-sidebar rounded-full w-8 h-8 flex items-center justify-center">
              B
            </span>
            BasePay
          </h1>
        </Link>
      </div>
      
      <div className="space-y-1 px-3 py-2">
        {navItems.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            active={isActive(item.to)}
          />
        ))}
      </div>

      <div className="mt-auto p-4">
        {isMerchant ? (
          <Link href="/">
            <Button variant="outline" size="sm" className="w-full bg-sidebar-accent text-sidebar-accent-foreground border-sidebar-border">
              <User className="mr-2 h-4 w-4" />
              Customer View
            </Button>
          </Link>
        ) : (
          <Link href="/merchant">
            <Button variant="outline" size="sm" className="w-full bg-sidebar-accent text-sidebar-accent-foreground border-sidebar-border">
              <Users className="mr-2 h-4 w-4" />
              Merchant View
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
