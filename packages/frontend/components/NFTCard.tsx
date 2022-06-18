import {
  Box,
  Image,
  VStack,
  Text,
  Center,
  Divider,
  Badge,
} from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import { NFTMarketPlace } from "../contracts/types";
import useCurrentChainParams from "../hooks/useCurrentChainParams";
import { parseBalance } from "../utils";
import ListNFTForSaleButton from "./ListNFTForSaleButton";
import { hooks as metaMaskHooks } from "../connectors/metaMask";
import BuyNFTButton from "./BuyNFTButton";
import useTokenInfo from "../hooks/useTokenInfo";

interface Props {
  tokenId: BigNumber;
  tokenURI: string;
  nftContractAddress: string;
  marketItem?: NFTMarketPlace.MarketItemStructOutput;
}

export default function NFTCard({
  nftContractAddress,
  tokenId,
  tokenURI,
  marketItem,
}: Props) {
  const chainParams = useCurrentChainParams();
  const { useAccount } = metaMaskHooks;
  const account = useAccount();
  const tokenInfo = useTokenInfo(nftContractAddress, tokenId, tokenURI);

  return (
    <Box
      mx="auto"
      w="full"
      maxW="sm"
      borderWidth="1px"
      rounded="lg"
      shadow="lg"
    >
      {tokenInfo ? (
        <Box>
          <Box height="350px" position="relative">
            {marketItem && (
              <Badge
                colorScheme="green"
                variant="solid"
                position="absolute"
                top={2}
                right={2}
              >
                {parseBalance(
                  marketItem.price,
                  chainParams?.nativeCurrency.decimals
                )}{" "}
                {chainParams?.nativeCurrency.symbol}
              </Badge>
            )}

            <Image
              src={tokenInfo.imageURL}
              alt={tokenInfo.name}
              roundedTop="lg"
              height="100%"
              width="100%"
              objectFit="cover"
            />
          </Box>

          <VStack p={6} align="stretch">
            <Text noOfLines={1} fontSize="2xl" fontWeight="bold">
              {tokenInfo.name}
            </Text>
            <Text h="70px" noOfLines={3} color="gray.600">
              {tokenInfo.description}
            </Text>
            <Center pt={4}>
              <ReactAudioPlayer src={tokenInfo.audioURL} controls />
            </Center>
          </VStack>

          <Divider />

          <Box display="flex" flexDirection="row-reverse" gap={2} py={2} px={6}>
            {account === tokenInfo.owner ? (
              <ListNFTForSaleButton
                nftContractAddress={nftContractAddress}
                tokenId={tokenId}
                alreadyListed={!!marketItem}
              />
            ) : null}

            {!!marketItem && account !== tokenInfo.owner ? (
              <BuyNFTButton
                itemId={marketItem.itemId}
                price={marketItem.price}
              />
            ) : null}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}
