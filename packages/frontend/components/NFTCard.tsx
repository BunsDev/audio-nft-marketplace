import { Box, Image, VStack, Text, Center, Divider } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import ListNFTForSaleButton from "./ListNFTForSaleButton";

interface Props {
  tokenId: BigNumber;
  tokenURI: string;
  nftContractAddress: string;
}

interface TokenInfo {
  name: string;
  description: string;
  imageURL: string;
  audioURL: string;
}

export default function NFTCard({
  nftContractAddress,
  tokenId,
  tokenURI,
}: Props) {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>();

  useEffect(() => {
    (async () => {
      const response = await fetch(tokenURI);
      const tokenInfo = await response.json();
      setTokenInfo(tokenInfo);
    })();
  }, []);

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
          <Box height="350px">
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
            <ListNFTForSaleButton
              nftContractAddress={nftContractAddress}
              tokenId={tokenId}
            />
          </Box>
        </Box>
      ) : null}
    </Box>
  );
}
