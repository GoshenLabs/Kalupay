import type { NextPage } from "next";
import {
  Image,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  Divider,
  Center,
  Icon,
  Button
} from "@chakra-ui/react";
import Link from "next/link";
import styles from "../styles/CashInOutForm.module.css";
import LaunchListWidget from "../components/LaunchListWidget";
import { FaTwitter, FaGithub } from "react-icons/fa";

const Home: NextPage = () => {
  return (
    <Container
      maxW="100%"
      p={4}
      borderRadius="lg"
      boxShadow="md"
      bg="black"
      className={styles.formContainer}
      height="100vh"
      maxHeight={1080}
      mx="auto"
    >
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        px={{ base: 2, md: 10 }}
        py={8}
        borderRadius={20}
        justifyContent="center" // Center the content horizontally
      >
        <Flex
          flexDirection="column"
          justifyContent="center"
          w={{ base: "100%", md: "50%" }} // Adjust the width for different breakpoints
        >
          <Stack spacing={4} justifyContent="center">
            <Flex justifyContent="center" alignItems="center">
              <Image
                src="/kalupay.png"
                alt="Kalupay"
                w={100}
                maxW={["100%", "80%", "60%", "40%"]} // Adjust as needed for different breakpoints
                h="auto" // To maintain the aspect ratio and prevent stretching
              />
              <Text
                ml={5}
                textAlign="center"
                fontWeight="extrabold"
                fontSize={["2xl", "3xl", "4xl", "5xl"]} // Adjust font size for different breakpoints
                color={"white"}
              >
                Kalupay
              </Text>
            </Flex>
            <br />
            <Heading
              bgGradient="linear(to-bl, rgba(86, 171, 47, 0.8), rgba(168, 224, 99, 0.8))"
              bgClip="text"
              fontSize={["3xl", "4xl", "5xl", "6xl"]} // Adjust font size for different breakpoints
              fontWeight="extrabold"
              textAlign={"center"}
            >
              Affordable and Inclusive Payment Solutions.
            </Heading>
            <Text fontSize={{ base: "md", md: "xl" }} textAlign={"center"}>
              Seamless, Safe, and Smart
            </Text>
            <Flex justifyContent="center" mt={5}>
              <Icon
                as={FaTwitter}
                boxSize={8}
                cursor="pointer"
                onClick={() =>
                  window.open("https://twitter.com/KalupayOfficial", "_blank")
                }
                mr={4}
              />
              <Icon
                as={FaGithub}
                boxSize={8}
                cursor="pointer"
                onClick={() =>
                  window.open(
                    "https://github.com/GoshenLabs/Kalupay",
                    "_blank"
                  )
                }
                mr={4}
              />
            </Flex>
          </Stack>
          <br />
          <br />
          <Divider orientation="horizontal" borderColor="gray.600" />
          <br />
          <br />
          <Center>
            <Flex alignItems="center" mt={{ base: 4, md: 6 }} bgColor={"black"}>
             {/*  <LaunchListWidget /> */}

             <Link href="/wallet">
            <Button mb={4}>Get Started</Button>
          </Link>
            </Flex>
          </Center>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Home;
