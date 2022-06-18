import useMarketplaceContract from "./useMarketplaceContact";
import useSWR from "swr";
import { NFTMarketPlace } from "../contracts/types";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";

function getMarketplaceItems(marketplaceContract: NFTMarketPlace) {
  return async (_: string, sort: boolean = false) => {
    let items = await marketplaceContract.getMarketItems();
    if (sort) {
      return [...items].sort((a, b) => (a.price.lt(b.price) ? 1 : -1));
    }
    return items;
  };
}

export default function useMarketplaceItems(sort = false, suspense = false) {
  const marketplaceContract = useMarketplaceContract();
  const shouldFetch = !!marketplaceContract;

  const result = useSWR(
    shouldFetch ? ["MarketplaceItems", sort] : null,
    getMarketplaceItems(marketplaceContract!),
    { suspense }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);
  return result;
}
