import express from "express";
import { tokenController } from "../controller/token.controller.js";

const router = express.Router();

router.post("/claim/airdrop", tokenController.claimAirDropToken);

export default router;
