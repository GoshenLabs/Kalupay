import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  embeddedWallet,
  trustWallet,
  rainbowWallet
} from "@thirdweb-dev/react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import Head from "next/head";
import "/styles/global.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { extendTheme } from '@chakra-ui/react'
import { NeonEvmDevnet } from '@thirdweb-dev/chains';
import Announcement from '../components/Announcement';

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: 'black.400',
        color: 'white',
      },
      // styles for the `a`
      a: {
        color: 'teal.500',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: 'false',
    cssVarPrefix: 'ck',
  },
})


// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.

const clientAPI = process.env.THIRDWEB_API_KEY as string;


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain={NeonEvmDevnet}
      clientId={clientAPI}
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect(),
        localWallet(),
        embeddedWallet({
          recommended: true,
          auth: {
            options: [
              "email",
              "google",
              "apple",
              "facebook",
            ],
          },
        }),
        trustWallet(),
        rainbowWallet(),
      ]}
    >
      <ChakraProvider theme={theme}>
      <CSSReset />
        <Head>
          <title>
            Kalupay - Affordable and Inclusive Payment Solutions.
          </title>
          <meta
            name="description"
            content="Affordable and Inclusive Payment Solutions."
          />
          <meta
            property="og:title"
            content="Kalupay - Affordable and Inclusive Payment Solutions."
          />
          <meta
            property="og:description"
            content="Affordable and Inclusive Payment Solutions."
          />
          <meta property="og:image" content="/metadata.png" />
          <meta property="og:url" content="https://kalupay.goshendao.com" />
          <meta property="og:type" content="website" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Kalupay - Affordable and Inclusive Payment Solutions."
          />
          <meta
            name="twitter:description"
            content="Affordable and Inclusive Payment Solutions."
          />
          <meta name="twitter:image" content="/metadata.png" />
          <meta name="twitter:url" content="https://kalupay.goshendao.com" />
        </Head>
        <Announcement text="🚨 You are in test mode! Assets has no value." />
        <Component {...pageProps} />
        <SpeedInsights />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
