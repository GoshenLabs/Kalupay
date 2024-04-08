import {
  Box,
  Card,
  Flex,
  Heading,
  Input,
  Text,
  FormControl,
  FormLabel,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  useAddress,
  useContract,
  useContractRead,
  ConnectWallet,
} from "@thirdweb-dev/react";
import { TRANSFER_CONTRACT_ADDRESS } from "../const/addresses";
import TokenSelection from "./TokenSelection";
import { useState } from "react";
import TokenBalance from "./TokenBalance";
import TransferButton from "./TransferButton";
import styles from "../styles/CashInOutForm.module.css";
import QRScanner from "../components/QRScanner";

export default function TransferCard() {
  const address = useAddress();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { contract } = useContract(TRANSFER_CONTRACT_ADDRESS);

  const { data: verifiedTokens, isLoading: isVerifiedTokensLoading } =
    useContractRead(contract, "getVerifiedTokens");

  const [formData, setFormData] = useState({
    receiver: "",
    amount: "",
    message: "",
  });

  const [selectedToken, setSelectedToken] = useState("");

  const handleChange = (event: any, name: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: event.target.value,
    }));
  };

  const handleTokenSelection = (tokenAddress: string) => {
    setSelectedToken(tokenAddress);
  };

  return (
    <Box
      p={4}
      borderRadius="lg"
      boxShadow="md"
      bg="black"
      height= "100%"
      className={styles.formContainer}
      width={["100%", "100%", "80%", "60%"]} // Adjust the width based on your design needs
      mx="auto"
    >
      <Heading fontSize="6xl" mb={4} textAlign="center" color={'white'}>
        Transfer
      </Heading>

      <FormControl mb={4}>
        <FormLabel color={'white'}>Select Asset:</FormLabel>
        <Flex flexDirection="row" mt={2} flexWrap="wrap">
          {!isVerifiedTokensLoading &&
            verifiedTokens.map((token: string) => (
              <Box
                key={token}
                onClick={() => handleTokenSelection(token)}
                className={`${styles.tokenButton} ${
                  selectedToken === token ? styles.selectedToken : ""
                }`}
                flexBasis={["10%"]}
                padding={1}
              >
                <TokenSelection
                  tokenAddress={token}
                  isSelected={selectedToken === token}
                />
              </Box>
            ))}
        </Flex>
      </FormControl>

      <TokenBalance tokenAddress={selectedToken} />

      <FormControl mb={4}>
        <FormLabel color={'white'}>Send To:</FormLabel>
        <Input color={'white'}
          placeholder="e.g., 0x1234567890abcdef..."
          type="text"
          value={formData.receiver}
          bg={'black'}
          required
          onChange={(event) => handleChange(event, "receiver")}
        />
      </FormControl>

      <Button onClick={() => setIsModalOpen(true)}>Scan QR Code</Button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <QRScanner />
          </ModalBody>
        </ModalContent>
      </Modal>

      <FormControl mb={4}>
        <FormLabel color={'white'}>Amount:</FormLabel>
        <Input color={'white'}
          placeholder="0.0"
          type="number"
          value={formData.amount}
          bg={'black'}
          required
          onChange={(event) => handleChange(event, "amount")}
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel color={'white'}>Message (Optional):</FormLabel>
        <Input color={'white'}
          placeholder="Your message"
          type="text"
          value={formData.message}
          bg={'black'}
          onChange={(event) => handleChange(event, "message")}
        />
      </FormControl>


      <Flex justifyContent="center" mt={4}>
        {address ? (
          <TransferButton
            tokenAddress={selectedToken}
            receiver={formData.receiver}
            amount={formData.amount.toString()}
            message={formData.message}
          />
        ) : (
          <ConnectWallet
            theme={"dark"}
            btnTitle={"Click Me to Transfer"}
            modalTitle={"Login"}
            switchToActiveChain={true}
            modalSize={"wide"}
            welcomeScreen={{
              img: {
                src: "https://raw.githubusercontent.com/getdemarked/Crest-App/main/public/crest_icon_logo_colored_nobg.png",
                width: 150,
                height: 150,
              },
              subtitle: "Login to transfer assets",
            }}
            modalTitleIconUrl={
              "https://raw.githubusercontent.com/getdemarked/Crest-App/main/public/favicon.ico"
            }
            detailsBtn={() => {
              return <Text></Text>;
            }}
          />
        )}
      </Flex>
    </Box>
  );
}
