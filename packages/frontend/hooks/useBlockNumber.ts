import { Web3Provider } from "@ethersproject/providers";
import useSWR from "swr";
import { hooks as networkHooks } from "../connectors/network";

function getBlockNumber(provider: Web3Provider) {
  return async () => {
    return await provider.getBlockNumber();
  };
}

export default function useBlockNumber() {
  const { useProvider } = networkHooks;
  const provider = useProvider();

  const shouldFetch = !!provider;

  return useSWR(
    shouldFetch ? ["BlockNumber"] : null,
    getBlockNumber(provider!),
    {
      refreshInterval: 10 * 1000,
    }
  );
}
