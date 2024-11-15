import { configMap } from "../config.js";
import { ethers } from "ethers";
import fs from "fs";

class ContractService {
  address = configMap.contract.honeyTokenContract;
  contract;
  constructor() {
    const provider = new ethers.JsonRpcProvider(configMap.contract.providerUrl);
    const privateKey = configMap.admin.privateKey;

    const wallet = new ethers.Wallet(privateKey, provider);

    const abi = JSON.parse(fs.readFileSync("abi/HoneyToken.json", "utf8")).abi;

    this.contract = new ethers.Contract(
      configMap.contract.honeyTokenContract,
      abi,
      wallet
    );
  }

  async claimAirDrop(to) {
    await this.contract.mint(to, configMap.contract.honeyTokenAirDropAmount);
  }

  async test() {}
}

export const contractService = new ContractService();
