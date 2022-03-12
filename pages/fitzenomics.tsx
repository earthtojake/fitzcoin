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
          href={`https://optimistic.etherscan.io/address/${FITZCOIN_ADDRESS}`}
          target="_blank"
        >
          here
        </Link>
        .
      </Text>
      <Heading pt={4} size="md">
        Emissions
      </Heading>
      <Text fontSize="md">
        {
          "FITZ will be emitted over the next 40 years or until Fitz's demise (whichever comes first). If FITZ lives beyond 100 years, FITZ becomes inflationary, but the FitzDAO considers this to be an unlikely edge case."
        }
      </Text>
      {/* <Text>
        FITZ can be staked to earn more FITZ. Holders can stake FITZ for a variable lock up period of up to 40 years. Staked FITZ is represented as oldFITZ 
      </Text> */}
    </Stack>
  );
};

export default Fitzenomics;
