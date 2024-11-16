"use client";

import { bidValueData, reviewData } from "@/app/mock-data";
import { ContractService } from "@/services/contractService";
import { web3AuthService } from "@/services/web3AuthService";
import { useStore } from "@/store";
import { system } from "@/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProviderProps } from "next-themes";
import { useEffect } from "react";
import RPC from "../../services/ethersRPC";
import { ColorModeProvider } from "./color-mode";

export function Provider(props: ThemeProviderProps) {
  const {
    provider,
    setProvider,
    setLoggedIn,
    loggedIn,
    nowChain,
    contractService,
    setContractService,
    setUserAddress,
    setCourseReviews,
    setCourseBids,
    setUserAvatar,
  } = useStore();

  useEffect(() => {
    setCourseReviews(reviewData);
    setCourseBids(bidValueData);

    function generateConsistentUrl(input: string): string {
      const baseUrl = "https://noun-api.com/beta/pfp";

      if (!input?.length || typeof input != "string") {
        return baseUrl;
      }

      // 使用簡單的 hash function 將字串轉為數字
      function hashString(str: string): number {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = (hash << 5) - hash + char;
          hash |= 0; // 將數字轉為 32 位整數
        }
        return Math.abs(hash);
      }

      const hash = hashString(input);

      // 利用 hash 值確保相同的輸入生成一致的 query 參數
      const head = (hash % 300) + 1; // 假設範圍為 1-300
      const glasses = (Math.floor(hash / 10) % 50) + 1; // 假設範圍為 1-50
      const background = (Math.floor(hash / 100) % 10) + 1; // 假設範圍為 1-10
      const body = (Math.floor(hash / 1000) % 100) + 1; // 假設範圍為 1-100
      const accessory = (Math.floor(hash / 10000) % 200) + 1; // 假設範圍為 1-200

      return `${baseUrl}?head=${head}&glasses=${glasses}&background=${background}&body=${body}&accessory=${accessory}`;
    }

    const init = async () => {
      try {
        if (!web3AuthService.connected) {
          const provider = await web3AuthService.init();
          if (provider) {
            const newContractService = await new ContractService(
              provider,
              nowChain
            );
            const address = await RPC.getAccounts(provider);
            setUserAvatar(generateConsistentUrl(address));
            setUserAddress(address);
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
