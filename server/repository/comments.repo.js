import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CommentRepo {
  db_path = null;
  constructor() {
    this.db_path = path.join(__dirname, "..", "db", "userCommentsCid.json");
  }

  readData() {
    const data = fs.readFileSync(this.db_path, "utf8");
    return JSON.parse(data);
  }

  writeData(newData) {
    fs.writeFileSync(this.db_path, JSON.stringify(newData, null, 2));
  }
  getCommentsByToAddress(to) {
    const commentsList = this.readData();
    const oldComment = commentsList.find((c) => c.to == to);
    return oldComment;
  }

  updateCommentsByToAddress({ to, cid, fileName }) {
    const commentsList = this.readData();

    const comment = commentsList.find((c) => c.to === to) || { to };
    comment.oldCid = cid;
    comment.oldFileName = fileName;

    this.writeData(commentsList);
  }
}
export const commentRepo = new CommentRepo();
