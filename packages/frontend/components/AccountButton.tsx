import { useWeb3React } from "@web3-react/core";
import useMetaMaskOnboarding from "../hooks/useMetaMaskOnboarding";
import { useState, useEffect } from "react";
import { Box, Button, useToast } from "@chakra-ui/react";
import { injected } from "../connectors";
import { UserRejectedRequestError } from "@web3-react/injected-connector";
import { shortenHex } from "../util";

type AccountProps = {
  triedToEagerConnect: boolean;
};

const AccountButton = ({ triedToEagerConnect }: AccountProps) => {
  const toast = useToast();
  const { active, error, activate, account, setError } = useWeb3React();

  const {
    isMetaMaskInstalled,
    isWeb3Available,
    startOnboarding,
    stopOnboarding,
  } = useMetaMaskOnboarding();

  // manage connecting state for injected connector
  const [connecting, setConnecting] = useState(false);
  useEffect(() => {
    if (active || error) {
      setConnecting(false);
      stopOnboarding();
    }
  }, [active, error, stopOnboarding]);

  if (!triedToEagerConnect) {
    return null;
  }

  const handleConnect = () => {
    setConnecting(true);
    activate(injected, undefined, true).catch((error) => {
      toast({
        title: error.name,
        description: error.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    });
  };

  if (typeof account !== "string") {
    return (
      <Box>
        {isWeb3Available ? (
          <Button disabled={connecting} onClick={handleConnect}>
            {" "}
            {isMetaMaskInstalled
              ? "Connect to MetaMask"
              : "Connect to Wallet"}{" "}
          </Button>
        ) : (
          <Button onClick={startOnboarding}>Install Metamask</Button>
        )}
      </Box>
    );
  }

  return <Button>{shortenHex(account)}</Button>;
};

export default AccountButton;
