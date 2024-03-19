import React from "react";
import { Container, Flex, Heading, Text, Button, Box } from "@chakra-ui/react";
import WithdrawNow from "../components/WithdrawNow";
import Link from "next/link";
import {
  useBalance,
} from "@thirdweb-dev/react";
import styles from "../styles/CashInOutForm.module.css";

const WithdrawalPage = () => {
  const nativeCurrencyBalance = useBalance();
  return (
    <Container maxW="full" p={[4, 6]}>
         {/* Display native currency balance */}
         <Box bgGradient='linear(to-bl, rgba(86, 171, 47, 0.8), rgba(168, 224, 99, 0.8))' p={4} borderRadius="lg"
      boxShadow="md" width={["100%", "100%", "80%", "60%"]} // Adjust the width based on your design needs
      mx="auto"
      className={styles.balanceContainer}>
                <Heading as="h3" size="md" mb={1}>
                  {nativeCurrencyBalance.isLoading
                    ? "Loading..."
                    : "Your Balance:"}
                </Heading>
                <Text fontWeight="bold">
                  {nativeCurrencyBalance.isLoading
                    ? "Loading..."
                    : nativeCurrencyBalance.data
                    ? `$${nativeCurrencyBalance.data.symbol} ${nativeCurrencyBalance.data.displayValue}`
                    : "No balance available."}
                </Text>
                <br/>
                <Link href="/wallet">
            <Button mb={4}>Back</Button>
          </Link>
              </Box>
      <Flex direction="column" align="center" justify="center">
        <WithdrawNow />
      </Flex>
    </Container>
  );
};

export default WithdrawalPage;
