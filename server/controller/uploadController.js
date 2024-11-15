import { logger } from "../utils/logger.js";
import { web3StorageService } from "../service/web3StorageService.js";

class CommentController {
  addUserComment = async (req, res) => {
    try {
      const { oldCid, to, from, comment, oldFileName } = req.body;

      const newData = { from, to, comment };
      const { cid, fileName, url } = await web3StorageService.uploadUserComment(
        newData,
        oldCid,
        oldFileName
      );

      res.status(201).json({
        success: true,
        cid,
        fileName,
        url,
      });
    } catch (error) {
      logger.error("Upload error:", error);
      res.status(500).json({
        success: false,
        error: "File upload failed",
      });
    }
  };
}

export const commentController = new CommentController();
