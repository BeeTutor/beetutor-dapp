import { CHAIN_NAMESPACES, WEB3AUTH_NETWORK } from "@web3auth/base";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";

// get from https://dashboard.web3auth.io
const clientId =
  "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ";

export const CHAIN_CONFIG = {
  LINEA_SEPOLIA: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0xe705",
    rpcTarget: "https://rpc.sepolia.linea.build",
    // rpcTarget: `https://linea-sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
    displayName: "Linea Sepolia Testnet",
    blockExplorerUrl: "https://sepolia.lineascan.build",
    ticker: "ETH",
    tickerName: "Ethereum",
    logo: "https://images.seeklogo.com/logo-png/52/1/linea-logo-png_seeklogo-527155.png",
  },
  EVM_ON_FLOW_TESTNET: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x221",
    rpcTarget: "https://testnet.evm.nodes.onflow.org",
    displayName: "EVM on Flow Testnet",
    blockExplorerUrl: "https://evm-testnet.flowscan.io",
    ticker: "FLOW",
    tickerName: "Flow",
    logo: "https://cryptologos.cc/logos/flow-flow-logo.png",
  },
  SCROLL_SEPOLIA: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x8274F",
    rpcTarget: "https://rpc.ankr.com/scroll_sepolia_testnet",
    displayName: "Scroll Sepolia Testnet",
    blockExplorerUrl: "https://sepolia.scrollscan.com",
    ticker: "ETH",
    tickerName: "Ethereum",
    logo: "https://icons.llamao.fi/icons/chains/rsz_scroll.jpg",
  },
  MANTLE_SEPOLIA: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x138B",
    rpcTarget: "https://rpc.ankr.com/mantle_sepolia",
    displayName: "Mantle Sepolia Testnet",
    blockExplorerUrl: "https://sepolia.mantlescan.xyz",
    ticker: "MNT",
    tickerName: "Mantle",
    logo: "https://cryptologos.cc/logos/mantle-mnt-logo.png",
  },
  ZIRCUIT_TESTNET: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0xBF03",
    rpcTarget: "https://zircuit1-testnet.p2pify.com/",
    displayName: "Zircuit Testnet",
    blockExplorerUrl: "https://explorer.testnet.zircuit.com/",
    ticker: "ETH",
    tickerName: "Ethereum",
    logo: "https://icons.llamao.fi/icons/chains/rsz_zircuit.jpg",
  },
  BASE_SEPOLIA: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x14A34",
    rpcTarget: "https://rpc.ankr.com/base_sepolia",
    displayName: "Base Sepolia Testnet",
    blockExplorerUrl: "https://sepolia.basescan.org",
    ticker: "ETH",
    tickerName: "Ethereum",
    logo: "https://icons.llamao.fi/icons/chains/rsz_base.jpg",
  },
  ROOTSTOCK_TESTNET: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x1F",
    rpcTarget: "https://public-node.testnet.rsk.co",
    displayName: "Rootstock Testnet",
    blockExplorerUrl: "https://rootstock-testnet.blockscout.com/",
    ticker: "TRBTC",
    tickerName: "Testnet Rootstock BTC",
    logo: "https://icons.llamao.fi/icons/chains/rsz_rootstock.jpg",
  },
  MORPH_HOLESKY: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0xAFA",
    rpcTarget: "https://rpc-quicknode-holesky.morphl2.io",
    displayName: "Morph Holesky Testnet",
    blockExplorerUrl: "https://explorer-holesky.morphl2.io/",
    ticker: "ETH",
    tickerName: "Ethereum",
    logo: "https://icons.llamao.fi/icons/chains/rsz_morph.jpg",
  },
  ETH_SEPOLIA: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0xaa36a7",
    rpcTarget: "https://rpc.ankr.com/eth_sepolia",
    displayName: "Ethereum Sepolia Testnet",
    blockExplorerUrl: "https://sepolia.etherscan.io",
    ticker: "ETH",
    tickerName: "Ethereum",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  HARDHAT_LOCAL: {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0x7A69", // 31337
    rpcTarget: "http://127.0.0.1:8545",
    displayName: "Hardhat Local",
    blockExplorerUrl: "",
    ticker: "ETH",
    tickerName: "Ethereum",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
};

class Web3AuthService {
  private web3auth: Web3Auth;
  public initialized = false;

  constructor() {
    // IMP START - SDK Initialization
    let lastChain;
    if (typeof window !== "undefined") {
      lastChain = localStorage.getItem("nowChain");
    }
    console.log(
      "lastChain:",
      lastChain,
      CHAIN_CONFIG[lastChain as keyof typeof CHAIN_CONFIG]
    );
    console.log("🍀🍀🍀", CHAIN_CONFIG[lastChain as keyof typeof CHAIN_CONFIG]);
    const privateKeyProvider = new EthereumPrivateKeyProvider({
      config: {
        chainConfig:
          CHAIN_CONFIG[lastChain as keyof typeof CHAIN_CONFIG] ||
          CHAIN_CONFIG.BASE_SEPOLIA,
      },
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
    if(this.web3auth.connected) {
      this.web3auth.logout();
    }
    const adapters = await getDefaultExternalAdapters({
      options: this.web3auth.options,
    });
    for (const adapter of adapters) {
      try {
          this.web3auth.configureAdapter(adapter);
      } catch (e) {
        console.error("Failed to configure adapter", adapter.name, e);
      }
    }
    await this.web3auth.initModal();
    this.initialized = true;
    return this.web3auth.provider;
  }

  async switchChain(configKey: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("nowChain", configKey);
    }
    console.log(
      "Switch chain:",
      CHAIN_CONFIG[configKey as keyof typeof CHAIN_CONFIG]
    );
    const privateKeyProvider = new EthereumPrivateKeyProvider({
      config: {
        chainConfig: CHAIN_CONFIG[configKey as keyof typeof CHAIN_CONFIG],
      },
    });

    const web3AuthOptions: Web3AuthOptions = {
      clientId,
      web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
      privateKeyProvider,
    };

    this.web3auth = new Web3Auth(web3AuthOptions);
    this.init();
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
