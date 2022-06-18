import { BigNumber } from "ethers";
import { useState, useEffect } from "react";
import useNFTContract from "./useNFTContract";

export interface TokenInfo {
  name: string;
  description: string;
  imageURL: string;
  audioURL: string;
  owner: string;
}

export default function useTokenInfo(
  nftContractAddress: string,
  tokenId: BigNumber,
  tokenURI?: string
) {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>();
  const nftContract = useNFTContract(nftContractAddress);

  useEffect(() => {
    if (nftContract) {
      (async () => {
        if (!tokenURI) {
          tokenURI = await nftContract.tokenURI(tokenId);
        }

        const response = await fetch(tokenURI);
        const tokenInfo = await response.json();
        const tokenOwner = await nftContract.ownerOf(tokenId);
        setTokenInfo({
          ...tokenInfo,
          owner: tokenOwner,
        });
      })();
    }
  }, [nftContract]);

  return tokenInfo;
}
