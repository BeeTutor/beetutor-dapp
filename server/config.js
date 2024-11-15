import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const configMap = {
  server: {
    port: +(process.env.PORT || 3000),
  },
  web3Storage: {
    key: process.env.KEY || "",
    proof: process.env.PROOF || "",
  },
  wordCoin: {
    appId: process.env.APP_ID,
    actionId: {
      airDrop: process.env.ACTION_ID,
    },
  },
  contract: {
    providerUrl:
      process.env.PROVIDER_URL ||
      "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID",
    honeyTokenContract: process.env.HONEY_TOKEN_CONTRACT_ADDRESS,
    honeyTokenAirDropAmount: process.env.HONEY_TOKEN_AIR_DROP_AMOUNT || 999,
  },
  admin: {
    privateKey: process.env.PRIVATE_KEY,
  },
};
