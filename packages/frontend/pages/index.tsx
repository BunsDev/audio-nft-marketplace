import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import type { NextPage } from "next";
import CollectionCard from "../components/CollectionCard";
import useCollections from "../hooks/useCollections";

const Home: NextPage = () => {
  const collections = useCollections();

  return (
    <Box>
      <Heading size="lg" mb={10} textAlign="center">
        NFT Collections
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        {collections &&
          collections.map((collection) => {
            return (
              <CollectionCard
                slug={collection.slug}
                name={collection.name}
                image={collection.image}
              />
            );
          })}
      </SimpleGrid>
    </Box>
  );
};

export default Home;
