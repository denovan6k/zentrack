"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, CreditCard, Settings } from "lucide-react"

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("hidden md:flex items-center gap-6", className)}>
      <Link
        href="/dashboard"
        className={cn(
          "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
          pathname === "/dashboard" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <Home className="h-4 w-4" />
        Dashboard
      </Link>
      <Link
        href="/payments"
        className={cn(
          "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
          pathname === "/payments" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <CreditCard className="h-4 w-4" />
        Payments
      </Link>
      <Link
        href="/settings"
        className={cn(
          "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
          pathname === "/settings" ? "text-primary" : "text-muted-foreground",
        )}
      >
        <Settings className="h-4 w-4" />
        Settings
      </Link>
    </nav>
  )
}
