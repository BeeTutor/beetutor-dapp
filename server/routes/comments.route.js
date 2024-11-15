import express from "express";
import { commentController } from "../controller/upload.controller.js";
const router = express.Router();

router.post("/", commentController.addUserComment);

export default router;
