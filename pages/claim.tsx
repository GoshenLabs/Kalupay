import {
    Box,
    Container,
    Flex,
    Heading,
    SimpleGrid,
    Stack,
    Text,
    useToast,
    Button
  } from "@chakra-ui/react";
  import {
    MediaRenderer,
    Web3Button,
    useContract,
    useContractMetadata,
  } from "@thirdweb-dev/react";
  import Link from "next/link";
  import {
    CALIM_TOKEN_CONTRACT_ADDRESS,
    CLAIM_TOKEN_IMAGE,
  } from "../const/addresses";
  import {
    useBalance,
  } from "@thirdweb-dev/react";
  import styles from "../styles/CashInOutForm.module.css";
  
  export default function ClaimPage() {
    const nativeCurrencyBalance = useBalance();
    const { contract } = useContract(CALIM_TOKEN_CONTRACT_ADDRESS, "token-drop");
  
    const { data: contractMetadata } = useContractMetadata(contract);
  
    const claimAmount = 50;
    const toast = useToast();
  
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
                <Text>
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

              <Box
      p={4}
      borderRadius="lg"
      boxShadow="md"
      bg="black"
      className={styles.formContainer}
      width={["100%", "100%", "80%", "60%"]} // Adjust the width based on your design needs
      mx="auto"
    >
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Flex justify={{ base: "center", md: "flex-end" }} align="center">
            <MediaRenderer src={CLAIM_TOKEN_IMAGE} height="100%" width="100%" />
          </Flex>
          <Flex
            flexDirection={"column"}
            align={{ base: "center", md: "flex-start" }}
          >
            <Stack spacing={4} textAlign={{ base: "center", md: "left" }}>
              <Heading fontSize={{ base: "4xl", md: "5xl" }}>
                Claim {contractMetadata?.symbol}
              </Heading>
              <Text fontSize={{ base: "md", md: "xl" }}>
                Claim your FREE {contractMetadata?.symbol} (One time only).{" "}
                <br></br>All transaction fees to claim your{" "}
                {contractMetadata?.symbol} are covered.
                <br></br>Utilize {contractMetadata?.symbol} to navigate Kalupay
              </Text>
              <Text fontWeight={"bold"}>
                Claim {claimAmount} {contractMetadata?.symbol}
              </Text>
              <Box>
                <Web3Button
                  contractAddress={CALIM_TOKEN_CONTRACT_ADDRESS}
                  action={(contract) => contract.erc20.claim(claimAmount)}
                  onError={(error) =>
                    toast({
                      title: "Unsuccessful Claim",
                      description: "Something went wrong while claiming.",
                      status: "error",
                      duration: 90000,
                      isClosable: true,
                    })
                  }
                  onSuccess={() =>
                    toast({
                      title: "Claim Successful",
                      description: "You have successfully claimed tKALU!",
                      status: "success",
                      duration: 90000,
                      isClosable: true,
                    })
                  }
                >
                  Claim {contractMetadata?.symbol} now!
                </Web3Button>
              </Box>
            </Stack>
          </Flex>
        </SimpleGrid>
        </Box>
      </Container>
    );
  }
  