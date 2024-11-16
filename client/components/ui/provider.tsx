"use client";

import { ContractService } from "@/services/contractService";
import { web3AuthService } from "@/services/web3AuthService";
import { useStore } from "@/store";
import { system } from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProviderProps } from "next-themes";
import { useEffect } from "react";
import { ColorModeProvider } from "./color-mode";

export function Provider(props: ThemeProviderProps) {
  const { provider, setProvider, setLoggedIn, loggedIn } = useStore();
  const { contractService, setContractService } = useStore();

  useEffect(() => {
    const init = async () => {
      try {
        if (!web3AuthService.connected) {
          const provider = await web3AuthService.init();
          if (provider) {
            const newContractService = await new ContractService(provider);
            setContractService(newContractService);
            setProvider(provider);
            setLoggedIn(web3AuthService.connected);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, [provider, contractService, loggedIn]);
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider forcedTheme="light" {...props} />
    </ChakraProvider>
  );
}
