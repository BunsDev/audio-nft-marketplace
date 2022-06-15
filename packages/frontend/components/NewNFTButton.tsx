import { Button, Box } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { hooks as metaMaskHooks } from "../connectors/metaMask";

interface Props {
  nftAddress: string;
}

export default function NewNFTButton({ nftAddress }: Props) {
  const { useAccount } = metaMaskHooks;
  const account = useAccount();

  return (
    <Box>
      <Button isDisabled={!account} leftIcon={<PlusSquareIcon />}>
        Add New NFT
      </Button>
    </Box>
  );
}
