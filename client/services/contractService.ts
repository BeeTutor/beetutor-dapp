// services/contractService.js
import { ethers } from "ethers";

class ContractService {
  constructor(provider, contractAddress, abi) {
    this.provider = provider;
    this.contractAddress = contractAddress;
    this.contract = new ethers.Contract(contractAddress, abi, provider.getSigner());
  }

  // 登入方法
  async login() {
    try {
      const signer = this.provider.getSigner();
      const account = await signer.getAddress();
      return account;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }

  // 與智能合約的交互方法
  async doSomething() {
    try {
      const tx = await this.contract.doSomething(); // 假設合約中有 `doSomething` 方法
      await tx.wait();
      return tx;
    } catch (error) {
      console.error("doSomething transaction failed:", error);
      throw error;
    }
  }

  // 另一個示例方法：獲取合約中的某個狀態變量
  async getSomeValue() {
    try {
      const value = await this.contract.someValue(); // 假設合約中有 `someValue` 方法
      return value;
    } catch (error) {
      console.error("getSomeValue failed:", error);
      throw error;
    }
  }
}

export default ContractService;
