/* eslint-disable @typescript-eslint/no-explicit-any */
import create from "zustand";

interface DappState {
  provider: any;
  setProvider: (provider: any) => void;

  contractService: any;
  setContractService: (contractService: any) => void;

  nowChain: "LINEA_SEPOLIA",
  setNowChain: (nowChain: any) => void;

  loggedIn: any;
  setLoggedIn: (loggedIn: any) => void;

  userAddress: any;
  setUserAddress: (userAddress: any) => void;

  courseReviews: any;
  setCourseReviews: (courseReviews: any) => void;

  nftContractService: any;
  setNftContractService: (nftContractService: any) => void;
  
  courseBids: any;
  setCourseBids: (courseBids: any) => void;

  userAvatar: any;
  setUserAvatar: (userAvatar: any) => void;

  courseId: any;
  setCourseId: (courseId: any) => void;

  batchId: any;
  setBatchId: (batchId: any) => void;
}

export const useStore = create<DappState>((set) => ({
  provider: null,
  setProvider: (provider) => set({ provider }),

  nowChain: "HARDHAT_LOCAL",
  setNowChain: (nowChain) => set({ nowChain }),

  contractService: null,
  setContractService: (contractService) => set({ contractService }),
  
  nftContractService: null,
  setNftContractService: (nftContractService) => set({ nftContractService }),

  loggedIn: null,
  setLoggedIn: (loggedIn) => set({ loggedIn }),

  userAddress: null,
  setUserAddress: (userAddress) => set({ userAddress }),

  courseReviews: null,
  setCourseReviews: (courseReviews) => set({ courseReviews }),

  courseBids: null,
  setCourseBids: (courseBids) => set({ courseBids }),

  userAvatar: "",
  setUserAvatar: (userAvatar) => set({ userAvatar }),

  courseId: 0,
  setCourseId: (courseId) => set({ courseId }),

  batchId: 0,
  setBatchId: (batchId) => set({ batchId }),
}));
