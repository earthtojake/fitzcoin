import { initializeConnector } from "@web3-react/core";
import { WalletLink } from "@web3-react/walletlink";
import { JSON_RPC_ENDPOINT } from "../constants";

export const [walletLink, hooks] = initializeConnector<WalletLink>(
  (actions) =>
    new WalletLink(actions, {
      url: JSON_RPC_ENDPOINT,
      appName: "FitzCoin",
    })
);
