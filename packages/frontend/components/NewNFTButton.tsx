import { Button, Box } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";

interface Props {
  nftAddress: string;
}

export default function NewNFTButton({ nftAddress }: Props) {
  return (
    <Box>
      <Button leftIcon={<PlusSquareIcon />}>Add New NFT</Button>
    </Box>
  );
}
