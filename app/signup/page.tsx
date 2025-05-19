"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package2, Wallet, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FundButton } from '@coinbase/onchainkit/fund';
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

import {
  createUserWithEmailAndPassword,
  AuthError,
} from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useAccount } from "wagmi";
const signupSchema = z.object({
  walletAddress: z.string().min(1, { message: "Please connect your wallet" }),
  emailAddress: z
    .string()
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
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
      walletAddress: "",
      emailAddress: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: SignupValues) => {
    setIsConnecting(true);
  const  onChainAddress= address || data.walletAddress;
    try {
      

      // 2. Then do your wallet-based login
      const success = await signup(onChainAddress, data.emailAddress,
        data.password);
      if (success) {
        router.push("/dashboard");
      } else {
        toast({
          title: "Wallet login failed",
          description: "Could not associate that wallet.",
          variant: "destructive",
        });
      }
    } catch (err: any) {
      const message =
        (err as AuthError).message ||
        "Signup failed, please try again.";
      toast({
        title: "Signup error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleConnectWallet = () => {
    setIsConnecting(true);
    setTimeout(() => {
      const mock = "0x" + Math.random().toString(36).slice(2, 10) + "...";
      form.setValue("walletAddress", mock, { shouldValidate: true });
      setIsConnecting(false);
      toast({
        title: "Wallet Connected",
        description: mock,
      });
    }, 1500);
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
          <CardDescription>
            Connect your wallet and create an account to get started.
          </CardDescription>
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
                    <div className="flex items-center gap-2">
                      <FormControl>
                                        <Input
                                          placeholder="0x..."
                                          {...field}
                                          className="flex-1"
                                        />
                                      </FormControl>
                                       {/* dynamic helper text replaces placeholder once connected */}
                  {isConnected && address ? (
                    <p className="mt-1 text-sm text-gray-500 truncate ">{address}</p>
                  ) : ""}
                                      {/* <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleConnectWallet}
                                        disabled={isConnecting}
                                        className="gap-2"
                                      >
                                        <Wallet className="h-4 w-4" />
                                        Connect
                                      </Button> */}
                                      <FundButton className='bg-[#4C2A85] hover:bg-[#3b2064] text-white rounded-lg' />
                    </div>
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
                      <Input
                        placeholder="you@example.com"
                        {...field}
                      />
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
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
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
                disabled={isConnecting || !form.formState.isValid}
              >
                {isConnecting ? "Signing Up..." : "Sign Up"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-[#4C2A85] hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
