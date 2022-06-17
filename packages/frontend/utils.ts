import { Network } from "@web3-react/network";
import { MetaMask } from "@web3-react/metamask";
import type { Connector } from "@web3-react/types";
import { BigNumber, BigNumberish } from "ethers";
import { NFTMarketPlace } from "./contracts/types";
import { formatUnits } from "ethers/lib/utils";

export function shortenHex(hex: string, length = 4) {
  return `${hex.substring(0, length + 2)}...${hex.substring(
    hex.length - length
  )}`;
}

export function getName(connector: Connector) {
  if (connector instanceof MetaMask) return "MetaMask";
  if (connector instanceof Network) return "Network";
  return "Unknown";
}

export function findmarketItemByTokenId(
  marketplaceItems: NFTMarketPlace.MarketItemStructOutput[],
  tokenId: BigNumber
) {
  return marketplaceItems.find((item) => item.tokenId.eq(tokenId));
}

export function parseBalance(
  value: BigNumberish,
  decimals = 18,
  decimalToDisplay = 6
) {
  return parseFloat(formatUnits(value, decimals)).toFixed(decimalToDisplay);
}
