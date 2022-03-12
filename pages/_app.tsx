import "../styles/global.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import "@fontsource/inter/400.css";
import "@fontsource/cousine/700.css";
import {
  Button,
  Center,
  Heading,
  Image,
  LinkOverlay,
  Stack,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FITZCOIN_ADDRESS } from "../constants";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();
  return (
    <>
      <Head>
        <title>FiTzCoIn, the UlTimAtE ShiTcOiN</title>
        <meta name="description" content="Buy FITZ to earn FITZ" />
      </Head>
      <ChakraProvider theme={theme}>
        <div className="gradient stack1"></div>
        <div className="gradient stack2"></div>
        <div className="gradient stack3"></div>
        <Center p={16}>
          <Stack alignItems={"center"} maxWidth={420}>
            <Heading textAlign="center" size="4xl">
              FiTzCoIn
            </Heading>
            <Image
              sx={{
                transform: "rotateY(45deg)",
                animation: "rotateAnimation 3.0s linear infinite",
              }}
              src="/fitzcoin.png"
              width={180}
              height={180}
            />
            <Heading textAlign="center">The Ultimate Shitcoin</Heading>
            <Heading fontSize="md" opacity={0.7}>
              Total Supply: 100 FITZ
            </Heading>
            <Center pb={6}>
              <Button
                size="sm"
                aria-label="Buy"
                mr={2}
                colorScheme={
                  !asPath.startsWith("/fitzenomics") ? "green" : undefined
                }
              >
                <NextLink href="/" passHref>
                  <LinkOverlay>Buy</LinkOverlay>
                </NextLink>
              </Button>
              <Button
                size="sm"
                aria-label="View Contract"
                mr={2}
                colorScheme={
                  asPath.startsWith("/fitzenomics") ? "green" : undefined
                }
              >
                <NextLink href="/fitzenomics" passHref>
                  <LinkOverlay>Fitzenomics</LinkOverlay>
                </NextLink>
              </Button>
              <Button
                size="sm"
                aria-label="View Contract"
                rightIcon={<ExternalLinkIcon />}
              >
                <LinkOverlay
                  href={`https://etherscan.io/address/${FITZCOIN_ADDRESS}`}
                  target="_blank"
                >
                  View Contract
                </LinkOverlay>
              </Button>
            </Center>
            <Component {...pageProps} />
          </Stack>
        </Center>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
