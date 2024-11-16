"use client";

import { Box, IconButton, Flex } from "@chakra-ui/react";
import Link, { LinkProps } from "next/link";
import { PropsWithChildren, useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";

export const NavItems: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    </>
  );
};

const MOBILE_BREAKPOINT = "md";

const ITEMS: PropsWithChildren<LinkProps>[] = [
  { href: "/", children: "Home" },
  { href: "/courses", children: "Courses" },
  { href: "/tutors", children: "Tutors" },
  { href: "/chat", children: "Chat" },
];
