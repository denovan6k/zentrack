"use client"

import { useState, useEffect } from "react"
import { Bell, Check, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface Notification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: "payment" | "system" | "security"
}

export function NotificationsPopover() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  // Load mock notifications
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        title: "Payment Successful",
        description: "Your payment of $20.00 to Content Creator Subscription was successful.",
        time: "10 minutes ago",
        read: false,
        type: "payment",
      },
      {
        id: "2",
        title: "Upcoming Payment",
        description: "You have a scheduled payment of $50.00 to NFT Membership tomorrow.",
        time: "1 hour ago",
        read: false,
        type: "payment",
      },
      {
        id: "3",
        title: "New Wallet Connected",
        description: "A new wallet has been connected to your account.",
        time: "2 hours ago",
        read: true,
        type: "security",
      },
      {
        id: "4",
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
        time: "1 day ago",
        read: true,
        type: "system",
      },
      {
        id: "5",
        title: "Payment Failed",
        description: "Your payment of $15.00 to Gaming Subscription failed. Please check your balance.",
        time: "2 days ago",
        read: true,
        type: "payment",
      },
    ]

    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter((n) => !n.read).length)
  }, [])

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
    setUnreadCount(0)
    toast({
      title: "All notifications marked as read",
    })
  }

  const clearAllNotifications = () => {
    setNotifications([])
    setUnreadCount(0)
    toast({
      title: "All notifications cleared",
    })
  }

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
    setUnreadCount((prev) => prev - 1)
  }

  const deleteNotification = (id: string) => {
    const notification = notifications.find((n) => n.id === id)
    setNotifications(notifications.filter((n) => n.id !== id))
    if (notification && !notification.read) {
      setUnreadCount((prev) => prev - 1)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "payment":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4C2A85]/10">
            <CreditCard className="h-4 w-4 text-[#4C2A85]" />
          </div>
        )
      case "security":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
            <Shield className="h-4 w-4 text-red-600" />
          </div>
        )
      case "system":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
            <Bell className="h-4 w-4 text-blue-600" />
          </div>
        )
      default:
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
            <Bell className="h-4 w-4 text-gray-600" />
          </div>
        )
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#4C2A85] text-[10px] text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4">
          <div className="font-medium">Notifications</div>
          <div className="flex gap-1">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" className="h-8 px-2" onClick={markAllAsRead}>
                <Check className="mr-1 h-3.5 w-3.5" />
                <span className="text-xs">Mark all read</span>
              </Button>
            )}
            {notifications.length > 0 && (
              <Button variant="ghost" size="sm" className="h-8 px-2" onClick={clearAllNotifications}>
                <Trash2 className="mr-1 h-3.5 w-3.5" />
                <span className="text-xs">Clear all</span>
              </Button>
            )}
          </div>
        </div>
        <Separator />
        {notifications.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">No notifications</div>
        ) : (
          <ScrollArea className="h-[300px]">
            <div className="space-y-1 p-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex gap-3 rounded-lg p-3 transition-colors",
                    notification.read ? "bg-background" : "bg-muted/50",
                  )}
                >
                  {getNotificationIcon(notification.type)}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{notification.title}</div>
                      <div className="flex items-center gap-1">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-3.5 w-3.5" />
                            <span className="sr-only">Mark as read</span>
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <X className="h-3.5 w-3.5" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{notification.description}</div>
                    <div className="text-xs text-muted-foreground">{notification.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </PopoverContent>
    </Popover>
  )
}

import { CreditCard, Shield } from "lucide-react"
