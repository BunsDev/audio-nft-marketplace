import { getCollectionBySlug, Collection } from "../collections";
import { hooks } from "../connectors/network";
import { useEffect, useState } from "react";

export default function useCollection(collectionSlug: string) {
  const [collection, setCollection] = useState<Collection>();
  const [resolved, setResolved] = useState(false);

  const { useChainId } = hooks;
  const chainId = useChainId();

  useEffect(() => {
    if (chainId) {
      setCollection(getCollectionBySlug(chainId, collectionSlug));
      setResolved(true);
    }
  }, [chainId]);

  return { collection, resolved };
}
