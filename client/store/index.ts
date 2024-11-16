/* eslint-disable @typescript-eslint/no-explicit-any */
import create from "zustand";

interface DappState {
  provider: any;
  setProvider: (provider: any) => void;

  contractService: any;
  setContractService: (contractService: any) => void;

  nowChain: any;
  setNowChain: (nowChain: any) => void;

  loggedIn: any;
  setLoggedIn: (loggedIn: any) => void;
}

export const useStore = create<DappState>((set) => ({
  provider: null,
  setProvider: (provider) => set({ provider }),

  nowChain: "ETH_SEPOLIA",
  setNowChain: (nowChain) => set({ nowChain }),

  contractService: null,
  setContractService: (contractService) => set({ contractService }),

  loggedIn: null,
  setLoggedIn: (loggedIn) => set({ loggedIn }),
}));
