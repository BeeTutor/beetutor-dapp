"use client";

import { bidValueData, reviewData } from "@/app/mock-data";
import { ContractService } from "@/services/contractService";
import { NftContractService } from "@/services/nftContractService";
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
    userAddress,
    setCourseId,
    setBatchId,
    nftContractService,
  } = useStore();

  function generateConsistentUrl(address: string): string {
    const lastUrl = localStorage.getItem(address);
    if (lastUrl) {
      return lastUrl;
    }
    const baseUrl = "https://noun-api.com/beta/pfp";
    if (!address?.length || typeof address != "string") {
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

    const hash = hashString(address);

    // 利用 hash 值確保相同的輸入生成一致的 query 參數
    const head = (hash % 3233) + 1; // 假設範圍為 1-300
    const glasses = (Math.floor(hash / 10) % 20) + 1; // 假設範圍為 1-50
    const background = (Math.floor(hash / 100) % 1) + 1; // 假設範圍為 1-10
    const body = (Math.floor(hash / 1000) % 29) + 1; // 假設範圍為 1-100
    const accessory = (Math.floor(hash / 136) % 200) + 1; // 假設範圍為 1-200

    const url = `${baseUrl}?head=${head}&glasses=${glasses}&background=${background}&body=${body}&accessory=${accessory}`;
    localStorage.setItem(address, url);
    return url;
  }

  useEffect(() => {
    setCourseReviews(reviewData);
    setCourseBids(bidValueData);

    const init = async () => {
      try {
        const response = await fetch("/config.json");
        const config = await response.json();
        console.log(":))) ", config);
        setBatchId(config.batch_id);
        setCourseId(config.course_id);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Get course config:", error);
        }
      }
      try {
        if (!web3AuthService.connected) {
          const provider = await web3AuthService.init();
          if (provider) {
            const newContractService = await new ContractService(
              provider,
              nowChain
            );
            const newNftContractService = await new NftContractService(
              provider,
              nowChain
            );

            const address = await RPC.getAccounts(provider);
            setUserAvatar(generateConsistentUrl(address));
            setUserAddress(address);
            setContractService(newContractService);
            setProvider(provider);
            setLoggedIn(web3AuthService.connected);
            return () => {
              newContractService.contract?.removeAllListeners("BidPlaced");
              newNftContractService.contract?.removeAllListeners("NFTUpgraded");
            };
          }
        } else {
          setUserAvatar(generateConsistentUrl(userAddress));
        }
        return () => {
          contractService.contract?.removeAllListeners("BidPlaced");
          nftContractService.contract?.removeAllListeners("NFTUpgraded");
        };
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
