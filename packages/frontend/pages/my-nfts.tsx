import type { NextPage } from "next";
import { Box, Select } from "@chakra-ui/react";
import { Collection } from "../collections";
import { ChangeEvent, useEffect, useState } from "react";
import useCollections from "../hooks/useCollections";
import NewNFTButton from "../components/NewNFTButton";

const MyNFTs: NextPage = () => {
  const collections = useCollections();
  const [desiredCollection, setDesiredCollection] = useState<
    Collection | undefined
  >();

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
        <Box display="flex" flexDir="row-reverse">
          <NewNFTButton nftAddress={desiredCollection.address} />
        </Box>
      )}
    </Box>
  );
};

export default MyNFTs;
