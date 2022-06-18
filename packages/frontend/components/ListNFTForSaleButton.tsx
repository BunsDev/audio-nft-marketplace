import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  IconButton,
  useDisclosure,
  Tooltip,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  InputRightAddon,
  InputGroup,
} from "@chakra-ui/react";
import { BigNumber, ethers } from "ethers";
import useMarketplaceContract from "../hooks/useMarketplaceContact";
import { Formik, FormikHelpers, FormikErrors } from "formik";
import { hooks as metaMaskHooks } from "../connectors/metaMask";
import useCurrentChainParams from "../hooks/useCurrentChainParams";
import useNFTContract from "../hooks/useNFTContract";

interface Props {
  nftContractAddress: string;
  tokenId: BigNumber;
  alreadyListed: boolean;
}

interface FormValues {
  price: string;
}

export default function ListNFTForSaleButton({
  nftContractAddress,
  tokenId,
  alreadyListed,
}: Props) {
  const toast = useToast();

  const marketplaceContract = useMarketplaceContract();
  const nftContract = useNFTContract(nftContractAddress);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { useProvider, useAccount } = metaMaskHooks;
  const signer = useProvider()?.getSigner();
  const account = useAccount();
  const chainParams = useCurrentChainParams();

  const formInitialValues: FormValues = {
    price: "",
  };

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    if (!marketplaceContract || !signer || !account || !nftContract) return;
    try {
      const isApproval = await nftContract.isApprovedForAll(
        account,
        marketplaceContract.address
      );
      if (!isApproval) {
        const tx = await nftContract
          .connect(signer)
          .setApprovalForAll(marketplaceContract.address, true);
        await tx.wait();
      }

      const tx = await marketplaceContract
        .connect(signer)
        .createMarketItem(
          nftContractAddress,
          tokenId,
          ethers.utils.parseEther(values.price)
        );
      await tx.wait();

      toast({
        title: "List NFT for sale",
        description: "Added successfully",
        status: "success",
        duration: 7000,
        isClosable: true,
      });
    } catch (error: any) {
      console.log(error);

      toast({
        title: "List NFT for sale",
        description: error.message,
        status: "error",
        duration: 7000,
        isClosable: true,
      });
    }

    actions.resetForm();
    onClose();
  };

  return (
    <Box>
      {/* <Tooltip hasArrow label="list NFT for sale">
        <IconButton
          onClick={onOpen}
          aria-label="list for sale"
          icon={<FiShoppingCart />}
        />
      </Tooltip> */}
      <Button isDisabled={alreadyListed} onClick={onOpen}>
        List for sale
      </Button>

      <Formik
        validateOnMount
        initialValues={formInitialValues}
        onSubmit={handleSubmit}
        validate={(values) => {
          const errors: FormikErrors<FormValues> = {};

          if (Number(values.price) === 0) {
            errors.price = "Price must be greater than 0";
          }

          return errors;
        }}
      >
        {({
          handleSubmit,
          errors,
          touched,
          isValid,
          isSubmitting,
          resetForm,
          values,
          setFieldValue,
        }) => (
          <Modal
            isCentered
            isOpen={isOpen}
            onClose={() => {
              resetForm();
              onClose();
            }}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>List NFT for sale</ModalHeader>
              <ModalCloseButton />
              <form onSubmit={handleSubmit}>
                <ModalBody>
                  <FormControl isInvalid={touched.price && !!errors.price}>
                    <FormLabel htmlFor="price">
                      {chainParams?.nativeCurrency.symbol} Price
                    </FormLabel>
                    <NumberInput
                      onChange={(value) => setFieldValue("price", value)}
                      min={0}
                      precision={6}
                      step={0.1}
                    >
                      <NumberInputField id="price" name="price" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <FormErrorMessage>{errors.price}</FormErrorMessage>
                  </FormControl>
                </ModalBody>

                <ModalFooter>
                  <Button
                    mr={3}
                    onClick={() => {
                      resetForm();
                      onClose();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    isDisabled={
                      !isValid || !marketplaceContract || !nftContract
                    }
                  >
                    List
                  </Button>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
        )}
      </Formik>
    </Box>
  );
}
