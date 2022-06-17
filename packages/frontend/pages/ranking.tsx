import { Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import useMarketplaceItems from "../hooks/useMarketplaceItems";

const Ranking: NextPage = () => {
  const { data: marketItems } = useMarketplaceItems();

  return <Box></Box>;
};

export default Ranking;
