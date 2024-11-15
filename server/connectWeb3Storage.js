import dotenv from "dotenv";
import * as Client from "@web3-storage/w3up-client";
import { StoreMemory } from "@web3-storage/w3up-client/stores/memory";
import * as Proof from "@web3-storage/w3up-client/proof";
import { Signer } from "@web3-storage/w3up-client/principal/ed25519";
import { fileURLToPath } from "url";

import fs from "fs";
import path from "path";

dotenv.config({ path: ".env" });
// 建立 __dirname 等效的變數
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export async function connectWeb3Storage() {
  //  Load client with specific private key
  const principal = Signer.parse(process.env.KEY || "");
  const store = new StoreMemory();
  const client = await Client.create({ principal, store });
  // Add proof that this agent has been delegated capabilities on the space
  const proof = await Proof.parse(process.env.PROOF || "");
  const space = await client.addSpace(proof);
  console.log("%cmain.js:32 Object", "color: #26bfa5;", space.did());
  await client.setCurrentSpace(space.did());
  return client;
}

export async function uploadFile(fileName, fileContent) {
  const client = await connectWeb3Storage();

  // Create a new File instance to upload
  const file = new File([fileContent], fileName, {
    type: "application/octet-stream",
  });

  // Upload the file
  const cid = await client.uploadDirectory([file]);
  console.log("File uploaded with CID:", cid);
  return cid;
}

export async function uploadTestImage() {
  const filePath = path.join(__dirname, "public", "test.JPG"); // 替換為測試圖片的路徑
  const fileName = "test.JPG";

  // 讀取圖片檔案內容為 Buffer
  const fileContent = fs.readFileSync(filePath);

  // 上傳圖片

  const cid = await uploadFile(fileName, fileContent);
  console.log("Image uploaded with CID:", cid);
  return cid;
}
