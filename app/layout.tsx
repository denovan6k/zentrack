import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/hooks/use-auth"
// import { Providers } from "./onchainprovider"
import { Providers } from "./webprovider"
import '@rainbow-me/rainbowkit/styles.css';


const poppins = Poppins({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ZenPay - One-Click On-Chain Recurring Payments",
  description:
    "Simplify your crypto subscriptions with ZenPay. Set up recurring payments on Base blockchain with just one click.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {/* <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange> */}
      
          <AuthProvider>
            <Providers>
            {children}
            <Toaster />
            </Providers>
          </AuthProvider>
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}
