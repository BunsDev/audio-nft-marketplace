import useNFTContract from "./useNFTContract";
import useSWR from "swr";
import { NFT } from "../contracts/types";
import useKeepSWRDataLiveAsBlocksArrive from "./useKeepSWRDataLiveAsBlocksArrive";

function getNFTs(nftContract: NFT) {
  return async () => {
    {
      return await nftContract.getAllTokens();
    }
  };
}

export default function useNFTs(
  nftContractAddress: string | undefined,
  suspense = false
) {
  const nftContract = useNFTContract(nftContractAddress);
  const shouldFetch = !!nftContract;

  const result = useSWR(shouldFetch ? ["NFTs"] : null, getNFTs(nftContract!), {
    suspense,
  });

  useKeepSWRDataLiveAsBlocksArrive(result.mutate);
  return result;
}
