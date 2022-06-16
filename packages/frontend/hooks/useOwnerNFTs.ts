import useNFTContract from "./useNFTContract";
import useSWR from "swr";
import { NFT } from "../contracts/types";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";

function getOwnerNFTs(nftContract: NFT) {
  return async (_: string, owner: string) => {
    return await nftContract.getOwnerTokens(owner);
  };
}

export default function useOwnerNFTs(
  nftAddress: string | undefined,
  owner: string | undefined,
  suspense = false
) {
  const nftContract = useNFTContract(nftAddress);
  const shouldFetch = !!nftContract && typeof owner === "string";

  const result = useSWR(
    shouldFetch ? ["NFTs", owner] : null,
    getOwnerNFTs(nftContract!),
    {
      suspense,
    }
  );

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);
  return result;
}
