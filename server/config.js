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
};
