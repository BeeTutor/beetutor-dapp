import { IProvider } from "@web3auth/base";
import { Contract, ethers } from "ethers";
import { toaster } from "../components/ui/toaster";
import actionContractABI from "../contracts/CourseAuction.json";

export class ContractService {
  contractAddress: string = "";
  contract: Contract | null = null;
  provider: IProvider;
  ethersProvider: IProvider | null = null;
  signer: ethers.JsonRpcSigner | null = null;

  constructor(provider: IProvider) {
    this.contractAddress = process.env.NEXT_PUBLIC_BID_ADDRESS || "";
    this.contract = null;
    this.provider = provider;
    this.initializeContract(actionContractABI["abi"]);
  }

  private async initializeContract(abi: any) {
    if (this.provider) {
      const ethersProvider = new ethers.BrowserProvider(this.provider);
      this.signer = await ethersProvider.getSigner();
      this.contract = new ethers.Contract(
        this.contractAddress,
        abi,
        this.signer
      );
    }
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
    } catch (error) {
      console.error("placeBid transaction ", error);
      if (error?.message?.includes("Contract not initialized")) {
        toaster.error({
          title: "Contract not initialized",
          description: error.data?.message || error.message || "Unknown Error",
        });
      }
      if (error?.message?.includes("Auction ended")) {
        toaster.error({
          title: "Auction ended",
          description: error.data?.message || error.message || "Unknown Error",
        });
      }
      throw error;
    }
  }

  async getActionsBids(courseId: number, batchId: number) {
    try {
      if (!this.contract) {
        throw new Error("Contract not initialized");
      }

      const bids = (await this.contract.getBids(courseId, batchId)).map((b) => {
        return {
          address: b[0],
          amount: Number(b[1]),
        };
      });
      console.log("getActionsBids value:", bids);
      return bids;
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
