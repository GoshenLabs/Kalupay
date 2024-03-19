import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  embeddedWallet,
  trustWallet,
  rainbowWallet,
  smartWallet,
  phantomWallet
} from "@thirdweb-dev/react";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import Head from "next/head";
import "/styles/global.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { extendTheme } from '@chakra-ui/react'
import { BaseSepoliaTestnet } from '@thirdweb-dev/chains';

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


const smartWalletOptions = {
  factoryAddress: "0xD4314431F5C2f9b6b5AEFFc728C0f4be04024d38",
  gasless: true,
};

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.

const clientAPI = process.env.THIRDWEB_API_KEY as string;


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain={BaseSepoliaTestnet}
      clientId={clientAPI}
      supportedWallets={[
        smartWallet(
          metamaskWallet(),
          smartWalletOptions,
        ),
        smartWallet(
          coinbaseWallet(),
          smartWalletOptions,
        ),
        smartWallet(
          walletConnect(),
          smartWalletOptions,
        ),
        smartWallet(
          localWallet(),
          smartWalletOptions,
        ),
        smartWallet(
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
          smartWalletOptions,
        ),
        smartWallet(
          trustWallet(),
          smartWalletOptions,
        ),
        smartWallet(
          rainbowWallet(),
          smartWalletOptions,
        ),
        smartWallet(
          phantomWallet(),
          smartWalletOptions,
        ),
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
        <Component {...pageProps} />
        <SpeedInsights />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
