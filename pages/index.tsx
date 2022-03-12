import {
  Button,
  Heading,
  Image,
  LinkOverlay,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { SwapWidget } from "@uniswap/widgets";
import type { NextPage } from "next";
import { FITZCOIN_ADDRESS, JSON_RPC_ENDPOINT } from "../constants";
import TOKEN_LIST from "../constants/tokenlist.json";
import ERC20_ABI from "../constants/ERC20.json";

import "@uniswap/widgets/fonts.css";
import useAccount, { WalletType } from "../connectors/useAccount";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import shortenIfAddress from "../utils/shortenIfAddress";
import { Web3Provider } from "@ethersproject/providers";
import useSWR from "swr";
import { BigNumber, Contract } from "ethers";
import { useEffect, useState } from "react";
import fromWei from "../utils/fromWei";

const fetcher =
  (provider: Web3Provider) =>
  async (
    _key: string,
    account: string
  ): Promise<{ fitzBalance: BigNumber; ethBalance: BigNumber }> => {
    const contract = new Contract(FITZCOIN_ADDRESS, ERC20_ABI, provider);
    const fitzBalance = await contract.balanceOf(account);
    const ethBalance = await provider.getBalance(account);
    return { fitzBalance, ethBalance };
  };

const Home: NextPage = () => {
  const { account, isActive, isActivating, connect, disconnect, provider } =
    useAccount();
  const { data, isValidating, mutate } = useSWR(
    account ? ["balance", account] : null,
    provider ? fetcher(provider as unknown as Web3Provider) : null
  );
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setIsOpen(false);
  }, [account]);
  return (
    <>
      <Heading size="sm">You Own</Heading>
      <Heading
        opacity={isActivating || isValidating ? 0.75 : 1}
        color={data && data.fitzBalance.gt(0) ? "green" : undefined}
      >
        {isActivating || isValidating
          ? "..."
          : data
          ? `${fromWei(data.fitzBalance)} FITZ`
          : "0 FITZ"}
      </Heading>
      <Button
        colorScheme={!isActivating && !isActive ? "orange" : undefined}
        size="lg"
        width="100%"
        onClick={() => setIsOpen(true)}
        disabled={isActivating}
      >
        {isActivating
          ? "Loading..."
          : !account
          ? "Connect Wallet"
          : `Connected: ${shortenIfAddress(account)}`}
      </Button>
      <Button
        size="lg"
        width="100%"
        colorScheme={data?.ethBalance.isZero() ? "orange" : undefined}
        rightIcon={data?.ethBalance.isZero() ? <ExternalLinkIcon /> : undefined}
        disabled={!account || !data}
      >
        <LinkOverlay
          href={`https://optimism.banxa.com?walletAddress=${account}`}
          target="_blank"
        >
          {!data || data?.ethBalance.isZero()
            ? "Buy ETH"
            : `${fromWei(data.ethBalance).toFixed(3)} ETH`}
        </LinkOverlay>
      </Button>
      <Modal isCentered isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack pb={4}>
              <Button
                leftIcon={
                  <Image src="/metamask.png" width={"18px"} height={"18px"} />
                }
                size="lg"
                onClick={() => connect(WalletType.MetaMask)}
              >
                MetaMask
              </Button>
              <Button
                leftIcon={
                  <Image src="/coinbase.svg" width={"18px"} height={"18px"} />
                }
                size="lg"
                onClick={() => connect(WalletType.Coinbase)}
              >
                Coinbase
              </Button>
              {account ? (
                <Button size="lg" onClick={() => disconnect()}>
                  Disconnect
                </Button>
              ) : null}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
      <SwapWidget
        width="100%"
        provider={provider}
        tokenList={isActive ? TOKEN_LIST.tokens : undefined}
        jsonRpcEndpoint={JSON_RPC_ENDPOINT}
        defaultInputTokenAddress={"NATIVE"}
        defaultOutputTokenAddress={FITZCOIN_ADDRESS}
      />
      <Button width="100%" size="sm" rightIcon={<ExternalLinkIcon />}>
        <LinkOverlay
          href={`https://app.uniswap.org/#/add/${FITZCOIN_ADDRESS}/ETH/3000?chain=optimism`}
          target="_blank"
        >
          Add Liquidity
        </LinkOverlay>
      </Button>
    </>
  );
};

export default Home;
