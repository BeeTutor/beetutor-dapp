/* eslint-disable @typescript-eslint/no-explicit-any */
import create from "zustand";

interface DappState {
  provider: any;
  setProvider: (provider: any) => void;
}

export const useStore = create<DappState>((set) => ({
  provider: null,
  setProvider: (provider) => set({ provider }),
}));
