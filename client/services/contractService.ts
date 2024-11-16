import { IProvider } from "@web3auth/base";
import { Contract, ethers } from "ethers";
import { toaster } from "../components/ui/toaster";
import actionContractABI from "../contracts/CourseAuction.json";

export interface Bids {
  price: number;
  address: string;
  bidTime: number;
}

export class ContractService {
  contractAddress: string = "";
  contract: Contract | null = null;
  provider: IProvider;
  ethersProvider: IProvider | null = null;
  signer: ethers.JsonRpcSigner | null = null;
  isInitialized = false;

  constructor(provider: IProvider) {
    this.contractAddress = process.env.NEXT_PUBLIC_BID_ADDRESS || "";
    this.contract = null;
    this.provider = provider;
    this.initializeContract();
  }

  async initializeContract() {
    const ethersProvider = new ethers.BrowserProvider(this.provider);
    this.signer = await ethersProvider.getSigner();
    this.contract = new ethers.Contract(
      this.contractAddress,
      actionContractABI["abi"],
      this.signer
    );
    this.isInitialized = true;
  }

  async placeBid(courseId: number, batchId: number, amount: number) {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }
      const amountInWei = ethers.parseEther(amount.toString());
      const tx = await this.contract.placeBid(courseId, batchId, {
        value: amountInWei,
      });
      console.debug("placeBid:", tx);
      await tx.wait();
      toaster.success({
        title: "Successfully Bided",
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

  async getActionsBids(courseId: number, batchId: number) {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }

      const bids = await this.contract.getBids(courseId, batchId);
      return bids.map((b: [string, number]) => {
        return {
          address: b[0],
          price: b[1],
        };
      });
    } catch (error) {
      console.error("getActionsBids failed:", error);
      throw error;
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
}
