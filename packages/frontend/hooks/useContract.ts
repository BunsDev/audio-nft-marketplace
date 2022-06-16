import { Contract } from "ethers";
import { useMemo } from "react";
import { hooks as metaMaskHooks } from "../connectors/metaMask";

export default function useContract<T extends Contract = Contract>(
  address: string | undefined,
  ABI: any
): T | null {
  const { useAccount, useProvider } = metaMaskHooks;
  const account = useAccount();
  const provider = useProvider();

  return useMemo(() => {
    if (!provider || !ABI || !account || !address) return null;

    try {
      return new Contract(address, ABI, provider.getSigner(account));
    } catch (error) {
      console.log("Failed to get contract", error);
      return null;
    }
  }, [account, address, provider, ABI]) as T;
}
