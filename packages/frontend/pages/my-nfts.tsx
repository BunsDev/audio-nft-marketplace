import type { NextPage } from "next";
import { Box, Select, SimpleGrid } from "@chakra-ui/react";
import { Collection } from "../collections";
import { ChangeEvent, useEffect, useState } from "react";
import useCollections from "../hooks/useCollections";
import NewNFTButton from "../components/NewNFTButton";
import useOwnerNFTs from "../hooks/useOwnerNFTs";
import { hooks as metaMaskHooks } from "../connectors/metaMask";
import NFTCard from "../components/NFTCard";
import useMarketplaceItems from "../hooks/useMarketplaceItems";
import { findmarketItemByTokenId } from "../utils";

const MyNFTs: NextPage = () => {
  const collections = useCollections();
  const { useAccount } = metaMaskHooks;
  const account = useAccount();
  const [desiredCollection, setDesiredCollection] = useState<
    Collection | undefined
  >();

  const { data: nfts } = useOwnerNFTs(desiredCollection?.address, account);
  const { data: marketplaceItems } = useMarketplaceItems();

  useEffect(() => {
    if (collections && !desiredCollection) {
      setDesiredCollection(collections[0]);
    }
  }, [collections]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (!collections) return;

    const collection = collections.find(
      (collection) => collection.slug === event.target.value
    );

    setDesiredCollection(collection);
  };

  if (!collections) return null;

  return (
    <Box>
      <Select mb={5} onChange={handleChange}>
        {collections.map((collection) => (
          <option value={collection.slug}>{collection.name}</option>
        ))}
      </Select>

      {desiredCollection && (
        <Box>
          <Box mb={10} display="flex" flexDir="row-reverse">
            <NewNFTButton nftContractAddress={desiredCollection.address} />
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            {nfts && marketplaceItems
              ? nfts.map((nft, i) => {
                  return (
                    <NFTCard
                      key={i}
                      nftContractAddress={desiredCollection.address}
                      tokenId={nft.tokenId}
                      tokenURI={nft.tokenURI}
                      marketItem={findmarketItemByTokenId(
                        marketplaceItems,
                        nft.tokenId
                      )}
                    />
                  );
                })
              : null}
          </SimpleGrid>
        </Box>
      )}
    </Box>
  );
};

export default MyNFTs;
