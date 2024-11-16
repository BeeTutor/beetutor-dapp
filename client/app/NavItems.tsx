"use client";

import { Box, IconButton, Flex } from "@chakra-ui/react";
import Link, { LinkProps } from "next/link";
import { PropsWithChildren, useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";
import {
  IDKitWidget,
  VerificationLevel,
  ISuccessResult,
} from "@worldcoin/idkit";

export const NavItems: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log(
    "%capp/NavItems.tsx:15 process.env",
    "color: #26bfa5;",
    process.env
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
  };

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
        >
          {ITEMS.map((x, i) => (
            <Box key={i} borderBottom="2px solid" borderColor="primary.800">
              <Link {...x} />
            </Box>
          ))}
        </Flex>
      </Box>
      {/*"之後改成 connect wallet 後 拿 airdrop"*/}
      <IDKitWidget
        app_id="app_staging_" // obtained from the Developer Portal
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
    </>
  );
};

const MOBILE_BREAKPOINT = "md";

const ITEMS: PropsWithChildren<LinkProps>[] = [
  { href: "/courses", children: "Courses" },
  { href: "/tutors", children: "Tutors" },
  { href: "/chat", children: "Chat" },
];
