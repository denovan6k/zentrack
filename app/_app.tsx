import type { AppProps } from 'next/app';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { base } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const { chains, publicClient } = configureChains(
  [base],
  [publicProvider()]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <WagmiConfig config={wagmiConfig}>
      <OnchainKitProvider
        chain={base}
        appName="Charity DApp"
        appIcon="/favicon.ico"
      >
        {getLayout(<Component {...pageProps} />)}
      </OnchainKitProvider>
    </WagmiConfig>
  );
}