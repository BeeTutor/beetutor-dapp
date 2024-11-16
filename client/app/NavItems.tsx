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
import { Box, Flex, IconButton, createListCollection } from "@chakra-ui/react";
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
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { web3AuthService } from "@/services/web3AuthService";
import { useStore } from "@/store";
import { usePathname } from "next/navigation";
import RPC from "../services/ethersRPC";

export const NavItems: React.FC = () => {
  const pathname = usePathname();

  const { provider, setProvider, loggedIn, setLoggedIn } = useStore();
  const { contractService } = useStore();

  const [showGetAirdrop, setShowGetAirdrop] = useState(true);
  const [showLoginCard, setShowLoginCard] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [chain, setChain] = useState("");
  const CHAINS = createListCollection({
    items: [
      { key: "ETH_SEPOLIA", name: "Sepolia" },
      { key: "HARDHAT_LOCAL", name: "Hardhat" },
      { key: "LINEA_SEPOLIA", name: "Linea Sepolia" },
      { key: "EVM_ON_FLOW_TESTNET", name: "Evm on flow testnet" },
      { key: "SCROLL_SEPOLIA", name: "Scroll sepolia" },
      { key: "MANTLE_SEPOLIA", name: "Mantle sepolia" },
      { key: "ZIRCUIT_TESTNET", name: "Zircuit testnet" },
      { key: "BASE_SEPOLIA", name: "base Sepolia" },
      { key: "ROOTSTOCK_TESTNET", name: "Rootstock testnet" },
      { key: "MORPH_HOLESKY", name: "Morph holesky" },
    ] as const,
    itemToValue: (item) => String(item.key),
  });
  useEffect(() => {
    const getShowGetAirdrop = localStorage.getItem("showGetAirdrop");
    if (getShowGetAirdrop) {
      setShowGetAirdrop(false);
    }

    if (chain?.length > 1) {
      switchChain(chain);
    }
  }, [provider, contractService, chain]);

  const login = async () => {
    const web3authProvider = await web3AuthService.login();
    setProvider(web3authProvider);
    setLoggedIn(web3AuthService.connected);
  };

  const getUserInfo = async () => {
    const user = await web3AuthService.getUserInfo();
    uiConsole(user);
  };

  const logout = async () => {
    await web3AuthService.logout();
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
    return address;
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

  function uiConsole(...args: unknown[]): void {
    console.log("uiConsole", args);
    const el = document.querySelector("#console>p");
    if (el) {
      el.innerHTML = JSON.stringify(args || {}, null, 2);
      console.log(...args);
    }
  }

  async function switchChain(chainMapKey: string) {
    await web3AuthService.switchChain(chainMapKey);
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
        body: JSON.stringify({ proof, to: await getAccounts() }),
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
            <Box
              key={i}
              asChild
              borderBottom="2px solid"
              borderColor={
                pathname.startsWith(x.href.toString())
                  ? "primary.500"
                  : "primary.800"
              }
              _hover={{ borderColor: "primary.500" }}
            >
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
                  <DialogTitle>Switch Chain</DialogTitle>
                  {false && loggedInView}
                </DialogHeader>
                <DialogBody>
                  <SelectRoot
                    variant="outline"
                    collection={CHAINS}
                    size="sm"
                    multiple={false}
                    value={[chain]}
                    onValueChange={(e) => setChain(e.value[0])}
                  >
                    <SelectLabel>Chains</SelectLabel>
                    <SelectTrigger>
                      <SelectValueText placeholder="Select chain">
                        {([item]) => {
                          return `${item.name}`;
                        }}
                      </SelectValueText>
                    </SelectTrigger>
                    <SelectContent portalled={false}>
                      {CHAINS.items.map((session) => (
                        <SelectItem item={session} key={session.name}>
                          <Box>{session.name}</Box>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
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
