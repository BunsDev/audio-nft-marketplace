import {
  Badge,
  Box,
  HStack,
  Image,
  Text,
  Center,
  Stack,
  Tooltip,
  useClipboard,
} from "@chakra-ui/react";
import ReactAudioPlayer from "react-audio-player";
import { NFTMarketPlace } from "../contracts/types";
import useCurrentChainParams from "../hooks/useCurrentChainParams";
import useTokenInfo from "../hooks/useTokenInfo";
import { parseBalance, shortenHex } from "../utils";
import BuyNFTButton from "./BuyNFTButton";

interface Props {
  marketItem: NFTMarketPlace.MarketItemStructOutput;
}

export default function NFTRankingCard({ marketItem }: Props) {
  const chainParams = useCurrentChainParams();
  const { nftContract, tokenId } = marketItem;
  const tokenInfo = useTokenInfo(nftContract, tokenId);
  const { hasCopied, onCopy } = useClipboard(tokenInfo?.owner || "");

  return (
    <Box w="full" p={2} shadow="lg">
      {tokenInfo && (
        <Box>
          <HStack gap={2} justify="space-around" align="center">
            <Stack
              direction={{ base: "column", md: "row" }}
              justify="center"
              align="center"
              gap={2}
              h="full"
            >
              <Image
                w="100px"
                h="full"
                objectFit="cover"
                src={tokenInfo.imageURL}
                alt={tokenInfo.name}
              />

              <ReactAudioPlayer src={tokenInfo.audioURL} controls />
            </Stack>

            <Stack
              direction={{ base: "column", md: "row" }}
              justify="center"
              align="center"
            >
              <Badge fontSize="lg" colorScheme="green" variant="solid">
                {parseBalance(
                  marketItem.price,
                  chainParams?.nativeCurrency.decimals
                )}{" "}
                {chainParams?.nativeCurrency.symbol}
              </Badge>

              <BuyNFTButton
                itemId={marketItem.itemId}
                price={marketItem.price}
                seller={marketItem.seller}
              />
            </Stack>
          </HStack>

          <Center flexDirection="column" mt={2}>
            <Text noOfLines={1} fontSize="2xl" fontWeight="bold">
              {tokenInfo.name}
            </Text>
            <Text noOfLines={1} color="gray.600">
              {tokenInfo.description}
            </Text>
            <Box display="flex" gap={2}>
              <Text color="gray.600">The owner:</Text>
              <Tooltip
                closeOnClick={false}
                hasArrow
                label={hasCopied ? "copied" : "copy to clipboard"}
              >
                <Text onClick={onCopy} cursor="pointer">
                  {shortenHex(tokenInfo.owner)}
                </Text>
              </Tooltip>
            </Box>
          </Center>
        </Box>
      )}
    </Box>
  );
}
