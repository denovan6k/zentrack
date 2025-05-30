'use client';
 
import type { ReactNode } from 'react';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base
 } from 'wagmi/chains'; // add baseSepolia for testing 
 
export function Providers(props: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY} 
       projectId={process.env.NEXT_PUBLIC_CDP_PROJECT_ID}
      chain={base} // add baseSepolia for testing 
    >
      {props.children}
    </OnchainKitProvider>
  );
}