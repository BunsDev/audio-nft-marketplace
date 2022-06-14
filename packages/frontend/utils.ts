import { Network } from "@web3-react/network";
import { MetaMask } from "@web3-react/metamask";
import type { Connector } from "@web3-react/types";

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
