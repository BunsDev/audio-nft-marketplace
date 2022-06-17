import {
  Box,
  Center,
  Image,
  Heading,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useCollection from "../../hooks/useCollection";
import useNFTs from "../../hooks/useNFTs";
import NFTCard from "../../components/NFTCard";
import useMarketplaceItems from "../../hooks/useMarketplaceItems";
import { findmarketItemByTokenId } from "../../utils";

const CollectionPage: NextPage = () => {
  const router = useRouter();
  const collectionSlug = router.query.slug as string;
  const { collection, resolved } = useCollection(collectionSlug);
  const { data: nfts } = useNFTs(collection?.address);
  const { data: marketplaceItems } = useMarketplaceItems();

  if (!collection && resolved) {
    return (
      <Center fontSize="3xl" fontWeight="bold">
        404 Collection not found.
      </Center>
    );
  }

  return (
    <Box>
      {collection ? (
        <Box>
          <Box w="full" h="300px">
            <Image
              w="full"
              h="full"
              src={collection.image}
              alt={collection.name}
              roundedTop="lg"
              objectFit="cover"
            />
          </Box>
          <Heading
            fontSize="2xl"
            mt={5}
            textTransform="uppercase"
            color="gray.700"
          >
            {collection.name}
          </Heading>
          <Divider p={2} />

          <SimpleGrid py={10} columns={{ base: 1, md: 2 }} spacing={10}>
            {nfts && marketplaceItems
              ? nfts.map((nft, i) => {
                  return (
                    <NFTCard
                      key={i}
                      nftContractAddress={collection.address}
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
      ) : null}
    </Box>
  );
};

export default CollectionPage;
