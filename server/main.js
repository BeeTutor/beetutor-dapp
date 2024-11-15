import dotenv from "dotenv";
import app from "./app.js";
import { connectWeb3Storage, uploadTestImage } from "./connectWeb3Storage.js";

dotenv.config({ path: ".env" });

connectWeb3Storage();
uploadTestImage();

async function main() {
  let serverInstance = app;
  serverInstance.listen("3001", () => {
    console.info(`=== Server running on port ${"3001"} ===`);
  });
  return app;
}

await main();

const gracefulShutdown = async (signal) => {
  console.info(`=== Received ${signal}. Starting graceful shutdown... ===`);
  process.exit(0);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
