"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, CreditCard, Settings, Menu, Package2, BarChart3, Users, HelpCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/hooks/use-auth"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)
  const { logout } = useAuth()

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkScreenSize()

    // Add event listener
    window.addEventListener("resize", checkScreenSize)

    // Clean up
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const NavItems = () => (
    <>
      <div className="px-3 py-2">
        <Link href="/" className="flex items-center gap-2 px-2 py-1">
          <Package2 className="h-6 w-6" />
          <span className="font-bold text-xl bg-gradient-to-r from-[#4C2A85] to-purple-400 bg-clip-text text-transparent">
            ZenPay
          </span>
        </Link>
        <div className="mt-8 space-y-1">
          <NavItem href="/dashboard" icon={<Home className="h-4 w-4" />} label="Dashboard" />
          <NavItem href="/payments" icon={<CreditCard className="h-4 w-4" />} label="Payments" />
          <NavItem href="/analytics" icon={<BarChart3 className="h-4 w-4" />} label="Analytics" />
          <NavItem href="/recipients" icon={<Users className="h-4 w-4" />} label="Recipients" />
          <NavItem href="/settings" icon={<Settings className="h-4 w-4" />} label="Settings" />
          <NavItem href="/help" icon={<HelpCircle className="h-4 w-4" />} label="Help & Support" />
        </div>
      </div>
      <div className="mt-auto px-3 py-2">
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </>
  )

  const NavItem = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => {
    const isActive = pathname === href

    return (
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
          isActive ? "bg-[#4C2A85] text-white" : "text-muted-foreground hover:bg-[#4C2A85]/10 hover:text-foreground",
        )}
      >
        {icon}
        {label}
      </Link>
    )
  }

  // Mobile sidebar with sheet
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <ScrollArea className="h-full py-6">
            <NavItems />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    )
  }

  // Desktop sidebar
  return (
    <div className={cn("hidden border-r bg-background md:block", className)}>
      <ScrollArea className="h-full py-6">
        <NavItems />
      </ScrollArea>
    </div>
  )
}
