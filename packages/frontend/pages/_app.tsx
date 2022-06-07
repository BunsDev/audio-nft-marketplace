import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Web3ReactProvider } from "@web3-react/core";
import getLibrary from "../getLibrary";
import Layout from "../components/Layout";
import theme from "../theme";
import "@fontsource/roboto/400.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
