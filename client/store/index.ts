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

  userAddress: any;
  setUserAddress: (userAddress: any) => void;

  courseReviews: any;
  setCourseReviews: (courseReviews: any) => void;

  courseBids: any;
  setCourseBids: (courseBids: any) => void;

  userAvatar: any;
  setUserAvatar: (userAvatar: any) => void;
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

  userAddress: null,
  setUserAddress: (userAddress) => set({ userAddress }),

  courseReviews: null,
  setCourseReviews: (courseReviews) => set({ courseReviews }),

  courseBids: null,
  setCourseBids: (courseBids) => set({ courseBids }),

  userAvatar: "https://noun-api.com/beta/pfp",
  setUserAvatar: (userAvatar) => set({ userAvatar }),
}));
