import { logger } from "../utils/logger.js";
import { web3StorageService } from "../service/web3Storage.service.js";
import { commentRepo } from "../repository/comments.repo.js";

class CommentController {
  addUserComment = async (req, res) => {
    try {
      const { to, from, comment } = req.body;

      const oldComment = commentRepo.getCommentsByToAddress(to);
      const newData = { from, to, comment };
      const { cid, fileName, url } = await web3StorageService.uploadUserComment(
        newData,
        oldComment.oldCid["/"],
        oldComment.oldFileName
      );

      commentRepo.updateCommentsByToAddress({ to, cid, fileName });

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
