import { Text, Heading, Stack, Link } from "@chakra-ui/react";
import { NextPage } from "next";
import { FITZCOIN_ADDRESS } from "../constants";

const Fitzenomics: NextPage = () => {
  return (
    <Stack textAlign={"center"}>
      <Heading size="md">Total Supply</Heading>
      <Text fontSize="md">
        {
          "There is a total supply of 100 FITZ representing 100 years of Fitz's life. The initial supply is 60 FITZ starting on his 60th birthday. The remaining 40 FITZ will be emitted over the next 40 years. You can view the FITZ ERC-20 contract "
        }
        <Link
          color="blue"
          href={`https://etherscan.io/address/${FITZCOIN_ADDRESS}`}
          target="_blank"
        >
          here
        </Link>
        .
      </Text>
      <Heading pt={4} size="md">
        Emissions
      </Heading>
      <Text fontSize="md">The remaining 40 FITZ is </Text>
    </Stack>
  );
};

export default Fitzenomics;
