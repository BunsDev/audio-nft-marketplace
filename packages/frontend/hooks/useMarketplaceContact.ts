import useContract from "./useContract";
import { NFTMarketPlace } from "../contracts/types";
import MarketPlaceABI from "../contracts/NFTMarketPlace.json";
import { hooks as networkHooks } from "../connectors/network";
import { NFTMarketplace } from "../config/addresses";

export default function useMarketplaceContract() {
  const { useChainId } = networkHooks;
  const chainId = useChainId();
  let address: string | undefined;
  if (chainId) {
    address = NFTMarketplace[chainId];
  }

  return useContract<NFTMarketPlace>(address, MarketPlaceABI.abi);
}
