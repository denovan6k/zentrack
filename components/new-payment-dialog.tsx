"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  blockchain: z.string({
    required_error: "Please select a blockchain.",
  }),
  recipient: z.string().min(1, {
    message: "Recipient address is required.",
  }),
  amount: z.string().min(1, {
    message: "Amount is required.",
  }),
  frequency: z.string({
    required_error: "Please select a payment frequency.",
  }),
  startDate: z.string().min(1, {
    message: "Start date is required.",
  }),
})

export function NewPaymentDialog() {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blockchain: "",
      recipient: "",
      amount: "",
      frequency: "",
      startDate: "",
    },
  })

  const getBlockchainAddressInfo = (blockchain: string) => {
    switch (blockchain) {
      case "bnb":
        return {
          placeholder: "0x... (BNB Smart Chain Address)",
          description: "Enter the BNB Smart Chain address of the recipient.",
          pattern: "^0x[a-fA-F0-9]{40}$",
        }
      case "tron":
        return {
          placeholder: "T... (Tron Address)",
          description: "Enter the Tron address of the recipient.",
          pattern: "^T[a-zA-Z0-9]{33}$",
        }
      case "ethereum":
        return {
          placeholder: "0x... (Ethereum Address)",
          description: "Enter the Ethereum address of the recipient.",
          pattern: "^0x[a-fA-F0-9]{40}$",
        }
      case "base":
        return {
          placeholder: "0x... (Base Address)",
          description: "Enter the Base blockchain address of the recipient.",
          pattern: "^0x[a-fA-F0-9]{40}$",
        }
      default:
        return {
          placeholder: "Select a blockchain first",
          description: "Enter the blockchain address of the recipient.",
          pattern: "",
        }
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would call a function to interact with the smart contract
    console.log(values)

    // Show success toast
    toast({
      title: "Payment scheduled",
      description: `Your recurring payment on ${values.blockchain} has been set up successfully.`,
    })

    // Close the dialog
    setOpen(false)

    // Reset the form
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#4C2A85] hover:bg-[#3b2064]">
          <Plus className="mr-2 h-4 w-4" />
          New Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Recurring Payment</DialogTitle>
          <DialogDescription>Set up a new recurring payment on the Base blockchain.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="blockchain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blockchain</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select blockchain" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="base">Base</SelectItem>
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                      <SelectItem value="bnb">BNB Smart Chain</SelectItem>
                      <SelectItem value="tron">Tron</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Select the blockchain for this payment.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recipient"
              render={({ field }) => {
                const selectedBlockchain = form.watch("blockchain")
                const addressInfo = getBlockchainAddressInfo(selectedBlockchain)

                return (
                  <FormItem>
                    <FormLabel>Recipient Address</FormLabel>
                    <FormControl>
                      <Input placeholder={addressInfo.placeholder} {...field} disabled={!selectedBlockchain} />
                    </FormControl>
                    <FormDescription>{addressInfo.description}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (USDC)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormDescription>Enter the amount in USDC to send each period.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Frequency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>How often the payment should occur.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>When the first payment should occur.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="bg-[#4C2A85] hover:bg-[#3b2064]">
                Create Payment
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
