import { getPriorityConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { useCallback, useEffect, useMemo } from "react";
import { hooks as metaMaskHooks, metaMask } from "./metaMask";
import { hooks as walletLinkHooks, walletLink } from "./walletLink";

export enum WalletType {
  MetaMask,
  Coinbase,
}

const {
  usePriorityConnector,
  usePriorityAccount,
  usePriorityChainId,
  usePriorityProvider,
} = getPriorityConnector(
  [metaMask, metaMaskHooks],
  [walletLink, walletLinkHooks]
);

export default function useAccount() {
  const priorityConnector = usePriorityConnector();
  useEffect(() => {
    if (priorityConnector.connectEagerly) {
      void priorityConnector.connectEagerly();
    }
  }, []);
  const account = usePriorityAccount();
  const chainId = usePriorityChainId();
  const provider = usePriorityProvider();
  const isActive = !!account;
  const connect = useCallback(async (walletType: WalletType) => {
    switch (walletType) {
      case WalletType.MetaMask:
        await metaMask.activate();
        break;
      case WalletType.Coinbase:
        await walletLink.activate();
        break;
    }
  }, []);
  const disconnect = useCallback(
    () => priorityConnector.deactivate(),
    [priorityConnector]
  );
  return useMemo(
    () => ({
      account,
      isActive,
      type: isActive
        ? priorityConnector instanceof MetaMask
          ? WalletType.MetaMask
          : WalletType.Coinbase
        : undefined,
      connect,
      disconnect,
      provider,
    }),
    [account, chainId, provider, priorityConnector]
  );
}
