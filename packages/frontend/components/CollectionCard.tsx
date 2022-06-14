import { Box, Image, Text, LinkBox, LinkOverlay } from "@chakra-ui/react";
import NextLink from "next/link";

type CollectionProps = {
  name: string;
  slug: string;
  image: string;
};

const CollectionCard = ({ name, image, slug }: CollectionProps) => {
  return (
    <LinkBox
      role="group"
      p={6}
      maxW="450px"
      w="full"
      bg="white"
      boxShadow="2xl"
      rounded="lg"
      pos="relative"
      zIndex={1}
      mx="auto"
    >
      <Box
        rounded="lg"
        mt={-6}
        pos="relative"
        height="230px"
        _after={{
          transition: "all .3s ease",
          content: '""',
          w: "full",
          h: "full",
          pos: "absolute",
          top: 5,
          left: 0,
          backgroundImage: `url(${image})`,
          filter: "blur(15px)",
          zIndex: -1,
        }}
        _groupHover={{
          _after: {
            filter: "blur(20px)",
          },
        }}
      >
        <Image
          rounded="lg"
          height="full"
          width="full"
          objectFit="cover"
          src={image}
        />
      </Box>

      <NextLink href={`/collection/${slug}`} passHref>
        <LinkOverlay>
          {" "}
          <Text
            textAlign="center"
            pt={10}
            color="gray.500"
            fontSize="lg"
            textTransform="uppercase"
          >
            {name}
          </Text>
        </LinkOverlay>
      </NextLink>
    </LinkBox>
  );
};

export default CollectionCard;
