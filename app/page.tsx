import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  CheckCircle,
  Play,
  ChevronRight,
  Shield,
  Zap,
  Lock,
  Wallet,
  CreditCard,
  Code,
  BarChart,
  Users,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link className="flex items-center gap-2" href="/">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-[#4C2A85] to-purple-400">
              {/* <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">Z</div> */}
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-[#4C2A85] to-purple-400 bg-clip-text text-transparent">
              Zentrack
            </span>
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link className="text-sm font-medium hover:text-[#4C2A85] transition-colors" href="#features">
              Features
            </Link>
            <Link className="text-sm font-medium hover:text-[#4C2A85] transition-colors" href="#how-it-works">
              How it works
            </Link>
            <Link className="text-sm font-medium hover:text-[#4C2A85] transition-colors" href="#pricing">
              Pricing
            </Link>
            <Link className="text-sm font-medium hover:text-[#4C2A85] transition-colors" href="#faq">
              FAQs
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hidden sm:flex">
                Sign In
              </Button>
            </Link>
            <Link href="/login">
        
            </Link>
            <Link href="/login">
              <Button className="sm:hidden bg-[#4C2A85] hover:bg-[#3b2064]">
                <Wallet className="h-4 w-4 mr-2" />
                Connect
              </Button>
            </Link>
            <Link href="/login" className="hidden sm:block">
              <Button className="bg-[#4C2A85] hover:bg-[#3b2064]">
                <Wallet className="h-4 w-4 mr-2" />
                Connect Wallet
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          {/* Background particles */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50 dark:from-gray-950 dark:to-gray-900"></div>
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-[#4C2A85]/10 animate-pulse"
                style={{
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${Math.random() * 10 + 5}s`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
              ></div>
            ))}
          </div>

          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="inline-flex items-center rounded-full border border-[#4C2A85]/20 bg-[#4C2A85]/10 px-3 py-1 text-sm font-medium text-[#4C2A85]">
                    Powered by Base
                  </Badge>
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                    Subscription Payments, <span className="text-[#4C2A85]">Simplified On-Chain</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    One authorization. Endless recurring payments. Powered by Base.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="bg-gradient-to-r from-[#4C2A85] to-purple-500 hover:from-[#3b2064] hover:to-purple-600 text-white border-0 h-12 px-6 font-medium"asChild>
                    <Link href="/login">
                    Start Accepting Subscriptions
                    <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  {/* <Button variant="outline" className="h-12 px-6 font-medium">
                    <Play className="mr-2 h-4 w-4" />
                    View Demo
                  </Button> */}
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                    <span>Trusted by 500+ merchants</span>
                  </div>
                  {/* <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                    <span>$2M+ in recurring volume</span>
                  </div> */}
                </div>

                {/* <div className="flex flex-wrap items-center gap-4 pt-4">
                  <p className="text-sm text-gray-500">Trusted by:</p>
                  {["Coinbase", "MetaMask", "Rainbow", "Uniswap", "Optimism"].map((partner) => (
                    <div
                      key={partner}
                      className="flex h-8 items-center justify-center rounded-md bg-gray-100 px-3 dark:bg-gray-800"
                    >
                      <span className="text-xs font-medium">{partner}</span>
                    </div>
                  ))}
                </div> */}
              </div>
              
               <Image src="./heroimage.png" alt="" width={1000} height={1000} className="rounded-2xl"/>
             
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-[#4C2A85]/10 text-[#4C2A85]">Simple Process</Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Recurring Payments in Three Simple Steps
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  Set up your recurring payment flow in minutes, not days.
                </p>
              </div>
            </div>

            <div className="mt-16">
              <Tabs defaultValue="create" className="w-full">
                <div className="flex justify-center mb-8">
                  <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="create">Create</TabsTrigger>
                    <TabsTrigger value="integrate">Integrate</TabsTrigger>
                    <TabsTrigger value="collect">Collect</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="create" className="mt-0">
                  <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#4C2A85]/10 text-[#4C2A85]">
                        <span className="font-bold text-xl">1</span>
                      </div>
                      <h3 className="text-2xl font-bold">Design Your Subscription Plan</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Create flexible subscription plans with customizable intervals, amounts, and trial periods. Set
                        up daily, weekly, monthly, or custom recurring schedules.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                          <span>Flexible payment intervals</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                          <span>Customizable subscription amounts</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                          <span>Optional trial periods</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 aspect-video flex items-center justify-center">
                      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6">
                        <div className="space-y-4">
                          <h4 className="font-medium">Create Subscription Plan</h4>
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <label className="text-sm font-medium">Plan Name</label>
                              <div className="h-10 rounded-md border bg-gray-50 dark:bg-gray-800 px-3 flex items-center">
                                Premium Membership
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="text-sm font-medium">Amount (USDC)</label>
                              <div className="h-10 rounded-md border bg-gray-50 dark:bg-gray-800 px-3 flex items-center">
                                19.99
                              </div>
                            </div>
                            <div className="space-y-1">
                              <label className="text-sm font-medium">Billing Frequency</label>
                              <div className="h-10 rounded-md border bg-gray-50 dark:bg-gray-800 px-3 flex items-center">
                                Monthly
                              </div>
                            </div>
                            <div className="pt-2">
                              <div className="bg-[#4C2A85] text-white rounded-md py-2 px-4 text-center text-sm font-medium">
                                Create Plan
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="integrate" className="mt-0">
                  <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#4C2A85]/10 text-[#4C2A85]">
                        <span className="font-bold text-xl">2</span>
                      </div>
                      <h3 className="text-2xl font-bold">Simple Integration</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Add Zentrack to your application with just a few lines of code or use our no-code solution. We
                        provide SDKs for all major frameworks and platforms.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                          <span>JavaScript, React, and Next.js SDKs</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                          <span>No-code embed options</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                          <span>Comprehensive API documentation</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 aspect-video flex items-center justify-center">
                      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-4 font-mono text-sm text-green-400 overflow-hidden">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex space-x-1">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          </div>
                          <span className="text-xs text-gray-400">Coming Soon Zentrack-integration.js</span>
                        </div>
                        <div className="space-y-1">
                          <div>
                            <span className="text-purple-400">import</span> {"{"} Zentrack {"}"}{" "}
                            <span className="text-purple-400">from</span>{" "}
                            <span className="text-yellow-300">'@Zentrack/react'</span>;
                          </div>
                          <br />
                          <div>
                            <span className="text-purple-400">const</span>{" "}
                            <span className="text-blue-400">SubscriptionButton</span> = () {"=> {"}
                          </div>
                          <div>
                            {" "}
                            <span className="text-purple-400">return</span> (
                          </div>
                          <div>
                            {" "}
                            {"<"}
                            <span className="text-blue-400">Zentrack.Button</span>
                          </div>
                          <div>
                            {" "}
                            planId=<span className="text-yellow-300">"plan_12345"</span>
                          </div>
                          <div>
                            {" "}
                            amount=<span className="text-yellow-300">"19.99"</span>
                          </div>
                          <div>
                            {" "}
                            currency=<span className="text-yellow-300">"USDC"</span>
                          </div>
                          <div>
                            {" "}
                            frequency=<span className="text-yellow-300">"monthly"</span>
                          </div>
                          <div> onSuccess={"{handleSuccess}"}</div>
                          <div> {">"}</div>
                          <div> Subscribe Now</div>
                          <div>
                            {" "}
                            {"</"}
                            <span className="text-blue-400">Zentrack.Button</span>
                            {">"}
                          </div>
                          <div> );</div>
                          <div>{"}"}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="collect" className="mt-0">
                  <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div className="space-y-4">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#4C2A85]/10 text-[#4C2A85]">
                        <span className="font-bold text-xl">3</span>
                      </div>
                      <h3 className="text-2xl font-bold">Automatic Collection</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Once set up, payments execute automatically on schedule with no further action required from you
                        or your customers. Monitor all your subscriptions from a single dashboard.
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                          <span>Automated recurring payments</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                          <span>Real-time payment notifications</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                          <span>Comprehensive analytics dashboard</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 aspect-video flex items-center justify-center">
                      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
                        <div className="bg-[#4C2A85] p-4 text-white">
                          <h4 className="font-medium">Subscription Dashboard</h4>
                        </div>
                        <div className="p-4 space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Active Subscriptions</span>
                            <span className="font-bold">247</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Monthly Recurring Revenue</span>
                            <span className="font-bold">$4,928.50</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Next Payment Cycle</span>
                            <span className="font-bold">June 1, 2025</span>
                          </div>
                          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 w-[85%]"></div>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">85% payment success rate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

          </div>
        </section>

        {/* Value Proposition Section */}
        <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-[#4C2A85]/10 text-[#4C2A85]">Features</Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Why Choose Zentrack Recurring?</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  Our platform offers unique advantages for both merchants and customers.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <Card className="overflow-hidden border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4C2A85]/10 mb-4">
                    <Zap className="h-6 w-6 text-[#4C2A85]" />
                  </div>
                  <h3 className="text-xl font-bold">One-Click Authorization</h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Customers authorize once, payments continue automatically without further approvals.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4C2A85]/10 mb-4">
                    <Sparkles className="h-6 w-6 text-[#4C2A85]" />
                  </div>
                  <h3 className="text-xl font-bold">Gas-Efficient</h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Optimized smart contracts minimize transaction costs on the Base blockchain.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4C2A85]/10 mb-4">
                    <Shield className="h-6 w-6 text-[#4C2A85]" />
                  </div>
                  <h3 className="text-xl font-bold">Base-Powered</h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Leverage the speed and security of Base L2 technology for reliable payments.
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-none shadow-md">
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4C2A85]/10 mb-4">
                    <Lock className="h-6 w-6 text-[#4C2A85]" />
                  </div>
                  <h3 className="text-xl font-bold">Non-Custodial</h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Full control of your funds with no intermediaries or third-party custody.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        {/* <section className="py-20 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-[#4C2A85]/10 text-[#4C2A85]">Use Cases</Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Powering Subscriptions Across Industries
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  See how businesses are using Zentrack to transform their recurring revenue.
                </p>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="overflow-hidden border-none shadow-md">
                <div className="h-48 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 flex items-center justify-center">
                  <Users className="h-16 w-16 text-[#4C2A85]" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold">Content Creators</h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Membership subscriptions for premium content, with automatic renewals and flexible tiers.
                  </p>
                  <div className="mt-4 flex items-center text-[#4C2A85]">
                    <Link href="#" className="text-sm font-medium flex items-center">
                      Learn more
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-none shadow-md">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900 dark:to-green-900 flex items-center justify-center">
                  <Code className="h-16 w-16 text-[#4C2A85]" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold">SaaS Platforms</h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Recurring billing for web3 applications, with usage-based pricing and automatic invoicing.
                  </p>
                  <div className="mt-4 flex items-center text-[#4C2A85]">
                    <Link href="#" className="text-sm font-medium flex items-center">
                      Learn more
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-none shadow-md">
                <div className="h-48 bg-gradient-to-br from-green-100 to-yellow-100 dark:from-green-900 dark:to-yellow-900 flex items-center justify-center">
                  <BarChart className="h-16 w-16 text-[#4C2A85]" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold">Gaming & NFTs</h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Season passes and continuous perks for gaming platforms and NFT communities.
                  </p>
                  <div className="mt-4 flex items-center text-[#4C2A85]">
                    <Link href="#" className="text-sm font-medium flex items-center">
                      Learn more
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-16 flex justify-center">
              <Card className="w-full max-w-4xl border-none shadow-lg">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-shrink-0">
                      <div className="h-20 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                    <div className="flex-1">
                      <blockquote className="text-xl italic text-gray-700 dark:text-gray-300">
                        "Zentrack has transformed how we handle subscriptions. Our members love the seamless experience,
                        and we've seen a 40% increase in subscription renewals since implementation."
                      </blockquote>
                      <div className="mt-4">
                        <p className="font-bold">Sarah Johnson</p>
                        <p className="text-sm text-gray-500">CEO, MetaCreators</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section> */}

        {/* Integration Showcase */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-[#4C2A85]/10 text-[#4C2A85]">Integration</Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Seamless Integration, Any Platform
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  Add Zentrack to your application with minimal effort, regardless of your tech stack.
                </p>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4">Simple Code Integration</h3>
                  <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-green-400 overflow-auto">
                     <div className="flex items-center justify-between mb-2">
                          <div className="flex space-x-1">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          </div>
                          <span className="text-xs text-gray-400">Coming Soon Zentrack-integration.js</span>
                        </div>
                    <div>
                      <span className="text-purple-400">import</span> {"{"} ZentrackButton {"}"}{" "}
                      <span className="text-purple-400">from</span>{" "}
                      <span className="text-yellow-300">'@Zentrack/react'</span>;
                    </div>
                    <br />
                    <div>
                      <span className="text-purple-400">export default function</span>{" "}
                      <span className="text-blue-400">SubscriptionPage</span>() {"{"}
                    </div>
                    <div>
                      {" "}
                      <span className="text-purple-400">return</span> (
                    </div>
                    <div>
                      {" "}
                      {"<"}
                      <span className="text-blue-400">div</span>
                      {">"}
                    </div>
                    <div>
                      {" "}
                      {"<"}
                      <span className="text-blue-400">h2</span>
                      {">"}Premium Subscription{"</"}
                      <span className="text-blue-400">h2</span>
                      {">"}
                    </div>
                    <div>
                      {" "}
                      {"<"}
                      <span className="text-blue-400">p</span>
                      {">"}$19.99/month{"</"}
                      <span className="text-blue-400">p</span>
                      {">"}
                    </div>
                    <div>
                      {" "}
                      {"<"}
                      <span className="text-blue-400">ZentrackButton</span>
                    </div>
                    <div>
                      {" "}
                      planId=<span className="text-yellow-300">"premium_monthly"</span>
                    </div>
                    <div> onSuccess={"{handleSuccess}"}</div>
                    <div> {">"}</div>
                    <div> Subscribe Now</div>
                    <div>
                      {" "}
                      {"</"}
                      <span className="text-blue-400">ZentrackButton</span>
                      {">"}
                    </div>
                    <div>
                      {" "}
                      {"</"}
                      <span className="text-blue-400">div</span>
                      {">"}
                    </div>
                    <div> );</div>
                    <div>{"}"}</div>
                  </div>
                </div>

              
              </div>

              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-bold mb-4">Subscriber Experience</h3>
                  <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6">
                    <div className="max-w-xs mx-auto space-y-6">
                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                        <h4 className="font-medium mb-2">GOAT NFT Premium Membership</h4>
                        <p className="text-sm text-gray-500 mb-4">$19.99 billed monthly</p>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm">Exclusive content access</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm">Priority support</span>
                          </div>
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm">Community features</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="bg-[#4C2A85] text-white rounded-md py-2 px-4 text-center text-sm font-medium">
                            Subscribe with Zentrack
                          </div>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">Confirm Subscription</h4>
                          <div className="h-6 w-6 rounded-full bg-[#4C2A85]/20 flex items-center justify-center">
                            <Wallet className="h-3 w-3 text-[#4C2A85]" />
                          </div>
                        </div>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Amount</span>
                            <span>19.99 USDC</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Frequency</span>
                            <span>Monthly</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">First payment</span>
                            <span>Immediately</span>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <div className="bg-[#4C2A85] text-white rounded-md py-2 px-4 text-center text-sm font-medium">
                            Confirm Subscription
                          </div>
                          <div className="border border-gray-200 dark:border-gray-700 rounded-md py-2 px-4 text-center text-sm font-medium">
                            Cancel
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
           
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-[#4C2A85]/10 text-[#4C2A85]">Pricing</Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Simple, Transparent Pricing</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  Choose the plan that works best for your business needs.
                </p>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="overflow-hidden border-none shadow-md">
                <div className="bg-gray-100 dark:bg-gray-800 p-6">
                  <h3 className="text-xl font-bold">Starter</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">1.5%</span>
                    <span className="ml-1 text-gray-500">per transaction</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">Perfect for small businesses and creators</p>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Up to 100 active subscriptions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Basic analytics dashboard</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Email support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Standard payment notifications</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Button className="w-full bg-[#4C2A85] hover:bg-[#3b2064]">Get Started</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-none shadow-xl relative">
                <div className="absolute top-0 right-0 bg-[#4C2A85] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  POPULAR
                </div>
                <div className="bg-[#4C2A85] p-6 text-white">
                  <h3 className="text-xl font-bold">Growth</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">1.0%</span>
                    <span className="ml-1 text-white/80">per transaction</span>
                  </div>
                  <p className="mt-2 text-sm text-white/80">Ideal for growing businesses</p>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Up to 1,000 active subscriptions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Advanced analytics and reporting</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Priority email and chat support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Customizable payment notifications</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Webhook integrations</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Button className="w-full bg-[#4C2A85] hover:bg-[#3b2064]">Get Started</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-none shadow-md">
                <div className="bg-gray-100 dark:bg-gray-800 p-6">
                  <h3 className="text-xl font-bold">Enterprise</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold">Custom</span>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">For large-scale operations</p>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Unlimited active subscriptions</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Enterprise-grade analytics</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Custom integration support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>SLA guarantees</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Button className="w-full bg-[#4C2A85] hover:bg-[#3b2064]">Contact Sales</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-16">
              <h3 className="text-xl font-bold text-center mb-6">Frequently Asked Questions</h3>
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Are there any setup fees?</AccordionTrigger>
                    <AccordionContent>
                      No, there are no setup fees or hidden charges. You only pay the transaction fee percentage based
                      on your plan.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Can I switch plans later?</AccordionTrigger>
                    <AccordionContent>
                      Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of
                      your next billing cycle.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Do you offer a free trial?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we offer a 14-day free trial on all plans so you can test the platform before committing.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>What cryptocurrencies are supported?</AccordionTrigger>
                    <AccordionContent>
                      Currently, we support USDC on the Base blockchain. We plan to add support for additional
                      cryptocurrencies in the future.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-20 bg-gradient-to-br from-[#4C2A85] to-purple-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Transform Your Recurring Revenue?
                </h2>
                <p className="mx-auto max-w-[700px] text-white/80 md:text-xl/relaxed">
                  Join the businesses already growing with Zentrack Recurring
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button className="bg-white text-[#4C2A85] hover:bg-gray-100 h-12 px-6 font-medium">
                  Create Your First Subscription
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="border-white bg-[#c5a6fc] text-[#4C2A85] hover:bg-white/10 h-12 px-6 font-medium">
                  Schedule a Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-[#4C2A85]/10 text-[#4C2A85]">FAQ</Badge>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Frequently Asked Questions</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                  Find answers to common questions about Zentrack Recurring
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-3xl mt-12">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is Zentrack Recurring?</AccordionTrigger>
                  <AccordionContent>
                    Zentrack Recurring is a platform that enables one-click on-chain recurring payments on the Base
                    blockchain. It allows businesses to set up automatic subscription payments for their customers
                    without requiring approval for each transaction.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How does the one-click authorization work?</AccordionTrigger>
                  <AccordionContent>
                    Our smart contracts use a secure authorization mechanism that allows customers to approve recurring
                    payments with a single transaction. Once authorized, payments will execute automatically on the
                    specified schedule without requiring additional approvals.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is Zentrack secure?</AccordionTrigger>
                  <AccordionContent>
                    Yes, security is our top priority. Our smart contracts have undergone rigorous security audits by
                    leading blockchain security firms. We use non-custodial technology, meaning we never take control of
                    your funds at any point.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>What happens if a customer wants to cancel?</AccordionTrigger>
                  <AccordionContent>
                    Customers can cancel their subscription at any time through your application interface or directly
                    through our dashboard. Once canceled, no further payments will be processed.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>How do I integrate Zentrack with my application?</AccordionTrigger>
                  <AccordionContent>
                    We provide SDKs for popular frameworks like React, Next.js, and Vue, making integration simple. You
                    can also use our no-code solution with customizable widgets that can be embedded on any website.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>What cryptocurrencies are supported?</AccordionTrigger>
                  <AccordionContent>
                    Currently, we support USDC on the Base blockchain. We plan to add support for additional
                    cryptocurrencies and networks in the future based on community demand.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-7">
                  <AccordionTrigger>How are gas fees handled?</AccordionTrigger>
                  <AccordionContent>
                    We optimize our smart contracts to minimize gas fees. For subscription payments, gas fees are
                    typically covered by the merchant, but this can be configured based on your business model.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-950 border-t">
        <div className="container px-4 md:px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2 lg:col-span-1">
              <Link className="flex items-center gap-2 mb-4" href="/">
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-[#4C2A85] to-purple-400">
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                    Z
                  </div>
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-[#4C2A85] to-purple-400 bg-clip-text text-transparent">
                  Zentrack
                </span>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Simplifying <br/> on-chain recurring payments for businesses and creators.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-500 hover:text-[#4C2A85]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                  >
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-[#4C2A85]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-[#4C2A85]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Products</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-500 hover:text-[#4C2A85]">
                    Subscriptions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-[#4C2A85]">
                    One-time Payments
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-[#4C2A85]">
                    Merchant Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-[#4C2A85]">
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Solutions</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-500 hover:text-[#4C2A85]">
                    Content Creators
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-[#4C2A85]">
                    SaaS Platforms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-[#4C2A85]">
                    Gaming & NFTs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-[#4C2A85]">
                    DAOs & Communities
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Developers</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-500 hover:text-[#4C2A85]">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-[#4C2A85]">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-[#4C2A85]">
                    SDKs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-[#4C2A85]">
                    Webhooks
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-500 hover:text-[#4C2A85]">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-[#4C2A85]">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-[#4C2A85]">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-[#4C2A85]">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="font-medium">Subscribe to our newsletter</h3>
                <div className="flex max-w-md">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 min-w-0 h-10 rounded-l-md border border-r-0 px-3 py-2 text-sm"
                  />
                  <Button className="rounded-l-none bg-[#4C2A85] hover:bg-[#3b2064]">Subscribe</Button>
                </div>
              </div>

              <div className="flex flex-col md:items-end space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Built on</span>
                  <div className="bg-black text-white text-xs font-bold px-2 py-1 rounded">Base</div>
                </div>
                <div className="text-sm text-gray-500">© 2025 Zentrack Recurring. All rights reserved.</div>
                <div className="flex space-x-4 text-sm">
                  <Link href="#" className="text-gray-500 hover:text-[#4C2A85]">
                    Terms of Service
                  </Link>
                  <Link href="#" className="text-gray-500 hover:text-[#4C2A85]">
                    Privacy Policy
                  </Link>
                  <Link href="#" className="text-gray-500 hover:text-[#4C2A85]">
                    Cookie Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
