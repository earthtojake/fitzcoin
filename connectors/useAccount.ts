import { getPriorityConnector } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { AddEthereumChainParameter } from "@web3-react/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { hooks as metaMaskHooks, metaMask } from "./metaMask";
import { hooks as walletLinkHooks, walletLink } from "./walletLink";

export enum WalletType {
  MetaMask = "MetaMask",
  Coinbase = "Coinbase",
}

const {
  usePriorityConnector,
  usePriorityAccount,
  usePriorityChainId,
  usePriorityProvider,
  usePriorityIsActivating,
} = getPriorityConnector(
  [metaMask, metaMaskHooks],
  [walletLink, walletLinkHooks]
);

const addChainIdParams: AddEthereumChainParameter = {
  chainId: 10,
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  chainName: "Optimistic Ethereum",
  rpcUrls: ["https://mainnet.optimism.io"],
};

export default function useAccount() {
  const priorityConnector = usePriorityConnector();
  const isInit = useRef(false);
  const isActivating = usePriorityIsActivating() || !isInit.current;
  useEffect(() => {
    if (priorityConnector.connectEagerly) {
      priorityConnector.connectEagerly();
    }
    isInit.current = true;
  }, []);
  const account = usePriorityAccount();
  const chainId = usePriorityChainId();
  const provider = usePriorityProvider();
  const isWrongNetwork = chainId !== 10;
  const isActive = !!account && !isWrongNetwork;
  const connect = useCallback(async (walletType: WalletType) => {
    switch (walletType) {
      case WalletType.MetaMask:
        await metaMask.activate(addChainIdParams);
        break;
      case WalletType.Coinbase:
        await walletLink.activate(addChainIdParams);
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
      isWrongNetwork,
      isActivating,
      type: account
        ? priorityConnector instanceof MetaMask
          ? WalletType.MetaMask
          : WalletType.Coinbase
        : undefined,
      connect,
      disconnect,
      provider,
    }),
    [
      isActivating,
      isActive,
      isWrongNetwork,
      account,
      chainId,
      provider,
      priorityConnector,
    ]
  );
}
