import { metaMask, hooks as metaMaskHooks } from "../connectors/metaMask";
import { hooks as networkHooks } from "../connectors/network";
import { Button } from "@chakra-ui/react";
import { shortenHex } from "../utils";
import { getAddChainParameters } from "../chains";

interface Props {
  setError: (error: Error | undefined) => void;
}

export default function WalletConnectButton({ setError }: Props) {
  const { useAccount } = metaMaskHooks;

  const account = useAccount();

  const { useChainId } = networkHooks;
  const chainId = useChainId();

  const handleConnect = () => {
    if (!chainId) return;

    metaMask
      .activate(getAddChainParameters(chainId))
      .then(() => setError(undefined))
      .catch(setError);
  };

  if (account) {
    return <Button>{shortenHex(account)}</Button>;
  }

  return (
    <Button disabled={!chainId} onClick={handleConnect}>
      Connect Wallet
    </Button>
  );
}
