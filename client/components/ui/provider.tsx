"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";
import { system } from "@/theme";
import { useEffect } from "react";
import { web3AuthService } from "@/services/web3AuthService";
import { ContractService } from "@/services/contractService";
import { useStore } from "@/store";
import { ThemeProviderProps } from "next-themes";

export function Provider(props: ThemeProviderProps) {
  const {
    provider,
    setProvider,
    setLoggedIn,
    loggedIn,
    nowChain,
    contractService,
    setContractService,
  } = useStore();

  useEffect(() => {
    const init = async () => {
      try {
        if (!web3AuthService.connected) {
          const provider = await web3AuthService.init();
          if (provider) {
            const newContractService = await new ContractService(
              provider,
              nowChain
            );
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
  }, [provider, contractService, loggedIn, nowChain]);
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider forcedTheme="light" {...props} />
    </ChakraProvider>
  );
}
