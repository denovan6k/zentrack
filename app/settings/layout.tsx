"use client"

import type React from "react"

import { useAuth } from "@/hooks/use-auth"
import { Sidebar } from "@/components/sidebar"
import { NotificationsPopover } from "@/components/notifications"
import { UserNav } from "@/components/user-nav"
import { Loader2 } from "lucide-react"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading, isAuthenticated } = useAuth()

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#4C2A85]" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Auth provider will redirect to login
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar className="w-64 flex-shrink-0" />
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-end gap-4 border-b bg-background px-4 md:px-6">
          <div className="md:hidden">
            <Sidebar />
          </div>
          <div className="flex items-center gap-4">
            <NotificationsPopover />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 bg-gray-50 dark:bg-gray-900">{children}</main>
      </div>
    </div>
  )
}
