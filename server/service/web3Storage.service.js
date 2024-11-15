import dotenv from "dotenv";
import * as Client from "@web3-storage/w3up-client";
import { StoreMemory } from "@web3-storage/w3up-client/stores/memory";
import * as Proof from "@web3-storage/w3up-client/proof";
import { Signer } from "@web3-storage/w3up-client/principal/ed25519";
import { fileURLToPath } from "url";

import fs from "fs";
import path from "path";
import { logger } from "../utils/logger.js";
import { File } from "buffer";

dotenv.config({ path: ".env" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Web3StorageService {
  constructor() {
    this.init();
  }

  async init() {
    await this.connectWeb3Storage();
  }
  async connectWeb3Storage() {
    //  Load client with specific private key
    const principal = Signer.parse(process.env.KEY || "");
    const store = new StoreMemory();
    this.client = await Client.create({ principal, store });
    // Add proof that this agent has been delegated capabilities on the space
    const proof = await Proof.parse(process.env.PROOF || "");
    const space = await this.client.addSpace(proof);
    console.log("::: Space did :::", space.did());
    await this.client.setCurrentSpace(space.did());
  }

  async uploadUserComment(newData, oldCid = null, oldFileName = null) {
    let comments = [];
    const fileName = `user-${newData.to}-${new Date().getMilliseconds()}`;
    if (oldCid) {
      const url = `https://${oldCid}.ipfs.w3s.link/${oldFileName}`;
      try {
        const response = await fetch(url);
        const existingData = await response.json();
        console.log("::: Get old comments :::", existingData);
        comments.push(...existingData);
      } catch (error) {
        console.warn(`::: No Old Comment ${url} :::`, error);
      }
    }
    comments.push(newData);
    console.log("::: New Comment array :::", comments);

    const jsonContent = JSON.stringify(comments, null, 2);
    const file = new File([jsonContent], fileName, {
      type: "application/json",
    });

    const cid = await this.client.uploadDirectory([file]);
    console.log("::: Comment uploaded with CID :::", cid);

    if (oldCid) {
      // TODO: 都會噴錯刪不掉
      this.client
        .remove(`${oldCid}`, {
          shards: true,
        })
        .catch((error) => {
          console.warn("::: Fail to delete old comment :::");
        });
    }
    return {
      cid: cid,
      fileName,
      url: `https://${cid}.ipfs.w3s.link/${fileName}`,
    };
  }

  async uploadFile(fileName, fileContent) {
    const file = new File([fileContent], fileName, {
      type: "application/octet-stream",
    });
    const cid = await this.client.uploadDirectory([file]);
    console.log("::: File uploaded with CID :::", cid);
    return cid;
  }

  async uploadTestImage() {
    const filePath = path.join(__dirname, "public", "test.JPG");
    const fileName = "test.JPG";

    const fileContent = fs.readFileSync(filePath);

    const cid = await uploadFile(fileName, fileContent);
    console.log("Image uploaded with CID:", cid);
    return cid;
  }

  async uploadJsonArray(jsonArray, previousCid) {
    const jsonContent = JSON.stringify(jsonArray, null, 2);

    const fileName = `fileName.json`;

    const file = new File([jsonContent], fileName, {
      type: "application/json",
    });

    const cid = await this.client.uploadDirectory([file]);
    if (previousCid) {
      await this.client.remove(`${previousCid}`, {
        shards: true,
      });
    }

    console.log("JSON Array uploaded with CID:", cid);
    return { fileName, cid };
  }
}

export const web3StorageService = new Web3StorageService();
