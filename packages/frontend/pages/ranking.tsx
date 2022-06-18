import { Box, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import useMarketplaceItems from "../hooks/useMarketplaceItems";
import NFTRankingCard from "../components/NFTRankingCard";

const Ranking: NextPage = () => {
  const { data: marketItems } = useMarketplaceItems(true);

  return (
    <Box>
      <VStack gap={5}>
        {marketItems &&
          marketItems.map((item) => {
            return (
              <NFTRankingCard key={item.tokenId.toString()} marketItem={item} />
            );
          })}
      </VStack>
    </Box>
  );
};

export default Ranking;
