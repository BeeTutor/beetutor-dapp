import express from "express";
import { commentController } from "../controller/uploadController.js";
const router = express.Router();

// 註冊新用戶
router.post("/", commentController.addUserComment);

export default router;
