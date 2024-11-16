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
import * as RPC from "../../services/ethersRPC";
import { ColorModeProvider } from "./color-mode";
import { ethers } from "ethers";
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
    setSessionStatus,
  } = useStore();

  useEffect(() => {
    setCourseReviews(reviewData);
    setCourseBids(bidValueData);

    const init = async () => {
      try {
        const response = await fetch("/config.json");
        const config = await response.json();
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
          const { ethereum } = window as never;
          const providerBrows = new ethers.BrowserProvider(ethereum);

          if (provider) {
            const newContractService = await new ContractService(
              providerBrows || provider,
              nowChain,
              setSessionStatus
            );
            const newNftContractService = await new NftContractService(
              providerBrows || provider,
              nowChain
            );

            const address = await RPC.getAccounts(provider);
            setUserAvatar(`https://noun-api.com/beta/pfp?name=${address}`);
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
          setUserAvatar(`https://noun-api.com/beta/pfp?name=${userAddress}`);
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
  }, [provider, loggedIn, nowChain]);

  return (
    <ChakraProvider value={system}>
      <ColorModeProvider forcedTheme="light" {...props} />
    </ChakraProvider>
  );
}
