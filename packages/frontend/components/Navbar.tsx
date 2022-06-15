import {
  Box,
  Container,
  Heading,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { HamburgerIcon } from "@chakra-ui/icons";
import Web3ConnectWithSelect from "./Web3ConnectWithSelect";
import WalletConnectButton from "./WalletConnectButton";
import { network, hooks as networkHooks } from "../connectors/network";
import { useEffect, useState } from "react";

const Navbar = () => {
  const toast = useToast();
  const { useChainId } = networkHooks;
  const chainId = useChainId();
  const [error, setError] = useState<any | undefined>(undefined);

  useEffect(() => {
    if (error) {
      toast({
        title: "Network error",
        description: `${error.message}`,
        status: "error",
        duration: 7000,
        isClosable: true,
      });
    }
  }, [error]);

  useEffect(() => {
    network
      .activate()
      .then(() => setError(undefined))
      .catch(setError);
  }, []);

  return (
    <Box w="100%" shadow="md" bg="gray.50">
      <Container
        maxW="container.lg"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={2}
      >
        <Heading textAlign="center" size="lg" fontWeight="light">
          NFT Marketplace
        </Heading>

        <HStack spacing={7} display={{ base: "none", lg: "flex" }}>
          <NextLink href="/" passHref>
            <Link>Marketplace</Link>
          </NextLink>

          <NextLink href="/my-nfts" passHref>
            <Link>My NFTs</Link>
          </NextLink>

          <NextLink href="/ranking" passHref>
            <Link>Ranking Page</Link>
          </NextLink>
        </HStack>

        <Box display="flex">
          <HStack>
            <Web3ConnectWithSelect
              connector={network}
              chainId={chainId}
              setError={setError}
            />

            <WalletConnectButton setError={setError} />
          </HStack>

          <Box display={{ base: "inline-block", lg: "none" }} ml={2}>
            <Menu>
              <MenuButton
                as={IconButton}
                variant="outline"
                icon={<HamburgerIcon />}
              />

              <MenuList>
                <NextLink href="/" passHref>
                  <MenuItem>Marketplace</MenuItem>
                </NextLink>

                <NextLink href="/my-nfts" passHref>
                  <MenuItem>My NFTs</MenuItem>
                </NextLink>

                <NextLink href="/ranking" passHref>
                  <MenuItem>Ranking Page</MenuItem>
                </NextLink>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
