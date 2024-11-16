import { IProvider } from "@web3auth/base";
import { BrowserProvider, Contract, ethers, formatEther } from "ethers";
import Swal from "sweetalert2";
import { toaster } from "../components/ui/toaster";
import actionContractABI from "../contracts/CourseAuction.json";

export interface Bids {
  bidder: string;
  bidTime: number;
  amount: number;
}

export class ContractService {
  contractAddress: string = "";
  contract: Contract | null = null;
  provider:  BrowserProvider;
  ethersProvider: IProvider | null = null;
  signer: ethers.JsonRpcSigner | null = null;
  isInitialized = false;
  chainsConfig: {
    contract_address: {
      [chainId: string]: string;
    };
    default_chain: string;
  } = { contract_address: {}, default_chain: "LINEA_SEPOLIA" };
  setSessionStatus: (sessionStatus: any) => void = function () {};

  constructor(
    provider:  BrowserProvider,
    nowChain: string,
    setSessionStatus: (sessionStatus: any) => void = function () {}
  ) {
    this.contract = null;
    this.provider = provider;
    this.initializeContract(nowChain);
    this.setSessionStatus = setSessionStatus;
  }

  async initializeContract(nowChain: string) {
    try {
      this.isInitialized = false;
      const response = await fetch("/config.json");
      this.chainsConfig = await response.json();
      this.contractAddress =
        this.chainsConfig.contract_address[
          nowChain || this.chainsConfig.default_chain
        ] || "";
      // const ethersProvider = new ethers.BrowserProvider(this.provider);
      this.signer = await this.provider.getSigner();

      console.log("signer connect success", this.signer);
      this.contract = new ethers.Contract(
        this.contractAddress,
        actionContractABI["abi"],
        this.signer
      );

      // this.contract.on("*", (event) => {
      //   console.log("💖 Event detected:", event.fragment);
      //   // Swal.fire({
      //   //   title: "Good job?????",
      //   //   text: "You clicked the button!",
      //   //   icon: "success"
      //   // });
      // });
      this.contract.on(
        "BidPlaced",
        (
          courseId: number,
          batchId: number,
          bidder: string,
          bidTime: number,
          amount: number
        ) => {
          console.log("courseId:", courseId);
          console.log("batchId:", batchId);
          console.log("bidder:", bidder);
          console.log("bidTime:", bidTime);
          console.log("amount:");

          if (bidder !== this.signer?.address) {
            Swal.fire({
              title: `Congrats!`,
              confirmButtonText: "OK",
              padding: "3em",
              color: "#716add",
              text: `New bidder bided with ${formatEther(amount)} HNK!`,
              imageUrl: "https://media.giphy.com/media/SsTcO55LJDBsI/giphy.gif",
              imageWidth: 350,
              imageAlt: "Custom image",
              backdrop: `
                rgba(0,0,123,0.4)
                url("/nyan-cat.gif")
                left top
                no-repeat
              `,
            });
          }
        }
      );

      this.contract.on(
        "AuctionFinalized",
        (courseId: number, batchId: number) => {
          console.log("courseId:", courseId);
          console.log("batchId:", batchId);
          this.setSessionStatus({
            0: "ended",
            1: "won",
            2: "open",
          });
          Swal.fire({
            title: `You won the bid!`,
            confirmButtonText: "OK",
            padding: "3em",
            color: "#716add",
            text: `Now you can join the exclusive group chat.`,
            imageUrl:
              "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHR5aW50NzRwbWphNWNvNThqZWFhY2c0am42d28xa3Z2YTl3cG1tMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lnyPptAfGwHeTdoQDk/giphy-downsized-large.gif",
            imageWidth: 350,
            imageAlt: "Custom image",
            backdrop: `
                rgba(0,0,123,0.4)
                url("/nyan-cat.gif")
                left top
                no-repeat
              `,
          });
        }
      );

      console.log("Contract connect success", this.contract);
      this.isInitialized = true;
      toaster.success({
        title: "Contract initialized",
      });
    } catch (error) {
      toaster.error({
        title: "Contract not initialized",
      });
      console.error("Failed to fetch chains config:", error);
    }
  }

  async placeBid(courseId: number, batchId: number, amountInWei: number) {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }
      const tx = await this.contract.placeBid(courseId, batchId, amountInWei);
      console.debug("placeBid:", tx);
      await tx.wait();
      Swal.fire({
        title: `You have place the bid!`,
        confirmButtonText: "OK",
        padding: "3em",
        color: "#716add",
        text: `Now now patiently wait for the auction to close!`,
        imageUrl: "https://media.giphy.com/media/r95kAgBEzeapljl1ft/giphy.gif",
        imageWidth: 350,
        imageAlt: "Custom image",
        backdrop: `
          rgba(0,0,123,0.4)
          url("/nyan-cat.gif")
          left top
          no-repeat
        `,
      });
      return tx;
    } catch (error: unknown) {
      console.error("placeBid transaction ", error);

      if (error instanceof Error) {
        if (error?.message?.includes("Contract not initialized")) {
          toaster.error({
            title: "Contract not initialized",

            description: error.message || "Unknown Error",
          });
        }

        if (error?.message?.includes("Auction ended")) {
          toaster.error({
            title: "Auction ended",

            description: error.message || "Unknown Error",
          });
        }
      }
      throw error;
    }
  }

  async endAction(courseId: number, batchId: number) {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }
      const tx = await this.contract.finalizeAuction(courseId, batchId);
      console.debug("endAction:", tx);
      await tx.wait();
      return tx;
    } catch (error: unknown) {
      console.error("endAction transaction ", error);

      if (error instanceof Error) {
        if (error?.message?.includes("Contract not initialized")) {
          toaster.error({
            title: "Contract not initialized",

            description: error.message || "Unknown Error",
          });
        }

        if (error?.message?.includes("Auction ended")) {
          toaster.error({
            title: "Auction ended",

            description: error.message || "Unknown Error",
          });
        }
      }
      throw error;
    }
  }

  async getActionsBids(courseId: number, batchId: number) {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }

      const bids = await this.contract.getBids(courseId, batchId);

      return bids.map((b: [string, number, number]) => {
        return {
          bidder: b[0],
          bidTime: Number(b[1]),
          amount: b[2],
        };
      });
    } catch (error) {
      if (error instanceof Error) {
        toaster.error({
          title: "Get actions bids failed",
          description: error.message || "Unknown Error",
        });
        console.error("getActionsBids failed:", error);
      }
    }
  }

  async getActionsBidsCount(courseId: number, batchId: number) {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }
      const value = await this.contract.getBidsCount(courseId, batchId);
      console.log("getActionsBidsCount value:", value);
      return Number(value);
    } catch (error) {
      console.error("getActionsBidsCount failed:", error);
      throw error;
    }
  }

  async getCourseCertificateAddress() {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }
      const value = await this.contract.courseCertificate();
      console.log("getCourseCertificateAddress value:", value);
      return value;
    } catch (error) {
      console.error("getCourseCertificateAddress failed:", error);
      throw error;
    }
  }

  removeEventListeners() {
    if (this.contract) {
      this.contract.removeAllListeners();
      console.log("All contract event listeners have been removed.");
    }
  }
}
