import { useEffect, useState } from "react";
import { hooks as networkHooks } from "../connectors/network";
import { getCollectionsByChain, Collection } from "../collections";

export default function useCollections() {
  const { useChainId } = networkHooks;
  const chainId = useChainId();
  const [collections, setCollections] = useState<Collection[] | undefined>();

  useEffect(() => {
    if (chainId) {
      setCollections(getCollectionsByChain(chainId));
    }
  }, [chainId]);

  return collections;
}
