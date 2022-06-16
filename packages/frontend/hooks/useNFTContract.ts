import useContract from "./useContract";
import NFTABI from "../contracts/NFT.json";
import { NFT } from "../contracts/types/NFT";

export default function useNFTContract(address: string | undefined) {
  return useContract<NFT>(address, NFTABI.abi);
}
