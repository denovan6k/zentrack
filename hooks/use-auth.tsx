"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface User {
  walletAddress: string
  email?: string
  name?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (walletAddress: string) => Promise<boolean>
  logout: () => void
  updateUserProfile: (data: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("zenpay_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("zenpay_user")
      }
    }
    setIsLoading(false)
  }, [])

  // Protect routes
  useEffect(() => {
    if (!isLoading) {
      const publicRoutes = ["/", "/login", "/signup", "/merchant"]
      const isPublicRoute = publicRoutes.includes(pathname)

      if (!user && !isPublicRoute) {
        router.push("/login")
      }
    }
  }, [user, isLoading, pathname, router])

  const login = async (walletAddress: string): Promise<boolean> => {
    try {
      // In a real app, this would validate with a backend
      setIsLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser: User = {
        walletAddress,
        // Default values that would normally come from a backend
        email: `${walletAddress.substring(0, 6)}@example.com`,
        name: `User ${walletAddress.substring(0, 4)}`,
      }

      setUser(newUser)
      localStorage.setItem("zenpay_user", JSON.stringify(newUser))

      toast({
        title: "Login Successful",
        description: "Welcome to ZenPay!",
      })

      return true
    } catch (error) {
      console.error("Login failed:", error)
      toast({
        title: "Login Failed",
        description: "There was an error logging in. Please try again.",
        variant: "destructive",
      })
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("zenpay_user")
    router.push("/")
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
  }

  const updateUserProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem("zenpay_user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
