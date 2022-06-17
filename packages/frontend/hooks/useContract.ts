import { Contract } from "ethers";
import { useMemo } from "react";
import { hooks as networkHooks } from "../connectors/network";

export default function useContract<T extends Contract = Contract>(
  address: string | undefined,
  ABI: any
): T | null {
  const { useProvider } = networkHooks;
  const provider = useProvider();

  return useMemo(() => {
    if (!provider || !ABI || !address) return null;

    try {
      return new Contract(address, ABI, provider);
    } catch (error) {
      console.log("Failed to get contract", error);
      return null;
    }
  }, [address, provider, ABI]) as T;
}
