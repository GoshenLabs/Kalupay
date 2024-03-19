// components/Dashboard.tsx
import React from "react";
import {
  FaExchangeAlt,
  FaHandHoldingUsd,
  FaCoins,
  FaArrowDown,
  FaArrowUp,
  FaWallet,
} from "react-icons/fa";
import Link from "next/link";
import styles from "../styles/dashboard.module.css";
import {
  ConnectEmbed,
  darkTheme,
  useShowConnectEmbed,
  useBalance,
  useAddress
} from "@thirdweb-dev/react";
import {
  Heading,
  Text,
  Container,
  Box, // Add this import for Box
  Button
} from "@chakra-ui/react";

const loginOptional = false;

const customTheme = darkTheme({
  colors: {
    accentText: "#ffffff",
    accentButtonBg: "#297500",
    modalBg: "#000000",
    primaryText: "#ededef",
  },
});

const Dashboard: React.FC = () => {
  const showConnectEmbed = useShowConnectEmbed(loginOptional);
  const nativeCurrencyBalance = useBalance();
  const address = useAddress();

  return (
   
    <div>
      {showConnectEmbed ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100vh",
              backgroundColor: "black",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <p style={{ fontSize: "3rem", color: "white", fontWeight: "bold" }}>
              Log in
            </p>
            <ConnectEmbed
              theme={customTheme}
              style={{
                border: "none",
              }}
              auth={{
                loginOptional: loginOptional,
              }}
              onConnect={() => {
                console.log("wallet connected");
              }}
            />
          </div>
        </div>
      ) : (
          <Container maxW="full" p={[4, 6]} height="100vh"
          maxHeight={1080}>
          {/* Display native currency balance */}
          <Box bgGradient='linear(to-bl, rgba(86, 171, 47, 0.8), rgba(168, 224, 99, 0.8))' p={4} borderRadius="lg"
      boxShadow="md" width={["100%", "100%", "80%", "60%"]} // Adjust the width based on your design needs
      mx="auto"
      className={styles.formContainer}>
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
                <Link href="/">
            <Button mb={4}>Home</Button>
          </Link>
              </Box>
              
          <div className={styles.dashboardContainer}>
            <IconButton
              icon={<FaExchangeAlt />}
              label="Transfer"
              link="/transfer"
            />
            <IconButton
              icon={<FaHandHoldingUsd />}
              label="Claim"
              link="/claim"
            />
            <IconButton icon={<FaCoins />} label="Mint" link="/mint" />
            <IconButton
              icon={<FaArrowDown />}
              label="Deposit"
              link="/deposit"
            />
            <IconButton
              icon={<FaArrowUp />}
              label="Withdraw"
              link="/withdraw"
            />
            <IconButton icon={<FaWallet />} label="My Wallet" link={`/profile/${address}`} />

          </div>
          </Container>
        
      )}
    </div>
  );
};

interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  link: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, label, link }) => {
  return (
    <div className={styles.iconButton}>
      <Link href={link}>
        <div>
          {icon}
          <span>{label}</span>
        </div>
      </Link>
    </div>
  );
};

export default Dashboard;
