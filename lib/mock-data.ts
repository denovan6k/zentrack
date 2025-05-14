
export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  token: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  active: boolean;
  trialDays: number;
  createdAt: string;
  subscribersCount: number;
}

export interface Subscriber {
  id: string;
  address: string;
  subscriptionDate: string;
  nextPaymentDate: string;
  status: 'active' | 'paused' | 'cancelled';
  planId: string;
  totalPaid: number;
}

export interface Subscription {
  id: string;
  planId: string;
  planName: string;
  merchantName: string;
  merchantAddress: string;
  price: number;
  token: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  startDate: string;
  nextPaymentDate: string;
  status: 'active' | 'paused' | 'cancelled';
  paymentHistory: {
    date: string;
    amount: number;
    status: 'success' | 'failed';
    transactionHash: string;
  }[];
}

export const mockPlans: Plan[] = [
  {
    id: "plan-1",
    name: "Basic Plan",
    description: "Entry level subscription with basic features",
    price: 9.99,
    token: "USDC",
    frequency: "monthly",
    active: true,
    trialDays: 7,
    createdAt: "2023-10-15",
    subscribersCount: 47
  },
  {
    id: "plan-2",
    name: "Pro Plan",
    description: "Professional subscription with advanced features",
    price: 29.99,
    token: "USDC",
    frequency: "monthly",
    active: true,
    trialDays: 14,
    createdAt: "2023-09-01",
    subscribersCount: 128
  },
  {
    id: "plan-3",
    name: "Enterprise Plan",
    description: "Enterprise level subscription with all features",
    price: 99.99,
    token: "USDC",
    frequency: "monthly",
    active: true,
    trialDays: 30,
    createdAt: "2023-08-15",
    subscribersCount: 21
  },
  {
    id: "plan-4",
    name: "Annual Access",
    description: "Annual access to all features at a discounted price",
    price: 199.99,
    token: "USDC",
    frequency: "yearly",
    active: false,
    trialDays: 0,
    createdAt: "2024-01-05",
    subscribersCount: 12
  }
];

export const mockSubscribers: Subscriber[] = [
  {
    id: "sub-1",
    address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    subscriptionDate: "2023-10-20",
    nextPaymentDate: "2024-06-20",
    status: "active",
    planId: "plan-1",
    totalPaid: 79.92
  },
  {
    id: "sub-2",
    address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    subscriptionDate: "2023-11-05",
    nextPaymentDate: "2024-06-05",
    status: "active",
    planId: "plan-2",
    totalPaid: 209.93
  },
  {
    id: "sub-3",
    address: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    subscriptionDate: "2023-09-30",
    nextPaymentDate: "",
    status: "cancelled",
    planId: "plan-3",
    totalPaid: 299.97
  }
];

export const mockSubscriptions: Subscription[] = [
  {
    id: "sub-101",
    planId: "plan-1",
    planName: "News Premium",
    merchantName: "Daily Blockchain",
    merchantAddress: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
    price: 5.99,
    token: "USDC",
    frequency: "monthly",
    startDate: "2024-03-15",
    nextPaymentDate: "2024-06-15",
    status: "active",
    paymentHistory: [
      {
        date: "2024-05-15",
        amount: 5.99,
        status: "success",
        transactionHash: "0x6d7c143b296b9dc46780875dad35fa9469aee0c8d4369a6767144a59e845bfad"
      },
      {
        date: "2024-04-15",
        amount: 5.99,
        status: "success",
        transactionHash: "0xf64e8a83289d52975ec86f7c8f1fea679989b310b42fa22336cdab696b982f6d"
      }
    ]
  },
  {
    id: "sub-102",
    planId: "plan-2",
    planName: "Trading Signals Pro",
    merchantName: "CryptoSignals",
    merchantAddress: "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    price: 29.99,
    token: "USDC",
    frequency: "monthly",
    startDate: "2024-02-10",
    nextPaymentDate: "2024-06-10",
    status: "active",
    paymentHistory: [
      {
        date: "2024-05-10",
        amount: 29.99,
        status: "success",
        transactionHash: "0x9b975e72b1630e2a2011cb475d0b92057fb04e36f13f9aabf56abaa64879d4ff"
      },
      {
        date: "2024-04-10",
        amount: 29.99,
        status: "success",
        transactionHash: "0xe1ab0352aad5b1bc3b72cc133fc9c5cdb4e7ffe9f954c2645d967c2ed0b08a4d"
      },
      {
        date: "2024-03-10",
        amount: 29.99,
        status: "success",
        transactionHash: "0x7af7be9f7fe0b96f2abc29f2c75c1fe17910708947ef38896650f5639b52a8ae"
      }
    ]
  },
  {
    id: "sub-103",
    planId: "plan-3",
    planName: "Storage Plus",
    merchantName: "DecentralizedStorage",
    merchantAddress: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    price: 12.99,
    token: "USDC",
    frequency: "monthly",
    startDate: "2024-04-01",
    nextPaymentDate: "",
    status: "paused",
    paymentHistory: [
      {
        date: "2024-05-01",
        amount: 12.99,
        status: "failed",
        transactionHash: ""
      },
      {
        date: "2024-04-01",
        amount: 12.99,
        status: "success",
        transactionHash: "0x1c95b352fe28db9a3619a0d4cd4638e202ff8143638ff51c47664eaef94b03b9"
      }
    ]
  }
];

export const mockRevenue = [
  { month: "Jan", revenue: 2150 },
  { month: "Feb", revenue: 2790 },
  { month: "Mar", revenue: 3430 },
  { month: "Apr", revenue: 4080 },
  { month: "May", revenue: 4580 }
];

export const mockSubscribersGrowth = [
  { month: "Jan", subscribers: 45 },
  { month: "Feb", subscribers: 89 },
  { month: "Mar", subscribers: 132 },
  { month: "Apr", subscribers: 178 },
  { month: "May", subscribers: 208 }
];
