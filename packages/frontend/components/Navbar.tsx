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
} from "@chakra-ui/react";
import NextLink from "next/link";
import { HamburgerIcon } from "@chakra-ui/icons";
import AccountButton from "./AccountButton";
import useEagerConnect from "../hooks/useEagerConnect";

const Navbar = () => {
  const triedToEagerConnect = useEagerConnect();

  return (
    <Box w="100%" bg="purple.50">
      <Container
        maxW="container.lg"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={2}
        px={4}
      >
        <Heading size="lg" fontWeight="light">
          NFT Marketplace
        </Heading>

        <HStack spacing={7} display={{ base: "none", md: "flex" }}>
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

        <Box>
          <AccountButton triedToEagerConnect={triedToEagerConnect} />

          <Box display={{ base: "inline-block", md: "none" }} ml={2}>
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