"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package2, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const signupSchema = z.object({
  walletAddress: z.string().min(1, { message: "Please connect your wallet" }),
  emailAddress: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
});

type SignupValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [isConnecting, setIsConnecting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { signup } = useAuth();
  const { address, isConnected } = useAccount();

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      walletAddress: isConnected && address ? address : "",
      emailAddress: "",
      password: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (address) {
      form.setValue("walletAddress", address);
    }
  }, [address, form]);

  const onSubmit = async (data: SignupValues) => {
    setIsConnecting(true);
    const onChainAddress = address || data.walletAddress;

    if (!onChainAddress) {
      toast({
        title: "No wallet connected",
        description: "Please connect your wallet before signing up.",
        variant: "destructive",
      });
      setIsConnecting(false);
      return;
    }

    try {
      const success = await signup(onChainAddress, data.emailAddress, data.password);

      if (success) {
        toast({
          title: "Signup successful",
          description: "Welcome aboard! Redirecting to your dashboard...",
        });
        router.push("/dashboard");
      } else {
        toast({
          title: "Wallet login failed",
          description: "Could not associate that wallet.",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      const message = err.message || "Signup failed, please try again.";
      toast({
        title: "Signup error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Link
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 font-semibold"
      >
        <Package2 className="h-6 w-6" />
        <span className="font-bold text-xl bg-gradient-to-r from-[#4C2A85] to-purple-400 bg-clip-text text-transparent">
          ZenPay
        </span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign Up for ZenPay</CardTitle>
          <CardDescription>Connect your wallet and create an account to get started.</CardDescription>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {/* Wallet Address */}
              <FormField
                control={form.control}
                name="walletAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wallet Address</FormLabel>
                    <FormControl>
                      <ConnectButton label="Connect wallet" />
                    </FormControl>
                    {form.watch("walletAddress") && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        Connected: {form.watch("walletAddress")}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="emailAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-[#4C2A85] hover:bg-[#3b2064]"
                disabled={!isConnected || isConnecting}
              >
                {isConnecting ? "Signing Up..." : "Sign Up"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-[#4C2A85] hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
