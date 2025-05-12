"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useToast } from "@/hooks/use-toast"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  const handleContactSupport = () => {
    toast({
      title: "Support Request Sent",
      description: "Our team will get back to you shortly.",
    })
  }

  // FAQ data
  const faqs = [
    {
      question: "What is ZenPay?",
      answer:
        "ZenPay is a platform that enables one-click on-chain recurring payments on the Base blockchain. It allows users to set up automatic payments for subscriptions, memberships, and other recurring services using cryptocurrency.",
    },
    {
      question: "How do I set up a recurring payment?",
      answer:
        "To set up a recurring payment, connect your Web3 wallet, navigate to the Payments page, click on 'New Payment', and fill in the recipient address, amount, frequency, and start date. Once confirmed, your payment will be automatically processed according to the schedule you set.",
    },
    {
      question: "What cryptocurrencies are supported?",
      answer:
        "Currently, ZenPay supports USDC (USD Coin) for recurring payments on the Base blockchain. We plan to add support for additional cryptocurrencies in the future.",
    },
    {
      question: "How are gas fees handled?",
      answer:
        "ZenPay handles gas fees through meta-transactions. This means you don't need to worry about having ETH for gas fees for each recurring payment. We cover the gas costs to provide a seamless experience.",
    },
    {
      question: "Can I cancel a recurring payment?",
      answer:
        "Yes, you can cancel a recurring payment at any time. Simply go to the Payments page, find the payment you want to cancel, and click on the 'Cancel Payment' option in the actions menu.",
    },
    {
      question: "Is ZenPay secure?",
      answer:
        "Yes, ZenPay prioritizes security. Our smart contracts undergo rigorous security audits, and we follow best practices to ensure your funds and data are protected. All transactions are processed directly on the blockchain for maximum transparency and security.",
    },
    {
      question: "What happens if I don't have enough funds for a payment?",
      answer:
        "If you don't have sufficient funds in your wallet when a payment is due, the transaction will fail. You'll receive a notification about the failed payment, and you can manually process it once you've added funds to your wallet.",
    },
  ]

  const filteredFaqs = faqs.filter((faq) => {
    return (
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">Find answers to common questions or contact our support team</p>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for help..."
          className="pl-8 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Common questions about ZenPay and recurring payments</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.length === 0 ? (
              <p className="text-center py-4 text-muted-foreground">No results found. Try a different search term.</p>
            ) : (
              filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))
            )}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Still Need Help?</CardTitle>
          <CardDescription>Our support team is ready to assist you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            If you couldn't find the answer to your question in our FAQ, please don't hesitate to reach out to our
            support team. We're here to help you with any issues or questions you may have about ZenPay.
          </p>
          <div className="flex justify-center">
            <Button className="bg-[#4C2A85] hover:bg-[#3b2064]" onClick={handleContactSupport}>
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
