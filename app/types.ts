// Charity types
export interface Charity {
    address: string;
    name: string;
    description: string;
    totalReceived: number;
    verified: boolean;
    imageUrl?: string;
  }
  
  // Donation types
  export interface Donation {
    donorAddress: string;
    charityAddress: string;
    amount: number;
    isSubscription: boolean;
    timestamp: Date;
    txHash: string;
  }
  
  // Subscription types
  export interface Subscription {
    donorAddress: string;
    charityAddress: string;
    amount: number;
    interval: number; // in seconds
    nextPayment: Date;
  }
  
  // OnchainKit identity types
  export interface Identity {
    address: string;
    name?: string;
    description?: string;
    attributes?: {
      trait_type: string;
      value: string;
    }[];
    image?: string;
  }