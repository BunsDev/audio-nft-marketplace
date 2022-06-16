import type { NextPage } from "next";
import { Box, Select } from "@chakra-ui/react";
import { Collection } from "../collections";
import { ChangeEvent, useEffect, useState } from "react";
import useCollections from "../hooks/useCollections";
import NewNFTButton from "../components/NewNFTButton";
import useOwnerNFTs from "../hooks/useOwnerNFTs";
import { hooks as metaMaskHooks } from "../connectors/metaMask";

const MyNFTs: NextPage = () => {
  const collections = useCollections();
  const { useAccount } = metaMaskHooks;
  const account = useAccount();
  const [desiredCollection, setDesiredCollection] = useState<
    Collection | undefined
  >();

  const { data: nfts } = useOwnerNFTs(desiredCollection?.address, account);

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
          <Box display="flex" flexDir="row-reverse">
            <NewNFTButton nftAddress={desiredCollection.address} />
          </Box>

          <Box>
            {nfts
              ? nfts.map((nft) => {
                  return <Box>{nft.tokenId.toString()}</Box>;
                })
              : null}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default MyNFTs;
