"use client";

import { Button } from "@/components/ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { PropsWithChildren, useEffect, useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";

import {
  IDKitWidget,
  ISuccessResult,
  VerificationLevel,
} from "@worldcoin/idkit";

import {
  CHAIN_NAMESPACES,
  IAdapter,
  IProvider,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";

import RPC from "./ethersRPC";

// get from https://dashboard.web3auth.io
const clientId =
  "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ";
const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0xaa36a7",
  rpcTarget: "https://rpc.ankr.com/eth_sepolia",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Ethereum Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};
// IMP START - SDK Initialization
const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3AuthOptions: Web3AuthOptions = {
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider,
};
const web3auth = new Web3Auth(web3AuthOptions);
// IMP END - SDK Initialization

export const NavItems: React.FC = () => {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [showGetAirdrop, setShowGetAirdrop] = useState(true);
  const [showLoginCard, setShowLoginCard] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const getShowGetAirdrop = localStorage.getItem("showGetAirdrop");
    if (getShowGetAirdrop) {
      setShowGetAirdrop(false);
    }
    const init = async () => {
      try {
        // IMP START - Configuring External Wallets
        const adapters = await getDefaultExternalAdapters({
          options: web3AuthOptions,
        });
        adapters.forEach((adapter: IAdapter<unknown>) => {
          web3auth.configureAdapter(adapter);
        });
        // IMP END - Configuring External Wallets
        // IMP START - SDK Initializtion
        await web3auth.initModal();
        // IMP END - SDK Initialization
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    // IMP START - Login
    const web3authProvider = await web3auth.connect();
    // IMP END - Login
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };

  const getUserInfo = async () => {
    // IMP START - Get User Information
    const user = await web3auth.getUserInfo();
    // IMP END - Get User Information
    uiConsole(user);
  };

  const logout = async () => {
    // IMP START - Logout
    await web3auth.logout();
    // IMP END - Logout
    setProvider(null);
    setLoggedIn(false);
    uiConsole("logged out");
    window.location.reload();
  };

  // IMP START - Blockchain Calls
  // Check the RPC file for the implementation
  const getAccounts = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const address = await RPC.getAccounts(provider);
    uiConsole(address);
  };

  const getBalance = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const balance = await RPC.getBalance(provider);
    uiConsole(balance);
  };

  const signMessage = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    const signedMessage = await RPC.signMessage(provider);
    uiConsole(signedMessage);
  };

  const sendTransaction = async () => {
    if (!provider) {
      uiConsole("provider not initialized yet");
      return;
    }
    uiConsole("Sending Transaction...");
    const transactionReceipt = await RPC.sendTransaction(provider);
    uiConsole(transactionReceipt);
  };
  // IMP END - Blockchain Calls

  function uiConsole(...args: any[]): void {
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
      console.log(...args);
    }
  }

  const loggedInView = (
    <>
      <div className="flex-container">
        <div>
          <button onClick={getUserInfo} className="card">
            Get User Info
          </button>
        </div>
        <div>
          <button onClick={getAccounts} className="card">
            Get Accounts
          </button>
        </div>
        <div>
          <button onClick={getBalance} className="card">
            Get Balance
          </button>
        </div>
        <div>
          <button onClick={signMessage} className="card">
            Sign Message
          </button>
        </div>
        <div>
          <button onClick={sendTransaction} className="card">
            Send Transaction
          </button>
        </div>
        <div>
          <button onClick={logout} className="card">
            Log Out
          </button>
        </div>
      </div>
    </>
  );

  function onSuccess() {
    // callback when the modal is closed
    // TODO: 跳 Model 告訴 使用者他可以去買課程了？
  }

  const handleVerify = async (proof: ISuccessResult) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/token/claim/airdrop`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proof),
      }
    );
    if (!res.ok) {
      const body = await res.json();
      // IDKit will display the error message to the user in the modal
      if (body.reason === "max_verifications_reached") {
        throw new Error("You have already claimed.");
      }
      throw new Error("Verification failed.");
    }
    localStorage.setItem("showGetAirdrop", "true");
  };
  const size = "lg";
  return (
    <>
      <Box hideFrom={MOBILE_BREAKPOINT} zIndex={1}>
        <Box
          position="absolute"
          inset="0"
          overflow="hidden"
          pointerEvents={isMobileMenuOpen ? "auto" : "none"}
          transition=".3s"
          {...(isMobileMenuOpen && { background: "blackAlpha.800" })}
        >
          <Box
            position="absolute"
            top="0"
            bottom="0"
            w="full"
            maxW="30rem"
            background="orange.900"
            transition=".3s"
            {...(isMobileMenuOpen
              ? { right: 0, opacity: 1 }
              : { right: "-2rem", opacity: 0 })}
          >
            <Flex
              direction="column"
              mt="8rem"
              color="white"
              gap="4"
              pl="4rem"
              fontSize="4xl"
              fontWeight="bold"
              fontFamily="Courier New, sans-serif"
            >
              {ITEMS.map((x, i) => (
                <Link
                  key={i}
                  onClick={() => setIsMobileMenuOpen(false)}
                  {...x}
                />
              ))}
            </Flex>
          </Box>
        </Box>
        <IconButton
          background="transparent"
          _hover={{ background: "whiteAlpha.500" }}
          onClick={() => setIsMobileMenuOpen((x) => !x)}
        >
          {isMobileMenuOpen ? <LuX color="white" /> : <LuMenu color="black" />}
        </IconButton>
      </Box>
      <Box hideBelow={MOBILE_BREAKPOINT}>
        <Flex
          pr="8"
          gap="8"
          fontWeight="bold"
          fontFamily="Courier New, sans-serif"
          paddingRight={loggedIn ? "5rem" : "1rem"}
        >
          {ITEMS.map((x, i) => (
            <Box key={i} borderBottom="2px solid" borderColor="primary.800">
              <Link {...x} />
            </Box>
          ))}
          {loggedIn && showGetAirdrop && (
            <Box borderBottom="2px solid" borderColor="primary.800">
              <IDKitWidget
                app_id="app_staging_ea00f333ef4307533ceb602fbc7e0a82" // obtained from the Developer Portal
                action="claim-airdrop" // obtained from the Developer Portal
                onSuccess={onSuccess} // callback when the modal is closed
                handleVerify={handleVerify} // callback when the proof is received
                verification_level={VerificationLevel.Device}
              >
                {({ open }) => (
                  // This is the button that will open the IDKit modal
                  <button onClick={open}>Get Airdrop</button>
                )}
              </IDKitWidget>
            </Box>
          )}
          {!loggedIn && (
            <Box borderBottom="2px solid" borderColor="primary.800">
              <button onClick={login} className="card">
                Login
              </button>
            </Box>
          )}
          {loggedIn && (
            <DialogRoot key={size} size={size}>
              <DialogTrigger asChild>
                <Box
                  aspectRatio="1/1"
                  w="2.8rem"
                  borderRadius="50%"
                  overflow="hidden"
                  position="absolute"
                  borderBottom="2px solid"
                  top="1.8rem"
                  right="1.8rem"
                  onClick={() => {
                    setShowLoginCard(!showLoginCard);
                  }}
                >
                  <Image
                    fill
                    objectFit="cover"
                    src={"https://noun-api.com/beta/pfp"}
                    alt={"avatar"}
                  />
                </Box>
              </DialogTrigger>
              <DialogContent bg="gray.50">
                <DialogHeader>
                  <DialogTitle>Dialog Title</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger asChild>
                    <Button onClick={logout}>Logout</Button>
                  </DialogActionTrigger>
                  <DialogActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogActionTrigger>
                </DialogFooter>
                <DialogCloseTrigger />
              </DialogContent>
            </DialogRoot>
          )}
        </Flex>
      </Box>
    </>
  );
};

const MOBILE_BREAKPOINT = "md";

const ITEMS: PropsWithChildren<LinkProps>[] = [
  { href: "/courses", children: "Courses" },
  { href: "/tutors", children: "Tutors" },
  { href: "/chat", children: "Chat" },
];
