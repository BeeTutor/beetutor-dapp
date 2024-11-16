import { IProvider } from "@web3auth/base";
import { Contract, ethers } from "ethers";
import Swal from "sweetalert2";
import { toaster } from "../components/ui/toaster";
import actionContractABI from "../contracts/CourseCertificate.json";

export interface Bids {
  bidder: string;
  bidTime: number;
  amount: number;
}

export class NftContractService {
  contractAddress: string = "";
  contract: Contract | null = null;
  provider: IProvider;
  ethersProvider: IProvider | null = null;
  signer: ethers.JsonRpcSigner | null = null;
  isInitialized = false;
  chainsConfig: {
    nft_contract_address: {
      [chainId: string]: string;
    };
    default_chain: string;
  } = { nft_contract_address: {}, default_chain: "LINEA_SEPOLIA" };

  constructor(provider: IProvider, nowChain: string) {
    this.contract = null;
    this.provider = provider;
    this.initializeContract(nowChain);
  }

  async initializeContract(nowChain: string) {
    try {
      this.isInitialized = false;
      const response = await fetch("/config.json");
      this.chainsConfig = await response.json();
      this.contractAddress =
        this.chainsConfig.nft_contract_address[
          nowChain || this.chainsConfig.default_chain
        ] || "";
      const ethersProvider = new ethers.BrowserProvider(this.provider);
      this.signer = await ethersProvider.getSigner();

      console.log("signer connect success", this.signer);
      this.contract = new ethers.Contract(
        this.contractAddress,
        actionContractABI["abi"],
        this.signer
      );

      // TODO: this
      this.contract.on(
        "NFTUpgraded",
        (
          tokenId: number,
          student: string,
          oldLevel: number,
          newLevel: number,
          isCompleted: boolean
        ) => {
          console.log("tokenId:", tokenId);
          console.log("student:", student);
          console.log("oldLevel:", oldLevel);
          console.log("newLevel:", newLevel);
          console.log("isCompleted:", isCompleted);

          if (student == this.signer?.address) {
            Swal.fire({
              title: `Your NFT was Upgraded to ${newLevel}!`,
              confirmButtonText: "OK",
              padding: "3em",
              color: "#716add",
              text: `Token ID: ${tokenId}`,
              imageUrl: "https://media.giphy.com/media/RLVHPJJv7jY1q/giphy.gif",
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
  removeEventListeners() {
    if (this.contract) {
      this.contract.removeAllListeners();
      console.log("All contract event listeners have been removed.");
    }
  }
}
