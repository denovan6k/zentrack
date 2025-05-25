"use client";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme ,
  lightTheme
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { ReactNode } from 'react';

const queryClient = new QueryClient();
const config = getDefaultConfig({
  appName: 'My RainbowKit App',
 projectId: process.env.NEXT_PUBLIC_RAINBOW_PROJECT_ID || 'default-project-id',
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

export function Providers({ children }: { children: ReactNode }) {
  return (
   <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={lightTheme({
          accentColor: '#4C2A85',        // <-- your custom button color
          accentColorForeground: '#FFFFFF',
          borderRadius: 'medium',
        })}>
        {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}