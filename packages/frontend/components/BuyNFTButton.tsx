import { Button, useToast } from "@chakra-ui/react";
import { BigNumber } from "ethers";
import { FiShoppingCart } from "react-icons/fi";
import { hooks as metaMaskHooks } from "../connectors/metaMask";
import useMarketplaceContract from "../hooks/useMarketplaceContact";

interface Props {
  itemId: BigNumber;
  price: BigNumber;
  seller: string;
}

export default function BuyNFTButton({ itemId, price, seller }: Props) {
  const toast = useToast();
  const { useProvider, useAccount } = metaMaskHooks;
  const account = useAccount();
  const signer = useProvider()?.getSigner();
  const marketplaceContract = useMarketplaceContract();

  const handleBuy = async () => {
    if (!marketplaceContract || !signer) return;

    try {
      const tx = await marketplaceContract
        .connect(signer)
        .buyMarketItem(itemId, { value: price });
      await tx.wait();

      toast({
        title: "Buy NFT",
        description: "bought done successfully",
        status: "success",
        duration: 7000,
        isClosable: true,
      });
    } catch (error: any) {
      console.log(error);

      toast({
        title: "Buy NFT",
        description: error.message,
        status: "error",
        duration: 7000,
        isClosable: true,
      });
    }
  };

  return (
    <Button
      disabled={!signer || account === seller}
      onClick={handleBuy}
      leftIcon={<FiShoppingCart />}
    >
      Buy
    </Button>
  );
}
