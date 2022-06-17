import { AddEthereumChainParameter } from "@web3-react/types";

const ETH: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
};

const MATIC: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Matic",
  symbol: "MATIC",
  decimals: 18,
};

interface BasicChainInformation {
  urls: string[];
  name: string;
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter["nativeCurrency"];
  blockExplorerUrls: AddEthereumChainParameter["blockExplorerUrls"];
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency;
}

export function getAddChainParameters(
  chainId: number
): AddEthereumChainParameter {
  const chainInformation = CHAINS[chainId];

  return {
    chainId,
    chainName: chainInformation.name,
    nativeCurrency: chainInformation.nativeCurrency,
    rpcUrls: chainInformation.urls,
    blockExplorerUrls: chainInformation.blockExplorerUrls,
  };
}

export const CHAINS: {
  [chainId: number]: ExtendedChainInformation;
} = {
  31337: {
    urls: ["http://127.0.0.1:8545"],
    name: "Hardhat",
    nativeCurrency: ETH,
    blockExplorerUrls: [],
  },
  80001: {
    urls: process.env.NEXT_PUBLIC_ALCHEMY_KEY
      ? [
          `https://polygon-mumbai.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_KEY}`,
        ]
      : [],
    name: "Polygon Mumbai",
    nativeCurrency: MATIC,
    blockExplorerUrls: ["https://mumbai.polygonscan.com"],
  },
};

export const URLS: { [chainId: number]: string[] } = Object.keys(
  CHAINS
).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls;

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
  }

  return accumulator;
}, {});
