import {
    CHAIN_NAMESPACES,
    IAdapter,
    IProvider,
    WEB3AUTH_NETWORK,
  } from "@web3auth/base";
  import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
  import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";
  import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
  
  // get from https://dashboard.web3auth.io
  const clientId =
  "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ";
  
  const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0xaa36a7",
    rpcTarget: "https://rpc.ankr.com/eth_sepolia",
    // Avoid using public rpcTarget in production.
    // Use services like Infura, Quicknode etc
    displayName: "Ethereum Sepolia Testnet",
    blockExplorerUrl: "https://sepolia.etherscan.io",
    ticker: "ETH",
    tickerName: "Ethereum",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  };
  
  class Web3AuthService {
    private web3auth: Web3Auth;
  
    constructor() {
// IMP START - SDK Initialization
const privateKeyProvider = new EthereumPrivateKeyProvider({
    config: { chainConfig },
  });
  
      const web3AuthOptions: Web3AuthOptions = {
        clientId,
        web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
        privateKeyProvider,
      };
  
      this.web3auth = new Web3Auth(web3AuthOptions);
      // IMP END - SDK Initialization
    }
  
    async init() {
      const adapters = await getDefaultExternalAdapters({
        options: this.web3auth.options,
      });
      adapters.forEach((adapter: IAdapter<unknown>) => {
        this.web3auth.configureAdapter(adapter);
      });
      await this.web3auth.initModal();
      return this.web3auth.provider;
    }
  
    async login() {
          // IMP START - Login
      return await this.web3auth.connect();
          // IMP END - Login

    }
  
    async logout() {
      await this.web3auth.logout();
    }
  
    async getUserInfo() {
      return await this.web3auth.getUserInfo();
    }
  
    get provider() {
      return this.web3auth.provider;
    }
  
    get connected() {
      return this.web3auth.connected;
    }
  }
  
  export const web3AuthService = new Web3AuthService();