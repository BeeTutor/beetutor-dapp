import logo from "@/assets/logo.png";
import { Provider } from "@/components/ui/provider";
import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { NavItems } from "./NavItems";

export default function RootLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          <Box>
            <Flex p="4" alignItems="center">
              <Link href="/">
                <Flex alignItems="center" gap={2}>
                  <Box w="4rem">
                    <Image src={logo} alt="Logo" />
                  </Box>
                  <Box
                    fontSize="1.5rem"
                    fontWeight="extrabold"
                    fontFamily="Comic Sans MS, sans-serif"
                  >
                    BeeTutor
                  </Box>
                </Flex>
              </Link>
              <Box flex="1" />
              <NavItems />
            </Flex>
            <Box px={{ base: 4, md: 8 }} pb="4">
              {children}
            </Box>
          </Box>
        </Provider>
      </body>
    </html>
  );
}
