import useMarketplaceContract from "./useMarketplaceContact";
import useSWR from "swr";
import { NFTMarketPlace } from "../contracts/types";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";

function getMarketplaceItems(marketplaceContract: NFTMarketPlace) {
  return async () => {
    return await marketplaceContract.getMarketItems();
  };
}

export default function useMarketplaceItems(suspense = false) {
  const marketplaceContract = useMarketplaceContract();
  const shouldFetch = !!marketplaceContract;

  const result = useSWR(
    shouldFetch ? ["MarketplaceItems"] : null,
    getMarketplaceItems(marketplaceContract!),
    { suspense }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);
  return result;
}
