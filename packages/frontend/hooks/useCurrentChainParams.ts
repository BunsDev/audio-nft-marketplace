import { AddEthereumChainParameter } from "@web3-react/types";
import { useEffect, useState } from "react";
import { getAddChainParameters } from "../chains";
import { hooks as networkHooks } from "../connectors/network";

export default function useCurrentChainParams() {
  const [chainParams, setChainParams] = useState<AddEthereumChainParameter>();
  const { useChainId } = networkHooks;
  const chainId = useChainId();

  useEffect(() => {
    if (chainId) {
      setChainParams(getAddChainParameters(chainId));
    }
  }, [chainId]);

  return chainParams;
}
