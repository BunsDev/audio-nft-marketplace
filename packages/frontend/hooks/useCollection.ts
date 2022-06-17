import { getCollectionBySlug, Collection } from "../collections";
import { hooks } from "../connectors/network";
import { useEffect, useState } from "react";

export default function useCollection(collectionSlug: string | undefined) {
  const [collection, setCollection] = useState<Collection>();
  const [resolved, setResolved] = useState(false);

  const { useChainId } = hooks;
  const chainId = useChainId();

  useEffect(() => {
    if (chainId && collectionSlug) {
      setCollection(getCollectionBySlug(chainId, collectionSlug));
      setResolved(true);
    }
  }, [chainId, collectionSlug]);

  return { collection, resolved };
}
